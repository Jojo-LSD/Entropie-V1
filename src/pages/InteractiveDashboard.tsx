import { useEffect, useMemo, useState } from 'react';
import { GraphicWalker } from '@kanaries/graphic-walker';
import { Activity, Database, Download, Share2, Filter } from 'lucide-react';

import { getPygwalkerData, GraphicWalkerRow } from '../api/graphicWalkerApi';

const isNumericLike = (value: unknown) => {
  if (typeof value === 'number') return Number.isFinite(value);
  if (typeof value !== 'string') return false;
  if (!value.trim()) return false;
  const numericValue = Number(value);
  return Number.isFinite(numericValue);
};

const isDateLike = (value: unknown) => {
  if (typeof value !== 'string') return false;
  if (!value.trim()) return false;
  if (isNumericLike(value)) return false;
  return !Number.isNaN(Date.parse(value));
};

const inferFields = (rows: GraphicWalkerRow[]) => {
  if (!rows.length) return [];
  const sampleKeys = Object.keys(rows[0]);

  return sampleKeys.map((key) => {
    const sampleValue = rows.find(
      (row) => row[key] !== null && row[key] !== undefined
    )?.[key];

    if (/_id$/i.test(key) || key.toLowerCase() === 'id') {
      return { fid: key, name: key, semanticType: 'nominal', analyticType: 'dimension' };
    }

    if (isNumericLike(sampleValue)) {
      return { fid: key, name: key, semanticType: 'quantitative', analyticType: 'measure' };
    }

    if (typeof sampleValue === 'boolean') {
      return { fid: key, name: key, semanticType: 'nominal', analyticType: 'dimension' };
    }

    if (isDateLike(sampleValue)) {
      return { fid: key, name: key, semanticType: 'temporal', analyticType: 'dimension' };
    }

    return { fid: key, name: key, semanticType: 'nominal', analyticType: 'dimension' };
  });
};

const normalizeData = (
  rows: GraphicWalkerRow[],
  fields: { fid: string; name: string; semanticType: string; analyticType: string }[]
) => {
  if (!rows.length || !fields.length) return rows;
  const fieldMap = new Map(fields.map((field) => [field.name, field]));

  return rows.map((row) => {
    const normalized: GraphicWalkerRow = {};
    Object.entries(row).forEach(([key, value]) => {
      const field = fieldMap.get(key);
      if (!field) {
        normalized[key] = value;
        return;
      }

      if (field.analyticType === 'measure' && isNumericLike(value)) {
        normalized[key] = typeof value === 'number' ? value : Number(value);
        return;
      }

      if (field.semanticType === 'temporal' && typeof value === 'string') {
        const parsed = Date.parse(value);
        normalized[key] = Number.isNaN(parsed) ? value : new Date(parsed).toISOString();
        return;
      }

      normalized[key] = value;
    });

    return normalized;
  });
};

export const InteractiveDashboard = () => {
  const [data, setData] = useState<GraphicWalkerRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const loadData = async () => {
      try {
        setIsLoading(true);
        const rows = await getPygwalkerData();
        if (isMounted) {
          setData(rows);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Erreur de chargement');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadData();
    return () => {
      isMounted = false;
    };
  }, []);

  const fields = useMemo(() => inferFields(data), [data]);
  const normalizedData = useMemo(() => normalizeData(data, fields), [data, fields]);

  return (
    <div className="min-h-full bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="p-6 md:p-8 pb-0">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-6 animate-fade-in-up">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg hover-glow">
                <Activity className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>Dashboard Interactif</h1>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Explorez vos données avec PyGWalker</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200 shadow-sm hover:shadow-md">
                <Filter className="h-4 w-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">Filtres</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200 shadow-sm hover:shadow-md">
                <Download className="h-4 w-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">Export</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all duration-200 shadow-md hover:shadow-lg">
                <Share2 className="h-4 w-4" />
                <span className="text-sm font-semibold">Partager</span>
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200 overflow-hidden animate-scale-in">
          <div className="bg-gradient-to-r from-blue-500 to-cyan-500 px-6 py-4">
            <div className="flex items-center space-x-2 text-white">
              <Database className="h-5 w-5" />
              <h2 className="text-lg font-semibold">Espace d'analyse de données</h2>
            </div>
          </div>

          <div className="p-4 md:p-6">
            <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
              <div className="h-[980px] md:h-[1120px] bg-white">
                {isLoading ? (
                  <div className="h-full flex items-center justify-center text-sm text-gray-500">
                    Chargement des données...
                  </div>
                ) : error ? (
                  <div className="h-full flex items-center justify-center text-sm text-red-600">
                    {error}
                  </div>
                ) : (
                  <GraphicWalker
                    data={normalizedData}
                    fields={fields}
                    appearance="light"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
