'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Type, Calculator, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function ScrabbleScoreCalc() {
    const [word, setWord] = useState('');

    const scores: Record<string, number> = {
        A: 1, B: 3, C: 3, D: 2, E: 1, F: 4, G: 2, H: 4, I: 1, J: 8, K: 5, L: 1, M: 3, N: 1, O: 1, P: 3, Q: 10, R: 1, S: 1, T: 1, U: 1, V: 4, W: 4, X: 8, Y: 4, Z: 10
    };

    const calculate = (str: string) => {
        return str.toUpperCase().split('').reduce((acc, char) => acc + (scores[char] || 0), 0);
    };

    const score = calculate(word);

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm overflow-hidden text-center">
            <CardHeader className="border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Type className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Scrabble Score Calculator</CardTitle>
                <p className="text-muted-foreground mt-2">Get exact point values for your words with official tile scoring.</p>
            </CardHeader>
            <CardContent className="p-12 space-y-12">
                <div className="space-y-6">
                    <Input
                        value={word}
                        onChange={(e) => setWord(e.target.value.replace(/[^a-zA-Z]/g, ''))}
                        placeholder="ENTER WORD..."
                        className="h-24 text-6xl font-black text-center rounded-[3rem] bg-muted/20 border-primary/10 tracking-[0.2em] placeholder:text-2xl placeholder:tracking-normal"
                    />
                </div>

                <div className="flex flex-wrap justify-center gap-3">
                    {word.split('').map((char, i) => (
                        <div key={i} className="w-16 h-16 bg-amber-100 border-2 border-amber-900/10 rounded-xl flex items-center justify-center relative shadow-md">
                            <span className="text-3xl font-black text-amber-900">{char.toUpperCase()}</span>
                            <span className="absolute bottom-1 right-2 text-[10px] font-black text-amber-900/60">{scores[char.toUpperCase()]}</span>
                        </div>
                    ))}
                </div>

                <div className="p-12 rounded-[4rem] bg-primary text-white shadow-2xl shadow-primary/40 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-10">
                        <Type className="h-24 w-24" />
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-[0.5em] opacity-60 mb-2">Total Points</p>
                    <h3 className="text-8xl font-black">{score}</h3>
                </div>

                <div className="p-8 rounded-[3rem] bg-muted/10 border border-primary/5 flex items-center gap-4 text-left">
                    <Info className="h-6 w-6 text-primary shrink-0" />
                    <p className="text-xs text-muted-foreground leading-relaxed italic">
                        Values are based on the standard English Scrabble tile distribution. Remember to add your Double Word or Triple Letter bonuses manually!
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}
