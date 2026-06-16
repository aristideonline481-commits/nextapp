import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { db } from "@/integrations/firebase/client";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import { HouseCard, type HouseSummary } from "@/components/HouseCard";
import { QuickContact } from "@/components/QuickContact";
import { Loader2, Search as SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState, useMemo } from "react";

export const Route = createFileRoute("/_authenticated/browse")({
  head: () => ({ meta: [{ title: "Browse rooms — NeXtpaSs" }] }),
  component: Browse,
});

function Browse() {
  const [q, setQ] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["browse-houses"],
    queryFn: async (): Promise<HouseSummary[]> => {
      const housesQuery = query(collection(db, "houses"));
      const querySnapshot = await getDocs(housesQuery);
      
      const allDocs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() as any }));
      const available = allDocs.filter(h => h.status === "available");
      
      return available
        .sort((a, b) => {
          const timeA = a.created_at?.seconds ?? 0;
          const timeB = b.created_at?.seconds ?? 0;
          return timeB - timeA;
        })
        .map((h) => ({
          id: h.id,
          title: h.title,
          house_type: h.house_type,
          city: h.city,
          neighborhood: h.neighborhood,
          rent_fcfa: h.rent_fcfa,
          max_occupants: h.max_occupants,
          cover_path: h.images?.[0]?.url ?? null,
        }));
    },
  });

  const filtered = useMemo(() => {
    if (!data) return [];
    const t = q.trim().toLowerCase();
    if (!t) return data;
    return data.filter((h) => `${h.title} ${h.neighborhood} ${h.city} ${h.house_type}`.toLowerCase().includes(t));
  }, [data, q]);

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">Available rooms</h1>
          <p className="mt-1 text-sm text-muted-foreground">Real listings from graduating students. Tap one to see the full breakdown.</p>
        </div>
        <div className="relative w-full sm:w-72">
          <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Neighborhood or type…" className="h-11 rounded-full pl-9" />
        </div>
      </div>

      <div className="mt-6">
        <QuickContact />
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>
      ) : filtered.length === 0 ? (
        <div className="mt-12 rounded-2xl border border-dashed bg-card p-12 text-center">
          <p className="font-display text-xl font-semibold">No rooms yet</p>
          <p className="mt-1 text-sm text-muted-foreground">Be the first to pass the keys.</p>
          <Link to="/share" className="mt-4 inline-flex rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">Share your room</Link>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((h) => <HouseCard key={h.id} house={h} />)}
        </div>
      )}
    </main>
  );
}
