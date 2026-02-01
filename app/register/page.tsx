'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
    const router = useRouter();

    useEffect(() => {
        router.replace('/auth');
    }, [router]);

    return (
        <div className="min-h-screen bg-black flex items-center justify-center text-white">
            <div className="animate-pulse font-black uppercase tracking-[0.3em] text-sm opacity-50">
                Redirecting to Auth Portal...
            </div>
        </div>
    );
}
