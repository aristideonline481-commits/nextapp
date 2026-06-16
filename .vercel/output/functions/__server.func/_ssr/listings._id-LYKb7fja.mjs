import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { f as useParams, L as Link } from "../_libs/tanstack__react-router.mjs";
import { a as useQuery } from "../_libs/tanstack__react-query.mjs";
import { d as db, B as Button } from "./router-Dotju38c.mjs";
import { d as doc, g as getDoc } from "../_libs/firebase__firestore.mjs";
import { f as fmtFCFA } from "./format-6ZrMwQ5f.mjs";
import { B as Badge } from "./badge-D2Ty2q3s.mjs";
import "../_libs/sonner.mjs";
import "../_libs/firebase.mjs";
import "../_libs/firebase__auth.mjs";
import "../_libs/firebase__app.mjs";
import "../_libs/firebase__logger.mjs";
import "../_libs/firebase__storage.mjs";
import { e as LoaderCircle, A as ArrowLeft, j as ChevronLeft, C as ChevronRight, h as MapPin, U as Users, B as Bath, k as ChefHat, W as Wifi, Z as Zap, D as Droplets, f as Phone, g as MessageCircle } from "../_libs/lucide-react.mjs";
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
function ListingDetail() {
  const {
    id
  } = useParams({
    from: "/listings/$id"
  });
  const {
    data,
    isLoading
  } = useQuery({
    queryKey: ["house", id],
    queryFn: async () => {
      try {
        const h = JSON.parse(localStorage.getItem("nextpass_history") || "[]");
        if (!h.includes(id)) {
          localStorage.setItem("nextpass_history", JSON.stringify([id, ...h]));
        }
      } catch (e) {
      }
      const docRef = doc(db, "houses", id);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) return null;
      return {
        id: docSnap.id,
        ...docSnap.data()
      };
    }
  });
  const [activeMediaIndex, setActiveMediaIndex] = reactExports.useState(0);
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center py-24", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-6 w-6 animate-spin text-muted-foreground" }) });
  if (!data) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-3xl px-4 py-16 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Listing not found." }) });
  const images = data.images ?? [];
  const nextMedia = () => setActiveMediaIndex((i) => (i + 1) % Math.max(images.length, 1));
  const prevMedia = () => setActiveMediaIndex((i) => (i - 1 + Math.max(images.length, 1)) % Math.max(images.length, 1));
  const phoneRaw = data.poster_phone || "";
  const phoneClean = phoneRaw.replace(/[^0-9+]/g, "");
  const hasWhatsapp = data.poster_phone_whatsapp === true || data.poster_phone_whatsapp === "true";
  const landlordPhone = data.landlord_phone || "";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "mx-auto max-w-5xl px-4 py-8 sm:px-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/browse", className: "inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-ink", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
      " Back to browse"
    ] }),
    images.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 relative w-full aspect-[4/3] sm:aspect-[21/9] overflow-hidden rounded-3xl bg-black group shadow-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(MediaViewer, { media: images[activeMediaIndex] }),
      images.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: prevMedia, className: "absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 flex items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md transition-all hover:bg-black/70 sm:opacity-0 sm:group-hover:opacity-100", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-6 w-6" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: nextMedia, className: "absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 flex items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md transition-all hover:bg-black/70 sm:opacity-0 sm:group-hover:opacity-100", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-6 w-6" }) })
      ] }),
      images[activeMediaIndex]?.caption && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white text-sm font-medium", children: images[activeMediaIndex].caption }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-4 right-4 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md text-white text-xs font-semibold tracking-wide", children: [
        activeMediaIndex + 1,
        " / ",
        images.length
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 grid gap-10 lg:grid-cols-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 space-y-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-primary/10 text-primary capitalize border-0 font-semibold", children: data.house_type }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "border-border", children: [
              "up to ",
              data.max_occupants,
              " ",
              data.max_occupants === 1 ? "person" : "people"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-4 font-display text-3xl font-bold leading-tight sm:text-4xl", children: data.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex items-center gap-1.5 text-muted-foreground font-medium", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-4 w-4" }),
            " ",
            data.neighborhood,
            ", ",
            data.city
          ] })
        ] }),
        data.description && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold border-b pb-2", children: "About this place" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 whitespace-pre-line leading-relaxed text-muted-foreground", children: data.description })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold border-b pb-2", children: "House details" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 grid gap-4 sm:grid-cols-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(RuleRow, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-4 w-4" }), label: "Max occupants", value: `${data.max_occupants}` }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(RuleRow, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Bath, { className: "h-4 w-4" }), label: "Toilet", value: data.toilet_type === "private" ? "Private" : `Shared with ${data.toilet_shared_with} others` }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(RuleRow, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ChefHat, { className: "h-4 w-4" }), label: "Kitchen", value: data.kitchen_type === "private" ? "Private" : `Shared with ${data.kitchen_shared_with} others` })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold border-b pb-2", children: "Bills breakdown" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 grid gap-4 sm:grid-cols-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(BillRow, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Wifi, { className: "h-4 w-4" }), label: "Wi-Fi", mode: data.wifi_mode, cost: data.wifi_cost_fcfa ?? 0 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(BillRow, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "h-4 w-4" }), label: "Electricity", mode: data.electricity_mode, cost: data.electricity_cost_fcfa ?? 0 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(BillRow, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Droplets, { className: "h-4 w-4" }), label: "Water", mode: data.water_mode, cost: data.water_cost_fcfa ?? 0 })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("aside", { className: "lg:sticky lg:top-24 lg:self-start", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl border bg-card p-6 shadow-md shadow-primary/5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium text-muted-foreground uppercase tracking-wide", children: "Monthly rent" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 font-display text-4xl font-bold text-foreground", children: fmtFCFA(data.rent_fcfa) }),
        data.available_from && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 inline-flex items-center rounded-full bg-green-500/10 px-3 py-1 text-xs font-semibold text-green-700 dark:text-green-400", children: [
          "Available from ",
          new Date(data.available_from).toLocaleDateString()
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "my-6 h-px bg-border" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-semibold mb-4", children: "Contact Current Tenant" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-3", children: phoneClean ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, className: "w-full rounded-full h-12 shadow-sm font-semibold transition-transform hover:scale-[1.02]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: `tel:${phoneClean}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "mr-2 h-4 w-4" }),
            " Call Now"
          ] }) }),
          hasWhatsapp && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "outline", className: "w-full rounded-full h-12 border-green-500/30 text-green-700 hover:bg-green-500/10 dark:text-green-400 font-semibold transition-transform hover:scale-[1.02]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: `https://wa.me/${phoneClean}`, target: "_blank", rel: "noreferrer", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "mr-2 h-4 w-4" }),
            " WhatsApp Us"
          ] }) })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground text-center bg-muted/50 py-3 rounded-xl", children: "Contact number unavailable." }) }),
        landlordPhone && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 pt-6 border-t", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3", children: "Landlord Contact" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "secondary", className: "w-full rounded-full h-11 text-sm font-medium", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: `tel:${landlordPhone.replace(/[^0-9+]/g, "")}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "mr-2 h-3.5 w-3.5" }),
            " Call Landlord directly"
          ] }) })
        ] })
      ] }) })
    ] })
  ] });
}
function MediaViewer({
  media
}) {
  if (!media?.url) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full w-full bg-muted" });
  const isVideo = media.url.match(/\.(mp4|webm|ogg|mov)(\?|$)/i) || media.type?.startsWith("video/");
  if (isVideo) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("video", { src: media.url, controls: true, className: "h-full w-full object-contain animate-in fade-in duration-500", autoPlay: true, muted: true, loop: true });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: media.url, alt: "", className: "h-full w-full object-cover animate-in fade-in duration-500" });
}
function RuleRow({
  icon,
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 rounded-2xl border bg-card/50 p-4 transition-colors hover:bg-muted/50", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary", children: icon }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-medium text-muted-foreground uppercase tracking-wide", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-0.5 text-sm font-semibold", children: value })
    ] })
  ] });
}
function BillRow({
  icon,
  label,
  mode,
  cost
}) {
  const text = mode === "included" ? "Included in rent" : mode === "fixed" ? fmtFCFA(cost) + " / mo" : "Tenant pays";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border bg-card/50 p-4 transition-colors hover:bg-muted/50", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: icon }),
      " ",
      label
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold", children: text })
  ] });
}
export {
  ListingDetail as component
};
