import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, MessageCircle } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Cars", href: "/cars" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header className="bg-background border-b border-border sticky top-0 z-50 animated-header">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-gold rounded-lg flex items-center justify-center">
              <span className="text-black font-bold text-xl">JM</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-primary">JOMAR MOTORS</h1>
              <p className="text-xs text-muted-foreground">ISOKO RY'IMODOKA ZAKOZE RYIZEWE</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-foreground hover:text-primary transition-colors duration-300"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Contact Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="sm" asChild>
              <a href="tel:+250788239593" className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Call
              </a>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <a href="https://wa.me/250788239593" className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-border">
            <nav className="py-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="block px-4 py-2 text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="px-4 py-2 space-y-2">
                <Button variant="ghost" size="sm" className="w-full justify-start" asChild>
                  <a href="tel:+250788239593" className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Call Now
                  </a>
                </Button>
                <Button variant="ghost" size="sm" className="w-full justify-start" asChild>
                  <a href="https://wa.me/250788239593" className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp
                  </a>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;