import React from 'react';
import { Metadata } from 'next';
import TermsOfServiceClient from '@/components/legal/TermsOfServiceClient';

export const metadata: Metadata = {
    title: 'Terms of Service | Assets Tools Hub',
    description: 'The terms and conditions for using the Assets Tools Hub platform. We keep our terms simple and transparent.',
};

export default function TermsOfService() {
    return <TermsOfServiceClient />;
}
