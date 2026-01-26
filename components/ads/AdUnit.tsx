'use client';

import { useEffect, useRef } from 'react';

interface AdUnitProps {
    publisherId: string;
    slotId: string;
    format?: 'auto' | 'fluid' | 'rectangle';
    style?: React.CSSProperties;
    className?: string;
}

export default function AdUnit({ publisherId, slotId, format = 'auto', style, className }: AdUnitProps) {
    const adRef = useRef<HTMLModElement>(null);

    useEffect(() => {
        const loadAd = () => {
            try {
                if (adRef.current && adRef.current.offsetWidth > 0) {
                    // @ts-ignore
                    (window.adsbygoogle = window.adsbygoogle || []).push({});
                } else {
                    // Retry after a short delay if width is still 0
                    setTimeout(loadAd, 500);
                }
            } catch (err) {
                console.error('AdSense error:', err);
            }
        };

        // Small initial delay to allow layout to stabilize
        const timer = setTimeout(loadAd, 200);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className={className} style={style}>
            <ins
                className="adsbygoogle"
                style={{ display: 'block', ...style }}
                data-ad-client={publisherId}
                data-ad-slot={slotId}
                data-ad-format={format}
                data-full-width-responsive="true"
                ref={adRef}
            />
        </div>
    );
}
