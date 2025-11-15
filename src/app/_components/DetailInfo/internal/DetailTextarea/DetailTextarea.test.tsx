import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DetailTextarea from "./DetailTextarea";
import { useSessionStore } from "@/stores";

const TEST_SESSION_ID = "test-session-1";

const renderDetailTextarea = (sessionId: string = TEST_SESSION_ID) => {
  return render(<DetailTextarea sessionId={sessionId} />);
};

describe("DetailTextarea 통합 테스트", () => {
  beforeEach(() => {
    act(() => {
      const store = useSessionStore.getState();
      store.sessions.forEach((session) => {
        store.removeSession(session.id);
      });
      store.addSession();
      const newSession = store.sessions[0];
      store.setSessionDetailText(newSession.id, "");
    });
  });

  describe("React Hook Form 연동", () => {
    it("텍스트 입력 시 값이 변경되어야 한다", async () => {
      const user = userEvent.setup();
      const store = useSessionStore.getState();
      const sessionId = store.sessions[0].id;

      renderDetailTextarea(sessionId);

      const textarea = screen.getByLabelText(
        "활동 내용 입력 필드"
      ) as HTMLTextAreaElement;

      await user.type(textarea, "테스트 활동 내용");

      expect(textarea.value).toBe("테스트 활동 내용");
    });

    it("텍스트를 지울 수 있어야 한다", async () => {
      const user = userEvent.setup();
      const store = useSessionStore.getState();
      const sessionId = store.sessions[0].id;

      renderDetailTextarea(sessionId);

      const textarea = screen.getByLabelText(
        "활동 내용 입력 필드"
      ) as HTMLTextAreaElement;

      await user.type(textarea, "테스트 활동 내용");
      expect(textarea.value).toBe("테스트 활동 내용");

      await user.clear(textarea);
      expect(textarea.value).toBe("");
    });

    it("텍스트 입력 시 watch가 작동해야 한다", async () => {
      const user = userEvent.setup();
      const store = useSessionStore.getState();
      const sessionId = store.sessions[0].id;

      renderDetailTextarea(sessionId);

      const textarea = screen.getByLabelText(
        "활동 내용 입력 필드"
      ) as HTMLTextAreaElement;

      await user.type(textarea, "새로운 활동 내용");

      await waitFor(() => {
        expect(textarea.value).toBe("새로운 활동 내용");
      });
    });

    it("placeholder가 표시되어야 한다", () => {
      const store = useSessionStore.getState();
      const sessionId = store.sessions[0].id;

      renderDetailTextarea(sessionId);

      const textarea =
        screen.getByPlaceholderText("활동 내용을 간단히 입력해주세요");
      expect(textarea).toBeInTheDocument();
    });

    it("maxLength가 800으로 설정되어 있어야 한다", () => {
      const store = useSessionStore.getState();
      const sessionId = store.sessions[0].id;

      renderDetailTextarea(sessionId);

      const textarea = screen.getByLabelText(
        "활동 내용 입력 필드"
      ) as HTMLTextAreaElement;

      expect(textarea.maxLength).toBe(800);
    });
  });

  describe("validation", () => {
    it("8자 미만일 때 에러 메시지가 표시되어야 한다", async () => {
      const user = userEvent.setup();
      const store = useSessionStore.getState();
      const sessionId = store.sessions[0].id;

      renderDetailTextarea(sessionId);

      const textarea = screen.getByLabelText(
        "활동 내용 입력 필드"
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
      const store = useSessionStore.getState();
      const sessionId = store.sessions[0].id;

      renderDetailTextarea(sessionId);

      const textarea = screen.getByLabelText(
        "활동 내용 입력 필드"
      ) as HTMLTextAreaElement;

      await user.type(textarea, "8자 이상 활동 내용입니다");
      await user.tab();

      await waitFor(() => {
        expect(
          screen.queryByText("최소 8자 이상 입력해주세요")
        ).not.toBeInTheDocument();
      });
    });

    it("빈 값일 때는 에러 메시지가 표시되지 않아야 한다", async () => {
      const user = userEvent.setup();
      const store = useSessionStore.getState();
      const sessionId = store.sessions[0].id;

      renderDetailTextarea(sessionId);

      const textarea = screen.getByLabelText(
        "활동 내용 입력 필드"
      ) as HTMLTextAreaElement;

      await user.tab();

      expect(
        screen.queryByText("최소 8자 이상 입력해주세요")
      ).not.toBeInTheDocument();
    });

    it("7자 입력 후 8자로 늘리면 에러가 사라져야 한다", async () => {
      const user = userEvent.setup();
      const store = useSessionStore.getState();
      const sessionId = store.sessions[0].id;

      renderDetailTextarea(sessionId);

      const textarea = screen.getByLabelText(
        "활동 내용 입력 필드"
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
      const store = useSessionStore.getState();
      const sessionId = store.sessions[0].id;

      renderDetailTextarea(sessionId);

      const textarea = screen.getByLabelText(
        "활동 내용 입력 필드"
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
      const store = useSessionStore.getState();
      const sessionId = store.sessions[0].id;

      renderDetailTextarea(sessionId);

      const textarea = screen.getByLabelText(
        "활동 내용 입력 필드"
      ) as HTMLTextAreaElement;

      await user.type(textarea, "저장될 활동 내용");

      await waitFor(() => {
        const currentStore = useSessionStore.getState();
        const session = currentStore.sessions.find((s) => s.id === sessionId);
        expect(session?.detailText).toBe("저장될 활동 내용");
      });
    });

    it("텍스트 변경 시 store가 업데이트되어야 한다", async () => {
      const user = userEvent.setup();
      const store = useSessionStore.getState();
      const sessionId = store.sessions[0].id;

      renderDetailTextarea(sessionId);

      const textarea = screen.getByLabelText(
        "활동 내용 입력 필드"
      ) as HTMLTextAreaElement;

      await user.type(textarea, "첫 번째 활동 내용");

      await waitFor(() => {
        const currentStore = useSessionStore.getState();
        const session = currentStore.sessions.find((s) => s.id === sessionId);
        expect(session?.detailText).toBe("첫 번째 활동 내용");
      });

      await user.clear(textarea);
      await user.type(textarea, "두 번째 활동 내용");

      await waitFor(() => {
        const currentStore = useSessionStore.getState();
        const session = currentStore.sessions.find((s) => s.id === sessionId);
        expect(session?.detailText).toBe("두 번째 활동 내용");
      });
    });

    it("초기값이 store에서 로드되어야 한다", () => {
      const store = useSessionStore.getState();
      const sessionId = store.sessions[0].id;

      act(() => {
        store.setSessionDetailText(sessionId, "기존 활동 내용");
      });

      renderDetailTextarea(sessionId);

      const textarea = screen.getByLabelText(
        "활동 내용 입력 필드"
      ) as HTMLTextAreaElement;

      expect(textarea.value).toBe("기존 활동 내용");
    });

    it("텍스트를 지우면 store도 빈 값으로 업데이트되어야 한다", async () => {
      const user = userEvent.setup();
      const store = useSessionStore.getState();
      const sessionId = store.sessions[0].id;

      renderDetailTextarea(sessionId);

      const textarea = screen.getByLabelText(
        "활동 내용 입력 필드"
      ) as HTMLTextAreaElement;

      await user.type(textarea, "임시 활동 내용");

      await waitFor(() => {
        const currentStore = useSessionStore.getState();
        const session = currentStore.sessions.find((s) => s.id === sessionId);
        expect(session?.detailText).toBe("임시 활동 내용");
      });

      await user.clear(textarea);

      await waitFor(() => {
        const currentStore = useSessionStore.getState();
        const session = currentStore.sessions.find((s) => s.id === sessionId);
        expect(session?.detailText).toBe("");
      });
    });

    it("특정 sessionId에 대한 텍스트만 저장되어야 한다", async () => {
      const user = userEvent.setup();
      const store = useSessionStore.getState();

      act(() => {
        store.addSession();
      });

      const sessionId1 = store.sessions[0].id;
      const sessionId2 = store.sessions[1].id;

      const { rerender } = renderDetailTextarea(sessionId1);

      const textarea1 = screen.getByLabelText(
        "활동 내용 입력 필드"
      ) as HTMLTextAreaElement;

      await user.type(textarea1, "첫 번째 세션 내용");

      await waitFor(() => {
        const currentStore = useSessionStore.getState();
        const session1 = currentStore.sessions.find((s) => s.id === sessionId1);
        const session2 = currentStore.sessions.find((s) => s.id === sessionId2);
        expect(session1?.detailText).toBe("첫 번째 세션 내용");
        expect(session2?.detailText).toBe("");
      });

      rerender(<DetailTextarea sessionId={sessionId2} />);

      const textarea2 = screen.getByLabelText(
        "활동 내용 입력 필드"
      ) as HTMLTextAreaElement;

      await user.clear(textarea2);
      await user.type(textarea2, "두 번째 세션 내용");

      await waitFor(() => {
        const currentStore = useSessionStore.getState();
        const session1 = currentStore.sessions.find((s) => s.id === sessionId1);
        const session2 = currentStore.sessions.find((s) => s.id === sessionId2);
        expect(session1?.detailText).toBe("첫 번째 세션 내용");
        expect(session2?.detailText).toBe("두 번째 세션 내용");
      });
    });
  });

  describe("접근성", () => {
    it("textarea에 적절한 aria-label이 설정되어 있어야 한다", () => {
      const store = useSessionStore.getState();
      const sessionId = store.sessions[0].id;

      renderDetailTextarea(sessionId);

      const textarea = screen.getByLabelText("활동 내용 입력 필드");
      expect(textarea).toBeInTheDocument();
    });
  });
});
