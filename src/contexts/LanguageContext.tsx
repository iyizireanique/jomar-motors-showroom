import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'rw' | 'fr';

interface Translation {
  [key: string]: string;
}

const translations: Record<Language, Translation> = {
  en: {
    // Header
    home: 'Home',
    contact: 'Contact',
    aboutUs: 'About Us',
    cars: 'Cars',
    forSale: 'For Sale',
    forRental: 'For Rental',
    allCars: 'All Cars',
    buyingConsultancy: 'Buying Consultancy',
    call: 'Call',
    whatsapp: 'WhatsApp',
    
    // Hero Section
    heroTitle: 'Quality Cars, Trusted Service',
    heroSubtitle: 'Find your perfect vehicle from our extensive collection of quality cars and reliable rental services in Rwanda',
    
    // Cars Page
    ourVehicles: 'OUR VEHICLES',
    browseCollection: 'Browse our collection of quality vehicles',
    rentalPriceRanges: 'Rental Price Ranges',
    fullRangeInfo: 'Our full range of rental vehicle types and their cost per day.',
    popularCars: 'Popular Cars',
    
    // Blog Content
    longTermRental: 'Long-Term & Short-Term Car Rental in Rwanda',
    rentalDescription: 'Planning an extended stay in Rwanda? Our long-term and short-term car rental options offer the perfect solution for business trips, volunteering, or extended holidays.',
    costSavings: 'Cost Savings',
    costSavingsDesc: 'Save up to 40% compared to short-term rentals, making your extended stay more budget-friendly.',
    comfortPrivacy: 'Comfort & Privacy',
    comfortPrivacyDesc: 'Enjoy personal space and freedom with your own vehicle, perfect for families or solo travelers.',
    flexibility: 'Flexibility',
    flexibilityDesc: 'Travel anywhere, anytime without depending on public transport. Our long-term packages start from a few weeks to yearly agreements.',
    vehicleVariety: 'Vehicle Variety',
    vehicleVarietyDesc: 'Choose from a wide range of vehicles, from rugged 4x4s to comfortable luxury sedans.',
    vehicleOptions: 'Vehicle Options'
  },
  rw: {
    // Header
    home: 'Ahabanza',
    contact: 'Twandikire',
    aboutUs: 'Turi nde',
    cars: 'Imodoka',
    forSale: 'Zo kugura',
    forRental: 'Zo gukodesha',
    allCars: 'Imodoka zose',
    buyingConsultancy: 'Inama zo kugura',
    call: 'Duhamagare',
    whatsapp: 'WhatsApp',
    
    // Hero Section
    heroTitle: 'Imodoka nziza, Serivise yizewe',
    heroSubtitle: 'Shakisha imodoka ikwiriye muri rusange rwacu rwinshi rw\'imodoka nziza n\'amakodesho azizewe mu Rwanda',
    
    // Cars Page
    ourVehicles: 'IMODOKA ZACU',
    browseCollection: 'Reba ubusabe bwacu bw\'imodoka nziza',
    rentalPriceRanges: 'Ibiciro byo gukodesha',
    fullRangeInfo: 'Ubwoko bwose bw\'imodoka dukodesha n\'ibiciro byazo buri munsi.',
    popularCars: 'Imodoka zikunda',
    
    // Blog Content
    longTermRental: 'Gukodesha imodoka igihe kirekire no kigufi mu Rwanda',
    rentalDescription: 'Uteganya kuguma igihe kirekire mu Rwanda? Amahitamo yacu yo gukodesha imodoka igihe kirekire no kigufi atanga igisubizo cyiza cy\'ingendo z\'ubucuruzi, ubushoferi, cyangwa ikiruhuko kirekire.',
    costSavings: 'Kuzigama amafaranga',
    costSavingsDesc: 'Zigama kugeza kuri 40% ugereranije n\'amakodesha y\'igihe kigufi, bigatuma uguma igihe kirekire ubikora ku biciro bihendutse.',
    comfortPrivacy: 'Ibyishimo & Amabanga',
    comfortPrivacyDesc: 'Wongere ibyishimo n\'ubwisanzure bwawe bwite hamwe n\'imodoka yawe, bikaba byiza ku muryango cyangwa abagenzi bonyine.',
    flexibility: 'Guhinduka',
    flexibilityDesc: 'Genda ahantu hose, igihe cyose utisabwa ubwikorezi rusange. Paki zacu z\'igihe kirekire zitangira mu cyumweru kimwe kugeza ku mwaka.',
    vehicleVariety: 'Ubwoko bw\'imodoka',
    vehicleVarietyDesc: 'Hitamo mu bwoko bwinshi bw\'imodoka, uhereye kuri 4x4 zikomeye kugeza kuri sedan z\'ubunyangamugayo.',
    vehicleOptions: 'Amahitamo y\'imodoka'
  },
  fr: {
    // Header
    home: 'Accueil',
    contact: 'Contact',
    aboutUs: 'À propos',
    cars: 'Voitures',
    forSale: 'À vendre',
    forRental: 'À louer',
    allCars: 'Toutes les voitures',
    buyingConsultancy: 'Conseil d\'achat',
    call: 'Appeler',
    whatsapp: 'WhatsApp',
    
    // Hero Section
    heroTitle: 'Voitures de qualité, service de confiance',
    heroSubtitle: 'Trouvez votre véhicule parfait dans notre vaste collection de voitures de qualité et services de location fiables au Rwanda',
    
    // Cars Page
    ourVehicles: 'NOS VÉHICULES',
    browseCollection: 'Parcourez notre collection de véhicules de qualité',
    rentalPriceRanges: 'Gammes de prix de location',
    fullRangeInfo: 'Notre gamme complète de types de véhicules de location et leur coût par jour.',
    popularCars: 'Voitures populaires',
    
    // Blog Content
    longTermRental: 'Location de voitures à long terme et court terme au Rwanda',
    rentalDescription: 'Vous planifiez un séjour prolongé au Rwanda? Nos options de location de voitures à long terme et court terme offrent la solution parfaite pour les voyages d\'affaires, le bénévolat ou les vacances prolongées.',
    costSavings: 'Économies de coûts',
    costSavingsDesc: 'Économisez jusqu\'à 40% par rapport aux locations à court terme, rendant votre séjour prolongé plus abordable.',
    comfortPrivacy: 'Confort et intimité',
    comfortPrivacyDesc: 'Profitez de l\'espace personnel et de la liberté avec votre propre véhicule, parfait pour les familles ou les voyageurs en solo.',
    flexibility: 'Flexibilité',
    flexibilityDesc: 'Voyagez n\'importe où, n\'importe quand sans dépendre des transports publics. Nos forfaits à long terme commencent de quelques semaines à des contrats annuels.',
    vehicleVariety: 'Variété de véhicules',
    vehicleVarietyDesc: 'Choisissez parmi une large gamme de véhicules, des 4x4 robustes aux berlines de luxe confortables.',
    vehicleOptions: 'Options de véhicules'
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && ['en', 'rw', 'fr'].includes(savedLanguage)) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};