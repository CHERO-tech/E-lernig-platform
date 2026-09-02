import type { Metadata } from "next";
import { AuthProvider } from "@/lib/auth/AuthProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Forge — Skills you can put to work",
  description:
    "Forge replaces lecture-and-quiz courses with hands-on projects in Software Development, Networking, and Multimedia — reviewed by mentors and certified for hiring.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
