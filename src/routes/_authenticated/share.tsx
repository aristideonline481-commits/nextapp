import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { z } from "zod";
import { auth, db } from "@/integrations/firebase/client";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { cloudinaryConfig } from "@/lib/cloudinary";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Loader2, Upload, X, ArrowRight, ArrowLeft, Check } from "lucide-react";

export const Route = createFileRoute("/_authenticated/share")({
  head: () => ({ meta: [{ title: "Share your room — NeXtpaSs" }] }),
  component: ShareRoom,
});

const schema = z.object({
  title: z.string().trim().min(4).max(120),
  description: z.string().trim().max(2000).optional(),
  house_type: z.enum(["room", "studio", "apartment"]),
  max_occupants: z.coerce.number().int().min(1).max(20).default(1),
  city: z.string().trim().min(2).max(80),
  neighborhood: z.string().trim().min(2).max(80),
  rent_fcfa: z.coerce.number().int().min(0).max(10_000_000),
  available_from: z.string().optional(),
  toilet_type: z.enum(["private", "shared"]),
  toilet_shared_with: z.coerce.number().int().min(0).max(20).default(0),
  kitchen_type: z.enum(["private", "shared"]),
  kitchen_shared_with: z.coerce.number().int().min(0).max(20).default(0),
  wifi_mode: z.enum(["included", "fixed", "tenant"]),
  wifi_cost_fcfa: z.coerce.number().int().min(0).default(0),
  electricity_mode: z.enum(["included", "fixed", "tenant"]),
  electricity_cost_fcfa: z.coerce.number().int().min(0).default(0),
  water_mode: z.enum(["included", "fixed", "tenant"]),
  water_cost_fcfa: z.coerce.number().int().min(0).default(0),
  poster_name: z.string().trim().min(2, { message: "Your full name is required" }).max(120),
  poster_phone: z.string().trim().min(6, { message: "A reachable phone number is required" }).max(30).regex(/^[+\d\s().-]+$/, { message: "Phone number looks invalid" }),
  poster_phone_whatsapp: z.preprocess((v) => v === "on" || v === "true" || v === true, z.boolean()),
  poster_school: z.string().trim().min(2, { message: "Your school name is required" }).max(120),
});

type MediaFile = { file: File; preview: string; caption: string; isVideo: boolean };

