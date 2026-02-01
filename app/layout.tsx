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
  metadataBase: new URL('https://www.assetstoolshub.com'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
    },
  },
  title: {
    default: 'Assets Tools Hub | 170+ Free Professional Online Tools',
    template: '%s | Assets Tools Hub'
  },
  description: 'Assets Tools Hub offers 170+ free professional web tools for gamers, developers, and creators. Boost gaming performance with CPS tests and aim trainers, or streamline development with JSON formatters and regex testers. No signup required.',
  keywords: ['Assets Tools Hub', 'online tools', 'free tools', 'cps test', 'gaming tools', 'developer tools', 'productivity tools', 'mouse sensitivity converter', 'json formatter', 'regex tester', 'aim trainer', 'reaction time test', 'text tools', 'unit converters', 'seo tools', 'image tools', 'finance calculators'],
  authors: [{ name: 'Assets Tools Hub' }],
  creator: 'Assets Tools Hub',
  publisher: 'Assets Tools Hub',
  category: 'technology',
  classification: 'Free Online Tools Portfolio',
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.assetstoolshub.com',
    title: 'Assets Tools Hub - 170+ Free Professional Online Tools',
    description: 'The ultimate professional toolkit for gaming performance, web development, and productivity. Free forever, no registration required.',
    images: [{
      url: '/og-image.png',
      width: 1200,
      height: 630,
      alt: 'Assets Tools Hub - Free Online Tools Portfolio',
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

import { CookieConsent } from '@/components/ui/CookieConsent';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Assets Tools Hub",
              "url": "https://www.assetstoolshub.com",
              "description": "170+ professional free online tools for gaming, development, and productivity.",
              "potentialAction": {
                "@type": "SearchAction",
                "target": {
                  "@type": "EntryPoint",
                  "urlTemplate": "https://www.assetstoolshub.com/explore?q={search_term_string}"
                },
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Assets Tools Hub",
              "url": "https://www.assetstoolshub.com",
              "logo": "https://www.assetstoolshub.com/logo.svg",
              "sameAs": [
                "https://twitter.com/assetstoolshub",
                "https://facebook.com/assetstoolshub"
              ]
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "SiteNavigationElement",
                  "name": "Tools",
                  "url": "https://www.assetstoolshub.com/explore"
                },
                {
                  "@type": "SiteNavigationElement",
                  "name": "Join Pro",
                  "url": "https://www.assetstoolshub.com/pro"
                },
                {
                  "@type": "SiteNavigationElement",
                  "name": "Blog",
                  "url": "https://www.assetstoolshub.com/blog"
                }
              ]
            })
          }}
        />
      </head>
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
              <CookieConsent />
            </ScrollProvider>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
