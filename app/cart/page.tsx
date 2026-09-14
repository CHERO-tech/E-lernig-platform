"use client";

import { motion } from "framer-motion";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useRouter } from "next/navigation";
import { Trash2, ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/cart/useCart";
import { calculateCartTotals } from "@/lib/cart/calculateTotals";

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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex items-center gap-3">
            <ShoppingCart size={32} className="text-ember-strong" />
            <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {items.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-2 space-y-4"
            >
              {items.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white rounded-lg border border-gray-200 p-6 flex gap-6 hover:shadow-lg transition-shadow"
                >
                  <div className="w-24 h-24 rounded-lg bg-gradient-to-br from-blue-400 to-purple-500 flex-shrink-0"></div>

                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 text-lg mb-1">{item.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">by {item.instructor}</p>
                    <p className="text-2xl font-bold text-ember-strong">${item.price}</p>
                  </div>

                  <button
                    onClick={() => handleRemove(item.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>
                </motion.div>
              ))}
            </motion.div>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-lg border border-gray-200 p-6 h-fit sticky top-6"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>

              <div className="space-y-4 pb-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <p className="text-gray-700">Subtotal ({items.length} courses)</p>
                  <p className="font-semibold text-gray-900">${subtotal.toFixed(2)}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-gray-700">Tax (8%)</p>
                  <p className="font-semibold text-gray-900">${tax.toFixed(2)}</p>
                </div>
              </div>

              <div className="flex items-center justify-between mb-6 pt-4">
                <p className="text-lg font-bold text-gray-900">Total</p>
                <p className="text-2xl font-bold text-ember-strong">${total.toFixed(2)}</p>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full px-4 py-3 bg-ember-strong text-white rounded-lg font-bold hover:bg-ember transition-colors mb-3"
              >
                Proceed to Checkout
              </button>

              <button
                onClick={() => router.push("/courses")}
                className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50"
              >
                Continue Shopping
              </button>

              {/* Info */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-900">
                  ✓ 30-day money-back guarantee<br/>
                  ✓ Lifetime access after purchase<br/>
                  ✓ Secure checkout
                </p>
              </div>
            </motion.div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg border border-gray-200 p-12 text-center"
          >
            <ShoppingCart size={48} className="mx-auto text-gray-400 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Start learning by enrolling in a course!</p>
            <button
              onClick={() => router.push("/courses")}
              className="px-8 py-3 bg-ember-strong text-white rounded-lg font-medium hover:bg-ember"
            >
              Browse Courses
            </button>
          </motion.div>
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
