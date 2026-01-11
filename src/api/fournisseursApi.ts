import { Fournisseur } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export async function getFournisseurs(): Promise<Fournisseur[]> {
  const response = await fetch(`${API_BASE_URL}/api/fournisseurs`);

  if (!response.ok) {
    throw new Error(`GET /api/fournisseurs failed: ${response.statusText}`);
  }

  const data = (await response.json()) as unknown;

  if (!Array.isArray(data)) {
    throw new Error('GET /api/fournisseurs failed: unexpected response shape');
  }

  return data.map((item) => {
    const record = item as Record<string, unknown>;
    return {
      id: String(record.id ?? ''),
      codeFournisseur: String(record.codeFournisseur ?? ''),
      nom: String(record.nom ?? ''),
      ville: (record.ville as string | null | undefined) ?? null,
      pays: (record.pays as string | null | undefined) ?? null,
      statut: (record.statut as string | null | undefined) ?? null,
    };
  });
}
