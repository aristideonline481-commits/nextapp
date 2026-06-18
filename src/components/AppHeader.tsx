import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { auth, db } from "@/integrations/firebase/client";
import { onAuthStateChanged, signOut as firebaseSignOut } from "firebase/auth";
import { doc, getDoc, collection, query, where, limit, getDocs } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { LogOut, Home as HomeIcon, Plus, Search, History, ShieldCheck, Bell, User } from "lucide-react";
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
      <header className="sticky top-0 z-40 w-full bg-background border-b border-border/20">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 relative">
          
          {/* Left: Hamburger Menu */}
          <div className="flex items-center z-10">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-10 w-10 -ml-2 hover:bg-transparent">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 text-primary" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="6" width="18" height="2.5" />
                    <rect x="3" y="11.5" width="13.5" height="2.5" />
                    <rect x="3" y="17" width="9" height="2.5" />
                  </svg>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56 p-2 rounded-xl mt-2">
                <DropdownMenuItem asChild className="cursor-pointer py-3 rounded-lg">
                  <Link to="/" className="flex items-center w-full">
                    <CustomHomeIcon className="mr-3 h-6 w-6" />
                    <span className="text-base font-bold uppercase tracking-wide">HOME</span>
                  </Link>
                </DropdownMenuItem>
                
                {user && (
                  <DropdownMenuItem asChild className="cursor-pointer py-3 rounded-lg">
                    <Link to="/share" className="flex items-center w-full">
                      <CustomShareIcon className="mr-3 h-6 w-6" />
                      <span className="text-base font-bold uppercase tracking-wide">SHARE A PLACE</span>
                    </Link>
                  </DropdownMenuItem>
                )}
                
                <DropdownMenuItem asChild className="cursor-pointer py-3 rounded-lg">
                  <Link to="/market" className="flex items-center w-full">
                    <CustomMarketIcon className="mr-3 h-6 w-6" />
                    <span className="text-base font-bold uppercase tracking-wide">MARKETPLACE</span>
                  </Link>
                </DropdownMenuItem>

                {user && (
                  <DropdownMenuItem asChild className="cursor-pointer py-3 rounded-lg">
                    <Link to="/profile" className="flex items-center w-full">
                      <User className="mr-3 h-6 w-6 text-primary" />
                      <span className="text-base font-bold uppercase tracking-wide">PROFILE</span>
                    </Link>
                  </DropdownMenuItem>
                )}
                
                {user && (
                  <DropdownMenuItem asChild className="cursor-pointer py-3 rounded-lg">
                    <Link to="/history" className="flex items-center w-full">
                      <CustomHistoryIcon className="mr-3 h-6 w-6" />
                      <span className="text-base font-bold uppercase tracking-wide">HISTORY</span>
                    </Link>
                  </DropdownMenuItem>
                )}
                
                {isAdmin && (
                  <DropdownMenuItem asChild className="cursor-pointer py-3 rounded-lg">
                    <Link to="/admin" className="flex items-center w-full">
                      <ShieldCheck className="mr-3 h-5 w-5 text-primary" />
                      <span className="text-base font-medium text-primary">Admin Team</span>
                    </Link>
                  </DropdownMenuItem>
                )}
                
                {!user && (
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

          {/* Center: Logo */}
          <Link to="/" className="flex items-baseline absolute left-1/2 -translate-x-1/2 group">
            <span className="font-display text-2xl font-bold tracking-tight text-ink">On</span>
            <span className="font-display text-2xl font-bold tracking-tight text-primary">Move</span>
            <span className="font-display text-2xl font-bold tracking-tight text-ink">In</span>
          </Link>

          {/* Right: Bell Icon */}
          <div className="flex items-center z-10">
             <Button variant="ghost" size="icon" className="h-10 w-10 text-ink -mr-2">
               <Bell className="h-6 w-6" />
             </Button>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-50 flex sm:hidden items-center justify-around bg-background border-t border-border/50 h-[72px] pb-safe">
        <MobileNavItem to="/" active={isBrowse} icon={<HomeIcon className="h-6 w-6" />} label="Home" />
        <MobileNavItem to="/profile" active={!isBrowse} icon={<User className="h-6 w-6" />} label="Profile" />
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

function CustomHomeIcon({ className }: { className?: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M15 2v4H3v4h12v4H3v4h12v4h4V2h-4z" className="text-primary" />
    </svg>
  );
}

function CustomShareIcon({ className }: { className?: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="11" stroke="currentColor" strokeWidth="1" />
      <path d="M12 5v14m-7-7h14" stroke="currentColor" strokeWidth="4" className="text-primary" />
    </svg>
  );
}

function CustomHistoryIcon({ className }: { className?: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M4.5 12a7.5 7.5 0 1 0 7.5-7.5 7.5 7.5 0 0 0-5.3 2.2L4.5 9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="miter" className="text-primary" />
      <path d="M4.5 4v5h5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="miter" className="text-primary" />
      <path d="M12 7v5l3.5 2" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="miter" className="text-primary" />
    </svg>
  );
}

function CustomMarketIcon({ className }: { className?: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter" className="text-primary" />
      <path d="M3 6h18" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter" className="text-primary" />
      <path d="M16 10a4 4 0 0 1-8 0" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter" className="text-primary" />
    </svg>
  );
}
