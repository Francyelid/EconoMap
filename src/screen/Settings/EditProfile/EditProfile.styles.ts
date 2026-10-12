import type { CSSProperties } from "react"
import type { dmPalette } from "@/theme"

export const editProfileClasses = {
  sheet: "w-full flex flex-col",
  header: "flex-shrink-0 px-5 pt-5 pb-4",
  closeButton: "w-8 h-8 rounded-full flex items-center justify-center",
  title: "font-bold text-base text-white flex-1",
  content: "flex-1 overflow-y-auto px-5 py-5 space-y-4",
  avatarSection: "flex flex-col items-center gap-2 pb-2",
  photo: "w-20 h-20 rounded-full object-cover",
  placeholderPhoto:
    "w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold",
  photoPicker:
    "absolute -bottom-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center cursor-pointer",
  photoIcon: "text-sm",
  hiddenInput: "hidden",
  input: "w-full rounded-xl px-4 py-2.5 text-sm outline-none",
  footer: "px-5 pb-8 flex-shrink-0 space-y-2",
  cancelButton: "w-full py-3 rounded-2xl font-semibold text-sm",
} as const

export const editProfileStyles = {
  sheet: (pal: ReturnType<typeof dmPalette>): CSSProperties => ({
    height: "90%",
    background: pal.card,
    borderRadius: "24px 24px 0 0",
  }),
  header: {
    background: "linear-gradient(135deg, #2c4e37 0%, #3d6648 100%)",
    borderRadius: "24px 24px 0 0",
  } satisfies CSSProperties,

  placeholderPhoto: {
    background: "#e8a530",
    color: "#fff",
  } satisfies CSSProperties,
  photoPicker: { background: "#3d6648" } satisfies CSSProperties,
  saveButton: {
    background: "linear-gradient(135deg, #3d6648, #2c4e37)",
    boxShadow: "0 4px 16px #3d664844",
  } satisfies CSSProperties,
}
