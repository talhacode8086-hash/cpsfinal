'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Languages, Search, RefreshCw, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function AnagramSolver() {
    const [input, setInput] = useState('');
    const [results, setResults] = useState<string[]>([]);
    const [isSolving, setIsSolving] = useState(false);

    // Mock dictionary for demonstration - in real app would use a word list API or static file
    const dictionary = ['apple', 'pale', 'leap', 'peal', 'listen', 'silent', 'nets', 'sent', 'tens', 'nest', 'react', 'trace', 'cater'];

    const solve = async () => {
        setIsSolving(true);
        const chars = input.toLowerCase().split('').sort().join('');

        // Simulating search
        setTimeout(() => {
            const matches = dictionary.filter(w => w.split('').sort().join('') === chars);
            setResults(matches);
            setIsSolving(false);
        }, 500);
    };

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm overflow-hidden text-center">
            <CardHeader className="border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Languages className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Anagram Solver</CardTitle>
                <p className="text-muted-foreground mt-2">Unscramble letters and find hidden words instantly.</p>
            </CardHeader>
            <CardContent className="p-12 space-y-12">
                <div className="max-w-md mx-auto space-y-6">
                    <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Enter scrambled letters..."
                        className="h-20 text-4xl font-black text-center rounded-[2.5rem] bg-muted/20 border-primary/10 uppercase tracking-widest"
                    />
                    <Button
                        size="lg"
                        onClick={solve}
                        className="h-16 w-full rounded-2xl text-xl font-black shadow-2xl shadow-primary/20"
                        disabled={isSolving || !input}
                    >
                        {isSolving ? <RefreshCw className="mr-2 animate-spin" /> : <Search className="mr-2" />}
                        SOLVE ANAGRAM
                    </Button>
                </div>

                <div className="space-y-6">
                    <div className="flex items-center gap-4 text-[10px] font-black uppercase text-primary opacity-50">
                        <Layers className="h-4 w-4" />
                        <span>Possible Matches</span>
                        <div className="flex-1 h-px bg-primary/5" />
                    </div>

                    <div className="flex flex-wrap justify-center gap-4">
                        {results.length > 0 ? (
                            results.map((word, i) => (
                                <div key={i} className="px-8 py-4 bg-background border-2 border-primary rounded-2xl text-2xl font-black shadow-lg animate-in slide-in-from-bottom-2 duration-300">
                                    {word.toUpperCase()}
                                </div>
                            ))
                        ) : (
                            !isSolving && input && (
                                <div className="text-muted-foreground font-bold italic">No words found in our demo dictionary.</div>
                            )
                        )}
                    </div>
                </div>

                <div className="p-8 rounded-[3rem] bg-muted/10 border border-primary/5 text-xs text-muted-foreground leading-relaxed">
                    <p>Sample words to try: <strong>silent</strong>, <strong>listen</strong>, <strong>pale</strong>, <strong>trace</strong>, <strong>apple</strong>.</p>
                </div>
            </CardContent>
        </Card>
    );
}
