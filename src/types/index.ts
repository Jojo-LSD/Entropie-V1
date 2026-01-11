export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface ChatMessage {
  id: string;
  content: string;
  type: 'user' | 'assistant';
  timestamp: Date;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
}

export interface KPI {
  id: string;
  title: string;
  value: string;
  change: number;
  changeType: 'increase' | 'decrease';
  icon: string;
}

export interface SalesData {
  date: string;
  value: number;
}

export interface StockData {
  category: string;
  value: number;
  color: string;
}

export interface ContactForm {
  entreprise: string;
  departement: string;
  email: string;
  telephone: string;
  modeContact: 'email' | 'telephone' | 'courrier';
  typedemande: string;
  priorite: string;
  budget: string;
  delai: string;
  sujet: string;
  description: string;
}

export type Period = '7d' | '30d' | '90d';

export interface Parcel {
  id: string;
  weight: number;
  quantity: number;
  unit: string;
  traceability: {
    ne: string;
    eleve: string;
    abattu: string;
    decoupe: string;
    numeroLot: string;
    lotInterne: string;
    numeroAbattoir: string;
    agrDecoupe: string;
    dateAbattage: string;
    dateDecoupe: string;
    dlc: string;
    categorie: string;
    type: string;
    espece: string;
  };
}

export interface ExtractedLine {
  id: string;
  productCode: string;
  productName: string;
  description: string;
  unitPrice: number;
  colisCount: number;
  totalWeightKg: number;
  totalAmount: number;
  parcels: Parcel[];
}

export interface PurchaseOrder {
  id: string;
  ref: string;
  fournisseur: string;
  codeFournisseur: string;
  poidsTotalKg: number;
  dateCommande: string;
  dateLivraison: string;
  status: 'pending' | 'validated';
  documentUrl: string;
  extractedLines: ExtractedLine[];
}

export interface Article {
  id: string;
  code: string;
  nom: string;
  categorie: string | null;
  espece: string | null;
  morceau: string | null;
  unite: string | null;
  statut: 'actif' | 'inactif';
}

export interface Client {
  id: string;
  codeClient: string;
  nom: string;
  ville: string;
  typeClient: string;
  typeVente: string;
  groupeClient: string;
  devise: string;
  actif: boolean;
}

export interface Fournisseur {
  id: string;
  codeFournisseur: string;
  nom: string;
  ville: string | null;
  pays: string | null;
  statut: string | null;
}

export type TableType = 'articles' | 'clients' | 'fournisseurs';
