import { NextResponse } from "next/server";
import { clearSession, getSession } from "@/lib/auth/session";
import { deleteUser } from "@/lib/db/users";

export async function POST() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  await deleteUser(session.sub);
  await clearSession();
  return NextResponse.json({ ok: true });
}
