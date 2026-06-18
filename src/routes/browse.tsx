import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { db } from "@/integrations/firebase/client";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import { HouseCard, type HouseSummary } from "@/components/HouseCard";
import { Loader2, Search as SearchIcon, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState, useMemo } from "react";

export const Route = createFileRoute("/browse")({
  head: () => ({ meta: [{ title: "Browse rooms — NeXtpaSs" }] }),
  component: Browse,
});

function Browse() {
  const navigate = useNavigate();
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
    <main className="mx-auto max-w-md px-4 py-6 sm:px-6 w-full">
      <div className="relative w-full mb-8">
        <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        <Input 
          value={q} 
          onChange={(e) => setQ(e.target.value)} 
          placeholder="Search location, area or school..." 
          className="h-14 rounded-2xl pl-12 bg-accent/40 border-0 text-base shadow-none" 
        />
      </div>

      <h2 className="font-sans text-[22px] font-bold tracking-tight text-ink mb-5">Available Rooms</h2>

      {isLoading ? (
        <div className="flex justify-center py-20"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>
      ) : filtered.length === 0 ? (
        <div className="mt-8 rounded-[20px] border border-dashed bg-card p-12 text-center">
          <p className="font-sans text-[19px] font-bold">No rooms yet</p>
          <p className="mt-1 text-sm text-muted-foreground">Be the first to post a room.</p>
          <Link to="/share" className="mt-6 inline-flex rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-transform hover:scale-105">Post your room</Link>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-5">
            {filtered.map((h) => <HouseCard key={h.id} house={h} />)}
          </div>
          <div className="mt-8 text-center pb-8">
            <button className="text-primary font-semibold text-[15px] hover:underline">
              View more rooms &gt;
            </button>
          </div>
        </>
      )}

      {/* Floating Action Button for Sharing a House */}
      <button 
        onClick={() => navigate({ to: "/share" })}
        className="fixed bottom-24 right-6 sm:right-auto sm:ml-[340px] z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-lg transition-transform hover:scale-110 active:scale-95"
      >
        <Plus className="h-7 w-7" strokeWidth={2.5} />
      </button>
    </main>
  );
}
