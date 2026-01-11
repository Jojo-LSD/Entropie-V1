import { useEffect, useRef, useState, type ChangeEvent } from 'react';
import { Search, Filter, Package, Calendar, UploadCloud, Send, Loader2 } from 'lucide-react';
import { mockPurchaseOrders } from '../mock/purchaseOrders';
import type { PurchaseOrder } from '../types';
import { OrderRow } from '../components/purchase/OrderRow';
import toast from 'react-hot-toast';
import { uploadPurchaseOrderFile } from '../api/purchaseOrdersApi';

const UPLOAD_STORAGE_KEY = 'purchaseUploadInProgress';
const UPLOAD_ERROR_STORAGE_KEY = 'purchaseUploadError';

export const CommandeAchat = () => {
  const [orders, setOrders] = useState<PurchaseOrder[]>(mockPurchaseOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'validated'>('all');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isMountedRef = useRef(true);

  useEffect(() => {
    const uploadInProgress = sessionStorage.getItem(UPLOAD_STORAGE_KEY) === 'true';
    const storedError = sessionStorage.getItem(UPLOAD_ERROR_STORAGE_KEY);
    if (uploadInProgress) {
      setIsUploading(true);
    }
    if (storedError) {
      setUploadError(storedError);
    }

    return () => {
      isMountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (isUploading) {
      sessionStorage.setItem(UPLOAD_STORAGE_KEY, 'true');
    } else {
      sessionStorage.removeItem(UPLOAD_STORAGE_KEY);
      sessionStorage.removeItem(UPLOAD_ERROR_STORAGE_KEY);
    }
  }, [isUploading]);

  useEffect(() => {
    if (uploadError) {
      sessionStorage.setItem(UPLOAD_ERROR_STORAGE_KEY, uploadError);
    } else {
      sessionStorage.removeItem(UPLOAD_ERROR_STORAGE_KEY);
    }
  }, [uploadError]);

  const resetUploadState = () => {
    setIsUploading(false);
    setUploadError(null);
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleValidateOrder = (orderId: string) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: 'validated' as const } : order
      )
    );
  };

  const handleDeleteOrder = (orderId: string) => {
    setOrders((prevOrders) => prevOrders.filter((order) => order.id !== orderId));
  };

  const handleDeleteParcel = (orderId: string, lineId: string, parcelId: string) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) => {
        if (order.id !== orderId) return order;

        return {
          ...order,
          extractedLines: order.extractedLines.map((line) => {
            if (line.id !== lineId) return line;

            return {
              ...line,
              parcels: line.parcels.filter((parcel) => parcel.id !== parcelId),
              colisCount: line.parcels.filter((parcel) => parcel.id !== parcelId).length,
            };
          }),
        };
      })
    );
  };

  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setSelectedFile(file);
  };

  const handleSendFile = async () => {
    if (!selectedFile) {
      toast.error('Ajoutez un fichier avant d\'envoyer');
      return;
    }

    try {
      setIsUploading(true);
      setUploadError(null);
      const response = await uploadPurchaseOrderFile(selectedFile);
      toast.success(response.message || 'Fichier envoyé');
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      if (isMountedRef.current) {
        setIsUploading(false);
      } else {
        sessionStorage.removeItem(UPLOAD_STORAGE_KEY);
        sessionStorage.removeItem(UPLOAD_ERROR_STORAGE_KEY);
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Impossible d\'envoyer le fichier pour le moment';
      console.error('Erreur lors de l\'envoi du fichier', error);
      toast.error(message);
      if (isMountedRef.current) {
        setUploadError(message);
        setIsUploading(true); // keep the loader visible until manual reset
      } else {
        sessionStorage.setItem(UPLOAD_STORAGE_KEY, 'true');
        sessionStorage.setItem(UPLOAD_ERROR_STORAGE_KEY, message);
      }
    }
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.ref.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.fournisseur.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.extractedLines.some((line) =>
        line.productName.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-full bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="p-8 pb-8">
        <div className="mb-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg">
              <Package className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>Gestion des Commandes</h1>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Gérez vos commandes d'achat et validez les livraisons</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Rechercher une commande ou un produit..."
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent shadow-sm bg-white"
              />
            </div>

            <div className="flex items-center space-x-3">
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as 'all' | 'pending' | 'validated')}
                  className="pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white shadow-sm appearance-none"
                >
                  <option value="all">Tous les statuts</option>
                  <option value="pending">En attente</option>
                  <option value="validated">Validé</option>
                </select>
              </div>

              <select className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white shadow-sm">
                <option value="">Tous les fournisseurs</option>
                <option value="abp">ABP NEWRY</option>
                <option value="bigard">BIGARD TOULOUSE</option>
                <option value="charal">CHARAL CHAMBÉRY</option>
              </select>

              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="date"
                  className="pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white shadow-sm"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/90 backdrop-blur-sm rounded-xl border border-gray-200 shadow-sm p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-md">
                <UploadCloud className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Envoyer un bon de commande</h3>
                <p className="text-sm text-gray-600">
                  Chargez un fichier puis envoyez-le via l&apos;API POST pour déclencher votre automatisation.
                </p>
                {selectedFile ? (
                  <p className="text-sm text-blue-600 mt-2">
                    Fichier sélectionné : <span className="font-medium">{selectedFile.name}</span>
                  </p>
                ) : (
                  <p className="text-sm text-gray-500 mt-2">Formats acceptés : PDF, Excel ou images.</p>
                )}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.csv,.xlsx,.xls,image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center justify-center px-4 py-2 rounded-lg border border-orange-200 text-orange-700 bg-orange-50 hover:bg-orange-100 font-semibold transition-colors shadow-sm"
              >
                <UploadCloud className="h-4 w-4 mr-2" />
                Choisir un fichier
              </button>
              <button
                type="button"
                onClick={handleSendFile}
                disabled={!selectedFile || isUploading}
                className="inline-flex items-center justify-center px-5 py-2 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold shadow-sm hover:from-orange-600 hover:to-red-600 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isUploading ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Send className="h-4 w-4 mr-2" />
                )}
                Envoyer
              </button>
              {isUploading && (
                <div className="flex items-start px-3 py-2 rounded-lg border border-orange-200 bg-orange-50 text-orange-800 shadow-sm space-x-2">
                  <Loader2 className="h-4 w-4 mt-0.5 animate-spin" />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">Vérification de document en cours</span>
                    {uploadError && (
                      <div className="flex items-center space-x-2 text-xs text-red-700">
                        <span>Erreur : {uploadError}</span>
                        <button
                          type="button"
                          onClick={resetUploadState}
                          className="font-semibold underline underline-offset-2"
                        >
                          Réinitialiser
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-orange-500 to-red-500 px-6 py-4">
            <h2 className="text-lg font-semibold text-white flex items-center">
              <Package className="h-5 w-5 mr-2" />
              Liste des commandes
              <span className="ml-3 bg-orange-400 bg-opacity-50 px-3 py-1 rounded-full text-sm font-medium">
                {filteredOrders.length} commande{filteredOrders.length !== 1 ? 's' : ''}
              </span>
            </h2>
          </div>

          <div className="p-6 space-y-4">
            {filteredOrders.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Package className="h-8 w-8 text-gray-400" />
                </div>
                <p className="text-gray-500 text-lg">Aucune commande trouvée</p>
                <p className="text-gray-400 text-sm mt-2">Essayez de modifier vos critères de recherche</p>
              </div>
            ) : (
              filteredOrders.map((order) => (
                <OrderRow
                  key={order.id}
                  order={order}
                  onValidate={handleValidateOrder}
                  onDelete={handleDeleteOrder}
                  onDeleteParcel={handleDeleteParcel}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
