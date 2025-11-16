import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CategorySelectPage from "./page";
import { useCategoryStore } from "@/stores";
import CategorySelector from "@/app/_components/CategorySelector/CategorySelector";
import { toast } from "@/provider/ToastProvider/ToastProvider";

jest.mock("@/provider/ToastProvider/ToastProvider", () => {
  const React = require("react");
  const MockToastProvider = ({ children }: { children: React.ReactNode }) => {
    return React.createElement(React.Fragment, null, children);
  };
  MockToastProvider.displayName = "MockToastProvider";
  return {
    toast: {
      show: jest.fn(),
    },
    __esModule: true,
    default: MockToastProvider,
  };
});

jest.mock("@/app/_components/CategorySelector/CategorySelector", () => {
  const React = require("react");
  const ActualCategorySelector = jest.requireActual(
    "@/app/_components/CategorySelector/CategorySelector"
  ).default;

  return {
    __esModule: true,
    default: ActualCategorySelector,
  };
});

jest.mock("next/link", () => {
  return ({ children, href, ...props }: any) => {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  };
});

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ src, alt, ...props }: any) => {
    return <img src={src} alt={alt} {...props} />;
  },
}));

jest.mock("@/components/Icon/Icon", () => {
  const React = require("react");
  const MockIcon = ({ name, ...props }: any) => {
    return React.createElement("span", {
      "data-testid": `icon-${name}`,
      ...props,
    });
  };
  MockIcon.displayName = "MockIcon";
  return {
    __esModule: true,
    default: MockIcon,
  };
});

const mockToastShow = toast.show as jest.Mock;

const renderWithPage = () => {
  return render(<CategorySelectPage />);
};

const renderWithCategorySelector = () => {
  return render(
    <>
      <CategorySelectPage />
      <CategorySelector />
    </>
  );
};

