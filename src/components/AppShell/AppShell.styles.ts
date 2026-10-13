import type { CSSProperties } from "react"
import { sharedClasses } from "@/screen/shared/styles"

export const appShellClasses = {
  viewport: "min-h-screen flex items-center justify-center p-0 md:p-6",
  frame: "w-full md:max-w-sm flex flex-col relative overflow-hidden",
  content: sharedClasses.scrollingContent,
} as const

export const appShellStyles = {
  viewport: (dark: boolean): CSSProperties => ({
    background: dark ? "#0d1117" : "#e2e8f0",
  }),
  frame: (dark: boolean): CSSProperties => ({
    background: dark ? "#1a1a2e" : "#ede8df",
    height: "100dvh",
    maxHeight: "100dvh",
  }),
}
