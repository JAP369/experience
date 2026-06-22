"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  MapPin,
  Users,
  Clock,
  CheckCircle,
  LogOut,
  User,
  Building,
  ChevronRight,
} from "lucide-react";
import { Container } from "@/components/Container";
import { useAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { DUMMY_INQUIRIES } from "@/data/inquiries";
import { getVenueById } from "@/data/venues";
import { InquiryStatus } from "@/types/database";
import Link from "next/link";

export default function DashboardPage() {
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check auth client-side after mount
    if (!isAuthenticated) {
      router.push("/login");
    } else {
      setIsLoading(false);
    }
  }, [isAuthenticated, router]);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <Container>
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-silver">Loading...</p>
          </div>
        </Container>
      </div>
    );
  }

  // Get user's inquiries (for demo, show all)
  const userInquiries = DUMMY_INQUIRIES;

  const stats = [
    {
      label: "Total Bookings",
      value: userInquiries.length,
      icon: Calendar,
      color: "text-accent",
    },
    {
      label: "Pending",
      value: userInquiries.filter((i) => i.status === InquiryStatus.Pending).length,
      icon: Clock,
      color: "text-yellow-500",
    },
    {
      label: "Approved",
      value: userInquiries.filter((i) => i.status === InquiryStatus.Approved).length,
      icon: CheckCircle,
      color: "text-green-500",
    },
    {
      label: "Completed",
      value: userInquiries.filter((i) => i.status === InquiryStatus.Completed).length,
      icon: CheckCircle,
      color: "text-blue-500",
    },
  ];

  const getStatusBadge = (status: InquiryStatus) => {
    const styles = {
      [InquiryStatus.Pending]: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
      [InquiryStatus.Approved]: "bg-green-500/10 text-green-500 border-green-500/20",
      [InquiryStatus.Completed]: "bg-blue-500/10 text-blue-500 border-blue-500/20",
      [InquiryStatus.Cancelled]: "bg-red-500/10 text-red-500 border-red-500/20",
    };
    return styles[status] || styles[InquiryStatus.Pending];
  };

  return (
    <div className="min-h-screen pt-20 pb-16">
      <Container>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8"
        >
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl text-foreground">
              Welcome, {user?.full_name}
            </h1>
            <p className="text-silver mt-1">Manage your events and bookings</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-surface-elevated text-silver hover:text-red-400 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="glass-card rounded-xl p-6 hover:border-accent/30 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-2">
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
                <span className="text-2xl font-serif font-semibold text-foreground">
                  {stat.value}
                </span>
              </div>
              <p className="text-sm text-silver">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8"
        >
          <Link href="/venues">
            <div className="glass-card rounded-xl p-6 hover:border-accent/30 transition-all duration-300 cursor-pointer group">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Browse Venues</p>
                    <p className="text-sm text-silver">Find your perfect space</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-silver group-hover:text-accent transition-colors" />
              </div>
            </div>
          </Link>

          <Link href="/corporate-packages">
            <div className="glass-card rounded-xl p-6 hover:border-accent/30 transition-all duration-300 cursor-pointer group">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                    <Building className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">View Packages</p>
                    <p className="text-sm text-silver">Corporate solutions</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-silver group-hover:text-accent transition-colors" />
              </div>
            </div>
          </Link>

          <Link href="/concierge">
            <div className="glass-card rounded-xl p-6 hover:border-accent/30 transition-all duration-300 cursor-pointer group">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                    <User className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Contact Concierge</p>
                    <p className="text-sm text-silver">Get personalized help</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-silver group-hover:text-accent transition-colors" />
              </div>
            </div>
          </Link>
        </motion.div>

        {/* Recent Bookings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-serif text-2xl text-foreground">Recent Bookings</h2>
            <button className="text-sm text-accent hover:text-accent-hover transition-colors">
              View All
            </button>
          </div>

          <div className="space-y-4">
            {userInquiries.slice(0, 5).map((inquiry) => {
              const venue = getVenueById(inquiry.venue_id);
              return (
                <motion.div
                  key={inquiry.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="glass-card rounded-xl p-6 hover:border-accent/30 transition-all duration-300"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <Calendar className="w-6 h-6 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground">
                          {venue?.name || "Unknown Venue"}
                        </h3>
                        <div className="flex flex-wrap items-center gap-3 mt-1 text-sm text-silver">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(inquiry.event_date).toLocaleDateString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            {inquiry.guest_count} guests
                          </span>
                          <span className="flex items-center gap-1">
                            <Building className="w-3 h-3" />
                            {inquiry.event_type}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusBadge(
                          inquiry.status
                        )}`}
                      >
                        {inquiry.status}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Empty State */}
        {userInquiries.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-surface-elevated flex items-center justify-center">
              <Calendar className="w-8 h-8 text-accent" />
            </div>
            <h3 className="font-serif text-xl text-foreground mb-2">
              No bookings yet
            </h3>
            <p className="text-silver mb-6">
              Start by browsing our venues and making your first booking.
            </p>
            <Link href="/venues">
              <button className="px-6 py-3 rounded-xl bg-accent text-background font-medium hover:bg-accent-hover transition-colors">
                Browse Venues
              </button>
            </Link>
          </motion.div>
        )}
      </Container>
    </div>
  );
}
