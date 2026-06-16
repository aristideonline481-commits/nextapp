import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { db } from "@/integrations/firebase/client";
import { doc, getDoc } from "firebase/firestore";
import { fmtFCFA } from "@/lib/format";
import { ArrowLeft, Bath, ChefHat, MapPin, Users, Wifi, Zap, Droplets, Loader2, Phone, MessageCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

export const Route = createFileRoute("/listings/$id")({
  head: () => ({ meta: [{ title: "Listing — NeXtpaSs" }] }),
  component: ListingDetail,
});

function ListingDetail() {
  const { id } = useParams({ from: "/listings/$id" });

  const { data, isLoading } = useQuery({
    queryKey: ["house", id],
    queryFn: async () => {
      // Add viewing to history
      try {
        const h = JSON.parse(localStorage.getItem("nextpass_history") || "[]");
        if (!h.includes(id)) {
          localStorage.setItem("nextpass_history", JSON.stringify([id, ...h]));
        }
      } catch(e) {}

      const docRef = doc(db, "houses", id);
      const docSnap = await getDoc(docRef);
      
      if (!docSnap.exists()) return null;
      return { id: docSnap.id, ...docSnap.data() } as any;
    },
  });

  const [activeMediaIndex, setActiveMediaIndex] = useState(0);

  if (isLoading) return <div className="flex justify-center py-24"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>;
  if (!data) return <div className="mx-auto max-w-3xl px-4 py-16 text-center"><p className="text-muted-foreground">Listing not found.</p></div>;

  const images = data.images ?? [];

  const nextMedia = () => setActiveMediaIndex(i => (i + 1) % Math.max(images.length, 1));
  const prevMedia = () => setActiveMediaIndex(i => (i - 1 + Math.max(images.length, 1)) % Math.max(images.length, 1));

  // Phone processing
  const phoneRaw = data.poster_phone || "";
  const phoneClean = phoneRaw.replace(/[^0-9+]/g, "");
  const hasWhatsapp = data.poster_phone_whatsapp === true || data.poster_phone_whatsapp === "true";
  const landlordPhone = data.landlord_phone || ""; // if exists

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <Link to="/browse" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-ink">
        <ArrowLeft className="h-4 w-4" /> Back to browse
      </Link>

      {/* Media Carousel */}
      {images.length > 0 && (
        <div className="mt-6 relative w-full aspect-[4/3] sm:aspect-[21/9] overflow-hidden rounded-3xl bg-black group shadow-sm">
          <MediaViewer media={images[activeMediaIndex]} />
          
          {images.length > 1 && (
            <>
              <button 
                onClick={prevMedia} 
                className="absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 flex items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md transition-all hover:bg-black/70 sm:opacity-0 sm:group-hover:opacity-100"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button 
                onClick={nextMedia} 
                className="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 flex items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md transition-all hover:bg-black/70 sm:opacity-0 sm:group-hover:opacity-100"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}

          {/* Caption Overlay */}
          {images[activeMediaIndex]?.caption && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white text-sm font-medium">
              {images[activeMediaIndex].caption}
            </div>
          )}

          <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md text-white text-xs font-semibold tracking-wide">
            {activeMediaIndex + 1} / {images.length}
          </div>
        </div>
      )}

      <div className="mt-8 grid gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="bg-primary/10 text-primary capitalize border-0 font-semibold">{data.house_type}</Badge>
              <Badge variant="outline" className="border-border">up to {data.max_occupants} {data.max_occupants === 1 ? "person" : "people"}</Badge>
            </div>
            <h1 className="mt-4 font-display text-3xl font-bold leading-tight sm:text-4xl">{data.title}</h1>
            <div className="mt-2 flex items-center gap-1.5 text-muted-foreground font-medium">
              <MapPin className="h-4 w-4" /> {data.neighborhood}, {data.city}
            </div>
          </div>

          {data.description && (
            <section>
              <h2 className="font-display text-xl font-semibold border-b pb-2">About this place</h2>
              <p className="mt-4 whitespace-pre-line leading-relaxed text-muted-foreground">{data.description}</p>
            </section>
          )}

          <section>
            <h2 className="font-display text-xl font-semibold border-b pb-2">House details</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <RuleRow icon={<Users className="h-4 w-4" />} label="Max occupants" value={`${data.max_occupants}`} />
              <RuleRow icon={<Bath className="h-4 w-4" />} label="Toilet" value={data.toilet_type === "private" ? "Private" : `Shared with ${data.toilet_shared_with} others`} />
              <RuleRow icon={<ChefHat className="h-4 w-4" />} label="Kitchen" value={data.kitchen_type === "private" ? "Private" : `Shared with ${data.kitchen_shared_with} others`} />
            </div>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold border-b pb-2">Bills breakdown</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              <BillRow icon={<Wifi className="h-4 w-4" />} label="Wi-Fi" mode={data.wifi_mode} cost={data.wifi_cost_fcfa ?? 0} />
              <BillRow icon={<Zap className="h-4 w-4" />} label="Electricity" mode={data.electricity_mode} cost={data.electricity_cost_fcfa ?? 0} />
              <BillRow icon={<Droplets className="h-4 w-4" />} label="Water" mode={data.water_mode} cost={data.water_cost_fcfa ?? 0} />
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-3xl border bg-card p-6 shadow-md shadow-primary/5">
            <div className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Monthly rent</div>
            <div className="mt-1 font-display text-4xl font-bold text-foreground">{fmtFCFA(data.rent_fcfa)}</div>
            {data.available_from && (
              <div className="mt-3 inline-flex items-center rounded-full bg-green-500/10 px-3 py-1 text-xs font-semibold text-green-700 dark:text-green-400">
                Available from {new Date(data.available_from).toLocaleDateString()}
              </div>
            )}
            
            <div className="my-6 h-px bg-border" />

            <h3 className="font-display text-lg font-semibold mb-4">Contact Current Tenant</h3>
            <div className="flex flex-col gap-3">
              {phoneClean ? (
                <>
                  <Button asChild className="w-full rounded-full h-12 shadow-sm font-semibold transition-transform hover:scale-[1.02]">
                    <a href={`tel:${phoneClean}`}>
                      <Phone className="mr-2 h-4 w-4" /> Call Now
                    </a>
                  </Button>
                  
                  {hasWhatsapp && (
                    <Button asChild variant="outline" className="w-full rounded-full h-12 border-green-500/30 text-green-700 hover:bg-green-500/10 dark:text-green-400 font-semibold transition-transform hover:scale-[1.02]">
                      <a href={`https://wa.me/${phoneClean}`} target="_blank" rel="noreferrer">
                        <MessageCircle className="mr-2 h-4 w-4" /> WhatsApp Us
                      </a>
                    </Button>
                  )}
                </>
              ) : (
                <p className="text-sm text-muted-foreground text-center bg-muted/50 py-3 rounded-xl">Contact number unavailable.</p>
              )}
            </div>

            {landlordPhone && (
              <div className="mt-6 pt-6 border-t">
                <h3 className="font-display text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Landlord Contact</h3>
                <Button asChild variant="secondary" className="w-full rounded-full h-11 text-sm font-medium">
                  <a href={`tel:${landlordPhone.replace(/[^0-9+]/g, "")}`}>
                    <Phone className="mr-2 h-3.5 w-3.5" /> Call Landlord directly
                  </a>
                </Button>
              </div>
            )}
          </div>
        </aside>
      </div>
    </main>
  );
}

