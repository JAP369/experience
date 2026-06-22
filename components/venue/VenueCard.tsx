"use client";

import { motion } from "framer-motion";
import { MapPin, Users, Sparkles } from "lucide-react";
import { Venue, PRICE_TIER_LABELS } from "@/types/database";

interface VenueCardProps {
  venue: Venue;
  onClick?: () => void;
}

export function VenueCard({ venue, onClick }: VenueCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{
        layout: { duration: 0.4, ease: "easeInOut" },
        opacity: { duration: 0.3 },
      }}
      className="group cursor-pointer"
      onClick={onClick}
    >
      <div className="glass-card rounded-xl overflow-hidden transition-all duration-300 hover:border-accent/30">
        {/* Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={venue.images[0]}
            alt={venue.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
          
          {/* Price Tier Badge */}
          <div className="absolute top-4 right-4 px-3 py-1 rounded-full glass text-xs font-medium text-accent">
            {PRICE_TIER_LABELS[venue.price_tier]}
          </div>
          
          {/* Venue Type Badge */}
          <div className="absolute top-4 left-4 px-3 py-1 rounded-full glass text-xs font-medium text-foreground">
            {venue.type}
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Venue Name */}
          <h3 className="font-serif text-xl font-semibold text-foreground group-hover:text-accent transition-colors duration-200">
            {venue.name}
          </h3>

          {/* Location & Capacity */}
          <div className="mt-3 flex items-center gap-4 text-sm text-silver">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-accent" />
              <span>{venue.district}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-accent" />
              <span>Up to {venue.capacity}</span>
            </div>
          </div>

          {/* Description Preview */}
          <p className="mt-3 text-sm text-silver/80 line-clamp-2">
            {venue.description}
          </p>

          {/* Amenities Preview */}
          {venue.amenities && venue.amenities.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {venue.amenities.slice(0, 3).map((amenity, index) => (
                <span
                  key={index}
                  className="px-2 py-1 text-xs rounded-md bg-surface-elevated text-silver"
                >
                  {amenity}
                </span>
              ))}
              {venue.amenities.length > 3 && (
                <span className="px-2 py-1 text-xs rounded-md bg-surface-elevated text-silver">
                  +{venue.amenities.length - 3} more
                </span>
              )}
            </div>
          )}

          {/* View Details Link */}
          <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
            <div className="flex items-center gap-1">
              {venue.rating && (
                <>
                  <Sparkles className="w-4 h-4 text-accent" />
                  <span className="text-sm font-medium text-foreground">
                    {venue.rating}
                  </span>
                </>
              )}
            </div>
            <span className="text-sm text-accent group-hover:translate-x-1 transition-transform duration-200">
              View Details →
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
