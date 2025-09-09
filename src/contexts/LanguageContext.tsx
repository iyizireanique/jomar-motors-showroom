import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'rw' | 'fr';

interface Translation {
  [key: string]: string | {
    [key: string]: string;
  };
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
    
    // Site branding translations
    heroTitle: 'JOMAR MOTORS RWANDA',
    trustedPartner: 'ISOKO RY\'IMODOKA RYIZEWE',
    heroSubtitle: 'Buy, Sell, Rent Cars',
    heroDescription: 'Your premier automotive destination in Rwanda. From premium used cars to professional buying consultancy, we provide comprehensive automotive solutions with trusted expertise and quality guarantee.',
    viewCars: 'View Cars',
    rentCar: 'Rent a Car',
    learnMore: 'Learn More About Used Car Buying',
    since2019: 'Since 2019',
    qualityGuaranteed: 'Quality Guaranteed',
    
    // Featured Cars Section
    featuredCars: 'FEATURED CARS',
    hotDeals: 'HOT DEALS',
    certifiedInspected: 'Certified & Inspected Cars',
    certifiedInspectedDesc: '"Imodoka zigenzuwe &zifite ibyangombwa"',
    loadingCars: 'Loading cars...',
    noFeaturedCars: 'No featured cars available at the moment.',
    viewAllCars: 'View All Cars',
    forSaleLabel: 'For Sale',
    forRentLabel: 'For Rent',
    
    // Car Details Modal
    year: 'Year',
    mileage: 'Mileage',
    price: 'Price',
    status: 'Status',
    transmission: 'Transmission',
    fuel: 'Fuel',
    seats: 'Seats',
    features: 'Features:',
    fullDetails: 'Full Details',
    priceOnRequest: 'Price on request',
    
    // Categorized Cars
    hotDealsForSale: 'HOT DEALS FOR SALE',
    hotDealsDesc: 'Professionally inspected and hot deal vehicles.',
    usedCarsForSale: 'USED CARS FOR SALE',
    usedCarsDesc: 'Quality pre-owned vehicles ready for new owners',
    rentalCars: 'Rental Cars',
    rentalCarsDesc: 'Vehicles available for short and long-term rental',
    
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
    vehicleOptions: 'Vehicle Options',

    // Rental Blog
    rentalBlog: {
      title: "Car Rental Services",
      subtitle: "Explore our premium fleet of rental vehicles. Perfect for business trips, family vacations, or daily commutes.",
      noCars: "No rental cars available at the moment.",
      photos: "Photos",
      noImage: "No image available",
      rental: "For Rent",
      seats: "Seats",
      transmission: "Transmission", 
      fuel: "Fuel Type",
      call: "Call Now",
      details: "View Details"
    }
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
    
    // Site branding translations  
    heroTitle: 'JOMAR MOTORS RWANDA',
    trustedPartner: 'ISOKO RY\'IMODOKA RYIZEWE',
    heroSubtitle: 'Gura, Gurisha, Kodesha Imodoka',
    heroDescription: 'Ikigo cyacu gikomeye cy\'imodoka mu Rwanda. Kuva mu modoka za kimwe zizwi neza kugeza mu nama z\'ubushoferi, dutanga ibisubizo byose by\'imodoka hamwe n\'ubumenyi bwizerwemo n\'ubwizere.',
    viewCars: 'Reba Imodoka',
    rentCar: 'Kodesha Imodoka',
    learnMore: 'Menya Byinshi ku Kugura Imodoka Zakoreshejwe',
    since2019: 'Kuva 2019',
    qualityGuaranteed: 'Ubunyangamugayo Bwemejwe',
    
    // Featured Cars Section
    featuredCars: 'IMODOKA ZIKOMEYE',
    hotDeals: 'AMACURUZI ASHYUHA',
    certifiedInspected: 'Imodoka Zigenzuwe & Zifite Ibyangombwa',
    certifiedInspectedDesc: '"Imodoka zigenzuwe &zifite ibyangombwa"',
    loadingCars: 'Gupakurura imodoka...',
    noFeaturedCars: 'Nta modoka zikomeye ziboneka ubu.',
    viewAllCars: 'Reba Imodoka Zose',
    forSaleLabel: 'Zo Kugura',
    forRentLabel: 'Zo Gukodesha',
    
    // Car Details Modal
    year: 'Umwaka',
    mileage: 'Kilometero',
    price: 'Igiciro',
    status: 'Uko bimeze',
    transmission: 'Transmission',
    fuel: 'Lisansi',
    seats: 'Intebe',
    features: 'Ibiranga:',
    fullDetails: 'Amakuru Yose',
    priceOnRequest: 'Igiciro ku gusaba',
    
