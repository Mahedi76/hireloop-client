import { AuthForm } from "@/components/auth-form"

export default function RegisterPage() {
  return (
    <main className="flex flex-1 items-center justify-center bg-[#08080a] px-4 py-16 sm:py-24">
      <AuthForm mode="register" />
    </main>
  )
}
