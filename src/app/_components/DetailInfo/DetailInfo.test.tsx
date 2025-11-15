import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
  cleanup,
} from "@testing-library/react";
import DetailInfo from "./DetailInfo";
import { useSessionStore } from "@/stores";

const renderDetailInfo = () => {
  return render(<DetailInfo />);
};

describe("DetailInfo 통합 테스트", () => {
  beforeEach(() => {
    act(() => {
      const store = useSessionStore.getState();
      useSessionStore.setState({
        sessions: [],
      });
      store.addSession();
    });
  });

  afterEach(() => {
    cleanup();
  });

  describe("세션 추가", () => {
    it("회차 추가하기 버튼 클릭 시 세션이 추가되어야 한다", () => {
      renderDetailInfo();

      const initialSessionsCount = useSessionStore.getState().sessions.length;

      const addButton = screen.getByLabelText("회차 추가하기 버튼");
      fireEvent.click(addButton);

      const newSessionsCount = useSessionStore.getState().sessions.length;
      expect(newSessionsCount).toBe(initialSessionsCount + 1);
    });

    it("세션이 추가되면 화면에 새로운 회차 정보가 표시되어야 한다", () => {
      renderDetailInfo();

      const initialCount = useSessionStore.getState().sessions.length;

      const addButton = screen.getByLabelText("회차 추가하기 버튼");
      fireEvent.click(addButton);

      const sessionTitles = screen.getAllByText(/\d+회차 정보/);
      expect(sessionTitles.length).toBe(initialCount + 1);
    });

    it("여러 번 세션을 추가할 수 있어야 한다", () => {
      renderDetailInfo();

      const initialCount = useSessionStore.getState().sessions.length;

      const addButton = screen.getByLabelText("회차 추가하기 버튼");

      fireEvent.click(addButton);
      fireEvent.click(addButton);
      fireEvent.click(addButton);

      const sessionsCount = useSessionStore.getState().sessions.length;
      expect(sessionsCount).toBe(initialCount + 3);

      const sessionTitles = screen.getAllByText(/\d+회차 정보/);
      expect(sessionTitles.length).toBe(initialCount + 3);
    });
  });

  describe("세션 삭제", () => {
    it("세션이 1개일 때 삭제 버튼이 표시되지 않아야 한다", () => {
      renderDetailInfo();

      const deleteButtons = screen.queryAllByLabelText(/회차 삭제/);
      expect(deleteButtons.length).toBe(0);
    });

    it("세션이 2개 이상일 때 각 세션에 삭제 버튼이 표시되어야 한다", () => {
      renderDetailInfo();

      const addButton = screen.getByLabelText("회차 추가하기 버튼");
      fireEvent.click(addButton);

      const deleteButtons = screen.getAllByLabelText(/회차 삭제/);
      expect(deleteButtons.length).toBe(2);
    });

    it("삭제 버튼 클릭 시 모달이 열려야 한다", async () => {
      renderDetailInfo();

      const addButton = screen.getByLabelText("회차 추가하기 버튼");
      fireEvent.click(addButton);

      const deleteButtons = screen.getAllByLabelText(/회차 삭제/);
      fireEvent.click(deleteButtons[0]);

      await waitFor(() => {
        expect(screen.getByRole("dialog")).toBeInTheDocument();
        expect(screen.getByText(/작성된 내용을/)).toBeInTheDocument();
        expect(screen.getByText(/삭제하시겠어요?/)).toBeInTheDocument();
      });
    });

    it("모달에서 취소 버튼 클릭 시 모달이 닫히고 세션이 삭제되지 않아야 한다", async () => {
      renderDetailInfo();

      const addButton = screen.getByLabelText("회차 추가하기 버튼");
      fireEvent.click(addButton);

      const initialSessionsCount = useSessionStore.getState().sessions.length;

      const deleteButtons = screen.getAllByLabelText(/회차 삭제/);
      fireEvent.click(deleteButtons[0]);

      await waitFor(() => {
        expect(screen.getByRole("dialog")).toBeInTheDocument();
      });

      const cancelButton = screen.getByLabelText("취소");
      fireEvent.click(cancelButton);

      await waitFor(() => {
        expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
      });

      const finalSessionsCount = useSessionStore.getState().sessions.length;
      expect(finalSessionsCount).toBe(initialSessionsCount);
    });

    it("모달에서 삭제하기 버튼 클릭 시 세션이 삭제되어야 한다", async () => {
      renderDetailInfo();

      const addButton = screen.getByLabelText("회차 추가하기 버튼");
      fireEvent.click(addButton);

      const initialSessionsCount = useSessionStore.getState().sessions.length;

      const deleteButtons = screen.getAllByLabelText(/회차 삭제/);
      fireEvent.click(deleteButtons[0]);

      await waitFor(() => {
        expect(screen.getByRole("dialog")).toBeInTheDocument();
      });

      const confirmButton = screen.getByLabelText("삭제하기");
      fireEvent.click(confirmButton);

      await waitFor(() => {
        expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
      });

      const finalSessionsCount = useSessionStore.getState().sessions.length;
      expect(finalSessionsCount).toBe(initialSessionsCount - 1);
    });

    it("모달에서 삭제하기 버튼 클릭 시 올바른 세션이 삭제되어야 한다", async () => {
      renderDetailInfo();

      const addButton = screen.getByLabelText("회차 추가하기 버튼");
      fireEvent.click(addButton);
      fireEvent.click(addButton);

      const store = useSessionStore.getState();
      const secondSessionId = store.sessions[1].id;

      const deleteButtons = screen.getAllByLabelText(/회차 삭제/);
      fireEvent.click(deleteButtons[1]);

      await waitFor(() => {
        expect(screen.getByRole("dialog")).toBeInTheDocument();
      });

      const confirmButton = screen.getByLabelText("삭제하기");
      fireEvent.click(confirmButton);

      await waitFor(() => {
        const remainingSessions = useSessionStore.getState().sessions;
        const deletedSession = remainingSessions.find(
          (session) => session.id === secondSessionId
        );
        expect(deletedSession).toBeUndefined();
      });
    });

    it("모달 닫기 버튼 클릭 시 모달이 닫혀야 한다", async () => {
      renderDetailInfo();

      const addButton = screen.getByLabelText("회차 추가하기 버튼");
      fireEvent.click(addButton);

      const deleteButtons = screen.getAllByLabelText(/회차 삭제/);
      fireEvent.click(deleteButtons[0]);

      await waitFor(() => {
        expect(screen.getByRole("dialog")).toBeInTheDocument();
      });

      const closeButton = screen.getByLabelText("닫기");
      fireEvent.click(closeButton);

      await waitFor(() => {
        expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
      });
    });
  });

  describe("모달 동작", () => {
    it("모달이 열릴 때 모달 내용이 표시되어야 한다", async () => {
      renderDetailInfo();

      const addButton = screen.getByLabelText("회차 추가하기 버튼");
      fireEvent.click(addButton);

      const deleteButtons = screen.getAllByLabelText(/회차 삭제/);
      fireEvent.click(deleteButtons[0]);

      await waitFor(() => {
        expect(screen.getByRole("dialog")).toBeInTheDocument();
        expect(screen.getByText(/작성된 내용을/)).toBeInTheDocument();
        expect(screen.getByText(/삭제하시겠어요?/)).toBeInTheDocument();
        expect(
          screen.getByText("삭제한 내용은 복구할 수 없습니다.")
        ).toBeInTheDocument();
        expect(screen.getByLabelText("취소")).toBeInTheDocument();
        expect(screen.getByLabelText("삭제하기")).toBeInTheDocument();
      });
    });

    it("모달이 닫히면 모달 내용이 화면에서 사라져야 한다", async () => {
      renderDetailInfo();

      const addButton = screen.getByLabelText("회차 추가하기 버튼");
      fireEvent.click(addButton);

      const deleteButtons = screen.getAllByLabelText(/회차 삭제/);
      fireEvent.click(deleteButtons[0]);

      await waitFor(() => {
        expect(screen.getByRole("dialog")).toBeInTheDocument();
      });

      const cancelButton = screen.getByLabelText("취소");
      fireEvent.click(cancelButton);

      await waitFor(() => {
        expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
      });
    });

    it("여러 세션 중 하나를 삭제해도 나머지 세션들은 유지되어야 한다", async () => {
      renderDetailInfo();

      const addButton = screen.getByLabelText("회차 추가하기 버튼");
      fireEvent.click(addButton);
      fireEvent.click(addButton);

      const initialSessionsCount = useSessionStore.getState().sessions.length;

      const deleteButtons = screen.getAllByLabelText(/회차 삭제/);
      fireEvent.click(deleteButtons[0]);

      await waitFor(() => {
        expect(screen.getByRole("dialog")).toBeInTheDocument();
      });

      const confirmButton = screen.getByLabelText("삭제하기");
      fireEvent.click(confirmButton);

      await waitFor(() => {
        const remainingSessionsCount =
          useSessionStore.getState().sessions.length;
        expect(remainingSessionsCount).toBe(initialSessionsCount - 1);
      });

      const sessionTitles = screen.getAllByText(/\d+회차 정보/);
      expect(sessionTitles.length).toBe(initialSessionsCount - 1);
    });
  });

  describe("회차 정보 표시", () => {
    it("세션별로 회차 정보가 올바르게 표시되어야 한다", () => {
      renderDetailInfo();

      const addButton = screen.getByLabelText("회차 추가하기 버튼");
      fireEvent.click(addButton);
      fireEvent.click(addButton);

      expect(screen.getByText("1회차 정보")).toBeInTheDocument();
      expect(screen.getByText("2회차 정보")).toBeInTheDocument();
      expect(screen.getByText("3회차 정보")).toBeInTheDocument();
    });

    it("세션 삭제 후 회차 번호가 재정렬되어야 한다", async () => {
      renderDetailInfo();

      const initialCount = useSessionStore.getState().sessions.length;

      const addButton = screen.getByLabelText("회차 추가하기 버튼");
      fireEvent.click(addButton);
      fireEvent.click(addButton);

      const expectedCount = initialCount + 2;
      expect(useSessionStore.getState().sessions.length).toBe(expectedCount);

      const deleteButtons = screen.getAllByLabelText(/회차 삭제/);
      fireEvent.click(deleteButtons[1]);

      await waitFor(() => {
        expect(screen.getByRole("dialog")).toBeInTheDocument();
      });

      const confirmButton = screen.getByLabelText("삭제하기");
      fireEvent.click(confirmButton);

      await waitFor(() => {
        const remainingSessionsCount =
          useSessionStore.getState().sessions.length;
        expect(remainingSessionsCount).toBe(expectedCount - 1);
      });

      expect(screen.getByText("1회차 정보")).toBeInTheDocument();
      expect(screen.getByText("2회차 정보")).toBeInTheDocument();
      expect(screen.queryByText("3회차 정보")).not.toBeInTheDocument();
    });
  });
});
