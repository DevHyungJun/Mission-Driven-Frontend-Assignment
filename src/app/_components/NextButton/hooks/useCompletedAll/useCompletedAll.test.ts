import { renderHook } from "@testing-library/react";
import useCompletedAll from "./useCompletedAll";
import useImageContext from "@/provider/ImageProvider/hooks/useImageContext";
import {
  useCategoryStore,
  useContentTitleStore,
  useActivityTypeStore,
  useSessionStore,
} from "@/stores";
import { SessionDate } from "@/stores/sessionStore";
import { CategoryId } from "@/app/(route)/category-select/_constant/CATEGORY_LIST";

jest.mock("@/provider/ImageProvider/hooks/useImageContext");
jest.mock("@/stores", () => ({
  useCategoryStore: jest.fn(),
  useContentTitleStore: jest.fn(),
  useActivityTypeStore: jest.fn(),
  useSessionStore: jest.fn(),
}));

const mockUseImageContext = useImageContext as jest.MockedFunction<
  typeof useImageContext
>;
const mockUseCategoryStore = useCategoryStore as jest.MockedFunction<
  typeof useCategoryStore
>;
const mockUseContentTitleStore = useContentTitleStore as jest.MockedFunction<
  typeof useContentTitleStore
>;
const mockUseActivityTypeStore = useActivityTypeStore as jest.MockedFunction<
  typeof useActivityTypeStore
>;
const mockUseSessionStore = useSessionStore as jest.MockedFunction<
  typeof useSessionStore
>;

