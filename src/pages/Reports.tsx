import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FileText, Send, Loader2, Phone, Mail, MessageSquare } from 'lucide-react';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Textarea } from '../components/ui/Textarea';
import toast from 'react-hot-toast';

const supportSchema = z.object({
  contactMode: z.enum(['email', 'phone', 'both']),
  requestType: z.string().min(1, 'Type de demande requis'),
  priority: z.string().min(1, 'Priorité requise'),
  budget: z.string().optional(),
  deadline: z.string().optional(),
  subject: z.string().min(3, 'Le sujet doit contenir au moins 3 caractères'),
  description: z.string().min(10, 'La description doit contenir au moins 10 caractères'),
  attachments: z.string().optional(),
});

type SupportFormData = z.infer<typeof supportSchema>;

export const Reports = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SupportFormData>({
    resolver: zodResolver(supportSchema),
    defaultValues: {
      contactMode: 'email',
      requestType: 'conseil',
      priority: 'normale',
      budget: 'non-defini',
      deadline: 'non-defini',
    },
  });

  const onSubmit = async (data: SupportFormData) => {
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      console.log('Support Request:', data);

      toast.success('Votre demande a été envoyée avec succès!');
      reset();
    } catch (error) {
      console.error('Error submitting support request:', error);
      toast.error('Une erreur est survenue lors de l\'envoi de votre demande');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-8">
      <div className="flex items-center space-x-4">
        <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl flex items-center justify-center shadow-lg">
          <FileText className="h-7 w-7 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Demande de Support</h1>
          <p className="text-gray-600">Soumettez une demande et notre équipe vous contactera</p>
        </div>
      </div>

      <Card variant="elevated">
        <CardContent className="p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                Mode de contact préféré <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center space-x-6">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    value="email"
                    {...register('contactMode')}
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="text-gray-700">Email</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    value="phone"
                    {...register('contactMode')}
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="text-gray-700">Téléphone</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    value="both"
                    {...register('contactMode')}
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="text-gray-700">Les deux</span>
                </label>
              </div>
              {errors.contactMode && (
                <p className="mt-2 text-sm text-red-600">{errors.contactMode.message}</p>
              )}
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Détails de la demande</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Type de demande <span className="text-red-500">*</span>
                  </label>
                  <select
                    {...register('requestType')}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                  >
                    <option value="conseil">Conseil</option>
                    <option value="technique">Support Technique</option>
                    <option value="commercial">Question Commerciale</option>
                    <option value="facturation">Facturation</option>
                    <option value="autre">Autre</option>
                  </select>
                  {errors.requestType && (
                    <p className="mt-2 text-sm text-red-600">{errors.requestType.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Priorité <span className="text-red-500">*</span>
                  </label>
                  <select
                    {...register('priority')}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                  >
                    <option value="basse">Basse - Plus d'une semaine</option>
                    <option value="normale">Normale - Sous quelques jours</option>
                    <option value="haute">Haute - Dans les 24h</option>
                    <option value="urgente">Urgente - Immédiat</option>
                  </select>
                  {errors.priority && (
                    <p className="mt-2 text-sm text-red-600">{errors.priority.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Budget estimé
                  </label>
                  <select
                    {...register('budget')}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                  >
                    <option value="non-defini">Non défini</option>
                    <option value="moins-1000">Moins de 1 000€</option>
                    <option value="1000-5000">1 000€ - 5 000€</option>
                    <option value="5000-10000">5 000€ - 10 000€</option>
                    <option value="plus-10000">Plus de 10 000€</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Délai souhaité
                  </label>
                  <select
                    {...register('deadline')}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                  >
                    <option value="non-defini">Non défini</option>
                    <option value="1-semaine">Dans 1 semaine</option>
                    <option value="2-semaines">Dans 2 semaines</option>
                    <option value="1-mois">Dans 1 mois</option>
                    <option value="3-mois">Dans 3 mois</option>
                    <option value="flexible">Flexible</option>
                  </select>
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Sujet <span className="text-red-500">*</span>
                </label>
                <Input
                  {...register('subject')}
                  placeholder="Résumez votre demande en quelques mots"
                  error={errors.subject?.message}
                />
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Description détaillée <span className="text-red-500">*</span>
                </label>
                <Textarea
                  {...register('description')}
                  rows={8}
                  placeholder="Décrivez votre demande de manière détaillée : contexte, objectifs, contraintes, etc."
                  error={errors.description?.message}
                />
                <p className="mt-2 text-sm text-gray-500">
                  Plus votre description sera précise, mieux nous pourrons vous aider.
                </p>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Pièces jointes (description)
                </label>
                <Input
                  {...register('attachments')}
                  placeholder="ex: Cahier des charges.pdf, Plan actuel.xlsx"
                />
                <p className="mt-2 text-sm text-gray-500">
                  Décrivez les documents que vous pourrez nous transmettre par email après l'envoi.
                </p>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">Informations importantes</h3>
              <ul className="space-y-2 text-blue-900">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Nous répondons généralement sous 24-48h</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Pour les demandes urgentes, nous vous contacterons prioritairement</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Vous recevrez une confirmation par email</span>
                </li>
              </ul>
            </div>

            <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
              <Button
                type="button"
                variant="outline"
                onClick={() => reset()}
                disabled={isSubmitting}
              >
                Réinitialiser
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="min-w-[180px]"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Envoi...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Envoyer la demande
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card variant="elevated">
        <CardContent className="p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Besoin d'aide immédiate ?</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-gray-900">
                <Phone className="h-5 w-5" />
                <h3 className="font-semibold">Téléphone</h3>
              </div>
              <p className="text-lg font-medium text-gray-900">01 23 45 67 89</p>
              <p className="text-sm text-gray-500">Lun-Ven 9h-18h</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-gray-900">
                <Mail className="h-5 w-5" />
                <h3 className="font-semibold">Email</h3>
              </div>
              <p className="text-lg font-medium text-gray-900">support@dashboard.com</p>
              <p className="text-sm text-gray-500">Réponse sous 24h</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-gray-900">
                <MessageSquare className="h-5 w-5" />
                <h3 className="font-semibold">Chat en direct</h3>
              </div>
              <p className="text-lg font-medium text-gray-900">Disponible 24/7</p>
              <p className="text-sm text-gray-500">Réponse immédiate</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
