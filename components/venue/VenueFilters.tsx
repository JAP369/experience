"use client";

import { motion } from "framer-motion";
import { Filter, X, ChevronDown } from "lucide-react";
import {
  HK_DISTRICTS,
  VENUE_TYPES,
  HK_District,
  VenueType,
} from "@/types/database";
import { useState } from "react";

interface VenueFiltersProps {
  selectedDistrict: HK_District | null;
  selectedType: VenueType | null;
  onDistrictChange: (district: HK_District | null) => void;
  onTypeChange: (type: VenueType | null) => void;
  resultCount: number;
}

export function VenueFilters({
  selectedDistrict,
  selectedType,
  onDistrictChange,
  onTypeChange,
  resultCount,
}: VenueFiltersProps) {
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const hasActiveFilters = selectedDistrict || selectedType;

  const clearFilters = () => {
    onDistrictChange(null);
    onTypeChange(null);
  };

  return (
    <>
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-6">
        <button
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="w-full flex items-center justify-between px-4 py-3 glass-card rounded-xl"
        >
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-accent" />
            <span className="text-foreground font-medium">Filters</span>
            {hasActiveFilters && (
              <span className="px-2 py-0.5 text-xs rounded-full bg-accent text-background">
                {[selectedDistrict, selectedType].filter(Boolean).length}
              </span>
            )}
          </div>
          <ChevronDown
            className={`w-5 h-5 text-silver transition-transform duration-200 ${
              showMobileFilters ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Mobile Filters Dropdown */}
        <motion.div
          initial={false}
          animate={{
            height: showMobileFilters ? "auto" : 0,
            opacity: showMobileFilters ? 1 : 0,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <div className="pt-4 space-y-6">
            {/* District Filter */}
            <div>
              <label className="text-sm font-medium text-foreground mb-3 block">
                District
              </label>
              <div className="flex flex-wrap gap-2">
                {HK_DISTRICTS.map((district) => (
                  <FilterChip
                    key={district}
                    label={district}
                    isSelected={selectedDistrict === district}
                    onClick={() =>
                      onDistrictChange(
                        selectedDistrict === district ? null : district
                      )
                    }
                  />
                ))}
              </div>
            </div>

            {/* Type Filter */}
            <div>
              <label className="text-sm font-medium text-foreground mb-3 block">
                Venue Type
              </label>
              <div className="flex flex-wrap gap-2">
                {VENUE_TYPES.map((type) => (
                  <FilterChip
                    key={type}
                    label={type}
                    isSelected={selectedType === type}
                    onClick={() =>
                      onTypeChange(selectedType === type ? null : type)
                    }
                  />
                ))}
              </div>
            </div>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-2 text-sm text-accent hover:text-accent-hover transition-colors"
              >
                <X className="w-4 h-4" />
                Clear all filters
              </button>
            )}
          </div>
        </motion.div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <div className="glass-card rounded-xl p-6 sticky top-24">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-accent" />
              <h3 className="font-serif text-lg font-semibold text-foreground">
                Filters
              </h3>
            </div>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1 text-sm text-accent hover:text-accent-hover transition-colors"
              >
                <X className="w-4 h-4" />
                Clear
              </button>
            )}
          </div>

          {/* District Filter */}
          <div className="mb-6">
            <label className="text-sm font-medium text-foreground mb-3 block">
              District
            </label>
            <div className="space-y-2">
              {HK_DISTRICTS.map((district) => (
                <FilterButton
                  key={district}
                  label={district}
                  isSelected={selectedDistrict === district}
                  onClick={() =>
                    onDistrictChange(
                      selectedDistrict === district ? null : district
                    )
                  }
                />
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-border my-6" />

          {/* Type Filter */}
          <div>
            <label className="text-sm font-medium text-foreground mb-3 block">
              Venue Type
            </label>
            <div className="space-y-2">
              {VENUE_TYPES.map((type) => (
                <FilterButton
                  key={type}
                  label={type}
                  isSelected={selectedType === type}
                  onClick={() =>
                    onTypeChange(selectedType === type ? null : type)
                  }
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-sm text-silver">
          Showing{" "}
          <span className="text-foreground font-medium">{resultCount}</span>{" "}
          {resultCount === 1 ? "venue" : "venues"}
          {hasActiveFilters && " matching your filters"}
        </p>
      </div>
    </>
  );
}

// Filter Chip Component (for mobile)
function FilterChip({
  label,
  isSelected,
  onClick,
}: {
  label: string;
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 text-sm rounded-full transition-all duration-200 ${
        isSelected
          ? "bg-accent text-background"
          : "bg-surface-elevated text-silver hover:text-foreground hover:bg-surface"
      }`}
    >
      {label}
    </button>
  );
}

// Filter Button Component (for desktop)
function FilterButton({
  label,
  isSelected,
  onClick,
}: {
  label: string;
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-all duration-200 ${
        isSelected
          ? "bg-accent-muted text-accent"
          : "text-silver hover:text-foreground hover:bg-surface-elevated"
      }`}
    >
      <span className="text-sm">{label}</span>
      {isSelected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-2 h-2 rounded-full bg-accent"
        />
      )}
    </button>
  );
}
