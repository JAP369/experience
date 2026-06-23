"use client";

import { use } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Users,
  Phone,
  Mail,
  Star,
  Wifi,
  Car,
  Music,
  Utensils,
  Shield,
  Accessibility,
  ChevronLeft,
  Share2,
  Heart,
  Calendar,
  Check,
} from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/Container";
import { DUMMY_VENUES, getVenueById } from "@/data/venues";
import { PRICE_TIER_LABELS, PRICE_TIER_DESCRIPTIONS } from "@/types/database";
import { useBooking } from "@/lib/booking-context";
import { useState } from "react";

interface VenuePageProps {
  params: Promise<{ id: string }>;
}

export default function VenuePage({ params }: VenuePageProps) {
  const { id } = use(params);
  const venue = getVenueById(id);
  const { openBookingFlow } = useBooking();

  if (!venue) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <Container>
          <div className="text-center">
            <h1 className="font-serif text-4xl text-foreground mb-4">Venue Not Found</h1>
            <p className="text-silver mb-8">The venue you&apos;re looking for doesn&apos;t exist.</p>
            <Link href="/venues" className="inline-flex items-center gap-2 text-accent hover:text-accent-hover transition-colors">
              <ChevronLeft className="w-5 h-5" />
              Back to Venues
            </Link>
          </div>
        </Container>
      </div>
    );
  }

  const handleBookNow = () => {
    openBookingFlow(venue.id, venue.name);
  };

  return (
    <div className="min-h-screen pt-20">
      <HeroSection venue={venue} onBookNow={handleBookNow} />
      <Container className="py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="flex-1">
            <QuickInfoBar venue={venue} />
            <OverviewSection venue={venue} />
            <AmenitiesSection venue={venue} />
            <LocationSection venue={venue} />
          </div>
          <div className="lg:w-96">
            <BookingSidebar venue={venue} onBookNow={handleBookNow} />
          </div>
        </div>
      </Container>
    </div>
  );
}

function HeroSection({ venue, onBookNow }: { venue: NonNullable<ReturnType<typeof getVenueById>>; onBookNow: () => void }) {
  return (
    <div className="relative h-[50vh] min-h-[400px] overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${venue.images[0]})` }} />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
      <div className="absolute top-24 left-0 right-0 z-10">
        <Container>
          <Link href="/venues" className="inline-flex items-center gap-2 text-foreground/80 hover:text-foreground transition-colors">
            <ChevronLeft className="w-5 h-5" />
            <span className="text-sm">Back to Venues</span>
          </Link>
        </Container>
      </div>
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <Container className="pb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-full glass text-sm text-accent">{venue.type}</span>
              <span className="px-3 py-1 rounded-full glass text-sm text-foreground">{PRICE_TIER_LABELS[venue.price_tier]}</span>
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl text-foreground mb-3">{venue.name}</h1>
            <div className="flex items-center gap-2 text-silver mb-4">
              <MapPin className="w-5 h-5 text-accent" />
              <span>{venue.district}, Hong Kong</span>
            </div>
            <button onClick={onBookNow} className="px-8 py-3 rounded-xl bg-accent text-background font-medium hover:bg-accent-hover transition-colors flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Book This Venue
            </button>
          </motion.div>
        </Container>
      </div>
    </div>
  );
}

function QuickInfoBar({ venue }: { venue: NonNullable<ReturnType<typeof getVenueById>> }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="glass-card rounded-xl p-6 mb-8">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
        <div className="text-center">
          <Users className="w-6 h-6 text-accent mx-auto mb-2" />
          <p className="text-2xl font-serif font-semibold text-foreground">{venue.capacity}</p>
          <p className="text-sm text-silver">Max Capacity</p>
        </div>
        <div className="text-center">
          <MapPin className="w-6 h-6 text-accent mx-auto mb-2" />
          <p className="text-2xl font-serif font-semibold text-foreground">{venue.district}</p>
          <p className="text-sm text-silver">District</p>
        </div>
        <div className="text-center">
          <Star className="w-6 h-6 text-accent mx-auto mb-2" />
          <p className="text-2xl font-serif font-semibold text-foreground">{venue.rating || "N/A"}</p>
          <p className="text-sm text-silver">Rating</p>
        </div>
        <div className="text-center">
          <div className="text-2xl font-serif font-semibold text-accent mb-2">{PRICE_TIER_LABELS[venue.price_tier]}</div>
          <p className="text-sm text-silver">Price Tier</p>
        </div>
      </div>
    </motion.div>
  );
}

function OverviewSection({ venue }: { venue: NonNullable<ReturnType<typeof getVenueById>> }) {
  return (
    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="mb-12">
      <h2 className="font-serif text-3xl text-foreground mb-6">Overview</h2>
      <p className="text-silver leading-relaxed text-lg">{venue.description}</p>
      {venue.phone && (
        <div className="mt-6 flex flex-wrap gap-4">
          <a href={`tel:${venue.phone}`} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-surface-elevated text-silver hover:text-accent transition-colors">
            <Phone className="w-4 h-4" />
            <span className="text-sm">{venue.phone}</span>
          </a>
          {venue.email && (
            <a href={`mailto:${venue.email}`} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-surface-elevated text-silver hover:text-accent transition-colors">
              <Mail className="w-4 h-4" />
              <span className="text-sm">{venue.email}</span>
            </a>
          )}
        </div>
      )}
    </motion.section>
  );
}

