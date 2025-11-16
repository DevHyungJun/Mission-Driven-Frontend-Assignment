import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AdditionalImages from "./AdditionalImages";
import ImageProvider from "@/provider/ImageProvider/ImageProvider";
import ToastProvider from "@/provider/ToastProvider/ToastProvider";

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
  const MockCategorySelector = () => {
    return React.createElement(
      "div",
      { "data-testid": "category-selector" },
      "CategorySelector"
    );
  };
  MockCategorySelector.displayName = "MockCategorySelector";
  return {
    __esModule: true,
    default: MockCategorySelector,
  };
});

import { toast } from "@/provider/ToastProvider/ToastProvider";

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ src, alt, ...props }: any) => {
    return <img src={src} alt={alt} {...props} />;
  },
}));

jest.mock("next/link", () => {
  return ({ children, href, ...props }: any) => {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  };
});

const mockCreateObjectURL = jest.fn((file: Blob | MediaSource) => {
  const fileName = file instanceof File ? file.name : "unknown";
  return `blob:mock-${fileName}`;
});

const mockRevokeObjectURL = jest.fn();

global.URL.createObjectURL = mockCreateObjectURL;
global.URL.revokeObjectURL = mockRevokeObjectURL;

const mockToastShow = toast.show as jest.Mock;

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <ToastProvider>
      <ImageProvider>{ui}</ImageProvider>
    </ToastProvider>
  );
};

