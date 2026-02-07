'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ordersService } from '@/services/orders.service';
import { ShoppingCart } from 'lucide-react';

type Props = {
  mealId: string;
  providerId?: string;
};

export default function AddToCartButton({ mealId, providerId }: Props) {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleAddToCart = async () => {
    setLoading(true);
    try {
      const cartData = { mealId, providerId, quantity };
      await ordersService.addToCart(cartData as any);

      window.dispatchEvent(new Event('cart-updated'));
      alert('Meal added to cart!'); // simple confirmation
    } catch (err) {
      console.error('Failed to add to cart', err);
      alert('Failed to add meal to cart!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <button
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
          className="w-10 h-10 flex items-center justify-center border border-neutral-700 rounded-lg hover:bg-neutral-800"
        >
          -
        </button>
        <span className="w-10 text-center">{quantity}</span>
        <button
          onClick={() => setQuantity(quantity + 1)}
          className="w-10 h-10 flex items-center justify-center border border-neutral-700 rounded-lg hover:bg-neutral-800"
        >
          +
        </button>
      </div>

      <Button
        onClick={handleAddToCart}
        disabled={loading}
        className="flex items-center justify-center gap-2 bg-yellow-500 text-black font-medium py-3 rounded-lg hover:bg-yellow-400"
      >
        <ShoppingCart size={20} />
        {loading ? 'Adding...' : 'Add to Cart'}
      </Button>
    </div>
  );
}