    // Categorized Cars
    hotDealsForSale: 'AMACURUZI ASHYUHA YO KUGURA',
    hotDealsDesc: 'Imodoka zagenzuwe neza kandi zifite amacuruzi ashyuha.',
    usedCarsForSale: 'IMODOKA ZAKORESHEJWE ZO KUGURA',
    usedCarsDesc: 'Imodoka nziza zakoreshejwe ziteguye abanyereza bashya',
    rentalCars: 'Imodoka zo Gukodesha',
    rentalCarsDesc: 'Imodoka ziboneka zo gukodesha mu gihe kigufi no kirekire',
    
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
    vehicleOptions: 'Amahitamo y\'imodoka',

    // Rental Blog
    rentalBlog: {
      title: "Serivisi z'Ubukode bw'Ibinyabiziga",
      subtitle: "Reba ubwato bwacu bwiza bw'ibinyabiziga byo gukodesha. Byiza mu rugendo rw'ubucuruzi, amahoro y'umuryango, cyangwa ingendo za buri munsi.",
      noCars: "Nta binyabiziga byo gukodesha bihari uyu munsi.",
      photos: "Amafoto",
      noImage: "Nta shusho ihari",
      rental: "Byo Gukodesha",
      seats: "Intebe",
      transmission: "Ubwishingizi",
      fuel: "Ubwoko bwa Lisansi",
      call: "Hamagara None",
      details: "Reba Amakuru"
    }
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
    
    // Site branding translations
    heroTitle: 'JOMAR MOTORS RWANDA', 
    trustedPartner: 'Partenaire de Confiance',
    heroSubtitle: 'Acheter, Vendre, Louer des Voitures',
    heroDescription: 'Votre destination automobile de premier plan au Rwanda. Des voitures d\'occasion premium au conseil d\'achat professionnel, nous fournissons des solutions automobiles complètes avec une expertise de confiance et une garantie de qualité.',
    viewCars: 'Voir les Voitures',
    rentCar: 'Louer une Voiture',
    learnMore: 'En Savoir Plus sur l\'Achat de Voitures d\'Occasion',
    since2019: 'Depuis 2019',
    qualityGuaranteed: 'Qualité Garantie',
    
    // Featured Cars Section
    featuredCars: 'VOITURES VEDETTES',
    hotDeals: 'BONNES AFFAIRES',
    certifiedInspected: 'Voitures Certifiées et Inspectées',
    certifiedInspectedDesc: '"Voitures inspectées et certifiées"',
    loadingCars: 'Chargement des voitures...',
    noFeaturedCars: 'Aucune voiture vedette disponible pour le moment.',
    viewAllCars: 'Voir Toutes les Voitures',
    forSaleLabel: 'À Vendre',
    forRentLabel: 'À Louer',
    
    // Car Details Modal
    year: 'Année',
    mileage: 'Kilométrage',
    price: 'Prix',
    status: 'Statut',
    transmission: 'Transmission',
    fuel: 'Carburant',
    seats: 'Sièges',
    features: 'Caractéristiques:',
    fullDetails: 'Détails Complets',
    priceOnRequest: 'Prix sur demande',
    
    // Categorized Cars
    hotDealsForSale: 'BONNES AFFAIRES À VENDRE',
    hotDealsDesc: 'Véhicules inspectés professionnellement et bonnes affaires.',
    usedCarsForSale: 'VOITURES D\'OCCASION À VENDRE',
    usedCarsDesc: 'Véhicules d\'occasion de qualité prêts pour de nouveaux propriétaires',
    rentalCars: 'Voitures de Location',
    rentalCarsDesc: 'Véhicules disponibles pour location court et long terme',
    
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
    vehicleOptions: 'Options de véhicules',

    // Rental Blog
    rentalBlog: {
      title: "Services de Location de Voitures",
      subtitle: "Explorez notre flotte premium de véhicules de location. Parfait pour les voyages d'affaires, les vacances en famille ou les trajets quotidiens.",
      noCars: "Aucune voiture de location disponible pour le moment.",
      photos: "Photos",
      noImage: "Aucune image disponible",
      rental: "À Louer",
      seats: "Sièges",
      transmission: "Transmission",
      fuel: "Type de Carburant",
      call: "Appeler Maintenant",
      details: "Voir Détails"
    }
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string | any;
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

  const t = (key: string): string | any => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) break;
    }
    
    if (value === undefined) {
      // Fallback to English
      value = translations.en;
      for (const k of keys) {
        value = value?.[k];
        if (value === undefined) break;
      }
    }
    
    return value || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};