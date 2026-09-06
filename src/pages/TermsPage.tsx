import { Link } from "react-router-dom";
import SiteLayout from "../components/SiteLayout";
import { Card } from "../components/ui";

export default function TermsPage() {
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
            Terms of Service
          </h1>
          <p style={{ color: "#718078" }}>Last updated: September 2026</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-8 py-12">
        <Card title="1. Acceptance of Terms">
          <p className="text-sm mb-4" style={{ color: "#718078" }}>
            By accessing and using TVET Digital Academy, you accept and agree to be
            bound by the terms and provision of this agreement.
          </p>
        </Card>

        <Card title="2. Use License" className="mt-6">
          <p className="text-sm mb-4" style={{ color: "#718078" }}>
            Permission is granted to temporarily download one copy of the materials
            (information or software) on TVET Digital Academy for personal,
            non-commercial transitory viewing only. This is the grant of a license, not
            a transfer of title, and under this license you may not:
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm" style={{ color: "#718078" }}>
            <li>Modify or copy the materials</li>
            <li>Use materials for any commercial purpose or for any public display</li>
            <li>Attempt to decompile or reverse engineer any software</li>
            <li>Remove any copyright or other proprietary notations</li>
            <li>Transfer the materials to another person or "mirror" on any other server</li>
          </ul>
        </Card>

        <Card title="3. Disclaimer" className="mt-6">
          <p className="text-sm mb-4" style={{ color: "#718078" }}>
            The materials on TVET Digital Academy are provided "as is". TVET Digital
            Academy makes no warranties, expressed or implied, and hereby disclaims and
            negates all other warranties including, without limitation, implied
            warranties or conditions of merchantability, fitness for a particular
            purpose, or non-infringement of intellectual property or other violation of
            rights.
          </p>
        </Card>

        <Card title="4. Limitations" className="mt-6">
          <p className="text-sm" style={{ color: "#718078" }}>
            In no event shall TVET Digital Academy or its suppliers be liable for any
            damages (including, without limitation, damages for loss of data or profit,
            or due to business interruption) arising out of the use or inability to use
            the materials on TVET Digital Academy.
          </p>
        </Card>

        <Card title="5. Accuracy of Materials" className="mt-6">
          <p className="text-sm" style={{ color: "#718078" }}>
            The materials appearing on TVET Digital Academy could include technical,
            typographical, or photographic errors. TVET Digital Academy does not warrant
            that any of the materials on its website are accurate, complete, or current.
          </p>
        </Card>
      </div>
    </SiteLayout>
  );
}
