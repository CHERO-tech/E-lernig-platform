"use client";

import { motion } from "framer-motion";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useRouter } from "next/navigation";
import { Check, Lock } from "lucide-react";
import { useState } from "react";

function CheckoutContent() {
  const router = useRouter();
  const [step, setStep] = useState<"shipping" | "payment" | "confirmation">("shipping");
  const [formData, setFormData] = useState({
    email: "student@example.com",
    firstName: "John",
    lastName: "Doe",
    address: "123 Main St",
    city: "San Francisco",
    state: "CA",
    zip: "94105",
    cardName: "John Doe",
    cardNumber: "4111 1111 1111 1111",
    expiry: "12/25",
    cvv: "123",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleContinue = () => {
    if (step === "shipping") {
      setStep("payment");
    } else if (step === "payment") {
      setStep("confirmation");
    }
  };

  const handleViewCourses = () => {
    router.push("/my-enrollments");
  };

  const cartTotal = 327;

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
                        ? "bg-green-600 text-white"
                        : "bg-green-600 text-white"
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
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
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
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
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
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
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
                          className="w-12 px-2 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                          maxLength={2}
                        />
                        <input
                          type="text"
                          name="zip"
                          value={formData.zip}
                          onChange={handleChange}
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
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
                  <Lock size={24} className="text-green-600" /> Payment Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Cardholder Name</label>
                    <input
                      type="text"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleChange}
                      placeholder="4111 1111 1111 1111"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 font-mono"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                      <input
                        type="text"
                        name="expiry"
                        value={formData.expiry}
                        onChange={handleChange}
                        placeholder="MM/YY"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                      <input
                        type="text"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleChange}
                        placeholder="123"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm text-green-900">✓ Your payment information is secure and encrypted</p>
                </div>
              </div>
            )}

            {/* Confirmation Step */}
            {step === "confirmation" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-lg border border-gray-200 p-12 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <Check size={32} className="text-green-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Purchase Successful!</h2>
                <p className="text-gray-600 mb-8">
                  Your 3 courses have been added to your account. You can access them anytime.
                </p>

                <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
                  <p className="text-sm text-gray-600 mb-3">Order Details</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Order Number:</span>
                      <span className="font-semibold text-gray-900">#ORD-2025-89234</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Order Date:</span>
                      <span className="font-semibold text-gray-900">Mar 3, 2025</span>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                      <span className="text-gray-700">Total Paid:</span>
                      <span className="font-bold text-green-600 text-lg">${cartTotal}</span>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-6">A confirmation email has been sent to {formData.email}</p>
              </motion.div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4 mt-8">
              {step !== "confirmation" && step !== "shipping" && (
                <button
                  onClick={() => setStep(step === "payment" ? "shipping" : "payment")}
                  className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50"
                >
                  Back
                </button>
              )}
              {step !== "confirmation" && (
                <button
                  onClick={handleContinue}
                  className="flex-1 px-8 py-3 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700"
                >
                  {step === "payment" ? "Complete Purchase" : "Continue to Payment"}
                </button>
              )}
              {step === "confirmation" && (
                <button
                  onClick={handleViewCourses}
                  className="flex-1 px-8 py-3 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700"
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
              <div className="text-sm">
                <p className="text-gray-600">Advanced React Patterns</p>
                <p className="font-semibold text-gray-900">$99.00</p>
              </div>
              <div className="text-sm">
                <p className="text-gray-600">Python for Data Science</p>
                <p className="font-semibold text-gray-900">$149.00</p>
              </div>
              <div className="text-sm">
                <p className="text-gray-600">UI/UX Design Masterclass</p>
                <p className="font-semibold text-gray-900">$79.00</p>
              </div>
            </div>

            <div className="space-y-2 pb-4 border-b border-gray-200 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Subtotal</span>
                <span className="font-semibold">$327.00</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Tax</span>
                <span className="font-semibold">$0.00</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4">
              <span className="font-bold text-gray-900">Total</span>
              <span className="text-2xl font-bold text-green-600">${cartTotal}</span>
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
