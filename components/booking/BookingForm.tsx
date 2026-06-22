"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Calendar,
  Users,
  Briefcase,
  MessageSquare,
  Check,
  AlertCircle,
  Loader2,
  Sparkles,
} from "lucide-react";
import { EVENT_TYPES, EventType, Venue } from "@/types/database";

// =============================================================================
// VALIDATION SCHEMA
// =============================================================================

const bookingSchema = z.object({
  event_date: z
    .string({ message: "Event date is required" })
    .min(1, { message: "Event date is required" })
    .refine(
      (date) => {
        const selectedDate = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return selectedDate >= today;
      },
      { message: "Event date must be in the future" }
    ),
  guest_count: z
    .number({ message: "Guest count is required" })
    .min(1, { message: "Minimum 1 guest required" })
    .max(5000, { message: "Please contact us for events over 5000 guests" }),
  event_type: z.enum(
    [EventType.ProductLaunch, EventType.AnnualDinner, EventType.Networking, EventType.Conference, EventType.TeamBuilding, EventType.Gala, EventType.Wedding, EventType.PrivateParty],
    { message: "Please select an event type" }
  ),
  contact_name: z
    .string({ message: "Name is required" })
    .min(2, { message: "Name must be at least 2 characters" })
    .max(100, { message: "Name must be less than 100 characters" }),
  contact_email: z
    .string({ message: "Email is required" })
    .email({ message: "Please enter a valid email address" }),
  contact_phone: z
    .string({ message: "Phone number is required" })
    .min(8, { message: "Please enter a valid phone number" })
    .max(20, { message: "Phone number is too long" }),
  special_requirements: z.string().optional(),
  budget: z.number({ message: "Budget must be a valid number" }).min(0, { message: "Budget must be a positive number" }).optional(),
});

interface BookingFormData {
  event_date: string;
  guest_count: number;
  event_type: EventType;
  contact_name: string;
  contact_email: string;
  contact_phone: string;
  special_requirements: string;
  budget?: number;
}

// =============================================================================
// COMPONENT
// =============================================================================

interface BookingFormProps {
  venue: Venue;
  onSubmitSuccess?: () => void;
}

