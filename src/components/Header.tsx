import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Menu, X, Phone, MessageCircle, ChevronDown, Info } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { AboutModal } from "@/components/AboutModal";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="bg-background border-b border-border sticky top-0 z-50 animated-header">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img 
              src="/lovable-uploads/567dfb02-fdd7-4e63-b937-138d23b1c3f6.png" 
              alt="Jomar Motors Rwanda Logo" 
              className="w-12 h-12 object-contain"
            />
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-primary">JOMAR MOTORS RWANDA</h1>
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
            {/* About Us Modal */}
            <AboutModal />
            
            {/* Cars Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-foreground hover:text-primary transition-colors duration-300">
                Cars <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem asChild>
                  <Link to="/cars?filter=sale">Buy </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/cars?filter=rent">Rental </Link>
                </DropdownMenuItem>
  
                <DropdownMenuItem asChild>
                  <Link to="/buying-guide">Buying Consultancy</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          {/* Contact Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
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
              
              {/* Mobile Cars Menu */}
              <div className="px-4 py-2">
                <p className="text-sm font-medium text-foreground mb-2">Cars</p>
                <div className="space-y-1 ml-4">
                  <Link to="/cars?filter=sale" className="block py-1 text-muted-foreground hover:text-primary" onClick={() => setIsMenuOpen(false)}>
                    Buy Cars
                  </Link>
                  <Link to="/cars?filter=rent" className="block py-1 text-muted-foreground hover:text-primary" onClick={() => setIsMenuOpen(false)}>
                    Rental Cars
                  </Link>
                  <Link to="/cars" className="block py-1 text-muted-foreground hover:text-primary" onClick={() => setIsMenuOpen(false)}>
                    All Cars
                  </Link>
                  <Link to="/buying-guide" className="block py-1 text-muted-foreground hover:text-primary" onClick={() => setIsMenuOpen(false)}>
                    Buying Consultancy
                  </Link>
                </div>
              </div>
              
              {/* About Us Modal for Mobile */}
              <div className="px-4 py-2">
                <AboutModal />
              </div>
              
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