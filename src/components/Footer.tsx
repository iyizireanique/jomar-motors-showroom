import { Link } from "react-router-dom";
import { Phone, MessageCircle, Mail, MapPin, Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-gold rounded-lg flex items-center justify-center">
                <span className="text-black font-bold">JM</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-primary">JOMAR MOTORS RWANDA</h3>
                <p className="text-xs text-muted-foreground">ISOKO RY'IMODOKA ZAKOZE RYIZEWE</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm">
              Your trusted automotive partner in Rwanda since 2019. We specialize in quality used cars, 
              rentals, and comprehensive automotive solutions.
            </p>
            <p className="text-xs text-muted-foreground">
              Part of JOMAR BUSINESS GROUP (JBG)
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { name: "Home", href: "/" },
                { name: "Used Cars", href: "/cars" },
                { name: "Rentals", href: "/cars?filter=rent" },
                { name: "About Us", href: "/about" },
                { name: "Contact", href: "/contact" },
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href} 
                    className="text-gray-400 hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Our Services</h4>
            <ul className="space-y-2">
              {[
                "Used Car Sales",
                "Car Rentals", 
                "Vehicle Trade-in",
                "Buying Consultancy",
                "Vehicle Inspection",
              ].map((service) => (
                <li key={service} className="text-gray-400 text-sm">
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Contact Info</h4>
            <div className="space-y-3">
              <a href="tel:+250788239593" className="flex items-center gap-3 text-gray-400 hover:text-primary transition-colors">
                <Phone className="w-4 h-4" />
                <span className="text-sm">+250 796 684 401</span>
              </a>
              <a href="https://wa.me/250788239593" className="flex items-center gap-3 text-gray-400 hover:text-primary transition-colors">
                <MessageCircle className="w-4 h-4" />
                <span className="text-sm">WhatsApp</span>
              </a>
              <a href="mailto:info@jomarbusinessgroup.com" className="flex items-center gap-3 text-gray-400 hover:text-primary transition-colors">
                <Mail className="w-4 h-4" />
                <span className="text-sm">info@jomarbusinessgroup.com</span>
              </a>
              <div className="flex items-center gap-3 text-gray-400">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">Kigali, Rwanda</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-3 pt-2">
              <a href="#" className="w-8 h-8 bg-muted rounded-full flex items-center justify-center hover:bg-primary hover:text-black transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 bg-muted rounded-full flex items-center justify-center hover:bg-primary hover:text-black transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 bg-muted rounded-full flex items-center justify-center hover:bg-primary hover:text-black transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 JOMAR MOTORS RWANDA. All rights reserved. | Established 2019 | Part of JOMAR BUSINESS GROUP
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;