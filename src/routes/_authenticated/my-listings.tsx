import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { auth, db } from "@/integrations/firebase/client";
import { collection, query, where, orderBy, getDocs, deleteDoc, doc } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Loader2, Plus, Trash2, CheckCircle2, Circle, Clock, Home } from "lucide-react";
import { fmtFCFA } from "@/lib/format";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/my-listings")({
  head: () => ({ meta: [{ title: "My listings — NeXtpaSs" }] }),
  component: MyListings,
});

const TRACKER_STEPS = [
  { id: "available", label: "Listed", icon: Home },
  { id: "viewing_requested", label: "Viewing Requested", icon: Clock },
  { id: "matched", label: "Match Confirmed", icon: CheckCircle2 },
  { id: "closed", label: "Done & Paid", icon: CheckCircle2 },
];

function getStepIndex(status: string) {
  if (status === "closed") return 3;
  if (status === "matched") return 2;
  if (status === "viewing_requested" || status === "viewing") return 1;
  return 0; // "available" or fallback
}

function StatusTracker({ status }: { status: string }) {
  const currentIndex = getStepIndex(status);

  return (
    <div className="mt-4 pt-4 border-t border-border/50">
      <div className="relative flex justify-between">
        {/* Progress Line */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 w-full bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-500 ease-out"
            style={{ width: `${(currentIndex / (TRACKER_STEPS.length - 1)) * 100}%` }}
          />
        </div>

        {/* Steps */}
        {TRACKER_STEPS.map((step, index) => {
          const isCompleted = index <= currentIndex;
          const isCurrent = index === currentIndex;
          const Icon = isCompleted ? step.icon : Circle;

          return (
            <div key={step.id} className="relative flex flex-col items-center gap-2 z-10 group">
              <div className={`
                flex h-8 w-8 items-center justify-center rounded-full border-2 transition-colors duration-300
                ${isCompleted ? "bg-primary border-primary text-primary-foreground shadow-sm" : "bg-card border-muted text-muted-foreground"}
                ${isCurrent ? "ring-4 ring-primary/20 scale-110" : ""}
              `}>
                <Icon className={`h-4 w-4 ${isCompleted && !isCurrent ? "animate-in zoom-in" : ""}`} />
              </div>
              <span className={`text-[10px] sm:text-xs font-medium max-w-[70px] text-center leading-tight transition-colors
                ${isCurrent ? "text-primary" : isCompleted ? "text-foreground" : "text-muted-foreground"}
              `}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function MyListings() {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["my-listings"],
    queryFn: async () => {
      const user = auth.currentUser;
      if (!user) return [];
      
      const housesQuery = query(
        collection(db, "houses"),
        where("poster_id", "==", user.uid)
      );
      const snap = await getDocs(housesQuery);
      const docs = snap.docs.map(doc => ({ id: doc.id, ...doc.data() as any }));
      return docs.sort((a, b) => {
        const timeA = a.created_at?.seconds ?? 0;
        const timeB = b.created_at?.seconds ?? 0;
        return timeB - timeA;
      });
    },
  });

  const del = useMutation({
    mutationFn: async (id: string) => {
      await deleteDoc(doc(db, "houses", id));
    },
    onSuccess: () => { toast.success("Listing removed"); qc.invalidateQueries({ queryKey: ["my-listings"] }); },
    onError: (e: any) => toast.error(e.message),
  });

  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl font-semibold sm:text-4xl">Your listings</h1>
        <Link to="/share">
          <Button className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm transition-transform hover:scale-105">
            <Plus className="mr-2 h-4 w-4" /> Pass a Room
          </Button>
        </Link>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>
      ) : (data?.length ?? 0) === 0 ? (
        <div className="mt-10 rounded-3xl border border-dashed border-primary/20 bg-primary/5 p-12 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
            <Home className="h-8 w-8 text-primary" />
          </div>
          <p className="font-display text-2xl font-semibold tracking-tight">No listings yet</p>
          <p className="mt-2 text-muted-foreground max-w-sm mx-auto">Pass on your room to the next student and get paid when the match is successful.</p>
          <Link to="/share">
            <Button className="mt-6 rounded-full px-8 shadow-sm">Get Started</Button>
          </Link>
        </div>
      ) : (
        <div className="mt-8 space-y-6">
          {data!.map((h) => (
            <div key={h.id} className="relative overflow-hidden rounded-3xl border bg-card p-5 sm:p-6 shadow-sm transition-all hover:shadow-md">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <Link to="/listings/$id" params={{ id: h.id }} className="group min-w-0 flex-1 block">
                  <h3 className="truncate font-display text-xl font-semibold group-hover:text-primary transition-colors">{h.title}</h3>
                  <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="capitalize">{h.house_type}</span>
                    <span>•</span>
                    <span>{h.neighborhood}, {h.city}</span>
                  </div>
                  <div className="mt-2 font-semibold text-foreground text-lg">
                    {fmtFCFA(h.rent_fcfa)} <span className="text-sm font-normal text-muted-foreground">/ month</span>
                  </div>
                </Link>
                <div className="absolute top-4 right-4 sm:static">
                  <Button variant="ghost" size="icon" onClick={() => del.mutate(h.id)} className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-full h-10 w-10">
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>
              
              <StatusTracker status={h.status} />
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
