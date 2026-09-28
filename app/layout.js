import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CursorGlow } from "@/components/cursor-glow";
import { IntroSplash } from "@/components/intro-splash";
import { SiteBackdrop } from "@/components/site-backdrop";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Manish Mandala - Recalc Finance Accelerator Application",
  description:
    "Manish Mandala's application website for Recalc's Finance Accelerator, Fall 2026: how curiosity about how things work turned into curiosity about how businesses work.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <head>
        {/* Synchronous on purpose (not next/script, which runs after first
            paint): the page must stay hidden until intro-splash.jsx decides
            whether to show itself, or the page flashes before the splash. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try {
              if (sessionStorage.getItem("mmIntroSeen") !== "1") {
                document.documentElement.setAttribute("data-intro-pending", "");
              }
            } catch (e) {}`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <SiteBackdrop />
        <CursorGlow />
        <IntroSplash />
        <SiteHeader />
        <main className="relative z-[1] flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
