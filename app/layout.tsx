import "../global.css";
import { Inter, Newsreader, JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
import { Metadata } from "next";

import { Navigation } from "./components/nav";
import { ThemeToggle } from "./components/theme-toggle";
import CursorEffect from "./components/cursor-effect";
import { HashScrollHandler } from "./components/hash-scroll";
import { ScrollToTop } from "./components/scroll-to-top";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const calSans = localFont({
  src: "../public/fonts/CalSans-SemiBold.ttf",
  variable: "--font-calsans",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: {
    default: "Lynn Tao",
    template: "%s | Lynn Tao",
  },
  icons:{
    icon: "/icon.png"
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={[
        inter.variable,
        calSans.variable,
        newsreader.variable,
        mono.variable,
      ].join(" ")}
    >
      <body>
        <CursorEffect />
        <HashScrollHandler />
        <Navigation />
        

        {children}

        <ScrollToTop />
      </body>
    </html>
  );
}