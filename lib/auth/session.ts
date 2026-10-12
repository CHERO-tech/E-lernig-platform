import { cookies } from "next/headers";
import {
  SESSION_COOKIE_NAME,
  SESSION_DURATION_SECONDS,
  decodeSessionToken,
  encodeSessionToken,
  SessionPayload,
} from "./sessionToken";

export type { SessionPayload };

// Signs a session token server-side and sets it httpOnly — client JS can
// never read or edit it, unlike the plaintext localStorage session it replaces.
export async function issueSession(payload: SessionPayload): Promise<void> {
  const token = encodeSessionToken(payload);
  const store = await cookies();
  store.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DURATION_SECONDS,
  });
}

export async function clearSession(): Promise<void> {
  const store = await cookies();
  store.delete(SESSION_COOKIE_NAME);
}

export async function getSession(): Promise<SessionPayload | null> {
  const store = await cookies();
  return decodeSessionToken(store.get(SESSION_COOKIE_NAME)?.value);
}
