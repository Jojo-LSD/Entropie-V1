import { Article } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export async function getArticles(): Promise<Article[]> {
  const response = await fetch(`${API_BASE_URL}/api/articles`);

  if (!response.ok) {
    throw new Error(`GET /api/articles failed: ${response.statusText}`);
  }

  const data = (await response.json()) as unknown;

  if (!Array.isArray(data)) {
    throw new Error('GET /api/articles failed: unexpected response shape');
  }

  return data.map((item) => {
    const record = item as Record<string, unknown>;
    return {
      id: String(record.id ?? ''),
      code: String(record.code ?? ''),
      nom: String(record.nom ?? ''),
      categorie: (record.categorie as string | null | undefined) ?? null,
      espece: (record.espece as string | null | undefined) ?? null,
      morceau: (record.morceau as string | null | undefined) ?? null,
      unite: (record.unite as string | null | undefined) ?? null,
      statut: (record.statut as Article['statut']) ?? 'inactif',
    };
  });
}
