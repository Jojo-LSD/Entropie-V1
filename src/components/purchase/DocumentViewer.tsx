import { ZoomIn, ZoomOut, FileText, Building2, Download, Maximize2 } from 'lucide-react';

interface DocumentViewerProps {
  documentUrl: string;
  supplier: string;
}

export const DocumentViewer = ({ documentUrl, supplier }: DocumentViewerProps) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden h-full flex flex-col shadow-lg">
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-5 py-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-white flex items-center">
            <FileText className="h-4 w-4 mr-2" />
            Bon de livraison / Customer Despatch
          </h3>
          <div className="flex items-center space-x-2">
            <button
              className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
              title="Zoom avant"
            >
              <ZoomIn className="h-4 w-4 text-white" />
            </button>
            <button
              className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
              title="Zoom arrière"
            >
              <ZoomOut className="h-4 w-4 text-white" />
            </button>
            <button
              className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
              title="Plein écran"
            >
              <Maximize2 className="h-4 w-4 text-white" />
            </button>
            <button
              className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
              title="Télécharger"
            >
              <Download className="h-4 w-4 text-white" />
            </button>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-md">
            <Building2 className="h-5 w-5 text-white" />
          </div>
          <span className="text-sm font-medium text-gray-200">{supplier}</span>
        </div>
      </div>

      <div className="flex-1 bg-gradient-to-br from-gray-50 to-gray-100 p-8 overflow-auto">
        <div className="bg-white shadow-xl rounded-xl p-8 max-w-2xl mx-auto border border-gray-200">
          <div className="space-y-6">
            <div className="border-b-2 border-gray-200 pb-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-1">{supplier}</h2>
                  <p className="text-sm font-medium text-gray-500 flex items-center">
                    <FileText className="h-3.5 w-3.5 mr-1.5" />
                    Customer Despatch Note
                  </p>
                </div>
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Building2 className="h-10 w-10 text-white" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2">Expéditeur</h3>
                <div className="text-sm text-gray-900">
                  <p className="font-semibold">{supplier}</p>
                  <p>123 Industrial Estate</p>
                  <p>Business Park, Region</p>
                  <p>Postal Code, Country</p>
                </div>
              </div>
              <div>
                <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2">Destinataire</h3>
                <div className="text-sm text-gray-900">
                  <p className="font-semibold">Boucherie Client</p>
                  <p>45 Rue du Commerce</p>
                  <p>75001 Paris</p>
                  <p>France</p>
                </div>
              </div>
            </div>

            <div className="border-t pt-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Articles expédiés</h3>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 text-gray-600 font-medium">Code</th>
                    <th className="text-left py-2 text-gray-600 font-medium">Description</th>
                    <th className="text-right py-2 text-gray-600 font-medium">Qté</th>
                    <th className="text-right py-2 text-gray-600 font-medium">Poids</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-2">44404</td>
                    <td className="py-2">DESSUS PAL BF PAD</td>
                    <td className="text-right py-2">3</td>
                    <td className="text-right py-2">72.42 kg</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">44308</td>
                    <td className="py-2">FAUX FILET BF PAD</td>
                    <td className="text-right py-2">2</td>
                    <td className="text-right py-2">45.80 kg</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="border-t pt-4 flex justify-between items-end">
              <div className="text-xs text-gray-500">
                <p>Document généré automatiquement</p>
                <p>Date d'impression: {new Date().toLocaleDateString('fr-FR')}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-900">Poids total</p>
                <p className="text-xl font-bold text-gray-900">118.22 kg</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
