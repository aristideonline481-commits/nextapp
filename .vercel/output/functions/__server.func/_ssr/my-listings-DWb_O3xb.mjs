import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useQueryClient, a as useQuery, b as useMutation } from "../_libs/tanstack__react-query.mjs";
import { a as auth, d as db, B as Button } from "./router-6m3xeVrp.mjs";
import { q as query, w as where, c as collection, b as getDocs, h as deleteDoc, d as doc } from "../_libs/firebase__firestore.mjs";
import { f as fmtFCFA } from "./format-6ZrMwQ5f.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import "../_libs/firebase.mjs";
import "../_libs/firebase__auth.mjs";
import "../_libs/firebase__app.mjs";
import "../_libs/firebase__logger.mjs";
import "../_libs/firebase__storage.mjs";
import { P as Plus, e as LoaderCircle, H as House, T as Trash2, m as Clock, n as CircleCheck, d as Circle } from "../_libs/lucide-react.mjs";
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
const TRACKER_STEPS = [{
  id: "available",
  label: "Listed",
  icon: House
}, {
  id: "viewing_requested",
  label: "Viewing Requested",
  icon: Clock
}, {
  id: "matched",
  label: "Match Confirmed",
  icon: CircleCheck
}, {
  id: "closed",
  label: "Done & Paid",
  icon: CircleCheck
}];
function getStepIndex(status) {
  if (status === "closed") return 3;
  if (status === "matched") return 2;
  if (status === "viewing_requested" || status === "viewing") return 1;
  return 0;
}
function StatusTracker({
  status
}) {
  const currentIndex = getStepIndex(status);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 pt-4 border-t border-border/50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex justify-between", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-0 top-1/2 -translate-y-1/2 h-1 w-full bg-muted rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full bg-primary transition-all duration-500 ease-out", style: {
      width: `${currentIndex / (TRACKER_STEPS.length - 1) * 100}%`
    } }) }),
    TRACKER_STEPS.map((step, index) => {
      const isCompleted = index <= currentIndex;
      const isCurrent = index === currentIndex;
      const Icon = isCompleted ? step.icon : Circle;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex flex-col items-center gap-2 z-10 group", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `
                flex h-8 w-8 items-center justify-center rounded-full border-2 transition-colors duration-300
                ${isCompleted ? "bg-primary border-primary text-primary-foreground shadow-sm" : "bg-card border-muted text-muted-foreground"}
                ${isCurrent ? "ring-4 ring-primary/20 scale-110" : ""}
              `, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `h-4 w-4 ${isCompleted && !isCurrent ? "animate-in zoom-in" : ""}` }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-[10px] sm:text-xs font-medium max-w-[70px] text-center leading-tight transition-colors
                ${isCurrent ? "text-primary" : isCompleted ? "text-foreground" : "text-muted-foreground"}
              `, children: step.label })
      ] }, step.id);
    })
  ] }) });
}
function MyListings() {
  const qc = useQueryClient();
  const {
    data,
    isLoading
  } = useQuery({
    queryKey: ["my-listings"],
    queryFn: async () => {
      const user = auth.currentUser;
      if (!user) return [];
      const housesQuery = query(collection(db, "houses"), where("poster_id", "==", user.uid));
      const snap = await getDocs(housesQuery);
      const docs = snap.docs.map((doc2) => ({
        id: doc2.id,
        ...doc2.data()
      }));
      return docs.sort((a, b) => {
        const timeA = a.created_at?.seconds ?? 0;
        const timeB = b.created_at?.seconds ?? 0;
        return timeB - timeA;
      });
    }
  });
  const del = useMutation({
    mutationFn: async (id) => {
      await deleteDoc(doc(db, "houses", id));
    },
    onSuccess: () => {
      toast.success("Listing removed");
      qc.invalidateQueries({
        queryKey: ["my-listings"]
      });
    },
    onError: (e) => toast.error(e.message)
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "mx-auto max-w-4xl px-4 py-10 sm:px-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-semibold sm:text-4xl", children: "Your listings" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/share", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "rounded-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm transition-transform hover:scale-105", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "mr-2 h-4 w-4" }),
        " Pass a Room"
      ] }) })
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-6 w-6 animate-spin text-muted-foreground" }) }) : (data?.length ?? 0) === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 rounded-3xl border border-dashed border-primary/20 bg-primary/5 p-12 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(House, { className: "h-8 w-8 text-primary" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-2xl font-semibold tracking-tight", children: "No listings yet" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-muted-foreground max-w-sm mx-auto", children: "Pass on your room to the next student and get paid when the match is successful." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/share", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "mt-6 rounded-full px-8 shadow-sm", children: "Get Started" }) })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 space-y-6", children: data.map((h) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden rounded-3xl border bg-card p-5 sm:p-6 shadow-sm transition-all hover:shadow-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-start justify-between gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/listings/$id", params: {
          id: h.id
        }, className: "group min-w-0 flex-1 block", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "truncate font-display text-xl font-semibold group-hover:text-primary transition-colors", children: h.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 flex items-center gap-2 text-sm text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "capitalize", children: h.house_type }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "•" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              h.neighborhood,
              ", ",
              h.city
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 font-semibold text-foreground text-lg", children: [
            fmtFCFA(h.rent_fcfa),
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-normal text-muted-foreground", children: "/ month" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-4 right-4 sm:static", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", onClick: () => del.mutate(h.id), className: "text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-full h-10 w-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-5 w-5" }) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatusTracker, { status: h.status })
    ] }, h.id)) })
  ] });
}
export {
  MyListings as component
};
