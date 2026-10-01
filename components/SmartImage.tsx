import Image from "next/image";
import { USE_REAL_IMAGES } from "@/lib/config";

type Props = {
  src: string;
  alt: string;
  palette?: [string, string];
  /** Small caption shown on the placeholder so you know which file goes where */
  label?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

/**
 * Renders the real photo when USE_REAL_IMAGES is on, otherwise a soft
 * gradient placeholder. Always fills its (relatively positioned) parent.
 */
export default function SmartImage({
  src,
  alt,
  palette = ["#5a1a2b", "#b08d57"],
  label,
  className = "",
  sizes = "100vw",
  priority,
}: Props) {
  if (USE_REAL_IMAGES) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={`object-cover ${className}`}
      />
    );
  }
  const [a, b] = palette;
  return (
    <div
      role="img"
      aria-label={alt}
      className={`absolute inset-0 ${className}`}
      style={{
        background: `radial-gradient(120% 90% at 20% 10%, ${b}cc 0%, transparent 55%),
          radial-gradient(100% 80% at 90% 100%, ${a} 0%, transparent 60%),
          linear-gradient(160deg, ${a}, ${b})`,
      }}
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.12] mix-blend-overlay"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #fff 0 1px, transparent 1px 12px), repeating-linear-gradient(-45deg, #fff 0 1px, transparent 1px 12px)",
        }}
      />
      {label && (
        <span className="absolute bottom-2 left-2 max-w-[90%] truncate rounded-sm bg-black/25 px-1.5 py-0.5 font-mono text-[9px] text-white/80">
          {label}
        </span>
      )}
    </div>
  );
}
