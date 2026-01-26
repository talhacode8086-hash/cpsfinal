'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { History } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function RomanNumeralConverter() {
    const [num, setNum] = useState('2024');
    const [roman, setRoman] = useState('MMXXIV');

    const toRoman = (n: number): string => {
        if (n <= 0 || n > 3999) return 'Invalid';
        const map: Record<string, number> = {
            M: 1000, CM: 900, D: 500, CD: 400, C: 100, XC: 90, L: 50, XL: 40, X: 10, IX: 9, V: 5, IV: 4, I: 1
        };
        let res = '';
        for (let k in map) {
            while (n >= map[k]) {
                res += k;
                n -= map[k];
            }
        }
        return res;
    };

    const fromRoman = (s: string): number => {
        const map: Record<string, number> = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
        let res = 0;
        s = s.toUpperCase();
        for (let i = 0; i < s.length; i++) {
            const current = map[s[i]];
            const next = map[s[i + 1]];
            if (next && current < next) {
                res += (next - current);
                i++;
            } else {
                res += current;
            }
        }
        return res || 0;
    };

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <History className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Roman Numeral Converter</CardTitle>
                <p className="text-muted-foreground mt-2">Translate between modern numbers and the classic Roman system.</p>
            </CardHeader>
            <CardContent className="p-8 space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="p-10 rounded-[3rem] bg-muted/10 border-2 border-primary/5 space-y-4">
                        <label className="text-[10px] font-black uppercase tracking-widest text-primary">Standard Number</label>
                        <Input
                            value={num}
                            type="number"
                            onChange={(e) => {
                                setNum(e.target.value);
                                setRoman(toRoman(parseInt(e.target.value)));
                            }}
                            className="h-16 rounded-2xl bg-background border-primary/10 text-3xl font-black"
                        />
                    </div>
                    <div className="p-10 rounded-[3rem] bg-primary text-white shadow-xl shadow-primary/20 space-y-4">
                        <label className="text-[10px] font-black uppercase tracking-widest opacity-70">Roman Numerals</label>
                        <Input
                            value={roman}
                            onChange={(e) => {
                                setRoman(e.target.value.toUpperCase());
                                setNum(fromRoman(e.target.value).toString());
                            }}
                            className="h-16 rounded-2xl bg-white/10 border-white/20 text-3xl font-black text-white"
                        />
                    </div>
                </div>

                <div className="flex justify-center gap-2">
                    {['X', 'L', 'C', 'D', 'M'].map(token => (
                        <div key={token} className="w-12 h-12 bg-muted/30 rounded-xl flex items-center justify-center font-black text-primary/40 border border-primary/5">
                            {token}
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
