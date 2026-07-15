import { Product, Category, Testimonial } from './types';

export const CATEGORIES: Category[] = [
  {
    id: 'tvs',
    name: 'TVs & Entertainment',
    slug: 'TVs',
    image: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=800&q=80',
    description: 'Sleek OLED, QLED & 4K Smart TVs with cinema-grade displays.'
  },
  {
    id: 'fridges-freezers',
    name: 'Fridges & Freezers',
    slug: 'Fridges',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
    description: 'American style, integrated & freestanding cooling appliances.'
  },
  {
    id: 'washing-machines',
    name: 'Washing Machines',
    slug: 'Washing Machines',
    image: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=800&q=80',
    description: 'Eco-friendly and high spin washers, dryers, and combos.'
  },
  {
    id: 'cookers-ovens',
    name: 'Cookers & Ovens',
    slug: 'Cookers',
    image: 'https://images.unsplash.com/photo-1522012147041-30a112015367?auto=format&fit=crop&w=800&q=80',
    description: 'Induction cookers, double ovens, and high-efficiency stoves.'
  },
  {
    id: 'dishwashers',
    name: 'Dishwashers',
    slug: 'Dishwashers',
    image: 'https://images.unsplash.com/photo-1585837554808-a116f3ef2951?auto=format&fit=crop&w=800&q=80',
    description: 'Quiet, premium integrated and freestanding dishwashers.'
  },
  {
    id: 'kitchen-appliances',
    name: 'Kitchen Appliances',
    slug: 'Kitchen Appliances',
    image: 'https://images.unsplash.com/photo-1578643463396-0997cb5328c1?auto=format&fit=crop&w=800&q=80',
    description: 'Award-winning coffee machines, stand mixers, and blenders.'
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Samsung 65" QN90D Neo QLED 4K Smart TV',
    category: 'TVs',
    price: 1299,
    originalPrice: 1599,
    rating: 4.9,
    reviewsCount: 118,
    image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=800&q=80',
    tag: 'Refurbished',
    grade: 'Grade A (As New)',
    specs: {
      'Screen Size': '65 Inch',
      'Display Tech': 'Neo QLED 4K',
      'Refresh Rate': '144Hz',
      'Smart TV': 'Yes (Tizen OS)',
      'HDMI Ports': '4 x HDMI 2.1'
    },
    description: 'Experience stunning color accuracy and brilliant brightness with Samsung’s Neo QLED 4K display. Our Grade A refurbished models are meticulously tested and come with a full 1-year local warranty.',
    inStock: true
  },
  {
    id: 'prod-2',
    name: 'LG OLED evo C4 Series 55" 4K Smart TV',
    category: 'TVs',
    price: 1149,
    originalPrice: 1299,
    rating: 5.0,
    reviewsCount: 84,
    image: 'https://images.unsplash.com/photo-1601944179066-297bab3c6d49?auto=format&fit=crop&w=800&q=80',
    tag: 'New',
    specs: {
      'Screen Size': '55 Inch',
      'Display Tech': 'OLED 4K',
      'Processor': 'α9 AI Processor Gen7',
      'Audio': '9.1.2 Virtual Surround',
      'Gaming': 'G-Sync & FreeSync Compatible'
    },
    description: 'The absolute pinnacle of cinematic home entertainment. Perfect self-lit black levels, outstanding brightness, and extremely slim bezels. Comes brand new in box with 5-year manufacturer warranty.',
    inStock: true
  },
  {
    id: 'prod-3',
    name: 'Bosch Serie 6 NoFrost American Fridge Freezer',
    category: 'Fridges',
    price: 949,
    originalPrice: 1199,
    rating: 4.8,
    reviewsCount: 62,
    image: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80',
    tag: 'New',
    specs: {
      'Capacity': '572 Litres',
      'Defrost Style': 'NoFrost (Frost Free)',
      'Noise Level': '38 dB',
      'Energy Rating': 'E Class',
      'Dimensions': '178.7 x 90.8 x 70.7 cm'
    },
    description: 'Keep your fresh foods organized and perfectly preserved. Features dynamic MultiAirflow cooling, an integrated water dispenser, and digital temperature control.',
    inStock: true
  },
  {
    id: 'prod-4',
    name: 'Beko Integrated Tall Larder Fridge',
    category: 'Fridges',
    price: 379,
    rating: 4.6,
    reviewsCount: 29,
    image: 'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=800&q=80',
    tag: 'New',
    specs: {
      'Capacity': '310 Litres',
      'Fit Type': 'Built-In (Integrated)',
      'Reversible Door': 'Yes',
      'Shelves': '6 Adjustable Safety Glass'
    },
    description: 'A spacious and highly efficient integrated larder fridge. Fits seamlessly behind your kitchen cabinet door, perfect for modern styled kitchens.',
    inStock: true
  },
  {
    id: 'prod-5',
    name: 'Miele W1 9kg 1400 Spin Washing Machine',
    category: 'Washing Machines',
    price: 849,
    originalPrice: 1049,
    rating: 4.9,
    reviewsCount: 93,
    image: 'https://images.unsplash.com/photo-1545173168-9f1947eebd01?auto=format&fit=crop&w=800&q=80',
    tag: 'Refurbished',
    grade: 'Grade A+ (Certified Pristine)',
    specs: {
      'Capacity': '9.0 kg',
      'Spin Speed': '1400 RPM',
      'Motor': 'ProfiEco Inverter',
      'Energy Rating': 'A Class (Extremely Efficient)',
      'Special feature': 'TwinDos Automated Dispensing'
    },
    description: 'Tested for the equivalent of 20 years of use, Miele offers unmatched durability and washing performance. This pristine refurbished model has been fully rebuilt using OEM parts.',
    inStock: true
  },
  {
    id: 'prod-6',
    name: 'Hotpoint ActiveCare 10kg 1400 Spin Washer',
    category: 'Washing Machines',
    price: 429,
    rating: 4.7,
    reviewsCount: 51,
    image: 'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?auto=format&fit=crop&w=800&q=80',
    tag: 'New',
    specs: {
      'Capacity': '10.0 kg',
      'Spin Speed': '1400 RPM',
      'Steam Cycle': 'Yes',
      'Stain Removal': 'Removes 100+ stains at 20°C'
    },
    description: 'Tackle the largest laundry piles with ease. Hotpoint ActiveCare technology pre-mixes water and detergent for maximum stain-fighting power even at energy-saving low temperatures.',
    inStock: true
  },
  {
    id: 'prod-7',
    name: 'Neff Slide & Hide Integrated Double Oven',
    category: 'Cookers',
    price: 699,
    originalPrice: 849,
    rating: 4.9,
    reviewsCount: 47,
    image: 'https://images.unsplash.com/photo-1506084868230-bb9d95c24759?auto=format&fit=crop&w=800&q=80',
    tag: 'New',
    specs: {
      'Type': 'Electric Double Oven',
      'Main Cavity': '71 Litres',
      'Second Cavity': '34 Litres',
      'Door Style': 'Slide & Hide (Fits under oven)',
      'Cleaning': 'Pyrolytic Self-Cleaning'
    },
    description: 'The iconic Neff oven with the disappearing door. Ideal for compact kitchens or high-end layouts, giving you safe, easy access to your cooking.',
    inStock: true
  },
  {
    id: 'prod-8',
    name: 'Sage Barista Express Coffee Machine',
    category: 'Kitchen Appliances',
    price: 549,
    originalPrice: 629,
    rating: 4.8,
    reviewsCount: 144,
    image: 'https://images.unsplash.com/photo-1517256064527-09c53b2d0bc6?auto=format&fit=crop&w=800&q=80',
    tag: 'Hot Sale',
    specs: {
      'Type': 'Bean to Cup Espresso',
      'Grinder': 'Integrated Conical Burr',
      'Pressure': '15 Bar Italian Pump',
      'Steam Wand': 'Manual Microfoam milk texturing',
      'Water Tank': '2.0 Litres'
    },
    description: 'Deliver third-wave specialty coffee at home. Dose-control grinding delivers the perfect amount of freshly ground coffee directly into the portafilter for your preferred taste.',
    inStock: true
  },
  {
    id: 'prod-9',
    name: 'KitchenAid Artisan 4.8L Stand Mixer',
    category: 'Kitchen Appliances',
    price: 399,
    originalPrice: 499,
    rating: 4.9,
    reviewsCount: 198,
    image: 'https://images.unsplash.com/photo-1578643463396-0997cb5328c1?auto=format&fit=crop&w=800&q=80',
    tag: 'Limited Stock',
    specs: {
      'Capacity': '4.8 Litres',
      'Body Material': 'Full Die-Cast Metal',
      'Speeds': '10 Speed Slide Control',
      'Included': 'Dough Hook, Flat Beater, Wire Whisk'
    },
    description: 'An design icon of the modern kitchen. Solid metal construction ensures long-lasting reliability and heavy-duty baking performance.',
    inStock: true
  },
  {
    id: 'prod-10',
    name: 'Miele G 5210 SC Active Dishwasher',
    category: 'Dishwashers',
    price: 649,
    rating: 4.8,
    reviewsCount: 37,
    image: 'https://images.unsplash.com/photo-1545048702-79362596cdc9?auto=format&fit=crop&w=800&q=80',
    tag: 'New',
    specs: {
      'Place Settings': '14 Places',
      'Water Consumption': '8.9 Litres',
      'Noise Level': '45 dB',
      'Dry System': 'AutoOpen Drying'
    },
    description: 'Enjoy impeccable drying and cleaning results. Miele’s AutoOpen drying automatically pops the door open at the end of the program to let fresh air circulate.',
    inStock: true
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Sarah Montgomery',
    location: 'Belfast',
    rating: 5,
    comment: 'Ordered the Refurbished Miele Washing Machine. It looks absolutely brand new, and they delivered and fitted it within 24 hours. The delivery team was incredibly professional!',
    date: 'July 2026',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80'
  },
  {
    id: 'test-2',
    name: 'David Vance',
    location: 'Derry / Londonderry',
    rating: 5,
    comment: 'Unbelievable customer service from NI Drip Central. Found a TV online but wanted to make sure it fit my stand. They texted me dimensions instantly and delivered it to Derry the next morning.',
    date: 'June 2026',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80'
  },
  {
    id: 'test-3',
    name: 'Emma Fitzpatrick',
    location: 'Ballymena',
    rating: 5,
    comment: 'Saved over £300 buying a refurbished Samsung QLED here compared to Currys. Highly recommend buying appliances from this local NI business. Fully warranted and premium service.',
    date: 'May 2026',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80'
  }
];

