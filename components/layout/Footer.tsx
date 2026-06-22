import Link from "next/link";
import { Sparkles, Mail, Phone, MapPin, Globe } from "lucide-react";
import { Container } from "@/components/Container";

const footerLinks = {
  platform: [
    { href: "/venues", label: "Venues" },
    { href: "/corporate-packages", label: "Corporate Packages" },
    { href: "/concierge", label: "Concierge" },
    { href: "/pricing", label: "Pricing" },
  ],
  company: [
    { href: "/about", label: "About Us" },
    { href: "/careers", label: "Careers" },
    { href: "/press", label: "Press" },
    { href: "/contact", label: "Contact" },
  ],
  legal: [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
    { href: "/cookies", label: "Cookie Policy" },
    { href: "/accessibility", label: "Accessibility" },
  ],
};

const socialLinks = [
  { icon: Globe, href: "#", label: "Instagram" },
  { icon: Globe, href: "#", label: "Facebook" },
  { icon: Globe, href: "#", label: "LinkedIn" },
];

export function Footer() {
  return (
    <footer className="bg-surface border-t border-border">
      <Container className="py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 group">
              <Sparkles className="w-6 h-6 text-accent" />
              <span className="font-serif text-xl font-semibold text-foreground">
                Experience
              </span>
            </Link>
            <p className="mt-4 text-sm text-silver leading-relaxed max-w-sm">
              Hong Kong&apos;s premier event management platform. Creating extraordinary
              moments through curated venues and seamless planning.
            </p>
            
            {/* Contact Info */}
            <div className="mt-6 space-y-3">
              <a
                href="mailto:hello@experience.hk"
                className="flex items-center gap-3 text-sm text-silver hover:text-accent transition-colors"
              >
                <Mail className="w-4 h-4" />
                hello@experience.hk
              </a>
              <a
                href="tel:+85212345678"
                className="flex items-center gap-3 text-sm text-silver hover:text-accent transition-colors"
              >
                <Phone className="w-4 h-4" />
                +852 1234 5678
              </a>
              <div className="flex items-center gap-3 text-sm text-silver">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                Central, Hong Kong
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="p-2 rounded-full bg-surface-elevated text-silver hover:text-accent hover:bg-accent-muted transition-all duration-200"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="font-serif text-lg font-medium text-foreground mb-4">
              Platform
            </h4>
            <ul className="space-y-3">
              {footerLinks.platform.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-silver hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-serif text-lg font-medium text-foreground mb-4">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-silver hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-serif text-lg font-medium text-foreground mb-4">
              Legal
            </h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-silver hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-border">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-silver">
              © {new Date().getFullYear()} Experience. All rights reserved.
            </p>
            <p className="text-sm text-silver">
              Made with care in Hong Kong
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
