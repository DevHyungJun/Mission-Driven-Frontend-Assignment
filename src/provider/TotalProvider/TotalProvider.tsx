import { Header } from "@/components";
import CategoryProvider from "../CategoryProvider/CategoryProvider";
import ImageProvider from "../ImageProvider/ImageProvider";
import ToastProvider from "../ToastProvider/ToastProvider";

const TotalProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ToastProvider>
      <ImageProvider>
        <CategoryProvider>
          <Header />
          {children}
        </CategoryProvider>
      </ImageProvider>
    </ToastProvider>
  );
};

export default TotalProvider;
