import Image from "next/image";
import { Loader2 } from "lucide-react";

type AuthRedirectStateProps = {
  title: string;
  message: string;
};

export function AuthRedirectState({
  title,
  message,
}: AuthRedirectStateProps) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--background)] px-5 text-[var(--foreground)]">
      <section className="w-full max-w-[520px]">
        <Image
          src="/images/umuranga-logo-gold-light.png"
          alt="UMURANGA"
          width={424}
          height={100}
          priority
          className="h-[48px] w-auto object-contain dark:hidden"
        />

        <Image
          src="/images/umuranga-logo-gold.png"
          alt="UMURANGA"
          width={424}
          height={100}
          priority
          className="hidden h-[48px] w-auto object-contain dark:block"
        />

        <div className="mt-10 border-t border-[#D7B16F]/70 pt-8">
          <h1 className="text-3xl font-semibold leading-[1.06] tracking-[-0.045em] sm:text-4xl">
            {title}
          </h1>

          <p className="mt-4 max-w-md text-sm font-semibold leading-7 text-[var(--muted)] sm:text-[15px]">
            {message}
          </p>

          <div
            aria-live="polite"
            className="mt-8 flex items-center gap-3 border-t border-[var(--line)] pt-5 text-sm font-bold text-[var(--foreground)]"
          >
            <Loader2
              size={17}
              className="animate-spin text-[#D7B16F] motion-reduce:animate-none"
            />
            Preparing your workspace
          </div>
        </div>
      </section>
    </main>
  );
}
