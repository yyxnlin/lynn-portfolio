import "../global.css";
import { Inter } from "@next/font/google";
import LocalFont from "@next/font/local";
import { Metadata } from "next";
import { Analytics } from "./components/analytics";
import { Navigation } from "./components/nav";
import CursorEffect from "./components/cursor-effect";
import { HashScrollHandler } from "./components/hash-scroll";
import { ScrollToTop } from "./components/scroll-to-top";

export const metadata: Metadata = {
  title: {
    default: "Lynn Tao",
    template: "%s | Lynn Tao",
  },
  description: "Engineering Science student at UofT",
  openGraph: {
    title: "Lynn Tao",
    description:
      "Engineering Science student at UofT",
    url: "https://lynntao.com",
    siteName: "Lynn Tao",
    locale: "en-US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: "Lynn Tao",
    card: "summary_large_image",
  },
  icons: {
    icon: "/icon.png",
  },
};
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const calSans = LocalFont({
  src: "../public/fonts/CalSans-SemiBold.ttf",
  variable: "--font-calsans",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={[inter.variable, calSans.variable].join(" ")}>
      <head>
        <Analytics />
      </head>
      <body
        className={process.env.NODE_ENV === "development" ? "debug-screens" : undefined}
      >
        <CursorEffect />
        <HashScrollHandler />
        <Navigation />

        {children}

        <ScrollToTop />
      </body>
    </html>
  );
}
