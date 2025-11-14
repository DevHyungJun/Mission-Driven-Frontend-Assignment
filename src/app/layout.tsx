import { ReactNode } from "react";
import "./globals.css";
import localFont from "next/font/local";
import TotalProvider from "@/provider/TotalProvider/TotalProvider";

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
        <TotalProvider>{children}</TotalProvider>
      </body>
    </html>
  );
}
