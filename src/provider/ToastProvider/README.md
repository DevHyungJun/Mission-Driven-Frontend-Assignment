# ToastProvider 사용법

## 1. Provider 설정

layout.tsx에 ToastProvider를 추가합니다:

```tsx
import ToastProvider from "@/provider/ToastProvider/ToastProvider";

export default function Layout({ children }) {
  return (
    <ToastProvider>
      {children}
    </ToastProvider>
  );
}
```

## 2. 함수 내부에서 사용하기

### 방법 1: toast.show() 함수 사용 (권장)

어떤 함수 내부에서든 직접 호출 가능합니다:

```tsx
import { toast } from "@/provider/ToastProvider/ToastProvider";

const handleSubmit = () => {
  if (someCondition) {
    toast.show("성공적으로 저장되었습니다!");
  } else {
    toast.show("오류가 발생했습니다.");
  }
};
```

### 방법 2: useToast 훅 사용

컴포넌트 내부에서 사용할 때:

```tsx
import useToast from "@/provider/ToastProvider/hooks/useToast";

const MyComponent = () => {
  const { showToast } = useToast();

  const handleClick = () => {
    if (someCondition) {
      showToast("메시지가 표시됩니다!");
    }
  };

  return <button onClick={handleClick}>클릭</button>;
};
```

## 예시

```tsx
// 유틸 함수 내부에서 사용
import { toast } from "@/provider/ToastProvider/ToastProvider";

export const handleImageUpload = (file: File) => {
  if (!file) {
    toast.show("파일을 선택해주세요.");
    return;
  }

  if (file.size > 5 * 1024 * 1024) {
    toast.show("파일 크기는 5MB 이하여야 합니다.");
    return;
  }

  // 업로드 로직...
  toast.show("이미지가 업로드되었습니다!");
};
```

