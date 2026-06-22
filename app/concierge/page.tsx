"use client";

import { motion } from "framer-motion";
import {
  ConciergeBell,
  Calendar,
  MessageSquare,
  Check,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Clock,
  Star,
  Shield,
  Award,
} from "lucide-react";
import { Container } from "@/components/Container";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

const services = [
  {
    icon: Calendar,
    title: "Event Planning",
    description:
      "Full-service event planning from concept to execution. Our team handles every detail.",
  },
  {
    icon: MessageSquare,
    title: "24/7 Support",
    description:
      "Round-the-clock assistance for all your event needs. We're always here to help.",
  },
  {
    icon: Shield,
    title: "Vendor Management",
    description:
      "We coordinate with the best vendors in Hong Kong to ensure seamless execution.",
  },
  {
    icon: Award,
    title: "VIP Experiences",
    description:
      "Access to exclusive experiences and premium services for your guests.",
  },
];

const testimonials = [
  {
    quote:
      "The concierge service made our event absolutely seamless. Every detail was perfect.",
    author: "Sarah Chen",
    company: "Tech Ventures HK",
    rating: 5,
  },
  {
    quote:
      "Professional, responsive, and incredibly creative. Highly recommended!",
    author: "Michael Wong",
    company: "Finance Group Asia",
    rating: 5,
  },
  {
    quote:
      "They transformed our product launch into an unforgettable experience.",
    author: "Emily Lau",
    company: "Innovation Labs",
    rating: 5,
  },
];

export default function ConciergePage() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-surface/30 to-background" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/3 rounded-full blur-3xl" />

        <Container className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
              <ConciergeBell className="w-4 h-4 text-accent" />
              <span className="text-sm text-silver">Personalized Assistance</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold text-foreground mb-6">
              Our <span className="text-gradient-gold">Concierge</span> Team
            </h1>

            <p className="text-lg sm:text-xl text-silver leading-relaxed max-w-2xl mx-auto">
              Get personalized assistance from our expert concierge team. We're
              here to help you plan, book, and execute your perfect event.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Services Section */}
      <section className="py-16">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-3xl sm:text-4xl text-foreground mb-4">
              How We Can Help
            </h2>
            <p className="text-silver max-w-2xl mx-auto">
              Our concierge team provides comprehensive support for all your
              event needs.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.05 }}
                className="glass-card rounded-xl p-6 text-center hover:border-accent/30 transition-all duration-300"
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
                  <service.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-serif text-lg text-foreground mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-silver">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-surface/30">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-3xl sm:text-4xl text-foreground mb-4">
              What Our Clients Say
            </h2>
            <p className="text-silver max-w-2xl mx-auto">
              Trusted by leading companies across Hong Kong.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                className="glass-card rounded-xl p-6"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-accent fill-accent"
                    />
                  ))}
                </div>
                <p className="text-foreground mb-4 italic">
                  &quot;{testimonial.quote}&quot;
                </p>
                <div>
                  <p className="font-medium text-foreground">
                    {testimonial.author}
                  </p>
                  <p className="text-sm text-silver">{testimonial.company}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glass-card rounded-2xl p-8 md:p-12"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Left Column - Info */}
              <div>
                <h2 className="font-serif text-3xl sm:text-4xl text-foreground mb-6">
                  Get in Touch
                </h2>
                <p className="text-silver mb-8">
                  Our concierge team is available 24/7 to assist you with any
                  questions or bookings.
                </p>

                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                      <Phone className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm text-silver">Phone</p>
                      <p className="text-foreground">+852 2123 4567</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                      <Mail className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm text-silver">Email</p>
                      <p className="text-foreground">concierge@experience.hk</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm text-silver">Location</p>
                      <p className="text-foreground">Central, Hong Kong</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                      <Clock className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm text-silver">Hours</p>
                      <p className="text-foreground">24/7 Support</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Form */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="Your name"
                    className="w-full px-4 py-3 rounded-xl bg-surface-elevated border border-border text-foreground placeholder:text-silver/50 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all duration-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 rounded-xl bg-surface-elevated border border-border text-foreground placeholder:text-silver/50 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all duration-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    placeholder="+852 1234 5678"
                    className="w-full px-4 py-3 rounded-xl bg-surface-elevated border border-border text-foreground placeholder:text-silver/50 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all duration-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your event..."
                    className="w-full px-4 py-3 rounded-xl bg-surface-elevated border border-border text-foreground placeholder:text-silver/50 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all duration-200 resize-none"
                  />
                </div>

                <Button
                  variant="primary"
                  size="lg"
                  className="w-full"
                  rightIcon={<ArrowRight className="w-5 h-5" />}
                >
                  Send Message
                </Button>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-surface/30">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="font-serif text-3xl sm:text-4xl text-foreground mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-silver max-w-2xl mx-auto mb-8">
              Browse our venues or contact our concierge team to start planning
              your perfect event.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/venues">
                <Button
                  variant="primary"
                  size="lg"
                  rightIcon={<ArrowRight className="w-5 h-5" />}
                >
                  Browse Venues
                </Button>
              </Link>
              <Link href="/corporate-packages">
                <Button variant="outline" size="lg">
                  View Packages
                </Button>
              </Link>
            </div>
          </motion.div>
        </Container>
      </section>
    </div>
  );
}
