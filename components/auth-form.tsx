"use client"

import { useState } from "react"
import Link from "next/link"
import { EyeIcon, EyeOffIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

/**
 * The shared sign-in / sign-up form. Pure UI — the submit handler only
 * collects the form data (logs it for now); real auth will be plugged in
 * later where the TODO comment sits.
 */

type AuthMode = "login" | "register"

const config = {
  login: {
    title: "Welcome back",
    subtitle: "Sign in to continue your job search.",
    submitLabel: "Sign In",
    footerLabel: "New to HireLoop?",
    footerLinkLabel: "Create an account",
    footerHref: "/register",
  },
  register: {
    title: "Create your account",
    subtitle: "Start finding your dream job today.",
    submitLabel: "Create Account",
    footerLabel: "Already have an account?",
    footerLinkLabel: "Sign in",
    footerHref: "/login",
  },
} as const

const inputClassName =
  "h-12 w-full rounded-xl border border-white/15 bg-white/5 px-4 text-base text-white outline-none transition-colors placeholder:text-white/40 focus:border-primary/60 focus:bg-white/10"

/** Labeled text input (name, email, password, …). */
function Field({
  label,
  ...props
}: React.ComponentPropsWithoutRef<"input"> & { label: string }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={props.name} className="text-sm font-medium text-white/80">
        {label}
      </label>
      <input
        id={props.name}
        {...props}
        className={cn(inputClassName, props.className)}
      />
    </div>
  )
}

/** The Sign In / Sign Up pill that toggles between the two pages. */
function AuthToggle({ mode }: { mode: AuthMode }) {
  return (
    <div
      className="grid grid-cols-2 gap-1 rounded-xl border border-white/10 bg-white/5 p-1"
      role="group"
      aria-label="Toggle between sign in and sign up"
    >
      <Link
        href="/login"
        aria-current={mode === "login" ? "page" : undefined}
        className={cn(
          "flex h-10 items-center justify-center rounded-lg text-sm font-medium transition-colors",
          mode === "login"
            ? "bg-primary text-white"
            : "text-white/60 hover:text-white"
        )}
      >
        Sign In
      </Link>
      <Link
        href="/register"
        aria-current={mode === "register" ? "page" : undefined}
        className={cn(
          "flex h-10 items-center justify-center rounded-lg text-sm font-medium transition-colors",
          mode === "register"
            ? "bg-primary text-white"
            : "text-white/60 hover:text-white"
        )}
      >
        Sign Up
      </Link>
    </div>
  )
}

export function AuthForm({ mode }: { mode: AuthMode }) {
  const c = config[mode]

  // password show / hide toggle
  const [showPassword, setShowPassword] = useState(false)

  /**
   * Collects all form fields into a plain object.
   * TODO: pass `data` to the auth API when the functionality is added.
   */
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const data = Object.fromEntries(new FormData(event.currentTarget))
    console.log(`${mode} form data:`, data)
  }

  return (
    <div className="w-full max-w-[420px] rounded-2xl border border-white/10 bg-[#101010] p-6 sm:p-8">
      <AuthToggle mode={mode} />

      <div className="mt-8 flex flex-col items-center gap-2 text-center">
        <h1 className="font-heading text-2xl font-bold tracking-[-0.02em] text-white sm:text-3xl">
          {c.title}
        </h1>
        <p className="text-sm text-white/70 sm:text-base">{c.subtitle}</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-8 flex flex-col gap-5"
        noValidate={false}
      >
        {/* Name — only on the sign-up page */}
        {mode === "register" && (
          <Field
            label="Full name"
            name="name"
            type="text"
            placeholder="Your full name"
            autoComplete="name"
            required
          />
        )}

        <Field
          label="Email"
          name="email"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          required
        />

        {/* Password with a show / hide button on the right */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="password"
            className="text-sm font-medium text-white/80"
          >
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              autoComplete={
                mode === "login" ? "current-password" : "new-password"
              }
              required
              className={cn(inputClassName, "pr-12")}
            />
            <button
              type="button"
              onClick={() => setShowPassword((shown) => !shown)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute top-1/2 right-3 -translate-y-1/2 text-white/50 transition-colors hover:text-white"
            >
              {showPassword ? (
                <EyeOffIcon className="size-5" aria-hidden />
              ) : (
                <EyeIcon className="size-5" aria-hidden />
              )}
            </button>
          </div>
        </div>

        <Button
          type="submit"
          className="mt-2 h-12 w-full rounded-xl text-base font-medium hover:bg-primary/90"
        >
          {c.submitLabel}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-white/60">
        {c.footerLabel}{" "}
        <Link
          href={c.footerHref}
          className="font-medium text-primary hover:underline"
        >
          {c.footerLinkLabel}
        </Link>
      </p>
    </div>
  )
}
