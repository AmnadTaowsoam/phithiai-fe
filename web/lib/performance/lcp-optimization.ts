/**
 * Largest Contentful Paint (LCP) Optimization Utilities
 * 
 * These utilities help optimize the LCP metric for better Core Web Vitals scores
 * Target: LCP < 2.5s for good user experience
 */

// Image optimization utilities
export interface ImageOptimizationOptions {
  width?: number;
  height?: number;
  quality?: number; // 1-100, default 80
  format?: 'webp' | 'avif' | 'jpeg' | 'png';
  lazy?: boolean;
}

/**
 * Generate optimized image URL with CDN parameters
 */
export function getOptimizedImageUrl(
  baseUrl: string,
  options: ImageOptimizationOptions = {}
): string {
  const {
    width = 1200,
    height = 630,
    quality = 80,
    format = 'webp',
    lazy = false
  } = options;

  const url = new URL(baseUrl);  
  
  // Add CDN optimization parameters
  url.searchParams.set('w', width.toString());
  url.searchParams.set('h', height.toString());
  url.searchParams.set('q', quality.toString());
  url.searchParams.set('f', format);
  url.searchParams.set('fm', lazy ? 'blur' : 'sharp');

  return url.toString();
}

/**
 * Generate responsive image srcset for different screen sizes
 */
export function generateResponsiveSrcset(
  baseUrl: string,
  options: Omit<ImageOptimizationOptions, 'lazy'> = {}
): string {
  const sizes = [
    { width: 640, height: 360 },   // Mobile
    { width: 768, height: 432 },   // Tablet
    { width: 1024, height: 576 },  // Small desktop
    { width: 1200, height: 630 },   // Medium desktop
    { width: 1920, height: 1080 }  // Large desktop
  ];

  const srcset = sizes
    .map(size => {
      const optimizedUrl = getOptimizedImageUrl(baseUrl, { ...options, ...size });
      return `${optimizedUrl} ${size.width}w`;
    })
    .join(', ');

  return srcset;
}

/**
 * Get appropriate image dimensions for different breakpoints
 */
export function getImageDimensions(breakpoint: 'mobile' | 'tablet' | 'desktop' | 'large'): { width: number; height: number } {
  const dimensions = {
    mobile: { width: 640, height: 360 },
    tablet: { width: 768, height: 432 },
    desktop: { width: 1024, height: 576 },
    large: { width: 1920, height: 1080 }
  };

  return dimensions[breakpoint];
}

/**
 * Preload critical images for above-the-fold content
 */
export function preloadCriticalImages(imageUrls: string[]): void {
  if (typeof window === 'undefined') return;

  imageUrls.forEach(url => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = getOptimizedImageUrl(url, { format: 'webp' });
    document.head.appendChild(link);
  });
}

/**
 * Lazy load images with intersection observer
 */
export function lazyLoadImages(
  selector: string,
  rootMargin: string = '0px'
): void {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

  const images = document.querySelectorAll(selector);  
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.classList.remove('lazy');
        }
      }
    });
  }, {
    rootMargin,
    threshold: 0.1
  });

  images.forEach(img => {
    img.classList.add('lazy');
    observer.observe(img);
  });
}

// Font optimization utilities
export interface FontOptimizationOptions {
  display?: 'swap' | 'fallback' | 'optional';
  preload?: boolean;
}

/**
 * Generate optimized font loading strategy
 */
export function getFontLoadingStrategy(options: FontOptimizationOptions = {}): string {
  const { display = 'swap', preload = true } = options;

  // Display values: swap, fallback, optional, block
  // preload: Yes/No for critical fonts
  
  if (preload) {
    return `font-display: ${display};`;
  }  
  
  return `font-display: ${display};`;
}

/**
 * Get critical font subsets for faster loading
 */
export function getCriticalFontSubsets(): string[] {
  return [
    'latin-ext',  // Extended Latin for English and Thai
    'thai',       // Thai characters
    'latin'       // Basic Latin
  ];
}

/**
 * Optimize inline critical CSS
 */
