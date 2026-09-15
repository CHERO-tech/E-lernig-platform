import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/lib/theme/ThemeProvider";
import { AuthProvider } from "@/lib/auth/AuthProvider";
import { NotificationProvider } from "@/lib/notifications/NotificationProvider";
import { CartProvider } from "@/lib/cart/CartProvider";
import { CourseProvider } from "@/lib/courses/CourseProvider";
import { EnrollmentProvider } from "@/lib/enrollment/EnrollmentProvider";
import { PeopleProvider } from "@/lib/people/PeopleProvider";
import { MessagingProvider } from "@/lib/messaging/MessagingProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Forge — Skills you can put to work",
  description:
    "Forge replaces lecture-and-quiz courses with hands-on projects in Software Development, Networking, and Multimedia — reviewed by mentors and certified for hiring.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script
          // Runs before paint so the correct theme is applied immediately,
          // instead of flashing light and then switching to dark.
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var t=localStorage.getItem('forge_theme')||'system';" +
              "var d=t==='dark'||(t==='system'&&window.matchMedia('(prefers-color-scheme: dark)').matches);" +
              "if(d)document.documentElement.classList.add('dark');}catch(e){}})();",
          }}
        />
      </head>
      <body>
        <ThemeProvider>
          <AuthProvider>
            <NotificationProvider>
              <CartProvider>
                <CourseProvider>
                  <EnrollmentProvider>
                    <PeopleProvider>
                      <MessagingProvider>
                        {children}
                      </MessagingProvider>
                    </PeopleProvider>
                  </EnrollmentProvider>
                </CourseProvider>
              </CartProvider>
            </NotificationProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
