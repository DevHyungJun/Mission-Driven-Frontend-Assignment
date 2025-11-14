export const CATEGORY_LIST = [
  {
    id: 1,
    name: "용돈벌기",
  },
  {
    id: 2,
    name: "디지털",
  },
  {
    id: 3,
    name: "그림",
  },
  {
    id: 4,
    name: "글쓰기/독서",
  },
  {
    id: 5,
    name: "건강/운동",
  },
  {
    id: 6,
    name: "동기부여",
  },
  {
    id: 7,
    name: "취미힐링",
  },
  {
    id: 8,
    name: "외국어",
  },
] as const;

export type CategoryId = (typeof CATEGORY_LIST)[number]["id"];
export type CategoryName = (typeof CATEGORY_LIST)[number]["name"];

export const getCategoryById = (id: CategoryId) => {
  return CATEGORY_LIST.find((category) => category.id === id);
};
