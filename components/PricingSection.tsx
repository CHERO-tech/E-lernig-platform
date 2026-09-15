import Link from "next/link";
import Reveal from "./Reveal";

const PLANS = [
  {
    name: "Basic",
    price: "$29",
    period: "/month",
    desc: "Perfect to get started",
    features: ["Access to 50+ courses", "Community support", "Email support", "30-day refund"],
    cta: "Get Started",
    href: "/register",
    featured: false,
  },
  {
    name: "Professional",
    price: "$79",
    period: "/month",
    desc: "Most popular choice",
    features: [
      "Access to 300+ courses",
      "Priority email support",
      "Live chat support",
      "Certificates",
      "Project portfolio",
    ],
    cta: "Start Professional",
    href: "/register",
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    desc: "For teams & companies",
    features: ["Unlimited courses", "24/7 dedicated support", "Team analytics", "SSO integration"],
    cta: "Contact Sales",
    href: "/contact",
    featured: false,
  },
] as const;

export default function PricingSection() {
  return (
    <section className="py-24 px-6 md:px-8 bg-dg2">
      <div className="max-w-7xl mx-auto">
        <Reveal className="text-center mb-16">
          <p className="font-mono text-xs mb-3 text-pg">$ cat ./pricing.json</p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white tracking-tight">
            Plans for Every Learner
          </h2>
          <p className="text-mg">Start with a plan, upgrade anytime.</p>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto items-start">
          {PLANS.map((plan, i) => (
            <Reveal
              key={plan.name}
              delay={i * 100}
              className={`rounded-xl p-7 transition-all ${
                plan.featured ? "bg-pg md:scale-105 shadow-xl" : "bg-dg border border-pg/[0.15]"
              }`}
            >
              <p
                className={`font-mono text-xs mb-3 ${plan.featured ? "text-dg/70" : "text-pg"}`}
              >
                {plan.name.toUpperCase()}
              </p>
              <div className="flex items-end gap-1 mb-2">
                <span className={`text-4xl font-bold ${plan.featured ? "text-dg" : "text-white"}`}>
                  {plan.price}
                </span>
                {"period" in plan && plan.period && (
                  <span className={`text-sm mb-1.5 ${plan.featured ? "text-dg/60" : "text-mg"}`}>
                    {plan.period}
                  </span>
                )}
              </div>
              <p className={`text-sm mb-6 ${plan.featured ? "text-dg/70" : "text-mg"}`}>{plan.desc}</p>
              <ul className="space-y-2.5 mb-8">
                {plan.features.map((f) => (
                  <li
                    key={f}
                    className={`flex items-center gap-2.5 text-sm ${plan.featured ? "text-dg" : "text-brass"}`}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href={plan.href}
                className={`block w-full text-center py-3 rounded-lg font-semibold text-sm transition-all hover:opacity-90 ${
                  plan.featured ? "bg-dg text-pg" : "bg-pg text-dg"
                }`}
              >
                {plan.cta}
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
