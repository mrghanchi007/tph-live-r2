// Centralized products and category data
export const CATEGORY_LIST = [
  { 
    slug: 'men', 
    label: 'MEN', 
    image: '/images/MEN.png',
    description: 'Premium herbal supplements for men\'s health and vitality'
  },
  { 
    slug: 'women', 
    label: 'WOMEN', 
    image: '/images/WOMEN.png',
    description: 'Natural wellness products for women\'s health'
  },
  { 
    slug: 'weight-lose', 
    label: 'WEIGHT LOSE', 
    image: '/images/WEIGHT LOSE.png',
    description: 'Herbal solutions for healthy weight management'
  },
];

export const PRODUCTS = {
  men: [
    { 
      name: 'B-Maxman Royal Special Treatment', 
      price: 2500, 
      image: '/images/B-Maxman Royal Special Treatment.png',
      description: '۳۰+ عالمی شہرت یافتہ جڑی بوٹیوں کا طاقتور امتزاج، صدیوں سے قابل اعتماد\nEnhance male vitality and performance naturally',
      benefits: [
        'Boosts testosterone levels',
        'Improves stamina and energy',
        'Enhances muscle growth',
        'Supports reproductive health'
      ]
    },
    { 
      name: 'B-Maxtime Super Active', 
      price: 1200, 
      image: '/images/B-Maxtime Super Active.png',
      description: 'Prolong performance and satisfaction',
      benefits: [
        'Delays premature ejaculation',
        'Increases staying power',
        'Enhances pleasure',
        'Natural herbal formula'
      ]
    },
    { 
      name: 'Shahi Sultan Health Booster', 
      price: 9500, 
      image: '/images/Shahi Sultan Health Booster.png',
      description: 'To Live Life Powerfully / Actively / Strongly💪\nEnergetic • Men Power • Wellness in All Ages',
      benefits: [
        'Boosts immunity',
        'Enhances vitality',
        'Improves overall health',
        'Premium herbal ingredients'
      ]
    },
    { 
      name: 'Shahi Tila', 
      price: 2500, 
      image: '/images/Shahi Tila.png',
      description: 'Traditional herbal supplement for men',
      benefits: [
        'Increases energy',
        'Supports male health',
        'Natural ingredients',
        'Traditional formula'
      ]
    },
    { 
      name: 'Sultan Majoon', 
      price: 8000, 
      image: '/images/Sultan Majoon.png',
      description: 'Royal herbal jam for strength and vitality',
      benefits: [
        'Boosts energy',
        'Enhances stamina',
        'Supports immunity',
        'Traditional recipe'
      ]
    },
  ],
  women: [
    { 
      name: 'BustMax Breast Oil', 
      price: 2500, 
      image: '/images/BustMax Breast Oil.png',
      description: 'Natural breast enhancement oil',
      benefits: [
        'Firms and tones',
        'Natural breast enhancement',
        'Improves skin texture',
        'Herbal formula'
      ]
    },
    { 
      name: 'G-Max Passion', 
      price: 2000, 
      image: '/images/G-Max Passion.png',
      description: 'Enhance feminine vitality and desire',
      benefits: [
        'Boosts libido',
        'Enhances pleasure',
        'Balances hormones',
        'Natural ingredients'
      ]
    },
    { 
      name: 'Malka Shahi Gold Health Booster', 
      price: 7500, 
      image: '/images/Malka Shahi Gold Health Booster.png',
      description: 'Premium herbal tonic for women',
      benefits: [
        'Supports hormonal balance',
        'Enhances vitality',
        'Boosts immunity',
        'Rich in nutrients'
      ]
    },
  ],
  'weight-lose': [
    { 
      name: 'Slim n Shape Garcinia Cambogia Capsules', 
      price: 2000, 
      image: '/images/Slim n Shape Garcinia.png',
      description: 'Best Herbal Weight Loss Capsules in Pakistan | Natural Belly Fat Burner | Metabolism Booster for Men & Women\n\nPremium herbal formula for safe & effective weight loss.',
      benefits: [
        'Burn Belly Fat Naturally',
        'Control Appetite & Cravings',
        'Boost Energy & Metabolism',
        'Trusted by Thousands in Pakistan',
        'Special Price: Rs 2,000/-'
      ],
      fullDescription: {
        overview: 'Our products are made with the finest natural ingredients and are free from harmful chemicals. Each batch is carefully crafted to ensure maximum potency and effectiveness.',
        keyFeatures: [
          '۳۰+ عالمی شہرت یافتہ جڑی بوٹیوں کا طاقتور امتزاج',
          'صدیوں سے قابل اعتماد',
          'Enhances natural weight loss process'
        ],
        howToUse: 'Take 1-2 capsules daily with water, preferably with meals. For best results, use consistently as part of your daily routine. Results may vary based on individual body types and metabolism.',
        ingredients: 'Made with 100% natural Garcinia Cambogia extract and herbs. Free from artificial colors, flavors, and preservatives. Always read the label before use.'
      }
    },
    { 
      name: 'Slim n Shape Tea', 
      price: 999, 
      image: '/images/Slim n Shape Tea.png',
      description: 'Detox and weight management tea',
      benefits: [
        'Aids digestion',
        'Boosts metabolism',
        'Natural detox',
        'Antioxidant rich'
      ]
    },
  ],
};

// Build a URL-friendly slug from a product name
export const slugifyProduct = (name) =>
  String(name)
    .toLowerCase()
    .trim()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
