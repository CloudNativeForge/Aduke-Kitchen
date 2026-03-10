import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Trash2, Minus, Plus } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from './ui/sheet';
import { Button } from './ui/button';
import { useCart } from '../contexts/CartContext';

export function CartSheet({ open, onOpenChange }) {
  const { cart, cartCount, removeFromCart, updateQuantity, clearCart } = useCart();

  const total = cart.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity ?? 1),
    0
  );

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="flex flex-col w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Your Cart
          </SheetTitle>
          <SheetDescription>
            {cartCount === 0
              ? 'Your cart is empty'
              : `${cartCount} item${cartCount === 1 ? '' : 's'} in your cart`}
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-auto py-6">
          {cartCount === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center px-4">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                <ShoppingCart className="h-8 w-8 text-gray-400" />
              </div>
              <p className="text-gray-600 mb-2">No items yet</p>
              <p className="text-sm text-gray-500 mb-6">
                Add dishes from the menu to get started
              </p>
              <Button asChild>
                <Link to="/menu" onClick={() => onOpenChange(false)}>
                  View Menu
                </Link>
              </Button>
            </div>
          ) : (
            <>
              <ul className="space-y-4">
                {cart.map((item, index) => {
                  const qty = item.quantity ?? 1;
                  const lineTotal = (item.price || 0) * qty;
                  return (
                    <li
                      key={`${item.id}-${index}`}
                      className="flex gap-3 py-3 border-b border-gray-100 last:border-0"
                    >
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 truncate">
                          {item.name}
                        </p>
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-sm text-gray-500">
                          {item.size && (
                            <span>Size: {item.size}</span>
                          )}
                        </div>
                        <p className="text-orange-600 font-semibold mt-1">
                          ${lineTotal.toFixed(2)}
                        </p>
                        <div className="flex items-center gap-1 mt-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(index, qty - 1)}
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </Button>
                          <span className="w-8 text-center text-sm font-medium">
                            {qty}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(index, qty + 1)}
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="flex-shrink-0 text-gray-400 hover:text-red-600 hover:bg-red-50"
                        onClick={() => removeFromCart(index)}
                        aria-label={`Remove ${item.name} from cart`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span className="text-orange-600">${total.toFixed(2)}</span>
                </div>
              </div>
            </>
          )}
        </div>

        {cartCount > 0 && (
          <div className="flex flex-col gap-2 pt-4 border-t border-gray-100">
            <a href="tel:+14374105630" onClick={() => onOpenChange(false)}>
              <Button className="w-full bg-orange-600 hover:bg-orange-700">
                Order Now
              </Button>
            </a>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                clearCart();
                onOpenChange(false);
              }}
            >
              Clear cart
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
