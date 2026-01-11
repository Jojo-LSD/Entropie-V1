const DEFAULT_BACKEND_UPLOAD = 'http://localhost:8000/api/commande-achat/parse';
const envUploadUrl = (import.meta.env.VITE_PURCHASE_UPLOAD_URL as string | undefined)?.trim();
const UPLOAD_URL =
  (envUploadUrl && envUploadUrl.length > 0 ? envUploadUrl : undefined) || DEFAULT_BACKEND_UPLOAD;

export interface PurchaseOrderUploadResponse {
  success: boolean;
  message: string;
  data?: unknown;
  request_ids?: string[] | null;
  workflow_id?: string;
}

export async function uploadPurchaseOrderFile(file: File): Promise<PurchaseOrderUploadResponse> {
  if (!UPLOAD_URL || !UPLOAD_URL.startsWith('http')) {
    throw new Error('URL d\'upload non configurée ou invalide');
  }

  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(UPLOAD_URL, {
    method: 'POST',
    body: formData,
  });

  const responseText = await response.text().catch(() => '');

  if (!response.ok) {
    const errorMessage = responseText || response.statusText || 'Erreur lors de l\'upload';
    throw new Error(`POST ${UPLOAD_URL} failed: ${errorMessage}`);
  }

  let data: Partial<PurchaseOrderUploadResponse> | null = null;
  try {
    data = JSON.parse(responseText);
  } catch {
    data = null;
  }

  return {
    success: data?.success ?? true,
    message: data?.message ?? (responseText || 'Fichier envoyé avec succès.'),
    data: data?.data,
    request_ids: data?.request_ids,
    workflow_id: data?.workflow_id,
  };
}
