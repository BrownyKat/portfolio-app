import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://local-portfolio.example"),
  title: {
    default: "Embuido, Fran Joseph M. | Portfolio",
    template: "%s | Embuido, Fran Joseph M.",
  },
  description:
    "A polished portfolio for Embuido, Fran Joseph M., a BSIT student featuring full-stack projects, internship logs, and completion screenshots.",
  openGraph: {
    title: "Embuido, Fran Joseph M. | Portfolio",
    description:
      "BSIT student portfolio with full-stack projects, internship logs, and completion screenshots presented in a clean sci-fi interface.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full`}
    >
      <body className="arcane-shell flex min-h-full flex-col antialiased">
        {children}
      </body>
    </html>
  );
}
