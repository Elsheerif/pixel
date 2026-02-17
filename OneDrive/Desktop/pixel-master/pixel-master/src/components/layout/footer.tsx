import Link from "next/link";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Imagefooter from "next/image";

const footerSections = [
  {
    title: "Shop",
    links: [
      { title: "Electronics", href: "" },
      { title: "Fashion", href: "" },
      { title: "Home & Garden", href: "" },
      { title: "Sports", href: "" },
      { title: "Deals", href: "" },
    ],
  },
  {
    title: "Customer Service",
    links: [
      { title: "Contact Us", href: "" },
      { title: "Help Center", href: "" },
      { title: "Track Your Order", href: "" },
      { title: "Returns & Exchanges", href: "" },
      { title: "Size Guide", href: "" },
    ],
  },
  {
    title: "About",
    links: [
      { title: "About Pixel", href: "" },
      { title: "Careers", href: "" },
      { title: "Press", href: "" },
      { title: "Investor Relations", href: "" },
      { title: "Sustainability", href: "" },
    ],
  },
  {
    title: "Policies",
    links: [
      { title: "Privacy Policy", href: "" },
      { title: "Terms of Service", href: "" },
      { title: "Cookie Policy", href: "" },
      { title: "Shipping Policy", href: "" },
      { title: "Refund Policy", href: "" },
    ],
  },
];
const socialLinks = [
  { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { icon: Youtube, href: "https://youtube.com", label: "YouTube" },
];

export function Footer() {
  return (
    <footer className="bg-muted/30 border-t">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
          <Link href="/" className="flex items-center space-x-1 ">
            <Imagefooter
              src="/logo.png"
              alt="Pixel"
              width={32}
              height={32}
              className="h-10 w-10"
            />
            <span className="font-bold text-xl ">Pixel</span>

          </Link>
          <br />
            <p className="text-muted-foreground mb-4 max-w-md">
              Your one-stop destination for the latest technology, fashion, and
              lifestyle products. Quality guaranteed with fast shipping and
              excellent customer service.
            </p>

            {/* Contact Info */}
            <div className="space-y-2 mb-6">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>123 Tech Street, Digital City, DC 12345</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>support@PIXEL.com</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-2">
              {socialLinks.map((social) => (
                <Button
                  key={social.label}
                  variant="outline"
                  size="icon"
                  asChild
                >
                  <Link
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <social.icon className="h-4 w-4" />
                    <span className="sr-only">{social.label}</span>
                  </Link>
                </Button>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title} className="space-y-4">
              <h3 className="font-semibold text-sm uppercase tracking-wide">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.title}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {/* <Separator className="my-8" /> */}
        {/* Newsletter Signup
        <div>
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <h3 className="font-semibold mb-2">Stay Updated</h3>
              <p className="text-sm text-muted-foreground">
                Subscribe to our newsletter for the latest deals and updates.
              </p>
            </div>
            <div className="flex w-full md:w-auto max-w-md space-x-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
              <Button className="bg-orange-500" type="submit">Subscribe</Button>
            </div>
          </div>
        </div> */}

        {/* <Separator className="my-8" /> */}
          <br />
        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 text-sm text-muted-foreground">
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
            <p>&copy; 2025 Pixel. All rights reserved.</p>
            <div className="hidden md:block">•</div>
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="hover:text-foreground transition-colors"
              >
                Privacy
              </Link>
              <Link
                href="/"
                className="hover:text-foreground transition-colors"
              >
                Terms
              </Link>
              <Link
                href="/"
                className="hover:text-foreground transition-colors"
              >
                Cookies
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <span>Powered by</span>
            <Link
              href="https://nextjs.org"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold hover:text-foreground transition-colors"
            >
              Next.js
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
