import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { a as useQuery } from "../_libs/tanstack__react-query.mjs";
import { d as db, B as Button } from "./router-Dotju38c.mjs";
import { b as getDocs, q as query, w as where, i as documentId, c as collection } from "../_libs/firebase__firestore.mjs";
import { f as fmtFCFA } from "./format-6ZrMwQ5f.mjs";
import "../_libs/sonner.mjs";
import "../_libs/firebase.mjs";
import "../_libs/firebase__auth.mjs";
import "../_libs/firebase__app.mjs";
import "../_libs/firebase__logger.mjs";
import "../_libs/firebase__storage.mjs";
import { e as LoaderCircle, S as Search, h as MapPin, o as Heart } from "../_libs/lucide-react.mjs";
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
function HistoryFavorites() {
  const [historyIds, setHistoryIds] = reactExports.useState([]);
  const [favoriteIds, setFavoriteIds] = reactExports.useState([]);
  const [sortBy, setSortBy] = reactExports.useState("favorites_first");
  reactExports.useEffect(() => {
    try {
      const h = JSON.parse(localStorage.getItem("nextpass_history") || "[]");
      const f = JSON.parse(localStorage.getItem("nextpass_favorites") || "[]");
      setHistoryIds(h);
      setFavoriteIds(f);
    } catch (e) {
    }
  }, []);
  const {
    data: houses,
    isLoading
  } = useQuery({
    queryKey: ["history-houses", historyIds],
    enabled: historyIds.length > 0,
    queryFn: async () => {
      const batches = [];
      for (let i = 0; i < historyIds.length; i += 10) {
        const batch = historyIds.slice(i, i + 10);
        batches.push(getDocs(query(collection(db, "houses"), where(documentId(), "in", batch))));
      }
      const snapshots = await Promise.all(batches);
      return snapshots.flatMap((snap) => snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      })));
    }
  });
  const toggleFavorite = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    setFavoriteIds((prev) => {
      const next = prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id];
      localStorage.setItem("nextpass_favorites", JSON.stringify(next));
      return next;
    });
  };
  const sortedHouses = [...houses || []].sort((a, b) => {
    if (sortBy === "favorites_first") {
      const aFav = favoriteIds.includes(a.id);
      const bFav = favoriteIds.includes(b.id);
      if (aFav && !bFav) return -1;
      if (!aFav && bFav) return 1;
    }
    return historyIds.indexOf(b.id) - historyIds.indexOf(a.id);
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "mx-auto max-w-4xl px-4 py-10 sm:px-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-semibold sm:text-4xl", children: "History & Favorites" }),
      historyIds.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: sortBy, onChange: (e) => setSortBy(e.target.value), className: "h-10 rounded-full border bg-background px-4 text-sm font-medium outline-none transition-colors focus:border-primary", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "favorites_first", children: "Favorites First" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "recent_first", children: "Most Recent" })
      ] })
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-6 w-6 animate-spin text-muted-foreground" }) }) : sortedHouses.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 rounded-3xl border border-dashed border-border bg-card p-12 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-muted mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-8 w-8 text-muted-foreground" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-2xl font-semibold tracking-tight", children: "No history yet" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-muted-foreground max-w-sm mx-auto", children: "Rooms you view or favorite will appear here so you can easily find them later." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/browse", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "mt-6 rounded-full px-8 shadow-sm", children: "Browse Rooms" }) })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 space-y-4", children: sortedHouses.map((h) => {
      const isFav = favoriteIds.includes(h.id);
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/listings/$id", params: {
        id: h.id
      }, className: "group relative flex flex-col sm:flex-row gap-4 overflow-hidden rounded-2xl border bg-card p-4 transition-all hover:shadow-md hover:border-primary/50", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-1 flex-col justify-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm text-muted-foreground mb-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "capitalize font-medium text-foreground", children: h.house_type }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "•" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3 w-3" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              h.neighborhood,
              ", ",
              h.city
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl font-semibold group-hover:text-primary transition-colors pr-10", children: h.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 font-semibold text-primary text-lg", children: [
            fmtFCFA(h.rent_fcfa),
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-normal text-muted-foreground", children: "/ month" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-4 right-4 sm:static flex items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: (e) => toggleFavorite(e, h.id), className: `flex h-10 w-10 items-center justify-center rounded-full transition-colors ${isFav ? "bg-red-50 text-red-500 hover:bg-red-100" : "bg-muted text-muted-foreground hover:bg-muted/80"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: `h-5 w-5 ${isFav ? "fill-current" : ""}` }) }) })
      ] }, h.id);
    }) })
  ] });
}
export {
  HistoryFavorites as component
};
