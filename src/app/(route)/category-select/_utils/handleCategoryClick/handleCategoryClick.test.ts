jest.mock("@/provider/ToastProvider/ToastProvider", () => ({
  toast: {
    show: jest.fn(),
  },
}));

import handleCategoryClick from "./handleCategoryClick";
import { toast } from "@/provider/ToastProvider/ToastProvider";
import { CategoryId } from "../../_constant/CATEGORY_LIST";

describe("handleCategoryClick", () => {
  let mockSetSelectedCategories: jest.Mock;
  const mockToastShow = toast.show as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    mockSetSelectedCategories = jest.fn();
  });

  describe("카테고리 선택", () => {
    it("선택되지 않은 카테고리를 클릭하면 추가되어야 한다", () => {
      const categoryId: CategoryId = 1;
      const selectedCategories: CategoryId[] = [];
      const expectedCategories: CategoryId[] = [1];

      handleCategoryClick(
        categoryId,
        selectedCategories,
        mockSetSelectedCategories
      );

      expect(mockSetSelectedCategories).toHaveBeenCalledWith(
        expectedCategories
      );
      expect(mockToastShow).not.toHaveBeenCalled();
    });

    it("이미 1개가 선택된 상태에서 새 카테고리를 추가하면 2개가 되어야 한다", () => {
      const categoryId: CategoryId = 2;
      const selectedCategories: CategoryId[] = [1];
      const expectedCategories: CategoryId[] = [1, 2];

      handleCategoryClick(
        categoryId,
        selectedCategories,
        mockSetSelectedCategories
      );

      expect(mockSetSelectedCategories).toHaveBeenCalledWith(
        expectedCategories
      );
      expect(mockToastShow).not.toHaveBeenCalled();
    });
  });

  describe("카테고리 취소", () => {
    it("이미 선택된 카테고리를 클릭하면 제거되어야 한다", () => {
      const categoryId: CategoryId = 1;
      const selectedCategories: CategoryId[] = [1];
      const expectedCategories: CategoryId[] = [];

      handleCategoryClick(
        categoryId,
        selectedCategories,
        mockSetSelectedCategories
      );

      expect(mockSetSelectedCategories).toHaveBeenCalledWith(
        expectedCategories
      );
      expect(mockToastShow).not.toHaveBeenCalled();
    });

    it("2개가 선택된 상태에서 선택된 카테고리 중 하나를 클릭하면 제거되어야 한다", () => {
      const categoryId: CategoryId = 1;
      const selectedCategories: CategoryId[] = [1, 2];
      const expectedCategories: CategoryId[] = [2];

      handleCategoryClick(
        categoryId,
        selectedCategories,
        mockSetSelectedCategories
      );

      expect(mockSetSelectedCategories).toHaveBeenCalledWith(
        expectedCategories
      );
      expect(mockToastShow).not.toHaveBeenCalled();
    });

    it("2개가 선택된 상태에서 다른 선택된 카테고리를 클릭하면 제거되어야 한다", () => {
      const categoryId: CategoryId = 2;
      const selectedCategories: CategoryId[] = [1, 2];
      const expectedCategories: CategoryId[] = [1];

      handleCategoryClick(
        categoryId,
        selectedCategories,
        mockSetSelectedCategories
      );

      expect(mockSetSelectedCategories).toHaveBeenCalledWith(
        expectedCategories
      );
      expect(mockToastShow).not.toHaveBeenCalled();
    });
  });

  describe("최대 2개 제한", () => {
    it("이미 2개가 선택된 상태에서 새 카테고리를 추가하려고 하면 토스트를 표시해야 한다", () => {
      const categoryId: CategoryId = 3;
      const selectedCategories: CategoryId[] = [1, 2];

      handleCategoryClick(
        categoryId,
        selectedCategories,
        mockSetSelectedCategories
      );

      expect(mockToastShow).toHaveBeenCalledWith(
        "최대 2개까지 선택 가능합니다."
      );
      expect(mockSetSelectedCategories).not.toHaveBeenCalled();
    });

    it("2개가 선택된 상태에서 선택되지 않은 다른 카테고리를 클릭해도 토스트를 표시해야 한다", () => {
      const categoryId: CategoryId = 5;
      const selectedCategories: CategoryId[] = [1, 2];

      handleCategoryClick(
        categoryId,
        selectedCategories,
        mockSetSelectedCategories
      );

      expect(mockToastShow).toHaveBeenCalledWith(
        "최대 2개까지 선택 가능합니다."
      );
      expect(mockSetSelectedCategories).not.toHaveBeenCalled();
    });

    it("2개가 선택된 상태에서 선택된 카테고리를 제거한 후에는 새 카테고리를 추가할 수 있어야 한다", () => {
      const firstCategoryId: CategoryId = 1;
      const selectedCategoriesBefore: CategoryId[] = [1, 2];

      let currentCategories = [...selectedCategoriesBefore];
      const setSelectedCategories1 = jest.fn((categories) => {
        currentCategories = categories;
      });

      handleCategoryClick(
        firstCategoryId,
        selectedCategoriesBefore,
        setSelectedCategories1
      );

      expect(currentCategories).toEqual([2]);
      expect(mockToastShow).not.toHaveBeenCalled();

      const newCategoryId: CategoryId = 3;
      const setSelectedCategories2 = jest.fn((categories) => {
        currentCategories = categories;
      });

      handleCategoryClick(
        newCategoryId,
        currentCategories,
        setSelectedCategories2
      );

      expect(currentCategories).toEqual([2, 3]);
      expect(mockToastShow).not.toHaveBeenCalled();
    });
  });

  describe("복합 시나리오", () => {
    it("빈 배열에서 시작하여 순차적으로 카테고리를 추가하고 제거할 수 있어야 한다", () => {
      let currentCategories: CategoryId[] = [];

      const setSelectedCategories = jest.fn((categories) => {
        currentCategories = categories;
      });

      handleCategoryClick(1, currentCategories, setSelectedCategories);
      expect(currentCategories).toEqual([1]);

      handleCategoryClick(2, currentCategories, setSelectedCategories);
      expect(currentCategories).toEqual([1, 2]);

      handleCategoryClick(3, currentCategories, setSelectedCategories);
      expect(currentCategories).toEqual([1, 2]);
      expect(mockToastShow).toHaveBeenCalledWith(
        "최대 2개까지 선택 가능합니다."
      );

      jest.clearAllMocks();

      handleCategoryClick(1, currentCategories, setSelectedCategories);
      expect(currentCategories).toEqual([2]);

      handleCategoryClick(3, currentCategories, setSelectedCategories);
      expect(currentCategories).toEqual([2, 3]);
      expect(mockToastShow).not.toHaveBeenCalled();
    });
  });
});
