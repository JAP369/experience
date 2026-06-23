"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Calendar,
  Users,
  Briefcase,
  MessageSquare,
  Check,
  AlertCircle,
  Loader2,
  Sparkles,
  MapPin,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { useBooking } from "@/lib/booking-context";
import { EVENT_TYPES } from "@/types/database";
import { DUMMY_VENUES } from "@/data/venues";

const STEPS = [
  { id: 1, title: "Venue", icon: MapPin },
  { id: 2, title: "Details", icon: Calendar },
  { id: 3, title: "Contact", icon: Users },
  { id: 4, title: "Review", icon: Check },
];

export function BookingModal() {
  const {
    isBookingFlowOpen,
    closeBookingFlow,
    bookingData,
    setBookingData,
    clearBooking,
  } = useBooking();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const selectedVenue = bookingData?.venueId
    ? DUMMY_VENUES.find((v) => v.id === bookingData.venueId)
    : null;

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1 && !bookingData?.venueId) {
      newErrors.venue = "Please select a venue";
    }
    if (step === 2) {
      if (!bookingData?.eventDate)
        newErrors.eventDate = "Event date is required";
      if (!bookingData?.guestCount || bookingData.guestCount < 1)
        newErrors.guestCount = "Guest count must be at least 1";
      if (!bookingData?.eventType)
        newErrors.eventType = "Event type is required";
    }
    if (step === 3) {
      if (!bookingData?.fullName || bookingData.fullName.length < 2)
        newErrors.fullName = "Name must be at least 2 characters";
      if (!bookingData?.email || !bookingData.email.includes("@"))
        newErrors.email = "Valid email is required";
      if (!bookingData?.phone || bookingData.phone.length < 8)
        newErrors.phone = "Valid phone number is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 4));
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    setErrors({});
  };

  const handleSubmit = async () => {
    if (!validateStep(3)) {
      setCurrentStep(3);
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSuccess(true);
  };

  const handleClose = () => {
    closeBookingFlow();
    setCurrentStep(1);
    setIsSuccess(false);
    setErrors({});
    setTimeout(() => clearBooking(), 300);
  };

  const updateField = (field: string, value: string | number) => {
    setBookingData({ [field]: value });
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  return (
    <AnimatePresence>
      {isBookingFlowOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className='fixed inset-0 z-50 flex items-center justify-center p-4'
          onClick={handleClose}
        >
          {/* Backdrop */}
          <div className='absolute inset-0 bg-background/80 backdrop-blur-sm' />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.4 }}
            className='relative w-full max-w-2xl max-h-[90vh] overflow-hidden glass-card rounded-2xl'
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className='flex items-center justify-between p-6 border-b border-border'>
              <div>
                <h2 className='font-serif text-2xl text-foreground'>
                  Book Your Event
                </h2>
                <p className='text-sm text-silver mt-1'>
                  Step {currentStep} of 4
                </p>
              </div>
              <button
                onClick={handleClose}
                className='p-2 rounded-lg hover:bg-surface-elevated transition-colors'
              >
                <X className='w-5 h-5 text-silver' />
              </button>
            </div>

            {/* Progress Steps */}
            <div className='flex items-center justify-between px-6 py-4 border-b border-border bg-surface/30'>
              {STEPS.map((step, index) => (
                <div key={step.id} className='flex items-center'>
                  <div
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-colors ${
                      currentStep === step.id
                        ? "bg-accent/10 text-accent"
                        : currentStep > step.id
                          ? "text-green-500"
                          : "text-silver"
                    }`}
                  >
                    {currentStep > step.id ? (
                      <Check className='w-4 h-4' />
                    ) : (
                      <step.icon className='w-4 h-4' />
                    )}
                    <span className='text-sm font-medium hidden sm:inline'>
                      {step.title}
                    </span>
                  </div>
                  {index < STEPS.length - 1 && (
                    <div
                      className={`w-8 h-px mx-2 ${
                        currentStep > step.id ? "bg-green-500" : "bg-border"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Content */}
            <div className='p-6 overflow-y-auto max-h-[50vh]'>
              <AnimatePresence mode='wait'>
                {/* Step 1: Venue Selection */}
                {currentStep === 1 && (
                  <motion.div
                    key='step1'
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className='space-y-4'
                  >
                    <h3 className='font-serif text-lg text-foreground mb-4'>
                      Select a Venue
                    </h3>
                    {errors.venue && (
                      <div className='p-3 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center gap-2'>
                        <AlertCircle className='w-4 h-4 text-red-500' />
                        <span className='text-sm text-red-400'>
                          {errors.venue}
                        </span>
                      </div>
                    )}
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[300px] overflow-y-auto pr-2'>
                      {DUMMY_VENUES.map((venue) => (
                        <button
                          key={venue.id}
                          onClick={() => {
                            updateField("venueId", venue.id);
                            updateField("venueName", venue.name);
                          }}
                          className={`p-4 rounded-xl border text-left transition-all ${
                            bookingData?.venueId === venue.id
                              ? "border-accent bg-accent/10"
                              : "border-border hover:border-accent/50"
                          }`}
                        >
                          <div className='flex items-start gap-3'>
                            <div className='w-12 h-12 rounded-lg bg-surface-elevated flex items-center justify-center flex-shrink-0'>
                              <MapPin className='w-5 h-5 text-accent' />
                            </div>
                            <div className='flex-1 min-w-0'>
                              <h4 className='font-medium text-foreground truncate'>
                                {venue.name}
                              </h4>
                              <p className='text-sm text-silver'>
                                {venue.district}
                              </p>
                              <p className='text-xs text-silver mt-1'>
                                Up to {venue.capacity} guests
                              </p>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Event Details */}
                {currentStep === 2 && (
                  <motion.div
                    key='step2'
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className='space-y-6'
                  >
                    <h3 className='font-serif text-lg text-foreground'>
                      Event Details
                    </h3>

                    <div>
                      <label className='flex items-center gap-2 text-sm font-medium text-foreground mb-2'>
                        <Calendar className='w-4 h-4 text-accent' />
                        Event Date
                      </label>
                      <input
                        type='date'
                        value={bookingData?.eventDate || ""}
                        onChange={(e) =>
                          updateField("eventDate", e.target.value)
                        }
                        min={new Date().toISOString().split("T")[0]}
                        className={`w-full px-4 py-3 rounded-xl bg-surface-elevated border ${
                          errors.eventDate
                            ? "border-red-500/50"
                            : "border-border"
                        } text-foreground focus:outline-none focus:border-accent/50 transition-colors`}
                      />
                      {errors.eventDate && (
                        <p className='text-sm text-red-400 mt-1'>
                          {errors.eventDate}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className='flex items-center gap-2 text-sm font-medium text-foreground mb-2'>
                        <Users className='w-4 h-4 text-accent' />
                        Number of Guests
                      </label>
                      <input
                        type='number'
                        value={bookingData?.guestCount || 50}
                        onChange={(e) =>
                          updateField(
                            "guestCount",
                            parseInt(e.target.value) || 0,
                          )
                        }
                        min={1}
                        max={selectedVenue?.capacity || 5000}
                        className={`w-full px-4 py-3 rounded-xl bg-surface-elevated border ${
                          errors.guestCount
                            ? "border-red-500/50"
                            : "border-border"
                        } text-foreground focus:outline-none focus:border-accent/50 transition-colors`}
                      />
                      {errors.guestCount && (
                        <p className='text-sm text-red-400 mt-1'>
                          {errors.guestCount}
                        </p>
                      )}
                      {selectedVenue && (
                        <p className='text-xs text-silver mt-1'>
                          Venue capacity: up to {selectedVenue.capacity} guests
                        </p>
                      )}
                    </div>

                    <div>
                      <label className='flex items-center gap-2 text-sm font-medium text-foreground mb-2'>
                        <Briefcase className='w-4 h-4 text-accent' />
                        Event Type
                      </label>
                      <select
                        value={bookingData?.eventType || ""}
                        onChange={(e) =>
                          updateField("eventType", e.target.value)
                        }
                        className={`w-full px-4 py-3 rounded-xl bg-surface-elevated border ${
                          errors.eventType
                            ? "border-red-500/50"
                            : "border-border"
                        } text-foreground focus:outline-none focus:border-accent/50 transition-colors`}
                      >
                        <option value=''>Select event type</option>
                        {EVENT_TYPES.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                      {errors.eventType && (
                        <p className='text-sm text-red-400 mt-1'>
                          {errors.eventType}
                        </p>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Contact Info */}
                {currentStep === 3 && (
                  <motion.div
                    key='step3'
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className='space-y-6'
                  >
                    <h3 className='font-serif text-lg text-foreground'>
                      Contact Information
                    </h3>

                    <div>
                      <label className='block text-sm font-medium text-foreground mb-2'>
                        Full Name
                      </label>
                      <input
                        type='text'
                        value={bookingData?.fullName || ""}
                        onChange={(e) =>
                          updateField("fullName", e.target.value)
                        }
                        placeholder='John Doe'
                        className={`w-full px-4 py-3 rounded-xl bg-surface-elevated border ${
                          errors.fullName
                            ? "border-red-500/50"
                            : "border-border"
                        } text-foreground placeholder:text-silver/50 focus:outline-none focus:border-accent/50 transition-colors`}
                      />
                      {errors.fullName && (
                        <p className='text-sm text-red-400 mt-1'>
                          {errors.fullName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className='block text-sm font-medium text-foreground mb-2'>
                        Email Address
                      </label>
                      <input
                        type='email'
                        value={bookingData?.email || ""}
                        onChange={(e) => updateField("email", e.target.value)}
                        placeholder='john@company.com'
                        className={`w-full px-4 py-3 rounded-xl bg-surface-elevated border ${
                          errors.email ? "border-red-500/50" : "border-border"
                        } text-foreground placeholder:text-silver/50 focus:outline-none focus:border-accent/50 transition-colors`}
                      />
                      {errors.email && (
                        <p className='text-sm text-red-400 mt-1'>
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className='block text-sm font-medium text-foreground mb-2'>
                        Phone Number
                      </label>
                      <input
                        type='tel'
                        value={bookingData?.phone || ""}
                        onChange={(e) => updateField("phone", e.target.value)}
                        placeholder='+852 1234 5678'
                        className={`w-full px-4 py-3 rounded-xl bg-surface-elevated border ${
                          errors.phone ? "border-red-500/50" : "border-border"
                        } text-foreground placeholder:text-silver/50 focus:outline-none focus:border-accent/50 transition-colors`}
                      />
                      {errors.phone && (
                        <p className='text-sm text-red-400 mt-1'>
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className='flex items-center gap-2 text-sm font-medium text-foreground mb-2'>
                        <MessageSquare className='w-4 h-4 text-accent' />
                        Special Requirements (Optional)
                      </label>
                      <textarea
                        value={bookingData?.specialRequirements || ""}
                        onChange={(e) =>
                          updateField("specialRequirements", e.target.value)
                        }
                        placeholder='Dietary restrictions, AV needs, etc.'
                        rows={3}
                        className='w-full px-4 py-3 rounded-xl bg-surface-elevated border border-border text-foreground placeholder:text-silver/50 focus:outline-none focus:border-accent/50 transition-colors resize-none'
                      />
                    </div>
                  </motion.div>
                )}

                {/* Step 4: Review */}
                {currentStep === 4 && !isSuccess && (
                  <motion.div
                    key='step4'
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className='space-y-6'
                  >
                    <h3 className='font-serif text-lg text-foreground'>
                      Review Your Booking
                    </h3>

                    <div className='space-y-4'>
                      <div className='p-4 rounded-xl bg-surface-elevated'>
                        <div className='flex items-center gap-3 mb-3'>
                          <MapPin className='w-5 h-5 text-accent' />
                          <div>
                            <p className='text-sm text-silver'>Venue</p>
                            <p className='font-medium text-foreground'>
                              {selectedVenue?.name}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className='grid grid-cols-2 gap-4'>
                        <div className='p-4 rounded-xl bg-surface-elevated'>
                          <p className='text-sm text-silver'>Date</p>
                          <p className='font-medium text-foreground'>
                            {bookingData?.eventDate
                              ? new Date(
                                  bookingData.eventDate,
                                ).toLocaleDateString("en-US", {
                                  weekday: "short",
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                })
                              : "-"}
                          </p>
                        </div>
                        <div className='p-4 rounded-xl bg-surface-elevated'>
                          <p className='text-sm text-silver'>Guests</p>
                          <p className='font-medium text-foreground'>
                            {bookingData?.guestCount}
                          </p>
                        </div>
                      </div>

                      <div className='p-4 rounded-xl bg-surface-elevated'>
                        <p className='text-sm text-silver mb-1'>Event Type</p>
                        <p className='font-medium text-foreground'>
                          {bookingData?.eventType}
                        </p>
                      </div>

                      <div className='p-4 rounded-xl bg-surface-elevated'>
                        <p className='text-sm text-silver mb-2'>Contact</p>
                        <p className='font-medium text-foreground'>
                          {bookingData?.fullName}
                        </p>
                        <p className='text-sm text-silver'>
                          {bookingData?.email}
                        </p>
                        <p className='text-sm text-silver'>
                          {bookingData?.phone}
                        </p>
                      </div>

                      {bookingData?.specialRequirements && (
                        <div className='p-4 rounded-xl bg-surface-elevated'>
                          <p className='text-sm text-silver mb-1'>
                            Special Requirements
                          </p>
                          <p className='text-foreground'>
                            {bookingData.specialRequirements}
                          </p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* Success State */}
                {isSuccess && (
                  <motion.div
                    key='success'
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className='text-center py-8'
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 15,
                      }}
                      className='w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center'
                    >
                      <Check className='w-8 h-8 text-green-500' />
                    </motion.div>
                    <h3 className='font-serif text-2xl text-foreground mb-2'>
                      Booking Submitted!
                    </h3>
                    <p className='text-silver mb-6'>
                      We&apos;ll be in touch within 24 hours to confirm your
                      booking.
                    </p>
                    <p className='text-sm text-silver'>
                      Reference: #EXP-{Date.now().toString(36).toUpperCase()}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            <div className='flex items-center justify-between p-6 border-t border-border bg-surface/30'>
              {currentStep > 1 && !isSuccess ? (
                <button
                  onClick={handleBack}
                  className='flex items-center gap-2 px-4 py-2 rounded-lg text-silver hover:text-foreground transition-colors'
                >
                  <ChevronLeft className='w-4 h-4' />
                  Back
                </button>
              ) : (
                <div />
              )}

              {!isSuccess ? (
                currentStep < 4 ? (
                  <button
                    onClick={handleNext}
                    className='flex items-center gap-2 px-6 py-2 rounded-lg bg-accent text-background font-medium hover:bg-accent-hover transition-colors'
                  >
                    Continue
                    <ChevronRight className='w-4 h-4' />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className='flex items-center gap-2 px-6 py-2 rounded-lg bg-accent text-background font-medium hover:bg-accent-hover transition-colors disabled:opacity-50'
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className='w-4 h-4 animate-spin' />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Sparkles className='w-4 h-4' />
                        Confirm Booking
                      </>
                    )}
                  </button>
                )
              ) : (
                <button
                  onClick={handleClose}
                  className='px-6 py-2 rounded-lg bg-accent text-background font-medium hover:bg-accent-hover transition-colors'
                >
                  Done
                </button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
