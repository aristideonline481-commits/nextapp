import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { db } from "@/integrations/firebase/client";
import { collection, query, getDocs } from "firebase/firestore";
import { MarketCard, type MarketItemSummary } from "@/components/MarketCard";
import { Loader2, Search as SearchIcon, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState, useMemo } from "react";

export const Route = createFileRoute("/market")({
  head: () => ({ meta: [{ title: "Marketplace — OnMoveIn" }] }),
  component: Market,
});

function Market() {
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ["market-items"],
    queryFn: async (): Promise<MarketItemSummary[]> => {
      const itemsQuery = query(collection(db, "market_items"));
      const querySnapshot = await getDocs(itemsQuery);
      
      const allDocs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() as any }));
      const available = allDocs.filter(item => item.status === "available");
      
      return available
        .sort((a, b) => {
          const timeA = a.created_at?.seconds ?? 0;
          const timeB = b.created_at?.seconds ?? 0;
          return timeB - timeA;
        })
        .map((item) => ({
          id: item.id,
          title: item.title,
          price_fcfa: item.price_fcfa,
          city: item.city,
          neighborhood: item.neighborhood,
          poster_name: item.poster_name,
          poster_phone: item.poster_phone,
          cover_path: item.images?.[0] ?? null,
          status: item.status,
          created_at: item.created_at,
        }));
    },
  });

  const filtered = useMemo(() => {
    if (!data) return [];
    const t = q.trim().toLowerCase();
    if (!t) return data;
    return data.filter((item) => 
      `${item.title} ${item.neighborhood} ${item.city}`.toLowerCase().includes(t)
    );
  }, [data, q]);

  return (
    <main className="mx-auto max-w-md px-4 py-6 sm:px-6 w-full relative min-h-[calc(100vh-64px)] pb-24">
      <div className="relative w-full mb-8">
        <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        <Input 
          value={q} 
          onChange={(e) => setQ(e.target.value)} 
          placeholder="Search items, locations..." 
          className="h-14 rounded-2xl pl-12 bg-accent/40 border-0 text-base shadow-none" 
        />
      </div>

      <div className="flex items-center justify-between mb-5">
        <h2 className="font-sans text-[22px] font-bold tracking-tight text-ink">Marketplace</h2>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>
      ) : filtered.length === 0 ? (
        <div className="mt-8 rounded-[20px] border border-dashed bg-card p-12 text-center">
          <p className="font-sans text-[19px] font-bold">No items found</p>
          <p className="mt-1 text-sm text-muted-foreground">Be the first to list something for sale.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {filtered.map((item) => <MarketCard key={item.id} item={item} />)}
        </div>
      )}

      {/* Floating Action Button for Direct Sell */}
      <button 
        onClick={() => navigate({ to: "/market-post" })}
        className="fixed bottom-24 right-6 sm:right-auto sm:ml-[340px] z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-lg transition-transform hover:scale-110 active:scale-95"
      >
        <Plus className="h-7 w-7" strokeWidth={2.5} />
      </button>
    </main>
  );
}
