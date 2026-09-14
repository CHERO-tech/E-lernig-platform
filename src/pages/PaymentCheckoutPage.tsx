import { useState } from "react";
import { Link } from "react-router-dom";
import SiteLayout from "../components/SiteLayout";
import { Card, Badge, Button } from "../components/ui";

interface Plan {
  id: string;
  name: string;
  price: number;
  features: string[];
  popular?: boolean;
}

const plans: Plan[] = [
  {
    id: "basic",
    name: "Starter",
    price: 9,
    features: [
      "Access to 5 courses",
      "Community forum access",
      "Email support",
      "Certificate of completion",
    ],
  },
  {
    id: "pro",
    name: "Professional",
    price: 29,
    features: [
      "Unlimited course access",
      "Mentor matching",
      "Priority support",
      "Advanced analytics",
      "Networking events",
    ],
    popular: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 99,
    features: [
      "Everything in Professional",
      "Dedicated account manager",
      "Custom learning paths",
      "API access",
      "Team management",
    ],
  },
];

export default function PaymentCheckoutPage() {
  const [selectedPlan, setSelectedPlan] = useState("pro");
  const [step, setStep] = useState<"plans" | "payment" | "confirmation">("plans");
  const [paymentMethod, setPaymentMethod] = useState("mobilemoney");

  const plan = plans.find((p) => p.id === selectedPlan);

  const handleConfirm = () => {
    setStep("payment");
  };

  const handlePay = () => {
    setStep("confirmation");
  };

  if (step === "confirmation") {
    return (
      <SiteLayout>
        <div className="max-w-2xl mx-auto px-8 py-12">
          <div className="text-center mb-12">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{ background: "#D1F8E8" }}
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#35C47A"
                strokeWidth="2"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h1
              className="text-page-title mb-3"
              style={{ color: "#102019" }}
            >
              Payment Successful!
            </h1>
            <p
              className="text-base mb-8"
              style={{ color: "#606C66" }}
            >
              You've been enrolled in the {plan?.name} plan.
            </p>
          </div>

          <Card title="Subscription Details">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-border">
                <p style={{ color: "#606C66" }}>Plan</p>
                <p style={{ color: "#102019" }} className="font-semibold">
                  {plan?.name}
                </p>
              </div>
              <div className="flex items-center justify-between pb-4 border-b border-border">
                <p style={{ color: "#606C66" }}>Amount</p>
                <p
                  style={{ color: "#1F7A4B" }}
                  className="font-mono font-bold"
                >
                  ${plan?.price}/month
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p style={{ color: "#606C66" }}>Start Date</p>
                <p style={{ color: "#102019" }} className="font-semibold">
                  Sep 6, 2026
                </p>
              </div>
            </div>
          </Card>

          <div className="mt-8 space-y-3">
            <Button variant="primary" fullWidth>
              View Dashboard
            </Button>
            <Button variant="outline" fullWidth href="/">
              Back to Home
            </Button>
          </div>
        </div>
      </SiteLayout>
    );
  }

  if (step === "payment") {
    return (
      <SiteLayout>
        <div className="max-w-2xl mx-auto px-8 py-12">
          <h1
            className="text-page-title mb-8"
            style={{ color: "#102019" }}
          >
            Payment Method
          </h1>

          <Card title="Select Payment Method" className="mb-8">
            <div className="space-y-3">
              {[
                { id: "mobilemoney", label: "Mobile Money", icon: "📱" },
                { id: "bank", label: "Bank Transfer", icon: "🏦" },
                { id: "card", label: "Credit/Debit Card", icon: "💳" },
              ].map((method) => (
                <label
                  key={method.id}
                  className="flex items-center p-4 border rounded-lg cursor-pointer transition-all"
                  style={{
                    borderColor:
                      paymentMethod === method.id
                        ? "#35C47A"
                        : "#E2E8E4",
                    background:
                      paymentMethod === method.id
                        ? "rgba(53,196,122,0.05)"
                        : "transparent",
                  }}
                >
                  <input
                    type="radio"
                    name="payment"
                    value={method.id}
                    checked={paymentMethod === method.id}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4 mr-4"
                  />
                  <span className="text-xl mr-3">{method.icon}</span>
                  <span style={{ color: "#102019" }} className="font-semibold">
                    {method.label}
                  </span>
                </label>
              ))}
            </div>
          </Card>

          <div className="space-y-3">
            <Button variant="primary" fullWidth onClick={handlePay}>
              Complete Payment - ${plan?.price}/month
            </Button>
            <Button
              variant="outline"
              fullWidth
              onClick={() => setStep("plans")}
            >
              Back to Plans
            </Button>
          </div>
        </div>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <div className="max-w-6xl mx-auto px-8 py-12">
        <Link
          to="/student"
          className="inline-block mb-4 text-sm transition-colors"
          style={{ color: "#1F7A4B" }}
        >
          ← Back to Dashboard
        </Link>
        <h1
          className="text-page-title mb-3"
          style={{ color: "#102019" }}
        >
          Upgrade Your Plan
        </h1>
        <p style={{ color: "#606C66" }} className="mb-12">
          Choose the perfect plan for your learning journey
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {plans.map((p) => (
            <Card
              key={p.id}
              padding="lg"
              className="flex flex-col relative"
              style={{
                border: selectedPlan === p.id ? "2px solid #35C47A" : undefined,
              }}
            >
              {p.popular && (
                <Badge
                  tone="brand"
                  className="absolute -top-3 left-1/2 transform -translate-x-1/2"
                >
                  Most Popular
                </Badge>
              )}

              <div className="mb-6">
                <h3
                  className="text-xl font-bold mb-2"
                  style={{ color: "#102019" }}
                >
                  {p.name}
                </h3>
                <div className="flex items-baseline gap-1">
                  <span
                    className="text-3xl font-bold font-mono"
                    style={{ color: "#1F7A4B" }}
                  >
                    ${p.price}
                  </span>
                  <span style={{ color: "#606C66" }}>/month</span>
                </div>
              </div>

              <div className="flex-1 mb-8">
                <ul className="space-y-3">
                  {p.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="text-sm flex items-start gap-2"
                      style={{ color: "#606C66" }}
                    >
                      <span style={{ color: "#1F7A4B" }}>✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <Button
                variant={
                  selectedPlan === p.id ? "primary" : "outline"
                }
                fullWidth
                onClick={() => setSelectedPlan(p.id)}
              >
                {selectedPlan === p.id ? "Selected" : "Select Plan"}
              </Button>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button
            variant="primary"
            size="lg"
            onClick={handleConfirm}
            className="px-12"
          >
            Continue to Payment
          </Button>
        </div>
      </div>
    </SiteLayout>
  );
}
