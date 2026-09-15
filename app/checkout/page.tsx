"use client";

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
    setFormData((prev) => ({ ...prev, [name]: value }));
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
      cardBrand: paymentMethod.card?.brand || "Card",
      cardLast4: paymentMethod.card?.last4 || "••••",
    };
    items.forEach((item) => enroll(item.id));
    setCompletedOrder(order);
    clearCart();
    addNotification({
      type: "payment",
      icon: "💳",
      title: "Payment Successful",
      message: `Your purchase of ${items.length} course${items.length > 1 ? "s" : ""} for $${total.toFixed(2)} has been completed.`,
    });
    setStep("confirmation");
  };

  const handleViewCourses = () => {
    router.push("/my-enrollments");
  };

  return (
    <div className="min-h-screen bg-ow">
      <div className="bg-white border-b border-border">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <h1 className="text-3xl font-bold text-dt">Checkout</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="flex items-center gap-4 mb-12">
          {["Shipping", "Payment", "Confirmation"].map((label, i) => {
            const steps: ("shipping" | "payment" | "confirmation")[] = ["shipping", "payment", "confirmation"];
            const isActive = steps.indexOf(step) >= i;
            const isComplete = steps.indexOf(step) > i;

            return (
              <div key={label} className="flex items-center gap-3 flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                    isActive ? "bg-pg text-dg" : "bg-border text-mg"
                  }`}
                >
                  {isComplete ? <Check size={20} /> : i + 1}
                </div>
                <p className={`font-medium ${isActive ? "text-dt" : "text-mg"}`}>{label}</p>
                {i < 2 && <div className="flex-1 h-1 bg-border" />}
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {step === "shipping" && (
              <div className="rounded-xl p-8 bg-white border border-border">
                <h2 className="text-2xl font-bold mb-6 text-dt">Shipping Address</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-dt">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-lg outline-none bg-ow border border-border text-dt focus:border-pg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-dt">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-lg outline-none bg-ow border border-border text-dt focus:border-pg"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-dt">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg outline-none bg-ow border border-border text-dt focus:border-pg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-dt">Address</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg outline-none bg-ow border border-border text-dt focus:border-pg"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-dt">City</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-lg outline-none bg-ow border border-border text-dt focus:border-pg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-dt">State/ZIP</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          name="state"
                          value={formData.state}
                          onChange={handleChange}
                          className="w-12 px-2 py-2 rounded-lg outline-none bg-ow border border-border text-dt focus:border-pg"
                          maxLength={2}
                        />
                        <input
                          type="text"
                          name="zip"
                          value={formData.zip}
                          onChange={handleChange}
                          className="flex-1 px-4 py-2 rounded-lg outline-none bg-ow border border-border text-dt focus:border-pg"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === "payment" && (
              <div className="rounded-xl p-8 bg-white border border-border">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-dt">
                  <Lock size={24} className="text-pg2" /> Payment Information
                </h2>

                {!stripe ? (
                  <div className="p-4 rounded-lg flex items-start gap-3 bg-warn/5 border border-warn/20">
                    <AlertCircle size={20} className="text-warn flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-warn">Stripe is not configured</p>
                      <p className="text-xs mt-1 text-warn">
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

            {step === "confirmation" && completedOrder && (
              <div className="rounded-xl p-12 text-center bg-white border border-border">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-pg/10">
                  <Check size={32} className="text-pg2" />
                </div>
                <h2 className="text-3xl font-bold mb-2 text-dt">Purchase Successful!</h2>
                <p className="mb-8 text-mg">
                  Your {items.length} course{items.length > 1 ? "s" : ""} have been added to your account. You
                  can access them anytime.
                </p>

                <div className="rounded-lg p-6 mb-8 text-left bg-ow">
                  <p className="text-sm mb-3 text-mg">Order Details</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-mg">Order Number:</span>
                      <span className="font-semibold text-dt">{completedOrder.orderNumber}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-mg">Order Date:</span>
                      <span className="font-semibold text-dt">{completedOrder.orderDate}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-mg">Payment Method:</span>
                      <span className="font-semibold text-dt">
                        {completedOrder.cardBrand} •••• {completedOrder.cardLast4}
                      </span>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-border">
                      <span className="text-mg">Total Paid:</span>
                      <span className="font-bold text-pg2 text-lg">${completedOrder.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <p className="text-sm mb-6 text-mg">A confirmation email has been sent to {formData.email}</p>
              </div>
            )}

            <div className="flex gap-4 mt-8">
              {step === "payment" && (
                <button
                  onClick={() => setStep("shipping")}
                  className="px-8 py-3 rounded-lg font-medium bg-white border border-border text-dt hover:bg-ow"
                >
                  Back
                </button>
              )}
              {step === "shipping" && (
                <button
                  onClick={handleContinue}
                  className="flex-1 px-8 py-3 bg-pg text-dg rounded-lg font-bold hover:brightness-110"
                >
                  Continue to Payment
                </button>
              )}
              {step === "confirmation" && (
                <button
                  onClick={handleViewCourses}
                  className="flex-1 px-8 py-3 bg-pg text-dg rounded-lg font-bold hover:brightness-110"
                >
                  View My Courses
                </button>
              )}
            </div>
          </div>

          <div className="rounded-xl p-6 h-fit sticky top-6 bg-white border border-border">
            <h3 className="font-bold mb-4 text-dt">Order Summary</h3>
            <div className="space-y-3 mb-6 pb-6 border-b border-border">
              {items.map((item) => (
                <div key={item.id} className="text-sm">
                  <p className="text-mg">{item.title}</p>
                  <p className="font-semibold text-dt">${item.price.toFixed(2)}</p>
                </div>
              ))}
            </div>

            <div className="space-y-2 pb-4 border-b border-border text-sm">
              <div className="flex items-center justify-between">
                <span className="text-mg">Subtotal</span>
                <span className="font-semibold text-dt">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-mg">Tax (8%)</span>
                <span className="font-semibold text-dt">${tax.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4">
              <span className="font-bold text-dt">Total</span>
              <span className="text-2xl font-bold text-pg2">${total.toFixed(2)}</span>
            </div>
          </div>
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
