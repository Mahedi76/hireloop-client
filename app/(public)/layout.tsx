import { Navbar } from "@/components/navbar"

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex min-h-svh flex-col">
      <Navbar />
      {children}
    </div>
  )
}
