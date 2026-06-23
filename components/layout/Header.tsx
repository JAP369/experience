"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Menu, X, Sparkles } from "lucide-react";
import { Container } from "@/components/Container";
import { Button } from "@/components/ui/Button";
import { useBooking } from "@/lib/booking-context";

const navLinks = [
  { href: "/venues", label: "Venues" },
  { href: "/corporate-packages", label: "Corporate Packages" },
  { href: "/concierge", label: "Concierge" },
];

const mobileMenuVariants: Variants = {
  closed: {
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: "easeInOut" as const,
    },
  },
  open: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeInOut" as const,
    },
  },
};

const mobileLinkVariants: Variants = {
  closed: {
    opacity: 0,
    y: 20,
  },
  open: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.1 + index * 0.08,
      duration: 0.4,
      ease: "easeOut" as const,
    },
  }),
};

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { openBookingFlow } = useBooking();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const handleBookNow = () => {
    openBookingFlow();
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "glass-strong py-3" : "bg-transparent py-5"
        }`}
      >
        <Container>
          <nav className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <Sparkles className="w-6 h-6 text-accent transition-transform duration-300 group-hover:rotate-12" />
              <span className="font-serif text-xl font-semibold tracking-tight text-foreground">
                Experience
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-silver hover:text-foreground transition-colors duration-200 relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-4">
              <Link href="/venues">
                <Button variant="ghost" size="sm">
                  Explore
                </Button>
              </Link>
              <Button variant="primary" size="sm" onClick={handleBookNow}>
                Book Now
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-foreground hover:text-accent transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </nav>
        </Container>
      </header>

      {/* Mobile Menu - Full Screen */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 z-40 bg-background/98 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full gap-8 px-6">
              {/* Navigation Links */}
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  custom={index}
                  variants={mobileLinkVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                >
                  <Link
                    href={link.href}
                    className="text-3xl font-serif text-foreground hover:text-accent transition-colors duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              {/* CTA Buttons */}
              <motion.div
                custom={navLinks.length}
                variants={mobileLinkVariants}
                initial="closed"
                animate="open"
                exit="closed"
                className="flex flex-col gap-4 mt-8 w-full max-w-xs"
              >
                <Link href="/venues" className="w-full">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Explore Venues
                  </Button>
                </Link>
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full"
                  onClick={handleBookNow}
                >
                  Book Now
                </Button>
              </motion.div>

              {/* Decorative Element */}
              <motion.div
                custom={navLinks.length + 1}
                variants={mobileLinkVariants}
                initial="closed"
                animate="open"
                exit="closed"
                className="absolute bottom-12 left-1/2 -translate-x-1/2"
              >
                <p className="text-xs text-silver/50 tracking-widest uppercase">
                  Hong Kong
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
