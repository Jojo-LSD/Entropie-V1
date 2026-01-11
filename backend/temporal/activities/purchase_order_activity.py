import asyncio
import base64
import io
import json
import os
import re
from typing import Any, Dict, List, Optional

import fitz  # PyMuPDF
from openai import OpenAI
from pypdf import PdfReader
from temporalio import activity

# PROMPT UNIVERSEL OPTIMISÉ
PROMPT = """# RÔLE
Tu es un agent d'extraction de données de traçabilité agroalimentaire. Ta mission est de convertir des documents logistiques (Packing Lists) de viande en un flux de données structuré.

# MÉTHODOLOGIE
1. IDENTIFICATION : Repère le nom de l'expéditeur (Prodal est le nom de l'acheteur et non pas l'expéditeur).
2. ANALYSE : Les colonnes varient (Batch=Lot, Kill Date=Abattage, THT/Use By=DLC).
3. PROPAGATION : Si les infos de traçabilité (Pays, Agréments) sont en en-tête, applique-les à chaque ligne de lot.
4. NORMALISATION : Pays en français, Dates en YYYY-MM-DD.

# FORMAT DE SORTIE JSON STRICT
{
  "fournisseur": "NOM_DU_FOURNISSEUR",
  "donnees_lots": [
    {
      "produit": "Nom du produit",
      "lot_fournisseur": "Numéro de lot",
      "pays_naissance": "Pays",
      "pays_elevage": "Pays",
      "pays_abattage": "Pays",
      "num_abattoir": "Code sanitaire abattoir",
      "num_atelier": "Code sanitaire atelier",
      "date_production": "YYYY-MM-DD",
      "dlc": "YYYY-MM-DD",
      "poids_net": 0.00
    }
  ]
}"""

def _b64(data: bytes) -> str:
    return base64.b64encode(data).decode("utf-8")

def _safe_json_parse(s: str) -> Dict[str, Any]:
    s = s.strip()
    # Nettoyage des balises markdown si présentes
    s = s.replace("```json", "").replace("```", "").strip()
    try:
        return json.loads(s)
    except Exception:
        # Tentative de récupération par Regex si le format est pollué
        m = re.search(r"\{.*\}", s, flags=re.DOTALL)
        if m:
            return json.loads(m.group(0))
        raise ValueError(f"Impossible de parser le JSON : {s[:100]}")

def _render_page_to_png_bytes(pdf_bytes: bytes, page_index: int) -> bytes:
    doc = fitz.open(stream=pdf_bytes, filetype="pdf")
    page = doc.load_page(page_index)
    pix = page.get_pixmap(matrix=fitz.Matrix(2, 2)) # Zoom 2x pour la clarté
    img_bytes = pix.tobytes("png")
    doc.close()
    return img_bytes

def call_openai_for_page(client: OpenAI, model: str, text: str, img_bytes: bytes) -> tuple[Dict[str, Any], str | None]:
    # On envoie TEXTE + IMAGE pour une précision maximale
    content = [
        {"type": "text", "text": PROMPT},
        {"type": "text", "text": f"TEXTE EXTRAIT DU PDF :\n{text}"},
        {
            "type": "image_url",
            "image_url": {"url": f"data:image/png;base64,{_b64(img_bytes)}"}
        }
    ]

    resp = client.chat.completions.create(
        model=model,
        messages=[{"role": "user", "content": content}],
        response_format={"type": "json_object"},
        temperature=0.1 # Plus bas = plus précis
    )
    request_id = getattr(resp, "id", None)
    if request_id:
        print(f"[openai] request_id={request_id}")
    return _safe_json_parse(resp.choices[0].message.content), request_id

def merge_results(page_results: List[Dict[str, Any]]) -> Dict[str, Any]:
    final_supplier = "UNKNOWN"
    all_lots = []

    for r in page_results:
        # On utilise les clés du PROMPT
        s = r.get("fournisseur")
        if final_supplier == "UNKNOWN" and s and "NOM_DU_FOURNISSEUR" not in s:
            final_supplier = s
        
        lots = r.get("donnees_lots", [])
        if isinstance(lots, list):
            all_lots.extend(lots)

    return {"fournisseur": final_supplier, "donnees_lots": all_lots}

@activity.defn
async def extract_meat_packing_list(payload: Dict[str, Any]) -> Dict[str, Any]:
    file_base64 = payload.get("file_base64")
    if not file_base64:
        raise ValueError("file_base64 manquant")

    pdf_bytes = base64.b64decode(file_base64)
    model = os.environ.get("OPENAI_MODEL", "gpt-4o")
    client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))
    
    reader = PdfReader(io.BytesIO(pdf_bytes))
    results = []
    request_ids: List[str] = []

    # On boucle sur chaque page
    for i in range(len(reader.pages)):
        text = reader.pages[i].extract_text() or ""
        # On génère l'image de la page pour aider le LLM à comprendre le tableau
        img = _render_page_to_png_bytes(pdf_bytes, i)
        
        # Appel synchrone dans un thread pour Temporal
        page_json, request_id = await asyncio.to_thread(call_openai_for_page, client, model, text, img)
        results.append(page_json)
        if request_id:
            request_ids.append(request_id)

    return {"data": merge_results(results), "request_ids": request_ids}
