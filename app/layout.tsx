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
    default: 'Assets Tools Hub - Free Online Tools for Gaming, Dev & Productivity',
    template: '%s | Assets Tools Hub'
  },
  description: 'Free online tools including CPS test, mouse accuracy trainer, JSON formatter, color converters, and 100+ productivity tools. No registration required.',
  keywords: ['online tools', 'free tools', 'cps test', 'gaming tools', 'developer tools', 'productivity tools', 'text tools', 'unit converters'],
  authors: [{ name: 'Assets Tools Hub' }],
  creator: 'Assets Tools Hub',
  publisher: 'Assets Tools Hub',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://assetstoolshub.com',
    title: 'Assets Tools Hub - Free Online Tools',
    description: 'Free online tools for gaming, development, and productivity',
    siteName: 'Assets Tools Hub',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Assets Tools Hub - Free Online Tools',
    description: 'Free online tools for gaming, development, and productivity',
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
