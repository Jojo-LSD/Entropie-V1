import { Client } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export async function getClients(): Promise<Client[]> {
  const response = await fetch(`${API_BASE_URL}/api/clients`);

  if (!response.ok) {
    throw new Error(`GET /api/clients failed: ${response.statusText}`);
  }

  const data = (await response.json()) as unknown;

  if (!Array.isArray(data)) {
    throw new Error('GET /api/clients failed: unexpected response shape');
  }

  return data.map((item) => {
    const record = item as Record<string, unknown>;
    return {
      id: String(record.id ?? ''),
      codeClient: String(record.codeClient ?? ''),
      nom: String(record.nom ?? ''),
      ville: (record.ville as string | null | undefined) ?? '',
      typeClient: (record.typeClient as string | null | undefined) ?? '',
      typeVente: (record.typeVente as string | null | undefined) ?? '',
      groupeClient: (record.groupeClient as string | null | undefined) ?? '',
      devise: (record.devise as string | null | undefined) ?? '',
      actif: Boolean(record.actif),
    };
  });
}
