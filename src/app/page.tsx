import { Button, Textarea } from "@/components";

export default function Home() {
  return (
    <div className="p-2">
      <h1>메인 페이지</h1>
      <Textarea
        placeholder="텍스트를 입력해주세요"
        errorMessage="에러 메시지"
        isError
      />
      <Button variant="outline" size="small" color="green">
        버튼
      </Button>
    </div>
  );
}
