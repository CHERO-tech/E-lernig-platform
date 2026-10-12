import { NextResponse } from "next/server";
import { findUserByEmail } from "@/lib/db/users";
import { verifyPassword } from "@/lib/auth/password";
import { issueSession } from "@/lib/auth/session";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = typeof body?.password === "string" ? body.password : "";

  if (!email || !password) {
    return NextResponse.json({ error: "Invalid email or password" }, { status: 400 });
  }

  const found = await findUserByEmail(email);
  if (!found || !(await verifyPassword(password, found.passwordHash))) {
    return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
  }

  const { user } = found;
  await issueSession({ sub: user.id, email: user.email, role: user.role });

  return NextResponse.json({ user });
}