describe("AdditionalImages 통합 테스트", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockCreateObjectURL.mockClear();
    mockRevokeObjectURL.mockClear();
    mockToastShow.mockClear();
  });

  describe("UI 상태 표시", () => {
    it("추가 이미지가 없을 때 업로드 UI가 표시되어야 한다", () => {
      const { container } = renderWithProviders(<AdditionalImages />);

      expect(screen.getByText("추가 이미지 (선택)")).toBeInTheDocument();
      expect(
        screen.getByText("최대 4장까지 등록할 수 있어요")
      ).toBeInTheDocument();
      // label과 Icon 모두에 aria-label이 있으므로, label 요소를 직접 찾음
      const label = container.querySelector('label[aria-label="추가 이미지 업로드"]');
      expect(label).toBeInTheDocument();
    });

    it("추가 이미지가 있을 때 이미지가 표시되어야 한다", async () => {
      const { container } = renderWithProviders(<AdditionalImages />);

      const fileInput = container.querySelector(
        "#additional-image"
      ) as HTMLInputElement;
      const file = new File(["test"], "test.jpg", { type: "image/jpeg" });

      fireEvent.change(fileInput, { target: { files: [file] } });

      await waitFor(() => {
        expect(screen.getByAltText("추가 이미지")).toBeInTheDocument();
      });
    });

    it("SectionProvider의 title과 description이 표시되어야 한다", () => {
      renderWithProviders(<AdditionalImages />);

      expect(screen.getByText("추가 이미지 (선택)")).toBeInTheDocument();
      expect(
        screen.getByText("최대 4장까지 등록할 수 있어요")
      ).toBeInTheDocument();
    });
  });

  describe("파일 입력 설정", () => {
    it("파일 입력이 올바르게 설정되어 있어야 한다", () => {
      const { container } = renderWithProviders(<AdditionalImages />);

      const fileInput = container.querySelector(
        "#additional-image"
      ) as HTMLInputElement;

      expect(fileInput).toBeInTheDocument();
      expect(fileInput.type).toBe("file");
      expect(fileInput.accept).toBe("image/jpeg,image/png,.jpg,.jpeg,.png");
      expect(fileInput.id).toBe("additional-image");
      expect(fileInput.hasAttribute("multiple")).toBe(true);
      expect(fileInput.required).toBe(true);
      expect(fileInput.className).toContain("hidden");
    });
  });

  describe("파일 업로드", () => {
    it("유효한 이미지 파일 업로드 시 ImageProvider 상태가 업데이트되어야 한다", async () => {
      const { container } = renderWithProviders(<AdditionalImages />);

      const fileInput = container.querySelector(
        "#additional-image"
      ) as HTMLInputElement;
      const file = new File(["test"], "test.jpg", { type: "image/jpeg" });

      fireEvent.change(fileInput, { target: { files: [file] } });

      await waitFor(() => {
        expect(mockCreateObjectURL).toHaveBeenCalledWith(file);
        expect(mockCreateObjectURL).toHaveBeenCalledTimes(1);
      });
    });

    it("여러 파일을 동시에 업로드할 수 있어야 한다", async () => {
      const { container } = renderWithProviders(<AdditionalImages />);

      const fileInput = container.querySelector(
        "#additional-image"
      ) as HTMLInputElement;
      const file1 = new File(["test1"], "test1.jpg", { type: "image/jpeg" });
      const file2 = new File(["test2"], "test2.jpg", { type: "image/jpeg" });

      fireEvent.change(fileInput, { target: { files: [file1, file2] } });

      await waitFor(() => {
        expect(mockCreateObjectURL).toHaveBeenCalledWith(file1);
        expect(mockCreateObjectURL).toHaveBeenCalledWith(file2);
        expect(mockCreateObjectURL).toHaveBeenCalledTimes(2);
      });
    });

    it("JPG 파일 업로드 시 정상적으로 처리되어야 한다", async () => {
      const { container } = renderWithProviders(<AdditionalImages />);

      const fileInput = container.querySelector(
        "#additional-image"
      ) as HTMLInputElement;
      const jpgFile = new File(["test"], "test.jpg", { type: "image/jpeg" });

      fireEvent.change(fileInput, { target: { files: [jpgFile] } });

      await waitFor(() => {
        expect(mockCreateObjectURL).toHaveBeenCalledWith(jpgFile);
        expect(mockToastShow).not.toHaveBeenCalled();
      });
    });

    it("PNG 파일 업로드 시 정상적으로 처리되어야 한다", async () => {
      const { container } = renderWithProviders(<AdditionalImages />);

      const fileInput = container.querySelector(
        "#additional-image"
      ) as HTMLInputElement;
      const pngFile = new File(["test"], "test.png", { type: "image/png" });

      fireEvent.change(fileInput, { target: { files: [pngFile] } });

      await waitFor(() => {
        expect(mockCreateObjectURL).toHaveBeenCalledWith(pngFile);
        expect(mockToastShow).not.toHaveBeenCalled();
      });
    });

    it("유효하지 않은 파일 형식 업로드 시 토스트가 표시되어야 한다", () => {
      const { container } = renderWithProviders(<AdditionalImages />);

      const fileInput = container.querySelector(
        "#additional-image"
      ) as HTMLInputElement;
      const gifFile = new File(["test"], "test.gif", { type: "image/gif" });

      fireEvent.change(fileInput, { target: { files: [gifFile] } });

      expect(mockToastShow).toHaveBeenCalledWith(
        "jpg, png 형식의 이미지만 업로드 가능합니다."
      );
      expect(mockCreateObjectURL).not.toHaveBeenCalled();
    });

    it("파일이 선택되지 않으면 아무 동작도 하지 않아야 한다", () => {
      const { container } = renderWithProviders(<AdditionalImages />);

      const fileInput = container.querySelector(
        "#additional-image"
      ) as HTMLInputElement;

      fireEvent.change(fileInput, { target: { files: null } });

      expect(mockCreateObjectURL).not.toHaveBeenCalled();
      expect(mockToastShow).not.toHaveBeenCalled();
    });
  });

  describe("4장 제한", () => {
    it("4장 미만일 때 업로드 버튼이 표시되어야 한다", async () => {
      const { container } = renderWithProviders(<AdditionalImages />);

      const fileInput = container.querySelector(
        "#additional-image"
      ) as HTMLInputElement;
      const file1 = new File(["test1"], "test1.jpg", { type: "image/jpeg" });
      const file2 = new File(["test2"], "test2.jpg", { type: "image/jpeg" });
      const file3 = new File(["test3"], "test3.jpg", { type: "image/jpeg" });

      fireEvent.change(fileInput, { target: { files: [file1, file2, file3] } });

      await waitFor(() => {
        expect(screen.getAllByAltText("추가 이미지")).toHaveLength(3);
      });

      // label과 Icon 모두에 aria-label이 있으므로, label 요소를 직접 찾음
      const label = container.querySelector('label[aria-label="추가 이미지 업로드"]');
      expect(label).toBeInTheDocument();
    });

    it("4장일 때 업로드 버튼이 표시되지 않아야 한다", async () => {
      const { container } = renderWithProviders(<AdditionalImages />);

      const fileInput = container.querySelector(
        "#additional-image"
      ) as HTMLInputElement;
      const file1 = new File(["test1"], "test1.jpg", { type: "image/jpeg" });
      const file2 = new File(["test2"], "test2.jpg", { type: "image/jpeg" });
      const file3 = new File(["test3"], "test3.jpg", { type: "image/jpeg" });
      const file4 = new File(["test4"], "test4.jpg", { type: "image/jpeg" });

      fireEvent.change(fileInput, {
        target: { files: [file1, file2, file3, file4] },
      });

      await waitFor(() => {
        expect(screen.getAllByAltText("추가 이미지")).toHaveLength(4);
      });

      expect(
        screen.queryByLabelText("추가 이미지 업로드")
      ).not.toBeInTheDocument();
    });

    it("3장 상태에서 2장을 추가하려 할 때 1장만 추가되어야 한다", async () => {
      const { container } = renderWithProviders(<AdditionalImages />);

      const fileInput = container.querySelector(
        "#additional-image"
      ) as HTMLInputElement;
      const file1 = new File(["test1"], "test1.jpg", { type: "image/jpeg" });
      const file2 = new File(["test2"], "test2.jpg", { type: "image/jpeg" });
      const file3 = new File(["test3"], "test3.jpg", { type: "image/jpeg" });

      fireEvent.change(fileInput, {
        target: { files: [file1, file2, file3] },
      });

      await waitFor(() => {
        expect(screen.getAllByAltText("추가 이미지")).toHaveLength(3);
      });

      await waitFor(() => {
        expect(mockCreateObjectURL).toHaveBeenCalledTimes(3);
      });

      mockCreateObjectURL.mockClear();

      const file4 = new File(["test4"], "test4.jpg", { type: "image/jpeg" });
      const file5 = new File(["test5"], "test5.jpg", { type: "image/jpeg" });

      fireEvent.change(fileInput, { target: { files: [file4, file5] } });

      await waitFor(() => {
        expect(screen.getAllByAltText("추가 이미지")).toHaveLength(4);
      });

      await waitFor(() => {
        expect(mockCreateObjectURL).toHaveBeenCalledWith(file4);
        expect(mockCreateObjectURL).toHaveBeenCalledTimes(1);
      });

      const allCalls = mockCreateObjectURL.mock.calls;
      const file5Calls = allCalls.filter(
        (call) =>
          call[0] && call[0] instanceof File && call[0].name === "test5.jpg"
      );
      expect(file5Calls).toHaveLength(0);
    });
  });

  describe("ImageProvider 연동", () => {
    it("파일 업로드 시 ImageProvider의 additionalImages 상태가 업데이트되어야 한다", async () => {
      const { container } = renderWithProviders(<AdditionalImages />);

      const fileInput = container.querySelector(
        "#additional-image"
      ) as HTMLInputElement;
      const file = new File(["test"], "test.jpg", { type: "image/jpeg" });

      fireEvent.change(fileInput, { target: { files: [file] } });

      await waitFor(() => {
        expect(screen.getByAltText("추가 이미지")).toBeInTheDocument();
      });

      const image = screen.getByAltText("추가 이미지");
      expect(image).toHaveAttribute("src", expect.stringContaining("blob:"));
    });

    it("이미지가 업데이트되면 UI가 재렌더링되어야 한다", async () => {
      const { container } = renderWithProviders(<AdditionalImages />);

      const fileInput = container.querySelector(
        "#additional-image"
      ) as HTMLInputElement;
      const file1 = new File(["test1"], "test1.jpg", { type: "image/jpeg" });
      const file2 = new File(["test2"], "test2.jpg", { type: "image/jpeg" });

      fireEvent.change(fileInput, { target: { files: [file1] } });

      await waitFor(() => {
        expect(screen.getAllByAltText("추가 이미지")).toHaveLength(1);
      });

      fireEvent.change(fileInput, { target: { files: [file2] } });

      await waitFor(() => {
        expect(screen.getAllByAltText("추가 이미지")).toHaveLength(2);
      });
    });

    it("여러 이미지가 표시되어야 한다", async () => {
      const { container } = renderWithProviders(<AdditionalImages />);

      const fileInput = container.querySelector(
        "#additional-image"
      ) as HTMLInputElement;
      const file1 = new File(["test1"], "test1.jpg", { type: "image/jpeg" });
      const file2 = new File(["test2"], "test2.jpg", { type: "image/jpeg" });
      const file3 = new File(["test3"], "test3.jpg", { type: "image/jpeg" });

      fireEvent.change(fileInput, {
        target: { files: [file1, file2, file3] },
      });

      await waitFor(() => {
        const images = screen.getAllByAltText("추가 이미지");
        expect(images).toHaveLength(3);
        images.forEach((image) => {
          expect(image).toHaveAttribute(
            "src",
            expect.stringContaining("blob:")
          );
        });
      });
    });
  });

  describe("접근성", () => {
    it("파일 입력에 적절한 aria-label이 설정되어 있어야 한다", () => {
      const { container } = renderWithProviders(<AdditionalImages />);

      // label과 Icon 모두에 aria-label이 있으므로, label 요소를 직접 찾음
      const label = container.querySelector('label[aria-label="추가 이미지 업로드"]');
      expect(label).toBeInTheDocument();
    });
  });
});

