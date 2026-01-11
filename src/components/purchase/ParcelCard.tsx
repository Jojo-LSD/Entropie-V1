import { Trash2, Scale, Package, Globe, Factory, Scissors, Hash, Calendar, Clock, Tag } from 'lucide-react';
import type { Parcel } from '../../types';

interface ParcelCardProps {
  parcel: Parcel;
  onDelete: (parcelId: string) => void;
}

export const ParcelCard = ({ parcel, onDelete }: ParcelCardProps) => {
  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition-all">
      <div className="flex items-start justify-between mb-5">
        <div className="flex items-center space-x-6">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-4 text-white shadow-md">
            <div className="flex items-center space-x-2 mb-1">
              <Scale className="h-4 w-4" />
              <div className="text-2xl font-bold">{parcel.weight}</div>
            </div>
            <div className="text-xs opacity-90">Poids (N)</div>
          </div>
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-4 text-white shadow-md">
            <div className="flex items-center space-x-2 mb-1">
              <Package className="h-4 w-4" />
              <div className="text-2xl font-bold">{parcel.quantity}</div>
            </div>
            <div className="text-xs opacity-90">{parcel.unit}</div>
          </div>
        </div>
        <button
          onClick={() => onDelete(parcel.id)}
          className="w-9 h-9 flex items-center justify-center rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors"
          title="Supprimer le colis"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        <div className="col-span-1">
          <label className="text-xs font-semibold text-gray-600 flex items-center mb-1.5">
            <Globe className="h-3 w-3 mr-1 text-blue-500" />
            Né
          </label>
          <div className="bg-white border border-blue-200 rounded-lg px-3 py-2 text-sm font-medium text-gray-900 shadow-sm">
            {parcel.traceability.ne}
          </div>
        </div>

        <div className="col-span-1">
          <label className="text-xs font-semibold text-gray-600 flex items-center mb-1.5">
            <Globe className="h-3 w-3 mr-1 text-green-500" />
            Élevé
          </label>
          <div className="bg-white border border-green-200 rounded-lg px-3 py-2 text-sm font-medium text-gray-900 shadow-sm">
            {parcel.traceability.eleve}
          </div>
        </div>

        <div className="col-span-1">
          <label className="text-xs font-semibold text-gray-600 flex items-center mb-1.5">
            <Factory className="h-3 w-3 mr-1 text-red-500" />
            Abattu
          </label>
          <div className="bg-white border border-red-200 rounded-lg px-3 py-2 text-sm font-medium text-gray-900 shadow-sm">
            {parcel.traceability.abattu}
          </div>
        </div>

        <div className="col-span-1">
          <label className="text-xs font-semibold text-gray-600 flex items-center mb-1.5">
            <Scissors className="h-3 w-3 mr-1 text-purple-500" />
            Découpe
          </label>
          <div className="bg-white border border-purple-200 rounded-lg px-3 py-2 text-sm font-medium text-gray-900 shadow-sm">
            {parcel.traceability.decoupe}
          </div>
        </div>

        <div className="col-span-1">
          <label className="text-xs font-semibold text-gray-600 flex items-center mb-1.5">
            <Hash className="h-3 w-3 mr-1 text-indigo-500" />
            N° de lot
          </label>
          <div className="bg-white border border-indigo-200 rounded-lg px-3 py-2 text-sm font-medium text-gray-900 truncate shadow-sm" title={parcel.traceability.numeroLot}>
            {parcel.traceability.numeroLot}
          </div>
        </div>

        <div className="col-span-1">
          <label className="text-xs font-semibold text-gray-600 flex items-center mb-1.5">
            <Tag className="h-3 w-3 mr-1 text-cyan-500" />
            Lot interne
          </label>
          <div className="bg-white border border-cyan-200 rounded-lg px-3 py-2 text-sm font-medium text-gray-900 truncate shadow-sm" title={parcel.traceability.lotInterne}>
            {parcel.traceability.lotInterne}
          </div>
        </div>

        <div className="col-span-1">
          <label className="text-xs font-semibold text-gray-600 flex items-center mb-1.5">
            <Factory className="h-3 w-3 mr-1 text-orange-500" />
            N° abattoir
          </label>
          <div className="bg-white border border-orange-200 rounded-lg px-3 py-2 text-sm font-medium text-gray-900 truncate shadow-sm" title={parcel.traceability.numeroAbattoir}>
            {parcel.traceability.numeroAbattoir}
          </div>
        </div>

        <div className="col-span-1">
          <label className="text-xs font-semibold text-gray-600 flex items-center mb-1.5">
            <Scissors className="h-3 w-3 mr-1 text-pink-500" />
            Agr. déc.
          </label>
          <div className="bg-white border border-pink-200 rounded-lg px-3 py-2 text-sm font-medium text-gray-900 truncate shadow-sm" title={parcel.traceability.agrDecoupe}>
            {parcel.traceability.agrDecoupe}
          </div>
        </div>

        <div className="col-span-1">
          <label className="text-xs font-semibold text-gray-600 flex items-center mb-1.5">
            <Calendar className="h-3 w-3 mr-1 text-blue-500" />
            Date ab.
          </label>
          <div className="bg-white border border-blue-200 rounded-lg px-3 py-2 text-sm font-medium text-gray-900 shadow-sm">
            {new Date(parcel.traceability.dateAbattage).toLocaleDateString('fr-FR')}
          </div>
        </div>

        <div className="col-span-1">
          <label className="text-xs font-semibold text-gray-600 flex items-center mb-1.5">
            <Calendar className="h-3 w-3 mr-1 text-purple-500" />
            Date découpe
          </label>
          <div className="bg-white border border-purple-200 rounded-lg px-3 py-2 text-sm font-medium text-gray-900 shadow-sm">
            {new Date(parcel.traceability.dateDecoupe).toLocaleDateString('fr-FR')}
          </div>
        </div>

        <div className="col-span-1">
          <label className="text-xs font-semibold text-gray-600 flex items-center mb-1.5">
            <Clock className="h-3 w-3 mr-1 text-red-500" />
            DLC
          </label>
          <div className="bg-red-50 border border-red-300 rounded-lg px-3 py-2 text-sm font-bold text-red-700 shadow-sm">
            {new Date(parcel.traceability.dlc).toLocaleDateString('fr-FR')}
          </div>
        </div>

        <div className="col-span-1">
          <label className="text-xs font-semibold text-gray-600 flex items-center mb-1.5">
            <Tag className="h-3 w-3 mr-1 text-emerald-500" />
            Catégorie
          </label>
          <div className="bg-white border border-emerald-200 rounded-lg px-3 py-2 text-sm font-medium text-gray-900 shadow-sm">
            {parcel.traceability.categorie}
          </div>
        </div>

        <div className="col-span-1">
          <label className="text-xs font-semibold text-gray-600 flex items-center mb-1.5">
            <Tag className="h-3 w-3 mr-1 text-amber-500" />
            Type
          </label>
          <div className="bg-white border border-amber-200 rounded-lg px-3 py-2 text-sm font-medium text-gray-900 truncate shadow-sm" title={parcel.traceability.type}>
            {parcel.traceability.type}
          </div>
        </div>

        <div className="col-span-1">
          <label className="text-xs font-semibold text-gray-600 flex items-center mb-1.5">
            <Tag className="h-3 w-3 mr-1 text-teal-500" />
            Espèce
          </label>
          <div className="bg-white border border-teal-200 rounded-lg px-3 py-2 text-sm font-medium text-gray-900 shadow-sm">
            {parcel.traceability.espece}
          </div>
        </div>
      </div>
    </div>
  );
};
