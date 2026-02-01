'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Disc, Play, Plus, Trash2, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function WheelOfFortune() {
    const [options, setOptions] = useState(['Lunch', 'Coffee', 'Gym', 'Code', 'Nap']);
    const [inputValue, setInputValue] = useState('');
    const [isSpinning, setIsSpinning] = useState(false);
    const [winner, setWinner] = useState<string | null>(null);
    const [rotation, setRotation] = useState(0);

    const spin = () => {
        if (isSpinning) return;
        setIsSpinning(true);
        setWinner(null);

        const extraSpins = 5 + Math.random() * 5;
        const newRotation = rotation + (extraSpins * 360);
        setRotation(newRotation);

        setTimeout(() => {
            setIsSpinning(false);
            const index = Math.floor(Math.random() * options.length);
            setWinner(options[index]);
        }, 3000);
    };

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm overflow-hidden text-center">
            <CardHeader className="border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Disc className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Decision Wheel</CardTitle>
                <p className="text-muted-foreground mt-2">Can&apos;t decide? Let the modern wheel of fortune choose for you.</p>
            </CardHeader>
            <CardContent className="p-12 space-y-12">
                <div className="flex flex-col md:flex-row gap-12 items-center">
                    <div className="relative w-80 h-80">
                        {/* Pointer */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 z-20">
                            <div className="w-8 h-8 bg-destructive border-4 border-white rounded-full shadow-lg" />
                            <div className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[20px] border-t-destructive mx-auto -mt-1" />
                        </div>

                        {/* Wheel */}
                        <div
                            className="w-full h-full rounded-full border-8 border-primary/20 shadow-3xl overflow-hidden relative transition-transform duration-[3000ms] cubic-bezier(0.1, 0, 0, 1)"
                            style={{ transform: `rotate(${rotation}deg)` }}
                        >
                            {options.map((opt, i) => (
                                <div
                                    key={i}
                                    className="absolute top-0 left-1/2 w-1/2 h-1/2 origin-bottom-left flex items-center justify-center px-4"
                                    style={{
                                        transform: `rotate(${i * (360 / options.length)}deg)`,
                                        backgroundColor: `hsl(${i * (360 / options.length)}, 70%, 50%)`,
                                    }}
                                >
                                    <span className="text-white font-black text-xs -rotate-45 whitespace-nowrap overflow-hidden text-ellipsis max-w-full">
                                        {opt}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Center Hub */}
                        <div className="absolute inset-0 m-auto w-12 h-12 bg-white rounded-full shadow-xl border-4 border-primary/20 z-10 flex items-center justify-center">
                            <div className="w-4 h-4 bg-primary rounded-full animate-pulse" />
                        </div>
                    </div>

                    <div className="flex-1 space-y-6 text-left">
                        <div className="flex gap-2">
                            <Input
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && setOptions([...options, inputValue])}
                                placeholder="Add choice..."
                                className="h-12 rounded-xl"
                            />
                            <Button onClick={() => {
                                if (inputValue) {
                                    setOptions([...options, inputValue]);
                                    setInputValue('');
                                }
                            }}><Plus /></Button>
                        </div>

                        <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto p-4 rounded-2xl bg-muted/10 border border-primary/5">
                            {options.map((opt, i) => (
                                <div key={i} className="px-3 py-1 bg-background border border-primary/10 rounded-full flex items-center gap-2 text-xs font-bold">
                                    {opt}
                                    <button onClick={() => setOptions(options.filter((_, idx) => idx !== i))} className="text-destructive hover:scale-125 transition-transform"><Trash2 className="h-3 w-3" /></button>
                                </div>
                            ))}
                        </div>

                        <Button
                            className="w-full h-20 rounded-[2.5rem] text-2xl font-black shadow-2xl shadow-primary/20"
                            onClick={spin}
                            disabled={isSpinning || options.length < 2}
                        >
                            <Play className="mr-4 h-8 w-8 fill-current" />
                            SPIN NOW
                        </Button>
                    </div>
                </div>

                {winner && (
                    <div className="p-12 rounded-[4rem] bg-gradient-to-br from-primary to-primary/80 text-primary-foreground animate-in zoom-in duration-500 shadow-3xl shadow-primary/40 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <Trophy className="h-12 w-12 mx-auto mb-4 relative z-10" />
                        <p className="text-[10px] font-black uppercase tracking-[0.5em] opacity-80 mb-2 relative z-10">The Winner Is</p>
                        <h2 className="text-6xl font-black uppercase relative z-10 drop-shadow-sm">{winner}</h2>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
