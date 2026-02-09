'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ordersService } from '@/services/orders.service';
import { ShoppingCart } from 'lucide-react';

type Props = {
  providerId: string;
};

export default function ProviderAddToCart({ providerId }: Props) {
  const [loading, setLoading] = useState(false);

  const handleAdd = async () => {
    setLoading(true);
    try {
      await ordersService.addToCart({
        providerId,
        quantity: 1,
      } as any);

      window.dispatchEvent(new Event('cart-updated'));
      alert('Provider added to cart!');
    } catch (err) {
      console.error(err);
      alert('Failed to add to cart');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleAdd}
      disabled={loading}
      className="w-full mt-3 flex items-center justify-center gap-2 bg-yellow-500 text-black hover:bg-yellow-400"
    >
      <ShoppingCart size={18} />
      {loading ? 'Adding...' : 'Add to Cart'}
    </Button>
  );
}
