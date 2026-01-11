import os
import json
import re
from typing import Any, Dict, List, Optional

from openai import OpenAI

# PDF -> image fallback (utile si PDF scanné)
import fitz  # PyMuPDF
from pypdf import PdfReader


PROMPT = """You are extracting data from a Packing List / Delivery Note PDF.

Return ONLY valid JSON exactly matching this schema, no deviations, no added keys:

{
  "supplier_name": "string or UNKNOWN",
  "lines": [
    {
      "product_code": "string",
      "product_name": "string",
      "batch": "string",
      "slaughteredin": "string",
      "cutin": "string",
      "prod_day": "string",
      "use_by": "string",
      "qty": "number",
      "weight": "number"
    }
  ]
}

Extraction constraints (DO NOT infer, DO NOT guess):
- NEVER fill a field using reasoning, assumption, translation, or external knowledge.
- NEVER swap column meanings even if values “look similar”.
- If table structure is ambiguous, extract the row as raw text and parse it without reassigning column roles.
- If a value cannot be confidently mapped to a field, return "" (or 0 for numbers).

Rules (strict enforcement):
1. supplier_name:
   - Take ONLY the company name from the document header (logo, address block, or top section).
   - If multiple names appear, choose the one clearly representing the supplier/manufacturer.
   - If uncertain → "UNKNOWN" (not best guess).

2. lines:
   - Extract ALL rows from ALL pages.
   - Preserve original order from the document.
   - Skip totals, subtotals, summaries, or non-item rows.

3. product_code:
   - Extract ONLY if explicitly labeled as Code / PLU / SKU / Item Code.
   - If the value contains spaces or line breaks, keep it as written after trimming.
   - Otherwise → "".

4. weight (critical):
   - weight MUST be NET weight in kg.
   - Accept ONLY values from columns explicitly named: Net, Net (Kg), Poids Net, Poids net (kg), or Net Weight.
   - If multiple weight numbers exist in a row, choose ONLY the one from the NET column.
   - If only Gross and Tare are shown, compute: NET = Gross − Tare.
   - Convert commas to dots before storing.
   - If no NET weight is present → 0 (do NOT fallback to another column).

5. qty:
   - Use the row quantity column ONLY if explicitly present.
   - If quantity is not explicitly shown but the row clearly refers to 1 single item/carton → 1.
   - If unclear or no quantity info → 0.

6. Dates:
   - Convert ONLY if the value is 100% a date.
   - Output format MUST be DD/MM/YYYY.
   - If a date appears in the row but the column meaning is unclear → return "" (do NOT assign).
   - Do NOT invent missing date fields.

7. Text handling:
   - Do not modify names or codes.
   - Keep values exactly as written (after trimming whitespace).
   - Do NOT translate, normalize, or interpret.

8. Validation mindset:
   - Accuracy > completeness.
   - Empty field is always better than wrong field.
   - If unsure → leave empty, never infer.
"""


def _safe_json_parse(s: str) -> Dict[str, Any]:
    """
    Essaie de parser du JSON strict.
    Si le modèle a ajouté du bruit, on extrait le premier bloc {...}.
    """
    s = s.strip()
    try:
        return json.loads(s)
    except Exception:
        pass

    # fallback: extraire le plus gros objet JSON
    m = re.search(r"\{.*\}\s*$", s, flags=re.DOTALL)
    if not m:
        # fallback plus agressif
        start = s.find("{")
        end = s.rfind("}")
        if start == -1 or end == -1 or end <= start:
            raise ValueError("Réponse non-JSON et impossible à récupérer.")
        s2 = s[start : end + 1]
        return json.loads(s2)

    return json.loads(m.group(0))


def _render_page_to_png_bytes(pdf_path: str, page_index: int, zoom: float = 2.0) -> bytes:
    """
    Rend une page en image (PNG) -> utile pour les PDFs scannés ou tableaux mal extraits.
    """
    doc = fitz.open(pdf_path)
    page = doc.load_page(page_index)
    mat = fitz.Matrix(zoom, zoom)
    pix = page.get_pixmap(matrix=mat)
    png_bytes = pix.tobytes("png")
    doc.close()
    return png_bytes


