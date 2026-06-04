"use client"

import { usePathname } from "next/navigation"
import Navbar from "@/components/navbar"

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode
}) {

  const pathname = usePathname()

  const isAdminPage = pathname.startsWith("/admin")

  return (
    <>
      {!isAdminPage && <Navbar />}

      <div id="main-content">
        {children}
      </div>
    </>
  )
}