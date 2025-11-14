import { Variant, Color } from "@/components/Button/types/ButtonTypes";

export interface ModalButtonConfig {
  variant: Variant;
  color: Color;
  id: "cancel" | "confirm";
}

export const MODAL_BUTTON_CONFIG: ModalButtonConfig[] = [
  {
    variant: "outline",
    color: "black",
    id: "cancel",
  },
  {
    variant: "default",
    color: "dark-gray",
    id: "confirm",
  },
];
