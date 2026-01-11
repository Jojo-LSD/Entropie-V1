import { useState } from 'react';
import { ChevronDown, ChevronUp, Package, Scale, Euro, Tag, Box } from 'lucide-react';
import type { ExtractedLine } from '../../types';
import { ParcelCard } from './ParcelCard';

interface ProductCardProps {
  line: ExtractedLine;
  onDeleteParcel: (lineId: string, parcelId: string) => void;
}

export const ProductCard = ({ line, onDeleteParcel }: ProductCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border border-gray-200 rounded-xl bg-white overflow-hidden shadow-sm hover:shadow-md transition-all">
      <div
        className="p-5 cursor-pointer hover:bg-gradient-to-r hover:from-blue-50 hover:to-white transition-all"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm flex items-center space-x-1">
                <Tag className="h-3 w-3" />
                <span>{line.productCode}</span>
              </div>
              <h4 className="text-base font-bold text-gray-900">{line.productName}</h4>
            </div>
            <p className="text-sm text-gray-600 flex items-center">
              <Box className="h-3.5 w-3.5 mr-1.5 text-gray-400" />
              {line.description}
            </p>
          </div>

          <div className="flex items-center space-x-4 ml-4">
            <div className="text-right bg-green-50 rounded-lg px-4 py-2 border border-green-200">
              <div className="flex items-center justify-end space-x-1 mb-0.5">
                <Euro className="h-3.5 w-3.5 text-green-600" />
                <span className="text-lg font-bold text-gray-900">{line.unitPrice.toFixed(2)}</span>
              </div>
              <div className="text-xs text-gray-600">Prix unitaire</div>
            </div>

            <div className="bg-orange-50 rounded-lg px-4 py-2 border border-orange-200">
              <div className="flex items-center space-x-2 text-gray-900 mb-0.5">
                <Package className="h-4 w-4 text-orange-600" />
                <span className="font-bold text-lg">{line.colisCount}</span>
              </div>
              <div className="text-xs text-gray-600 text-center">Colis</div>
            </div>

            <div className="text-right bg-purple-50 rounded-lg px-4 py-2 border border-purple-200">
              <div className="flex items-center justify-end space-x-1 mb-0.5">
                <Scale className="h-3.5 w-3.5 text-purple-600" />
                <span className="text-lg font-bold text-gray-900">{line.totalWeightKg.toFixed(2)}</span>
              </div>
              <div className="text-xs text-gray-600">Kg</div>
            </div>

            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 text-gray-600 hover:bg-blue-100 hover:text-blue-600 transition-colors">
              {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="border-t border-gray-200 p-5 bg-gradient-to-br from-gray-50 to-white">
          <div className="mb-4 flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <Package className="h-4 w-4 text-blue-600" />
            </div>
            <h5 className="text-sm font-bold text-gray-900">
              Détails des colis ({line.parcels.length})
            </h5>
          </div>
          <div className="space-y-3">
            {line.parcels.map((parcel) => (
              <ParcelCard
                key={parcel.id}
                parcel={parcel}
                onDelete={(parcelId) => onDeleteParcel(line.id, parcelId)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
