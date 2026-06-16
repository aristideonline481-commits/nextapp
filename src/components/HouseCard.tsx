import { Link } from "@tanstack/react-router";
import { MapPin, Users } from "lucide-react";
import { fmtFCFA } from "@/lib/format";
import { useSignedImage } from "@/lib/useSignedImage";
import { Badge } from "@/components/ui/badge";

export interface HouseSummary {
  id: string;
  title: string;
  house_type: "room" | "studio" | "apartment";
  city: string;
  neighborhood: string;
  rent_fcfa: number;
  max_occupants: number;
  cover_path: string | null;
}

export function HouseCard({ house }: { house: HouseSummary }) {
  const { data: signed } = useSignedImage(house.cover_path);

  return (
    <Link
      to="/listings/$id"
      params={{ id: house.id }}
      className="group flex flex-col overflow-hidden rounded-2xl border bg-card shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-glow"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
        {signed ? (
          <img
            src={signed}
            alt={`${house.house_type} in ${house.neighborhood}`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">no photo</div>
        )}
        <Badge className="absolute left-3 top-3 bg-verified text-verified-foreground capitalize border-0">
          {house.house_type}
        </Badge>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-lg font-semibold leading-tight">{house.title}</h3>
        </div>
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="h-3.5 w-3.5" />
          <span>{house.neighborhood}, {house.city}</span>
        </div>
        <div className="mt-auto flex items-end justify-between pt-2">
          <div>
            <div className="font-display text-xl font-bold text-primary">{fmtFCFA(house.rent_fcfa)}</div>
            <div className="text-xs text-muted-foreground">per month</div>
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Users className="h-3.5 w-3.5" />
            up to {house.max_occupants}
          </div>
        </div>
      </div>
    </Link>
  );
}
