import { Period } from '../../types';

interface PeriodTabsProps {
  selectedPeriod: Period;
  onPeriodChange: (period: Period) => void;
}

export const PeriodTabs = ({ selectedPeriod, onPeriodChange }: PeriodTabsProps) => {
  const periods: { value: Period; label: string }[] = [
    { value: '7d', label: '7 jours' },
    { value: '30d', label: '30 jours' },
    { value: '90d', label: '90 jours' }
  ];

  return (
    <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
      {periods.map(period => (
        <button
          key={period.value}
          onClick={() => onPeriodChange(period.value)}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            selectedPeriod === period.value
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          {period.label}
        </button>
      ))}
    </div>
  );
};