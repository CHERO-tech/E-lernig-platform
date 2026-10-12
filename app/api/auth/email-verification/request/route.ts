import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { createEmailVerificationCode } from "@/lib/db/users";

export async function POST() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  // No email service exists here — the caller shows this code directly to the
  // user with a clear "this would normally be emailed" disclaimer.
  const code = await createEmailVerificationCode(session.sub);
  return NextResponse.json({ code });
}
