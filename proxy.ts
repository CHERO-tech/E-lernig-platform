import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SESSION_COOKIE_NAME, decodeSessionToken } from "@/lib/auth/sessionToken";
import type { UserRole } from "@/lib/auth/types";

// Server-side enforcement of the same role gating components/ProtectedRoute.tsx
// does client-side. That component still runs (it owns the loading spinner and
// covers client-side navigations before this file's redirect data arrives), but
// it was previously the *only* gate — anyone could reach an admin/trainer page
// by disabling JS or just letting the page mount before the redirect fired,
// since the guarded data was already sitting in client state. This runs before
// any of that renders, using the httpOnly cookie the client can't read or edit.
const ROLE_ROUTES: Array<{ prefix: string; role: UserRole }> = [
  { prefix: "/admin", role: "admin" },
  { prefix: "/trainer", role: "trainer" },
  { prefix: "/company", role: "company" },
  { prefix: "/school/dashboard", role: "school" },
  { prefix: "/guardian/dashboard", role: "guardian" },
  { prefix: "/student/dashboard", role: "student" },
];

// Requires a signed-in user of any role — mirrors every <ProtectedRoute> usage
// with no requiredRole prop.
const AUTH_ONLY_PREFIXES = [
  "/cart",
  "/checkout",
  "/resources",
  "/messages",
  "/my-enrollments",
  "/my-grades",
  "/my-learning",
  "/notifications",
  "/profile",
  "/settings",
  "/skill-endorsements",
  "/saved-courses",
  "/certificates",
  "/verify-email",
  "/live-sessions",
];

function matchesPrefix(pathname: string, prefix: string): boolean {
  return pathname === prefix || pathname.startsWith(`${prefix}/`);
}

// /courses and /courses/[courseId] are public marketing pages — only the
// learning/assignment/quiz/discussion sub-routes require a session.
function isCourseProtectedSubroute(pathname: string): boolean {
  return /^\/courses\/[^/]+\/(learn|assignments|quizzes|discussions)(\/.*)?$/.test(pathname);
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const roleRoute = ROLE_ROUTES.find((route) => matchesPrefix(pathname, route.prefix));
  const needsAuth =
    Boolean(roleRoute) ||
    AUTH_ONLY_PREFIXES.some((prefix) => matchesPrefix(pathname, prefix)) ||
    isCourseProtectedSubroute(pathname);

  if (!needsAuth) return NextResponse.next();

  const session = decodeSessionToken(request.cookies.get(SESSION_COOKIE_NAME)?.value);

  if (!session) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (roleRoute && session.role !== roleRoute.role) {
    return NextResponse.redirect(new URL(`/${session.role}/dashboard`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin",
    "/admin/:path*",
    "/trainer",
    "/trainer/:path*",
    "/company",
    "/company/:path*",
    "/school/dashboard",
    "/school/dashboard/:path*",
    "/guardian/dashboard",
    "/guardian/dashboard/:path*",
    "/student/dashboard",
    "/student/dashboard/:path*",
    "/cart",
    "/cart/:path*",
    "/checkout",
    "/checkout/:path*",
    "/resources",
    "/resources/:path*",
    "/messages",
    "/messages/:path*",
    "/my-enrollments",
    "/my-enrollments/:path*",
    "/my-grades",
    "/my-grades/:path*",
    "/my-learning",
    "/my-learning/:path*",
    "/notifications",
    "/notifications/:path*",
    "/profile",
    "/profile/:path*",
    "/settings",
    "/settings/:path*",
    "/skill-endorsements",
    "/skill-endorsements/:path*",
    "/saved-courses",
    "/saved-courses/:path*",
    "/certificates",
    "/certificates/:path*",
    "/verify-email",
    "/verify-email/:path*",
    "/live-sessions",
    "/live-sessions/:path*",
    "/courses/:courseId/learn",
    "/courses/:courseId/learn/:path*",
    "/courses/:courseId/assignments",
    "/courses/:courseId/assignments/:path*",
    "/courses/:courseId/quizzes",
    "/courses/:courseId/quizzes/:path*",
    "/courses/:courseId/discussions",
    "/courses/:courseId/discussions/:path*",
  ],
};
