import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, KeyRound, Search, ShieldCheck, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/hero-room.jpg";
import { motion } from "framer-motion";

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

const fadeInUp = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.08
    }
  }
};

function Landing() {
  return (
    <div className="min-h-screen bg-cream selection:bg-primary/20 selection:text-primary font-sans text-ink">
      {/* Hero */}
      <section className="relative pt-12 pb-20 sm:pb-32 lg:pb-40 border-b border-border/60">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2">
          <motion.div 
            className="relative z-10"
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            <motion.h1 variants={fadeInUp} className="font-display text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
              Your old room, <br className="hidden sm:block" /><span className="text-primary italic">someone's</span> first home.
            </motion.h1>
            <motion.p variants={fadeInUp} className="mt-6 max-w-lg text-lg text-ink/70 leading-relaxed">
              Graduating? Drop your room details and get paid when it's matched. Looking?
              Browse real verified rooms and request a guided visit — no agency fees, no fake listings.
            </motion.p>
            <motion.div variants={fadeInUp} className="mt-8 flex flex-wrap gap-4">
              <Link to="/auth">
                <Button size="lg" className="rounded-full bg-ink text-cream hover:bg-ink/90 shadow-none transition-transform hover:-translate-y-0.5 px-6">
                  <KeyRound className="mr-2 h-4 w-4" />
                  Share your room
                </Button>
              </Link>
              <Link to="/browse">
                <Button size="lg" variant="outline" className="rounded-full border-ink/20 text-ink bg-transparent hover:bg-ink hover:text-cream shadow-none transition-transform hover:-translate-y-0.5 px-6">
                  <Search className="mr-2 h-4 w-4" />
                  Browse rooms
                </Button>
              </Link>
            </motion.div>
            <motion.div variants={fadeInUp} className="mt-10 flex items-center gap-6 text-sm text-ink/60 font-medium">
              <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-primary" /> Contacts hidden</div>
              <div className="flex items-center gap-2"><Users className="h-4 w-4 text-primary" /> Guided visits</div>
            </motion.div>
          </motion.div>

          <motion.div 
            className="relative lg:ml-auto w-full max-w-lg lg:max-w-none mt-8 lg:mt-0"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="overflow-hidden rounded-3xl border border-ink/10 shadow-soft bg-white group">
              <img src={heroImg} alt="Sunlit student room" className="h-[480px] w-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-[1.02]" />
              
              {/* Clean Price Tag */}
              <div className="absolute bottom-6 left-6 z-20 rounded-2xl bg-white/95 backdrop-blur-sm border border-border/50 p-4 shadow-sm sm:block">
                <div className="flex items-center gap-2 mb-1">
                  <div className="h-1.5 w-1.5 rounded-full bg-verified" />
                  <div className="text-xs font-semibold text-ink/50 uppercase tracking-widest">Rented</div>
                </div>
                <div className="font-display text-2xl font-bold text-ink">75,000<span className="text-base text-ink/70 font-sans font-medium"> FCFA</span></div>
                <div className="text-sm text-ink/80 mt-0.5">Riverside · Studio</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Relay */}
      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center md:text-left"
          >
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">The relay</p>
            <h2 className="mt-4 max-w-2xl font-display text-4xl font-semibold leading-tight text-ink md:text-5xl">
              A literal pass: data in → match made → everyone wins.
            </h2>
          </motion.div>
          
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            <RelayCard step="01" delay={0} title="Graduating student" body="Snap photos of the room, kitchen, bathroom. List bills, rules, rent. Submit and wait to get paid when matched." />
            <RelayCard step="02" delay={0.1} title="Incoming student" body="Browse 100% real student rooms. See exactly what bills are included and the house rules. Request a guided visit." />
            <RelayCard step="03" delay={0.2} title="NeXtpaSs team" body="We match, walk the new student through the place in person, and close the deal. Outgoing tenant gets paid." />
          </div>
        </div>
      </section>

      {/* Why */}
      <section className="bg-cream border-y border-border/60 py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-16 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">Why NeXtpaSs</p>
              <h2 className="mt-4 font-display text-4xl font-semibold leading-tight text-ink md:text-5xl">
                No agents. No ghosts.<br/>Just students.
              </h2>
              <p className="mt-6 text-lg text-ink/70 max-w-md leading-relaxed">
                We've stripped away the noise and the fees to build a housing relay that actually works for you.
              </p>
            </motion.div>
            <motion.ul 
              className="space-y-4"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <Bullet title="Honest bill breakdown" delay={0}>Rent, Wi-Fi, water, electricity — exactly who pays what, before you visit.</Bullet>
              <Bullet title="Names & numbers stay hidden" delay={0.1}>Browsers never see who posted. We reveal it only when both sides match.</Bullet>
              <Bullet title="Real photos, real rooms" delay={0.2}>Each listing comes from a real student who actually lived there.</Bullet>
              <Bullet title="A team that physically shows up" delay={0.3}>Our crew walks you to the door so you never sign blind.</Bullet>
            </motion.ul>
          </div>
        </div>
      </section>

      <section className="bg-ink text-cream py-24 sm:py-32">
        <motion.div 
          className="mx-auto flex max-w-3xl flex-col items-center gap-8 px-4 text-center sm:px-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display text-4xl font-semibold md:text-5xl">Ready to pass the keys?</h2>
          <p className="text-lg text-cream/70 leading-relaxed max-w-xl">
            It takes about two minutes. Add your place, get paid when the next student moves in.
          </p>
          <Link to="/auth">
            <Button size="lg" className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 h-14 mt-4 transition-transform hover:-translate-y-0.5">
              Get started <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </motion.div>
      </section>

      <footer className="bg-white border-t border-border/50">
        <div className="mx-auto flex max-w-6xl flex-col sm:flex-row items-center justify-between gap-4 px-4 py-8 text-sm font-medium text-ink/50 sm:px-6">
          <span>© {new Date().getFullYear()} NeXtpaSs</span>
          <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary" /> Built for students.</span>
        </div>
      </footer>
    </div>
  );
}

function RelayCard({ step, title, body, delay }: { step: string; title: string; body: string; delay: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5, ease: "easeOut" }}
      className="rounded-2xl border border-border/60 bg-cream p-8"
    >
      <div className="font-display text-4xl font-bold text-primary mb-6">{step}</div>
      <h3 className="font-display text-xl font-semibold text-ink">{title}</h3>
      <p className="mt-3 text-base leading-relaxed text-ink/70">{body}</p>
    </motion.div>
  );
}

function Bullet({ title, children, delay }: { title: string; children: React.ReactNode; delay: number }) {
  return (
    <motion.li 
      variants={{
        initial: { opacity: 0, x: -10 },
        animate: { opacity: 1, x: 0, transition: { duration: 0.5 } }
      }}
      className="flex gap-4 p-4 rounded-xl transition-colors hover:bg-white"
    >
      <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
      </div>
      <div>
        <div className="text-lg font-semibold text-ink mb-1">{title}</div>
        <div className="text-base text-ink/70 leading-relaxed">{children}</div>
      </div>
    </motion.li>
  );
}
