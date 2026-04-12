import { type Metadata } from "next";
import { Geist, Inter } from "next/font/google";
import { AuthUserSync } from "../auth/auth-user-sync";
import { TRPCReactProvider } from "@/trpc/react";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import { ThemeProvider } from "@/theme/theme-provider";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Algowars",
  description: "Online Competitive Coding Platform",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
      className={cn(geist.variable, "font-sans", inter.variable)}
    >
      <body>
        <TRPCReactProvider>
          <AuthUserSync />
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
