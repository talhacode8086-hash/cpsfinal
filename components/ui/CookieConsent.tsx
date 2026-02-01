'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Cookie, X } from 'lucide-react';

export function CookieConsent() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookie-consent');
        if (!consent) {
            const timer = setTimeout(() => {
                setIsVisible(true);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookie-consent', 'accepted');
        setIsVisible(false);
    };

    const handleDecline = () => {
        localStorage.setItem('cookie-consent', 'declined');
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    className="fixed bottom-6 left-6 right-6 md:left-auto md:right-10 md:max-w-md z-[100]"
                >
                    <div className="bg-background/80 backdrop-blur-2xl border border-primary/20 p-6 rounded-[2rem] shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-1.5 h-full bg-primary" />
                        <div className="flex items-start gap-4 relative z-10">
                            <div className="bg-primary/10 p-3 rounded-2xl shrink-0">
                                <Cookie className="h-6 w-6 text-primary" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="font-bold text-lg">Cookie Notice</h3>
                                <p className="text-muted-foreground text-sm leading-relaxed">
                                    We value your privacy. We use cookies to improve your browsing experience and analyze our traffic. No data is sold to third parties.
                                </p>
                                <div className="flex items-center gap-3 pt-4">
                                    <Button onClick={handleAccept} className="rounded-xl px-6 font-bold h-11 bg-primary hover:scale-105 transition-transform">
                                        Accept
                                    </Button>
                                    <Button onClick={handleDecline} variant="outline" className="rounded-xl px-6 font-bold h-11 border-2 hover:bg-secondary/50">
                                        Decline
                                    </Button>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsVisible(false)}
                                className="absolute -top-1 -right-1 p-2 text-muted-foreground hover:text-foreground transition-colors"
                                aria-label="Close"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