def _extract_page_text(pdf_path: str, page_index: int) -> str:
    reader = PdfReader(pdf_path)
    page = reader.pages[page_index]
    return (page.extract_text() or "").strip()


def call_openai_for_page(
    client: OpenAI,
    model: str,
    page_text: str,
    page_image_png: Optional[bytes],
) -> Dict[str, Any]:
    """
    Envoie soit (texte) soit (image) au modèle.
    On force un retour JSON.
    """
    # Si on a du texte exploitable, on l'envoie.
    # Sinon, on envoie une image de la page.
    if page_text and len(page_text) > 50:
        content = [
            {"type": "text", "text": PROMPT},
            {"type": "text", "text": "PAGE CONTENT (TEXT):\n" + page_text},
        ]
    else:
        if page_image_png is None:
            raise ValueError("Page sans texte et image indisponible.")
        content = [
            {"type": "text", "text": PROMPT},
            {"type": "text", "text": "PAGE CONTENT (IMAGE):"},
            {"type": "image_url", "image_url": {"url": f"data:image/png;base64,{_b64(page_image_png)}"}},
        ]

    resp = client.chat.completions.create(
        model=model,
        messages=[{"role": "user", "content": content}],
        # "json_object" aide à éviter du blabla
        response_format={"type": "json_object"},
        temperature=0,
    )
    raw = resp.choices[0].message.content or ""
    return _safe_json_parse(raw)


def _b64(data: bytes) -> str:
    import base64
    return base64.b64encode(data).decode("utf-8")


def merge_results(page_results: List[Dict[str, Any]]) -> Dict[str, Any]:
    """
    Concatène:
    - supplier_name: premier != UNKNOWN, sinon UNKNOWN
    - lines: concat dans l'ordre
    """
    supplier = "UNKNOWN"
    lines: List[Dict[str, Any]] = []

    for r in page_results:
        # supplier_name
        s = (r.get("supplier_name") or "").strip()
        if supplier == "UNKNOWN" and s and s.upper() != "UNKNOWN":
            supplier = s

        # lines
        page_lines = r.get("lines") or []
        if isinstance(page_lines, list):
            lines.extend(page_lines)

    return {"supplier_name": supplier or "UNKNOWN", "lines": lines}


def extract_pdf(pdf_path: str, model: str = "gpt-4.1-mini") -> Dict[str, Any]:
    api_key = os.environ.get("OPENAI_API_KEY")
    if not api_key:
        raise RuntimeError("Mets ta clé dans OPENAI_API_KEY (variable d'environnement).")

    client = OpenAI(api_key=api_key)

    reader = PdfReader(pdf_path)
    n_pages = len(reader.pages)

    results: List[Dict[str, Any]] = []
    for i in range(n_pages):
        text = _extract_page_text(pdf_path, i)

        # fallback image si peu/pas de texte
        img = None
        if not text or len(text) < 50:
            img = _render_page_to_png_bytes(pdf_path, i)

        page_json = call_openai_for_page(client, model=model, page_text=text, page_image_png=img)
        results.append(page_json)

    return merge_results(results)


if __name__ == "__main__":
    # Exemple avec tes PDFs uploadés (adapte le chemin si besoin)
    pdf_path = "/mnt/data/984600958.pdf"  #  [oai_citation:2‡984600958.pdf](sediment://file_00000000d0ac7243810584a01f151020)
    # pdf_path = "/mnt/data/33-FICH-SUIVP-TRA1722I0 (1).pdf"  #  [oai_citation:3‡33-FICH-SUIVP-TRA1722I0 (1).pdf](sediment://file_00000000b59472439a565491e5b1a94c)

    final_json = extract_pdf(pdf_path, model="gpt-5-nano-2025-08-07")
    print(json.dumps(final_json, ensure_ascii=False, indent=2))