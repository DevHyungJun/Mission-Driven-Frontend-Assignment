import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ContentTitle from "./ContentTitle";
import { useContentTitleStore } from "@/stores";

const renderContentTitle = () => {
  return render(<ContentTitle />);
};

describe("ContentTitle 통합 테스트", () => {
  beforeEach(() => {
    useContentTitleStore.getState().setContentTitle("");
  });

  describe("React Hook Form 연동", () => {
    it("텍스트 입력 시 값이 변경되어야 한다", async () => {
      const user = userEvent.setup();
      renderContentTitle();

      const textarea = screen.getByLabelText(
        "콘텐츠 제목 입력 필드"
      ) as HTMLTextAreaElement;

      await user.type(textarea, "테스트 제목");

      expect(textarea.value).toBe("테스트 제목");
    });

    it("텍스트를 지울 수 있어야 한다", async () => {
      const user = userEvent.setup();
      renderContentTitle();

      const textarea = screen.getByLabelText(
        "콘텐츠 제목 입력 필드"
      ) as HTMLTextAreaElement;

      await user.type(textarea, "테스트 제목");
      expect(textarea.value).toBe("테스트 제목");

      await user.clear(textarea);
      expect(textarea.value).toBe("");
    });

    it("텍스트 입력 시 watch가 작동해야 한다", async () => {
      const user = userEvent.setup();
      renderContentTitle();

      const textarea = screen.getByLabelText(
        "콘텐츠 제목 입력 필드"
      ) as HTMLTextAreaElement;

      await user.type(textarea, "새로운 제목");

      await waitFor(() => {
        expect(textarea.value).toBe("새로운 제목");
      });
    });

    it("placeholder가 표시되어야 한다", () => {
      renderContentTitle();

      const textarea = screen.getByPlaceholderText("제목을 입력해주세요");
      expect(textarea).toBeInTheDocument();
    });

    it("제목과 설명이 표시되어야 한다", () => {
      renderContentTitle();

      expect(screen.getByText("콘텐츠 제목")).toBeInTheDocument();
    });
  });

  describe("validation", () => {
    it("8자 미만일 때 에러 메시지가 표시되어야 한다", async () => {
      const user = userEvent.setup();
      renderContentTitle();

      const textarea = screen.getByLabelText(
        "콘텐츠 제목 입력 필드"
      ) as HTMLTextAreaElement;

      await user.type(textarea, "7자입니다");
      await user.tab();

      await waitFor(() => {
        expect(
          screen.getByText("최소 8자 이상 입력해주세요")
        ).toBeInTheDocument();
      });
    });

    it("8자 이상일 때 에러 메시지가 표시되지 않아야 한다", async () => {
      const user = userEvent.setup();
      renderContentTitle();

      const textarea = screen.getByLabelText(
        "콘텐츠 제목 입력 필드"
      ) as HTMLTextAreaElement;

      await user.type(textarea, "8자 이상 제목입니다");
      await user.tab();

      await waitFor(() => {
        expect(
          screen.queryByText("최소 8자 이상 입력해주세요")
        ).not.toBeInTheDocument();
      });
    });

    it("빈 값일 때는 에러 메시지가 표시되지 않아야 한다", async () => {
      const user = userEvent.setup();
      renderContentTitle();

      const textarea = screen.getByLabelText(
        "콘텐츠 제목 입력 필드"
      ) as HTMLTextAreaElement;

      await user.tab();

      expect(
        screen.queryByText("최소 8자 이상 입력해주세요")
      ).not.toBeInTheDocument();
    });

    it("7자 입력 후 8자로 늘리면 에러가 사라져야 한다", async () => {
      const user = userEvent.setup();
      renderContentTitle();

      const textarea = screen.getByLabelText(
        "콘텐츠 제목 입력 필드"
      ) as HTMLTextAreaElement;

      await user.type(textarea, "7자입니다");
      await user.tab();

      await waitFor(() => {
        expect(
          screen.getByText("최소 8자 이상 입력해주세요")
        ).toBeInTheDocument();
      });

      await user.type(textarea, "8자 이상입니다");

      await waitFor(() => {
        expect(
          screen.queryByText("최소 8자 이상 입력해주세요")
        ).not.toBeInTheDocument();
      });
    });

    it("에러 상태일 때 Textarea에 isError가 전달되어야 한다", async () => {
      const user = userEvent.setup();
      renderContentTitle();

      const textarea = screen.getByLabelText(
        "콘텐츠 제목 입력 필드"
      ) as HTMLTextAreaElement;

      await user.type(textarea, "7자입니다");
      await user.tab();

      await waitFor(() => {
        const textareaContainer = textarea.closest("div");
        expect(textareaContainer).toHaveClass("border-[#E82929]");
      });
    });
  });

  describe("store 저장", () => {
    it("텍스트 입력 시 store에 저장되어야 한다", async () => {
      const user = userEvent.setup();
      renderContentTitle();

      const textarea = screen.getByLabelText(
        "콘텐츠 제목 입력 필드"
      ) as HTMLTextAreaElement;

      await user.type(textarea, "저장될 제목");

      await waitFor(() => {
        const store = useContentTitleStore.getState();
        expect(store.contentTitle).toBe("저장될 제목");
      });
    });

    it("텍스트 변경 시 store가 업데이트되어야 한다", async () => {
      const user = userEvent.setup();
      renderContentTitle();

      const textarea = screen.getByLabelText(
        "콘텐츠 제목 입력 필드"
      ) as HTMLTextAreaElement;

      await user.type(textarea, "첫 번째 제목");

      await waitFor(() => {
        expect(useContentTitleStore.getState().contentTitle).toBe(
          "첫 번째 제목"
        );
      });

      await user.clear(textarea);
      await user.type(textarea, "두 번째 제목");

      await waitFor(() => {
        expect(useContentTitleStore.getState().contentTitle).toBe(
          "두 번째 제목"
        );
      });
    });

    it("초기값이 store에서 로드되어야 한다", () => {
      act(() => {
        useContentTitleStore.getState().setContentTitle("기존 제목");
      });

      renderContentTitle();

      const textarea = screen.getByLabelText(
        "콘텐츠 제목 입력 필드"
      ) as HTMLTextAreaElement;

      expect(textarea.value).toBe("기존 제목");
    });

    it("텍스트를 지우면 store도 빈 값으로 업데이트되어야 한다", async () => {
      const user = userEvent.setup();
      renderContentTitle();

      const textarea = screen.getByLabelText(
        "콘텐츠 제목 입력 필드"
      ) as HTMLTextAreaElement;

      await user.type(textarea, "임시 제목");

      await waitFor(() => {
        expect(useContentTitleStore.getState().contentTitle).toBe("임시 제목");
      });

      await user.clear(textarea);

      await waitFor(() => {
        expect(useContentTitleStore.getState().contentTitle).toBe("");
      });
    });
  });

  describe("접근성", () => {
    it("textarea에 적절한 aria-label이 설정되어 있어야 한다", () => {
      renderContentTitle();

      const textarea = screen.getByLabelText("콘텐츠 제목 입력 필드");
      expect(textarea).toBeInTheDocument();
    });
  });
});
