import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { B as Button, a as auth, d as db, c as cn } from "./router-Dotju38c.mjs";
import { e as serverTimestamp, f as addDoc, c as collection } from "../_libs/firebase__firestore.mjs";
import { I as Input } from "./input-D8GBuZMN.mjs";
import { L as Label } from "./label-CpoIMdm0.mjs";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-DOTpP_nA.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import "../_libs/firebase.mjs";
import "../_libs/firebase__auth.mjs";
import "../_libs/firebase__app.mjs";
import "../_libs/firebase__logger.mjs";
import "../_libs/firebase__storage.mjs";
import { l as Upload, c as Check, A as ArrowLeft, e as LoaderCircle, i as ArrowRight } from "../_libs/lucide-react.mjs";
import { o as objectType, s as stringType, p as preprocessType, b as booleanType, c as coerce, e as enumType } from "../_libs/zod.mjs";
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
import "../_libs/tanstack__react-query.mjs";
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
import "../_libs/radix-ui__react-label.mjs";
import "../_libs/radix-ui__react-select.mjs";
import "../_libs/radix-ui__number.mjs";
import "../_libs/radix-ui__react-use-previous.mjs";
import "../_libs/@radix-ui/react-visually-hidden+[...].mjs";
const cloudinaryConfig = {
  // Your Cloud Name (from the dashboard)
  cloudName: "daruka8jd",
  // The Unsigned preset name you just created
  uploadPreset: "nextpass"
};
const Textarea = reactExports.forwardRef(
  ({ className, ...props }, ref) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "textarea",
      {
        className: cn(
          "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Textarea.displayName = "Textarea";
const schema = objectType({
  title: stringType().trim().min(4).max(120),
  description: stringType().trim().max(2e3).optional(),
  house_type: enumType(["room", "studio", "apartment"]),
  max_occupants: coerce.number().int().min(1).max(20).default(1),
  city: stringType().trim().min(2).max(80),
  neighborhood: stringType().trim().min(2).max(80),
  rent_fcfa: coerce.number().int().min(0).max(1e7),
  available_from: stringType().optional(),
  toilet_type: enumType(["private", "shared"]),
  toilet_shared_with: coerce.number().int().min(0).max(20).default(0),
  kitchen_type: enumType(["private", "shared"]),
  kitchen_shared_with: coerce.number().int().min(0).max(20).default(0),
  wifi_mode: enumType(["included", "fixed", "tenant"]),
  wifi_cost_fcfa: coerce.number().int().min(0).default(0),
  electricity_mode: enumType(["included", "fixed", "tenant"]),
  electricity_cost_fcfa: coerce.number().int().min(0).default(0),
  water_mode: enumType(["included", "fixed", "tenant"]),
  water_cost_fcfa: coerce.number().int().min(0).default(0),
  poster_name: stringType().trim().min(2, {
    message: "Your full name is required"
  }).max(120),
  poster_phone: stringType().trim().min(6, {
    message: "A reachable phone number is required"
  }).max(30).regex(/^[+\d\s().-]+$/, {
    message: "Phone number looks invalid"
  }),
  poster_phone_whatsapp: preprocessType((v) => v === "on" || v === "true" || v === true, booleanType()),
  poster_school: stringType().trim().min(2, {
    message: "Your school name is required"
  }).max(120)
});
function ShareRoom() {
  const navigate = useNavigate();
  const [step, setStep] = reactExports.useState(1);
  const totalSteps = 6;
  const [formData, setFormData] = reactExports.useState({
    house_type: "room",
    max_occupants: 1,
    toilet_type: "private",
    toilet_shared_with: 0,
    kitchen_type: "private",
    kitchen_shared_with: 0,
    wifi_mode: "tenant",
    electricity_mode: "tenant",
    water_mode: "tenant",
    poster_phone_whatsapp: "true"
  });
  const [landlordOk, setLandlordOk] = reactExports.useState(false);
  const [landlordPhone, setLandlordPhone] = reactExports.useState("");
  const [media, setMedia] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(false);
  reactExports.useEffect(() => {
    return () => media.forEach((m) => URL.revokeObjectURL(m.preview));
  }, [media]);
  function handleChange(name, value) {
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  }
  function nextStep() {
    setStep((s) => Math.min(s + 1, totalSteps));
  }
  function prevStep() {
    setStep((s) => Math.max(s - 1, 1));
  }
  function addFiles(list) {
    if (!list) return;
    const incoming = Array.from(list).slice(0, 8 - media.length).map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      caption: "",
      isVideo: file.type.startsWith("video/")
    }));
    setMedia((cur) => [...cur, ...incoming].slice(0, 8));
  }
  function updateCaption(index, caption) {
    setMedia((cur) => cur.map((m, i) => i === index ? {
      ...m,
      caption
    } : m));
  }
  function removeMedia(index) {
    setMedia((cur) => cur.filter((_, i) => i !== index));
  }
  async function onSubmit(e) {
    e.preventDefault();
    if (step < totalSteps) {
      nextStep();
      return;
    }
    const raw = {
      ...formData
    };
    const parsed = schema.safeParse(raw);
    if (!parsed.success) {
      toast.error(parsed.error.errors[0].message);
      return;
    }
    if (media.length === 0) {
      toast.error("Add at least one photo or video");
      return;
    }
    setLoading(true);
    try {
      const u = auth.currentUser;
      if (!u) throw new Error("Not signed in");
      const insertPayload = {
        ...parsed.data,
        poster_id: u.uid,
        status: "available"
      };
      if (!insertPayload.available_from) delete insertPayload.available_from;
      if (landlordOk && landlordPhone) {
        insertPayload.landlord_phone = landlordPhone;
      }
      const uploadedImages = [];
      for (let i = 0; i < media.length; i++) {
        const item = media[i];
        const fd = new FormData();
        fd.append("file", item.file);
        fd.append("upload_preset", cloudinaryConfig.uploadPreset);
        const endpointType = item.isVideo ? "video" : "image";
        const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/${endpointType}/upload`, {
          method: "POST",
          body: fd
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error?.message || "Cloudinary upload failed");
        uploadedImages.push({
          url: data.secure_url,
          caption: item.caption,
          type: item.file.type
        });
      }
      insertPayload.images = uploadedImages;
      insertPayload.created_at = serverTimestamp();
      await addDoc(collection(db, "houses"), insertPayload);
      toast.success("Listing published! Browsers can now see it.");
      navigate({
        to: "/my-listings"
      });
    } catch (err) {
      toast.error(err.message ?? "Could not publish listing");
    } finally {
      setLoading(false);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "mx-auto flex min-h-[calc(100vh-64px)] max-w-md flex-col px-4 py-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8 w-full space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs font-medium text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          "Step ",
          step,
          " of ",
          totalSteps
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-primary", children: [
          Math.round(step / totalSteps * 100),
          "%"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 w-full overflow-hidden rounded-full bg-secondary", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full rounded-full bg-primary transition-all duration-500 ease-out", style: {
        width: `${step / totalSteps * 100}%`
      } }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit, className: "flex flex-1 flex-col", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 animate-in fade-in slide-in-from-bottom-4 duration-500", children: [
        step === 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-semibold tracking-tight", children: "Let's get started." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-muted-foreground", children: "What kind of place are you passing down?" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Listing title", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: formData.title || "", onChange: (e) => handleChange("title", e.target.value), required: true, placeholder: "Sunny studio near campus gate", className: "h-12 text-lg", autoFocus: true }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "What is it?", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectInput, { value: formData.house_type, onChange: (v) => handleChange("house_type", v), options: [["room", "Room"], ["studio", "Studio"], ["apartment", "Apartment"]] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "City", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: formData.city || "", onChange: (e) => handleChange("city", e.target.value), required: true, placeholder: "Dakar", className: "h-12" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Neighborhood", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: formData.neighborhood || "", onChange: (e) => handleChange("neighborhood", e.target.value), required: true, placeholder: "Mermoz", className: "h-12" }) })
          ] })
        ] }),
        step === 2 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-semibold tracking-tight", children: "The details." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-muted-foreground", children: "How much is it, and when is it free?" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Monthly rent (FCFA)", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", value: formData.rent_fcfa || "", onChange: (e) => handleChange("rent_fcfa", e.target.value), required: true, min: 0, placeholder: "75000", className: "h-12 text-lg font-medium", autoFocus: true }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Available from", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "date", value: formData.available_from || "", onChange: (e) => handleChange("available_from", e.target.value), className: "h-12" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Max occupants", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", value: formData.max_occupants || 1, onChange: (e) => handleChange("max_occupants", e.target.value), min: 1, className: "h-12" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Description", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { value: formData.description || "", onChange: (e) => handleChange("description", e.target.value), rows: 4, placeholder: "Quiet, sunny in the morning, 5 mins walk to campus…", className: "resize-none" }) })
          ] })
        ] }),
        step === 3 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-semibold tracking-tight", children: "Kitchen & Bath." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-muted-foreground", children: "Are they private or shared?" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Toilet", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectInput, { value: formData.toilet_type, onChange: (v) => handleChange("toilet_type", v), options: [["private", "Private"], ["shared", "Shared"]] }) }),
            formData.toilet_type === "shared" && /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Shared with how many others?", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", value: formData.toilet_shared_with || 0, onChange: (e) => handleChange("toilet_shared_with", e.target.value), min: 0, className: "h-12" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Kitchen", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectInput, { value: formData.kitchen_type, onChange: (v) => handleChange("kitchen_type", v), options: [["private", "Private"], ["shared", "Shared"]] }) }),
            formData.kitchen_type === "shared" && /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Shared with how many others?", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", value: formData.kitchen_shared_with || 0, onChange: (e) => handleChange("kitchen_shared_with", e.target.value), min: 0, className: "h-12" }) })
          ] })
        ] }),
        step === 4 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-semibold tracking-tight", children: "The bills." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-muted-foreground", children: "Be honest—nobody likes surprises." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(BillField, { name: "wifi", label: "Wi-Fi", data: formData, onChange: handleChange }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(BillField, { name: "electricity", label: "Electricity", data: formData, onChange: handleChange }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(BillField, { name: "water", label: "Water", data: formData, onChange: handleChange })
          ] })
        ] }),
        step === 5 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-semibold tracking-tight", children: "Show it off." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-muted-foreground", children: "Add photos and up to 1 video showing the details." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex cursor-pointer flex-col items-center justify-center gap-3 rounded-3xl border-2 border-dashed border-primary/20 bg-primary/5 p-10 text-center transition-colors hover:border-primary/50 hover:bg-primary/10", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-full bg-background p-3 shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-6 w-6 text-primary" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-base font-medium", children: "Tap to upload media" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-1 block text-sm text-muted-foreground", children: "Photos or 1 min video" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "file", accept: "image/*,video/*", multiple: true, className: "hidden", onChange: (e) => addFiles(e.target.files) })
            ] }),
            media.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: media.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 rounded-2xl border bg-card p-3 shadow-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-muted", children: item.isVideo ? /* @__PURE__ */ jsxRuntimeExports.jsx("video", { src: item.preview, className: "h-full w-full object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: item.preview, alt: "", className: "h-full w-full object-cover" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-1 flex-col justify-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: item.caption, onChange: (e) => updateCaption(i, e.target.value), placeholder: "Add a caption (e.g., Kitchen)", className: "h-9 text-sm" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => removeMedia(i), className: "self-start text-xs font-medium text-destructive hover:underline", children: "Remove" })
              ] })
            ] }, i)) })
          ] })
        ] }),
        step === 6 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-semibold tracking-tight", children: "Almost done." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-muted-foreground", children: "How should the next tenant reach you?" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Your full name", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: formData.poster_name || "", onChange: (e) => handleChange("poster_name", e.target.value), required: true, placeholder: "Aïssatou Diallo", className: "h-12" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Your school", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: formData.poster_school || "", onChange: (e) => handleChange("poster_school", e.target.value), required: true, placeholder: "UCAD", className: "h-12" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Phone number", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: formData.poster_phone || "", onChange: (e) => handleChange("poster_phone", e.target.value), required: true, type: "tel", placeholder: "+221 77 123 45 67", className: "h-12" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "WhatsApp", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => handleChange("poster_phone_whatsapp", formData.poster_phone_whatsapp === "true" ? "false" : "true"), className: `flex h-12 w-full items-center justify-between rounded-xl border px-4 text-sm font-medium transition-colors ${formData.poster_phone_whatsapp === "true" ? "border-green-500/30 bg-green-500/10 text-green-700 dark:text-green-400" : "bg-background text-muted-foreground"}`, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formData.poster_phone_whatsapp === "true" ? "Yes, reachable on WhatsApp" : "No WhatsApp on this number" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${formData.poster_phone_whatsapp === "true" ? "bg-green-500" : "bg-muted"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${formData.poster_phone_whatsapp === "true" ? "translate-x-5" : "translate-x-1"}` }) })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Landlord Info (Optional)", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => setLandlordOk(!landlordOk), className: `flex h-12 w-full items-center justify-between rounded-xl border px-4 text-sm font-medium transition-colors ${landlordOk ? "border-primary/30 bg-primary/10 text-primary" : "bg-background text-muted-foreground"}`, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Share landlord's number too?" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `flex h-5 w-5 items-center justify-center rounded border ${landlordOk ? "border-primary bg-primary text-primary-foreground" : "border-input"}`, children: landlordOk && /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3 w-3" }) })
              ] }) }),
              landlordOk && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 animate-in fade-in slide-in-from-top-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: landlordPhone, onChange: (e) => setLandlordPhone(e.target.value), placeholder: "Landlord's phone number", className: "h-12" }) })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sticky bottom-0 mt-8 flex items-center justify-between border-t bg-background/80 py-4 backdrop-blur-md", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "button", variant: "ghost", onClick: prevStep, disabled: step === 1 || loading, className: "h-12 px-6 rounded-full", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "mr-2 h-4 w-4" }),
          " Back"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", disabled: loading, className: "h-12 px-8 rounded-full shadow-md transition-transform hover:scale-105 active:scale-95", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-5 w-5 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          step === totalSteps ? "Publish Listing" : "Continue",
          step < totalSteps && /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "ml-2 h-4 w-4" })
        ] }) })
      ] })
    ] })
  ] });
}
function Field({
  label,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "mb-2 block text-sm font-semibold text-foreground", children: label }),
    children
  ] });
}
function SelectInput({
  value,
  onChange,
  options
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value, onValueChange: onChange, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "h-12 bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: options.map(([v, l]) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: v, children: l }, v)) })
  ] });
}
function BillField({
  name,
  label,
  data,
  onChange
}) {
  const modeKey = `${name}_mode`;
  const costKey = `${name}_cost_fcfa`;
  const mode = data[modeKey] || "tenant";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border bg-card p-4 shadow-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: mode, onValueChange: (v) => {
      onChange(modeKey, v);
      if (v !== "fixed") onChange(costKey, 0);
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "h-11 bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "included", children: "Included in rent" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "fixed", children: "Fixed monthly cost" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "tenant", children: "Tenant pays separately" })
      ] })
    ] }) }),
    mode === "fixed" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 animate-in fade-in slide-in-from-top-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", value: data[costKey] || "", onChange: (e) => onChange(costKey, e.target.value), min: 0, placeholder: "Amount in FCFA", className: "h-11" }) })
  ] });
}
export {
  ShareRoom as component
};
