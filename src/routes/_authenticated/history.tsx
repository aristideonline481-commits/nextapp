import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { db } from "@/integrations/firebase/client";
import { collection, query, where, documentId, getDocs } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Loader2, Heart, Clock, MapPin, Search } from "lucide-react";
import { fmtFCFA } from "@/lib/format";
import { useState, useEffect } from "react";

export const Route = createFileRoute("/_authenticated/history")({
  head: () => ({ meta: [{ title: "History & Favorites — NeXtpaSs" }] }),
  component: HistoryFavorites,
});

function HistoryFavorites() {
  const [historyIds, setHistoryIds] = useState<string[]>([]);
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<"favorites_first" | "recent_first">("favorites_first");

  useEffect(() => {
    try {
      const h = JSON.parse(localStorage.getItem("nextpass_history") || "[]");
      const f = JSON.parse(localStorage.getItem("nextpass_favorites") || "[]");
      setHistoryIds(h);
      setFavoriteIds(f);
    } catch (e) {}
  }, []);

  const { data: houses, isLoading } = useQuery({
    queryKey: ["history-houses", historyIds],
    enabled: historyIds.length > 0,
    queryFn: async () => {
      const batches = [];
      // Firestore 'in' query supports max 10 elements.
      for (let i = 0; i < historyIds.length; i += 10) {
        const batch = historyIds.slice(i, i + 10);
        batches.push(getDocs(query(collection(db, "houses"), where(documentId(), "in", batch))));
      }
      const snapshots = await Promise.all(batches);
      return snapshots.flatMap(snap => snap.docs.map(doc => ({ id: doc.id, ...doc.data() as any })));
    },
  });

  const toggleFavorite = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    setFavoriteIds(prev => {
      const next = prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id];
      localStorage.setItem("nextpass_favorites", JSON.stringify(next));
      return next;
    });
  };

  const sortedHouses = [...(houses || [])].sort((a, b) => {
    if (sortBy === "favorites_first") {
      const aFav = favoriteIds.includes(a.id);
      const bFav = favoriteIds.includes(b.id);
      if (aFav && !bFav) return -1;
      if (!aFav && bFav) return 1;
    }
    // Sort by recent first in history array
    return historyIds.indexOf(b.id) - historyIds.indexOf(a.id);
  });

  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="font-display text-3xl font-semibold sm:text-4xl">History & Favorites</h1>
        
        {historyIds.length > 0 && (
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value as any)}
            className="h-10 rounded-full border bg-background px-4 text-sm font-medium outline-none transition-colors focus:border-primary"
          >
            <option value="favorites_first">Favorites First</option>
            <option value="recent_first">Most Recent</option>
          </select>
        )}
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>
      ) : sortedHouses.length === 0 ? (
        <div className="mt-10 rounded-3xl border border-dashed border-border bg-card p-12 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-muted mb-4">
            <Search className="h-8 w-8 text-muted-foreground" />
          </div>
          <p className="font-display text-2xl font-semibold tracking-tight">No history yet</p>
          <p className="mt-2 text-muted-foreground max-w-sm mx-auto">Rooms you view or favorite will appear here so you can easily find them later.</p>
          <Link to="/browse">
            <Button className="mt-6 rounded-full px-8 shadow-sm">Browse Rooms</Button>
          </Link>
        </div>
      ) : (
        <div className="mt-8 space-y-4">
          {sortedHouses.map((h) => {
            const isFav = favoriteIds.includes(h.id);
            return (
              <Link 
                key={h.id} 
                to="/listings/$id" 
                params={{ id: h.id }} 
                className="group relative flex flex-col sm:flex-row gap-4 overflow-hidden rounded-2xl border bg-card p-4 transition-all hover:shadow-md hover:border-primary/50"
              >
                <div className="flex flex-1 flex-col justify-center">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                    <span className="capitalize font-medium text-foreground">{h.house_type}</span>
                    <span>•</span>
                    <MapPin className="h-3 w-3" />
                    <span>{h.neighborhood}, {h.city}</span>
                  </div>
                  <h3 className="font-display text-xl font-semibold group-hover:text-primary transition-colors pr-10">{h.title}</h3>
                  <div className="mt-2 font-semibold text-primary text-lg">
                    {fmtFCFA(h.rent_fcfa)} <span className="text-sm font-normal text-muted-foreground">/ month</span>
                  </div>
                </div>

                <div className="absolute top-4 right-4 sm:static flex items-center">
                  <button 
                    onClick={(e) => toggleFavorite(e, h.id)}
                    className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors ${isFav ? "bg-red-50 text-red-500 hover:bg-red-100" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}
                  >
                    <Heart className={`h-5 w-5 ${isFav ? "fill-current" : ""}`} />
                  </button>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </main>
  );
}
