import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { auth, db } from "@/integrations/firebase/client";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { cloudinaryConfig } from "@/lib/cloudinary";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2, Upload, ArrowLeft } from "lucide-react";
import { z } from "zod";

const searchSchema = z.object({
  house_id: z.string().optional(),
  city: z.string().optional(),
  neighborhood: z.string().optional(),
  name: z.string().optional(),
  phone: z.string().optional(),
}).catch({});

export const Route = createFileRoute("/_authenticated/market-post")({
  validateSearch: searchSchema,
  head: () => ({ meta: [{ title: "Sell an Item — OnMoveIn" }] }),
  component: MarketPost,
});

type MediaFile = { file: File; preview: string; isVideo: boolean };

function MarketPost() {
  const search = Route.useSearch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  const isLinked = !!search.house_id;

  const [formData, setFormData] = useState({
    title: "",
    price_fcfa: "",
    city: search.city || "",
    neighborhood: search.neighborhood || "",
    poster_name: search.name || "",
    poster_phone: search.phone || "",
  });

  const [media, setMedia] = useState<MediaFile[]>([]);

  useEffect(() => {
    return () => media.forEach((m) => URL.revokeObjectURL(m.preview));
  }, [media]);

  function handleChange(name: string, value: string) {
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function addFiles(list: FileList | null) {
    if (!list) return;
    const incoming = Array.from(list).slice(0, 4 - media.length).map(file => ({
      file,
      preview: URL.createObjectURL(file),
      isVideo: file.type.startsWith("video/")
    }));
    setMedia((cur) => [...cur, ...incoming].slice(0, 4));
  }

  function removeMedia(index: number) {
    setMedia(cur => cur.filter((_, i) => i !== index));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formData.title.trim()) return toast.error("Please provide an item name");
    if (!formData.price_fcfa) return toast.error("Please provide a price");
    if (!isLinked) {
      if (!formData.city.trim() || !formData.neighborhood.trim()) return toast.error("Location is required");
      if (!formData.poster_name.trim() || !formData.poster_phone.trim()) return toast.error("Contact info is required");
    }
    if (media.length === 0) return toast.error("Please add at least one photo");

    setLoading(true);
    try {
      const u = auth.currentUser;
      if (!u) throw new Error("Not signed in");

      const uploadedImages = [];
      for (let i = 0; i < media.length; i++) {
        const item = media[i];
        const fd = new FormData();
        fd.append("file", item.file);
        fd.append("upload_preset", cloudinaryConfig.uploadPreset);

        const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/upload`, {
          method: "POST",
          body: fd,
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error?.message || "Upload failed");
        uploadedImages.push(data.secure_url);
      }

      const insertPayload = {
        title: formData.title.trim(),
        price_fcfa: parseInt(formData.price_fcfa, 10),
        city: formData.city.trim(),
        neighborhood: formData.neighborhood.trim(),
        poster_name: formData.poster_name.trim(),
        poster_phone: formData.poster_phone.trim(),
        poster_id: u.uid,
        images: uploadedImages,
        status: "available",
        created_at: serverTimestamp(),
        ...(search.house_id ? { linked_house_id: search.house_id } : {})
      };

      await addDoc(collection(db, "market_items"), insertPayload);
      toast.success("Item posted successfully!");
      
      // Clear form so they can post another item easily if they want
      setFormData(prev => ({ ...prev, title: "", price_fcfa: "" }));
      setMedia([]);
      
      // If linked, we might want to stay here to post more, or go to market. We'll ask them via toast.
      // But navigating to market is safest.
      navigate({ to: "/market" });
    } catch (err: any) {
      toast.error(err.message ?? "Could not publish item");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto flex min-h-[calc(100vh-64px)] max-w-md flex-col px-4 py-8">
      <div className="mb-6 flex items-center gap-3">
        <button onClick={() => navigate({ to: isLinked ? "/my-listings" : "/market" })} className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/50 text-ink hover:bg-accent">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div>
          <h1 className="font-display text-2xl font-semibold tracking-tight">Selling Journal</h1>
          {isLinked && <p className="text-xs text-primary font-medium">Linked to your room in {search.neighborhood}</p>}
        </div>
      </div>

      <form onSubmit={onSubmit} className="flex flex-1 flex-col space-y-6">
        <div className="space-y-4">
          <div>
            <Label className="mb-2 block text-sm font-semibold">What are you selling?</Label>
            <Input value={formData.title} onChange={e => handleChange("title", e.target.value)} required placeholder="e.g., Mini Fridge, Study Desk..." className="h-12" autoFocus />
          </div>
          
          <div>
            <Label className="mb-2 block text-sm font-semibold">Price (FCFA)</Label>
            <Input type="number" value={formData.price_fcfa} onChange={e => handleChange("price_fcfa", e.target.value)} required min={0} placeholder="25000" className="h-12 font-medium" />
          </div>

          {!isLinked && (
            <>
              <div>
                <Label className="mb-2 block text-sm font-semibold">City</Label>
                <Input value={formData.city} onChange={e => handleChange("city", e.target.value)} required placeholder="Dakar" className="h-12" />
              </div>
              <div>
                <Label className="mb-2 block text-sm font-semibold">Neighborhood</Label>
                <Input value={formData.neighborhood} onChange={e => handleChange("neighborhood", e.target.value)} required placeholder="Mermoz" className="h-12" />
              </div>
              <div>
                <Label className="mb-2 block text-sm font-semibold">Your Name</Label>
                <Input value={formData.poster_name} onChange={e => handleChange("poster_name", e.target.value)} required placeholder="Aïssatou Diallo" className="h-12" />
              </div>
              <div>
                <Label className="mb-2 block text-sm font-semibold">Phone / WhatsApp</Label>
                <Input value={formData.poster_phone} onChange={e => handleChange("poster_phone", e.target.value)} required type="tel" placeholder="+221 77 123 45 67" className="h-12" />
              </div>
            </>
          )}

          <div>
            <Label className="mb-2 block text-sm font-semibold">Photos (Max 4)</Label>
            <div className="grid grid-cols-4 gap-2 mb-3">
              {media.map((item, i) => (
                <div key={i} className="relative aspect-square overflow-hidden rounded-xl border">
                  <img src={item.preview} alt="" className="h-full w-full object-cover" />
                  <button type="button" onClick={() => removeMedia(i)} className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md">
                    &times;
                  </button>
                </div>
              ))}
              {media.length < 4 && (
                <label className="flex aspect-square cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-primary/30 bg-primary/5 text-primary transition-colors hover:bg-primary/10">
                  <Upload className="h-5 w-5 mb-1" />
                  <span className="text-[10px] font-medium">Add</span>
                  <input type="file" accept="image/*" multiple className="hidden" onChange={(e) => addFiles(e.target.files)} />
                </label>
              )}
            </div>
          </div>
        </div>

        <div className="mt-auto pt-6 pb-4">
          <Button type="submit" disabled={loading} className="h-14 w-full rounded-2xl text-lg shadow-md transition-transform hover:scale-[1.02] active:scale-95">
            {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : "Publish Item"}
          </Button>
        </div>
      </form>
    </main>
  );
}