export function optimizeCriticalCSS(css: string): string {
  // Remove comments and whitespace
  let optimized = css
    .replace(/\/\*[\s\S]*?\*\//g, '') // Remove comments
    .replace(/\s+/g, ' ')      // Collapse multiple spaces
    .trim();

  // Minify (basic)
  optimized = optimized
    .replace(/\s*([{}:;,])\s*/g, '$1')  // Remove spaces around operators
    .replace(/;}/g, '}')
    .replace(/;{/g, '{');

  return optimized;
}

/**
 * Generate critical CSS for above-the-fold content
 */
export function generateCriticalCSS(): string {
  return `
/* Critical CSS for LCP Optimization */
:root {
  --primary-color: #9333ea;
  --secondary-color: #ec4899;
  --text-color: #1f2937;
  --bg-color: #ffffff;
}

/* Prevent layout shift */
body {
  margin: 0;
  padding: 0;
}

/* Hero section - above-the fold */
.hero-section {
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.hero-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

.hero-title {
  font-size: clamp(2rem, 5vw, 4rem);
  font-weight: 700;
  color: white;
  margin-bottom: 1rem;
  line-height: 1.2;
}

.hero-subtitle {
  font-size: clamp(1rem, 3vw, 1.25rem);
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 2rem;
}

/* Prevent layout shift with aspect ratio */
.hero-image {
  width: 100%;
  height: 0;
  padding-bottom: 56.25%; /* 16:9 aspect ratio */
  position: relative;
  background-size: cover;
  background-position: center;
}

/* CTA Button - prevent layout shift */
.cta-button {
  min-height: 48px;
  padding: 12px 24px;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0.4px 12px rgba(0, 0, 0, 0.1);
}
`;
}

/**
 * Generate preload hints for critical resources
 */
export function generatePreloadHints(): string {
  return `
<!-- Preload Hints for Critical Resources -->
<link rel="preload" href="/fonts/primary.woff2" as="font" type="font/woff2" crossorigin />
<link rel="preload" href="/fonts/secondary.woff2" as="font" type="font/woff2" crossorigin />
<link rel="preload" href="/images/hero-bg.webp" as="image" type="image/webp" />
<link rel="preload" href="/styles/critical.css" as="style" />
`;
}

/**
 * Get content security policy for LCP
 */
export function getContentSecurityPolicy(): string {
  return "default-src 'self'; script-src 'self' 'unsafe-inline' 'self' 'unsafe-eval' 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: 'self';";
}

/**
 * Generate resource hints for better loading
 */
export function generateResourceHints(): string {
  return `
<!-- Resource Hints -->
<link rel="dns-prefetch" href="https://cdn.phithiai.com" />
<link rel="preconnect" href="https://api.phithiai.com" crossorigin />
<link rel="dns-prefetch" href="https://cdn.phithiai.com" crossorigin />
<link rel="dns-prefetch" href="https://fonts.googleapis.com" />
`;
}

/**
 * Optimize third-party script loading
 */
export function getScriptLoadingStrategy(scriptType: 'critical' | 'defer' | 'async'): {
  loading: string;
  defer?: boolean;
  async?: boolean;
} {
  const strategies = {
    critical: { loading: 'eager', defer: false, async: false },
    defer: { loading: 'lazy', defer: true, async: false },
    async: { loading: 'lazy', defer: false, async: true }
  };

  return strategies[scriptType];
}

/**
 * Generate service worker registration for caching
 */
export function getServiceWorkerRegistration(): string {
  return `
<!-- Service Worker for Offline Support -->
<script>
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          console.log('ServiceWorker registered:', registration);
        })
        .catch(error => {
          console.error('ServiceWorker registration failed:', error);
        });
    });
  }
</script>
`;
}

/**
 * Generate cache headers for static assets
 */
export interface CacheHeaders {
  'Cache-Control': string;
  'CDN-Cache-Control'?: string;
}

export function getCacheHeaders(maxAge: number = 31536000): CacheHeaders {
  return {
    'Cache-Control': `public, max-age=${maxAge}, immutable`,
    'CDN-Cache-Control': `public, max-age=${maxAge}, s-maxage=${maxAge * 2}, immutable`
  };
}

/**
 * Get LCP measurement utility
 */
export function measureLCP(): Promise<number> {
  return new Promise((resolve) => {
    if (!('PerformanceObserver' in window)) {
      resolve(0);
      return;
    }

    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lcpEntry = entries.find(entry => entry.entryType === 'largest-contentful-paint');
      
      if (lcpEntry) {
        resolve(lcpEntry.startTime);
      }
    });

    observer.observe({ type: 'paint', buffered: true });
    
    // Timeout after 5 seconds
    setTimeout(() => {
      observer.disconnect();
      resolve(0);
    }, 5000);
  });
}

