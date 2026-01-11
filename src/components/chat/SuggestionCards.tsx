import { Image, FileText, Code } from 'lucide-react';

interface SuggestionCard {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const suggestions: SuggestionCard[] = [
  {
    icon: <Image className="h-6 w-6 text-gray-600" />,
    title: 'Image Generator',
    description: 'Generate stunning images instantly from text prompts.'
  },
  {
    icon: <FileText className="h-6 w-6 text-gray-600" />,
    title: 'Write Copy',
    description: 'Craft engaging and persuasive text effortlessly.'
  },
  {
    icon: <Code className="h-6 w-6 text-gray-600" />,
    title: 'Write Code',
    description: 'Quickly generate clean and efficient code from text.'
  }
];

interface SuggestionCardsProps {
  onSelect?: (title: string) => void;
}

export const SuggestionCards = ({ onSelect }: SuggestionCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
      {suggestions.map((suggestion, index) => (
        <button
          key={index}
          onClick={() => onSelect?.(suggestion.title)}
          className="bg-white border border-gray-200 hover:border-lime-300 hover:shadow-lg rounded-2xl p-6 text-left transition-all duration-200 group"
        >
          <div className="mb-4 p-3 bg-gray-50 rounded-xl inline-flex group-hover:bg-lime-50 transition-colors">
            {suggestion.icon}
          </div>
          <h3 className="text-base font-semibold text-gray-900 mb-2">{suggestion.title}</h3>
          <p className="text-sm text-gray-600 leading-relaxed">{suggestion.description}</p>
        </button>
      ))}
    </div>
  );
};
