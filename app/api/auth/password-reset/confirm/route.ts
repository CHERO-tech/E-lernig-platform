import { NextResponse } from "next/server";
import { consumePasswordResetToken, updateUserPasswordHash } from "@/lib/db/users";
import { hashPassword } from "@/lib/auth/password";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const token = typeof body?.token === "string" ? body.token : "";
  const newPassword = typeof body?.newPassword === "string" ? body.newPassword : "";

  if (!newPassword || newPassword.length < 8) {
    return NextResponse.json({ error: "New password must be at least 8 characters" }, { status: 400 });
  }

  const userId = await consumePasswordResetToken(token);
  if (!userId) {
    return NextResponse.json({ error: "That reset code is invalid or has expired" }, { status: 400 });
  }

  await updateUserPasswordHash(userId, await hashPassword(newPassword));
  return NextResponse.json({ ok: true });
}
