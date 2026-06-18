import { Link } from "@tanstack/react-router";
import { MapPin, Users, Heart, Wifi } from "lucide-react";
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
      className="group flex flex-col overflow-hidden rounded-[20px] bg-card shadow-sm border border-border/40 transition-all hover:-translate-y-0.5 hover:shadow-glow"
    >
      <div className="relative h-48 w-full overflow-hidden bg-muted">
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
        <button className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full hover:bg-black/10 transition-colors z-10">
          <Heart className="h-5 w-5 text-white stroke-[2.5px] drop-shadow-md" />
        </button>
      </div>
      <div className="flex flex-1 flex-col p-4 pb-5 gap-3">
        <div>
          <h3 className="font-sans text-[17px] font-bold leading-tight text-ink">{house.title}</h3>
          <div className="mt-1.5 flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" />
            <span>{house.neighborhood}, {house.city}</span>
          </div>
        </div>
        
        <div>
          <span className="font-sans text-[17px] font-bold text-primary">{fmtFCFA(house.rent_fcfa)}</span>
          <span className="text-sm text-muted-foreground font-medium ml-1">/ month</span>
        </div>

        <div className="flex flex-wrap items-center gap-2 mt-auto pt-1">
          <div className="flex items-center gap-1.5 bg-accent/60 text-ink text-xs font-semibold rounded-md px-2.5 py-1.5">
            <Users className="h-3.5 w-3.5 text-muted-foreground" />
            {house.max_occupants} Room{house.max_occupants !== 1 ? 's' : ''}
          </div>
          <div className="flex items-center gap-1.5 bg-accent/60 text-ink text-xs font-semibold rounded-md px-2.5 py-1.5">
            <Wifi className="h-3.5 w-3.5 text-muted-foreground" />
            Wi-Fi
          </div>
        </div>
      </div>
    </Link>
  );
}
