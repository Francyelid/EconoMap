import { sharedClasses } from "@/screen/shared/styles"
export const authFieldsClasses = {
  passwordHeader: "flex items-center justify-between",
  passwordInput: `${sharedClasses.authInput} pr-12`,
  visibilityButton:
    "absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold px-1",
} as const
