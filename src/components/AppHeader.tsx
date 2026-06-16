import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { auth, db } from "@/integrations/firebase/client";
import { onAuthStateChanged, signOut as firebaseSignOut } from "firebase/auth";
import { doc, getDoc, collection, query, where, limit, getDocs } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { LogOut, Home as HomeIcon, Plus, Search, History, ShieldCheck, Menu } from "lucide-react";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export function AppHeader() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [user, setUser] = useState<{ email?: string | null, uid: string } | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser as any);
      if (currentUser) {
        try {
          const docRef = doc(db, "user_roles", currentUser.uid);
          const docSnap = await getDoc(docRef);
          setIsAdmin(docSnap.exists() && docSnap.data().role === "admin");
        } catch (e) {
          setIsAdmin(false);
        }
      } else {
        setIsAdmin(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const { data: hasListings } = useQuery({
    queryKey: ["user-has-listings", user?.uid],
    queryFn: async () => {
      if (!user) return false;
      const q = query(collection(db, "houses"), where("poster_id", "==", user.uid), limit(1));
      const snap = await getDocs(q);
      return !snap.empty;
    },
    enabled: !!user,
  });

  async function signOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await firebaseSignOut(auth);
    navigate({ to: "/auth", replace: true });
  }

  const isBrowse = pathname.startsWith("/browse") || pathname.startsWith("/listings") || pathname === "/";
  const isShare = pathname === "/share";
  const isMine = pathname === "/my-listings";
  const isHistory = pathname === "/history";

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-white/20 glass supports-[backdrop-filter]:bg-cream/60">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link to="/" className="flex items-baseline gap-1 group">
            <span className="font-display text-2xl font-bold tracking-tight text-ink transition-transform group-hover:scale-105">NeXt</span>
            <span className="font-display text-2xl font-bold tracking-tight text-gradient transition-transform group-hover:scale-105">paSs</span>
          </Link>

          {/* Unified Hamburger Menu */}
          <div className="flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-10 w-10 text-ink">
                  <Menu className="h-6 w-6" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 p-2 rounded-xl">
                {/* Primary Navigation inside Menu */}
                <DropdownMenuItem asChild className="cursor-pointer py-3 rounded-lg">
                  <Link to="/browse" className="flex items-center w-full">
                    <Search className="mr-3 h-5 w-5" />
                    <span className="text-base font-medium">Browse</span>
                  </Link>
                </DropdownMenuItem>
                
                {user && (
                  <DropdownMenuItem asChild className="cursor-pointer py-3 rounded-lg">
                    <Link to="/share" className="flex items-center w-full">
                      <Plus className="mr-3 h-5 w-5" />
                      <span className="text-base font-medium">Share</span>
                    </Link>
                  </DropdownMenuItem>
                )}
                
                {user && hasListings && (
                  <DropdownMenuItem asChild className="cursor-pointer py-3 rounded-lg">
                    <Link to="/my-listings" className="flex items-center w-full">
                      <HomeIcon className="mr-3 h-5 w-5" />
                      <span className="text-base font-medium">My Listings</span>
                    </Link>
                  </DropdownMenuItem>
                )}
                
                {user && (
                  <DropdownMenuItem asChild className="cursor-pointer py-3 rounded-lg">
                    <Link to="/history" className="flex items-center w-full">
                      <History className="mr-3 h-5 w-5" />
                      <span className="text-base font-medium">History</span>
                    </Link>
                  </DropdownMenuItem>
                )}
                
                {isAdmin && (
                  <DropdownMenuItem asChild className="cursor-pointer py-3 rounded-lg">
                    <Link to="/admin" className="flex items-center w-full">
                      <ShieldCheck className="mr-3 h-5 w-5 text-verified" />
                      <span className="text-base font-medium text-verified">Admin Team</span>
                    </Link>
                  </DropdownMenuItem>
                )}
                
                <div className="h-px bg-border my-2 mx-1" />

                {user ? (
                  <DropdownMenuItem onClick={signOut} className="text-destructive cursor-pointer py-3 rounded-lg focus:bg-destructive/10 focus:text-destructive">
                    <LogOut className="mr-3 h-5 w-5" />
                    <span className="text-base font-medium">Sign out</span>
                  </DropdownMenuItem>
                ) : (
                  <>
                    <DropdownMenuItem asChild className="cursor-pointer py-3 rounded-lg">
                      <Link to="/auth" className="flex items-center w-full">
                        <span className="text-base font-medium">Sign in</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="cursor-pointer py-3 rounded-lg bg-primary/10 mt-1 focus:bg-primary/20">
                      <Link to="/auth" className="flex items-center w-full text-primary">
                        <span className="text-base font-bold">Get started</span>
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-50 flex sm:hidden items-center justify-around bg-background/95 backdrop-blur-md border-t border-border/50 h-[68px] pb-safe">
        <MobileNavItem to="/browse" active={isBrowse} icon={<Search className="h-5 w-5" />} label="Browse" />
        {user && <MobileNavItem to="/share" active={isShare} icon={<Plus className="h-5 w-5" />} label="Share" />}
        {user && hasListings && <MobileNavItem to="/my-listings" active={isMine} icon={<HomeIcon className="h-5 w-5" />} label="Mine" />}
        {user && <MobileNavItem to="/history" active={isHistory} icon={<History className="h-5 w-5" />} label="History" />}
      </div>
    </>
  );
}



function MobileNavItem({ to, active, icon, label }: { to: string; active: boolean; icon: React.ReactNode; label: string }) {
  return (
    <Link to={to} className={`flex flex-col items-center justify-center gap-1 w-16 h-full transition-colors ${active ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}>
      {icon}
      <span className="text-[10px] font-medium leading-none">{label}</span>
    </Link>
  );
}
