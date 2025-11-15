import getCategoryDisplayText from "./getCategoryDisplayText";
import { CategoryId } from "../../_constant/CATEGORY_LIST";

describe("getCategoryDisplayText", () => {
  describe("빈 배열 처리", () => {
    it("선택된 카테고리가 없으면 기본 텍스트를 반환해야 한다", () => {
      const selectedCategories: CategoryId[] = [];
      const result = getCategoryDisplayText(selectedCategories);

      expect(result).toBe("주제를 선택하세요");
    });

    it("선택된 카테고리가 없으면 커스텀 기본 텍스트를 반환해야 한다", () => {
      const selectedCategories: CategoryId[] = [];
      const customDefaultText = "카테고리를 선택해주세요";
      const result = getCategoryDisplayText(selectedCategories, customDefaultText);

      expect(result).toBe(customDefaultText);
    });
  });

  describe("단일 카테고리 선택", () => {
    it("1개의 카테고리를 선택하면 해당 카테고리 이름을 반환해야 한다", () => {
      const selectedCategories: CategoryId[] = [1];
      const result = getCategoryDisplayText(selectedCategories);

      expect(result).toBe("용돈벌기");
    });

    it("다른 카테고리를 선택하면 해당 이름을 반환해야 한다", () => {
      const selectedCategories: CategoryId[] = [2];
      const result = getCategoryDisplayText(selectedCategories);

      expect(result).toBe("디지털");
    });

    it("또 다른 카테고리를 선택하면 해당 이름을 반환해야 한다", () => {
      const selectedCategories: CategoryId[] = [3];
      const result = getCategoryDisplayText(selectedCategories);

      expect(result).toBe("그림");
    });
  });

  describe("다중 카테고리 선택", () => {
    it("2개의 카테고리를 선택하면 콤마로 구분된 이름들을 반환해야 한다", () => {
      const selectedCategories: CategoryId[] = [1, 2];
      const result = getCategoryDisplayText(selectedCategories);

      expect(result).toBe("용돈벌기, 디지털");
    });

    it("다른 2개의 카테고리를 선택하면 콤마로 구분된 이름들을 반환해야 한다", () => {
      const selectedCategories: CategoryId[] = [3, 4];
      const result = getCategoryDisplayText(selectedCategories);

      expect(result).toBe("그림, 글쓰기/독서");
    });

    it("3개의 카테고리를 선택하면 모두 콤마로 구분되어 반환되어야 한다", () => {
      const selectedCategories: CategoryId[] = [1, 2, 3];
      const result = getCategoryDisplayText(selectedCategories);

      expect(result).toBe("용돈벌기, 디지털, 그림");
    });

    it("모든 카테고리 이름이 정확한 순서로 반환되어야 한다", () => {
      const selectedCategories: CategoryId[] = [5, 6, 7, 8];
      const result = getCategoryDisplayText(selectedCategories);

      expect(result).toBe("건강/운동, 동기부여, 취미힐링, 외국어");
    });
  });

  describe("카테고리 순서", () => {
    it("선택한 순서대로 카테고리 이름이 반환되어야 한다", () => {
      const selectedCategories: CategoryId[] = [3, 1, 5];
      const result = getCategoryDisplayText(selectedCategories);

      expect(result).toBe("그림, 용돈벌기, 건강/운동");
    });

    it("다른 순서로 선택해도 선택한 순서대로 반환되어야 한다", () => {
      const selectedCategories: CategoryId[] = [8, 4, 2, 1];
      const result = getCategoryDisplayText(selectedCategories);

      expect(result).toBe("외국어, 글쓰기/독서, 디지털, 용돈벌기");
    });
  });

  describe("특수 문자 포함 카테고리", () => {
    it("슬래시가 포함된 카테고리 이름을 정확히 반환해야 한다", () => {
      const selectedCategories: CategoryId[] = [4];
      const result = getCategoryDisplayText(selectedCategories);

      expect(result).toBe("글쓰기/독서");
    });

    it("슬래시가 포함된 여러 카테고리를 정확히 반환해야 한다", () => {
      const selectedCategories: CategoryId[] = [4, 5];
      const result = getCategoryDisplayText(selectedCategories);

      expect(result).toBe("글쓰기/독서, 건강/운동");
    });
  });

  describe("잘못된 ID 필터링", () => {
    it("존재하지 않는 ID가 포함되어도 유효한 카테고리만 반환해야 한다", () => {
      // TypeScript에서는 타입 체크가 있지만, 런타임에서도 안전하게 처리
      const selectedCategories: CategoryId[] = [1, 999 as CategoryId, 2];
      const result = getCategoryDisplayText(selectedCategories);

      // undefined가 필터링되어 유효한 카테고리만 반환
      expect(result).toBe("용돈벌기, 디지털");
    });
  });

  describe("복합 시나리오", () => {
    it("빈 배열에서 시작하여 여러 카테고리를 추가할 때 정확히 표시되어야 한다", () => {
      // 빈 배열
      let selectedCategories: CategoryId[] = [];
      expect(getCategoryDisplayText(selectedCategories)).toBe("주제를 선택하세요");

      // 1개 추가
      selectedCategories = [1];
      expect(getCategoryDisplayText(selectedCategories)).toBe("용돈벌기");

      // 2개 추가
      selectedCategories = [1, 2];
      expect(getCategoryDisplayText(selectedCategories)).toBe("용돈벌기, 디지털");

      // 1개 제거
      selectedCategories = [2];
      expect(getCategoryDisplayText(selectedCategories)).toBe("디지털");

      // 다시 빈 배열
      selectedCategories = [];
      expect(getCategoryDisplayText(selectedCategories)).toBe("주제를 선택하세요");
    });
  });
});

