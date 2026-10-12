import { NextResponse } from "next/server";
import { createPasswordResetToken, findUserByEmail } from "@/lib/db/users";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  const found = await findUserByEmail(email);
  // Always returns a token, regardless of whether the address is registered —
  // the response never reveals which emails have accounts. It only actually
  // works (see confirm/route.ts) when a real account exists. There's no email
  // service here, so the caller shows this token directly to the user with a
  // clear "this would normally be emailed" disclaimer.
  const token = await createPasswordResetToken(found?.user.id ?? null);

  return NextResponse.json({ token });
}
