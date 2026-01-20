'use client';

import { usePathname } from 'next/navigation';

export interface MetaTagsProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  noindex?: boolean;
  canonical?: string;
  locale?: string;
  type?: 'website' | 'article' | 'product' | 'business';
}

const DEFAULT_LOCALE = 'th';
const SITE_NAME = 'Phithiai - AI-Powered Ritual Planning Platform';
const DEFAULT_DESCRIPTION = 'Plan perfect Thai ceremonies with AI. From weddings and ordinations to funerals and annual merit ceremonies, find trusted vendors and create unforgettable memories.';
const DEFAULT_KEYWORDS = [
  'Thai wedding planning',
  'ordination ceremony',
  'funeral service',
  'annual merit ceremony',
  'AI ritual planner',
  'Thai ceremony vendor',
  'destination wedding Thailand',
  'traditional Thai wedding',
  'Buddhist ordination',
  'Thai funeral customs',
  'merit making ceremony',
  'wedding vendor marketplace',
  'ceremony planning platform'
];

// Ritual-specific keywords
const RITUAL_KEYWORDS: Record<string, string[]> = {
  wedding: [
    'Thai wedding planning',
    'destination wedding Thailand',
    'traditional Thai wedding',
    'Buddhist wedding ceremony',
    'wedding venue Thailand',
    'Thai wedding customs',
    'wedding photographer Thailand',
    'Thai wedding catering',
    'wedding decoration Thailand',
    'Buddhist marriage ceremony'
  ],
  ordination: [
    'Thai ordination ceremony',
    'Buddhist ordination',
    'monk ordination Thailand',
    'Prahm ordination',
    'Thai monk blessing',
    'ordination ceremony customs',
    'Buddhist novice ordination',
    'ordination preparation',
    'monk ceremony Thailand',
    'ordination rituals Thailand'
  ],
  funeral: [
    'Thai funeral service',
    'Buddhist funeral customs',
    'funeral ceremony Thailand',
    'traditional Thai funeral',
    'funeral rites Thailand',
    'cremation Thailand',
    'funeral arrangements',
    'Buddhist death rituals',
    'funeral customs Thailand',
    'memorial service Thailand'
  ],
  'annual-merit': [
    'annual merit ceremony',
    'Thai merit making',
    'Buddhist merit ceremony',
    'Tamboon merit making',
    'merit making ceremony Thailand',
    'Thai Buddhist rituals',
    'monk blessing ceremony',
    'annual merit tradition',
    'merit offering ceremony',
    'Thai temple ceremony'
  ]
};

export function DynamicMetaTags({
  title,
  description,
  keywords,
  image,
  noindex = false,
  canonical,
  locale = DEFAULT_LOCALE,
  type = 'website'
}: MetaTagsProps) {
  const pathname = usePathname();
  
  // Determine ritual type from pathname
  const getRitualType = (): string | null => {
    if (pathname.includes('/wedding')) return 'wedding';
    if (pathname.includes('/ordination')) return 'ordination';
    if (pathname.includes('/funeral')) return 'funeral';
    if (pathname.includes('/merit')) return 'annual-merit';
    return null;
  };

  const ritualType = getRitualType();
  const ritualKeywords = ritualType ? RITUAL_KEYWORDS[ritualType] : [];
  const allKeywords = [...DEFAULT_KEYWORDS, ...ritualKeywords, ...(keywords || [])];

  // Generate Open Graph tags
  const generateOGTags = () => {
    const ogTitle = title || SITE_NAME;
    const ogDescription = description || DEFAULT_DESCRIPTION;
    const ogImage = image || 'https://phithiai.com/og-default.jpg';
    const ogType = type === 'product' ? 'product' : type === 'article' ? 'article' : 'website';
    const ogLocale = locale === 'th' ? 'th_TH' : locale === 'en' ? 'en_US' : locale;

    return {
      'og:title': ogTitle,
      'og:description': ogDescription,
      'og:image': ogImage,
      'og:type': ogType,
      'og:locale': ogLocale,
      'og:site_name': SITE_NAME
    };
  };

  // Generate Twitter Card tags
  const generateTwitterCardTags = () => {
    const twitterTitle = title || SITE_NAME;
    const twitterDescription = description || DEFAULT_DESCRIPTION;
    const twitterImage = image || 'https://phithiai.com/twitter-default.jpg';

    return {
      'twitter:card': 'summary_large_image',
      'twitter:title': twitterTitle,
      'twitter:description': twitterDescription,
      'twitter:image': twitterImage,
      'twitter:site': '@phithiai'
    };
  };

  const ogTags = generateOGTags();
  const twitterTags = generateTwitterCardTags();

  return (
    <>
      {/* Basic Meta Tags */}
      <title>{title || SITE_NAME}</title>
      <meta name="description" content={description || DEFAULT_DESCRIPTION} />
      <meta name="keywords" content={allKeywords.join(', ')} />
      
      {/* Canonical URL */}
      {canonical && <link rel="canonical" href={canonical} />}
      
      {/* Robots */}
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      
      {/* Open Graph / Facebook */}
      <meta property="og:title" content={ogTags['og:title']} />
      <meta property="og:description" content={ogTags['og:description']} />
      <meta property="og:image" content={ogTags['og:image']} />
      <meta property="og:type" content={ogTags['og:type']} />
      <meta property="og:locale" content={ogTags['og:locale']} />
      <meta property="og:site_name" content={ogTags['og:site_name']} />
      <meta property="og:url" content={`https://phithiai.com${pathname}`} />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content={twitterTags['twitter:card']} />
      <meta name="twitter:title" content={twitterTags['twitter:title']} />
      <meta name="twitter:description" content={twitterTags['twitter:description']} />
      <meta name="twitter:image" content={twitterTags['twitter:image']} />
      <meta name="twitter:site" content={twitterTags['twitter:site']} />
      
      {/* Additional SEO Tags */}
      <link rel="alternate" hrefLang={locale} href={`https://phithiai.com${pathname}`} />
      <meta name="theme-color" content="#9333ea" />
      <meta name="msapplication-TileColor" content="#9333ea" />
      
      {/* Structured Data - Organization */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: SITE_NAME,
            url: 'https://phithiai.com',
            logo: 'https://phithiai.com/logo.png',
            description: DEFAULT_DESCRIPTION,
            address: {
              '@type': 'PostalAddress',
              addressCountry: 'TH',
              addressLocality: 'Bangkok',
              addressRegion: 'Bangkok',
              postalCode: '10110',
              streetAddress: 'Sukhumvit Road'
            },
            contactPoint: {
              '@type': 'ContactPoint',
              telephone: '+66-2-XXX-XXXX',
              contactType: 'customer service',
              email: 'contact@phithiai.com',
              availableLanguage: ['Thai', 'English']
            },
            sameAs: [
              'https://www.facebook.com/phithiai',
              'https://twitter.com/phithiai',
              'https://www.instagram.com/phithiai'
            ]
          })
        }}
      />
      
      {/* Structured Data - Website */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: SITE_NAME,
            url: 'https://phithiai.com',
            description: DEFAULT_DESCRIPTION,
            potentialAction: {
              '@type': 'SearchAction',
              target: 'https://phithiai.com/search',
              'query-input': 'required'
            },
            inLanguage: ['th', 'en']
          })
        }}
      />
    </>
  );
}

