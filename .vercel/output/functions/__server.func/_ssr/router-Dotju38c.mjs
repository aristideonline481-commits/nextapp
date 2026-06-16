import { b as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider, u as useQueryClient, a as useQuery } from "../_libs/tanstack__react-query.mjs";
import { c as createRouter, a as createRootRouteWithContext, u as useRouter, L as Link, O as Outlet, H as HeadContent, S as Scripts, b as createFileRoute, l as lazyRouteComponent, d as useNavigate, e as useRouterState } from "../_libs/tanstack__react-router.mjs";
import { Q as redirect } from "../_libs/tanstack__router-core.mjs";
import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { T as Toaster$1 } from "../_libs/sonner.mjs";
import "../_libs/firebase.mjs";
import { o as onAuthStateChanged, g as getAuth, s as signOut } from "../_libs/firebase__auth.mjs";
import { i as initializeApp } from "../_libs/firebase__app.mjs";
import "../_libs/firebase__logger.mjs";
import { d as doc, g as getDoc, a as getFirestore, q as query, l as limit, w as where, c as collection, b as getDocs } from "../_libs/firebase__firestore.mjs";
import { g as getStorage } from "../_libs/firebase__storage.mjs";
import { S as Slot } from "../_libs/radix-ui__react-slot.mjs";
import { c as cva } from "../_libs/class-variance-authority.mjs";
import { c as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { R as Root2, T as Trigger, P as Portal2, C as Content2, I as Item2, S as SubTrigger2, a as SubContent2, b as CheckboxItem2, c as ItemIndicator2, d as RadioItem2, L as Label2, e as Separator2 } from "../_libs/radix-ui__react-dropdown-menu.mjs";
import { S as Search, P as Plus, H as House, a as History, b as ShieldCheck, L as LogOut, M as Menu, C as ChevronRight, c as Check, d as Circle } from "../_libs/lucide-react.mjs";
import { m as motion } from "../_libs/framer-motion.mjs";
import "../_libs/react-dom.mjs";
import "async_hooks";
import "stream";
import "util";
import "crypto";
import "node:stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/firebase__util.mjs";
import "../_libs/firebase__component.mjs";
import "../_libs/idb.mjs";
import "../_libs/firebase__webchannel-wrapper.mjs";
import "../_libs/@grpc/grpc-js.mjs";
import "process";
import "tls";
import "fs";
import "os";
import "net";
import "events";
import "http2";
import "http";
import "url";
import "dns";
import "zlib";
import "../_libs/@grpc/proto-loader.mjs";
import "path";
import "../_libs/lodash.camelcase.mjs";
import "../_libs/protobufjs.mjs";
import "../_libs/protobufjs__aspromise.mjs";
import "../_libs/protobufjs__base64.mjs";
import "../_libs/protobufjs__eventemitter.mjs";
import "../_libs/protobufjs__float.mjs";
import "../_libs/protobufjs__utf8.mjs";
import "../_libs/protobufjs__pool.mjs";
import "../_libs/long.mjs";
import "../_libs/protobufjs__codegen.mjs";
import "../_libs/protobufjs__fetch.mjs";
import "../_libs/protobufjs__path.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__react-menu.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-popper.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/radix-ui__react-arrow.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-roving-focus.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/react-remove-scroll.mjs";
import "tslib";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
const appCss = "/assets/styles-BxxKC-xL.css";
function reportLovableError(error, context = {}) {
  if (typeof window === "undefined") return;
  window.__lovableEvents?.captureException?.(
    error,
    {
      source: "react_error_boundary",
      route: window.location.pathname,
      ...context
    },
    {
      mechanism: "react_error_boundary",
      handled: false,
      severity: "error"
    }
  );
}
const Toaster = ({ ...props }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Toaster$1,
    {
      className: "toaster group",
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      },
      ...props
    }
  );
};
const firebaseConfig = {
  apiKey: "AIzaSyARTPBgUeEMVz3RPjdEZprPTKZlH26XQlI",
  authDomain: "nextpass-90043.firebaseapp.com",
  projectId: "nextpass-90043",
  storageBucket: "nextpass-90043.firebasestorage.app",
  messagingSenderId: "543923213597",
  appId: "1:543923213597:web:ad0f3f8c51f9d1c9c7fdf4",
  measurementId: "G-3MBD0FNYFY"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
getStorage(app);
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const Button = reactExports.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Comp, { className: cn(buttonVariants({ variant, size, className })), ref, ...props });
  }
);
Button.displayName = "Button";
const DropdownMenu = Root2;
const DropdownMenuTrigger = Trigger;
const DropdownMenuSubTrigger = reactExports.forwardRef(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
  SubTrigger2,
  {
    ref,
    className: cn(
      "flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      inset && "pl-8",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "ml-auto" })
    ]
  }
));
DropdownMenuSubTrigger.displayName = SubTrigger2.displayName;
const DropdownMenuSubContent = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  SubContent2,
  {
    ref,
    className: cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-dropdown-menu-content-transform-origin)",
      className
    ),
    ...props
  }
));
DropdownMenuSubContent.displayName = SubContent2.displayName;
const DropdownMenuContent = reactExports.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(Portal2, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
  Content2,
  {
    ref,
    sideOffset,
    className: cn(
      "z-50 max-h-[var(--radix-dropdown-menu-content-available-height)] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
      "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-dropdown-menu-content-transform-origin)",
      className
    ),
    ...props
  }
) }));
DropdownMenuContent.displayName = Content2.displayName;
const DropdownMenuItem = reactExports.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Item2,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0",
      inset && "pl-8",
      className
    ),
    ...props
  }
));
DropdownMenuItem.displayName = Item2.displayName;
const DropdownMenuCheckboxItem = reactExports.forwardRef(({ className, children, checked, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
  CheckboxItem2,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    checked,
    ...props,
    children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ItemIndicator2, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4" }) }) }),
      children
    ]
  }
));
DropdownMenuCheckboxItem.displayName = CheckboxItem2.displayName;
const DropdownMenuRadioItem = reactExports.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
  RadioItem2,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ItemIndicator2, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Circle, { className: "h-2 w-2 fill-current" }) }) }),
      children
    ]
  }
));
DropdownMenuRadioItem.displayName = RadioItem2.displayName;
const DropdownMenuLabel = reactExports.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Label2,
  {
    ref,
    className: cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className),
    ...props
  }
));
DropdownMenuLabel.displayName = Label2.displayName;
const DropdownMenuSeparator = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Separator2,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-muted", className),
    ...props
  }
));
DropdownMenuSeparator.displayName = Separator2.displayName;
function AppHeader() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [user, setUser] = reactExports.useState(null);
  const [isAdmin, setIsAdmin] = reactExports.useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  reactExports.useEffect(() => {
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
  const { data: hasListings } = useQuery({
    queryKey: ["user-has-listings", user?.uid],
    queryFn: async () => {
      if (!user) return false;
      const q = query(collection(db, "houses"), where("poster_id", "==", user.uid), limit(1));
      const snap = await getDocs(q);
      return !snap.empty;
    },
    enabled: !!user
  });
  async function signOut$1() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await signOut(auth);
    navigate({ to: "/auth", replace: true });
  }
  const isBrowse = pathname.startsWith("/browse") || pathname.startsWith("/listings") || pathname === "/";
  const isShare = pathname === "/share";
  const isMine = pathname === "/my-listings";
  const isHistory = pathname === "/history";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "sticky top-0 z-40 w-full border-b border-white/20 glass supports-[backdrop-filter]:bg-cream/60", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-baseline gap-1 group", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-2xl font-bold tracking-tight text-ink transition-transform group-hover:scale-105", children: "NeXt" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-2xl font-bold tracking-tight text-gradient transition-transform group-hover:scale-105", children: "paSs" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "hidden sm:flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(NavItem, { to: "/browse", active: isBrowse, icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-4 w-4" }), label: "Browse" }),
        user ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(NavItem, { to: "/share", active: isShare, icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }), label: "Share" }),
          hasListings && /* @__PURE__ */ jsxRuntimeExports.jsx(NavItem, { to: "/my-listings", active: isMine, icon: /* @__PURE__ */ jsxRuntimeExports.jsx(House, { className: "h-4 w-4" }), label: "Mine" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(NavItem, { to: "/history", active: isHistory, icon: /* @__PURE__ */ jsxRuntimeExports.jsx(History, { className: "h-4 w-4" }), label: "History" }),
          isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsx(NavItem, { to: "/admin", active: pathname === "/admin", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-4 w-4" }), label: "Team" }),
          isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 rounded-full bg-verified/15 px-2 py-0.5 text-xs font-semibold text-verified shadow-sm ml-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-verified animate-pulse" }),
            "Admin"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", size: "sm", onClick: signOut$1, className: "ml-2 hover:bg-destructive/10 hover:text-destructive transition-colors", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "h-4 w-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-2", children: "Sign out" })
          ] })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/auth", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "sm", className: "hover:bg-primary/10 transition-colors ml-2", children: "Sign in" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/auth", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", className: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow hover:shadow-none transition-all hover:-translate-y-0.5 ml-2", children: "Get started" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex sm:hidden items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenu, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", className: "h-10 w-10 text-ink", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "h-6 w-6" }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuContent, { align: "end", className: "w-48", children: user ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuItem, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin", className: "w-full cursor-pointer", children: "Admin Team" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuItem, { onClick: signOut$1, className: "text-destructive cursor-pointer", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "mr-2 h-4 w-4" }),
            "Sign out"
          ] })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuItem, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/auth", className: "w-full cursor-pointer", children: "Sign in" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuItem, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/auth", className: "w-full cursor-pointer text-primary font-medium", children: "Get started" }) })
        ] }) })
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed bottom-0 left-0 right-0 z-50 flex sm:hidden items-center justify-around bg-background/95 backdrop-blur-md border-t border-border/50 h-[68px] pb-safe", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(MobileNavItem, { to: "/browse", active: isBrowse, icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-5 w-5" }), label: "Browse" }),
      user && /* @__PURE__ */ jsxRuntimeExports.jsx(MobileNavItem, { to: "/share", active: isShare, icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-5 w-5" }), label: "Share" }),
      user && hasListings && /* @__PURE__ */ jsxRuntimeExports.jsx(MobileNavItem, { to: "/my-listings", active: isMine, icon: /* @__PURE__ */ jsxRuntimeExports.jsx(House, { className: "h-5 w-5" }), label: "Mine" }),
      user && /* @__PURE__ */ jsxRuntimeExports.jsx(MobileNavItem, { to: "/history", active: isHistory, icon: /* @__PURE__ */ jsxRuntimeExports.jsx(History, { className: "h-5 w-5" }), label: "History" })
    ] })
  ] });
}
function NavItem({ to, active, icon, label }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to, className: "relative px-3 py-1.5 text-sm font-medium transition-colors group", children: [
    active && /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        layoutId: "navbar-indicator",
        className: "absolute inset-0 rounded-full bg-primary/10 border border-primary/20",
        transition: { type: "spring", bounce: 0.25, duration: 0.5 }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `relative z-10 flex items-center gap-2 ${active ? "text-primary" : "text-ink/70 group-hover:text-ink"}`, children: [
      icon,
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: label })
    ] }),
    !active && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inset-0 rounded-full bg-muted opacity-0 transition-opacity group-hover:opacity-100 -z-10" })
  ] });
}
function MobileNavItem({ to, active, icon, label }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to, className: `flex flex-col items-center justify-center gap-1 w-16 h-full transition-colors ${active ? "text-primary" : "text-muted-foreground hover:text-foreground"}`, children: [
    icon,
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-medium leading-none", children: label })
  ] });
}
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-7xl font-bold text-ink", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-xl font-semibold", children: "Page not found" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "This page doesn't exist or has moved." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90", children: "Go home" }) })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  const router2 = useRouter();
  reactExports.useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-semibold", children: "Something went wrong" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Try again or head home." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex justify-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
        router2.invalidate();
        reset();
      }, className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90", children: "Try again" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/", className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent", children: "Go home" })
    ] })
  ] }) });
}
const Route$a = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "NeXtpaSs — Student-to-student housing" },
      { name: "description", content: "Real student rooms passed on by graduating tenants. Browse verified listings, request a guided visit." },
      { property: "og:title", content: "NeXtpaSs — Student-to-student housing" },
      { property: "og:description", content: "Real student rooms passed on by graduating tenants. Browse verified listings, request a guided visit." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "NeXtpaSs — Student-to-student housing" },
      { name: "twitter:description", content: "Real student rooms passed on by graduating tenants. Browse verified listings, request a guided visit." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/373e8e25-975c-43c6-808b-4578a9ef4a0e/id-preview-1495d43d--844f1466-c552-4167-a941-fa986f8d0687.lovable.app-1781171494421.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/373e8e25-975c-43c6-808b-4578a9ef4a0e/id-preview-1495d43d--844f1466-c552-4167-a941-fa986f8d0687.lovable.app-1781171494421.png" }
    ],
    links: [{ rel: "stylesheet", href: appCss }]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$a.useRouteContext();
  const router2 = useRouter();
  reactExports.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      router2.invalidate();
      if (user) {
        queryClient.invalidateQueries();
      }
    });
    return () => unsubscribe();
  }, [router2, queryClient]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(QueryClientProvider, { client: queryClient, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AppHeader, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pb-16 sm:pb-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Toaster, {})
  ] });
}
const BASE_URL = "";
const Route$9 = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/auth", changefreq: "monthly", priority: "0.5" }
        ];
        const urls = entries.map(
          (e) => `  <url>
    <loc>${BASE_URL}${e.path}</loc>
    <changefreq>${e.changefreq}</changefreq>
    <priority>${e.priority}</priority>
  </url>`
        );
        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>`;
        return new Response(xml, { headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" } });
      }
    }
  }
});
const $$splitComponentImporter$8 = () => import("./browse-iYzGr_Id.mjs");
const Route$8 = createFileRoute("/browse")({
  head: () => ({
    meta: [{
      title: "Browse rooms — NeXtpaSs"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const $$splitComponentImporter$7 = () => import("./auth-DqraFm_k.mjs");
const Route$7 = createFileRoute("/auth")({
  head: () => ({
    meta: [{
      title: "Sign in — NeXtpaSs"
    }, {
      name: "description",
      content: "Sign in to NeXtpaSs to share or browse student rooms."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./route-BDe7k_Ky.mjs");
const Route$6 = createFileRoute("/_authenticated")({
  ssr: false,
  beforeLoad: async () => {
    const user = await new Promise((resolve) => {
      const unsubscribe = onAuthStateChanged(auth, (user2) => {
        unsubscribe();
        resolve(user2);
      });
    });
    if (!user) throw redirect({
      to: "/auth"
    });
    return {
      user
    };
  },
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./index-BeUun5yC.mjs");
const Route$5 = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: "NeXtpaSs — Student housing, passed down"
    }, {
      name: "description",
      content: "Graduating students share their rooms. New students find verified housing — no expensive middlemen. Guided visits by the NeXtpaSs team."
    }, {
      property: "og:title",
      content: "NeXtpaSs — Student housing, passed down"
    }, {
      property: "og:description",
      content: "Graduating students share their rooms. New students find verified housing — no expensive middlemen."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./listings._id-LYKb7fja.mjs");
const Route$4 = createFileRoute("/listings/$id")({
  head: () => ({
    meta: [{
      title: "Listing — NeXtpaSs"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./share-lk2cTdV3.mjs");
const Route$3 = createFileRoute("/_authenticated/share")({
  head: () => ({
    meta: [{
      title: "Share your room — NeXtpaSs"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./my-listings-5jS0RnBo.mjs");
const Route$2 = createFileRoute("/_authenticated/my-listings")({
  head: () => ({
    meta: [{
      title: "My listings — NeXtpaSs"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./history-BH1ye-jI.mjs");
const Route$1 = createFileRoute("/_authenticated/history")({
  head: () => ({
    meta: [{
      title: "History & Favorites — NeXtpaSs"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./admin-bkdaUek7.mjs");
const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [{
      title: "Team dashboard — NeXtpaSs"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const SitemapDotxmlRoute = Route$9.update({
  id: "/sitemap.xml",
  path: "/sitemap.xml",
  getParentRoute: () => Route$a
});
const BrowseRoute = Route$8.update({
  id: "/browse",
  path: "/browse",
  getParentRoute: () => Route$a
});
const AuthRoute = Route$7.update({
  id: "/auth",
  path: "/auth",
  getParentRoute: () => Route$a
});
const AuthenticatedRouteRoute = Route$6.update({
  id: "/_authenticated",
  getParentRoute: () => Route$a
});
const IndexRoute = Route$5.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$a
});
const ListingsIdRoute = Route$4.update({
  id: "/listings/$id",
  path: "/listings/$id",
  getParentRoute: () => Route$a
});
const AuthenticatedShareRoute = Route$3.update({
  id: "/share",
  path: "/share",
  getParentRoute: () => AuthenticatedRouteRoute
});
const AuthenticatedMyListingsRoute = Route$2.update({
  id: "/my-listings",
  path: "/my-listings",
  getParentRoute: () => AuthenticatedRouteRoute
});
const AuthenticatedHistoryRoute = Route$1.update({
  id: "/history",
  path: "/history",
  getParentRoute: () => AuthenticatedRouteRoute
});
const AuthenticatedAdminRoute = Route.update({
  id: "/admin",
  path: "/admin",
  getParentRoute: () => AuthenticatedRouteRoute
});
const AuthenticatedRouteRouteChildren = {
  AuthenticatedAdminRoute,
  AuthenticatedHistoryRoute,
  AuthenticatedMyListingsRoute,
  AuthenticatedShareRoute
};
const AuthenticatedRouteRouteWithChildren = AuthenticatedRouteRoute._addFileChildren(AuthenticatedRouteRouteChildren);
const rootRouteChildren = {
  IndexRoute,
  AuthenticatedRouteRoute: AuthenticatedRouteRouteWithChildren,
  AuthRoute,
  BrowseRoute,
  SitemapDotxmlRoute,
  ListingsIdRoute
};
const routeTree = Route$a._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  Button as B,
  auth as a,
  cn as c,
  db as d,
  router as r
};
