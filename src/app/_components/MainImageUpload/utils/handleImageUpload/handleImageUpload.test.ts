import handleImageUpload from "./handleImageUpload";
import { toast } from "@/provider/ToastProvider/ToastProvider";

const mockCreateObjectURL = jest.fn();
const mockRevokeObjectURL = jest.fn();

global.URL.createObjectURL = mockCreateObjectURL;
global.URL.revokeObjectURL = mockRevokeObjectURL;

jest.mock("@/provider/ToastProvider/ToastProvider", () => ({
  toast: {
    show: jest.fn(),
  },
}));

describe("handleImageUpload", () => {
  const mockSetMainImage = jest.fn();
  const mockToastShow = toast.show as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    mockCreateObjectURL.mockReturnValue("blob:mock-image-url");
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("이미지 형식 검증", () => {
    it("jpg 형식의 이미지를 업로드할 수 있어야 한다", () => {
      const jpgFile = new File(["test"], "test.jpg", { type: "image/jpeg" });
      const mockEvent = {
        target: {
          files: [jpgFile],
        },
      } as unknown as React.ChangeEvent<HTMLInputElement>;

      handleImageUpload(mockEvent, mockSetMainImage);

      expect(mockToastShow).not.toHaveBeenCalled();
      expect(mockCreateObjectURL).toHaveBeenCalledWith(jpgFile);
      expect(mockSetMainImage).toHaveBeenCalledWith("blob:mock-image-url");
    });

    it("jpeg 형식의 이미지를 업로드할 수 있어야 한다", () => {
      const jpegFile = new File(["test"], "test.jpeg", { type: "image/jpeg" });
      const mockEvent = {
        target: {
          files: [jpegFile],
        },
      } as unknown as React.ChangeEvent<HTMLInputElement>;

      handleImageUpload(mockEvent, mockSetMainImage);

      expect(mockToastShow).not.toHaveBeenCalled();
      expect(mockCreateObjectURL).toHaveBeenCalledWith(jpegFile);
      expect(mockSetMainImage).toHaveBeenCalledWith("blob:mock-image-url");
    });

    it("png 형식의 이미지를 업로드할 수 있어야 한다", () => {
      const pngFile = new File(["test"], "test.png", { type: "image/png" });
      const mockEvent = {
        target: {
          files: [pngFile],
        },
      } as unknown as React.ChangeEvent<HTMLInputElement>;

      handleImageUpload(mockEvent, mockSetMainImage);

      expect(mockToastShow).not.toHaveBeenCalled();
      expect(mockCreateObjectURL).toHaveBeenCalledWith(pngFile);
      expect(mockSetMainImage).toHaveBeenCalledWith("blob:mock-image-url");
    });

    it("확장자로 jpg 파일을 인식할 수 있어야 한다 (type이 없는 경우)", () => {
      const jpgFile = new File(["test"], "test.jpg", { type: "" });
      const mockEvent = {
        target: {
          files: [jpgFile],
        },
      } as unknown as React.ChangeEvent<HTMLInputElement>;

      handleImageUpload(mockEvent, mockSetMainImage);

      expect(mockToastShow).not.toHaveBeenCalled();
      expect(mockCreateObjectURL).toHaveBeenCalledWith(jpgFile);
      expect(mockSetMainImage).toHaveBeenCalledWith("blob:mock-image-url");
    });

    it("확장자로 png 파일을 인식할 수 있어야 한다 (type이 없는 경우)", () => {
      const pngFile = new File(["test"], "test.png", { type: "" });
      const mockEvent = {
        target: {
          files: [pngFile],
        },
      } as unknown as React.ChangeEvent<HTMLInputElement>;

      handleImageUpload(mockEvent, mockSetMainImage);

      expect(mockToastShow).not.toHaveBeenCalled();
      expect(mockCreateObjectURL).toHaveBeenCalledWith(pngFile);
      expect(mockSetMainImage).toHaveBeenCalledWith("blob:mock-image-url");
    });

    it("gif 형식의 이미지는 업로드할 수 없어야 한다", () => {
      const gifFile = new File(["test"], "test.gif", { type: "image/gif" });
      const mockEvent = {
        target: {
          files: [gifFile],
        },
      } as unknown as React.ChangeEvent<HTMLInputElement>;

      handleImageUpload(mockEvent, mockSetMainImage);

      expect(mockToastShow).toHaveBeenCalledWith(
        "jpg, png 형식의 이미지만 업로드 가능합니다."
      );
      expect(mockCreateObjectURL).not.toHaveBeenCalled();
      expect(mockSetMainImage).not.toHaveBeenCalled();
    });

    it("webp 형식의 이미지는 업로드할 수 없어야 한다", () => {
      const webpFile = new File(["test"], "test.webp", { type: "image/webp" });
      const mockEvent = {
        target: {
          files: [webpFile],
        },
      } as unknown as React.ChangeEvent<HTMLInputElement>;

      handleImageUpload(mockEvent, mockSetMainImage);

      expect(mockToastShow).toHaveBeenCalledWith(
        "jpg, png 형식의 이미지만 업로드 가능합니다."
      );
      expect(mockCreateObjectURL).not.toHaveBeenCalled();
      expect(mockSetMainImage).not.toHaveBeenCalled();
    });

    it("확장자가 없는 파일은 업로드할 수 없어야 한다", () => {
      const noExtensionFile = new File(["test"], "test", { type: "" });
      const mockEvent = {
        target: {
          files: [noExtensionFile],
        },
      } as unknown as React.ChangeEvent<HTMLInputElement>;

      handleImageUpload(mockEvent, mockSetMainImage);

      expect(mockToastShow).toHaveBeenCalledWith(
        "jpg, png 형식의 이미지만 업로드 가능합니다."
      );
      expect(mockCreateObjectURL).not.toHaveBeenCalled();
      expect(mockSetMainImage).not.toHaveBeenCalled();
    });
  });

  describe("URL 생성", () => {
    it("유효한 이미지 파일로 URL을 생성해야 한다", () => {
      const imageFile = new File(["test"], "test.jpg", { type: "image/jpeg" });
      const mockEvent = {
        target: {
          files: [imageFile],
        },
      } as unknown as React.ChangeEvent<HTMLInputElement>;

      const mockUrl = "blob:new-image-url";
      mockCreateObjectURL.mockReturnValue(mockUrl);

      handleImageUpload(mockEvent, mockSetMainImage);

      expect(mockCreateObjectURL).toHaveBeenCalledWith(imageFile);
      expect(mockSetMainImage).toHaveBeenCalledWith(mockUrl);
    });
  });

  describe("기존 이미지 정리", () => {
    it("기존 blob URL이 있으면 revokeObjectURL을 호출해야 한다", () => {
      const imageFile = new File(["test"], "test.jpg", { type: "image/jpeg" });
      const mockEvent = {
        target: {
          files: [imageFile],
        },
      } as unknown as React.ChangeEvent<HTMLInputElement>;

      const existingBlobUrl = "blob:existing-image-url";
      handleImageUpload(mockEvent, mockSetMainImage, existingBlobUrl);

      expect(mockRevokeObjectURL).toHaveBeenCalledWith(existingBlobUrl);
      expect(mockCreateObjectURL).toHaveBeenCalledWith(imageFile);
      expect(mockSetMainImage).toHaveBeenCalledWith("blob:mock-image-url");
    });

    it("기존 이미지가 blob URL이 아니면 revokeObjectURL을 호출하지 않아야 한다", () => {
      const imageFile = new File(["test"], "test.jpg", { type: "image/jpeg" });
      const mockEvent = {
        target: {
          files: [imageFile],
        },
      } as unknown as React.ChangeEvent<HTMLInputElement>;

      const existingHttpUrl = "https://example.com/image.jpg";
      handleImageUpload(mockEvent, mockSetMainImage, existingHttpUrl);

      expect(mockRevokeObjectURL).not.toHaveBeenCalled();
      expect(mockCreateObjectURL).toHaveBeenCalledWith(imageFile);
      expect(mockSetMainImage).toHaveBeenCalledWith("blob:mock-image-url");
    });

    it("기존 이미지가 없으면 revokeObjectURL을 호출하지 않아야 한다", () => {
      const imageFile = new File(["test"], "test.jpg", { type: "image/jpeg" });
      const mockEvent = {
        target: {
          files: [imageFile],
        },
      } as unknown as React.ChangeEvent<HTMLInputElement>;

      handleImageUpload(mockEvent, mockSetMainImage);

      expect(mockRevokeObjectURL).not.toHaveBeenCalled();
      expect(mockCreateObjectURL).toHaveBeenCalledWith(imageFile);
      expect(mockSetMainImage).toHaveBeenCalledWith("blob:mock-image-url");
    });

    it("기존 이미지가 null이면 revokeObjectURL을 호출하지 않아야 한다", () => {
      const imageFile = new File(["test"], "test.jpg", { type: "image/jpeg" });
      const mockEvent = {
        target: {
          files: [imageFile],
        },
      } as unknown as React.ChangeEvent<HTMLInputElement>;

      handleImageUpload(mockEvent, mockSetMainImage, null);

      expect(mockRevokeObjectURL).not.toHaveBeenCalled();
      expect(mockCreateObjectURL).toHaveBeenCalledWith(imageFile);
      expect(mockSetMainImage).toHaveBeenCalledWith("blob:mock-image-url");
    });
  });

  describe("예외 상황 처리", () => {
    it("파일이 없으면 아무 동작도 하지 않아야 한다", () => {
      const mockEvent = {
        target: {
          files: null,
        },
      } as unknown as React.ChangeEvent<HTMLInputElement>;

      handleImageUpload(mockEvent, mockSetMainImage);

      expect(mockToastShow).not.toHaveBeenCalled();
      expect(mockCreateObjectURL).not.toHaveBeenCalled();
      expect(mockSetMainImage).not.toHaveBeenCalled();
      expect(mockRevokeObjectURL).not.toHaveBeenCalled();
    });

    it("빈 파일 배열이면 아무 동작도 하지 않아야 한다", () => {
      const mockEvent = {
        target: {
          files: [],
        },
      } as unknown as React.ChangeEvent<HTMLInputElement>;

      handleImageUpload(mockEvent, mockSetMainImage);

      expect(mockToastShow).not.toHaveBeenCalled();
      expect(mockCreateObjectURL).not.toHaveBeenCalled();
      expect(mockSetMainImage).not.toHaveBeenCalled();
      expect(mockRevokeObjectURL).not.toHaveBeenCalled();
    });
  });
});