/**
 * Generate LCP optimization report
 */
export interface LCPOptimizationReport {
  lcp: number;
  target: number;
  status: 'good' | 'needs-improvement' | 'poor';
  recommendations: string[];
}

export function generateLCPOptimizationReport(lcp: number): LCPOptimizationReport {
  const target = 2500; // 2.5s in ms
  
  let status: LCPOptimizationReport['status'];
  let recommendations: string[] = [];

  if (lcp <= target) {
    status = 'good';
    recommendations = [
      'LCP is within target range',
      'Consider using WebP format for images',
      'Monitor LCP regularly'
    ];
  } else if (lcp <= target * 1.5) {
    status = 'needs-improvement';
    recommendations = [
      'Optimize above-the-fold images',
      'Use responsive images with srcset',
      'Consider lazy loading for below-fold images',
      'Minimize render-blocking resources',
      'Use font-display: swap for faster text rendering'
    ];
  } else {
    status = 'poor';
    recommendations = [
      'Critical: LCP is significantly above target',
      'Compress all images',
      'Use CDN for static assets',
      'Implement code splitting',
      'Remove unused CSS and JavaScript',
      'Use HTTP/2 or HTTP/3',
      'Consider server-side rendering for dynamic content'
    ];
  }

  return {
    lcp,
    target,
    status,
    recommendations
  };
}

/**
 * Generate critical resource list for preloading
 */
export function getCriticalResources(): {
  images: string[];
  fonts: string[];
  scripts: string[];
} {
  return {
    images: [
      '/images/hero-bg.webp',
      '/images/vendor-placeholder.webp',
      '/images/wedding-ceremony.webp'
    ],
    fonts: [
      '/fonts/primary.woff2',
      '/fonts/thai.woff2'
    ],
    scripts: [
      '/js/critical.js'
    ]
  };
}

/**
 * WebP/AVIF format detection and fallback
 */
export function getSupportedImageFormat(): 'webp' | 'avif' | 'jpeg' {
  const canvas = document.createElement('canvas');  
  
  if (canvas.toDataURL('image/avif').indexOf('data:image/avif') === 0) {
    return 'avif';
  }
  
  if (canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0) {
    return 'webp';
  }
  
  return 'jpeg';
}

/**
 * Generate picture element with format fallbacks
 */
export function generatePictureElement(
  webpSrc: string,
  alt: string,
  avifSrc?: string,
  jpegSrc?: string,
  className?: string
): string {
  const supportedFormat = getSupportedImageFormat();
  
  const sources = [];
  
  if (supportedFormat === 'avif' && avifSrc) {
    sources.push(`<source srcset="${avifSrc}" type="image/avif">`);
  }
  
  if (supportedFormat === 'webp' || supportedFormat === 'avif') {
    sources.push(`<source srcset="${webpSrc}" type="image/webp">`);
  }
  
  if (jpegSrc) {
    sources.push(`<img src="${jpegSrc}" alt="${alt}" ${className ? `class="${className}"` : ''} loading="lazy" decoding="async">`);
  }
  
  return `<picture>${sources.join('')}</picture>`;
}

/**
 * Get viewport meta tags for mobile optimization
 */
export function getViewportMetaTags(): string {
  return `
<!-- Viewport Optimization -->
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="preconnect" href="https://fonts.googleapis.com">
`;
}

/**
 * Generate critical inlined CSS for hero section
 */
export function getInlineCriticalCSS(): string {
  return `
<style>
/* Critical CSS - Inlined for LCP Optimization */
.critical-hero {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.critical-hero-title {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-size: clamp(2rem, 5vw, 4rem);
  font-weight: 700;
  color: white;
  margin-bottom: 1rem;
  line-height: 1.2;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.critical-cta {
  background: white;
  color: #9333ea;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  box-shadow: 0.4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
}

.critical-cta:hover {
  transform: translateY(-2px);
  box-shadow: 0.6px 16px rgba(0, 0, 0, 0.15);
}

/* Prevent layout shift */
.critical-image-container {
  aspect-ratio: 16/9;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  background-size: cover;
  background-position: center;
}
</style>
`;
}
