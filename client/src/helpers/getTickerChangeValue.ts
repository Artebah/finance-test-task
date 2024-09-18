import { ChangeValue } from "../types/ChangeValue";

export function getTickerChangeValue(change: number): ChangeValue {
  if (change > 0) {
    return "increase";
  } else if (change < 0) {
    return "decrease";
  } else {
    return "none";
  }
}
