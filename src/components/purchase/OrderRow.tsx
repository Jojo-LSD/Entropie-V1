import { useState } from 'react';
import { ChevronRight, ChevronDown, Scale, Calendar, Trash2, CheckCircle, Building2, Hash, Package } from 'lucide-react';
import type { PurchaseOrder } from '../../types';
import { DocumentViewer } from './DocumentViewer';
import { ProductCard } from './ProductCard';

interface OrderRowProps {
  order: PurchaseOrder;
  onValidate: (orderId: string) => void;
  onDelete: (orderId: string) => void;
  onDeleteParcel: (orderId: string, lineId: string, parcelId: string) => void;
}

export const OrderRow = ({ order, onValidate, onDelete, onDeleteParcel }: OrderRowProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const totalLines = order.extractedLines.length;
  const totalParcels = order.extractedLines.reduce((sum, line) => sum + line.parcels.length, 0);

  return (
    <div className="border border-gray-200 rounded-xl bg-white overflow-hidden shadow-sm hover:shadow-md transition-all">
      <div
        className="p-5 cursor-pointer hover:bg-gradient-to-r hover:from-gray-50 hover:to-white transition-all"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center space-x-4">
          <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 text-gray-600 hover:bg-blue-100 hover:text-blue-600 transition-colors">
            {isExpanded ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
          </button>

          <div className="flex-1 grid grid-cols-12 gap-4 items-center">
            <div className="col-span-2">
              <div className="flex items-center space-x-2 mb-1">
                <Hash className="h-3.5 w-3.5 text-gray-400" />
                <span className="text-blue-600 font-bold text-base">{order.ref}</span>
              </div>
              <span className="text-xs text-gray-500 font-medium">Référence</span>
            </div>

            <div className="col-span-3">
              <div className="flex items-center space-x-2 mb-1">
                <Building2 className="h-4 w-4 text-gray-400" />
                <span className="font-bold text-gray-900">{order.fournisseur}</span>
              </div>
              <div className="text-sm text-gray-600">{order.codeFournisseur}</div>
            </div>

            <div className="col-span-2">
              <div className="bg-purple-50 rounded-lg px-3 py-2 inline-flex items-center space-x-2">
                <Scale className="h-4 w-4 text-purple-600" />
                <span className="font-bold text-gray-900">{order.poidsTotalKg.toFixed(2)}</span>
                <span className="text-sm text-gray-600">Kg</span>
              </div>
            </div>

            <div className="col-span-2">
              <div className="space-y-1.5">
                <div className="flex items-center space-x-1.5 text-sm text-gray-700 bg-gray-50 rounded-md px-2 py-1">
                  <Calendar className="h-3.5 w-3.5 text-blue-500" />
                  <span className="font-medium">{new Date(order.dateCommande).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' })}</span>
                </div>
                <div className="flex items-center space-x-1.5 text-sm text-gray-700 bg-green-50 rounded-md px-2 py-1">
                  <Calendar className="h-3.5 w-3.5 text-green-500" />
                  <span className="font-medium">{new Date(order.dateLivraison).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' })}</span>
                </div>
              </div>
            </div>

            <div className="col-span-3 flex items-center justify-end space-x-3">
              {order.status === 'validated' ? (
                <div className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg shadow-sm">
                  <CheckCircle className="h-4 w-4" />
                  <span className="text-sm font-semibold">Validé !</span>
                </div>
              ) : (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onValidate(order.id);
                  }}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-5 py-2 rounded-lg text-sm font-semibold transition-all shadow-sm hover:shadow-md"
                >
                  Valider
                </button>
              )}

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(order.id);
                }}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="border-t border-gray-200 bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="grid grid-cols-2 gap-6 p-6">
            <div className="h-[600px]">
              <DocumentViewer documentUrl={order.documentUrl} supplier={order.fournisseur} />
            </div>

            <div className="space-y-4">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-5 border border-blue-200 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6 text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Package className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <div className="text-xs text-gray-600">Lignes extraites</div>
                        <div className="font-bold text-gray-900">{totalLines}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Scale className="h-4 w-4 text-purple-600" />
                      </div>
                      <div>
                        <div className="text-xs text-gray-600">Poids total</div>
                        <div className="font-bold text-gray-900">{order.poidsTotalKg.toFixed(2)} Kg</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                        <Package className="h-4 w-4 text-orange-600" />
                      </div>
                      <div>
                        <div className="text-xs text-gray-600">Nb colis</div>
                        <div className="font-bold text-gray-900">{totalParcels}</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-lg shadow-sm">
                    <CheckCircle className="h-4 w-4" />
                    <span className="text-sm font-semibold">Extraction OK</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 max-h-[520px] overflow-y-auto pr-2">
                {order.extractedLines.map((line) => (
                  <ProductCard
                    key={line.id}
                    line={line}
                    onDeleteParcel={(lineId, parcelId) => onDeleteParcel(order.id, lineId, parcelId)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
