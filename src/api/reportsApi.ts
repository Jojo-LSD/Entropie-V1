import { ContactForm } from '../types';

export class ReportsService {
  async submitContactForm(formData: ContactForm): Promise<{ success: boolean; message: string }> {
    // Placeholder: envoyer vers le backend FastAPI quand l'endpoint sera prêt.
    console.info('Formulaire reçu (mock):', formData);
    return {
      success: true,
      message: 'Votre demande a été enregistrée (mock).',
    };
  }
}

export const reportsService = new ReportsService();
