import { Link } from "react-router-dom";
import SiteLayout from "../components/SiteLayout";
import { Card } from "../components/ui";

export default function PrivacyPage() {
  return (
    <SiteLayout>
      <div
        style={{
          background: "#071C12",
          borderBottom: "1px solid rgba(53,196,122,0.1)",
        }}
      >
        <div className="max-w-3xl mx-auto px-8 py-12">
          <Link
            to="/"
            className="inline-block mb-4 text-sm transition-colors"
            style={{ color: "#35C47A" }}
          >
            ← Back to Home
          </Link>
          <h1
            className="text-4xl font-bold mb-3"
            style={{ color: "#FFFFFF", letterSpacing: "-0.02em" }}
          >
            Privacy Policy
          </h1>
          <p style={{ color: "#718078" }}>Last updated: September 2026</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-8 py-12">
        <Card title="1. Introduction">
          <p className="text-sm mb-4" style={{ color: "#718078" }}>
            TVET Digital Academy ("we" or "us" or "our") operates the website. This
            page informs you of our policies regarding the collection, use, and
            disclosure of personal data when you use our Service and the choices you
            have associated with that data.
          </p>
        </Card>

        <Card title="2. Information Collection and Use" className="mt-6">
          <p className="text-sm mb-3" style={{ color: "#718078" }}>
            We collect several different types of information for various purposes to
            provide and improve our Service to you.
          </p>
          <p className="text-sm font-semibold mb-2" style={{ color: "#102019" }}>
            Types of Data Collected:
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm" style={{ color: "#718078" }}>
            <li>Email address</li>
            <li>First name and last name</li>
            <li>Phone number</li>
            <li>Address, State, Province, ZIP/Postal code, City</li>
            <li>Cookies and Usage Data</li>
          </ul>
        </Card>

        <Card title="3. Use of Data" className="mt-6">
          <p className="text-sm mb-4" style={{ color: "#718078" }}>
            TVET Digital Academy uses the collected data for various purposes:
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm" style={{ color: "#718078" }}>
            <li>To provide and maintain our Service</li>
            <li>To notify you about changes to our Service</li>
            <li>To allow you to participate in interactive features of our Service</li>
            <li>To provide customer support</li>
            <li>To gather analysis or valuable information</li>
            <li>To monitor the usage of our Service</li>
            <li>To detect, prevent and address technical and security issues</li>
          </ul>
        </Card>

        <Card title="4. Security of Data" className="mt-6">
          <p className="text-sm" style={{ color: "#718078" }}>
            The security of your data is important to us but remember that no method
            of transmission over the Internet or method of electronic storage is 100%
            secure. While we strive to use commercially acceptable means to protect
            your Personal Data, we cannot guarantee its absolute security.
          </p>
        </Card>

        <Card title="5. Contact Us" className="mt-6">
          <p className="text-sm" style={{ color: "#718078" }}>
            If you have any questions about this Privacy Policy, please contact us at
            privacy@tvetdigital.rw
          </p>
        </Card>
      </div>
    </SiteLayout>
  );
}
