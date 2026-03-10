import React, { useState, useEffect } from 'react';
import { ShoppingCart } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from './ui/dialog';
import { Button } from './ui/button';
import { useCart } from '../contexts/CartContext';
import { toast } from './ui/sonner';

export function ItemDialog({ item, open, onOpenChange }) {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const sizes = item?.sizes ?? [];

  useEffect(() => {
    if (open && item) {
      const s = item.sizes ?? [];
      setSelectedSize(s.length > 0 ? s[0] : null);
      setQuantity(1);
    }
  }, [open, item]);

  if (!item) return null;

  const getPriceForSize = (size) => {
    if (item.sizePrices && size && item.sizePrices[size] != null) {
      return item.sizePrices[size];
    }
    return item.price;
  };

  const displayPrice = getPriceForSize(selectedSize);

  const handleAddToCart = () => {
    if (sizes.length > 0 && !selectedSize) return;
    addToCart(item, {
      size: selectedSize || undefined,
      quantity,
      unitPrice: displayPrice,
    });
    toast.success(`${item.name} added to cart`, {
      description: selectedSize
        ? `${quantity} × ${selectedSize}`
        : quantity > 1
          ? `Quantity: ${quantity}`
          : 'View your cart in the navbar when you\'re ready to order.',
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="pr-8">{item.name}</DialogTitle>
          <DialogDescription>{item.description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {item.image && (
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-48 object-cover rounded-lg"
            />
          )}

          <p className="text-orange-600 font-bold text-xl">
            ${displayPrice}
            {sizes.length > 0 && selectedSize && (
              <span className="text-sm font-normal text-gray-500 ml-1">
                ({selectedSize})
              </span>
            )}
          </p>

          {sizes.length > 0 && (
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-2">
                Size
              </label>
              <div className="flex flex-wrap gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-lg border-2 text-sm font-medium transition-colors ${
                      selectedSize === size
                        ? 'border-orange-600 bg-orange-50 text-orange-700'
                        : 'border-gray-200 hover:border-orange-300 text-gray-700'
                    }`}
                  >
                    {size} ${getPriceForSize(size)}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div>
            <label className="text-sm font-medium text-gray-700 block mb-2">
              Quantity
            </label>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              >
                −
              </Button>
              <span className="w-10 text-center font-medium">{quantity}</span>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => setQuantity((q) => q + 1)}
              >
                +
              </Button>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            className="w-full bg-orange-600 hover:bg-orange-700"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
