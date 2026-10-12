import pg from "pg";
import { loadEnvLocal } from "./_loadEnv.mjs";
import { hashPassword } from "../lib/auth/password.ts";

loadEnvLocal();

const { Client } = pg;

// Same six accounts the login page's demo buttons always pointed at.
const DEMO_ACCOUNTS = [
  { email: "student@example.com", name: "Alex Student", role: "student", avatar: "AS" },
  { email: "trainer@example.com", name: "John Trainer", role: "trainer", avatar: "JT" },
  { email: "school@example.com", name: "Riverside Academy", role: "school", avatar: "RA" },
  { email: "guardian@example.com", name: "Maria Guardian", role: "guardian", avatar: "MG" },
  { email: "company@example.com", name: "Acme Talent Co.", role: "company", avatar: "AC" },
  { email: "admin@example.com", name: "Sam Admin", role: "admin", avatar: "SA" },
];
const DEMO_PASSWORD = "password123";

async function main() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    console.error(
      "DATABASE_URL is not set. Copy .env.example to .env.local, fill it in, and try again."
    );
    process.exit(1);
  }

  const client = new Client({ connectionString });
  await client.connect();

  try {
    const passwordHash = await hashPassword(DEMO_PASSWORD);

    for (const account of DEMO_ACCOUNTS) {
      await client.query(
        `insert into users (email, password_hash, name, role, avatar, email_verified)
         values ($1, $2, $3, $4, $5, true)
         on conflict (email) do nothing`,
        [account.email, passwordHash, account.name, account.role, account.avatar]
      );
      console.log("Seeded (or already existed):", account.email);
    }

    console.log(`Seed complete. All demo accounts use the password: ${DEMO_PASSWORD}`);
  } finally {
    await client.end();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