function AmenitiesSection({ venue }: { venue: NonNullable<ReturnType<typeof getVenueById>> }) {
  if (!venue.amenities || venue.amenities.length === 0) return null;
  const amenityIcons: Record<string, React.ReactNode> = {
    wifi: <Wifi className="w-5 h-5" />,
    parking: <Car className="w-5 h-5" />,
    music: <Music className="w-5 h-5" />,
    catering: <Utensils className="w-5 h-5" />,
    security: <Shield className="w-5 h-5" />,
    accessible: <Accessibility className="w-5 h-5" />,
  };
  return (
    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="mb-12">
      <h2 className="font-serif text-3xl text-foreground mb-6">Amenities</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {venue.amenities.map((amenity, index) => (
          <div key={index} className="flex items-center gap-3 p-4 rounded-xl bg-surface-elevated">
            <span className="text-accent">{amenityIcons[amenity.toLowerCase().split(" ")[0]] || <Star className="w-5 h-5" />}</span>
            <span className="text-foreground">{amenity}</span>
          </div>
        ))}
      </div>
    </motion.section>
  );
}

function LocationSection({ venue }: { venue: NonNullable<ReturnType<typeof getVenueById>> }) {
  return (
    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }} className="mb-12">
      <h2 className="font-serif text-3xl text-foreground mb-6">Location</h2>
      <div className="glass-card rounded-xl overflow-hidden">
        <div className="aspect-[16/9] bg-surface-elevated flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-12 h-12 text-accent mx-auto mb-3" />
            <p className="text-foreground font-medium">{venue.address}</p>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

function BookingSidebar({ venue, onBookNow }: { venue: NonNullable<ReturnType<typeof getVenueById>>; onBookNow: () => void }) {
  return (
    <div className="lg:sticky lg:top-24">
      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="glass-card rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-sm text-silver">Starting from</p>
            <p className="text-2xl font-serif font-semibold text-foreground">{PRICE_TIER_LABELS[venue.price_tier]}</p>
          </div>
          <div className="flex gap-2">
            <button className="p-2 rounded-lg bg-surface-elevated text-silver hover:text-accent transition-colors"><Share2 className="w-5 h-5" /></button>
            <button className="p-2 rounded-lg bg-surface-elevated text-silver hover:text-accent transition-colors"><Heart className="w-5 h-5" /></button>
          </div>
        </div>
        <button onClick={onBookNow} className="w-full py-3 rounded-xl bg-accent text-background font-medium hover:bg-accent-hover transition-colors flex items-center justify-center gap-2 mb-6">
          <Calendar className="w-5 h-5" />
          Book Now
        </button>
        <div className="border-t border-border pt-6">
          <h3 className="font-serif text-xl text-foreground mb-4">Quick Inquiry</h3>
          <QuickInquiryForm />
        </div>
      </motion.div>
    </div>
  );
}

function QuickInquiryForm() {
  const [submitted, setSubmitted] = useState(false);
  if (submitted) {
    return (
      <div className="text-center py-4">
        <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-green-500/20 flex items-center justify-center">
          <Check className="w-6 h-6 text-green-500" />
        </div>
        <p className="text-foreground font-medium">Inquiry Sent!</p>
        <p className="text-sm text-silver mt-1">We&apos;ll get back to you within 24 hours.</p>
      </div>
    );
  }
  return (
    <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-4">
      <input type="text" placeholder="Your Name" required className="w-full px-4 py-2.5 rounded-lg bg-surface-elevated border border-border text-foreground placeholder:text-silver/50 focus:outline-none focus:border-accent/50 transition-colors text-sm" />
      <input type="email" placeholder="Email Address" required className="w-full px-4 py-2.5 rounded-lg bg-surface-elevated border border-border text-foreground placeholder:text-silver/50 focus:outline-none focus:border-accent/50 transition-colors text-sm" />
      <input type="tel" placeholder="Phone Number" className="w-full px-4 py-2.5 rounded-lg bg-surface-elevated border border-border text-foreground placeholder:text-silver/50 focus:outline-none focus:border-accent/50 transition-colors text-sm" />
      <textarea placeholder="Message (optional)" rows={3} className="w-full px-4 py-2.5 rounded-lg bg-surface-elevated border border-border text-foreground placeholder:text-silver/50 focus:outline-none focus:border-accent/50 transition-colors resize-none text-sm" />
      <button type="submit" className="w-full py-2.5 rounded-lg bg-surface-elevated border border-border text-foreground font-medium hover:border-accent/50 transition-colors text-sm">Send Inquiry</button>
    </form>
  );
}
