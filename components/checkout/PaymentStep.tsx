"use client";

import { useState } from "react";
import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from "@stripe/react-stripe-js";
import { Loader2 } from "lucide-react";

interface PaymentStepProps {
  onSuccess: (paymentMethod: any) => void;
  total: number;
}

const elementOptions = {
  style: {
    base: {
      fontSize: "16px",
      color: "#1f2937",
      "::placeholder": {
        color: "#d1d5db",
      },
    },
    invalid: {
      color: "#dc2626",
    },
  },
};

export function PaymentStep({ onSuccess, total }: PaymentStepProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [cardholderName, setCardholderName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!stripe || !elements) {
      setError("Payment processing is not available. Please try again.");
      return;
    }

    if (!cardholderName.trim()) {
      setError("Please enter the cardholder name");
      return;
    }

    setLoading(true);

    try {
      const cardNumberElement = elements.getElement(CardNumberElement);

      const paymentMethod = await stripe.createPaymentMethod({
        type: "card",
        card: cardNumberElement!,
        billing_details: {
          name: cardholderName,
        },
      });

      if (paymentMethod.error) {
        setError(paymentMethod.error.message || "Payment failed");
        setLoading(false);
        return;
      }

      onSuccess(paymentMethod.paymentMethod);
    } catch (err: any) {
      setError(err.message || "An error occurred during payment");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800 text-sm">{error}</p>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          Name on Card
        </label>
        <input
          type="text"
          value={cardholderName}
          onChange={(e) => setCardholderName(e.target.value)}
          placeholder="John Doe"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ember focus:border-transparent outline-none transition"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          Card Number
        </label>
        <div className="border border-gray-300 rounded-lg p-4">
          <CardNumberElement options={elementOptions} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Expiration Date
          </label>
          <div className="border border-gray-300 rounded-lg p-4">
            <CardExpiryElement options={elementOptions} />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            CVC
          </label>
          <div className="border border-gray-300 rounded-lg p-4">
            <CardCvcElement options={elementOptions} />
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={!stripe || !elements || loading}
        className="w-full px-6 py-3 bg-ember text-white rounded-lg font-semibold hover:bg-ember transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Processing Payment...
          </>
        ) : (
          `Pay $${total.toFixed(2)}`
        )}
      </button>

      <p className="text-xs text-gray-600 text-center">
        This is a test payment using Stripe's test card `4242 4242 4242 4242`. Use any future date and any CVC.
      </p>
    </form>
  );
}
