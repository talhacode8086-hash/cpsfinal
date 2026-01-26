'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Circle, RotateCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function CoinFlipper() {
    const [result, setResult] = useState<'HEADS' | 'TAILS' | null>(null);
    const [isFlipping, setIsFlipping] = useState(false);
    const [history, setHistory] = useState<string[]>([]);

    const flip = () => {
        setIsFlipping(true);
        setResult(null);
        setTimeout(() => {
            const side = Math.random() > 0.5 ? 'HEADS' : 'TAILS';
            setResult(side);
            setHistory([side, ...history].slice(0, 20));
            setIsFlipping(false);
        }, 800);
    };

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm overflow-hidden text-center">
            <CardHeader className="border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Circle className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">3D Coin Flipper</CardTitle>
                <p className="text-muted-foreground mt-2">Heads or Tails? Let fate decide with a click.</p>
            </CardHeader>
            <CardContent className="p-12 space-y-12">
                <div className="flex justify-center perspective-[1000px]">
                    <div
                        className={`w-48 h-48 bg-primary text-white rounded-full border-8 border-primary/20 flex flex-col items-center justify-center shadow-3xl transition-all duration-700 ${isFlipping ? 'animate-flip' : ''
                            } ${result === 'TAILS' ? 'bg-amber-500 border-amber-600/20' : ''}`}
                    >
                        <h3 className="text-4xl font-black">
                            {result ? result[0] : '?'}
                        </h3>
                        <span className="text-[10px] font-black uppercase opacity-50 tracking-widest mt-2">
                            {result || 'Flipping...'}
                        </span>
                    </div>
                </div>

                <div className="flex flex-col items-center gap-8">
                    <Button
                        size="lg"
                        onClick={flip}
                        className="h-20 px-16 rounded-[2.5rem] text-2xl font-black shadow-2xl shadow-primary/20"
                        disabled={isFlipping}
                    >
                        <RotateCw className={`mr-4 h-8 w-8 ${isFlipping ? 'animate-spin' : ''}`} />
                        FLIP COIN
                    </Button>

                    <div className="flex flex-wrap justify-center gap-2">
                        {history.map((r, i) => (
                            <div key={i} className={`h-8 w-8 rounded-full border border-primary/10 flex items-center justify-center text-[10px] font-black ${r === 'HEADS' ? 'bg-primary/20 text-primary' : 'bg-amber-500/20 text-amber-600'
                                }`}>
                                {r[0]}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="p-6 rounded-3xl bg-muted/10 border border-primary/5">
                        <p className="text-[10px] font-black uppercase text-primary opacity-50 mb-1">Total Heads</p>
                        <p className="text-3xl font-black">{history.filter(h => h === 'HEADS').length}</p>
                    </div>
                    <div className="p-6 rounded-3xl bg-muted/10 border border-primary/5">
                        <p className="text-[10px] font-black uppercase text-amber-600 opacity-50 mb-1">Total Tails</p>
                        <p className="text-3xl font-black">{history.filter(h => h === 'TAILS').length}</p>
                    </div>
                </div>
            </CardContent>
            <style jsx>{`
                @keyframes flip {
                    0% { transform: rotateY(0) translateY(0); }
                    50% { transform: rotateY(1800deg) translateY(-150px); }
                    100% { transform: rotateY(3600deg) translateY(0); }
                }
                .animate-flip {
                    animation: flip 0.8s ease-in-out;
                }
            `}</style>
        </Card>
    );
}
