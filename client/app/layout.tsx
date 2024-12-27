import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import localKgFont from "next/font/local";
import localBricolageGrotesqueCondensed from "next/font/local";
import "css/globals.css";

const bricoleGrotesque = Bricolage_Grotesque({
  weight: "400",
  style: "normal",
  subsets: ["latin"],
  variable: "--bricolage--font",
  display: "swap",
});
const bricoleGrotesqueCondensed = localBricolageGrotesqueCondensed({
  variable: "--bricolage-condensed--font",
  src: "./assets/fonts/BricolageGrotesque_Condensed-Bold.ttf",
});

const kgFont = localKgFont({ display: "swap", src: "./assets/fonts/KGSecondChancesSketch.ttf", variable: "--kg-font" });

export const metadata: Metadata = {
  title: "WeRaw - photos",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${bricoleGrotesque.variable} ${bricoleGrotesqueCondensed.variable} ${kgFont.variable}`}>{children}</body>
    </html>
  );
}
