import crypto from "node:crypto";
import { UserRole } from "./types";

// Dependency-free (no jose/JWT library) — shared by lib/auth/session.ts
// (route handlers, which also need `cookies()` from next/headers) and
// proxy.ts (route protection, which must stay lightweight). A session token
// is `base64url(JSON claims).base64url(HMAC-SHA256 signature)`; tampering
// with either half fails the constant-time signature check below.

export const SESSION_COOKIE_NAME = "forge_session";
export const SESSION_DURATION_SECONDS = 60 * 60 * 24; // 24h — same length the old localStorage session used

export interface SessionPayload {
  sub: string;
  email: string;
  role: UserRole;
}

interface TokenClaims extends SessionPayload {
  exp: number; // unix seconds
}

function getSecret(): string {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 16) {
    throw new Error(
      "SESSION_SECRET is not set (or too short). Generate one with `openssl rand -base64 32` " +
        "and add it to your environment — see .env.example."
    );
  }
  return secret;
}

function sign(data: string): string {
  return crypto.createHmac("sha256", getSecret()).update(data).digest("base64url");
}

export function encodeSessionToken(payload: SessionPayload): string {
  const claims: TokenClaims = {
    ...payload,
    exp: Math.floor(Date.now() / 1000) + SESSION_DURATION_SECONDS,
  };
  const encodedPayload = Buffer.from(JSON.stringify(claims)).toString("base64url");
  return `${encodedPayload}.${sign(encodedPayload)}`;
}

export function decodeSessionToken(token: string | undefined): SessionPayload | null {
  if (!token) return null;

  const [encodedPayload, signature] = token.split(".");
  if (!encodedPayload || !signature) return null;

  const provided = Buffer.from(signature);
  const expected = Buffer.from(sign(encodedPayload));
  if (provided.length !== expected.length || !crypto.timingSafeEqual(provided, expected)) {
    return null;
  }

  try {
    const claims = JSON.parse(Buffer.from(encodedPayload, "base64url").toString("utf8")) as TokenClaims;
    if (
      typeof claims.sub !== "string" ||
      typeof claims.email !== "string" ||
      typeof claims.role !== "string" ||
      typeof claims.exp !== "number"
    ) {
      return null;
    }
    if (claims.exp < Math.floor(Date.now() / 1000)) return null;
    return { sub: claims.sub, email: claims.email, role: claims.role as UserRole };
  } catch {
    return null;
  }
}
