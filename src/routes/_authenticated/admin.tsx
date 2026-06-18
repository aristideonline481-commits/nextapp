import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { auth, db } from "@/integrations/firebase/client";
import { doc, getDoc, collection, query, orderBy, getDocs } from "firebase/firestore";
import { Badge } from "@/components/ui/badge";
import { fmtFCFA } from "@/lib/format";
import { Loader2, Phone, User as UserIcon, MessageCircle, GraduationCap, MapPin, Home, Bath, ChefHat, Wifi, Search, Users, ShoppingBag, Calendar, Mail } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { MarketCard } from "@/components/MarketCard";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({ meta: [{ title: "Team dashboard — NeXtpaSs" }] }),
  component: Admin,
});

function Admin() {
  const [allowed, setAllowed] = useState<boolean | null>(null);

  useEffect(() => {
    (async () => {
      const u = auth.currentUser;
      if (!u) { setAllowed(false); return; }
      try {
        const docSnap = await getDoc(doc(db, "user_roles", u.uid));
        setAllowed(docSnap.exists() && docSnap.data().role === "admin");
      } catch {
        setAllowed(false);
      }
    })();
  }, []);

  if (allowed === null) return <div className="flex justify-center py-24"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>;
  if (!allowed) return (
    <main className="mx-auto max-w-2xl px-4 py-16 text-center">
      <h1 className="font-display text-3xl font-semibold">Team-only area</h1>
      <p className="mt-2 text-sm text-muted-foreground">Ask a NeXtpaSs admin to grant your account access.</p>
    </main>
  );

  return <AdminBoard />;
}

function AdminBoard() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="font-display text-3xl font-semibold sm:text-4xl">Team dashboard</h1>
      <p className="mt-1 text-sm text-muted-foreground">Full visibility on listings, users, and market items.</p>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-8">
        <TabsList className="rounded-2xl bg-muted p-1 flex flex-wrap h-auto gap-1">
          <TabsTrigger value="overview" className="rounded-xl">Overview</TabsTrigger>
          <TabsTrigger value="listings" className="rounded-xl">Housing</TabsTrigger>
          <TabsTrigger value="market" className="rounded-xl">Marketplace</TabsTrigger>
          <TabsTrigger value="users" className="rounded-xl">Users</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6"><OverviewPanel setTab={setActiveTab} /></TabsContent>
        <TabsContent value="listings" className="mt-6"><ListingsPanel /></TabsContent>
        <TabsContent value="market" className="mt-6"><MarketPanel /></TabsContent>
        <TabsContent value="users" className="mt-6"><UsersPanel /></TabsContent>
      </Tabs>
    </main>
  );
}

function OverviewPanel({ setTab }: { setTab: (tab: string) => void }) {
  const { data, isLoading } = useQuery({
    queryKey: ["admin-overview"],
    queryFn: async () => {
      const [users, houses, market] = await Promise.all([
        getDocs(collection(db, "users")),
        getDocs(collection(db, "houses")),
        getDocs(collection(db, "market_items")),
      ]);
      return {
        usersCount: users.size,
        housesCount: houses.size,
        marketCount: market.size,
      };
    },
  });

  if (isLoading) return <div className="flex justify-center py-20"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>;

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <KPICard title="Total Users" value={data?.usersCount} icon={<Users className="h-5 w-5 text-primary" />} onClick={() => setTab("users")} />
      <KPICard title="Housing Listings" value={data?.housesCount} icon={<Home className="h-5 w-5 text-primary" />} onClick={() => setTab("listings")} />
      <KPICard title="Market Items" value={data?.marketCount} icon={<ShoppingBag className="h-5 w-5 text-primary" />} onClick={() => setTab("market")} />
    </div>
  );
}

function KPICard({ title, value, icon, onClick }: { title: string; value?: number; icon: React.ReactNode; onClick?: () => void }) {
  return (
    <div 
      onClick={onClick}
      className={`rounded-3xl border bg-card p-6 shadow-sm flex items-center justify-between ${onClick ? "cursor-pointer hover:shadow-md transition-shadow" : ""}`}
    >
      <div>
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <h3 className="mt-2 text-3xl font-display font-bold text-ink">{value ?? 0}</h3>
      </div>
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
        {icon}
      </div>
    </div>
  );
}

