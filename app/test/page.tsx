export default function TestPage() {
  return (
    <div style={{ padding: "40px", fontFamily: "sans-serif" }}>
      <h1>✅ TEST PAGE - VERCEL IS WORKING</h1>
      <p>If you see this, Vercel deployed the latest code successfully!</p>
      <p>Timestamp: {new Date().toISOString()}</p>
      <a href="/register" style={{ color: "blue", textDecoration: "underline" }}>
        → Go to Register Page
      </a>
    </div>
  );
}
