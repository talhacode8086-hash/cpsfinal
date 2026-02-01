import React from 'react';
import { Metadata } from 'next';
import ContactClient from '@/components/contact/ContactClient';

export const metadata: Metadata = {
    title: 'Contact Us | Assets Tools Hub',
    description: 'Get in touch with the Assets Tools Hub team. Send us your feedback, feature suggestions, or bug reports.',
};

export default function ContactPage() {
    return <ContactClient />;
}
