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
} from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/Container";
import { BookingForm } from "@/components/booking/BookingForm";
import { DUMMY_VENUES, getVenueById } from "@/data/venues";
import { PRICE_TIER_LABELS, PRICE_TIER_DESCRIPTIONS } from "@/types/database";

// =============================================================================
// PAGE COMPONENT
// =============================================================================

interface VenuePageProps {
  params: Promise<{ id: string }>;
}

export default function VenuePage({ params }: VenuePageProps) {
  const { id } = use(params);
  const venue = getVenueById(id);

  if (!venue) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <Container>
          <div className="text-center">
            <h1 className="font-serif text-4xl text-foreground mb-4">
              Venue Not Found
            </h1>
            <p className="text-silver mb-8">
              The venue you&apos;re looking for doesn&apos;t exist or has been removed.
            </p>
            <Link
              href="/venues"
              className="inline-flex items-center gap-2 text-accent hover:text-accent-hover transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              Back to Venues
            </Link>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <HeroSection venue={venue} />

      {/* Main Content */}
      <Container className="py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left Column - Details */}
          <div className="flex-1">
            {/* Quick Info Bar */}
            <QuickInfoBar venue={venue} />

            {/* Overview Section */}
            <OverviewSection venue={venue} />

            {/* Amenities Section */}
            <AmenitiesSection venue={venue} />

            {/* Floor Plans Section */}
            <FloorPlansSection />

            {/* Location Section */}
            <LocationSection venue={venue} />
          </div>

          {/* Right Column - Booking Form */}
          <div className="lg:w-96">
            <BookingSidebar venue={venue} />
          </div>
        </div>
      </Container>
    </div>
  );
}

// =============================================================================
// HERO SECTION
// =============================================================================

