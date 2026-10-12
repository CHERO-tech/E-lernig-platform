import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { findUserByEmail, updateUserPasswordHash } from "@/lib/db/users";
import { hashPassword, verifyPassword } from "@/lib/auth/password";

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const currentPassword = typeof body?.currentPassword === "string" ? body.currentPassword : "";
  const newPassword = typeof body?.newPassword === "string" ? body.newPassword : "";

  if (!newPassword || newPassword.length < 8) {
    return NextResponse.json({ error: "New password must be at least 8 characters" }, { status: 400 });
  }

  const found = await findUserByEmail(session.email);
  if (!found || !(await verifyPassword(currentPassword, found.passwordHash))) {
    return NextResponse.json({ error: "Current password is incorrect" }, { status: 401 });
  }

  await updateUserPasswordHash(found.user.id, await hashPassword(newPassword));
  return NextResponse.json({ ok: true });
}
