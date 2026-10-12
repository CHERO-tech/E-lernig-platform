import crypto from "node:crypto";
import { pool } from "./client";
import { ProfileUpdate, User, UserRole } from "@/lib/auth/types";

interface UserRow {
  id: string;
  email: string;
  password_hash: string;
  name: string;
  role: UserRole;
  avatar: string | null;
  phone: string | null;
  location: string | null;
  bio: string | null;
  email_verified: boolean;
  created_at: string;
}

function toUser(row: UserRow): User {
  return {
    id: row.id,
    email: row.email,
    name: row.name,
    role: row.role,
    avatar: row.avatar ?? undefined,
    phone: row.phone ?? undefined,
    location: row.location ?? undefined,
    bio: row.bio ?? undefined,
    emailVerified: row.email_verified,
    createdAt: new Date(row.created_at),
  };
}

export async function findUserByEmail(
  email: string
): Promise<{ user: User; passwordHash: string } | null> {
  const { rows } = await pool.query<UserRow>(
    "select * from users where lower(email) = lower($1) limit 1",
    [email]
  );
  const row = rows[0];
  if (!row) return null;
  return { user: toUser(row), passwordHash: row.password_hash };
}

export async function findUserById(id: string): Promise<User | null> {
  const { rows } = await pool.query<UserRow>("select * from users where id = $1 limit 1", [id]);
  const row = rows[0];
  return row ? toUser(row) : null;
}

export async function createUser(input: {
  email: string;
  passwordHash: string;
  name: string;
  role: UserRole;
  avatar: string;
}): Promise<User> {
  const { rows } = await pool.query<UserRow>(
    `insert into users (email, password_hash, name, role, avatar, email_verified)
     values ($1, $2, $3, $4, $5, false)
     returning *`,
    [input.email.toLowerCase(), input.passwordHash, input.name, input.role, input.avatar]
  );
  return toUser(rows[0]);
}

export async function updateUserProfile(id: string, updates: ProfileUpdate): Promise<User> {
  const { rows } = await pool.query<UserRow>(
    `update users set
       name = coalesce($2, name),
       email = coalesce($3, email),
       phone = coalesce($4, phone),
       location = coalesce($5, location),
       bio = coalesce($6, bio),
       avatar = coalesce($7, avatar)
     where id = $1
     returning *`,
    [
      id,
      updates.name ?? null,
      updates.email?.trim().toLowerCase() ?? null,
      updates.phone ?? null,
      updates.location ?? null,
      updates.bio ?? null,
      updates.avatar ?? null,
    ]
  );
  return toUser(rows[0]);
}

export async function updateUserPasswordHash(id: string, passwordHash: string): Promise<void> {
  await pool.query("update users set password_hash = $2 where id = $1", [id, passwordHash]);
}

export async function setEmailVerified(id: string): Promise<User> {
  const { rows } = await pool.query<UserRow>(
    "update users set email_verified = true where id = $1 returning *",
    [id]
  );
  return toUser(rows[0]);
}

export async function deleteUser(id: string): Promise<void> {
  await pool.query("delete from users where id = $1", [id]);
}

// Random, human-friendly codes (no 0/O/1/I) — same shape the old mock handed
// back, just drawn from crypto.randomBytes instead of Math.random.
function randomCode(length: number): string {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const bytes = crypto.randomBytes(length);
  let out = "";
  for (let i = 0; i < length; i++) out += alphabet[bytes[i] % alphabet.length];
  return out;
}

function hashToken(token: string): string {
  return crypto.createHash("sha256").update(token).digest("hex");
}

// userId is null when the requesting email doesn't belong to any account —
// a token string is still generated and returned so the response shape never
// reveals whether the address is registered, but nothing is persisted for it.
export async function createPasswordResetToken(userId: string | null): Promise<string> {
  const token = randomCode(6);
  if (userId) {
    const tokenHash = hashToken(token);
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);
    await pool.query(
      "insert into password_reset_tokens (user_id, token_hash, expires_at) values ($1, $2, $3)",
      [userId, tokenHash, expiresAt]
    );
  }
  return token;
}

export async function consumePasswordResetToken(token: string): Promise<string | null> {
  const tokenHash = hashToken(token.trim().toUpperCase());
  const { rows } = await pool.query<{ id: string; user_id: string }>(
    `select id, user_id from password_reset_tokens
     where token_hash = $1 and used_at is null and expires_at > now()
     order by expires_at desc
     limit 1`,
    [tokenHash]
  );
  const row = rows[0];
  if (!row) return null;
  await pool.query("update password_reset_tokens set used_at = now() where id = $1", [row.id]);
  return row.user_id;
}

export async function createEmailVerificationCode(userId: string): Promise<string> {
  const code = crypto.randomInt(100000, 1000000).toString();
  const codeHash = hashToken(code);
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000);
  await pool.query(
    "insert into email_verification_codes (user_id, code_hash, expires_at) values ($1, $2, $3)",
    [userId, codeHash, expiresAt]
  );
  return code;
}

export async function consumeEmailVerificationCode(userId: string, code: string): Promise<boolean> {
  const codeHash = hashToken(code.trim());
  const { rows } = await pool.query<{ id: string }>(
    `select id from email_verification_codes
     where user_id = $1 and code_hash = $2 and used_at is null and expires_at > now()
     order by expires_at desc
     limit 1`,
    [userId, codeHash]
  );
  const row = rows[0];
  if (!row) return false;
  await pool.query("update email_verification_codes set used_at = now() where id = $1", [row.id]);
  return true;
}
