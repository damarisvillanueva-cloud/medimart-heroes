import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";

interface QuantitySelectorProps {
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  maxQuantity: number;
  minQuantity?: number;
}

const QuantitySelector = ({ 
  quantity, 
  onQuantityChange, 
  maxQuantity,
  minQuantity = 1 
}: QuantitySelectorProps) => {
  const handleDecrease = () => {
    if (quantity > minQuantity) {
      onQuantityChange(quantity - 1);
    }
  };

  const handleIncrease = () => {
    if (quantity < maxQuantity) {
      onQuantityChange(quantity + 1);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="icon"
        onClick={handleDecrease}
        disabled={quantity <= minQuantity}
        className="h-9 w-9"
      >
        <Minus className="h-4 w-4" />
      </Button>
      <div className="w-16 text-center">
        <span className="text-lg font-semibold">{quantity}</span>
      </div>
      <Button
        variant="outline"
        size="icon"
        onClick={handleIncrease}
        disabled={quantity >= maxQuantity}
        className="h-9 w-9"
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default QuantitySelector;
