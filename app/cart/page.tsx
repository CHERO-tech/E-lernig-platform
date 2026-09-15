"use client";

import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useRouter } from "next/navigation";
import { Trash2, ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/cart/useCart";
import { calculateCartTotals } from "@/lib/cart/calculateTotals";
import { EmptyState } from "@/components/ui";

function CartContent() {
  const router = useRouter();
  const { items, removeItem } = useCart();

  const { subtotal, tax, total } = calculateCartTotals(items);

  const handleRemove = (id: string) => {
    removeItem(id);
  };

  const handleCheckout = () => {
    router.push("/checkout");
  };

  return (
    <div className="min-h-screen bg-ow">
      <div className="bg-white border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex items-center gap-3">
            <ShoppingCart size={32} className="text-pg2" />
            <h1 className="text-3xl font-bold text-dt">Shopping Cart</h1>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {items.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="rounded-xl p-6 flex gap-6 hover:shadow-lg transition-shadow bg-white border border-border"
                >
                  <div className="w-24 h-24 rounded-lg flex-shrink-0 flex items-center justify-center bg-gradient-to-br from-dg2 to-dg">
                    <span className="text-2xl font-bold text-pg2/40 font-mono">{item.title[0]}</span>
                  </div>

                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-1 text-dt">{item.title}</h3>
                    <p className="text-sm mb-3 text-mg">by {item.instructor}</p>
                    <p className="text-2xl font-bold text-pg2">${item.price}</p>
                  </div>

                  <button
                    onClick={() => handleRemove(item.id)}
                    className="p-2 rounded-lg transition-colors text-err hover:bg-err/5 h-fit"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
            </div>

            <div className="rounded-xl p-6 h-fit sticky top-6 bg-white border border-border">
              <h2 className="text-2xl font-bold mb-6 text-dt">Order Summary</h2>

              <div className="space-y-4 pb-6 border-b border-border">
                <div className="flex items-center justify-between">
                  <p className="text-mg">Subtotal ({items.length} courses)</p>
                  <p className="font-semibold text-dt">${subtotal.toFixed(2)}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-mg">Tax (8%)</p>
                  <p className="font-semibold text-dt">${tax.toFixed(2)}</p>
                </div>
              </div>

              <div className="flex items-center justify-between mb-6 pt-4">
                <p className="text-lg font-bold text-dt">Total</p>
                <p className="text-2xl font-bold text-pg2">${total.toFixed(2)}</p>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full px-4 py-3 bg-pg text-dg rounded-lg font-bold hover:brightness-110 transition-colors mb-3"
              >
                Proceed to Checkout
              </button>

              <button
                onClick={() => router.push("/courses")}
                className="w-full px-4 py-3 rounded-lg font-medium bg-white border border-border text-dt hover:bg-ow"
              >
                Continue Shopping
              </button>

              <div className="mt-6 p-4 rounded-lg bg-info/5 border border-info/20">
                <p className="text-sm text-info">
                  ✓ 30-day money-back guarantee
                  <br />✓ Lifetime access after purchase
                  <br />✓ Secure checkout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <EmptyState
            icon={<ShoppingCart size={48} className="text-pg2" />}
            title="Your cart is empty"
            description="Start learning by enrolling in a course!"
            action={
              <button
                onClick={() => router.push("/courses")}
                className="px-8 py-3 bg-pg text-dg rounded-lg font-medium hover:brightness-110"
              >
                Browse Courses
              </button>
            }
          />
        )}
      </div>
    </div>
  );
}

export default function Cart() {
  return (
    <ProtectedRoute>
      <CartContent />
    </ProtectedRoute>
  );
}
