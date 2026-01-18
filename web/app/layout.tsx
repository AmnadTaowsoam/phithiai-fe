import type { Metadata } from 'next';
import { Charm, Inter, Playfair_Display as PlayfairDisplay, Sarabun } from 'next/font/google';
import { ThemeProvider } from '@/components/layout/theme-provider';
import { NavBar } from '@/components/layout/nav-bar';
import { Footer } from '@/components/layout/footer';
import '@/styles/globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const playfair = PlayfairDisplay({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
});

const sarabun = Sarabun({
  subsets: ['latin', 'thai'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-sarabun',
});

const charm = Charm({
  subsets: ['latin', 'thai'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-charm',
});

export const metadata: Metadata = {
  title: 'Phithiai Platform | Curating Thai Ceremonies with Intelligence',
  description:
    'Premium event planning platform that blends Thai tradition with AI precision. Discover trusted vendors, curated experiences, and effortless coordination.',
  keywords: ['Thai ceremonies', 'event planning', 'AI platform', 'Phithiai'],
  icons: {
    icon: '/favicon.ico',
  },
};

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en" suppressHydrationWarning>
    <body className={`${inter.variable} ${playfair.variable} ${sarabun.variable} ${charm.variable} bg-ink-950`}>
      <ThemeProvider defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
        <div className="relative flex min-h-screen flex-col">
          <NavBar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </ThemeProvider>
    </body>
  </html>
);

export default RootLayout;
