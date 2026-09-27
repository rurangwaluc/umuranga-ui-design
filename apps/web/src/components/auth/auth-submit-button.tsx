import { Loader2 } from "lucide-react";

type AuthSubmitButtonProps = {
  children: React.ReactNode;
  loading?: boolean;
};

export function AuthSubmitButton({
  children,
  loading = false,
}: AuthSubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="inline-flex h-[52px] w-full items-center justify-center gap-2 rounded-[9px] border border-[#08285F] bg-[#08285F] px-6 text-[15px] font-black text-white shadow-[inset_0_-2px_0_#D7B16F] transition duration-200 hover:-translate-y-0.5 hover:bg-[#0A326F] disabled:cursor-not-allowed disabled:opacity-70 dark:border-[#08285F] dark:bg-[#08285F] dark:text-white"
    >
      {loading ? <Loader2 size={17} className="animate-spin" /> : null}
      {children}
    </button>
  );
}
