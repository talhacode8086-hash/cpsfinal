import React from 'react';
import { Metadata } from 'next';
import PrivacyPolicyClient from '@/components/legal/PrivacyPolicyClient';

export const metadata: Metadata = {
    title: 'Privacy Policy | Assets Tools Hub',
    description: 'Our commitment to your privacy. Learn how Assets Tools Hub processes data locally in your browser for maximum security.',
};

export default function PrivacyPolicy() {
    return <PrivacyPolicyClient />;
}
