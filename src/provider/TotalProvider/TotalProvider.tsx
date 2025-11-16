import { Header } from "@/components";
import ImageProvider from "../ImageProvider/ImageProvider";
import ToastProvider from "../ToastProvider/ToastProvider";

// 프로젝트에서 사용하는 모든 프로바이더를 조합해서 전체 프로바이더 컴포넌트 생성
// 전역에서 프로바이더를 모두 관리하면 불필요한 리렌더링 발생, 결합도 증가, 재사용성 저하 등 문제가 있다
// 하지만 현재 프로젝트는 전체가 하나의 작성 페이지를 다루는 구조라 프로젝트 전체가 특정 페이지처럼 동작하므로 전역 프로바이더를 사용해도 문제가 적다고 판단하였음
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
