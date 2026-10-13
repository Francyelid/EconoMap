import type { NavigationTab } from "@/app/types"

type NavigationIconProps = {
  name: NavigationTab
  active: boolean
}

export default function NavigationIcon({ name, active }: NavigationIconProps) {
  const c = active ? "#3d6648" : "#9c8e7e"
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke={c}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {name === "home" && (
        <>
          <path
            d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"
            fill={active ? "#d4e6d9" : "none"}
          />
          <polyline points="9,22 9,12 15,12 15,22" />
        </>
      )}
      {name === "map" && (
        <>
          <polygon
            points="1,6 1,22 8,18 16,22 23,18 23,2 16,6 8,2"
            fill={active ? "#d4e6d9" : "none"}
          />
          <line x1="8" y1="2" x2="8" y2="18" />
          <line x1="16" y1="6" x2="16" y2="22" />
        </>
      )}
      {name === "prices" && (
        <>
          <rect
            x="2"
            y="2"
            width="20"
            height="20"
            rx="3"
            fill={active ? "#d4e6d9" : "none"}
          />
          <line x1="7" y1="17" x2="7" y2="11" />
          <line x1="12" y1="17" x2="12" y2="5" />
          <line x1="17" y1="17" x2="17" y2="8" />
        </>
      )}
      {name === "list" && (
        <>
          <rect
            x="2"
            y="2"
            width="20"
            height="20"
            rx="3"
            fill={active ? "#d4e6d9" : "none"}
          />
          <line x1="8" y1="8" x2="17" y2="8" />
          <line x1="8" y1="12" x2="17" y2="12" />
          <line x1="8" y1="16" x2="13" y2="16" />
          <circle cx="5.5" cy="8" r="1" fill={c} stroke="none" />
          <circle cx="5.5" cy="12" r="1" fill={c} stroke="none" />
          <circle cx="5.5" cy="16" r="1" fill={c} stroke="none" />
        </>
      )}
      {name === "stock" && (
        <>
          <path
            d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"
            fill={active ? "#d4e6d9" : "none"}
          />
          <polyline points="3.27,6.96 12,12.01 20.73,6.96" />
          <line x1="12" y1="22.08" x2="12" y2="12" />
        </>
      )}
    </svg>
  )
}
