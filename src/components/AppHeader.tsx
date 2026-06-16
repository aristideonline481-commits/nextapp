import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { auth, db } from "@/integrations/firebase/client";
import { onAuthStateChanged, signOut as firebaseSignOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { LogOut, Home as HomeIcon, Plus, Search, History, ShieldCheck } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

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
    <header className="sticky top-0 z-40 w-full border-b border-border/70 bg-cream/85 backdrop-blur supports-[backdrop-filter]:bg-cream/65">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-6 px-4 sm:px-6">
        <Link to="/" className="flex items-baseline gap-1">
          <span className="font-display text-2xl font-bold tracking-tight text-ink">NeXt</span>
          <span className="font-display text-2xl font-bold tracking-tight text-primary">paSs</span>
        </Link>

        <nav className="ml-auto flex items-center gap-1 sm:gap-2">
          {user ? (
            <>
              <NavItem to="/browse" active={pathname.startsWith("/browse") || pathname.startsWith("/listings")} icon={<Search className="h-4 w-4" />} label="Browse" />
              <NavItem to="/share" active={pathname === "/share"} icon={<Plus className="h-4 w-4" />} label="Share" />
              <NavItem to="/my-listings" active={pathname === "/my-listings"} icon={<HomeIcon className="h-4 w-4" />} label="Mine" />
              <NavItem to="/history" active={pathname === "/history"} icon={<History className="h-4 w-4" />} label="History" />
              {isAdmin && (
                <NavItem to="/admin" active={pathname === "/admin"} icon={<ShieldCheck className="h-4 w-4" />} label="Team" />
              )}
              {isAdmin && (
                <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-verified/15 px-2 py-0.5 text-xs font-semibold text-verified">
                  <span className="h-1.5 w-1.5 rounded-full bg-verified" />
                  Admin
                </span>
              )}
              <Button variant="ghost" size="sm" onClick={signOut} className="ml-1">
                <LogOut className="h-4 w-4" />
                <span className="sr-only sm:not-sr-only sm:ml-2">Sign out</span>
              </Button>
            </>
          ) : (
            <>
              <Link to="/auth"><Button variant="ghost" size="sm">Sign in</Button></Link>
              <Link to="/auth"><Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">Get started</Button></Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

function NavItem({ to, active, icon, label }: { to: string; active: boolean; icon: React.ReactNode; label: string }) {
  return (
    <Link
      to={to}
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
        active ? "bg-secondary text-secondary-foreground" : "text-ink/70 hover:bg-muted hover:text-ink"
      }`}
    >
      {icon}
      <span className="hidden sm:inline">{label}</span>
    </Link>
  );
}
