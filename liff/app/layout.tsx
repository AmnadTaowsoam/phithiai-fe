import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Phithiai LIFF',
  description: 'LINE LIFF companion experience for Phithiai',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      <body style={{ margin: 0, fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif' }}>
        {children}
      </body>
    </html>
  );
}

