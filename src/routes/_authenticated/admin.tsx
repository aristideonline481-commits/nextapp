import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { auth, db } from "@/integrations/firebase/client";
import { doc, getDoc, collection, query, orderBy, getDocs, updateDoc } from "firebase/firestore";
import { Badge } from "@/components/ui/badge";
import { fmtFCFA } from "@/lib/format";
import { Loader2, Phone, User as UserIcon, MessageCircle, GraduationCap, MapPin, Home, Bath, ChefHat, Wifi } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { toast } from "sonner";

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
  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="font-display text-3xl font-semibold sm:text-4xl">Team dashboard</h1>
      <p className="mt-1 text-sm text-muted-foreground">Full visibility on listings, posters, and incoming visit requests.</p>

      <Tabs defaultValue="requests" className="mt-8">
        <TabsList className="rounded-full bg-muted p-1">
          <TabsTrigger value="requests" className="rounded-full">Visit requests</TabsTrigger>
          <TabsTrigger value="listings" className="rounded-full">All listings</TabsTrigger>
        </TabsList>

        <TabsContent value="requests" className="mt-6"><RequestsPanel /></TabsContent>
        <TabsContent value="listings" className="mt-6"><ListingsPanel /></TabsContent>
      </Tabs>
    </main>
  );
}

function RequestsPanel() {
  const qc = useQueryClient();

  const { data: requests, isLoading } = useQuery({
    queryKey: ["admin-requests"],
    queryFn: async () => {
      const q = query(collection(db, "visit_requests"), orderBy("created_at", "desc"));
      const snap = await getDocs(q);
      return snap.docs.map(doc => ({ id: doc.id, ...doc.data() as any }));
    },
  });

  const updateStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      await updateDoc(doc(db, "visit_requests", id), { status });
    },
    onSuccess: () => { toast.success("Updated"); qc.invalidateQueries({ queryKey: ["admin-requests"] }); },
    onError: (e: any) => toast.error(e.message),
  });

  if (isLoading) return <div className="flex justify-center py-20"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>;
  if (!requests || requests.length === 0) return <div className="rounded-2xl border border-dashed bg-card p-12 text-center text-sm text-muted-foreground">No requests yet.</div>;

  return (
    <div className="space-y-4">
      {requests.map((r: any) => {
        return (
          <div key={r.id} className="rounded-2xl border bg-card p-5 shadow-soft">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <Link to="/listings/$id" params={{ id: r.house_id }} className="min-w-0">
                <h3 className="font-display text-lg font-semibold">{r.house_title}</h3>
                <div className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {r.house_neighborhood}, {r.house_city}</span>
                  <span className="inline-flex items-center gap-1 capitalize"><Home className="h-3.5 w-3.5" /> {r.house_type}</span>
                  <span className="font-medium text-ink">{fmtFCFA(r.rent_fcfa ?? 0)}/mo</span>
                </div>
              </Link>
              <div className="flex items-center gap-2">
                <Badge className="capitalize" variant="outline">{r.status}</Badge>
                <Select value={r.status} onValueChange={(v) => updateStatus.mutate({ id: r.id, status: v })}>
                  <SelectTrigger className="h-9 w-36"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="requested">Requested</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                    <SelectItem value="visited">Visited</SelectItem>
                    <SelectItem value="closed">Closed (matched)</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {r.message && <p className="mt-3 rounded-lg bg-muted p-3 text-sm">"{r.message}"</p>}

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <ContactCard
                label="Incoming student"
                name={r.requester_name}
                phone={r.requester_phone}
              />
              <ContactCard
                label="Departing student (poster)"
                name={r.poster_name}
                phone={r.poster_phone}
                whatsapp={r.poster_whatsapp}
                school={r.poster_school}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function ListingsPanel() {
  const { data, isLoading } = useQuery({
    queryKey: ["admin-listings"],
    queryFn: async () => {
      const q = query(collection(db, "houses"), orderBy("created_at", "desc"));
      const snap = await getDocs(q);
      return snap.docs.map(doc => ({ id: doc.id, ...doc.data() as any }));
    },
  });

  if (isLoading) return <div className="flex justify-center py-20"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>;
  if (!data || data.length === 0) return <div className="rounded-2xl border border-dashed bg-card p-12 text-center text-sm text-muted-foreground">No listings yet.</div>;

  return (
    <div className="space-y-4">
      {data.map((h: any) => (
        <div key={h.id} className="rounded-2xl border bg-card p-5 shadow-soft">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <Link to="/listings/$id" params={{ id: h.id }} className="min-w-0">
              <h3 className="font-display text-lg font-semibold">{h.title}</h3>
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

function ContactCard({ label, name, phone, whatsapp, school }: { label: string; name?: string; phone?: string; whatsapp?: boolean; school?: string }) {
  const waNumber = phone?.replace(/[^\d]/g, "");
  return (
    <div className="rounded-xl border border-primary/20 bg-primary/5 p-3">
      <div className="text-xs font-medium uppercase tracking-wide text-primary">{label}</div>
      <div className="mt-1 flex items-center gap-2 text-sm"><UserIcon className="h-3.5 w-3.5 text-muted-foreground" /> {name ?? "—"}</div>
      {school && <div className="flex items-center gap-2 text-sm text-muted-foreground"><GraduationCap className="h-3.5 w-3.5" /> {school}</div>}
      <div className="flex items-center gap-2 text-sm">
        <Phone className="h-3.5 w-3.5 text-muted-foreground" />
        {phone ? <a href={`tel:${phone}`} className="hover:underline">{phone}</a> : "—"}
        {phone && whatsapp && waNumber && (
          <a
            href={`https://wa.me/${waNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 rounded-full bg-verified/15 px-2 py-0.5 text-xs font-medium text-verified hover:bg-verified/25"
          >
            <MessageCircle className="h-3 w-3" /> WhatsApp
          </a>
        )}
      </div>
    </div>
  );
}
