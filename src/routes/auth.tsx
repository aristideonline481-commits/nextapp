import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { auth, db } from "@/integrations/firebase/client";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { ArrowLeft, Loader2 } from "lucide-react";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in — NeXtpaSs" },
      { name: "description", content: "Sign in to NeXtpaSs to share or browse student rooms." },
    ],
  }),
  component: AuthPage,
});

const signupSchema = z.object({
  full_name: z.string().trim().min(2, "Tell us your name").max(80),
  phone: z.string().trim().min(6, "Enter a reachable phone").max(30),
  email: z.string().trim().email().max(255),
  password: z.string().min(8, "Use at least 8 characters").max(72),
});
const loginSchema = z.object({
  email: z.string().trim().email().max(255),
  password: z.string().min(1).max(72),
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) navigate({ to: "/browse", replace: true });
    });
    return () => unsubscribe();
  }, [navigate]);

  async function handleGoogle() {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(auth, provider);
      
      const roleRef = doc(db, "user_roles", user.uid);
      const roleSnap = await getDoc(roleRef);
      if (!roleSnap.exists()) {
        await setDoc(roleRef, { role: "client" });
      }

      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);
      if (!userSnap.exists()) {
        await setDoc(userRef, {
          full_name: user.displayName || "",
          email: user.email || "",
          created_at: new Date().toISOString()
        });
      }
    } catch (error: any) {
      toast.error(error.message ?? "Google sign-in failed");
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setLoading(true);
    try {
      if (mode === "signup") {
        const parsed = signupSchema.safeParse(Object.fromEntries(form));
        if (!parsed.success) { 
          alert("Validation Error: " + parsed.error.errors[0].message); 
          setLoading(false);
          return; 
        }
        
        const { user } = await createUserWithEmailAndPassword(auth, parsed.data.email, parsed.data.password);
        
        // Save additional user profile data to Firestore
        await setDoc(doc(db, "users", user.uid), {
          full_name: parsed.data.full_name,
          phone: parsed.data.phone,
          email: parsed.data.email,
          created_at: new Date().toISOString()
        });
        
        // Set default client role
        await setDoc(doc(db, "user_roles", user.uid), {
          role: "client"
        });
        
        toast.success("Welcome to NeXtpaSs!");
      } else {
        const parsed = loginSchema.safeParse(Object.fromEntries(form));
        if (!parsed.success) { 
          alert("Validation Error: " + parsed.error.errors[0].message); 
          setLoading(false);
          return; 
        }
        await signInWithEmailAndPassword(auth, parsed.data.email, parsed.data.password);
      }
    } catch (error: any) {
      console.error("Auth Error:", error);
      alert("Firebase Error: " + error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto flex max-w-md flex-col px-4 py-10 sm:px-6">
        <Link to="/" className="mb-8 inline-flex w-fit items-center gap-2 text-sm text-muted-foreground hover:text-ink">
          <ArrowLeft className="h-4 w-4" /> Back
        </Link>
        <div className="rounded-3xl border bg-card p-8 shadow-soft">
          <h1 className="font-display text-3xl font-semibold tracking-tight">
            {mode === "login" ? "Welcome back" : "Join NeXtpaSs"}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {mode === "login" ? "Sign in to share or browse rooms." : "Create an account in under a minute."}
          </p>

          <Button onClick={handleGoogle} disabled={loading} type="button" variant="outline" className="mt-6 w-full rounded-full border-ink/20">
            <GoogleIcon /> Continue with Google
          </Button>

          <div className="my-5 flex items-center gap-3 text-xs text-muted-foreground">
            <span className="h-px flex-1 bg-border" /> or email <span className="h-px flex-1 bg-border" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "signup" && (
              <>
                <Field label="Full name" name="full_name" type="text" placeholder="Awa Diop" />
                <Field label="Phone" name="phone" type="tel" placeholder="+221 …" />
              </>
            )}
            <Field label="Email" name="email" type="email" placeholder="you@school.edu" />
            <Field label="Password" name="password" type="password" placeholder="••••••••" />
            <Button type="submit" disabled={loading} className="w-full rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : mode === "login" ? "Sign in" : "Create account"}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            {mode === "login" ? "New here?" : "Already have an account?"}{" "}
            <button onClick={() => setMode(mode === "login" ? "signup" : "login")} type="button" className="font-semibold text-primary hover:underline">
              {mode === "login" ? "Create one" : "Sign in"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

function Field({ label, name, type, placeholder }: { label: string; name: string; type: string; placeholder?: string }) {
  return (
    <div>
      <Label htmlFor={name} className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</Label>
      <Input id={name} name={name} type={type} placeholder={placeholder} required className="mt-1.5 h-11 rounded-lg" />
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="mr-2 h-4 w-4">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.26 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.1A6.6 6.6 0 0 1 5.48 12c0-.73.13-1.44.36-2.1V7.07H2.18A11 11 0 0 0 1 12c0 1.77.42 3.45 1.18 4.93l3.66-2.83z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.07.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.83C6.71 7.3 9.14 5.38 12 5.38z" />
    </svg>
  );
}
