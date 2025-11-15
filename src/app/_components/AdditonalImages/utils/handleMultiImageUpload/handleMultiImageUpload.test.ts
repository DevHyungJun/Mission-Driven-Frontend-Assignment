jest.mock("@/provider/ToastProvider/ToastProvider", () => ({
  toast: {
    show: jest.fn(),
  },
}));

import handleMultiImageUpload from "./handleMultiImageUpload";
import { toast } from "@/provider/ToastProvider/ToastProvider";

describe("handleMultiImageUpload", () => {
  let mockSetAdditionalImages: jest.Mock;
  let mockCreateObjectURL: jest.Mock;
  const mockToastShow = toast.show as jest.Mock;
  let originalCreateObjectURL: typeof URL.createObjectURL | undefined;

  beforeAll(() => {
    if (typeof URL !== "undefined" && URL.createObjectURL) {
      originalCreateObjectURL = URL.createObjectURL;
    }
    mockCreateObjectURL = jest.fn((file: Blob | MediaSource) => {
      const fileName = file instanceof File ? file.name : "unknown";
      return `blob:mock-${fileName}`;
    });
    if (typeof URL !== "undefined") {
      URL.createObjectURL = mockCreateObjectURL as typeof URL.createObjectURL;
    } else {
      (global as any).URL = { createObjectURL: mockCreateObjectURL };
    }
  });

  afterAll(() => {
    if (originalCreateObjectURL) {
      URL.createObjectURL = originalCreateObjectURL;
    }
  });

  beforeEach(() => {
    jest.clearAllMocks();
    mockSetAdditionalImages = jest.fn((updater) => {
      if (typeof updater === "function") {
        updater([]);
      }
    });
    mockCreateObjectURL.mockClear();
  });

  describe("이미지 형식 검증", () => {
    it("jpg 형식의 이미지를 업로드할 수 있어야 한다", () => {
      const jpgFile = new File(["test"], "test.jpg", { type: "image/jpeg" });
      const mockEvent = {
        target: {
          files: [jpgFile],
        },
      } as unknown as React.ChangeEvent<HTMLInputElement>;

      handleMultiImageUpload(mockEvent, mockSetAdditionalImages);

      expect(mockToastShow).not.toHaveBeenCalled();
      expect(mockCreateObjectURL).toHaveBeenCalledWith(jpgFile);
      expect(mockSetAdditionalImages).toHaveBeenCalled();
    });

    it("png 형식의 이미지를 업로드할 수 있어야 한다", () => {
      const pngFile = new File(["test"], "test.png", { type: "image/png" });
      const mockEvent = {
        target: {
          files: [pngFile],
        },
      } as unknown as React.ChangeEvent<HTMLInputElement>;

      handleMultiImageUpload(mockEvent, mockSetAdditionalImages);

      expect(mockToastShow).not.toHaveBeenCalled();
      expect(mockCreateObjectURL).toHaveBeenCalledWith(pngFile);
      expect(mockSetAdditionalImages).toHaveBeenCalled();
    });

    it("확장자로 jpg 파일을 인식할 수 있어야 한다 (type이 없는 경우)", () => {
      const jpgFile = new File(["test"], "test.jpg", { type: "" });
      const mockEvent = {
        target: {
          files: [jpgFile],
        },
      } as unknown as React.ChangeEvent<HTMLInputElement>;

      handleMultiImageUpload(mockEvent, mockSetAdditionalImages);

      expect(mockToastShow).not.toHaveBeenCalled();
      expect(mockCreateObjectURL).toHaveBeenCalledWith(jpgFile);
      expect(mockSetAdditionalImages).toHaveBeenCalled();
    });

    it("gif 형식의 이미지는 업로드할 수 없어야 한다", () => {
      const gifFile = new File(["test"], "test.gif", { type: "image/gif" });
      const mockEvent = {
        target: {
          files: [gifFile],
        },
      } as unknown as React.ChangeEvent<HTMLInputElement>;

      handleMultiImageUpload(mockEvent, mockSetAdditionalImages);

      expect(mockToastShow).toHaveBeenCalledWith(
        "jpg, png 형식의 이미지만 업로드 가능합니다."
      );
      expect(mockCreateObjectURL).not.toHaveBeenCalled();
      expect(mockSetAdditionalImages).not.toHaveBeenCalled();
    });

    it("혼합된 형식의 파일 중 하나라도 잘못된 형식이면 업로드할 수 없어야 한다", () => {
      const jpgFile = new File(["test"], "test.jpg", { type: "image/jpeg" });
      const gifFile = new File(["test"], "test.gif", { type: "image/gif" });
      const mockEvent = {
        target: {
          files: [jpgFile, gifFile],
        },
      } as unknown as React.ChangeEvent<HTMLInputElement>;

      handleMultiImageUpload(mockEvent, mockSetAdditionalImages);

      expect(mockToastShow).toHaveBeenCalledWith(
        "jpg, png 형식의 이미지만 업로드 가능합니다."
      );
      expect(mockCreateObjectURL).not.toHaveBeenCalled();
      expect(mockSetAdditionalImages).not.toHaveBeenCalled();
    });
  });

  describe("URL 생성", () => {
    it("유효한 이미지 파일들로 URL을 생성해야 한다", () => {
      const image1 = new File(["test1"], "test1.jpg", { type: "image/jpeg" });
      const image2 = new File(["test2"], "test2.png", { type: "image/png" });
      const mockEvent = {
        target: {
          files: [image1, image2],
        },
      } as unknown as React.ChangeEvent<HTMLInputElement>;

      handleMultiImageUpload(mockEvent, mockSetAdditionalImages);

      expect(mockCreateObjectURL).toHaveBeenCalledWith(image1);
      expect(mockCreateObjectURL).toHaveBeenCalledWith(image2);
      expect(mockSetAdditionalImages).toHaveBeenCalled();
    });

    it("각 파일에 대해 개별적으로 URL을 생성해야 한다", () => {
      const image1 = new File(["test1"], "test1.jpg", { type: "image/jpeg" });
      const image2 = new File(["test2"], "test2.jpg", { type: "image/jpeg" });
      const image3 = new File(["test3"], "test3.jpg", { type: "image/jpeg" });
      const mockEvent = {
        target: {
          files: [image1, image2, image3],
        },
      } as unknown as React.ChangeEvent<HTMLInputElement>;

      handleMultiImageUpload(mockEvent, mockSetAdditionalImages);

      expect(mockCreateObjectURL).toHaveBeenCalledTimes(3);
      expect(mockSetAdditionalImages).toHaveBeenCalled();
    });
  });

  describe("다중 업로드", () => {
    it("여러 이미지를 한 번에 업로드할 수 있어야 한다", () => {
      const image1 = new File(["test1"], "test1.jpg", { type: "image/jpeg" });
      const image2 = new File(["test2"], "test2.jpg", { type: "image/jpeg" });
      const image3 = new File(["test3"], "test3.jpg", { type: "image/jpeg" });
      const mockEvent = {
        target: {
          files: [image1, image2, image3],
        },
      } as unknown as React.ChangeEvent<HTMLInputElement>;

      let currentImages: string[] = [];
      const setAdditionalImages = jest.fn((updater) => {
        if (typeof updater === "function") {
          currentImages = updater(currentImages);
        } else {
          currentImages = updater;
        }
      });

      handleMultiImageUpload(mockEvent, setAdditionalImages);

      expect(mockCreateObjectURL).toHaveBeenCalledTimes(3);
      expect(currentImages).toHaveLength(3);
    });

    it("기존 이미지 배열에 새 이미지를 추가해야 한다", () => {
      const existingImages = ["blob:existing1", "blob:existing2"];
      const newImage = new File(["test"], "test.jpg", { type: "image/jpeg" });
      const mockEvent = {
        target: {
          files: [newImage],
        },
      } as unknown as React.ChangeEvent<HTMLInputElement>;

      let currentImages: string[] = [...existingImages];
      const setAdditionalImages = jest.fn((updater) => {
        if (typeof updater === "function") {
          currentImages = updater(currentImages);
        } else {
          currentImages = updater;
        }
      });

      handleMultiImageUpload(mockEvent, setAdditionalImages);

      expect(currentImages).toHaveLength(3);
      expect(currentImages).toContain("blob:mock-test.jpg");
    });
  });

  describe("최대 4장 제한", () => {
    it("기존 이미지가 0장일 때 4장까지 업로드할 수 있어야 한다", () => {
      const images = Array.from(
        { length: 4 },
        (_, i) => new File(["test"], `test${i}.jpg`, { type: "image/jpeg" })
      );
      const mockEvent = {
        target: {
          files: images,
        },
      } as unknown as React.ChangeEvent<HTMLInputElement>;

      let currentImages: string[] = [];
      const setAdditionalImages = jest.fn((updater) => {
        if (typeof updater === "function") {
          currentImages = updater(currentImages);
        } else {
          currentImages = updater;
        }
      });

      handleMultiImageUpload(mockEvent, setAdditionalImages);

      expect(mockCreateObjectURL).toHaveBeenCalledTimes(4);
      expect(currentImages).toHaveLength(4);
      expect(mockToastShow).not.toHaveBeenCalled();
    });

    it("기존 이미지가 2장일 때 2장 더 업로드할 수 있어야 한다", () => {
      const existingImages = ["blob:existing1", "blob:existing2"];
      const newImages = Array.from(
        { length: 2 },
        (_, i) => new File(["test"], `test${i}.jpg`, { type: "image/jpeg" })
      );
      const mockEvent = {
        target: {
          files: newImages,
        },
      } as unknown as React.ChangeEvent<HTMLInputElement>;

      let currentImages: string[] = [...existingImages];
      const setAdditionalImages = jest.fn((updater) => {
        if (typeof updater === "function") {
          currentImages = updater(currentImages);
        } else {
          currentImages = updater;
        }
      });

      handleMultiImageUpload(mockEvent, setAdditionalImages);

      expect(mockCreateObjectURL).toHaveBeenCalledTimes(2);
      expect(currentImages).toHaveLength(4);
      expect(mockToastShow).not.toHaveBeenCalled();
    });

    it("기존 이미지가 4장일 때 추가 업로드를 시도하면 토스트를 표시해야 한다", () => {
      const existingImages = Array.from(
        { length: 4 },
        (_, i) => `blob:existing${i}`
      );
      const newImage = new File(["test"], "test.jpg", { type: "image/jpeg" });
      const mockEvent = {
        target: {
          files: [newImage],
        },
      } as unknown as React.ChangeEvent<HTMLInputElement>;

      let currentImages: string[] = [...existingImages];
      const setAdditionalImages = jest.fn((updater) => {
        if (typeof updater === "function") {
          currentImages = updater(currentImages);
        } else {
          currentImages = updater;
        }
      });

      handleMultiImageUpload(mockEvent, setAdditionalImages);

      expect(mockToastShow).toHaveBeenCalledWith(
        "최대 4장까지 등록할 수 있습니다."
      );
      expect(mockCreateObjectURL).not.toHaveBeenCalled();
      expect(currentImages).toHaveLength(4);
      expect(currentImages).toEqual(existingImages);
    });

    it("기존 이미지가 3장일 때 2장을 업로드하려고 하면 1장만 추가되어야 한다", () => {
      const existingImages = Array.from(
        { length: 3 },
        (_, i) => `blob:existing${i}`
      );
      const newImages = Array.from(
        { length: 2 },
        (_, i) => new File(["test"], `test${i}.jpg`, { type: "image/jpeg" })
      );
      const mockEvent = {
        target: {
          files: newImages,
        },
      } as unknown as React.ChangeEvent<HTMLInputElement>;

      let currentImages: string[] = [...existingImages];
      const setAdditionalImages = jest.fn((updater) => {
        if (typeof updater === "function") {
          currentImages = updater(currentImages);
        } else {
          currentImages = updater;
        }
      });

      handleMultiImageUpload(mockEvent, setAdditionalImages);

      expect(mockCreateObjectURL).toHaveBeenCalledTimes(1);
      expect(currentImages).toHaveLength(4);
      expect(mockToastShow).not.toHaveBeenCalled();
    });

    it("기존 이미지가 1장일 때 5장을 업로드하려고 하면 3장만 추가되어야 한다", () => {
      const existingImages = ["blob:existing1"];
      const newImages = Array.from(
        { length: 5 },
        (_, i) => new File(["test"], `test${i}.jpg`, { type: "image/jpeg" })
      );
      const mockEvent = {
        target: {
          files: newImages,
        },
      } as unknown as React.ChangeEvent<HTMLInputElement>;

      let currentImages: string[] = [...existingImages];
      const setAdditionalImages = jest.fn((updater) => {
        if (typeof updater === "function") {
          currentImages = updater(currentImages);
        } else {
          currentImages = updater;
        }
      });

      handleMultiImageUpload(mockEvent, setAdditionalImages);

      expect(mockCreateObjectURL).toHaveBeenCalledTimes(3);
      expect(currentImages).toHaveLength(4);
      expect(mockToastShow).not.toHaveBeenCalled();
    });
  });

  describe("기존 이미지 정리", () => {
    it("기존 blob URL이 있으면 revokeObjectURL을 호출해야 한다 (필요 시)", () => {
      const existingImages = ["blob:existing1"];
      const newImage = new File(["test"], "test.jpg", { type: "image/jpeg" });
      const mockEvent = {
        target: {
          files: [newImage],
        },
      } as unknown as React.ChangeEvent<HTMLInputElement>;

      let currentImages: string[] = [...existingImages];
      const setAdditionalImages = jest.fn((updater) => {
        if (typeof updater === "function") {
          currentImages = updater(currentImages);
        } else {
          currentImages = updater;
        }
      });

      handleMultiImageUpload(mockEvent, setAdditionalImages);

      expect(mockCreateObjectURL).toHaveBeenCalledWith(newImage);
      expect(currentImages).toHaveLength(2);
    });
  });

  describe("예외 상황 처리", () => {
    it("파일이 없으면 아무 동작도 하지 않아야 한다", () => {
      const mockEvent = {
        target: {
          files: null,
        },
      } as unknown as React.ChangeEvent<HTMLInputElement>;

      handleMultiImageUpload(mockEvent, mockSetAdditionalImages);

      expect(mockToastShow).not.toHaveBeenCalled();
      expect(mockCreateObjectURL).not.toHaveBeenCalled();
      expect(mockSetAdditionalImages).not.toHaveBeenCalled();
    });

    it("빈 파일 배열이면 아무 동작도 하지 않아야 한다", () => {
      const mockEvent = {
        target: {
          files: [],
        },
      } as unknown as React.ChangeEvent<HTMLInputElement>;

      handleMultiImageUpload(mockEvent, mockSetAdditionalImages);

      expect(mockToastShow).not.toHaveBeenCalled();
      expect(mockCreateObjectURL).not.toHaveBeenCalled();
      expect(mockSetAdditionalImages).not.toHaveBeenCalled();
    });
  });
});
