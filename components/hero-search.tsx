"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"

import { LoaderCircleIcon, MapPin, Search, SearchIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

/**
 * The hero search bar. Client component so the two fields are fully
 * controlled inputs (useState) and the submit navigates through the
 * app router (useRouter + useTransition for the pending state).
 */
export function HeroSearch() {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const [query, setQuery] = useState("")
  const [location, setLocation] = useState("")

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const params = new URLSearchParams()
    if (query.trim()) params.set("query", query.trim())
    if (location.trim()) params.set("location", location.trim())
    const search = params.toString()
    const href = search ? `/jobs?${search}` : "/jobs"

    startTransition(() => {
      router.push(href)
    })
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full flex-col gap-3 rounded-2xl border border-white/20 bg-[#101010] p-3 sm:flex-row sm:items-center sm:gap-4 sm:p-2 sm:pl-6"
    >
      <label className="flex flex-1 items-center gap-2">
        <span className="sr-only">Job title, skill or company</span>
        <Search
          className="size-5 shrink-0 text-white/90 sm:size-6"
          aria-hidden
        />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Job title, skill or company"
          className="h-10 w-full min-w-0 bg-transparent text-base text-white placeholder:text-white/60 focus:outline-none"
        />
      </label>

      <div
        className="hidden h-6 w-px shrink-0 bg-white/20 sm:block"
        aria-hidden
      />

      <label className="flex flex-1 items-center gap-2">
        <span className="sr-only">Location or Remote</span>
        <MapPin
          className="size-5 shrink-0 text-white/90 sm:size-6"
          aria-hidden
        />
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Location or Remote"
          className="h-10 w-full min-w-0 bg-transparent text-base text-white placeholder:text-white/60 focus:outline-none"
        />
      </label>

      <Button
        type="submit"
        size="icon"
        aria-label="Search jobs"
        disabled={isPending}
        className="size-12 shrink-0 rounded-xl bg-primary hover:bg-primary/90 sm:ml-2"
      >
        {isPending ? (
          <LoaderCircleIcon className="size-6 animate-spin" />
        ) : (
          <SearchIcon className="size-6" />
        )}
      </Button>
    </form>
  )
}