export const WHY_CHOOSE_US_CARDS = [
  {
    title: 'Fast Delivery',
    description: 'Speedy local shipping direct to your door anywhere in Northern Ireland. Scheduled delivery times.',
    icon: 'Truck'
  },
  {
    title: 'Price Match Promise',
    description: 'Premium quality electronics at the absolute lowest local prices. We match any legitimate high-street offer.',
    icon: 'DollarSign'
  },
  {
    title: 'Trusted Local Business',
    description: 'We are a proudly family-owned Northern Irish retailer offering personalized support and service.',
    icon: 'Store'
  },
  {
    title: 'Manufacturer Warranty',
    description: 'Shop with 100% peace of mind. All items include either full manufacturer or comprehensive local warranties.',
    icon: 'ShieldCheck'
  },
  {
    title: 'Secure Checkout',
    description: 'We encrypt all transaction data. Pay securely with Credit/Debit cards, Apple Pay, Google Pay, or PayPal.',
    icon: 'Lock'
  }
];

export const DELIVERY_STEPS = [
  {
    step: '01',
    title: 'Browse Products',
    description: 'Explore our curated inventory of brand-new and pristine refurbished appliances online or request live video specs.',
    icon: 'Search'
  },
  {
    step: '02',
    title: 'Place Order',
    description: 'Complete your purchase with secure payment. Choose your preferred delivery day and options during checkout.',
    icon: 'ShoppingBag'
  },
  {
    step: '03',
    title: 'Fast Delivery',
    description: 'Our professional, two-man local NI delivery team handles the heavy lifting, delivering straight to your room of choice.',
    icon: 'Truck'
  },
  {
    step: '04',
    title: 'Enjoy Your Appliance',
    description: 'Plug in and enjoy your new luxury appliance with peace of mind backed by our full local technical support.',
    icon: 'Sparkles'
  }
];
