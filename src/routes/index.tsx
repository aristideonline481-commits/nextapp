import { createFileRoute, Link } from "@tanstack/react-router";
import { Search, Plus } from "lucide-react";
import heroVideo from "@/assets/background video-onmovein.mp4";
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
    <div className="flex flex-col min-h-screen font-sans text-ink relative">
      {/* Background Video */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video 
          src={heroVideo} 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover" 
        />
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-background/80 backdrop-blur-[2px]" />
      </div>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex flex-col justify-center px-6 sm:px-8 py-12 max-w-md mx-auto w-full">
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-display text-[48px] font-bold leading-[1.1] tracking-tight text-center sm:text-left">
            Move in <br />
            <span className="text-primary">smarter.</span>
          </h1>
          <p className="mt-5 text-lg text-ink/80 leading-relaxed font-medium text-center sm:text-left">
            Find rooms, take over leases, sell your stuff and move without stress.
          </p>
        </motion.div>

        {/* Buttons */}
        <motion.div 
          className="flex flex-col gap-4 mt-8"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Link to="/browse" className="w-full">
            <button className="w-full flex items-center bg-primary text-primary-foreground rounded-[20px] p-4 transition-transform hover:scale-[1.02] shadow-sm backdrop-blur-md">
              <div className="h-12 w-12 rounded-full border border-white/20 flex items-center justify-center shrink-0 bg-white/10">
                <Search className="h-6 w-6" strokeWidth={2} />
              </div>
              <div className="ml-4 text-left">
                <div className="font-bold text-[17px]">Find a Room</div>
                <div className="text-[13px] text-primary-foreground/90 font-medium">Browse available rooms</div>
              </div>
            </button>
          </Link>

          <Link to="/share" className="w-full">
            <button className="w-full flex items-center bg-background/60 border border-border/80 text-ink rounded-[20px] p-4 transition-all hover:bg-background/80 backdrop-blur-md shadow-sm">
              <div className="h-12 w-12 rounded-full border border-border/80 flex items-center justify-center shrink-0 bg-background/50">
                <Plus className="h-6 w-6 text-ink" strokeWidth={2} />
              </div>
              <div className="ml-4 text-left">
                <div className="font-bold text-[17px]">Post Your Room</div>
                <div className="text-[13px] text-ink/70 font-medium">List your room in minutes</div>
              </div>
            </button>
          </Link>
        </motion.div>

        {/* Footer Note */}
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-[13px] text-ink/60 font-medium max-w-[240px] mx-auto leading-relaxed">
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