function HeroSection({ venue }: { venue: NonNullable<ReturnType<typeof getVenueById>> }) {
  return (
    <div className="relative h-[60vh] min-h-[500px] overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${venue.images[0]})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />

      {/* Back Button */}
      <div className="absolute top-24 left-0 right-0 z-10">
        <Container>
          <Link
            href="/venues"
            className="inline-flex items-center gap-2 text-foreground/80 hover:text-foreground transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="text-sm">Back to Venues</span>
          </Link>
        </Container>
      </div>

      {/* Venue Info Overlay */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <Container className="pb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Badges */}
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-full glass text-sm text-accent">
                {venue.type}
              </span>
              <span className="px-3 py-1 rounded-full glass text-sm text-foreground">
                {PRICE_TIER_LABELS[venue.price_tier]}
              </span>
              {venue.rating && (
                <div className="flex items-center gap-1 px-3 py-1 rounded-full glass">
                  <Star className="w-4 h-4 text-accent fill-accent" />
                  <span className="text-sm text-foreground">{venue.rating}</span>
                </div>
              )}
            </div>

            {/* Title */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold text-foreground mb-3">
              {venue.name}
            </h1>

            {/* Location */}
            <div className="flex items-center gap-2 text-silver">
              <MapPin className="w-5 h-5 text-accent" />
              <span>{venue.district}, Hong Kong</span>
            </div>
          </motion.div>
        </Container>
      </div>
    </div>
  );
}

// =============================================================================
// QUICK INFO BAR
// =============================================================================

function QuickInfoBar({ venue }: { venue: NonNullable<ReturnType<typeof getVenueById>> }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="glass-card rounded-xl p-6 mb-8"
    >
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
        <div className="text-center">
          <Users className="w-6 h-6 text-accent mx-auto mb-2" />
          <p className="text-2xl font-serif font-semibold text-foreground">
            {venue.capacity}
          </p>
          <p className="text-sm text-silver">Max Capacity</p>
        </div>
        <div className="text-center">
          <MapPin className="w-6 h-6 text-accent mx-auto mb-2" />
          <p className="text-2xl font-serif font-semibold text-foreground">
            {venue.district}
          </p>
          <p className="text-sm text-silver">District</p>
        </div>
        <div className="text-center">
          <Star className="w-6 h-6 text-accent mx-auto mb-2" />
          <p className="text-2xl font-serif font-semibold text-foreground">
            {venue.rating || "N/A"}
          </p>
          <p className="text-sm text-silver">Rating</p>
        </div>
        <div className="text-center">
          <div className="text-2xl font-serif font-semibold text-accent mb-2">
            {PRICE_TIER_LABELS[venue.price_tier]}
          </div>
          <p className="text-sm text-silver">Price Tier</p>
        </div>
      </div>
    </motion.div>
  );
}

// =============================================================================
// OVERVIEW SECTION
// =============================================================================

function OverviewSection({ venue }: { venue: NonNullable<ReturnType<typeof getVenueById>> }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="mb-12"
    >
      <h2 className="font-serif text-3xl text-foreground mb-6">Overview</h2>
      <p className="text-silver leading-relaxed text-lg">{venue.description}</p>

      {/* Image Gallery */}
      {venue.images.length > 1 && (
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-4">
          {venue.images.slice(1).map((image, index) => (
            <div
              key={index}
              className="aspect-video rounded-xl overflow-hidden"
            >
              <img
                src={image}
                alt={`${venue.name} - Image ${index + 2}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      )}

      {/* Contact Info */}
      <div className="mt-8 flex flex-wrap gap-4">
        {venue.phone && (
          <a
            href={`tel:${venue.phone}`}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-surface-elevated text-silver hover:text-accent transition-colors"
          >
            <Phone className="w-4 h-4" />
            <span className="text-sm">{venue.phone}</span>
          </a>
        )}
        {venue.email && (
          <a
            href={`mailto:${venue.email}`}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-surface-elevated text-silver hover:text-accent transition-colors"
          >
            <Mail className="w-4 h-4" />
            <span className="text-sm">{venue.email}</span>
          </a>
        )}
      </div>
    </motion.section>
  );
}

// =============================================================================
// AMENITIES SECTION
// =============================================================================

function AmenitiesSection({ venue }: { venue: NonNullable<ReturnType<typeof getVenueById>> }) {
  const amenityIcons: Record<string, React.ReactNode> = {
    "wifi": <Wifi className="w-5 h-5" />,
    "parking": <Car className="w-5 h-5" />,
    "music": <Music className="w-5 h-5" />,
    "catering": <Utensils className="w-5 h-5" />,
    "security": <Shield className="w-5 h-5" />,
    "accessible": <Accessibility className="w-5 h-5" />,
  };

  if (!venue.amenities || venue.amenities.length === 0) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="mb-12"
    >
      <h2 className="font-serif text-3xl text-foreground mb-6">Amenities</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {venue.amenities.map((amenity, index) => (
          <div
            key={index}
            className="flex items-center gap-3 p-4 rounded-xl bg-surface-elevated"
          >
            <span className="text-accent">
              {amenityIcons[amenity.toLowerCase().split(" ")[0]] || (
                <Star className="w-5 h-5" />
              )}
            </span>
            <span className="text-foreground">{amenity}</span>
          </div>
        ))}
      </div>
    </motion.section>
  );
}

// =============================================================================
// FLOOR PLANS SECTION
// =============================================================================

function FloorPlansSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="mb-12"
    >
      <h2 className="font-serif text-3xl text-foreground mb-6">Floor Plans</h2>
      <div className="glass-card rounded-xl p-8 text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-surface-elevated flex items-center justify-center">
          <MapPin className="w-8 h-8 text-accent" />
        </div>
        <h3 className="font-serif text-xl text-foreground mb-2">
          Interactive Floor Plan
        </h3>
        <p className="text-silver mb-4">
          Contact us to request detailed floor plans and layout options.
        </p>
        <button className="px-6 py-2 rounded-lg bg-accent/10 text-accent hover:bg-accent/20 transition-colors">
          Request Floor Plans
        </button>
      </div>
    </motion.section>
  );
}

// =============================================================================
// LOCATION SECTION
// =============================================================================

function LocationSection({ venue }: { venue: NonNullable<ReturnType<typeof getVenueById>> }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      className="mb-12"
    >
      <h2 className="font-serif text-3xl text-foreground mb-6">Location</h2>
      <div className="glass-card rounded-xl overflow-hidden">
        {/* Map Placeholder */}
        <div className="aspect-[16/9] bg-surface-elevated flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-12 h-12 text-accent mx-auto mb-3" />
            <p className="text-foreground font-medium">{venue.address}</p>
            <p className="text-sm text-silver mt-1">
              Interactive map coming soon
            </p>
          </div>
        </div>
        <div className="p-4">
          <p className="text-silver text-sm">{venue.address}</p>
        </div>
      </div>
    </motion.section>
  );
}

// =============================================================================
// BOOKING SIDEBAR
// =============================================================================

function BookingSidebar({ venue }: { venue: NonNullable<ReturnType<typeof getVenueById>> }) {
  return (
    <div className="lg:sticky lg:top-24">
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="glass-card rounded-xl p-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-sm text-silver">Starting from</p>
            <p className="text-2xl font-serif font-semibold text-foreground">
              {PRICE_TIER_LABELS[venue.price_tier]}
            </p>
            <p className="text-xs text-silver">
              {PRICE_TIER_DESCRIPTIONS[venue.price_tier]}
            </p>
          </div>
          <div className="flex gap-2">
            <button className="p-2 rounded-lg bg-surface-elevated text-silver hover:text-accent transition-colors">
              <Share2 className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-lg bg-surface-elevated text-silver hover:text-accent transition-colors">
              <Heart className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border pt-6">
          <h3 className="font-serif text-xl text-foreground mb-4">
            Request Booking
          </h3>
          <BookingForm venue={venue} />
        </div>
      </motion.div>
    </div>
  );
}
