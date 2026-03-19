import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "P2Z Admin — Convert",
  description: "Admin conversion tool",
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
