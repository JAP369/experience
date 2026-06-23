"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

export interface BookingData {
  venueId: string;
  venueName: string;
  eventDate: string;
  guestCount: number;
  eventType: string;
  fullName: string;
  email: string;
  phone: string;
  specialRequirements: string;
  budget?: number;
}

interface BookingContextType {
  bookingData: BookingData | null;
  setBookingData: (data: Partial<BookingData>) => void;
  clearBooking: () => void;
  isBookingFlowOpen: boolean;
  openBookingFlow: (venueId?: string, venueName?: string) => void;
  closeBookingFlow: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [bookingData, setBookingDataState] = useState<BookingData | null>(null);
  const [isBookingFlowOpen, setIsBookingFlowOpen] = useState(false);

  const setBookingData = useCallback((data: Partial<BookingData>) => {
    setBookingDataState((prev) => ({
      ...prev,
      ...data,
    } as BookingData));
  }, []);

  const clearBooking = useCallback(() => {
    setBookingDataState(null);
  }, []);

  const openBookingFlow = useCallback((venueId?: string, venueName?: string) => {
    if (venueId && venueName) {
      setBookingDataState({
        venueId,
        venueName,
        eventDate: "",
        guestCount: 50,
        eventType: "",
        fullName: "",
        email: "",
        phone: "",
        specialRequirements: "",
      });
    }
    setIsBookingFlowOpen(true);
  }, []);

  const closeBookingFlow = useCallback(() => {
    setIsBookingFlowOpen(false);
  }, []);

  return (
    <BookingContext.Provider
      value={{
        bookingData,
        setBookingData,
        clearBooking,
        isBookingFlowOpen,
        openBookingFlow,
        closeBookingFlow,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
}
