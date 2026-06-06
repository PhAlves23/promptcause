import Image from "next/image";
import { cn } from "@/lib/utils";

/** PromptCause logo: the "<3" mark image + the wordmark. */
export function BrandLogo({
  className,
  variant = "default",
}: {
  className?: string;
  variant?: "default" | "footer";
}) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <Image
        src="/promptcauselogo-mark.png"
        alt=""
        width={34}
        height={34}
        className="size-[30px] object-contain"
      />
      <span
        className={cn(
          "font-display text-[1.32rem] font-semibold leading-none tracking-tight",
          variant === "footer" ? "text-white" : "text-ink",
        )}
      >
        Prompt
        <b
          className={cn(
            "font-semibold",
            variant === "footer" ? "text-green-bright" : "text-green",
          )}
        >
          Cause
        </b>
      </span>
    </span>
  );
}
