import { Phone, CheckCircle2 } from "lucide-react";

export type MarketItemSummary = {
  id: string;
  title: string;
  price_fcfa: number;
  city: string;
  neighborhood: string;
  poster_name: string;
  poster_phone: string;
  cover_path: string | null;
  status: "available" | "sold";
  created_at: any;
};

export function MarketCard({ item }: { item: MarketItemSummary }) {
  const isAvailable = item.status === "available";

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-3xl border bg-card shadow-sm transition-all hover:shadow-md h-[400px]">
      <div className="relative h-56 w-full shrink-0 overflow-hidden bg-accent/40">
        {item.cover_path ? (
          <img
            src={item.cover_path}
            alt={item.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-muted-foreground text-sm font-medium">
            No image
          </div>
        )}
        
        {/* Price Badge */}
        <div className="absolute bottom-3 left-3 flex items-center rounded-full bg-white/95 px-3 py-1.5 text-sm font-bold shadow-sm backdrop-blur-md">
          {item.price_fcfa.toLocaleString("en-US")} FCFA
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex-1">
          <h3 className="line-clamp-2 text-lg font-bold leading-tight">{item.title}</h3>
          <p className="mt-1 text-sm text-muted-foreground font-medium">
            {item.neighborhood}, {item.city}
          </p>
        </div>

        <div className="mt-4 pt-4 border-t flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
              <span className="text-xs font-bold uppercase">{item.poster_name.slice(0, 2)}</span>
            </div>
            <div className="text-sm font-medium truncate">{item.poster_name}</div>
          </div>
          
          {isAvailable ? (
            <a 
              href={`tel:${item.poster_phone}`} 
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-2.5 text-sm font-bold text-primary-foreground shadow-sm transition-transform hover:scale-[1.02] active:scale-95"
            >
              <Phone className="h-4 w-4" />
              Contact Seller
            </a>
          ) : (
            <div className="flex w-full items-center justify-center gap-2 rounded-xl bg-secondary py-2.5 text-sm font-bold text-muted-foreground">
              <CheckCircle2 className="h-4 w-4" />
              Sold
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
