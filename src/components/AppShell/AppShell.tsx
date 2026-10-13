import type { ReactNode } from "react"
import { useDark } from "@/theme"
import StatusBar from "../StatusBar/StatusBar"
import { appShellClasses, appShellStyles } from "./AppShell.styles"

type AppShellProps = {
  children: ReactNode
  navigation?: ReactNode
}

export default function AppShell({ children, navigation }: AppShellProps) {
  const dark = useDark()
  return (
    <div
      className={appShellClasses.viewport}
      style={appShellStyles.viewport(dark)}
    >
      <div className={appShellClasses.frame} style={appShellStyles.frame(dark)}>
        <StatusBar />
        <div className={appShellClasses.content}>{children}</div>
        {navigation}
      </div>
    </div>
  )
}
