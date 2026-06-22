"use client";

import { motion } from "framer-motion";
import {
  Building2,
  Users,
  Calendar,
  Sparkles,
  ArrowRight,
  Check,
  Star,
  Shield,
  Clock,
  Award,
} from "lucide-react";
import { Container } from "@/components/Container";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

const packages = [
  {
    id: "starter",
    name: "Starter",
    price: "From HK$15,000",
    description: "Perfect for intimate corporate gatherings and small team events.",
    features: [
      "Venue selection from curated list",
      "Up to 50 guests",
      "Basic event coordination",
      "Standard catering options",
      "2 hours event duration",
      "Email support",
    ],
    highlighted: false,
  },
  {
    id: "professional",
    name: "Professional",
    price: "From HK$50,000",
    description: "Ideal for medium-sized corporate events and product launches.",
    features: [
      "Premium venue selection",
      "Up to 150 guests",
      "Dedicated event manager",
      "Custom catering menu",
      "4 hours event duration",
      "AV equipment included",
      "On-site coordination",
      "Priority support",
    ],
    highlighted: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "From HK$150,000",
    description: "For large-scale corporate events and executive gatherings.",
    features: [
      "Exclusive venue access",
      "Up to 500 guests",
      "Full event planning team",
      "Bespoke catering experience",
      "Full day event duration",
      "Premium AV & lighting",
      "Dedicated photographer",
      "VIP concierge service",
      "24/7 support hotline",
    ],
    highlighted: false,
  },
];

const benefits = [
  {
    icon: Building2,
    title: "Premium Venues",
    description: "Access to Hong Kong's most exclusive event spaces",
  },
  {
    icon: Users,
    title: "Expert Planning",
    description: "Dedicated event managers with years of experience",
  },
  {
    icon: Calendar,
    title: "Flexible Scheduling",
    description: "Book events at your convenience with easy rescheduling",
  },
  {
    icon: Shield,
    title: "Full Insurance",
    description: "Comprehensive coverage for all events",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Round-the-clock assistance for peace of mind",
  },
  {
    icon: Award,
    title: "Award-Winning Service",
    description: "Recognized for excellence in event management",
  },
];

const testimonials = [
  {
    quote: "The team made our annual gala absolutely seamless. Every detail was perfect.",
    author: "Sarah Chen",
    company: "Tech Ventures HK",
    rating: 5,
  },
  {
    quote: "Professional, responsive, and incredibly creative. Highly recommended!",
    author: "Michael Wong",
    company: "Finance Group Asia",
    rating: 5,
  },
  {
    quote: "They transformed our product launch into an unforgettable experience.",
    author: "Emily Lau",
    company: "Innovation Labs",
    rating: 5,
  },
];

export default function CorporatePackagesPage() {
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
              <Building2 className="w-4 h-4 text-accent" />
              <span className="text-sm text-silver">Corporate Event Solutions</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold text-foreground mb-6">
              Corporate Event{" "}
              <span className="text-gradient-gold">Packages</span>
            </h1>

            <p className="text-lg sm:text-xl text-silver leading-relaxed max-w-2xl mx-auto">
              Tailored event solutions for businesses of all sizes. From intimate
              board meetings to grand corporate galas.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Packages Section */}
      <section className="py-16">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-3xl sm:text-4xl text-foreground mb-4">
              Choose Your Package
            </h2>
            <p className="text-silver max-w-2xl mx-auto">
              Select the package that best fits your event needs. All packages
              include our signature service excellence.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                className={`relative glass-card rounded-2xl p-8 transition-all duration-300 hover:border-accent/30 ${
                  pkg.highlighted ? "border-accent/50 scale-105" : ""
                }`}
              >
                {pkg.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-accent text-background text-sm font-medium">
                    Most Popular
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="font-serif text-2xl text-foreground mb-2">
                    {pkg.name}
                  </h3>
                  <p className="text-2xl font-semibold text-accent mb-2">
                    {pkg.price}
                  </p>
                  <p className="text-sm text-silver">{pkg.description}</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-silver">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant={pkg.highlighted ? "primary" : "outline"}
                  size="lg"
                  className="w-full"
                  rightIcon={<ArrowRight className="w-5 h-5" />}
                  onClick={() => {
                    // Scroll to contact form or navigate to booking
                    const contactSection = document.getElementById("contact-section");
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                >
                  Get Started
                </Button>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-surface/30">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-3xl sm:text-4xl text-foreground mb-4">
              Why Choose Experience?
            </h2>
            <p className="text-silver max-w-2xl mx-auto">
              We bring together the best venues, service, and expertise to create
              unforgettable corporate events.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.05 }}
                className="glass-card rounded-xl p-6 text-center hover:border-accent/30 transition-all duration-300"
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
                  <benefit.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-serif text-lg text-foreground mb-2">
                  {benefit.title}
                </h3>
                <p className="text-sm text-silver">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Testimonials Section */}
      <section className="py-16">
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

      {/* CTA Section */}
      <section id="contact-section" className="py-16 bg-surface/30">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glass-card rounded-2xl p-8 md:p-12 text-center"
          >
            <Sparkles className="w-12 h-12 text-accent mx-auto mb-6" />
            <h2 className="font-serif text-3xl sm:text-4xl text-foreground mb-4">
              Ready to Plan Your Event?
            </h2>
            <p className="text-silver max-w-2xl mx-auto mb-8">
              Contact our team to discuss your requirements and get a custom
              quote tailored to your needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/venues">
                <Button variant="primary" size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
                  Browse Venues
                </Button>
              </Link>
              <Link href="/concierge">
                <Button variant="outline" size="lg">
                  Contact Concierge
                </Button>
              </Link>
            </div>
          </motion.div>
        </Container>
      </section>
    </div>
  );
}
