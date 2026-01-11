import { ChatMessage } from '../types';

export const mockChatResponses = [
  "Bonjour ! Comment puis-je vous aider avec votre boucherie aujourd'hui ?",
  "D'après vos données, je vois une belle progression sur les ventes de viande ce mois.",
  "Pour optimiser votre stock, je recommande de surveiller la rotation des produits périssables.",
  "Souhaitez-vous que je vous aide à analyser vos performances de vente ?",
  "Je peux vous fournir des insights sur vos tendances de clientèle si vous le souhaitez.",
];

export const getRandomResponse = (): string => {
  return mockChatResponses[Math.floor(Math.random() * mockChatResponses.length)];
};

export const simulateAPIDelay = (): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(getRandomResponse());
    }, 1000 + Math.random() * 2000);
  });
};