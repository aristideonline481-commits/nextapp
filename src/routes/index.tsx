import { createFileRoute, Link } from "@tanstack/react-router";
import { Search, Plus } from "lucide-react";
import heroImg from "@/assets/hero-room.jpg";
import { motion } from "framer-motion";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "OnMoveIn — Move in smarter" },
      { name: "description", content: "Find rooms, take over leases, sell your stuff and move without stress." },
      { property: "og:title", content: "OnMoveIn — Move in smarter" },
      { property: "og:description", content: "Find rooms, take over leases, sell your stuff and move without stress." },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="flex flex-col min-h-screen bg-background font-sans text-ink">
      {/* Header with Logo only */}
      <header className="w-full pt-10 px-6 sm:px-8 max-w-md mx-auto">
        <div className="flex items-baseline font-display text-2xl font-bold tracking-tight">
          <span className="text-ink">On</span>
          <span className="text-primary">Move</span>
          <span className="text-ink">In</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col px-6 sm:px-8 pt-12 pb-10 max-w-md mx-auto w-full">
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-display text-[44px] font-bold leading-[1.1] tracking-tight">
            Move in <br />
            <span className="text-primary">smarter.</span>
          </h1>
          <p className="mt-5 text-lg text-ink/70 leading-relaxed font-medium pr-4">
            Find rooms, take over leases, sell your stuff and move without stress.
          </p>
        </motion.div>

        {/* Illustration Placeholder */}
        <motion.div 
          className="my-10 relative flex-1 min-h-[220px] flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <div className="w-full max-w-[280px] aspect-square bg-accent/30 rounded-full flex items-center justify-center overflow-hidden border border-border/50 shadow-inner">
             <img src={heroImg} alt="Room" className="w-full h-full object-cover mix-blend-multiply opacity-80" />
          </div>
        </motion.div>

        {/* Buttons */}
        <motion.div 
          className="flex flex-col gap-4 mt-auto"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Link to="/browse" className="w-full">
            <button className="w-full flex items-center bg-primary text-primary-foreground rounded-[20px] p-4 transition-transform hover:scale-[1.02] shadow-sm">
              <div className="h-12 w-12 rounded-full border border-white/20 flex items-center justify-center shrink-0">
                <Search className="h-6 w-6" strokeWidth={2} />
              </div>
              <div className="ml-4 text-left">
                <div className="font-bold text-[17px]">Find a Room</div>
                <div className="text-[13px] text-primary-foreground/80 font-medium">Browse available rooms</div>
              </div>
            </button>
          </Link>

          <Link to="/share" className="w-full">
            <button className="w-full flex items-center bg-transparent border border-border/80 text-ink rounded-[20px] p-4 transition-all hover:bg-accent/30">
              <div className="h-12 w-12 rounded-full border border-border/80 flex items-center justify-center shrink-0">
                <Plus className="h-6 w-6 text-ink" strokeWidth={2} />
              </div>
              <div className="ml-4 text-left">
                <div className="font-bold text-[17px]">Post Your Room</div>
                <div className="text-[13px] text-muted-foreground font-medium">List your room in minutes</div>
              </div>
            </button>
          </Link>
        </motion.div>

        {/* Footer Note */}
        <motion.div 
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-[13px] text-muted-foreground font-medium max-w-[240px] mx-auto leading-relaxed">
            Join thousands of students and tenants finding their next place.
          </p>
          
          <div className="flex justify-center gap-1.5 mt-8">
            <div className="w-2 h-2 rounded-full bg-primary"></div>
            <div className="w-2 h-2 rounded-full bg-border"></div>
            <div className="w-2 h-2 rounded-full bg-border"></div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
