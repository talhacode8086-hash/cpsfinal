'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { EyeOff, Trophy, AlertCircle, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const TEXTS = [
    "The quick brown fox jumps over the lazy dog.",
    "Pack my box with five dozen liquor jugs.",
    "Programming is the art of telling another human what one wants the computer to do.",
    "Touch typing is a style of typing where you do not look at the keyboard.",
    "Reliability is the most important feature of any system, technical or otherwise."
];

export default function BlindTypingChallenge() {
    const [state, setState] = useState<'idle' | 'playing' | 'result'>('idle');
    const [target, setTarget] = useState("");
    const [input, setInput] = useState("");
    const [startTime, setStartTime] = useState(0);
    const [wpm, setWpm] = useState(0);
    const [accuracy, setAccuracy] = useState(0);

    const startGame = () => {
        const t = TEXTS[Math.floor(Math.random() * TEXTS.length)];
        setTarget(t);
        setInput("");
        setWpm(0);
        setAccuracy(0);
        setState('playing');
        setStartTime(Date.now());
    };

    const handleInput = (val: string) => {
        setInput(val);
        if (val === target) {
            endGame(val);
        }
    };

    const endGame = (finalInput: string) => {
        const endTime = Date.now();
        const durationMin = (endTime - startTime) / 60000;
        const words = target.length / 5;
        const finalWpm = Math.round(words / durationMin);

        let correct = 0;
        for (let i = 0; i < target.length; i++) {
            if (finalInput[i] === target[i]) correct++;
        }
        const finalAcc = Math.round((correct / target.length) * 100);

        setWpm(finalWpm);
        setAccuracy(finalAcc);
        setState('result');
    };

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <EyeOff className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Blind Typing Challenge</CardTitle>
                <p className="text-muted-foreground mt-2">Test your muscle memory. Can you type without seeing the letters?</p>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
                {state === 'idle' && (
                    <div className="text-center py-12 space-y-6">
                        <p className="text-muted-foreground max-w-sm mx-auto">We will show you a sentence. Memorize it, then type it out as fast as possible. Your input will be hidden!</p>
                        <Button size="lg" className="rounded-2xl h-16 px-12 text-xl font-bold" onClick={startGame}>
                            Start Challenge
                        </Button>
                    </div>
                )}

                {state === 'playing' && (
                    <div className="space-y-8 animate-in fade-in duration-500">
                        <div className="p-8 rounded-3xl bg-primary/5 border border-primary/10 text-center">
                            <p className="text-xs font-black uppercase tracking-tighter text-primary mb-4">Memorize This:</p>
                            <p className="text-2xl font-bold italic">"{target}"</p>
                        </div>

                        <div className="relative">
                            <Input
                                autoFocus
                                value={input}
                                onChange={(e) => handleInput(e.target.value)}
                                className="h-24 text-center rounded-[2rem] bg-muted/20 border-2 border-primary/20 text-transparent caret-primary selection:bg-primary/20"
                                autoComplete="off"
                                autoCorrect="off"
                                spellCheck="false"
                            />
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                {input.split('').map((_, i) => (
                                    <div key={i} className="w-3 h-3 bg-primary/40 rounded-full mx-1" />
                                ))}
                                {input.length === 0 && <span className="text-muted-foreground opacity-50 uppercase tracking-[0.3em] font-black">Type blindly now...</span>}
                            </div>
                        </div>

                        <div className="flex justify-center">
                            <Button variant="ghost" onClick={() => setState('idle')}>Reset</Button>
                        </div>
                    </div>
                )}

                {state === 'result' && (
                    <div className="space-y-8 animate-in zoom-in-95">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-8 rounded-[2rem] bg-primary/10 border border-primary/10 text-center">
                                <Trophy className="h-8 w-8 text-primary mx-auto mb-2" />
                                <p className="text-4xl font-black">{wpm} WPM</p>
                                <p className="text-[10px] uppercase font-bold text-primary">Typing Speed</p>
                            </div>
                            <div className="p-8 rounded-[2rem] bg-muted/30 border border-primary/5 text-center">
                                <Activity className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                                <p className="text-4xl font-black">{accuracy}%</p>
                                <p className="text-[10px] uppercase font-bold text-muted-foreground">Accuracy</p>
                            </div>
                        </div>
                        <Button size="lg" className="w-full rounded-2xl h-14" onClick={startGame}>Try New Sentence</Button>
                    </div>
                )}

                <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/10 flex gap-3">
                    <AlertCircle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                    <p className="text-[10px] text-muted-foreground italic">Blind typing builds extreme neural pathways between your fingers and brain, drastically reducing error rates in high-speed environments.</p>
                </div>
            </CardContent>
        </Card>
    );
}
