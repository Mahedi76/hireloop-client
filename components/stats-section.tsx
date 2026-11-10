import Image from "next/image"
import { Search, Star, TrendingUp, UserSearch } from "lucide-react"

import heroGlobe from "@/app/assets/hero-globe.webp"

const stats = [
  { value: "50K", label: "Active Jobs", icon: Search },
  { value: "12K", label: "Companies", icon: TrendingUp },
  { value: "2M", label: "Job Seekers", icon: UserSearch },
  { value: "97%", label: "Satisfaction Rate", icon: Star },
]

/**
 * Live-stats section from the Figma "Homepage" frame ("Assisting over 15,000…"
 * + the 4 gradient stat cards). Intentionally not wired into the page yet —
 * the plan is to build it later. Render <StatsSection /> under <Hero /> to
 * bring it back (the planet-horizon glow ships with it).
 */
export function StatsSection() {
  return (
    <section className="relative isolate overflow-hidden bg-[#010103]">
      {/* planet horizon: glow ring + earth arc rising behind the stats */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-[420px] overflow-hidden sm:h-[500px]"
      >
        <Image
          src={heroGlobe}
          alt=""
          loading="eager"
          className="absolute top-0 left-1/2 w-[121vw] max-w-[1280px] -translate-x-1/2"
        />
      </div>

      <div className="relative mx-auto flex max-w-[1320px] flex-col gap-12 px-4 pt-64 pb-20 sm:px-6 sm:pt-72">
        <p className="mx-auto max-w-[600px] text-center font-heading text-xl font-medium text-white/70 sm:text-2xl md:text-[40px] md:leading-[1.3]">
          Assisting over 15,000 job seekers find their dream positions.
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex h-auto flex-col justify-between gap-12 rounded-2xl border border-white/10 bg-gradient-to-b from-[#010102] to-[#313131] p-6 sm:h-[254px]"
            >
              <stat.icon className="size-6 text-white" aria-hidden />
              <div className="flex flex-col gap-2.5">
                <div className="font-stat text-4xl leading-[1.15] font-semibold tracking-[-0.02em] text-white md:text-[56px]">
                  {stat.value}
                </div>
                <div className="text-base leading-snug text-white md:text-lg md:leading-[1.65]">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