describe("useCompletedAll", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("모든 조건이 만족되는 경우", () => {
    it("모든 조건이 충족되면 true를 반환해야 한다", () => {
      const validSession: SessionDate = {
        id: "session-1",
        date: new Date("2024-01-01"),
        startTime: new Date("2024-01-01T10:00:00"),
        endTime: new Date("2024-01-01T11:00:00"),
        detailText: "상세 설명이 8자 이상입니다",
      };

      mockUseImageContext.mockReturnValue({
        mainImage: "blob:test-image",
        setMainImage: jest.fn(),
        additionalImages: [],
        setAdditionalImages: jest.fn(),
      });

      mockUseCategoryStore.mockReturnValue({
        selectedCategories: [1] as CategoryId[],
        setSelectedCategories: jest.fn(),
        clearSelectedCategories: jest.fn(),
      });

      mockUseContentTitleStore.mockReturnValue({
        contentTitle: "8자 이상의 제목입니다",
        setContentTitle: jest.fn(),
      });

      mockUseActivityTypeStore.mockReturnValue({
        activityType: "online",
        setActivityType: jest.fn(),
      });

      mockUseSessionStore.mockReturnValue({
        sessions: [validSession],
        setSessionDate: jest.fn(),
        setSessionStartTime: jest.fn(),
        setSessionEndTime: jest.fn(),
        setSessionDetailText: jest.fn(),
        addSession: jest.fn(),
        removeSession: jest.fn(),
      });

      const { result } = renderHook(() => useCompletedAll());

      expect(result.current).toBe(true);
    });

    it("여러 개의 유효한 세션이 있어도 true를 반환해야 한다", () => {
      const validSession1: SessionDate = {
        id: "session-1",
        date: new Date("2024-01-01"),
        startTime: new Date("2024-01-01T10:00:00"),
        endTime: new Date("2024-01-01T11:00:00"),
        detailText: "첫 번째 세션의 상세 설명",
      };

      const validSession2: SessionDate = {
        id: "session-2",
        date: new Date("2024-01-02"),
        startTime: new Date("2024-01-02T14:00:00"),
        endTime: new Date("2024-01-02T15:00:00"),
        detailText: "두 번째 세션의 상세 설명",
      };

      mockUseImageContext.mockReturnValue({
        mainImage: "blob:test-image",
        setMainImage: jest.fn(),
        additionalImages: [],
        setAdditionalImages: jest.fn(),
      });

      mockUseCategoryStore.mockReturnValue({
        selectedCategories: [1, 2] as CategoryId[],
        setSelectedCategories: jest.fn(),
        clearSelectedCategories: jest.fn(),
      });

      mockUseContentTitleStore.mockReturnValue({
        contentTitle: "충분히 긴 제목입니다",
        setContentTitle: jest.fn(),
      });

      mockUseActivityTypeStore.mockReturnValue({
        activityType: "in-person",
        setActivityType: jest.fn(),
      });

      mockUseSessionStore.mockReturnValue({
        sessions: [validSession1, validSession2],
        setSessionDate: jest.fn(),
        setSessionStartTime: jest.fn(),
        setSessionEndTime: jest.fn(),
        setSessionDetailText: jest.fn(),
        addSession: jest.fn(),
        removeSession: jest.fn(),
      });

      const { result } = renderHook(() => useCompletedAll());

      expect(result.current).toBe(true);
    });
  });

  describe("mainImage 조건", () => {
    it("mainImage가 null이면 false를 반환해야 한다", () => {
      mockUseImageContext.mockReturnValue({
        mainImage: null,
        setMainImage: jest.fn(),
        additionalImages: [],
        setAdditionalImages: jest.fn(),
      });

      mockUseCategoryStore.mockReturnValue({
        selectedCategories: [1] as CategoryId[],
        setSelectedCategories: jest.fn(),
        clearSelectedCategories: jest.fn(),
      });

      mockUseContentTitleStore.mockReturnValue({
        contentTitle: "8자 이상의 제목입니다",
        setContentTitle: jest.fn(),
      });

      mockUseActivityTypeStore.mockReturnValue({
        activityType: "online",
        setActivityType: jest.fn(),
      });

      mockUseSessionStore.mockReturnValue({
        sessions: [
          {
            id: "session-1",
            date: new Date(),
            startTime: new Date(),
            endTime: new Date(),
            detailText: "상세 설명입니다",
          },
        ],
        setSessionDate: jest.fn(),
        setSessionStartTime: jest.fn(),
        setSessionEndTime: jest.fn(),
        setSessionDetailText: jest.fn(),
        addSession: jest.fn(),
        removeSession: jest.fn(),
      });

      const { result } = renderHook(() => useCompletedAll());

      expect(result.current).toBeFalsy();
    });
  });

  describe("selectedCategories 조건", () => {
    it("selectedCategories가 비어있으면 false를 반환해야 한다", () => {
      mockUseImageContext.mockReturnValue({
        mainImage: "blob:test-image",
        setMainImage: jest.fn(),
        additionalImages: [],
        setAdditionalImages: jest.fn(),
      });

      mockUseCategoryStore.mockReturnValue({
        selectedCategories: [] as CategoryId[],
        setSelectedCategories: jest.fn(),
        clearSelectedCategories: jest.fn(),
      });

      mockUseContentTitleStore.mockReturnValue({
        contentTitle: "8자 이상의 제목입니다",
        setContentTitle: jest.fn(),
      });

      mockUseActivityTypeStore.mockReturnValue({
        activityType: "online",
        setActivityType: jest.fn(),
      });

      mockUseSessionStore.mockReturnValue({
        sessions: [
          {
            id: "session-1",
            date: new Date(),
            startTime: new Date(),
            endTime: new Date(),
            detailText: "상세 설명입니다",
          },
        ],
        setSessionDate: jest.fn(),
        setSessionStartTime: jest.fn(),
        setSessionEndTime: jest.fn(),
        setSessionDetailText: jest.fn(),
        addSession: jest.fn(),
        removeSession: jest.fn(),
      });

      const { result } = renderHook(() => useCompletedAll());

      expect(result.current).toBe(false);
    });
  });

  describe("contentTitle 조건", () => {
    it("contentTitle이 8자 미만이면 false를 반환해야 한다", () => {
      mockUseImageContext.mockReturnValue({
        mainImage: "blob:test-image",
        setMainImage: jest.fn(),
        additionalImages: [],
        setAdditionalImages: jest.fn(),
      });

      mockUseCategoryStore.mockReturnValue({
        selectedCategories: [1] as CategoryId[],
        setSelectedCategories: jest.fn(),
        clearSelectedCategories: jest.fn(),
      });

      mockUseContentTitleStore.mockReturnValue({
        contentTitle: "짧은",
        setContentTitle: jest.fn(),
      });

      mockUseActivityTypeStore.mockReturnValue({
        activityType: "online",
        setActivityType: jest.fn(),
      });

      mockUseSessionStore.mockReturnValue({
        sessions: [
          {
            id: "session-1",
            date: new Date(),
            startTime: new Date(),
            endTime: new Date(),
            detailText: "상세 설명입니다",
          },
        ],
        setSessionDate: jest.fn(),
        setSessionStartTime: jest.fn(),
        setSessionEndTime: jest.fn(),
        setSessionDetailText: jest.fn(),
        addSession: jest.fn(),
        removeSession: jest.fn(),
      });

      const { result } = renderHook(() => useCompletedAll());

      expect(result.current).toBe(false);
    });

    it("contentTitle이 정확히 8자이면 true를 반환해야 한다", () => {
      mockUseImageContext.mockReturnValue({
        mainImage: "blob:test-image",
        setMainImage: jest.fn(),
        additionalImages: [],
        setAdditionalImages: jest.fn(),
      });

      mockUseCategoryStore.mockReturnValue({
        selectedCategories: [1] as CategoryId[],
        setSelectedCategories: jest.fn(),
        clearSelectedCategories: jest.fn(),
      });

      mockUseContentTitleStore.mockReturnValue({
        contentTitle: "12345678",
        setContentTitle: jest.fn(),
      });

      mockUseActivityTypeStore.mockReturnValue({
        activityType: "online",
        setActivityType: jest.fn(),
      });

      mockUseSessionStore.mockReturnValue({
        sessions: [
          {
            id: "session-1",
            date: new Date(),
            startTime: new Date(),
            endTime: new Date(),
            detailText: "상세 설명입니다",
          },
        ],
        setSessionDate: jest.fn(),
        setSessionStartTime: jest.fn(),
        setSessionEndTime: jest.fn(),
        setSessionDetailText: jest.fn(),
        addSession: jest.fn(),
        removeSession: jest.fn(),
      });

      const { result } = renderHook(() => useCompletedAll());

      expect(result.current).toBe(true);
    });
  });

  describe("activityType 조건", () => {
    it("activityType이 null이면 false를 반환해야 한다", () => {
      mockUseImageContext.mockReturnValue({
        mainImage: "blob:test-image",
        setMainImage: jest.fn(),
        additionalImages: [],
        setAdditionalImages: jest.fn(),
      });

      mockUseCategoryStore.mockReturnValue({
        selectedCategories: [1] as CategoryId[],
        setSelectedCategories: jest.fn(),
        clearSelectedCategories: jest.fn(),
      });

      mockUseContentTitleStore.mockReturnValue({
        contentTitle: "8자 이상의 제목입니다",
        setContentTitle: jest.fn(),
      });

      mockUseActivityTypeStore.mockReturnValue({
        activityType: null,
        setActivityType: jest.fn(),
      });

      mockUseSessionStore.mockReturnValue({
        sessions: [
          {
            id: "session-1",
            date: new Date(),
            startTime: new Date(),
            endTime: new Date(),
            detailText: "상세 설명입니다",
          },
        ],
        setSessionDate: jest.fn(),
        setSessionStartTime: jest.fn(),
        setSessionEndTime: jest.fn(),
        setSessionDetailText: jest.fn(),
        addSession: jest.fn(),
        removeSession: jest.fn(),
      });

      const { result } = renderHook(() => useCompletedAll());

      expect(result.current).toBeFalsy();
    });
  });

  describe("sessions 조건", () => {
    it("sessions가 비어있으면 false를 반환해야 한다", () => {
      mockUseImageContext.mockReturnValue({
        mainImage: "blob:test-image",
        setMainImage: jest.fn(),
        additionalImages: [],
        setAdditionalImages: jest.fn(),
      });

      mockUseCategoryStore.mockReturnValue({
        selectedCategories: [1] as CategoryId[],
        setSelectedCategories: jest.fn(),
        clearSelectedCategories: jest.fn(),
      });

      mockUseContentTitleStore.mockReturnValue({
        contentTitle: "8자 이상의 제목입니다",
        setContentTitle: jest.fn(),
      });

      mockUseActivityTypeStore.mockReturnValue({
        activityType: "online",
        setActivityType: jest.fn(),
      });

      mockUseSessionStore.mockReturnValue({
        sessions: [],
        setSessionDate: jest.fn(),
        setSessionStartTime: jest.fn(),
        setSessionEndTime: jest.fn(),
        setSessionDetailText: jest.fn(),
        addSession: jest.fn(),
        removeSession: jest.fn(),
      });

      const { result } = renderHook(() => useCompletedAll());

      expect(result.current).toBe(false);
    });

    it("session의 date가 null이면 false를 반환해야 한다", () => {
      mockUseImageContext.mockReturnValue({
        mainImage: "blob:test-image",
        setMainImage: jest.fn(),
        additionalImages: [],
        setAdditionalImages: jest.fn(),
      });

      mockUseCategoryStore.mockReturnValue({
        selectedCategories: [1] as CategoryId[],
        setSelectedCategories: jest.fn(),
        clearSelectedCategories: jest.fn(),
      });

      mockUseContentTitleStore.mockReturnValue({
        contentTitle: "8자 이상의 제목입니다",
        setContentTitle: jest.fn(),
      });

      mockUseActivityTypeStore.mockReturnValue({
        activityType: "online",
        setActivityType: jest.fn(),
      });

      mockUseSessionStore.mockReturnValue({
        sessions: [
          {
            id: "session-1",
            date: null,
            startTime: new Date(),
            endTime: new Date(),
            detailText: "상세 설명입니다",
          },
        ],
        setSessionDate: jest.fn(),
        setSessionStartTime: jest.fn(),
        setSessionEndTime: jest.fn(),
        setSessionDetailText: jest.fn(),
        addSession: jest.fn(),
        removeSession: jest.fn(),
      });

      const { result } = renderHook(() => useCompletedAll());

      expect(result.current).toBe(false);
    });

    it("session의 startTime이 null이면 false를 반환해야 한다", () => {
      mockUseImageContext.mockReturnValue({
        mainImage: "blob:test-image",
        setMainImage: jest.fn(),
        additionalImages: [],
        setAdditionalImages: jest.fn(),
      });

      mockUseCategoryStore.mockReturnValue({
        selectedCategories: [1] as CategoryId[],
        setSelectedCategories: jest.fn(),
        clearSelectedCategories: jest.fn(),
      });

      mockUseContentTitleStore.mockReturnValue({
        contentTitle: "8자 이상의 제목입니다",
        setContentTitle: jest.fn(),
      });

      mockUseActivityTypeStore.mockReturnValue({
        activityType: "online",
        setActivityType: jest.fn(),
      });

      mockUseSessionStore.mockReturnValue({
        sessions: [
          {
            id: "session-1",
            date: new Date(),
            startTime: null,
            endTime: new Date(),
            detailText: "상세 설명입니다",
          },
        ],
        setSessionDate: jest.fn(),
        setSessionStartTime: jest.fn(),
        setSessionEndTime: jest.fn(),
        setSessionDetailText: jest.fn(),
        addSession: jest.fn(),
        removeSession: jest.fn(),
      });

      const { result } = renderHook(() => useCompletedAll());

      expect(result.current).toBe(false);
    });

    it("session의 endTime이 null이면 false를 반환해야 한다", () => {
      mockUseImageContext.mockReturnValue({
        mainImage: "blob:test-image",
        setMainImage: jest.fn(),
        additionalImages: [],
        setAdditionalImages: jest.fn(),
      });

      mockUseCategoryStore.mockReturnValue({
        selectedCategories: [1] as CategoryId[],
        setSelectedCategories: jest.fn(),
        clearSelectedCategories: jest.fn(),
      });

      mockUseContentTitleStore.mockReturnValue({
        contentTitle: "8자 이상의 제목입니다",
        setContentTitle: jest.fn(),
      });

      mockUseActivityTypeStore.mockReturnValue({
        activityType: "online",
        setActivityType: jest.fn(),
      });

      mockUseSessionStore.mockReturnValue({
        sessions: [
          {
            id: "session-1",
            date: new Date(),
            startTime: new Date(),
            endTime: null,
            detailText: "상세 설명입니다",
          },
        ],
        setSessionDate: jest.fn(),
        setSessionStartTime: jest.fn(),
        setSessionEndTime: jest.fn(),
        setSessionDetailText: jest.fn(),
        addSession: jest.fn(),
        removeSession: jest.fn(),
      });

      const { result } = renderHook(() => useCompletedAll());

      expect(result.current).toBe(false);
    });

    it("session의 detailText가 8자 미만이면 false를 반환해야 한다", () => {
      mockUseImageContext.mockReturnValue({
        mainImage: "blob:test-image",
        setMainImage: jest.fn(),
        additionalImages: [],
        setAdditionalImages: jest.fn(),
      });

      mockUseCategoryStore.mockReturnValue({
        selectedCategories: [1] as CategoryId[],
        setSelectedCategories: jest.fn(),
        clearSelectedCategories: jest.fn(),
      });

      mockUseContentTitleStore.mockReturnValue({
        contentTitle: "8자 이상의 제목입니다",
        setContentTitle: jest.fn(),
      });

      mockUseActivityTypeStore.mockReturnValue({
        activityType: "online",
        setActivityType: jest.fn(),
      });

      mockUseSessionStore.mockReturnValue({
        sessions: [
          {
            id: "session-1",
            date: new Date(),
            startTime: new Date(),
            endTime: new Date(),
            detailText: "짧음",
          },
        ],
        setSessionDate: jest.fn(),
        setSessionStartTime: jest.fn(),
        setSessionEndTime: jest.fn(),
        setSessionDetailText: jest.fn(),
        addSession: jest.fn(),
        removeSession: jest.fn(),
      });

      const { result } = renderHook(() => useCompletedAll());

      expect(result.current).toBe(false);
    });

    it("여러 session 중 하나라도 조건을 만족하지 않으면 false를 반환해야 한다", () => {
      const validSession: SessionDate = {
        id: "session-1",
        date: new Date("2024-01-01"),
        startTime: new Date("2024-01-01T10:00:00"),
        endTime: new Date("2024-01-01T11:00:00"),
        detailText: "유효한 상세 설명입니다",
      };

      const invalidSession: SessionDate = {
        id: "session-2",
        date: new Date("2024-01-02"),
        startTime: new Date("2024-01-02T14:00:00"),
        endTime: new Date("2024-01-02T15:00:00"),
        detailText: "짧음", // 8자 미만
      };

      mockUseImageContext.mockReturnValue({
        mainImage: "blob:test-image",
        setMainImage: jest.fn(),
        additionalImages: [],
        setAdditionalImages: jest.fn(),
      });

      mockUseCategoryStore.mockReturnValue({
        selectedCategories: [1] as CategoryId[],
        setSelectedCategories: jest.fn(),
        clearSelectedCategories: jest.fn(),
      });

      mockUseContentTitleStore.mockReturnValue({
        contentTitle: "8자 이상의 제목입니다",
        setContentTitle: jest.fn(),
      });

      mockUseActivityTypeStore.mockReturnValue({
        activityType: "online",
        setActivityType: jest.fn(),
      });

      mockUseSessionStore.mockReturnValue({
        sessions: [validSession, invalidSession],
        setSessionDate: jest.fn(),
        setSessionStartTime: jest.fn(),
        setSessionEndTime: jest.fn(),
        setSessionDetailText: jest.fn(),
        addSession: jest.fn(),
        removeSession: jest.fn(),
      });

      const { result } = renderHook(() => useCompletedAll());

      expect(result.current).toBe(false);
    });

    it("session의 detailText가 정확히 8자이면 true를 반환해야 한다", () => {
      mockUseImageContext.mockReturnValue({
        mainImage: "blob:test-image",
        setMainImage: jest.fn(),
        additionalImages: [],
        setAdditionalImages: jest.fn(),
      });

      mockUseCategoryStore.mockReturnValue({
        selectedCategories: [1] as CategoryId[],
        setSelectedCategories: jest.fn(),
        clearSelectedCategories: jest.fn(),
      });

      mockUseContentTitleStore.mockReturnValue({
        contentTitle: "8자 이상의 제목입니다",
        setContentTitle: jest.fn(),
      });

      mockUseActivityTypeStore.mockReturnValue({
        activityType: "online",
        setActivityType: jest.fn(),
      });

      mockUseSessionStore.mockReturnValue({
        sessions: [
          {
            id: "session-1",
            date: new Date(),
            startTime: new Date(),
            endTime: new Date(),
            detailText: "12345678",
          },
        ],
        setSessionDate: jest.fn(),
        setSessionStartTime: jest.fn(),
        setSessionEndTime: jest.fn(),
        setSessionDetailText: jest.fn(),
        addSession: jest.fn(),
        removeSession: jest.fn(),
      });

      const { result } = renderHook(() => useCompletedAll());

      expect(result.current).toBe(true);
    });
  });

  describe("복합 시나리오", () => {
    it("여러 조건이 동시에 만족되지 않으면 false를 반환해야 한다", () => {
      mockUseImageContext.mockReturnValue({
        mainImage: null,
        setMainImage: jest.fn(),
        additionalImages: [],
        setAdditionalImages: jest.fn(),
      });

      mockUseCategoryStore.mockReturnValue({
        selectedCategories: [],
        setSelectedCategories: jest.fn(),
        clearSelectedCategories: jest.fn(),
      });

      mockUseContentTitleStore.mockReturnValue({
        contentTitle: "짧음",
        setContentTitle: jest.fn(),
      });

      mockUseActivityTypeStore.mockReturnValue({
        activityType: null,
        setActivityType: jest.fn(),
      });

      mockUseSessionStore.mockReturnValue({
        sessions: [],
        setSessionDate: jest.fn(),
        setSessionStartTime: jest.fn(),
        setSessionEndTime: jest.fn(),
        setSessionDetailText: jest.fn(),
        addSession: jest.fn(),
        removeSession: jest.fn(),
      });

      const { result } = renderHook(() => useCompletedAll());

      expect(result.current).toBeFalsy();
    });
  });
});
