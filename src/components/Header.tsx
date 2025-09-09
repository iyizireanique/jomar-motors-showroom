import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Menu, X, Phone, MessageCircle, ChevronDown, Info, Globe } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import rwandaFlag from "@/assets/rwandalog-Photoroom.png";
import { AboutModal } from "@/components/AboutModal";
import { useLanguage, Language } from "@/contexts/LanguageContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const navItems = [
    { name: t('home'), href: "/" },
    { name: t('contact'), href: "/contact" },
  ];

  const languages: { code: Language; name: string; flag: string }[] = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'rw', name: 'Kinyarwanda', flag: '🇷🇼' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' }
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
              <div className="flex items-center space-x-2">
                <h1 className="text-xl font-bold text-primary">{t('heroTitle')}</h1>
                <img 
                  src={rwandaFlag}
                  alt="Rwanda Flag"
                  className="w-6 h-6 rounded-sm border border-border/20"
                />
              </div>
              <p className="text-xs text-muted-foreground">{t('trustedPartner')}</p>
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
                {t('cars')} <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem asChild>
                  <Link to="/cars?filter=sale">{t('forSale')}</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/cars?filter=rent">{t('forRental')}</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/buying-guide">{t('buyingConsultancy')}</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          {/* Contact Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  {languages.find(l => l.code === language)?.flag}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {languages.map((lang) => (
                  <DropdownMenuItem 
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className={`cursor-pointer ${language === lang.code ? 'bg-primary text-primary-foreground' : ''}`}
                  >
                    <span className="mr-2">{lang.flag}</span>
                    {lang.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            <ThemeToggle />
            <Button variant="ghost" size="sm" asChild>
              <a href="tel:+250796684401" className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                {t('call')}
              </a>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <a href="https://wa.me/250796684401" className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4" />
                {t('whatsapp')}
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
                <p className="text-sm font-medium text-foreground mb-2">{t('cars')}</p>
                <div className="space-y-1 ml-4">
                  <Link to="/cars?filter=sale" className="block py-1 text-muted-foreground hover:text-primary" onClick={() => setIsMenuOpen(false)}>
                    {t('forSale')}
                  </Link>
                  <Link to="/cars?filter=rent" className="block py-1 text-muted-foreground hover:text-primary" onClick={() => setIsMenuOpen(false)}>
                    {t('forRental')}
                  </Link>
                  <Link to="/buying-guide" className="block py-1 text-muted-foreground hover:text-primary" onClick={() => setIsMenuOpen(false)}>
                    {t('buyingConsultancy')}
                  </Link>
                </div>
              </div>
              
              {/* Mobile Language Switcher */}
              <div className="px-4 py-2">
                <p className="text-sm font-medium text-foreground mb-2">Language</p>
                <div className="space-y-1 ml-4">
                  {languages.map((lang) => (
                    <button 
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setIsMenuOpen(false);
                      }}
                      className={`block py-1 text-left w-full ${
                        language === lang.code 
                          ? 'text-primary font-medium' 
                          : 'text-muted-foreground hover:text-primary'
                      }`}
                    >
                      <span className="mr-2">{lang.flag}</span>
                      {lang.name}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* About Us Modal for Mobile */}
              <div className="px-4 py-2">
                <AboutModal />
              </div>
              
              <div className="px-4 py-2 space-y-2">
                <Button variant="ghost" size="sm" className="w-full justify-start" asChild>
                  <a href="tel:+250796684401" className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    {t('call')}
                  </a>
                </Button>
                <Button variant="ghost" size="sm" className="w-full justify-start" asChild>
                  <a href="https://wa.me/250796684401" className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4" />
                    {t('whatsapp')}
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