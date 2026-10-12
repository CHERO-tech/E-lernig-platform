import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { consumeEmailVerificationCode, setEmailVerified } from "@/lib/db/users";

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const code = typeof body?.code === "string" ? body.code : "";

  const ok = await consumeEmailVerificationCode(session.sub, code);
  if (!ok) {
    return NextResponse.json({ error: "That verification code is invalid or has expired" }, { status: 400 });
  }

  const user = await setEmailVerified(session.sub);
  return NextResponse.json({ user });
}
