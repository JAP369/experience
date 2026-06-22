"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles, Mail, Lock, AlertCircle, Loader2, Code } from "lucide-react";
import { Container } from "@/components/Container";
import { useAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const { login, devLogin, user } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // If user exists, redirect to dashboard
    if (user) {
      router.replace("/dashboard");
    }
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        router.push("/dashboard");
      } else {
        setError("Invalid email or password. Password must be at least 6 characters.");
      }
    } catch {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDevLogin = () => {
    devLogin();
    router.push("/dashboard");
  };

  // Show loading state if user exists (will redirect)
  if (user) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <Container>
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-silver">Redirecting...</p>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-md mx-auto"
        >
          {/* Logo */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2 group">
              <Sparkles className="w-8 h-8 text-accent transition-transform duration-300 group-hover:rotate-12" />
              <span className="font-serif text-2xl font-semibold text-foreground">
                Experience
              </span>
            </Link>
          </div>

          {/* Login Card */}
          <div className="glass-card rounded-2xl p-8">
            <div className="text-center mb-6">
              <h1 className="font-serif text-2xl text-foreground mb-2">
                Welcome Back
              </h1>
              <p className="text-silver">
                Sign in to access your dashboard
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center gap-3"
              >
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                <p className="text-sm text-red-400">{error}</p>
              </motion.div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-silver" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-surface-elevated border border-border text-foreground placeholder:text-silver/50 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all duration-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-silver" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    minLength={6}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-surface-elevated border border-border text-foreground placeholder:text-silver/50 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all duration-200"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-xl bg-accent text-background font-medium hover:bg-accent-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-surface text-silver">or</span>
              </div>
            </div>

            {/* Dev Login Button */}
            <button
              onClick={handleDevLogin}
              className="w-full py-3 rounded-xl bg-surface-elevated border border-border text-foreground font-medium hover:border-accent/50 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <Code className="w-5 h-5 text-accent" />
              Dev Login (Bypass Auth)
            </button>

            <p className="mt-4 text-xs text-silver text-center">
              Dev login provides full access for development purposes.
            </p>
          </div>

          {/* Back to Home */}
          <div className="mt-6 text-center">
            <Link
              href="/"
              className="text-sm text-silver hover:text-accent transition-colors"
            >
              ← Back to Home
            </Link>
          </div>
        </motion.div>
      </Container>
    </div>
  );
}
