export const ACTIVITY_TYPE_SELECTOR_OPTIONS = [
  {
    label: "온라인",
    value: "online",
  },
  {
    label: "직접 만나기",
    value: "in-person",
  },
] as const;

export type ActivityType =
  (typeof ACTIVITY_TYPE_SELECTOR_OPTIONS)[number]["value"];
