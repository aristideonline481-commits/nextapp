import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, KeyRound, Search, ShieldCheck, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AppHeader } from "@/components/AppHeader";
import heroImg from "@/assets/hero-room.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NeXtpaSs — Student housing, passed down" },
      { name: "description", content: "Graduating students share their rooms. New students find verified housing — no expensive middlemen. Guided visits by the NeXtpaSs team." },
      { property: "og:title", content: "NeXtpaSs — Student housing, passed down" },
      { property: "og:description", content: "Graduating students share their rooms. New students find verified housing — no expensive middlemen." },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <AppHeader />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              The student-to-student housing relay
            </div>
            <h1 className="mt-5 font-display text-5xl font-bold leading-[1.05] tracking-tight text-ink sm:text-6xl">
              Your old room, <span className="text-primary italic">someone's</span> first home.
            </h1>
            <p className="mt-5 max-w-lg text-lg text-muted-foreground">
              Graduating? Drop your room details and get paid when it's matched. Looking?
              Browse real verified rooms and request a guided visit — no agency fees, no fake listings.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/auth">
                <Button size="lg" className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow">
                  <KeyRound className="mr-2 h-4 w-4" />
                  Share your room
                </Button>
              </Link>
              <Link to="/browse">
                <Button size="lg" variant="outline" className="rounded-full border-ink/20 text-ink hover:bg-ink hover:text-cream">
                  <Search className="mr-2 h-4 w-4" />
                  Browse rooms
                </Button>
              </Link>
            </div>
            <div className="mt-8 flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-verified" /> Contacts hidden until matched</div>
              <div className="flex items-center gap-2"><Users className="h-4 w-4 text-verified" /> Guided in-person visits</div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-tr from-primary/20 via-transparent to-secondary/10 blur-2xl" />
            <div className="overflow-hidden rounded-[2rem] border border-ink/10 shadow-glow">
              <img src={heroImg} alt="Sunlit student room with desk and bed" width={1536} height={1024} className="h-full w-full object-cover" />
            </div>
            <div className="absolute -bottom-5 -left-5 hidden rounded-2xl border bg-card p-4 shadow-soft sm:block">
              <div className="text-xs text-muted-foreground">Rented this month</div>
              <div className="font-display text-2xl font-bold text-primary">75,000 FCFA</div>
              <div className="text-xs text-muted-foreground">Riverside · Studio</div>
            </div>
          </div>
        </div>
      </section>

      {/* Relay */}
      <section className="border-y border-border bg-secondary text-secondary-foreground">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <p className="text-xs uppercase tracking-[0.2em] text-primary/90">The relay</p>
          <h2 className="mt-3 max-w-2xl font-display text-3xl font-semibold leading-tight sm:text-4xl">
            A literal pass: data in → match made → guided visit → everyone wins.
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <RelayCard step="01" title="Graduating student" body="Snap photos of the room, kitchen, bathroom. List bills, rules, rent. Submit and wait to get paid when matched." />
            <RelayCard step="02" title="Incoming student" body="Browse 100% real student rooms. See exactly what bills are included and the house rules. Request a guided visit." />
            <RelayCard step="03" title="NeXtpaSs team" body="We match, walk the new student through the place in person, and close the deal. Outgoing tenant gets paid, fees stay tiny." />
          </div>
        </div>
      </section>

      {/* Why */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-primary">Why NeXtpaSs</p>
            <h2 className="mt-3 font-display text-3xl font-semibold leading-tight sm:text-4xl">No agents. No ghost listings. Just students passing the keys.</h2>
          </div>
          <ul className="space-y-5">
            <Bullet title="Honest bill breakdown">Rent, Wi-Fi, water, electricity — exactly who pays what, before you visit.</Bullet>
            <Bullet title="Names &amp; numbers stay hidden">Browsers never see who posted. We reveal it only when both sides match.</Bullet>
            <Bullet title="Real photos, real rooms">Each listing comes from a real student who actually lived there.</Bullet>
            <Bullet title="A team that physically shows up">Our crew walks you to the door so you never sign blind.</Bullet>
          </ul>
        </div>
      </section>

      <section className="border-t border-border bg-card">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 px-4 py-16 text-center sm:px-6">
          <h2 className="font-display text-3xl font-semibold sm:text-4xl">Ready to pass the keys?</h2>
          <p className="max-w-xl text-muted-foreground">It takes about two minutes. Add your place, get paid when the next student moves in.</p>
          <Link to="/auth">
            <Button size="lg" className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
              Get started <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-6 text-sm text-muted-foreground sm:px-6">
          <span>© {new Date().getFullYear()} NeXtpaSs</span>
          <span>Built for students.</span>
        </div>
      </footer>
    </div>
  );
}

function RelayCard({ step, title, body }: { step: string; title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-sidebar-border bg-sidebar-accent p-6">
      <div className="font-display text-3xl font-bold text-primary">{step}</div>
      <h3 className="mt-3 font-display text-xl font-semibold">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-secondary-foreground/80">{body}</p>
    </div>
  );
}

function Bullet({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <li className="flex gap-4">
      <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />
      <div>
        <div className="font-semibold text-ink">{title}</div>
        <div className="text-sm text-muted-foreground">{children}</div>
      </div>
    </li>
  );
}