function MediaViewer({ media }: { media: any }) {
  if (!media?.url) return <div className="h-full w-full bg-muted" />;
  
  // Parse video based on URL or firebase token if it has one.
  // Assuming URL will contain common extensions or token signature if it's a video. 
  // It's better to store media_type in firestore, but for now we regex.
  const isVideo = media.url.match(/\.(mp4|webm|ogg|mov)(\?|$)/i) || media.type?.startsWith("video/");

  if (isVideo) {
    return (
      <video 
        src={media.url} 
        controls 
        className="h-full w-full object-contain animate-in fade-in duration-500" 
        autoPlay 
        muted 
        loop
      />
    );
  }

  return <img src={media.url} alt="" className="h-full w-full object-cover animate-in fade-in duration-500" />;
}

function RuleRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border bg-card/50 p-4 transition-colors hover:bg-muted/50">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">{icon}</div>
      <div>
        <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{label}</div>
        <div className="mt-0.5 text-sm font-semibold">{value}</div>
      </div>
    </div>
  );
}

function BillRow({ icon, label, mode, cost }: { icon: React.ReactNode; label: string; mode: string; cost: number }) {
  const text = mode === "included" ? "Included in rent" : mode === "fixed" ? fmtFCFA(cost) + " / mo" : "Tenant pays";
  return (
    <div className="rounded-2xl border bg-card/50 p-4 transition-colors hover:bg-muted/50">
      <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
        <span className="text-primary">{icon}</span> {label}
      </div>
      <div className="text-sm font-semibold">{text}</div>
    </div>
  );
}
