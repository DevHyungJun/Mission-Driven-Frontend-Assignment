import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import MainImageUpload from "./MainImageUpload";
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

describe("MainImageUpload 통합 테스트", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockCreateObjectURL.mockClear();
    mockRevokeObjectURL.mockClear();
    mockToastShow.mockClear();
  });

  describe("UI 상태 표시", () => {
    it("이미지가 없을 때 업로드 UI가 표시되어야 한다", () => {
      renderWithProviders(<MainImageUpload />);

      expect(
        screen.getByText("콘텐츠 대표 이미지를", { exact: false })
      ).toBeInTheDocument();
      expect(
        screen.getByText("등록해 주세요", { exact: false })
      ).toBeInTheDocument();
      expect(
        screen.getByText("1:1 비율의 정사각형 이미지를 추천합니다")
      ).toBeInTheDocument();
      expect(screen.getByText("이미지 업로드")).toBeInTheDocument();
    });

    it("이미지가 있을 때 이미지가 표시되어야 한다", async () => {
      renderWithProviders(<MainImageUpload />);

      const fileInput = screen.getByLabelText("대표 이미지 업로드");
      const file = new File(["test"], "test.jpg", { type: "image/jpeg" });

      fireEvent.change(fileInput, { target: { files: [file] } });

      await waitFor(() => {
        expect(
          screen.queryByText("콘텐츠 대표 이미지를", { exact: false })
        ).not.toBeInTheDocument();
        expect(screen.getByAltText("대표 이미지")).toBeInTheDocument();
      });
    });
  });

  describe("파일 입력 설정", () => {
    it("파일 입력이 올바르게 설정되어 있어야 한다", () => {
      renderWithProviders(<MainImageUpload />);

      const fileInput = screen.getByLabelText(
        "대표 이미지 업로드"
      ) as HTMLInputElement;

      expect(fileInput.type).toBe("file");
      expect(fileInput.accept).toBe("image/jpeg,image/png,.jpg,.jpeg,.png");
      expect(fileInput.id).toBe("main-image-upload");
      expect(fileInput.required).toBe(true);
      expect(fileInput.className).toContain("hidden");
    });
  });

  describe("파일 업로드", () => {
    it("유효한 이미지 파일 업로드 시 ImageProvider 상태가 업데이트되어야 한다", () => {
      renderWithProviders(<MainImageUpload />);

      const fileInput = screen.getByLabelText("대표 이미지 업로드");
      const file = new File(["test"], "test.jpg", { type: "image/jpeg" });

      fireEvent.change(fileInput, { target: { files: [file] } });

      expect(mockCreateObjectURL).toHaveBeenCalledWith(file);
      expect(mockCreateObjectURL).toHaveBeenCalledTimes(1);
    });

    it("JPG 파일 업로드 시 정상적으로 처리되어야 한다", () => {
      renderWithProviders(<MainImageUpload />);

      const fileInput = screen.getByLabelText("대표 이미지 업로드");
      const jpgFile = new File(["test"], "test.jpg", { type: "image/jpeg" });

      fireEvent.change(fileInput, { target: { files: [jpgFile] } });

      expect(mockCreateObjectURL).toHaveBeenCalledWith(jpgFile);
      expect(mockToastShow).not.toHaveBeenCalled();
    });

    it("PNG 파일 업로드 시 정상적으로 처리되어야 한다", () => {
      renderWithProviders(<MainImageUpload />);

      const fileInput = screen.getByLabelText("대표 이미지 업로드");
      const pngFile = new File(["test"], "test.png", { type: "image/png" });

      fireEvent.change(fileInput, { target: { files: [pngFile] } });

      expect(mockCreateObjectURL).toHaveBeenCalledWith(pngFile);
      expect(mockToastShow).not.toHaveBeenCalled();
    });

    it("유효하지 않은 파일 형식 업로드 시 토스트가 표시되어야 한다", () => {
      renderWithProviders(<MainImageUpload />);

      const fileInput = screen.getByLabelText("대표 이미지 업로드");
      const gifFile = new File(["test"], "test.gif", { type: "image/gif" });

      fireEvent.change(fileInput, { target: { files: [gifFile] } });

      expect(mockToastShow).toHaveBeenCalledWith(
        "jpg, png 형식의 이미지만 업로드 가능합니다."
      );
      expect(mockCreateObjectURL).not.toHaveBeenCalled();
    });

    it("기존 이미지가 있는 상태에서 새 이미지를 업로드하면 기존 이미지의 URL이 revoke되어야 한다", () => {
      renderWithProviders(<MainImageUpload />);

      const fileInput = screen.getByLabelText("대표 이미지 업로드");
      const firstFile = new File(["test1"], "test1.jpg", {
        type: "image/jpeg",
      });
      const secondFile = new File(["test2"], "test2.jpg", {
        type: "image/jpeg",
      });

      fireEvent.change(fileInput, { target: { files: [firstFile] } });

      expect(mockCreateObjectURL).toHaveBeenCalledWith(firstFile);
      const firstImageUrl = mockCreateObjectURL.mock.results[0].value;

      mockCreateObjectURL.mockClear();

      fireEvent.change(fileInput, { target: { files: [secondFile] } });

      expect(mockRevokeObjectURL).toHaveBeenCalledWith(firstImageUrl);
      expect(mockCreateObjectURL).toHaveBeenCalledWith(secondFile);
    });

    it("파일이 선택되지 않으면 아무 동작도 하지 않아야 한다", () => {
      renderWithProviders(<MainImageUpload />);

      const fileInput = screen.getByLabelText("대표 이미지 업로드");

      fireEvent.change(fileInput, { target: { files: null } });

      expect(mockCreateObjectURL).not.toHaveBeenCalled();
      expect(mockToastShow).not.toHaveBeenCalled();
    });
  });

  describe("상호작용", () => {
    it("업로드 버튼 클릭 시 파일 입력이 트리거되어야 한다", () => {
      renderWithProviders(<MainImageUpload />);

      const fileInput = screen.getByLabelText(
        "대표 이미지 업로드"
      ) as HTMLInputElement;
      const uploadButton = screen.getByText("이미지 업로드");

      const clickSpy = jest.spyOn(fileInput, "click");

      fireEvent.click(uploadButton);

      expect(clickSpy).toHaveBeenCalled();

      clickSpy.mockRestore();
    });

    it("이미지가 표시된 상태에서 이미지 클릭 시 파일 입력이 트리거되어야 한다", async () => {
      renderWithProviders(<MainImageUpload />);

      const fileInput = screen.getByLabelText(
        "대표 이미지 업로드"
      ) as HTMLInputElement;
      const file = new File(["test"], "test.jpg", { type: "image/jpeg" });

      fireEvent.change(fileInput, { target: { files: [file] } });

      await waitFor(() => {
        expect(screen.getByAltText("대표 이미지")).toBeInTheDocument();
      });

      const imageContainer = screen.getByAltText("대표 이미지").closest("div");
      const clickSpy = jest.spyOn(fileInput, "click");

      if (imageContainer) {
        fireEvent.click(imageContainer);
      }

      expect(clickSpy).toHaveBeenCalled();

      clickSpy.mockRestore();
    });
  });

  describe("ImageProvider 연동", () => {
    it("파일 업로드 시 ImageProvider의 mainImage 상태가 업데이트되어야 한다", async () => {
      renderWithProviders(<MainImageUpload />);

      const fileInput = screen.getByLabelText("대표 이미지 업로드");
      const file = new File(["test"], "test.jpg", { type: "image/jpeg" });

      fireEvent.change(fileInput, { target: { files: [file] } });

      await waitFor(() => {
        expect(
          screen.queryByText("콘텐츠 대표 이미지를", { exact: false })
        ).not.toBeInTheDocument();
      });

      const image = screen.getByAltText("대표 이미지");
      expect(image).toHaveAttribute("src", expect.stringContaining("blob:"));
    });

    it("이미지가 업데이트되면 UI가 재렌더링되어야 한다", async () => {
      renderWithProviders(<MainImageUpload />);

      expect(
        screen.getByText("콘텐츠 대표 이미지를", { exact: false })
      ).toBeInTheDocument();

      const fileInput = screen.getByLabelText("대표 이미지 업로드");
      const file = new File(["test"], "test.jpg", { type: "image/jpeg" });

      fireEvent.change(fileInput, { target: { files: [file] } });

      await waitFor(() => {
        expect(
          screen.queryByText("콘텐츠 대표 이미지를", { exact: false })
        ).not.toBeInTheDocument();
        expect(screen.getByAltText("대표 이미지")).toBeInTheDocument();
      });
    });
  });

  describe("접근성", () => {
    it("파일 입력에 적절한 aria-label이 설정되어 있어야 한다", () => {
      renderWithProviders(<MainImageUpload />);

      const fileInput = screen.getByLabelText("대표 이미지 업로드");
      expect(fileInput).toBeInTheDocument();
    });

    it("업로드 버튼에 적절한 ariaLabel이 설정되어 있어야 한다", () => {
      renderWithProviders(<MainImageUpload />);

      const uploadButton = screen.getByText("이미지 업로드");
      expect(uploadButton).toHaveAttribute("aria-label", "이미지 업로드 버튼");
    });
  });
});
