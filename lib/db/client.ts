import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error(
    "DATABASE_URL is not set. Auth now runs against a real Postgres database " +
      "instead of an in-memory mock — see .env.example for setup."
  );
}

// A module-level pool is reused across requests in the same server process,
// so route handlers aren't opening a fresh TCP+TLS handshake per query. SSL
// mode (Neon requires it) is read straight from `?sslmode=require` in the
// connection string itself — no separate `ssl` option needed here.
export const pool = new Pool({ connectionString, max: 5 });
