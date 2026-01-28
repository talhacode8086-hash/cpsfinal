import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Navbar } from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';
import { Footer } from '@/components/layout/Footer';
import ScrollProvider from '@/components/providers/ScrollProvider';
import ScrollProgressBar from '@/components/ui/ScrollProgressBar';
import Script from 'next/script';
import { SidebarProvider } from '@/components/providers/SidebarProvider';
import MainLayout from '@/components/layout/MainLayout';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://assetstoolshub.com'),
  title: {
    default: 'Assets Tools Hub - 170+ Free Online Tools for Gaming, Development & Productivity',
    template: '%s | Assets Tools Hub'
  },
  description: 'Discover 170+ professional free online tools: gaming performance enhancers (CPS test, sensitivity converter, aim trainer), developer utilities (JSON formatter, regex tester), SEO tools, unit converters, and more. No signup required.',
  keywords: ['online tools', 'free tools', 'cps test', 'gaming tools', 'developer tools', 'productivity tools', 'mouse sensitivity converter', 'json formatter', 'regex tester', 'aim trainer', 'reaction time test', 'text tools', 'unit converters', 'seo tools', 'image tools', 'finance calculators'],
  authors: [{ name: 'Assets Tools Hub' }],
  creator: 'Assets Tools Hub',
  publisher: 'Assets Tools Hub',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://assetstoolshub.com',
    title: 'Assets Tools Hub - 170+ Free Professional Online Tools',
    description: 'Professional tools for gaming performance, web development, productivity, and creativity. Free forever, no registration required.',
    images: [{
      url: '/og-image.png',
      width: 1200,
      height: 630,
      alt: 'Assets Tools Hub - Free Online Tools',
    }],
    siteName: 'Assets Tools Hub',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Assets Tools Hub - 170+ Free Online Tools',
    description: 'Professional tools for gamers, developers, and creators. Free forever.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/logo.svg',
    apple: '/logo.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <Script
          id="adsbygoogle-init"
          strategy="afterInteractive"
          crossOrigin="anonymous"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-0000000000000000"
        />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SidebarProvider>
            <ScrollProvider>
              <ScrollProgressBar />
              <MainLayout>
                {children}
              </MainLayout>
            </ScrollProvider>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
