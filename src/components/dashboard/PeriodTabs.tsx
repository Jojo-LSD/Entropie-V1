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
    <div className="flex space-x-1 bg-slate-100 rounded-xl p-1">
      {periods.map(period => (
        <button
          key={period.value}
          onClick={() => onPeriodChange(period.value)}
          className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
            selectedPeriod === period.value
              ? 'bg-white text-slate-900 shadow-md'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
          }`}
        >
          {period.label}
        </button>
      ))}
    </div>
  );
};