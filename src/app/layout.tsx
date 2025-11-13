import { ReactNode } from "react";
import "./globals.css";
import localFont from "next/font/local";
import { Header } from "@/components";

const pretendard = localFont({
  src: "../../public/fonts/PretendardVariable.woff2",
  variable: "--font-pretendard",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ko" className={`${pretendard.variable} font-medium`}>
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
