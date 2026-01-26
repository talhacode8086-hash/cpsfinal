'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dice5, Play, History } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function DiceRoller() {
    const [dice, setDice] = useState<number[]>([1]);
    const [history, setHistory] = useState<number[][]>([]);
    const [isRolling, setIsRolling] = useState(false);
    const [diceCount, setDiceCount] = useState(1);

    const rollDice = () => {
        setIsRolling(true);
        setTimeout(() => {
            const results = Array.from({ length: diceCount }).map(() => Math.floor(Math.random() * 6) + 1);
            setDice(results);
            setHistory([results, ...history].slice(0, 10));
            setIsRolling(false);
        }, 600);
    };

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm overflow-hidden text-center">
            <CardHeader className="border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Dice5 className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">3D Dice Roller</CardTitle>
                <p className="text-muted-foreground mt-2">Roll for initiative or settle a board game dispute.</p>
            </CardHeader>
            <CardContent className="p-12 space-y-12">
                <div className="flex justify-center gap-6 mb-8">
                    {[1, 2, 3, 4, 5].map(num => (
                        <Button
                            key={num}
                            variant={diceCount === num ? "default" : "outline"}
                            className="h-12 w-12 rounded-xl font-bold"
                            onClick={() => setDiceCount(num)}
                        >
                            {num}
                        </Button>
                    ))}
                </div>

                <div className="flex flex-wrap justify-center gap-8 min-h-[160px]">
                    {dice.map((value, idx) => (
                        <div
                            key={idx}
                            className={`w-32 h-32 bg-background border-4 border-primary/20 rounded-[2rem] flex items-center justify-center text-6xl font-black shadow-2xl transition-all duration-500 scale-100 ${isRolling ? 'animate-bounce blur-[2px] rotate-[360deg] scale-90 opacity-50' : ''
                                }`}
                        >
                            {value}
                            {/* Simple Dot Patterns could be added for realism */}
                        </div>
                    ))}
                </div>

                <div className="flex flex-col items-center gap-6">
                    <Button
                        size="lg"
                        onClick={rollDice}
                        className="h-20 px-16 rounded-[2.5rem] text-2xl font-black shadow-2xl shadow-primary/20"
                        disabled={isRolling}
                    >
                        <Play className="mr-4 h-8 w-8 fill-current" />
                        ROLL DICE
                    </Button>

                    <div className="w-full max-w-md space-y-4">
                        <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-primary opacity-50">
                            <span>Last 10 Rolls</span>
                            <History className="h-4 w-4" />
                        </div>
                        <div className="flex flex-wrap gap-2 justify-center">
                            {history.map((roll, i) => (
                                <div key={i} className="px-3 py-1 bg-muted/20 border border-primary/5 rounded-full text-xs font-bold">
                                    {roll.join(' + ')} = {roll.reduce((a, b) => a + b, 0)}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
