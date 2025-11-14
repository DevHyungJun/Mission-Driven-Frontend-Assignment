import { Header } from "@/components";
import ImageProvider from "../ImageProvider/ImageProvider";
import ToastProvider from "../ToastProvider/ToastProvider";

const TotalProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ToastProvider>
      <ImageProvider>
        <Header />
        {children}
      </ImageProvider>
    </ToastProvider>
  );
};

export default TotalProvider;