describe("CategorySelectPage 통합 테스트", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockToastShow.mockClear();
    useCategoryStore.getState().clearSelectedCategories();
    useCategoryStore.getState().setTempSelectedCategories([]);
  });

  describe("카테고리 선택 UI", () => {
    it("제목과 설명이 표시되어야 한다", () => {
      renderWithPage();

      expect(
        screen.getByText("어떤 카테고리의", { exact: false })
      ).toBeInTheDocument();
      expect(
        screen.getByText("콘텐츠를 만드시나요?", { exact: false })
      ).toBeInTheDocument();
      expect(
        screen.getByText("최대 2개까지 선택 가능합니다.")
      ).toBeInTheDocument();
    });

    it("모든 카테고리 버튼이 표시되어야 한다", () => {
      renderWithPage();

      expect(screen.getByText("용돈벌기")).toBeInTheDocument();
      expect(screen.getByText("디지털")).toBeInTheDocument();
      expect(screen.getByText("그림")).toBeInTheDocument();
      expect(screen.getByText("글쓰기/독서")).toBeInTheDocument();
      expect(screen.getByText("건강/운동")).toBeInTheDocument();
      expect(screen.getByText("동기부여")).toBeInTheDocument();
      expect(screen.getByText("취미힐링")).toBeInTheDocument();
      expect(screen.getByText("외국어")).toBeInTheDocument();
    });

    it("카테고리 버튼에 적절한 aria-label이 설정되어 있어야 한다", () => {
      renderWithPage();

      expect(
        screen.getByLabelText("용돈벌기 카테고리 선택")
      ).toBeInTheDocument();
      expect(screen.getByLabelText("디지털 카테고리 선택")).toBeInTheDocument();
    });

    it("초기 상태에서는 모든 버튼이 선택되지 않은 상태여야 한다", () => {
      renderWithPage();

      const buttons = screen.getAllByRole("button");
      buttons.forEach((button) => {
        expect(button).toBeInTheDocument();
      });
    });
  });

  describe("categoryStore 연동", () => {
    it("카테고리 버튼 클릭 시 categoryStore 상태가 업데이트되어야 한다", () => {
      renderWithPage();

      const categoryButton = screen.getByText("용돈벌기");
      fireEvent.click(categoryButton);

      const store = useCategoryStore.getState();
      expect(store.tempSelectedCategories).toContain(1);
    });

    it("선택된 카테고리 버튼의 색상이 변경되어야 한다", async () => {
      renderWithPage();

      const categoryButton = screen.getByText("용돈벌기");

      fireEvent.click(categoryButton);

      await waitFor(() => {
        const store = useCategoryStore.getState();
        expect(store.tempSelectedCategories).toContain(1);
      });
    });

    it("카테고리를 선택 취소할 수 있어야 한다", () => {
      renderWithPage();

      const categoryButton = screen.getByText("용돈벌기");

      fireEvent.click(categoryButton);

      expect(useCategoryStore.getState().tempSelectedCategories).toContain(1);

      fireEvent.click(categoryButton);

      expect(useCategoryStore.getState().tempSelectedCategories).not.toContain(
        1
      );
    });

    it("최대 2개까지만 선택할 수 있어야 한다", () => {
      renderWithPage();

      const button1 = screen.getByText("용돈벌기");
      const button2 = screen.getByText("디지털");
      const button3 = screen.getByText("그림");

      fireEvent.click(button1);
      fireEvent.click(button2);

      expect(useCategoryStore.getState().tempSelectedCategories).toHaveLength(
        2
      );

      fireEvent.click(button3);

      expect(mockToastShow).toHaveBeenCalledWith(
        "최대 2개까지 선택 가능합니다."
      );
      expect(useCategoryStore.getState().tempSelectedCategories).toHaveLength(
        2
      );
    });

    it("이미 선택된 카테고리를 다시 선택하면 선택 취소되어야 한다", () => {
      renderWithPage();

      const button1 = screen.getByText("용돈벌기");
      const button2 = screen.getByText("디지털");

      fireEvent.click(button1);
      fireEvent.click(button2);

      expect(useCategoryStore.getState().tempSelectedCategories).toHaveLength(
        2
      );

      fireEvent.click(button1);

      expect(useCategoryStore.getState().tempSelectedCategories).toHaveLength(
        1
      );
      expect(useCategoryStore.getState().tempSelectedCategories).not.toContain(
        1
      );
    });
  });

  describe("메인 화면 연동", () => {
    it("카테고리를 선택하면 CategorySelector에 반영되어야 한다", async () => {
      renderWithCategorySelector();

      const categoryButton = screen.getByLabelText("용돈벌기 카테고리 선택");
      fireEvent.click(categoryButton);

      // tempSelectedCategories를 selectedCategories로 적용
      useCategoryStore.getState().applyTempSelectedCategories();

      await waitFor(() => {
        const link = screen.getByRole("link");
        expect(link).toBeInTheDocument();
        expect(link.textContent).toContain("용돈벌기");
      });
    });

    it("여러 카테고리를 선택하면 CategorySelector에 모두 반영되어야 한다", async () => {
      renderWithCategorySelector();

      const button1 = screen.getByLabelText("용돈벌기 카테고리 선택");
      const button2 = screen.getByLabelText("디지털 카테고리 선택");

      fireEvent.click(button1);
      fireEvent.click(button2);

      // tempSelectedCategories를 selectedCategories로 적용
      useCategoryStore.getState().applyTempSelectedCategories();

      await waitFor(() => {
        const store = useCategoryStore.getState();
        expect(store.selectedCategories).toHaveLength(2);
      });

      await waitFor(() => {
        const link = screen.getByRole("link");
        expect(link.textContent).toContain("용돈벌기, 디지털");
      });
    });

    it("카테고리를 선택 취소하면 CategorySelector에서도 제거되어야 한다", async () => {
      renderWithCategorySelector();

      const button1 = screen.getByLabelText("용돈벌기 카테고리 선택");
      const button2 = screen.getByLabelText("디지털 카테고리 선택");

      fireEvent.click(button1);
      fireEvent.click(button2);

      // tempSelectedCategories를 selectedCategories로 적용
      useCategoryStore.getState().applyTempSelectedCategories();

      await waitFor(() => {
        const link = screen.getByRole("link");
        expect(link.textContent).toContain("용돈벌기, 디지털");
      });

      fireEvent.click(button1);
      // 다시 적용
      useCategoryStore.getState().applyTempSelectedCategories();

      await waitFor(() => {
        const link = screen.getByRole("link");
        expect(link.textContent).toContain("디지털");
        expect(link.textContent).not.toContain("용돈벌기, 디지털");
      });
    });

    it("선택된 카테고리가 없으면 CategorySelector에 기본 텍스트가 표시되어야 한다", () => {
      renderWithCategorySelector();

      expect(screen.getByText("주제를 선택하세요")).toBeInTheDocument();
    });
  });
});