export function BookingForm({ venue, onSubmitSuccess }: BookingFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema) as any,
    mode: "onChange",
    defaultValues: {
      guest_count: 50,
      special_requirements: "",
    },
  });

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Simulate random success/failure for demo
      // In production, this would be an actual API call
      const success = Math.random() > 0.2; // 80% success rate for demo

      if (success) {
        setIsSuccess(true);
        onSubmitSuccess?.();
      } else {
        setSubmitError("Something went wrong. Please try again.");
      }
    } catch {
      setSubmitError("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setIsSuccess(false);
    setSubmitError(null);
    reset();
  };

  // Success State
  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-8"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center"
        >
          <Check className="w-8 h-8 text-green-500" />
        </motion.div>
        <h3 className="font-serif text-2xl text-foreground mb-2">
          Booking Submitted!
        </h3>
        <p className="text-silver mb-6">
          We&apos;ll be in touch within 24 hours to confirm your booking.
        </p>
        <button
          onClick={resetForm}
          className="text-accent hover:text-accent-hover transition-colors"
        >
          Submit another inquiry
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Error Message */}
      <AnimatePresence>
        {submitError && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center gap-3"
          >
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
            <p className="text-sm text-red-400">{submitError}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Event Date */}
      <FormField
        label="Event Date"
        icon={<Calendar className="w-5 h-5" />}
        error={errors.event_date?.message}
      >
        <input
          type="date"
          {...register("event_date")}
          className={getInputClassName(!!errors.event_date)}
        />
      </FormField>

      {/* Guest Count */}
      <FormField
        label="Number of Guests"
        icon={<Users className="w-5 h-5" />}
        error={errors.guest_count?.message}
        hint={`Venue capacity: up to ${venue.capacity} guests`}
      >
        <input
          type="number"
          {...register("guest_count", { valueAsNumber: true })}
          min={1}
          max={venue.capacity}
          placeholder="50"
          className={getInputClassName(!!errors.guest_count)}
        />
      </FormField>

      {/* Event Type */}
      <FormField
        label="Event Type"
        icon={<Briefcase className="w-5 h-5" />}
        error={errors.event_type?.message}
      >
        <select
          {...register("event_type")}
          className={getInputClassName(!!errors.event_type)}
        >
          <option value="">Select event type</option>
          {EVENT_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </FormField>

      {/* Contact Information */}
      <div className="pt-4 border-t border-border">
        <h4 className="font-serif text-lg text-foreground mb-4">
          Contact Information
        </h4>

        {/* Contact Name */}
        <FormField
          label="Full Name"
          error={errors.contact_name?.message}
        >
          <input
            type="text"
            {...register("contact_name")}
            placeholder="John Doe"
            className={getInputClassName(!!errors.contact_name)}
          />
        </FormField>

        {/* Contact Email */}
        <FormField
          label="Email Address"
          error={errors.contact_email?.message}
        >
          <input
            type="email"
            {...register("contact_email")}
            placeholder="john@company.com"
            className={getInputClassName(!!errors.contact_email)}
          />
        </FormField>

        {/* Contact Phone */}
        <FormField
          label="Phone Number"
          error={errors.contact_phone?.message}
        >
          <input
            type="tel"
            {...register("contact_phone")}
            placeholder="+852 1234 5678"
            className={getInputClassName(!!errors.contact_phone)}
          />
        </FormField>
      </div>

      {/* Special Requirements */}
      <FormField
        label="Special Requirements"
        icon={<MessageSquare className="w-5 h-5" />}
        error={errors.special_requirements?.message}
        hint="Optional: dietary restrictions, AV needs, etc."
      >
        <textarea
          {...register("special_requirements")}
          rows={4}
          placeholder="Tell us about any special requirements..."
          className={`${getInputClassName(!!errors.special_requirements)} resize-none`}
        />
      </FormField>

      {/* Budget (Optional) */}
      <FormField
        label="Estimated Budget (HKD)"
        icon={<Sparkles className="w-5 h-5" />}
        error={errors.budget?.message}
        hint="Optional: helps us tailor our recommendations"
      >
        <input
          type="number"
          {...register("budget", { valueAsNumber: true })}
          min={0}
          placeholder="50000"
          className={getInputClassName(!!errors.budget)}
        />
      </FormField>

      {/* Submit Button */}
      <motion.button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-4 rounded-xl bg-accent text-background font-medium text-lg hover:bg-accent-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        whileHover={isSubmitting ? undefined : { scale: 1.01 }}
        whileTap={isSubmitting ? undefined : { scale: 0.99 }}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Submitting...
          </>
        ) : (
          "Submit Booking Request"
        )}
      </motion.button>

      {/* Form Footer */}
      <p className="text-xs text-silver text-center">
        By submitting, you agree to our Terms of Service and Privacy Policy.
        <br />
        We&apos;ll respond within 24 hours.
      </p>
    </form>
  );
}

// =============================================================================
// HELPER COMPONENTS
// =============================================================================

interface FormFieldProps {
  label: string;
  icon?: React.ReactNode;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}

function FormField({ label, icon, error, hint, children }: FormFieldProps) {
  return (
    <div className="space-y-2">
      <label className="flex items-center gap-2 text-sm font-medium text-foreground">
        {icon && <span className="text-accent">{icon}</span>}
        {label}
      </label>
      {hint && <p className="text-xs text-silver/70 -mt-1">{hint}</p>}
      <div className="relative">
        {children}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              <AlertCircle className="w-5 h-5 text-red-500" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="text-sm text-red-400 flex items-center gap-1"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

function getInputClassName(hasError: boolean): string {
  return `
    w-full px-4 py-3 rounded-xl
    bg-surface-elevated border
    ${hasError ? "border-red-500/50" : "border-border"}
    text-foreground placeholder:text-silver/50
    focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20
    transition-all duration-200
  `.trim();
}
