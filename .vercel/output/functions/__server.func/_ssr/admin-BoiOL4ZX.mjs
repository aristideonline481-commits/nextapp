import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useQueryClient, a as useQuery, b as useMutation } from "../_libs/tanstack__react-query.mjs";
import { a as auth, d as db, c as cn } from "./router-6m3xeVrp.mjs";
import { g as getDoc, d as doc, q as query, o as orderBy, c as collection, b as getDocs, u as updateDoc } from "../_libs/firebase__firestore.mjs";
import { B as Badge } from "./badge-CnbrDXoI.mjs";
import { f as fmtFCFA } from "./format-6ZrMwQ5f.mjs";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-Gy7Cs48o.mjs";
import { R as Root2, L as List, T as Trigger, C as Content } from "../_libs/radix-ui__react-tabs.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import "../_libs/firebase.mjs";
import "../_libs/firebase__auth.mjs";
import "../_libs/firebase__app.mjs";
import "../_libs/firebase__logger.mjs";
import "../_libs/firebase__storage.mjs";
import { e as LoaderCircle, h as MapPin, H as House, B as Bath, k as ChefHat, W as Wifi, p as User, G as GraduationCap, f as Phone, g as MessageCircle } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "async_hooks";
import "stream";
import "util";
import "crypto";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-dropdown-menu.mjs";
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
import "../_libs/vercel__analytics.mjs";
import "../_libs/vercel__speed-insights.mjs";
import "../_libs/framer-motion.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
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
import "../_libs/radix-ui__react-select.mjs";
import "../_libs/radix-ui__number.mjs";
import "../_libs/radix-ui__react-use-previous.mjs";
import "../_libs/@radix-ui/react-visually-hidden+[...].mjs";
const Tabs = Root2;
const TabsList = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  List,
  {
    ref,
    className: cn(
      "inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
      className
    ),
    ...props
  }
));
TabsList.displayName = List.displayName;
const TabsTrigger = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Trigger,
  {
    ref,
    className: cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow",
      className
    ),
    ...props
  }
));
TabsTrigger.displayName = Trigger.displayName;
const TabsContent = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Content,
  {
    ref,
    className: cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    ),
    ...props
  }
));
TabsContent.displayName = Content.displayName;
function Admin() {
  const [allowed, setAllowed] = reactExports.useState(null);
  reactExports.useEffect(() => {
    (async () => {
      const u = auth.currentUser;
      if (!u) {
        setAllowed(false);
        return;
      }
      try {
        const docSnap = await getDoc(doc(db, "user_roles", u.uid));
        setAllowed(docSnap.exists() && docSnap.data().role === "admin");
      } catch {
        setAllowed(false);
      }
    })();
  }, []);
  if (allowed === null) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center py-24", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-6 w-6 animate-spin text-muted-foreground" }) });
  if (!allowed) return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "mx-auto max-w-2xl px-4 py-16 text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-semibold", children: "Team-only area" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Ask a NeXtpaSs admin to grant your account access." })
  ] });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AdminBoard, {});
}
function AdminBoard() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "mx-auto max-w-6xl px-4 py-10 sm:px-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-semibold sm:text-4xl", children: "Team dashboard" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Full visibility on listings, posters, and incoming visit requests." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "requests", className: "mt-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "rounded-full bg-muted p-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "requests", className: "rounded-full", children: "Visit requests" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "listings", className: "rounded-full", children: "All listings" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "requests", className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(RequestsPanel, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "listings", className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ListingsPanel, {}) })
    ] })
  ] });
}
function RequestsPanel() {
  const qc = useQueryClient();
  const {
    data: requests,
    isLoading
  } = useQuery({
    queryKey: ["admin-requests"],
    queryFn: async () => {
      const q = query(collection(db, "visit_requests"), orderBy("created_at", "desc"));
      const snap = await getDocs(q);
      return snap.docs.map((doc2) => ({
        id: doc2.id,
        ...doc2.data()
      }));
    }
  });
  const updateStatus = useMutation({
    mutationFn: async ({
      id,
      status
    }) => {
      await updateDoc(doc(db, "visit_requests", id), {
        status
      });
    },
    onSuccess: () => {
      toast.success("Updated");
      qc.invalidateQueries({
        queryKey: ["admin-requests"]
      });
    },
    onError: (e) => toast.error(e.message)
  });
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-6 w-6 animate-spin text-muted-foreground" }) });
  if (!requests || requests.length === 0) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl border border-dashed bg-card p-12 text-center text-sm text-muted-foreground", children: "No requests yet." });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: requests.map((r) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border bg-card p-5 shadow-soft", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-start justify-between gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/listings/$id", params: {
          id: r.house_id
        }, className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-semibold", children: r.house_title }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3.5 w-3.5" }),
              " ",
              r.house_neighborhood,
              ", ",
              r.house_city
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 capitalize", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(House, { className: "h-3.5 w-3.5" }),
              " ",
              r.house_type
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium text-ink", children: [
              fmtFCFA(r.rent_fcfa ?? 0),
              "/mo"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "capitalize", variant: "outline", children: r.status }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: r.status, onValueChange: (v) => updateStatus.mutate({
            id: r.id,
            status: v
          }), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "h-9 w-36", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "requested", children: "Requested" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "scheduled", children: "Scheduled" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "visited", children: "Visited" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "closed", children: "Closed (matched)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "cancelled", children: "Cancelled" })
            ] })
          ] })
        ] })
      ] }),
      r.message && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-3 rounded-lg bg-muted p-3 text-sm", children: [
        '"',
        r.message,
        '"'
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 grid gap-3 sm:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ContactCard, { label: "Incoming student", name: r.requester_name, phone: r.requester_phone }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ContactCard, { label: "Departing student (poster)", name: r.poster_name, phone: r.poster_phone, whatsapp: r.poster_whatsapp, school: r.poster_school })
      ] })
    ] }, r.id);
  }) });
}
function ListingsPanel() {
  const {
    data,
    isLoading
  } = useQuery({
    queryKey: ["admin-listings"],
    queryFn: async () => {
      const q = query(collection(db, "houses"), orderBy("created_at", "desc"));
      const snap = await getDocs(q);
      return snap.docs.map((doc2) => ({
        id: doc2.id,
        ...doc2.data()
      }));
    }
  });
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-6 w-6 animate-spin text-muted-foreground" }) });
  if (!data || data.length === 0) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl border border-dashed bg-card p-12 text-center text-sm text-muted-foreground", children: "No listings yet." });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: data.map((h) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border bg-card p-5 shadow-soft", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-start justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/listings/$id", params: {
        id: h.id
      }, className: "min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-semibold", children: h.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3.5 w-3.5" }),
            " ",
            h.neighborhood,
            ", ",
            h.city
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 capitalize", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(House, { className: "h-3.5 w-3.5" }),
            " ",
            h.house_type
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            h.max_occupants,
            " max"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium text-ink", children: [
            fmtFCFA(h.rent_fcfa),
            "/mo"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "capitalize", children: h.status })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex flex-wrap gap-3 text-xs text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Bath, { className: "h-3.5 w-3.5" }),
        " ",
        h.toilet_type
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChefHat, { className: "h-3.5 w-3.5" }),
        " ",
        h.kitchen_type
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Wifi, { className: "h-3.5 w-3.5" }),
        " Wi-Fi ",
        h.wifi_mode
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ContactCard, { label: "Poster", name: h.poster_name, phone: h.poster_phone, whatsapp: h.poster_phone_whatsapp, school: h.poster_school }) })
  ] }, h.id)) });
}
function ContactCard({
  label,
  name,
  phone,
  whatsapp,
  school
}) {
  const waNumber = phone?.replace(/[^\d]/g, "");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-primary/20 bg-primary/5 p-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-medium uppercase tracking-wide text-primary", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 flex items-center gap-2 text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-3.5 w-3.5 text-muted-foreground" }),
      " ",
      name ?? "—"
    ] }),
    school && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "h-3.5 w-3.5" }),
      " ",
      school
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "h-3.5 w-3.5 text-muted-foreground" }),
      phone ? /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: `tel:${phone}`, className: "hover:underline", children: phone }) : "—",
      phone && whatsapp && waNumber && /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: `https://wa.me/${waNumber}`, target: "_blank", rel: "noopener noreferrer", className: "inline-flex items-center gap-1 rounded-full bg-verified/15 px-2 py-0.5 text-xs font-medium text-verified hover:bg-verified/25", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "h-3 w-3" }),
        " WhatsApp"
      ] })
    ] })
  ] });
}
export {
  Admin as component
};
