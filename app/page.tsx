import { Metadata } from 'next';
import HomeClient from '@/components/HomeClient';

export const metadata: Metadata = {
  title: 'Assets Tools Hub | 170+ Free Professional Online Tools',
  description: 'Assets Tools Hub offers 170+ free professional web tools for gamers, developers, and creators. Boost gaming performance with CPS tests and aim trainers, or streamline development with JSON formatters and regex testers. No signup required.',
  alternates: {
    canonical: 'https://www.assetstoolshub.com',
  },
  openGraph: {
    title: 'Assets Tools Hub | 170+ Free Professional Online Tools',
    description: 'Discover over 170+ professional tools designed to enhance your gaming performance, boost productivity, and streamline development. Free forever, no signup required.',
    url: 'https://www.assetstoolshub.com',
    siteName: 'Assets Tools Hub',
    images: [
      {
        url: 'https://www.assetstoolshub.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Assets Tools Hub'
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Assets Tools Hub | 170+ Free Online Tools',
    description: 'Professional tools for gamers, developers, and creators. Free forever, no registration required.',
    images: ['https://www.assetstoolshub.com/og-image.png'],
  },
};

export default function Home() {
  return <HomeClient />;
}
