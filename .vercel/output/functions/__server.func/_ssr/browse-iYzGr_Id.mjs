import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { a as useQuery } from "../_libs/tanstack__react-query.mjs";
import { d as db } from "./router-Dotju38c.mjs";
import { q as query, c as collection, b as getDocs } from "../_libs/firebase__firestore.mjs";
import { f as fmtFCFA } from "./format-6ZrMwQ5f.mjs";
import { B as Badge } from "./badge-D2Ty2q3s.mjs";
import { I as Input } from "./input-D8GBuZMN.mjs";
import "../_libs/sonner.mjs";
import "../_libs/firebase.mjs";
import "../_libs/firebase__auth.mjs";
import "../_libs/firebase__app.mjs";
import "../_libs/firebase__logger.mjs";
import "../_libs/firebase__storage.mjs";
import { S as Search, e as LoaderCircle, f as Phone, g as MessageCircle, h as MapPin, U as Users } from "../_libs/lucide-react.mjs";
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
function useSignedImage(path) {
  return {
    data: path,
    isLoading: false
  };
}
function HouseCard({ house }) {
  const { data: signed } = useSignedImage(house.cover_path);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Link,
    {
      to: "/listings/$id",
      params: { id: house.id },
      className: "group flex flex-col overflow-hidden rounded-2xl border bg-card shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-glow",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[4/3] w-full overflow-hidden bg-muted", children: [
          signed ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: signed,
              alt: `${house.house_type} in ${house.neighborhood}`,
              loading: "lazy",
              className: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-full w-full items-center justify-center text-xs text-muted-foreground", children: "no photo" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "absolute left-3 top-3 bg-verified text-verified-foreground capitalize border-0", children: house.house_type })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-1 flex-col gap-2 p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-start justify-between gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-semibold leading-tight", children: house.title }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-sm text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3.5 w-3.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              house.neighborhood,
              ", ",
              house.city
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-auto flex items-end justify-between pt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-xl font-bold text-primary", children: fmtFCFA(house.rent_fcfa) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "per month" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-3.5 w-3.5" }),
              "up to ",
              house.max_occupants
            ] })
          ] })
        ] })
      ]
    }
  );
}
const TEAM_PHONE_DISPLAY = "+221 07 88 74 26 19";
const TEAM_PHONE_TEL = "+2210788742619";
const TEAM_PHONE_WA = "2210788742619";
function QuickContact({
  variant = "card",
  message
}) {
  const waText = encodeURIComponent(message ?? "Hi NeXtpaSs team, I'd like a quick help finding a room.");
  const waHref = `https://wa.me/${TEAM_PHONE_WA}?text=${waText}`;
  const telHref = `tel:${TEAM_PHONE_TEL}`;
  if (variant === "inline") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "a",
        {
          href: telHref,
          className: "inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-ink hover:bg-muted",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "h-3.5 w-3.5" }),
            " Call team"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "a",
        {
          href: waHref,
          target: "_blank",
          rel: "noopener noreferrer",
          className: "inline-flex items-center gap-1.5 rounded-full bg-verified px-3 py-1.5 text-xs font-medium text-verified-foreground hover:bg-verified/90",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "h-3.5 w-3.5" }),
            " WhatsApp"
          ]
        }
      )
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-primary/20 bg-primary/5 p-4 sm:p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-start justify-between gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold uppercase tracking-wide text-primary", children: "Need a room fast?" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-ink/80", children: "Call or WhatsApp the NeXtpaSs team directly — we'll match you to a room and guide the visit." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 font-display text-sm font-semibold text-ink", children: TEAM_PHONE_DISPLAY })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex flex-wrap gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "a",
        {
          href: telHref,
          className: "inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-border bg-card px-4 py-2.5 text-sm font-medium text-ink hover:bg-muted",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "h-4 w-4" }),
            " Call now"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "a",
        {
          href: waHref,
          target: "_blank",
          rel: "noopener noreferrer",
          className: "inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-verified px-4 py-2.5 text-sm font-medium text-verified-foreground hover:bg-verified/90",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "h-4 w-4" }),
            " WhatsApp us"
          ]
        }
      )
    ] })
  ] });
}
function Browse() {
  const [q, setQ] = reactExports.useState("");
  const {
    data,
    isLoading
  } = useQuery({
    queryKey: ["browse-houses"],
    queryFn: async () => {
      const housesQuery = query(collection(db, "houses"));
      const querySnapshot = await getDocs(housesQuery);
      const allDocs = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      const available = allDocs.filter((h) => h.status === "available");
      return available.sort((a, b) => {
        const timeA = a.created_at?.seconds ?? 0;
        const timeB = b.created_at?.seconds ?? 0;
        return timeB - timeA;
      }).map((h) => ({
        id: h.id,
        title: h.title,
        house_type: h.house_type,
        city: h.city,
        neighborhood: h.neighborhood,
        rent_fcfa: h.rent_fcfa,
        max_occupants: h.max_occupants,
        cover_path: h.images?.[0]?.url ?? null
      }));
    }
  });
  const filtered = reactExports.useMemo(() => {
    if (!data) return [];
    const t = q.trim().toLowerCase();
    if (!t) return data;
    return data.filter((h) => `${h.title} ${h.neighborhood} ${h.city} ${h.house_type}`.toLowerCase().includes(t));
  }, [data, q]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "mx-auto max-w-6xl px-4 py-10 sm:px-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(QuickContact, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-semibold tracking-tight sm:text-4xl", children: "Available rooms" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Real listings from graduating students. Tap one to see the full breakdown." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full sm:w-72", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: q, onChange: (e) => setQ(e.target.value), placeholder: "Neighborhood or type…", className: "h-11 rounded-full pl-9" })
      ] })
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-6 w-6 animate-spin text-muted-foreground" }) }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-12 rounded-2xl border border-dashed bg-card p-12 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-xl font-semibold", children: "No rooms yet" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Be the first to pass the keys." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/share", className: "mt-4 inline-flex rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90", children: "Share your room" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3", children: filtered.map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx(HouseCard, { house: h }, h.id)) })
  ] });
}
export {
  Browse as component
};
