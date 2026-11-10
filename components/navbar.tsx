"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { MenuIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

const navLinks = [
  { label: "Browse Jobs", href: "/jobs" },
  { label: "Company", href: "/companies" },
  { label: "Pricing", href: "/pricing" },
]

function isActiveHref(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`)
}

function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="HireLoop home"
      className={cn("inline-flex shrink-0 items-center", className)}
    >
      <Image
        src="/logo.png"
        alt="HireLoop"
        width={154}
        height={44}
        priority
        className="h-10 w-auto sm:h-11"
      />
    </Link>
  )
}

const linkClassName =
  "text-base text-[#ededea]/90 transition-colors hover:text-white"

function NavbarLinks({ className }: { className?: string }) {
  const pathname = usePathname()

  return (
    <nav
      aria-label="Main"
      className={cn("flex items-center gap-10", className)}
    >
      {navLinks.map((link) => {
        const active = isActiveHref(pathname, link.href)

        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(linkClassName, active && "font-semibold text-white")}
            aria-current={active ? "page" : undefined}
          >
            {link.label}
          </Link>
        )
      })}
    </nav>
  )
}

function NavbarActions({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-4", className)}>
      <Button
        variant="outline"
        nativeButton={false}
        className="h-12 rounded-xl bg-white px-6 text-base font-semibold text-primary hover:bg-white/90"
        render={<Link href="/login" />}
      >
        Sign In
      </Button>
      <Button
        nativeButton={false}
        className="h-12 rounded-xl px-6 text-base font-medium hover:bg-primary/90"
        render={<Link href="/register" />}
      >
        Get Started
      </Button>
    </div>
  )
}

function MobileLinks() {
  const pathname = usePathname()

  return (
    <>
      {navLinks.map((link) => {
        const active = isActiveHref(pathname, link.href)

        return (
          <SheetClose
            key={link.href}
            nativeButton={false}
            render={
              <Link
                href={link.href}
                className={cn(
                  "flex w-full items-center justify-between rounded-lg px-3 py-3 text-left text-lg transition-colors hover:bg-white/5",
                  active && "font-semibold text-white"
                )}
                aria-current={active ? "page" : undefined}
              />
            }
          >
            {link.label}
          </SheetClose>
        )
      })}
    </>
  )
}

export function Navbar() {
  return (
    <header className="w-full px-3 pt-3 sm:px-6 sm:pt-6">
      <div className="mx-auto flex h-16 w-full max-w-[1320px] items-center justify-between rounded-2xl border border-white/10 bg-[#222222] pr-3 pl-5 sm:h-[74px] sm:pr-4 sm:pl-6">
        <Logo />

        {/* Desktop */}
        <div className="hidden items-center gap-6 lg:flex">
          <NavbarLinks />
          <Separator orientation="vertical" className="h-6 bg-[#a8a8a8]/40" />
          <NavbarActions />
        </div>

        {/* Mobile */}
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger
              render={
                <Button
                  variant="outline"
                  size="icon"
                  aria-label="Open menu"
                  className="rounded-xl border-white/10 bg-transparent text-[#ededea] hover:bg-white/10"
                />
              }
            >
              <MenuIcon />
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-80 max-w-[85vw] gap-0 border-white/10 bg-[#222222] p-0 text-[#ededea]"
            >
              <SheetHeader className="w-full border-b border-white/10 p-5">
                <Link
                  href="/"
                  aria-label="HireLoop home"
                  className="inline-flex"
                >
                  <Image
                    src="/logo.png"
                    alt="HireLoop"
                    width={138}
                    height={40}
                    className="h-9 w-auto"
                  />
                </Link>
              </SheetHeader>

              <nav
                aria-label="Mobile"
                className="flex min-h-0 flex-1 flex-col px-3 pt-3"
              >
                <MobileLinks />
              </nav>

              <SheetFooter className="items-stretch gap-3 border-t border-white/10 p-5">
                <Button
                  variant="outline"
                  nativeButton={false}
                  className="h-12 w-full rounded-xl bg-white text-base font-semibold text-primary hover:bg-white/90"
                  render={
                    <SheetClose
                      nativeButton={false}
                      render={<Link href="/login" />}
                    />
                  }
                >
                  Sign In
                </Button>
                <Button
                  nativeButton={false}
                  className="h-12 w-full rounded-xl text-base font-medium hover:bg-primary/90"
                  render={
                    <SheetClose
                      nativeButton={false}
                      render={<Link href="/register" />}
                    />
                  }
                >
                  Get Started
                </Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
