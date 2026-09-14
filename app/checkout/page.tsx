"use client";

import { motion } from "framer-motion";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Check, Lock, AlertCircle } from "lucide-react";
import { Elements } from "@stripe/react-stripe-js";
import { Stripe } from "@stripe/stripe-js";
import { useCart } from "@/lib/cart/useCart";
import { useNotifications } from "@/lib/notifications/useNotifications";
import { useEnrollment } from "@/lib/enrollment/useEnrollment";
import { calculateCartTotals } from "@/lib/cart/calculateTotals";
import { getStripe } from "@/lib/stripe/getStripe";
import { PaymentStep } from "@/components/checkout/PaymentStep";

function CheckoutContent() {
  const router = useRouter();
  const { items, clearCart } = useCart();
  const { addNotification } = useNotifications();
  const { enroll } = useEnrollment();
  const [step, setStep] = useState<"shipping" | "payment" | "confirmation">("shipping");
  const [stripe, setStripe] = useState<Stripe | null>(null);
  const [completedOrder, setCompletedOrder] = useState<{
    orderNumber: string;
    orderDate: string;
    items: typeof items;
    total: number;
    cardBrand: string;
    cardLast4: string;
  } | null>(null);
  const [formData, setFormData] = useState({
    email: "student@example.com",
    firstName: "John",
    lastName: "Doe",
    address: "123 Main St",
    city: "San Francisco",
    state: "CA",
    zip: "94105",
  });

  useEffect(() => {
    getStripe().then(setStripe);
  }, []);

  const { subtotal, tax, total } = calculateCartTotals(items);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleContinue = () => {
    if (step === "shipping") {
      setStep("payment");
    }
  };

  const handlePaymentSuccess = (paymentMethod: { card?: { brand: string; last4: string } }) => {
    const order = {
      orderNumber: `#ORD-${Date.now().toString()}`,
      orderDate: new Date().toLocaleDateString(),
      items,
      total,
      cardBrand: paymentMethod.card?.brand || 'Card',
      cardLast4: paymentMethod.card?.last4 || '••••',
    };
    items.forEach(item => enroll(item.id));
    setCompletedOrder(order);
    clearCart();
    addNotification({
      type: 'payment',
      icon: '💳',
      title: 'Payment Successful',
      message: `Your purchase of ${items.length} course${items.length > 1 ? 's' : ''} for $${total.toFixed(2)} has been completed.`,
    });
    setStep("confirmation");
  };

  const handleViewCourses = () => {
    router.push("/my-enrollments");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Progress Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-12"
        >
          {["Shipping", "Payment", "Confirmation"].map((label, i) => {
            const steps: ("shipping" | "payment" | "confirmation")[] = ["shipping", "payment", "confirmation"];
            const isActive = steps.indexOf(step) >= i;
            const isComplete = steps.indexOf(step) > i;

            return (
              <div key={label} className="flex items-center gap-3 flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                    isActive
                      ? isComplete
                        ? "bg-ember-strong text-white"
                        : "bg-ember-strong text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {isComplete ? <Check size={20} /> : i + 1}
                </div>
                <p className={`font-medium ${isActive ? "text-gray-900" : "text-gray-600"}`}>{label}</p>
                {i < 2 && <div className="flex-1 h-1 bg-gray-200"></div>}
              </div>
            );
          })}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2"
          >
            {/* Shipping Step */}
            {step === "shipping" && (
              <div className="bg-white rounded-lg border border-gray-200 p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Shipping Address</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ember-strong"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ember-strong"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ember-strong"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ember-strong"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ember-strong"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">State/ZIP</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          name="state"
                          value={formData.state}
                          onChange={handleChange}
                          className="w-12 px-2 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ember-strong"
                          maxLength={2}
                        />
                        <input
                          type="text"
                          name="zip"
                          value={formData.zip}
                          onChange={handleChange}
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ember-strong"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Payment Step */}
            {step === "payment" && (
              <div className="bg-white rounded-lg border border-gray-200 p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Lock size={24} className="text-ember-strong" /> Payment Information
                </h2>

                {!stripe ? (
                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start gap-3">
                    <AlertCircle size={20} className="text-yellow-700 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-yellow-900">Stripe is not configured</p>
                      <p className="text-xs text-yellow-800 mt-1">
                        Please ensure NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is set in your environment.
                      </p>
                    </div>
                  </div>
                ) : (
                  <Elements stripe={stripe}>
                    <PaymentStep onSuccess={handlePaymentSuccess} total={total} />
                  </Elements>
                )}
              </div>
            )}

            {/* Confirmation Step */}
            {step === "confirmation" && completedOrder && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-lg border border-gray-200 p-12 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-forge-soft flex items-center justify-center mx-auto mb-4">
                  <Check size={32} className="text-ember-strong" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Purchase Successful!</h2>
                <p className="text-gray-600 mb-8">
                  Your {items.length} course{items.length > 1 ? 's' : ''} have been added to your account. You can access them anytime.
                </p>

                <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
                  <p className="text-sm text-gray-600 mb-3">Order Details</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Order Number:</span>
                      <span className="font-semibold text-gray-900">{completedOrder.orderNumber}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Order Date:</span>
                      <span className="font-semibold text-gray-900">{completedOrder.orderDate}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Payment Method:</span>
                      <span className="font-semibold text-gray-900">{completedOrder.cardBrand} •••• {completedOrder.cardLast4}</span>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                      <span className="text-gray-700">Total Paid:</span>
                      <span className="font-bold text-ember-strong text-lg">${completedOrder.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-6">A confirmation email has been sent to {formData.email}</p>
              </motion.div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4 mt-8">
              {step === "payment" && (
                <button
                  onClick={() => setStep("shipping")}
                  className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50"
                >
                  Back
                </button>
              )}
              {step === "shipping" && (
                <button
                  onClick={handleContinue}
                  className="flex-1 px-8 py-3 bg-ember-strong text-white rounded-lg font-bold hover:bg-ember"
                >
                  Continue to Payment
                </button>
              )}
              {step === "confirmation" && (
                <button
                  onClick={handleViewCourses}
                  className="flex-1 px-8 py-3 bg-ember-strong text-white rounded-lg font-bold hover:bg-ember"
                >
                  View My Courses
                </button>
              )}
            </div>
          </motion.div>

          {/* Order Summary Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-lg border border-gray-200 p-6 h-fit sticky top-6"
          >
            <h3 className="font-bold text-gray-900 mb-4">Order Summary</h3>
            <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
              {items.map((item) => (
                <div key={item.id} className="text-sm">
                  <p className="text-gray-600">{item.title}</p>
                  <p className="font-semibold text-gray-900">${item.price.toFixed(2)}</p>
                </div>
              ))}
            </div>

            <div className="space-y-2 pb-4 border-b border-gray-200 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Subtotal</span>
                <span className="font-semibold">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Tax (8%)</span>
                <span className="font-semibold">${tax.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4">
              <span className="font-bold text-gray-900">Total</span>
              <span className="text-2xl font-bold text-ember-strong">${total.toFixed(2)}</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default function Checkout() {
  return (
    <ProtectedRoute>
      <CheckoutContent />
    </ProtectedRoute>
  );
}
