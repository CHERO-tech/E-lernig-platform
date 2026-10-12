import { NextResponse } from "next/server";
import { getSession, issueSession } from "@/lib/auth/session";
import { updateUserProfile } from "@/lib/db/users";
import { ProfileUpdate } from "@/lib/auth/types";

interface PgError {
  code?: string;
}

export async function PATCH(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as { updates?: ProfileUpdate } | null;
  const updates = body?.updates ?? {};

  try {
    const user = await updateUserProfile(session.sub, updates);
    // Re-issue so the session cookie reflects a changed email immediately.
    await issueSession({ sub: user.id, email: user.email, role: user.role });
    return NextResponse.json({ user });
  } catch (err) {
    if ((err as PgError)?.code === "23505") {
      return NextResponse.json({ error: "Email already in use" }, { status: 409 });
    }
    throw err;
  }
}
