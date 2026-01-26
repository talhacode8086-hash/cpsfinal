'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Quote, RefreshCw, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function QuoteGenerator() {
    const quotes = [
        { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
        { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
        { text: "Everything you've ever wanted is on the other side of fear.", author: "George Addair" },
        { text: "Your time is limited, so don't waste it living someone else's life.", author: "Steve Jobs" },
        { text: "Logic will get you from A to B. Imagination will take you everywhere.", author: "Albert Einstein" },
        { text: "The best way to predict the future is to invent it.", author: "Alan Kay" },
        { text: "Code is like humor. When you have to explain it, it’s bad.", author: "Cory House" },
        { text: "Simplicity is the soul of efficiency.", author: "Austin Freeman" }
    ];

    const [quote, setQuote] = useState(quotes[0]);
    const [copied, setCopied] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const getNewQuote = () => {
        setIsRefreshing(true);
        setTimeout(() => {
            const next = quotes[Math.floor(Math.random() * quotes.length)];
            setQuote(next);
            setIsRefreshing(false);
        }, 500);
    };

    const copy = () => {
        navigator.clipboard.writeText(`"${quote.text}" - ${quote.author}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm overflow-hidden text-center">
            <CardHeader className="border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Quote className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Random Inspiration Geneator</CardTitle>
                <p className="text-muted-foreground mt-2">Daily wisdom to keep you motivated and creative.</p>
            </CardHeader>
            <CardContent className="p-16 space-y-12">
                <div className={`space-y-8 transition-all duration-500 ${isRefreshing ? 'opacity-0 scale-95 blur-sm' : 'opacity-100 scale-100 blur-0'}`}>
                    <Quote className="h-16 w-16 text-primary/10 mx-auto" />
                    <h2 className="text-4xl md:text-5xl font-black italic leading-[1.2] text-primary">
                        &quot;{quote.text}&quot;
                    </h2>
                    <p className="text-xl font-bold opacity-50">— {quote.author}</p>
                </div>

                <div className="flex justify-center gap-4 pt-8">
                    <Button
                        size="lg"
                        onClick={getNewQuote}
                        className="h-20 px-12 rounded-3xl text-xl font-black shadow-2xl shadow-primary/20"
                        disabled={isRefreshing}
                    >
                        <RefreshCw className={`mr-2 h-6 w-6 ${isRefreshing ? 'animate-spin' : ''}`} />
                        New Quote
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={copy}
                        className="h-20 w-20 rounded-3xl border-2 border-primary/10"
                    >
                        {copied ? <Check className="h-8 w-8 text-green-500" /> : <Copy className="h-8 w-8" />}
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
