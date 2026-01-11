import base64
import os
from uuid import uuid4

from fastapi import APIRouter, File, HTTPException, UploadFile

from app.services.temporal_client import get_temporal_client

router = APIRouter()

MAX_UPLOAD_BYTES = int(os.environ.get("PURCHASE_UPLOAD_MAX_BYTES", "10000000"))


@router.post("/commande-achat/parse")
async def parse_purchase_order(file: UploadFile = File(...)):
    if not file or not file.filename:
        raise HTTPException(status_code=400, detail="Fichier manquant.")

    data = await file.read()
    if not data:
        raise HTTPException(status_code=400, detail="Fichier vide.")
    if len(data) > MAX_UPLOAD_BYTES:
        raise HTTPException(status_code=413, detail="Fichier trop volumineux.")

    payload = {
        "file_name": file.filename,
        "content_type": file.content_type,
        "file_base64": base64.b64encode(data).decode("ascii"),
    }

    client = await get_temporal_client()
    task_queue = os.environ.get("TEMPORAL_TASK_QUEUE", "purchase-order-queue")
    workflow_id = f"purchase-order-{uuid4()}"

    result = await client.execute_workflow(
        "PurchaseOrderParseWorkflow",
        payload,
        id=workflow_id,
        task_queue=task_queue,
    )

    data = result
    request_ids = None
    if isinstance(result, dict) and "data" in result:
        data = result.get("data")
        request_ids = result.get("request_ids")

    return {
        "success": True,
        "message": "Fichier traité.",
        "data": data,
        "request_ids": request_ids,
        "workflow_id": workflow_id,
    }
