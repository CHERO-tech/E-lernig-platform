import { NextResponse } from "next/server";
import { createUser, findUserByEmail } from "@/lib/db/users";
import { hashPassword } from "@/lib/auth/password";
import { issueSession } from "@/lib/auth/session";
import { UserRole } from "@/lib/auth/types";

// "admin" is deliberately excluded — the public sign-up form only ever offers
// these five, and the server must enforce that too, or anyone could POST
// role: "admin" directly and grant themselves the role. Admin accounts are
// created only via `npm run db:seed` / direct DB access.
const PUBLIC_ROLES: UserRole[] = ["student", "trainer", "school", "guardian", "company"];

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = typeof body?.password === "string" ? body.password : "";
  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const role = body?.role;

  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "A valid email is required" }, { status: 400 });
  }
  if (!password || password.length < 8) {
    return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 });
  }
  if (!name) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }
  if (!PUBLIC_ROLES.includes(role)) {
    return NextResponse.json({ error: "Invalid role" }, { status: 400 });
  }

  if (await findUserByEmail(email)) {
    return NextResponse.json({ error: "Email already exists" }, { status: 409 });
  }

  const passwordHash = await hashPassword(password);
  const avatar =
    name
      .split(" ")
      .filter(Boolean)
      .map((part: string) => part[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "?";

  const user = await createUser({ email, passwordHash, name, role, avatar });
  await issueSession({ sub: user.id, email: user.email, role: user.role });

  return NextResponse.json({ user });
}
