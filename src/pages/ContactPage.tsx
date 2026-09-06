import { useState } from "react";
import SiteLayout from "../components/SiteLayout";
import { Button, Input, Textarea, EmptyState } from "../components/ui";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <SiteLayout>
      <div style={{ background: "#071C12", borderBottom: "1px solid rgba(53,196,122,0.1)" }}>
        <div className="max-w-3xl mx-auto px-8 py-12">
          <h1
            className="text-4xl font-bold mb-3"
            style={{ color: "#FFFFFF", letterSpacing: "-0.02em" }}
          >
            Contact Us
          </h1>
          <p style={{ color: "#718078" }}>
            Have a question? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
      </div>

      <div className="flex-1 max-w-3xl mx-auto w-full px-8 py-12">
        {submitted ? (
          <EmptyState
            icon={
              <svg
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#35C47A"
                strokeWidth="1.5"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            }
            title="Message sent!"
            description="Thank you for reaching out. We'll get back to you within 24 hours."
          />
        ) : (
          <form onSubmit={handleSubmit}>
            <Input
              label="Full Name"
              placeholder="Your name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />

            <Input
              label="Email Address"
              type="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />

            <Input
              label="Subject"
              placeholder="What is this about?"
              value={formData.subject}
              onChange={(e) =>
                setFormData({ ...formData, subject: e.target.value })
              }
              required
            />

            <Textarea
              label="Message"
              placeholder="Tell us more about your inquiry..."
              rows={6}
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              required
            />

            <div className="flex gap-3">
              <Button variant="primary" type="submit" fullWidth>
                Send Message
              </Button>
            </div>
          </form>
        )}
      </div>
    </SiteLayout>
  );
}