function ListingsPanel() {
  const [search, setSearch] = useState("");
  const { data, isLoading } = useQuery({
    queryKey: ["admin-listings"],
    queryFn: async () => {
      const q = query(collection(db, "houses"), orderBy("created_at", "desc"));
      const snap = await getDocs(q);
      return snap.docs.map(doc => ({ id: doc.id, ...doc.data() as any }));
    },
  });

  if (isLoading) return <div className="flex justify-center py-20"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>;
  
  const filtered = data?.filter(h => 
    h.title?.toLowerCase().includes(search.toLowerCase()) || 
    h.neighborhood?.toLowerCase().includes(search.toLowerCase()) ||
    h.poster_name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Search listings..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 rounded-full" />
      </div>

      {(!filtered || filtered.length === 0) && <div className="rounded-3xl border border-dashed bg-card p-12 text-center text-sm text-muted-foreground">No listings found.</div>}
      
      {filtered?.map((h: any) => (
        <div key={h.id} className="rounded-3xl border bg-card p-5 shadow-sm">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <Link to="/listings/$id" params={{ id: h.id }} className="min-w-0">
              <h3 className="font-display text-lg font-semibold hover:text-primary hover:underline transition-colors">{h.title}</h3>
              <div className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {h.neighborhood}, {h.city}</span>
                <span className="inline-flex items-center gap-1 capitalize"><Home className="h-3.5 w-3.5" /> {h.house_type}</span>
                <span>{h.max_occupants} max</span>
                <span className="font-medium text-ink">{fmtFCFA(h.rent_fcfa)}/mo</span>
              </div>
            </Link>
            <Badge variant="outline" className="capitalize">{h.status}</Badge>
          </div>

          <div className="mt-3 flex flex-wrap gap-3 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1"><Bath className="h-3.5 w-3.5" /> {h.toilet_type}</span>
            <span className="inline-flex items-center gap-1"><ChefHat className="h-3.5 w-3.5" /> {h.kitchen_type}</span>
            <span className="inline-flex items-center gap-1"><Wifi className="h-3.5 w-3.5" /> Wi-Fi {h.wifi_mode}</span>
          </div>

          <div className="mt-4">
            <ContactCard
              label="Poster"
              name={h.poster_name}
              phone={h.poster_phone}
              whatsapp={h.poster_phone_whatsapp}
              school={h.poster_school}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function MarketPanel() {
  const [search, setSearch] = useState("");
  const { data, isLoading } = useQuery({
    queryKey: ["admin-market"],
    queryFn: async () => {
      const q = query(collection(db, "market_items"), orderBy("created_at", "desc"));
      const snap = await getDocs(q);
      return snap.docs.map(doc => ({ id: doc.id, ...doc.data() as any }));
    },
  });

  if (isLoading) return <div className="flex justify-center py-20"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>;
  
  const filtered = data?.filter(m => 
    m.title?.toLowerCase().includes(search.toLowerCase()) || 
    m.poster_name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Search market items..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 rounded-full" />
      </div>

      {(!filtered || filtered.length === 0) && <div className="rounded-3xl border border-dashed bg-card p-12 text-center text-sm text-muted-foreground">No market items found.</div>}
      
      {filtered?.map((m: any) => (
        <div key={m.id} className="rounded-3xl border bg-card p-5 shadow-sm">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0">
              <Dialog>
                <DialogTrigger asChild>
                  <h3 className="font-display text-lg font-semibold hover:text-primary hover:underline transition-colors cursor-pointer">{m.title}</h3>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[360px] p-0 border-none bg-transparent shadow-none">
                  <MarketCard item={m} />
                </DialogContent>
              </Dialog>
              <div className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {m.neighborhood}, {m.city}</span>
                <span className="font-medium text-ink">{fmtFCFA(m.price_fcfa)}</span>
              </div>
            </div>
            <Badge variant="outline" className="capitalize">{m.status}</Badge>
          </div>

          {m.description && <p className="mt-3 text-sm text-muted-foreground line-clamp-2">{m.description}</p>}

          <div className="mt-4">
            <ContactCard
              label="Seller"
              name={m.poster_name}
              phone={m.poster_phone}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function UsersPanel() {
  const [search, setSearch] = useState("");
  const { data, isLoading } = useQuery({
    queryKey: ["admin-users"],
    queryFn: async () => {
      const q = query(collection(db, "users"), orderBy("created_at", "desc"));
      const snap = await getDocs(q);
      return snap.docs.map(doc => ({ id: doc.id, ...doc.data() as any }));
    },
  });

  if (isLoading) return <div className="flex justify-center py-20"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>;
  
  const filtered = data?.filter(u => 
    u.full_name?.toLowerCase().includes(search.toLowerCase()) || 
    u.email?.toLowerCase().includes(search.toLowerCase()) ||
    u.phone?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Search users by name, email..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 rounded-full" />
      </div>

      {(!filtered || filtered.length === 0) && <div className="rounded-3xl border border-dashed bg-card p-12 text-center text-sm text-muted-foreground">No users found.</div>}
      
      {filtered?.map((u: any) => (
        <div key={u.id} className="rounded-3xl border bg-card p-5 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <span className="font-bold text-lg">{u.full_name?.slice(0, 2).toUpperCase() || <UserIcon className="h-5 w-5" />}</span>
            </div>
            <div>
              <h3 className="font-display text-lg font-semibold">{u.full_name || "Unknown User"}</h3>
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 mt-1 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5"><Mail className="h-3.5 w-3.5" /> {u.email || "No email"}</span>
                {u.phone && <span className="flex items-center gap-1.5"><Phone className="h-3.5 w-3.5" /> {u.phone}</span>}
              </div>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t flex items-center justify-between text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> Joined {new Date(u.created_at).toLocaleDateString()}</span>
            <span className="font-mono bg-muted px-2 py-1 rounded-md text-[10px]">ID: {u.id}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function ContactCard({ label, name, phone, whatsapp, school }: { label: string; name?: string; phone?: string; whatsapp?: boolean; school?: string }) {
  const waNumber = phone?.replace(/[^\d]/g, "");
  return (
    <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4 shadow-sm">
      <div className="text-xs font-bold uppercase tracking-wide text-primary">{label}</div>
      <div className="mt-2 flex items-center gap-2 text-sm font-medium"><UserIcon className="h-4 w-4 text-muted-foreground" /> {name ?? "—"}</div>
      {school && <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground"><GraduationCap className="h-4 w-4" /> {school}</div>}
      <div className="mt-2 pt-2 border-t border-primary/10 flex items-center gap-3 text-sm">
        <Phone className="h-4 w-4 text-muted-foreground" />
        {phone ? <a href={`tel:${phone}`} className="font-medium hover:underline">{phone}</a> : "—"}
        {phone && whatsapp && waNumber && (
          <a
            href={`https://wa.me/${waNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-verified/15 px-2.5 py-1 text-xs font-bold text-verified hover:bg-verified/25 transition-colors ml-auto"
          >
            <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
          </a>
        )}
      </div>
    </div>
  );
}
