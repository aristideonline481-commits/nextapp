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

          {/* Desktop Navigation */}
          <nav className="hidden sm:flex items-center gap-2">
            <NavItem to="/browse" active={isBrowse} icon={<Search className="h-4 w-4" />} label="Browse" />
            {user ? (
              <>
                <NavItem to="/share" active={isShare} icon={<Plus className="h-4 w-4" />} label="Share" />
                {hasListings && <NavItem to="/my-listings" active={isMine} icon={<HomeIcon className="h-4 w-4" />} label="Mine" />}
                <NavItem to="/history" active={isHistory} icon={<History className="h-4 w-4" />} label="History" />
                {isAdmin && (
                  <NavItem to="/admin" active={pathname === "/admin"} icon={<ShieldCheck className="h-4 w-4" />} label="Team" />
                )}
                {isAdmin && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-verified/15 px-2 py-0.5 text-xs font-semibold text-verified shadow-sm ml-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-verified animate-pulse" />
                    Admin
                  </span>
                )}
                <Button variant="ghost" size="sm" onClick={signOut} className="ml-2 hover:bg-destructive/10 hover:text-destructive transition-colors">
                  <LogOut className="h-4 w-4" />
                  <span className="ml-2">Sign out</span>
                </Button>
              </>
            ) : (
              <>
                <Link to="/auth"><Button variant="ghost" size="sm" className="hover:bg-primary/10 transition-colors ml-2">Sign in</Button></Link>
                <Link to="/auth">
                  <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow hover:shadow-none transition-all hover:-translate-y-0.5 ml-2">
                    Get started
                  </Button>
                </Link>
              </>
            )}
          </nav>

          {/* Mobile Header Icons (Hamburger) */}
          <div className="flex sm:hidden items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-10 w-10 text-ink">
                  <Menu className="h-6 w-6" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {user ? (
                  <>
                    {isAdmin && <DropdownMenuItem asChild><Link to="/admin" className="w-full cursor-pointer">Admin Team</Link></DropdownMenuItem>}
                    <DropdownMenuItem onClick={signOut} className="text-destructive cursor-pointer">
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign out
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem asChild>
                      <Link to="/auth" className="w-full cursor-pointer">Sign in</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/auth" className="w-full cursor-pointer text-primary font-medium">Get started</Link>
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

function NavItem({ to, active, icon, label }: { to: string; active: boolean; icon: React.ReactNode; label: string }) {
  return (
    <Link to={to} className="relative px-3 py-1.5 text-sm font-medium transition-colors group">
      {active && (
        <motion.div
          layoutId="navbar-indicator"
          className="absolute inset-0 rounded-full bg-primary/10 border border-primary/20"
          transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
        />
      )}
      <span className={`relative z-10 flex items-center gap-2 ${active ? "text-primary" : "text-ink/70 group-hover:text-ink"}`}>
        {icon}
        <span>{label}</span>
      </span>
      {!active && (
        <span className="absolute inset-0 rounded-full bg-muted opacity-0 transition-opacity group-hover:opacity-100 -z-10" />
      )}
    </Link>
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
