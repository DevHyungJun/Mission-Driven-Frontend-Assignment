import { ReactNode } from "react";
import ImageProvider from "@/provider/ImageProvider/ImageProvider";
import CategoryProvider from "@/provider/CategoryProvider/CategoryProvider";
import { Header } from "@/components";

export default function RouteLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <ImageProvider>
      <CategoryProvider>
        <Header />
        {children}
      </CategoryProvider>
    </ImageProvider>
  );
}

