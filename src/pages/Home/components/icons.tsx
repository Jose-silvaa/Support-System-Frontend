import type { SVGProps } from "react"

function IconBase(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    />
  )
}

export function ReportIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase {...props}>
      <path d="M5 3v18" />
      <path d="M5 4h11l-2 3.5L16 11H5" />
    </IconBase>
  )
}

export function TrackIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase {...props}>
      <path d="M3 3v18h18" />
      <path d="M7 15l3.5-4.5 3 3L19 7" />
    </IconBase>
  )
}

export function OrganizeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase {...props}>
      <rect x="3.5" y="4" width="17" height="4.5" rx="1" />
      <rect x="3.5" y="10.75" width="17" height="4.5" rx="1" />
      <rect x="3.5" y="17.5" width="17" height="4.5" rx="1" />
    </IconBase>
  )
}

export function ResolveIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12.5l2.5 2.5L16 9.5" />
    </IconBase>
  )
}
