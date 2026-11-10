import Image from "next/image"
import Link from "next/link"
import { BriefcaseBusiness } from "lucide-react"

import { HeroSearch } from "@/components/hero-search"
import heroDots from "@/app/assets/hero-dots.png"

const trending = ["Product Designer", "AI Engineering", "DevOps Engineer"]

function Badge() {
  return (
    <div className="flex items-center justify-center gap-6">
      <div className="h-px w-10 shrink-0 bg-gradient-to-r from-transparent via-primary to-primary sm:w-16" />
      <div
        className="rounded-full p-px"
        style={{
          backgroundImage:
            "conic-gradient(from 150deg, #5c53fe, #d102c9, #8f8bff, #5c53fe)",
        }}
      >
        <div className="flex items-center gap-3 rounded-full bg-[#0a0a0d] px-6 py-3">
          <BriefcaseBusiness className="size-6 text-white" aria-hidden />
          <span className="font-badge text-lg leading-none text-white md:text-xl">
            50,000+ new jobs this month
          </span>
        </div>
      </div>
      <div className="h-px w-10 shrink-0 bg-gradient-to-l from-transparent via-primary to-primary sm:w-16" />
    </div>
  )
}

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-[#010103]">
      {/* Ambient background layers (decoded from the Figma "Homepage" frame) */}
      <div aria-hidden className="absolute inset-0 -z-10">
        {/* purple wash, strongest up top-left behind the headline */}
        <div className="absolute -top-24 left-1/2 h-[560px] w-[1100px] max-w-[160vw] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(92,83,254,0.5),rgba(92,83,254,0.18),transparent)] blur-2xl" />

        {/* particle dots texture below the search bar */}
        <Image
          src={heroDots}
          alt=""
          loading="eager"
          className="absolute top-[38%] left-1/2 w-[92%] max-w-none -translate-x-1/2 opacity-50"
        />
      </div>

      {/* Hero content */}
      <div className="flex flex-col items-center gap-8 px-4 pt-16 pb-40 sm:pt-24 md:gap-12">
        <Badge />

        <div className="flex flex-col items-center gap-4 text-center">
          <h1 className="max-w-[700px] font-heading text-4xl leading-[1.15] font-bold tracking-[-0.02em] text-balance text-white sm:text-5xl md:text-[56px]">
            Find Your Dream Job Today
          </h1>
          <p className="max-w-[780px] text-lg leading-relaxed text-white/70 md:text-xl md:leading-[1.6]">
            HireLoop connects top talent with world-class companies. Browse
            thousands of curated opportunities and land your next role — faster.
          </p>
        </div>

        <div className="w-full max-w-[784px]">
          <HeroSearch />

          {/* Trending positions */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <span className="text-sm text-white/70 md:text-base">
              Trending Position
            </span>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {trending.map((t) => (
                <Link
                  key={t}
                  href={`/jobs?query=${encodeURIComponent(t)}`}
                  className="rounded-full border border-white/10 bg-[#1a1a1b] px-3 py-1.5 text-sm text-white transition-colors hover:border-white/25"
                >
                  {t}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
