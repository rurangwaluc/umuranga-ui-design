"use client";

type SocialProvider = "google" | "facebook" | "apple";

type SocialAuthButtonProps = {
  provider: SocialProvider;
  onClick: (provider: SocialProvider) => void;
};

const providerLabel: Record<SocialProvider, string> = {
  google: "Continue with Google",
  facebook: "Continue with Facebook",
  apple: "Continue with Apple",
};

function GoogleMark() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-[17px] w-[17px]">
      <path fill="#4285F4" d="M21.6 12.23c0-.73-.06-1.26-.18-1.81H12v3.41h5.53c-.11.85-.71 2.13-2.05 2.99l-.02.11 2.98 2.12.21.02c1.92-1.63 2.95-4.03 2.95-6.84Z" />
      <path fill="#34A853" d="M12 21c2.74 0 5.04-.82 6.72-2.23l-3.2-2.28c-.86.55-2.01.93-3.52.93-2.68 0-4.95-1.63-5.76-3.88l-.12.01-3.1 2.21-.04.1C4.65 18.91 8.06 21 12 21Z" />
      <path fill="#FBBC05" d="M6.24 13.54A5.3 5.3 0 0 1 5.96 12c0-.53.1-1.05.27-1.54l-.01-.11-3.14-2.24-.1.04A8.53 8.53 0 0 0 2 12c0 1.38.36 2.68.98 3.85l3.26-2.31Z" />
      <path fill="#EA4335" d="M12 6.58c1.9 0 3.18.75 3.91 1.38l2.86-2.56C17.02 3.9 14.74 3 12 3 8.06 3 4.65 5.09 2.98 8.15l3.25 2.31C7.05 8.21 9.32 6.58 12 6.58Z" />
    </svg>
  );
}

function FacebookMark() {
  return (
    <span className="grid h-[17px] w-[17px] place-items-center rounded-full bg-[#1877F2] text-[12px] font-black leading-none text-white">
      f
    </span>
  );
}

function AppleMark() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-[17px] w-[17px] fill-current">
      <path d="M16.54 12.86c-.02-2.21 1.8-3.27 1.88-3.32-1.03-1.5-2.63-1.7-3.2-1.72-1.36-.14-2.65.8-3.34.8-.69 0-1.75-.78-2.88-.76-1.48.02-2.85.86-3.61 2.19-1.54 2.67-.39 6.62 1.11 8.79.74 1.06 1.62 2.26 2.77 2.22 1.11-.04 1.53-.72 2.88-.72s1.72.72 2.9.7c1.2-.02 1.96-1.08 2.69-2.15.85-1.24 1.2-2.44 1.22-2.5-.03-.01-2.39-.91-2.42-3.53ZM14.33 6.39c.61-.74 1.02-1.77.91-2.79-.88.04-1.94.59-2.57 1.33-.56.65-1.05 1.7-.92 2.7.98.08 1.97-.5 2.58-1.24Z" />
    </svg>
  );
}

function ProviderMark({ provider }: { provider: SocialProvider }) {
  if (provider === "google") return <GoogleMark />;
  if (provider === "facebook") return <FacebookMark />;
  return <AppleMark />;
}

export function SocialAuthButton({ provider, onClick }: SocialAuthButtonProps) {
  return (
    <button
      type="button"
      onClick={() => onClick(provider)}
      className="group flex h-[49px] w-full items-center justify-center gap-3 rounded-[9px] border border-[var(--line)] bg-[var(--card)] px-4 text-sm font-black text-[var(--foreground)] transition duration-200 hover:-translate-y-0.5 hover:border-[#D7B16F]/65 hover:bg-[var(--soft)] hover:shadow-[inset_0_-2px_0_#D7B16F] dark:bg-white/[0.035] dark:hover:border-[#D7B16F]/55 dark:hover:bg-white/[0.06]"
    >
      <span className="grid h-8 w-8 place-items-center rounded-full border border-[var(--line)] bg-[var(--surface)] text-[var(--foreground)] dark:border-white/10 dark:bg-white/[0.06]">
        <ProviderMark provider={provider} />
      </span>
      <span className="min-w-[170px] text-left">{providerLabel[provider]}</span>
    </button>
  );
}
