import { useEffect, useState } from 'react';
import { Package, Users, Building2 } from 'lucide-react';
import { Article, Client, Fournisseur, TableType } from '../types';
import { getArticles } from '../api/articlesApi';
import { getClients } from '../api/clientsApi';
import { getFournisseurs } from '../api/fournisseursApi';

export const Tables = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [fournisseurs, setFournisseurs] = useState<Fournisseur[]>([]);
  const [articlesError, setArticlesError] = useState<string | null>(null);
  const [clientsError, setClientsError] = useState<string | null>(null);
  const [fournisseursError, setFournisseursError] = useState<string | null>(null);
  const [activeTable, setActiveTable] = useState<TableType>('articles');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState<string>('code');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const tabs = [
    { id: 'articles' as TableType, label: 'Articles', icon: Package },
    { id: 'clients' as TableType, label: 'Clients', icon: Users },
    { id: 'fournisseurs' as TableType, label: 'Fournisseurs', icon: Building2 },
  ];

  useEffect(() => {
    const loadArticles = async () => {
      try {
        const data = await getArticles();
        setArticles(data);
      } catch (error) {
        console.error('Failed to load articles from API', error);
        setArticlesError('Impossible de charger les articles depuis la base.');
        setArticles([]);
      }
    };

    loadArticles();
  }, []);

  useEffect(() => {
    const loadClients = async () => {
      try {
        const data = await getClients();
        setClients(data);
      } catch (error) {
        console.error('Failed to load clients from API', error);
        setClientsError('Impossible de charger les clients depuis la base.');
        setClients([]);
      }
    };

    loadClients();
  }, []);

  useEffect(() => {
    const loadFournisseurs = async () => {
      try {
        const data = await getFournisseurs();
        setFournisseurs(data);
      } catch (error) {
        console.error('Failed to load fournisseurs from API', error);
        setFournisseursError('Impossible de charger les fournisseurs depuis la base.');
        setFournisseurs([]);
      }
    };

    loadFournisseurs();
  }, []);

  useEffect(() => {
    if (activeTable === 'articles') {
      setSortKey('code');
    } else if (activeTable === 'clients') {
      setSortKey('codeClient');
    } else if (activeTable === 'fournisseurs') {
      setSortKey('codeFournisseur');
    } else {
      setSortKey('code');
    }
    setSortOrder('asc');
  }, [activeTable]);

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  const sortAndFilter = <T extends Record<string, any>>(data: T[]) => {
    const lowerSearch = searchTerm.toLowerCase().trim();
    const filtered = lowerSearch
      ? data.filter((item) =>
          Object.values(item).some((value) =>
            typeof value === 'string'
              ? value.toLowerCase().includes(lowerSearch)
              : String(value ?? '').toLowerCase().includes(lowerSearch)
          )
        )
      : data;

    const sorted = [...filtered].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];

      // Normalize undefined/null
      const aNorm = aVal ?? '';
      const bNorm = bVal ?? '';

      // String comparison by default
      if (typeof aNorm === 'number' && typeof bNorm === 'number') {
        return sortOrder === 'asc' ? aNorm - bNorm : bNorm - aNorm;
      }
      return sortOrder === 'asc'
        ? String(aNorm).localeCompare(String(bNorm))
        : String(bNorm).localeCompare(String(aNorm));
    });

    return sorted;
  };

  const sortedArticles = sortAndFilter(articles);
  const sortedClients = sortAndFilter(clients);
  const sortedFournisseurs = sortAndFilter(fournisseurs);

  const renderArticlesTable = () => (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gradient-to-r from-blue-50 to-cyan-50">
          <tr>
            {[
              { key: 'code', label: 'Code' },
              { key: 'nom', label: 'Nom' },
              { key: 'categorie', label: 'Catégorie' },
              { key: 'espece', label: 'Espèce' },
              { key: 'morceau', label: 'Morceau' },
              { key: 'unite', label: 'Unité' },
              { key: 'statut', label: 'Statut', align: 'center' },
            ].map((col) => (
              <th
                key={col.key}
                onClick={() => handleSort(col.key)}
                className={`px-4 py-3 text-${col.align ?? 'left'} text-xs font-medium text-gray-700 uppercase tracking-wider cursor-pointer select-none hover:text-blue-600 transition-colors duration-200`}
              >
                <span className="inline-flex items-center gap-1">
                  {col.label}
                  {sortKey === col.key && (
                    <span className="text-[10px] text-blue-500">{sortOrder === 'asc' ? '▲' : '▼'}</span>
                  )}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {sortedArticles.map((article) => (
            <tr key={article.id} className="hover:bg-blue-50 transition-all duration-200">
              <td className="px-4 py-3 text-sm font-medium text-gray-900">{article.code}</td>
              <td className="px-4 py-3 text-sm text-gray-600">{article.nom}</td>
              <td className="px-4 py-3 text-sm text-gray-600">{article.categorie}</td>
              <td className="px-4 py-3 text-sm text-gray-600">{article.espece}</td>
              <td className="px-4 py-3 text-sm text-gray-600">{article.morceau}</td>
              <td className="px-4 py-3 text-sm text-gray-600">{article.unite}</td>
              <td className="px-4 py-3 text-center">
                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                  article.statut === 'actif'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {article.statut}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderClientsTable = () => (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gradient-to-r from-blue-50 to-cyan-50">
          <tr>
            {[
              { key: 'codeClient', label: 'Code Client' },
              { key: 'nom', label: 'Nom' },
              { key: 'ville', label: 'Ville' },
              { key: 'typeClient', label: 'Type Client' },
              { key: 'typeVente', label: 'Type Vente' },
              { key: 'groupeClient', label: 'Groupe Client' },
              { key: 'devise', label: 'Devise', align: 'center' },
              { key: 'actif', label: 'Actif', align: 'center' },
            ].map((col) => (
              <th
                key={col.key}
                onClick={() => handleSort(col.key)}
                className={`px-4 py-3 text-${col.align ?? 'left'} text-xs font-medium text-gray-700 uppercase tracking-wider cursor-pointer select-none hover:text-blue-600 transition-colors duration-200`}
              >
                <span className="inline-flex items-center gap-1">
                  {col.label}
                  {sortKey === col.key && (
                    <span className="text-[10px] text-blue-500">{sortOrder === 'asc' ? '▲' : '▼'}</span>
                  )}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {sortedClients.map((client) => (
            <tr key={client.id} className="hover:bg-blue-50 transition-all duration-200">
              <td className="px-4 py-3 text-sm font-medium text-gray-900">{client.codeClient}</td>
              <td className="px-4 py-3 text-sm text-gray-600">{client.nom}</td>
              <td className="px-4 py-3 text-sm text-gray-600">{client.ville}</td>
              <td className="px-4 py-3 text-sm text-gray-600">{client.typeClient}</td>
              <td className="px-4 py-3 text-sm text-gray-600">{client.typeVente}</td>
              <td className="px-4 py-3 text-sm text-gray-600">{client.groupeClient}</td>
              <td className="px-4 py-3 text-sm text-center text-gray-600">{client.devise}</td>
              <td className="px-4 py-3 text-center">
                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                  client.actif
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {client.actif ? 'Actif' : 'Inactif'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderFournisseursTable = () => (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gradient-to-r from-blue-50 to-cyan-50">
          <tr>
            {[
              { key: 'codeFournisseur', label: 'Code Fournisseur' },
              { key: 'nom', label: 'Nom' },
              { key: 'ville', label: 'Ville' },
              { key: 'pays', label: 'Pays' },
              { key: 'statut', label: 'Statut', align: 'center' },
            ].map((col) => (
              <th
                key={col.key}
                onClick={() => handleSort(col.key)}
                className={`px-4 py-3 text-${col.align ?? 'left'} text-xs font-medium text-gray-700 uppercase tracking-wider cursor-pointer select-none hover:text-blue-600 transition-colors duration-200`}
              >
                <span className="inline-flex items-center gap-1">
                  {col.label}
                  {sortKey === col.key && (
                    <span className="text-[10px] text-blue-500">{sortOrder === 'asc' ? '▲' : '▼'}</span>
                  )}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {sortedFournisseurs.map((fournisseur) => (
            <tr key={fournisseur.id} className="hover:bg-blue-50 transition-all duration-200">
              <td className="px-4 py-3 text-sm font-medium text-gray-900">{fournisseur.codeFournisseur}</td>
              <td className="px-4 py-3 text-sm text-gray-600">{fournisseur.nom}</td>
              <td className="px-4 py-3 text-sm text-gray-600">{fournisseur.ville ?? ''}</td>
              <td className="px-4 py-3 text-sm text-gray-600">{fournisseur.pays ?? ''}</td>
              <td className="px-4 py-3 text-center">
                <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                  {fournisseur.statut ?? ''}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Tables de Données</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Consultez et gérez vos données</p>
      </div>

      <div className="px-6 pt-6 bg-gradient-to-br from-gray-50 to-gray-100 sticky top-0 z-10">
        <div className="flex flex-col gap-4 border-b border-gray-200 pb-4 animate-fade-in-up">
          <div className="flex gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTable(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 font-medium transition-all duration-200 ${
                    activeTable === tab.id
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {tab.label}
                </button>
              );
            })}
          </div>
          <div className="flex items-center">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Rechercher..."
              className="w-full md:w-96 px-4 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white shadow-sm transition-all duration-200"
            />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <div className="p-6 pt-6">
          <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-xl overflow-hidden animate-scale-in hover-lift">
            {activeTable === 'articles' && renderArticlesTable()}
            {activeTable === 'clients' && renderClientsTable()}
            {activeTable === 'fournisseurs' && renderFournisseursTable()}
          </div>

            <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
              <div>
              {activeTable === 'articles' && `${sortedArticles.length} articles`}
              {activeTable === 'clients' && `${sortedClients.length} clients`}
              {activeTable === 'fournisseurs' && `${sortedFournisseurs.length} fournisseurs`}
              </div>
            {articlesError && activeTable === 'articles' && (
              <span className="text-xs text-amber-700 bg-amber-50 border border-amber-200 px-2 py-1 rounded">
                {articlesError}
              </span>
            )}
            {clientsError && activeTable === 'clients' && (
              <span className="text-xs text-amber-700 bg-amber-50 border border-amber-200 px-2 py-1 rounded">
                {clientsError}
              </span>
            )}
            {fournisseursError && activeTable === 'fournisseurs' && (
              <span className="text-xs text-amber-700 bg-amber-50 border border-amber-200 px-2 py-1 rounded">
                {fournisseursError}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
