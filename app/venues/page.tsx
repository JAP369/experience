"use client";

import { useState, useMemo } from "react";
import { motion, LayoutGroup } from "framer-motion";
import { Container } from "@/components/Container";
import { VenueCard } from "@/components/venue/VenueCard";
import { VenueFilters } from "@/components/venue/VenueFilters";
import { DUMMY_VENUES } from "@/data/venues";
import { HK_District, VenueType } from "@/types/database";
import { Search } from "lucide-react";

export default function VenuesPage() {
  const [selectedDistrict, setSelectedDistrict] = useState<HK_District | null>(
    null
  );
  const [selectedType, setSelectedType] = useState<VenueType | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter venues based on selected filters
  const filteredVenues = useMemo(() => {
    let result = DUMMY_VENUES;

    // Filter by district
    if (selectedDistrict) {
      result = result.filter((venue) => venue.district === selectedDistrict);
    }

    // Filter by type
    if (selectedType) {
      result = result.filter((venue) => venue.type === selectedType);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (venue) =>
          venue.name.toLowerCase().includes(query) ||
          venue.district.toLowerCase().includes(query) ||
          venue.type.toLowerCase().includes(query) ||
          venue.description.toLowerCase().includes(query)
      );
    }

    return result;
  }, [selectedDistrict, selectedType, searchQuery]);

  return (
    <div className="min-h-screen pt-24 pb-16">
      <Container>
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="font-serif text-4xl sm:text-5xl font-semibold text-foreground">
            Discover Venues
          </h1>
          <p className="mt-3 text-lg text-silver max-w-2xl">
            Explore Hong Kong&apos;s most exclusive event spaces, from rooftop lounges
            to grand ballrooms.
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-silver" />
            <input
              type="text"
              placeholder="Search venues by name, district, or type..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 glass-card rounded-xl bg-transparent text-foreground placeholder:text-silver/50 focus:outline-none focus:border-accent/50 transition-colors"
            />
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters (Desktop) */}
          <div className="lg:w-72 flex-shrink-0">
            <VenueFilters
              selectedDistrict={selectedDistrict}
              selectedType={selectedType}
              onDistrictChange={setSelectedDistrict}
              onTypeChange={setSelectedType}
              resultCount={filteredVenues.length}
            />
          </div>

          {/* Venue Grid */}
          <div className="flex-1">
            {/* Mobile Filters */}
            <div className="lg:hidden">
              <VenueFilters
                selectedDistrict={selectedDistrict}
                selectedType={selectedType}
                onDistrictChange={setSelectedDistrict}
                onTypeChange={setSelectedType}
                resultCount={filteredVenues.length}
              />
            </div>

            {/* Results Count (Desktop) */}
            <div className="hidden lg:block mb-6">
              <p className="text-sm text-silver">
                Showing{" "}
                <span className="text-foreground font-medium">
                  {filteredVenues.length}
                </span>{" "}
                {filteredVenues.length === 1 ? "venue" : "venues"}
                {(selectedDistrict || selectedType) && " matching your filters"}
              </p>
            </div>

            {/* Grid */}
            <LayoutGroup>
              <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
              >
                {filteredVenues.map((venue) => (
                  <VenueCard
                    key={venue.id}
                    venue={venue}
                    onClick={() => {
                      // TODO: Navigate to venue detail page
                      console.log("Clicked venue:", venue.name);
                    }}
                  />
                ))}
              </motion.div>
            </LayoutGroup>

            {/* Empty State */}
            {filteredVenues.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-surface-elevated flex items-center justify-center">
                  <Search className="w-8 h-8 text-silver" />
                </div>
                <h3 className="font-serif text-xl text-foreground mb-2">
                  No venues found
                </h3>
                <p className="text-silver">
                  Try adjusting your filters or search query.
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