function ShareRoom() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const totalSteps = 6;
  
  const [formData, setFormData] = useState<Record<string, any>>({
    house_type: "room",
    max_occupants: 1,
    toilet_type: "private",
    toilet_shared_with: 0,
    kitchen_type: "private",
    kitchen_shared_with: 0,
    wifi_mode: "tenant",
    electricity_mode: "tenant",
    water_mode: "tenant",
    poster_phone_whatsapp: "true",
  });
  
  const [landlordOk, setLandlordOk] = useState(false);
  const [landlordPhone, setLandlordPhone] = useState("");
  const [media, setMedia] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(false);

  // Cleanup object URLs to avoid memory leaks
  useEffect(() => {
    return () => media.forEach((m) => URL.revokeObjectURL(m.preview));
  }, [media]);

  function handleChange(name: string, value: any) {
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function nextStep() { setStep((s) => Math.min(s + 1, totalSteps)); }
  function prevStep() { setStep((s) => Math.max(s - 1, 1)); }

  function addFiles(list: FileList | null) {
    if (!list) return;
    const incoming = Array.from(list).slice(0, 8 - media.length).map(file => ({
      file,
      preview: URL.createObjectURL(file),
      caption: "",
      isVideo: file.type.startsWith("video/")
    }));
    setMedia((cur) => [...cur, ...incoming].slice(0, 8));
  }

  function updateCaption(index: number, caption: string) {
    setMedia(cur => cur.map((m, i) => i === index ? { ...m, caption } : m));
  }

  function removeMedia(index: number) {
    setMedia(cur => cur.filter((_, i) => i !== index));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (step < totalSteps) {
      nextStep();
      return;
    }

    const raw = { ...formData };
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

      const insertPayload: any = { ...parsed.data, poster_id: u.uid, status: "available" };
      if (!insertPayload.available_from) delete insertPayload.available_from;
      if (landlordOk && landlordPhone) {
        insertPayload.landlord_phone = landlordPhone;
      }
      

      const uploadedImages = [];

      // Upload media to Cloudinary
      for (let i = 0; i < media.length; i++) {
        const item = media[i];
        
        const fd = new FormData();
        fd.append("file", item.file);
        fd.append("upload_preset", cloudinaryConfig.uploadPreset);

        const endpointType = item.isVideo ? "video" : "image";
        const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/${endpointType}/upload`, {
          method: "POST",
          body: fd,
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

      // Insert the house doc into Firestore
      await addDoc(collection(db, "houses"), insertPayload);

      toast.success("Listing published! Browsers can now see it.");
      navigate({ to: "/my-listings" });
    } catch (err: any) {
      toast.error(err.message ?? "Could not publish listing");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto flex min-h-[calc(100vh-64px)] max-w-md flex-col px-4 py-8">
      {/* Progress Indicator */}
      <div className="mb-8 w-full space-y-2">
        <div className="flex justify-between text-xs font-medium text-muted-foreground">
          <span>Step {step} of {totalSteps}</span>
          <span className="text-primary">{Math.round((step / totalSteps) * 100)}%</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
          <div 
            className="h-full rounded-full bg-primary transition-all duration-500 ease-out" 
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      <form onSubmit={onSubmit} className="flex flex-1 flex-col">
        <div className="flex-1 animate-in fade-in slide-in-from-bottom-4 duration-500">
          
          {/* STEP 1: BASICS */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h1 className="font-display text-3xl font-semibold tracking-tight">Let's get started.</h1>
                <p className="mt-2 text-muted-foreground">What kind of place are you passing down?</p>
              </div>
              <div className="space-y-5">
                <Field label="Listing title">
                  <Input value={formData.title || ""} onChange={e => handleChange("title", e.target.value)} required placeholder="Sunny studio near campus gate" className="h-12 text-lg" autoFocus />
                </Field>
                <Field label="What is it?">
                  <SelectInput value={formData.house_type} onChange={v => handleChange("house_type", v)} options={[["room","Room"],["studio","Studio"],["apartment","Apartment"]]} />
                </Field>
                <Field label="City">
                  <Input value={formData.city || ""} onChange={e => handleChange("city", e.target.value)} required placeholder="Dakar" className="h-12" />
                </Field>
                <Field label="Neighborhood">
                  <Input value={formData.neighborhood || ""} onChange={e => handleChange("neighborhood", e.target.value)} required placeholder="Mermoz" className="h-12" />
                </Field>
              </div>
            </div>
          )}

          {/* STEP 2: RENT & DETAILS */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h1 className="font-display text-3xl font-semibold tracking-tight">The details.</h1>
                <p className="mt-2 text-muted-foreground">How much is it, and when is it free?</p>
              </div>
              <div className="space-y-5">
                <Field label="Monthly rent (FCFA)">
                  <Input type="number" value={formData.rent_fcfa || ""} onChange={e => handleChange("rent_fcfa", e.target.value)} required min={0} placeholder="75000" className="h-12 text-lg font-medium" autoFocus />
                </Field>
                <Field label="Available from">
                  <Input type="date" value={formData.available_from || ""} onChange={e => handleChange("available_from", e.target.value)} className="h-12" />
                </Field>
                <Field label="Max occupants">
                  <Input type="number" value={formData.max_occupants || 1} onChange={e => handleChange("max_occupants", e.target.value)} min={1} className="h-12" />
                </Field>
                <Field label="Description">
                  <Textarea value={formData.description || ""} onChange={e => handleChange("description", e.target.value)} rows={4} placeholder="Quiet, sunny in the morning, 5 mins walk to campus…" className="resize-none" />
                </Field>
              </div>
            </div>
          )}

          {/* STEP 3: AMENITIES */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h1 className="font-display text-3xl font-semibold tracking-tight">Kitchen & Bath.</h1>
                <p className="mt-2 text-muted-foreground">Are they private or shared?</p>
              </div>
              <div className="space-y-5">
                <Field label="Toilet">
                  <SelectInput value={formData.toilet_type} onChange={v => handleChange("toilet_type", v)} options={[["private","Private"],["shared","Shared"]]} />
                </Field>
                {formData.toilet_type === "shared" && (
                  <Field label="Shared with how many others?">
                    <Input type="number" value={formData.toilet_shared_with || 0} onChange={e => handleChange("toilet_shared_with", e.target.value)} min={0} className="h-12" />
                  </Field>
                )}
                <Field label="Kitchen">
                  <SelectInput value={formData.kitchen_type} onChange={v => handleChange("kitchen_type", v)} options={[["private","Private"],["shared","Shared"]]} />
                </Field>
                {formData.kitchen_type === "shared" && (
                  <Field label="Shared with how many others?">
                    <Input type="number" value={formData.kitchen_shared_with || 0} onChange={e => handleChange("kitchen_shared_with", e.target.value)} min={0} className="h-12" />
                  </Field>
                )}
              </div>
            </div>
          )}

          {/* STEP 4: BILLS */}
          {step === 4 && (
            <div className="space-y-6">
              <div>
                <h1 className="font-display text-3xl font-semibold tracking-tight">The bills.</h1>
                <p className="mt-2 text-muted-foreground">Be honest—nobody likes surprises.</p>
              </div>
              <div className="space-y-6">
                <BillField name="wifi" label="Wi-Fi" data={formData} onChange={handleChange} />
                <BillField name="electricity" label="Electricity" data={formData} onChange={handleChange} />
                <BillField name="water" label="Water" data={formData} onChange={handleChange} />
              </div>
            </div>
          )}

          {/* STEP 5: MEDIA */}
          {step === 5 && (
            <div className="space-y-6">
              <div>
                <h1 className="font-display text-3xl font-semibold tracking-tight">Show it off.</h1>
                <p className="mt-2 text-muted-foreground">Add photos and up to 1 video showing the details.</p>
              </div>
              
              <div className="space-y-4">
                <label className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-3xl border-2 border-dashed border-primary/20 bg-primary/5 p-10 text-center transition-colors hover:border-primary/50 hover:bg-primary/10">
                  <div className="rounded-full bg-background p-3 shadow-sm">
                    <Upload className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <span className="block text-base font-medium">Tap to upload media</span>
                    <span className="mt-1 block text-sm text-muted-foreground">Photos or 1 min video</span>
                  </div>
                  <input type="file" accept="image/*,video/*" multiple className="hidden" onChange={(e) => addFiles(e.target.files)} />
                </label>

                {media.length > 0 && (
                  <div className="space-y-4">
                    {media.map((item, i) => (
                      <div key={i} className="flex gap-4 rounded-2xl border bg-card p-3 shadow-sm">
                        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-muted">
                          {item.isVideo ? (
                            <video src={item.preview} className="h-full w-full object-cover" />
                          ) : (
                            <img src={item.preview} alt="" className="h-full w-full object-cover" />
                          )}
                        </div>
                        <div className="flex flex-1 flex-col justify-center gap-2">
                          <Input 
                            value={item.caption} 
                            onChange={(e) => updateCaption(i, e.target.value)} 
                            placeholder="Add a caption (e.g., Kitchen)" 
                            className="h-9 text-sm"
                          />
                          <button type="button" onClick={() => removeMedia(i)} className="self-start text-xs font-medium text-destructive hover:underline">
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STEP 6: CONTACT */}
          {step === 6 && (
            <div className="space-y-6">
              <div>
                <h1 className="font-display text-3xl font-semibold tracking-tight">Almost done.</h1>
                <p className="mt-2 text-muted-foreground">How should the next tenant reach you?</p>
              </div>
              <div className="space-y-5">
                <Field label="Your full name">
                  <Input value={formData.poster_name || ""} onChange={e => handleChange("poster_name", e.target.value)} required placeholder="Aïssatou Diallo" className="h-12" />
                </Field>
                <Field label="Your school">
                  <Input value={formData.poster_school || ""} onChange={e => handleChange("poster_school", e.target.value)} required placeholder="UCAD" className="h-12" />
                </Field>
                <Field label="Phone number">
                  <Input value={formData.poster_phone || ""} onChange={e => handleChange("poster_phone", e.target.value)} required type="tel" placeholder="+221 77 123 45 67" className="h-12" />
                </Field>
                <Field label="WhatsApp">
                  <button
                    type="button"
                    onClick={() => handleChange("poster_phone_whatsapp", formData.poster_phone_whatsapp === "true" ? "false" : "true")}
                    className={`flex h-12 w-full items-center justify-between rounded-xl border px-4 text-sm font-medium transition-colors ${formData.poster_phone_whatsapp === "true" ? "border-green-500/30 bg-green-500/10 text-green-700 dark:text-green-400" : "bg-background text-muted-foreground"}`}
                  >
                    <span>{formData.poster_phone_whatsapp === "true" ? "Yes, reachable on WhatsApp" : "No WhatsApp on this number"}</span>
                    <span className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${formData.poster_phone_whatsapp === "true" ? "bg-green-500" : "bg-muted"}`}>
                      <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${formData.poster_phone_whatsapp === "true" ? "translate-x-5" : "translate-x-1"}`} />
                    </span>
                  </button>
                </Field>

                <div className="pt-4">
                  <Field label="Landlord Info (Optional)">
                    <button
                      type="button"
                      onClick={() => setLandlordOk(!landlordOk)}
                      className={`flex h-12 w-full items-center justify-between rounded-xl border px-4 text-sm font-medium transition-colors ${landlordOk ? "border-primary/30 bg-primary/10 text-primary" : "bg-background text-muted-foreground"}`}
                    >
                      <span>Share landlord's number too?</span>
                      <div className={`flex h-5 w-5 items-center justify-center rounded border ${landlordOk ? "border-primary bg-primary text-primary-foreground" : "border-input"}`}>
                        {landlordOk && <Check className="h-3 w-3" />}
                      </div>
                    </button>
                  </Field>
                  {landlordOk && (
                    <div className="mt-3 animate-in fade-in slide-in-from-top-2">
                      <Input value={landlordPhone} onChange={e => setLandlordPhone(e.target.value)} placeholder="Landlord's phone number" className="h-12" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

        </div>

        {/* BOTTOM NAVIGATION */}
        <div className="sticky bottom-0 mt-8 flex items-center justify-between border-t bg-background/80 py-4 backdrop-blur-md">
          <Button type="button" variant="ghost" onClick={prevStep} disabled={step === 1 || loading} className="h-12 px-6 rounded-full">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          
          <Button type="submit" disabled={loading} className="h-12 px-8 rounded-full shadow-md transition-transform hover:scale-105 active:scale-95">
            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : (
              <>
                {step === totalSteps ? "Publish Listing" : "Continue"} 
                {step < totalSteps && <ArrowRight className="ml-2 h-4 w-4" />}
              </>
            )}
          </Button>
        </div>
      </form>
    </main>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <Label className="mb-2 block text-sm font-semibold text-foreground">{label}</Label>
      {children}
    </div>
  );
}

function SelectInput({ value, onChange, options }: { value: string; onChange: (v: string) => void; options: [string, string][] }) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="h-12 bg-background"><SelectValue /></SelectTrigger>
      <SelectContent>{options.map(([v, l]) => <SelectItem key={v} value={v}>{l}</SelectItem>)}</SelectContent>
    </Select>
  );
}

function BillField({ name, label, data, onChange }: { name: string; label: string; data: any; onChange: (k: string, v: any) => void }) {
  const modeKey = `${name}_mode`;
  const costKey = `${name}_cost_fcfa`;
  const mode = data[modeKey] || "tenant";
  
  return (
    <div className="rounded-2xl border bg-card p-4 shadow-sm">
      <Field label={label}>
        <Select value={mode} onValueChange={v => {
          onChange(modeKey, v);
          if (v !== "fixed") onChange(costKey, 0);
        }}>
          <SelectTrigger className="h-11 bg-background"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="included">Included in rent</SelectItem>
            <SelectItem value="fixed">Fixed monthly cost</SelectItem>
            <SelectItem value="tenant">Tenant pays separately</SelectItem>
          </SelectContent>
        </Select>
      </Field>
      {mode === "fixed" && (
        <div className="mt-3 animate-in fade-in slide-in-from-top-2">
          <Input type="number" value={data[costKey] || ""} onChange={e => onChange(costKey, e.target.value)} min={0} placeholder="Amount in FCFA" className="h-11" />
        </div>
      )}
    </div>
  );
}
