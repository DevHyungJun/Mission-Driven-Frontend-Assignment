import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import NextButton from "./NextButton";
import {
  useCategoryStore,
  useContentTitleStore,
  useActivityTypeStore,
  useSessionStore,
} from "@/stores";
import ImageProvider, {
  ImageContext,
} from "@/provider/ImageProvider/ImageProvider";

const mockPush = jest.fn();
const mockPathname = jest.fn(() => "/");
const mockRevokeObjectURL = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
  usePathname: () => mockPathname(),
}));

beforeAll(() => {
  if (typeof URL !== "undefined") {
    URL.revokeObjectURL = mockRevokeObjectURL as typeof URL.revokeObjectURL;
  } else {
    (global as any).URL = {
      ...((global as any).URL || {}),
      revokeObjectURL: mockRevokeObjectURL,
    };
  }
});

afterAll(() => {
  if (
    typeof URL !== "undefined" &&
    (URL as any).revokeObjectURL === mockRevokeObjectURL
  ) {
    delete (URL as any).revokeObjectURL;
  }
});

const renderWithProviders = (
  ui: React.ReactElement,
  mainImage: string | null = null
) => {
  if (mainImage !== null) {
    const contextValue = {
      mainImage,
      setMainImage: jest.fn(),
      additionalImages: [],
      setAdditionalImages: jest.fn(),
    };

    return render(
      <ImageContext.Provider value={contextValue}>{ui}</ImageContext.Provider>
    );
  }
  return render(<ImageProvider>{ui}</ImageProvider>);
};

describe("NextButton 통합 테스트", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockPathname.mockReturnValue("/");
    mockPush.mockClear();
    mockRevokeObjectURL.mockClear();

    act(() => {
      useCategoryStore.getState().clearSelectedCategories();
      useContentTitleStore.getState().setContentTitle("");
      const activityTypeStore = useActivityTypeStore.getState();
      if (activityTypeStore.activityType !== null) {
        useActivityTypeStore.setState({ activityType: null });
      }
      const store = useSessionStore.getState();
      store.sessions.forEach((session) => {
        store.removeSession(session.id);
      });
      store.addSession();
    });
  });

  describe("버튼 활성화/비활성화", () => {
    describe("category-select 페이지", () => {
      beforeEach(() => {
        mockPathname.mockReturnValue("/category-select");
      });

      it("selectedCategories가 없을 때 버튼이 비활성화되어야 한다", () => {
        renderWithProviders(<NextButton />);

        const button = screen.getByLabelText(
          "다음으로 버튼"
        ) as HTMLButtonElement;
        expect(button.disabled).toBe(true);
      });

      it("selectedCategories가 있을 때 버튼이 활성화되어야 한다", () => {
        act(() => {
          useCategoryStore.getState().setSelectedCategories([1]);
        });

        renderWithProviders(<NextButton />);

        const button = screen.getByLabelText(
          "다음으로 버튼"
        ) as HTMLButtonElement;
        expect(button.disabled).toBe(false);
      });

      it("selectedCategories가 변경되면 버튼 상태가 업데이트되어야 한다", async () => {
        const { rerender } = renderWithProviders(<NextButton />);

        const button = screen.getByLabelText(
          "다음으로 버튼"
        ) as HTMLButtonElement;
        expect(button.disabled).toBe(true);

        act(() => {
          useCategoryStore.getState().setSelectedCategories([1]);
        });

        rerender(
          <ImageProvider>
            <NextButton />
          </ImageProvider>
        );

        await waitFor(() => {
          expect(button.disabled).toBe(false);
        });
      });
    });

    describe("다른 페이지", () => {
      beforeEach(() => {
        mockPathname.mockReturnValue("/");
      });

      it("isCompletedAll이 false일 때 버튼이 비활성화되어야 한다", () => {
        renderWithProviders(<NextButton />);

        const button = screen.getByLabelText(
          "다음으로 버튼"
        ) as HTMLButtonElement;
        expect(button.disabled).toBe(true);
      });
    });
  });

  describe("store 연동", () => {
    beforeEach(() => {
      mockPathname.mockReturnValue("/");
    });

    it("useCategoryStore와 연동되어야 한다", async () => {
      renderWithProviders(<NextButton />);

      const button = screen.getByLabelText(
        "다음으로 버튼"
      ) as HTMLButtonElement;
      expect(button.disabled).toBe(true);

      act(() => {
        useCategoryStore.getState().setSelectedCategories([1]);
      });

      await waitFor(() => {
        expect(button.disabled).toBe(true);
      });
    });
  });

  describe("클릭 동작", () => {
    it("category-select 페이지에서 클릭 시 '/'로 이동해야 한다", () => {
      mockPathname.mockReturnValue("/category-select");

      act(() => {
        useCategoryStore.getState().setSelectedCategories([1]);
      });

      renderWithProviders(<NextButton />);

      const button = screen.getByLabelText("다음으로 버튼");
      fireEvent.click(button);

      expect(mockPush).toHaveBeenCalledWith("/");
    });

    it("다른 페이지에서 클릭해도 아무 동작도 하지 않아야 한다", () => {
      mockPathname.mockReturnValue("/");

      const store = useSessionStore.getState();
      const sessionId = store.sessions[0].id;

      act(() => {
        useCategoryStore.getState().setSelectedCategories([1]);
        useContentTitleStore
          .getState()
          .setContentTitle("8자 이상의 제목입니다");
        useActivityTypeStore.getState().setActivityType("online");
        store.setSessionDate(sessionId, new Date("2024-01-01"));
        store.setSessionStartTime(sessionId, new Date("2024-01-01T10:00:00"));
        store.setSessionEndTime(sessionId, new Date("2024-01-01T11:00:00"));
        store.setSessionDetailText(sessionId, "8자 이상의 상세 설명입니다");
      });

      renderWithProviders(<NextButton />, "blob:test-image");

      const button = screen.getByLabelText("다음으로 버튼");
      fireEvent.click(button);

      expect(mockPush).not.toHaveBeenCalled();
    });
  });

  describe("접근성", () => {
    it("버튼에 적절한 aria-label이 설정되어 있어야 한다", () => {
      renderWithProviders(<NextButton />);

      const button = screen.getByLabelText("다음으로 버튼");
      expect(button).toBeInTheDocument();
    });
  });
});
