import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { auth, db } from "@/integrations/firebase/client";
import { onAuthStateChanged, signOut as firebaseSignOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { LogOut, Home as HomeIcon, Plus, Search, History, ShieldCheck } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";

export function AppHeader() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [user, setUser] = useState<{ email?: string | null } | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
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

  async function signOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await firebaseSignOut(auth);
    navigate({ to: "/auth", replace: true });
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/20 glass supports-[backdrop-filter]:bg-cream/60">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-6 px-4 sm:px-6">
        <Link to="/" className="flex items-baseline gap-1 group">
          <span className="font-display text-2xl font-bold tracking-tight text-ink transition-transform group-hover:scale-105">NeXt</span>
          <span className="font-display text-2xl font-bold tracking-tight text-gradient transition-transform group-hover:scale-105">paSs</span>
        </Link>

        <nav className="ml-auto flex items-center gap-1 sm:gap-2">
          <NavItem to="/browse" active={pathname.startsWith("/browse") || pathname.startsWith("/listings")} icon={<Search className="h-4 w-4" />} label="Browse" />
          {user ? (
            <>
              <NavItem to="/share" active={pathname === "/share"} icon={<Plus className="h-4 w-4" />} label="Share" />
              <NavItem to="/my-listings" active={pathname === "/my-listings"} icon={<HomeIcon className="h-4 w-4" />} label="Mine" />
              <NavItem to="/history" active={pathname === "/history"} icon={<History className="h-4 w-4" />} label="History" />
              {isAdmin && (
                <NavItem to="/admin" active={pathname === "/admin"} icon={<ShieldCheck className="h-4 w-4" />} label="Team" />
              )}
              {isAdmin && (
                <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-verified/15 px-2 py-0.5 text-xs font-semibold text-verified shadow-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-verified animate-pulse" />
                  Admin
                </span>
              )}
              <Button variant="ghost" size="sm" onClick={signOut} className="ml-1 hover:bg-destructive/10 hover:text-destructive transition-colors">
                <LogOut className="h-4 w-4" />
                <span className="sr-only sm:not-sr-only sm:ml-2">Sign out</span>
              </Button>
            </>
          ) : (
            <>
              <Link to="/auth"><Button variant="ghost" size="sm" className="hover:bg-primary/10 transition-colors">Sign in</Button></Link>
              <Link to="/auth">
                <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow hover:shadow-none transition-all hover:-translate-y-0.5">
                  Get started
                </Button>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
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
        <span className="hidden sm:inline">{label}</span>
      </span>
      {!active && (
        <span className="absolute inset-0 rounded-full bg-muted opacity-0 transition-opacity group-hover:opacity-100 -z-10" />
      )}
    </Link>
  );
}
