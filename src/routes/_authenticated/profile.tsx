import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { auth, db } from "@/integrations/firebase/client";
import { signOut as firebaseSignOut } from "firebase/auth";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { collection, query, where, getDocs } from "firebase/firestore";
import { LogOut, Home, ShoppingBag, ChevronRight, User as UserIcon } from "lucide-react";

export const Route = createFileRoute("/_authenticated/profile")({
  head: () => ({ meta: [{ title: "My Profile — OnMoveIn" }] }),
  component: Profile,
});

function Profile() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const user = auth.currentUser;

  const { data: listingsCount = 0 } = useQuery({
    queryKey: ["user-listings-count", user?.uid],
    queryFn: async () => {
      if (!user) return 0;
      const q = query(collection(db, "houses"), where("poster_id", "==", user.uid));
      const snap = await getDocs(q);
      return snap.size;
    },
    enabled: !!user,
  });

  const { data: marketItemsCount = 0 } = useQuery({
    queryKey: ["user-market-count", user?.uid],
    queryFn: async () => {
      if (!user) return 0;
      const q = query(collection(db, "market_items"), where("poster_id", "==", user.uid));
      const snap = await getDocs(q);
      return snap.size;
    },
    enabled: !!user,
  });

  async function handleSignOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await firebaseSignOut(auth);
    navigate({ to: "/auth", replace: true });
  }

  return (
    <main className="mx-auto flex max-w-md flex-col px-4 py-8 min-h-[calc(100vh-64px)] w-full">
      <div className="flex flex-col items-center justify-center pt-6 pb-10">
        <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center mb-4">
          <UserIcon className="h-12 w-12 text-primary" />
        </div>
        <h1 className="font-display text-2xl font-semibold tracking-tight">My Profile</h1>
        <p className="text-muted-foreground font-medium mt-1">{user?.email}</p>
      </div>

      <div className="space-y-4 flex-1">
        <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-2 px-1">My Activity</h2>
        
        <Link 
          to="/my-listings" 
          className="flex items-center justify-between p-4 rounded-2xl border bg-card hover:bg-accent/50 transition-colors shadow-sm group"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
              <Home className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Room Listings</h3>
              <p className="text-sm text-muted-foreground">{listingsCount} {listingsCount === 1 ? "room" : "rooms"} posted</p>
            </div>
          </div>
          <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
        </Link>

        {/* Note: In the future, we could link to a dedicated /my-market-items page. For now, it just goes to the marketplace or stays here. */}
        <Link 
          to="/market" 
          className="flex items-center justify-between p-4 rounded-2xl border bg-card hover:bg-accent/50 transition-colors shadow-sm group"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/10 text-orange-600 dark:text-orange-400">
              <ShoppingBag className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Market Items</h3>
              <p className="text-sm text-muted-foreground">{marketItemsCount} {marketItemsCount === 1 ? "item" : "items"} for sale</p>
            </div>
          </div>
          <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
        </Link>
      </div>

      <div className="mt-12 pb-8">
        <button 
          onClick={handleSignOut}
          className="flex w-full items-center justify-center gap-2 rounded-2xl border border-destructive/30 bg-destructive/5 py-4 text-destructive font-bold transition-colors hover:bg-destructive/10"
        >
          <LogOut className="h-5 w-5" />
          Sign Out
        </button>
      </div>
    </main>
  );
}