// Helper function to generate meta tags for specific pages
export function generatePageMetaTags(page: {
  title: string;
  description: string;
  ritualType?: string;
  image?: string;
}) {
  const ritualKeywords = page.ritualType ? RITUAL_KEYWORDS[page.ritualType] : [];
  
  return {
    title: `${page.title} | ${SITE_NAME}`,
    description: page.description,
    keywords: [...DEFAULT_KEYWORDS, ...ritualKeywords],
    image: page.image,
    type: 'article'
  };
}

// Pre-configured meta tags for common pages
export const PAGE_META_TAGS = {
  home: {
    title: 'AI-Powered Thai Ceremony Planning Platform',
    description: 'Plan perfect Thai ceremonies with AI. Find trusted vendors, compare prices, and create unforgettable memories for weddings, ordinations, funerals, and annual merit ceremonies.',
    image: 'https://phithiai.com/og-home.jpg'
  },
  wedding: {
    title: 'Thai Wedding Planning & Vendors',
    description: 'Plan your dream Thai wedding with AI. Find the best wedding venues, photographers, caterers, and more. Traditional Buddhist wedding ceremonies made easy.',
    image: 'https://phithiai.com/og-wedding.jpg',
    ritualType: 'wedding'
  },
  ordination: {
    title: 'Thai Ordination Ceremony Planning',
    description: 'Plan a traditional Thai Buddhist ordination ceremony (Prahm). Find monks, temples, robes, and ceremony arrangements.',
    image: 'https://phithiai.com/og-ordination.jpg',
    ritualType: 'ordination'
  },
  funeral: {
    title: 'Thai Funeral Services & Planning',
    description: 'Compassionate Thai funeral planning services. Find funeral homes, cremation services, and traditional Buddhist funeral arrangements.',
    image: 'https://phithiai.com/og-funeral.jpg',
    ritualType: 'funeral'
  },
  'annual-merit': {
    title: 'Annual Merit Making Ceremony (Tamboon)',
    description: 'Plan your annual merit making ceremony. Find temples, monks, and offerings for this sacred Buddhist tradition.',
    image: 'https://phithiai.com/og-merit.jpg',
    ritualType: 'annual-merit'
  },
  vendors: {
    title: 'Trusted Thai Ceremony Vendors',
    description: 'Discover verified vendors for Thai ceremonies. Browse wedding venues, photographers, caterers, florists, and more.',
    image: 'https://phithiai.com/og-vendors.jpg',
    type: 'product'
  },
  marketplace: {
    title: 'Thai Ceremony Marketplace',
    description: 'Browse and book ceremony vendors. Compare prices, read reviews, and find the perfect vendors for your special day.',
    image: 'https://phithiai.com/og-marketplace.jpg',
    type: 'website'
  }
};
