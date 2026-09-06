import { Link } from "react-router-dom";

export default function CertificatePage() {
  return (
    <div className="min-h-screen py-12 px-8" style={{ background: "#F5F7F5" }}>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="font-mono text-xs mb-1" style={{ color: "#35C47A" }}>$ cat certificate.json</p>
            <h1 className="text-2xl font-bold" style={{ color: "#102019" }}>Certificate of Completion</h1>
          </div>
          <div className="flex gap-3">
            <button
              className="px-4 py-2.5 rounded-lg text-sm font-semibold border transition-all hover:bg-gray-50"
              style={{ color: "#102019", border: "1px solid #E2E8E4", background: "#FFFFFF" }}
            >
              Verify Certificate
            </button>
            <button
              className="px-4 py-2.5 rounded-lg text-sm font-semibold transition-all hover:opacity-90"
              style={{ background: "#35C47A", color: "#071C12" }}
            >
              Download PDF
            </button>
          </div>
        </div>

        {/* Certificate */}
        <div
          className="rounded-2xl overflow-hidden shadow-2xl"
          style={{ background: "#FFFFFF", border: "2px solid #E2E8E4" }}
        >
          {/* Top bar */}
          <div
            className="h-3"
            style={{ background: "linear-gradient(90deg, #071C12 0%, #35C47A 50%, #071C12 100%)" }}
          />

          <div className="p-16 text-center relative">
            {/* Decorative corners */}
            <div className="absolute top-8 left-8 w-12 h-12" style={{ borderTop: "2px solid rgba(53,196,122,0.3)", borderLeft: "2px solid rgba(53,196,122,0.3)" }} />
            <div className="absolute top-8 right-8 w-12 h-12" style={{ borderTop: "2px solid rgba(53,196,122,0.3)", borderRight: "2px solid rgba(53,196,122,0.3)" }} />
            <div className="absolute bottom-8 left-8 w-12 h-12" style={{ borderBottom: "2px solid rgba(53,196,122,0.3)", borderLeft: "2px solid rgba(53,196,122,0.3)" }} />
            <div className="absolute bottom-8 right-8 w-12 h-12" style={{ borderBottom: "2px solid rgba(53,196,122,0.3)", borderRight: "2px solid rgba(53,196,122,0.3)" }} />

            {/* Logo */}
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center font-bold" style={{ background: "#35C47A", color: "#071C12", fontFamily: "monospace", fontSize: 18 }}>T</div>
              <div className="text-left">
                <p className="font-bold text-sm leading-tight" style={{ color: "#071C12" }}>TVET DIGITAL</p>
                <p className="font-mono text-xs leading-tight" style={{ color: "#35C47A" }}>SKILLS ACADEMY</p>
              </div>
            </div>

            <p className="font-mono text-xs mb-2" style={{ color: "#718078" }}>REPUBLIC OF RWANDA</p>

            <div className="my-8" style={{ borderTop: "1px solid #E2E8E4", borderBottom: "1px solid #E2E8E4", padding: "20px 0" }}>
              <h1 className="text-4xl font-bold mb-2" style={{ color: "#071C12", letterSpacing: "-0.02em" }}>Certificate of Completion</h1>
              <p className="text-sm" style={{ color: "#718078" }}>This is to certify that</p>
            </div>

            <div className="my-8">
              <h2 className="text-5xl font-bold mb-2" style={{ color: "#35C47A", letterSpacing: "-0.02em" }}>
                Amahoro Jean de Dieu
              </h2>
              <p className="text-sm" style={{ color: "#718078" }}>INES-Ruhengeri · Software Development Track</p>
            </div>

            <p className="text-lg mb-2" style={{ color: "#718078" }}>has successfully completed</p>

            <div className="my-6">
              <h3 className="text-3xl font-bold mb-3" style={{ color: "#102019", letterSpacing: "-0.01em" }}>Web Development</h3>
              <p className="text-sm max-w-md mx-auto" style={{ color: "#718078" }}>
                A comprehensive 12-week course covering HTML, CSS, JavaScript, React, databases, and deployment.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-6 my-8 max-w-lg mx-auto">
              {[
                { label: "Completion Date", value: "September 1, 2026" },
                { label: "Assessment Score", value: "92%" },
                { label: "Projects Completed", value: "3 / 3" },
              ].map((item) => (
                <div key={item.label} className="text-center p-4 rounded-lg" style={{ background: "#F5F7F5" }}>
                  <p className="font-mono text-xs mb-1" style={{ color: "#718078" }}>{item.label}</p>
                  <p className="font-semibold text-sm" style={{ color: "#102019" }}>{item.value}</p>
                </div>
              ))}
            </div>

            <div className="mb-8">
              <p className="text-sm mb-3" style={{ color: "#718078" }}>Skills Obtained</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {["HTML5", "CSS3", "JavaScript", "React", "Node.js", "REST APIs", "Git", "Responsive Design"].map((s) => (
                  <span key={s} className="font-mono text-xs px-3 py-1.5 rounded-full" style={{ background: "rgba(53,196,122,0.08)", color: "#35C47A", border: "1px solid rgba(53,196,122,0.2)" }}>{s}</span>
                ))}
              </div>
            </div>

            <div className="flex items-end justify-between mt-12 pt-8" style={{ borderTop: "1px solid #E2E8E4" }}>
              <div className="text-left">
                <div className="w-32 h-px mb-2" style={{ background: "#102019" }} />
                <p className="text-sm font-semibold" style={{ color: "#102019" }}>Emmanuel Nkurunziza</p>
                <p className="font-mono text-xs" style={{ color: "#718078" }}>Course Instructor</p>
              </div>
              <div className="text-center">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-2"
                  style={{ background: "#071C12", border: "2px solid #35C47A" }}
                >
                  <span className="font-bold text-xl" style={{ color: "#35C47A", fontFamily: "monospace" }}>T</span>
                </div>
                <p className="font-mono text-xs" style={{ color: "#718078" }}>Official Seal</p>
              </div>
              <div className="text-right">
                <div className="w-32 h-px mb-2 ml-auto" style={{ background: "#102019" }} />
                <p className="text-sm font-semibold" style={{ color: "#102019" }}>Platform Director</p>
                <p className="font-mono text-xs" style={{ color: "#718078" }}>TVET Digital Academy</p>
              </div>
            </div>

            <div className="mt-8 pt-6" style={{ borderTop: "1px solid #F5F7F5" }}>
              <p className="font-mono text-xs" style={{ color: "#718078" }}>
                Verification Code: <span style={{ color: "#35C47A" }}>TVET-2026-WD-4821</span>
              </p>
              <p className="font-mono text-xs mt-1" style={{ color: "#718078" }}>
                Verify at: academy.tvet.rw/verify/TVET-2026-WD-4821
              </p>
            </div>
          </div>

          <div className="h-3" style={{ background: "linear-gradient(90deg, #071C12 0%, #35C47A 50%, #071C12 100%)" }} />
        </div>

        {/* Actions */}
        <div className="flex gap-4 mt-8 justify-center">
          <button className="px-6 py-3 rounded-lg font-semibold text-sm border transition-all hover:bg-gray-50" style={{ background: "#FFFFFF", color: "#102019", border: "1px solid #E2E8E4" }}>
            Share to LinkedIn
          </button>
          <Link to="/student" className="px-6 py-3 rounded-lg font-semibold text-sm" style={{ background: "#F5F7F5", color: "#718078", border: "1px solid #E2E8E4" }}>
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
