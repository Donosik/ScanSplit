import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface CurrencySelectProps {
  value: string;
  onValueChange: (value: string) => void;
  currencies: string[];
}

export default function CurrencySelect({ value, onValueChange, currencies }: CurrencySelectProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-[100px]">
        <SelectValue placeholder="Currency" />
      </SelectTrigger>
      <SelectContent>
        {currencies.map((currency) => (
          <SelectItem key={currency} value={currency}>
            {currency}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}