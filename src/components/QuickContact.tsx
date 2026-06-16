import { Phone, MessageCircle } from "lucide-react";

const TEAM_PHONE_DISPLAY = "+221 07 88 74 26 19";
const TEAM_PHONE_TEL = "+2210788742619";
const TEAM_PHONE_WA = "2210788742619";

export function QuickContact({
  variant = "card",
  message,
}: {
  variant?: "card" | "inline";
  message?: string;
}) {
  const waText = encodeURIComponent(message ?? "Hi NeXtpaSs team, I'd like a quick help finding a room.");
  const waHref = `https://wa.me/${TEAM_PHONE_WA}?text=${waText}`;
  const telHref = `tel:${TEAM_PHONE_TEL}`;

  if (variant === "inline") {
    return (
      <div className="flex flex-wrap items-center gap-2">
        <a
          href={telHref}
          className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-ink hover:bg-muted"
        >
          <Phone className="h-3.5 w-3.5" /> Call team
        </a>
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full bg-verified px-3 py-1.5 text-xs font-medium text-verified-foreground hover:bg-verified/90"
        >
          <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
        </a>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4 sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wide text-primary">Need a room fast?</div>
          <p className="mt-1 text-sm text-ink/80">
            Call or WhatsApp the NeXtpaSs team directly — we'll match you to a room and guide the visit.
          </p>
          <div className="mt-1 font-display text-sm font-semibold text-ink">{TEAM_PHONE_DISPLAY}</div>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        <a
          href={telHref}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-border bg-card px-4 py-2.5 text-sm font-medium text-ink hover:bg-muted"
        >
          <Phone className="h-4 w-4" /> Call now
        </a>
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-verified px-4 py-2.5 text-sm font-medium text-verified-foreground hover:bg-verified/90"
        >
          <MessageCircle className="h-4 w-4" /> WhatsApp us
        </a>
      </div>
    </div>
  );
}
