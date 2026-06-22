"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowRight, MapPin, Calendar, Users } from "lucide-react";
import { Container } from "@/components/Container";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

const stats = [
  { icon: MapPin, value: "500+", label: "Premium Venues" },
  { icon: Calendar, value: "10K+", label: "Events Hosted" },
  { icon: Users, value: "50K+", label: "Happy Guests" },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
    },
  },
};

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image Placeholder */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(13, 13, 13, 0.7), rgba(13, 13, 13, 0.9)),
                            url('https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`,
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-transparent to-background" />
      
      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/3 rounded-full blur-3xl" />
      
      <Container className="relative z-10 py-32 sm:py-40">
        <motion.div 
          className="flex flex-col items-center text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-sm text-silver">Hong Kong&apos;s Premier Event Platform</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            variants={itemVariants}
            className="font-serif text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-semibold tracking-tight text-foreground max-w-4xl"
          >
            Elevate Your{" "}
            <span className="text-gradient-gold">Hong Kong</span>
            <br />
            Events
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="mt-6 text-lg sm:text-xl text-silver max-w-2xl leading-relaxed"
          >
            Curated venues, seamless planning, and unforgettable experiences.
            <br className="hidden sm:block" />
            Your vision, our expertise — exclusively in Hong Kong.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center gap-4 mt-10"
          >
            <Link href="/venues">
              <Button 
                variant="primary" 
                size="lg" 
                rightIcon={<ArrowRight className="w-5 h-5" />}
              >
                Explore Venues
              </Button>
            </Link>
            <Link href="/concierge">
              <Button variant="outline" size="lg">
                Plan Your Event
              </Button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-3 gap-8 sm:gap-16 mt-20 pt-12 border-t border-border/50 w-full max-w-2xl"
          >
            {stats.map((stat, index) => (
              <div key={index} className="flex flex-col items-center">
                <stat.icon className="w-5 h-5 text-accent mb-3" />
                <span className="text-2xl sm:text-3xl font-serif font-semibold text-foreground">
                  {stat.value}
                </span>
                <span className="text-sm text-silver mt-1">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </Container>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" as const }}
          className="w-6 h-10 rounded-full border-2 border-border flex items-start justify-center p-2"
        >
          <div className="w-1 h-2 rounded-full bg-accent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
