'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, CheckCircle2, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function SpatialMemoryBench() {
    const [state, setState] = useState<'idle' | 'showing' | 'playing' | 'result' | 'fail'>('idle');
    const [level, setLevel] = useState(3);
    const [targets, setTargets] = useState<{ x: number, y: number, id: number }[]>([]);
    const [sequence, setSequence] = useState<number[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);

    const startGame = () => {
        setState('showing');
        generateTargets();
    };

    const generateTargets = () => {
        const newTargets = [];
        for (let i = 0; i < level; i++) {
            newTargets.push({
                x: Math.random() * 80 + 10,
                y: Math.random() * 80 + 10,
                id: i
            });
        }
        setTargets(newTargets);
        setSequence([]);

        setTimeout(() => {
            setState('playing');
        }, 2000); // Show for 2 seconds
    };

    const handleTargetClick = (id: number) => {
        if (state !== 'playing' || sequence.includes(id)) return;

        const nextId = sequence.length;
        if (id === nextId) {
            const nextSeq = [...sequence, id];
            setSequence(nextSeq);
            if (nextSeq.length === level) {
                setLevel(l => l + 1);
                setState('result');
            }
        } else {
            setState('fail');
        }
    };

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Brain className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Spatial Memory Bench</CardTitle>
                <p className="text-muted-foreground mt-2">Test your ability to remember and recall target positions.</p>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
                <div className="flex justify-between items-center bg-muted/30 p-4 rounded-2xl border border-primary/5 font-bold">
                    <span>Current Level: {level - 2}</span>
                    <span>Targets to Recall: {level}</span>
                </div>

                <div
                    ref={containerRef}
                    className="relative w-full h-[500px] bg-muted/10 rounded-[2.5rem] border-2 border-primary/10 overflow-hidden"
                >
                    {state === 'idle' && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/40 backdrop-blur-sm z-10">
                            <Button size="lg" className="rounded-2xl h-14 px-10 text-lg font-bold" onClick={startGame}>
                                Start Memory Test
                            </Button>
                        </div>
                    )}

                    {(state === 'showing' || state === 'playing') && targets.map(t => (
                        <div
                            key={t.id}
                            className={`absolute w-12 h-12 rounded-2xl flex items-center justify-center cursor-pointer transition-all duration-300 font-black text-xl shadow-lg ${state === 'showing' ? 'bg-primary text-white' :
                                    sequence.includes(t.id) ? 'bg-green-500 text-white' : 'bg-muted border border-primary/10 hover:border-primary'
                                }`}
                            style={{ left: `${t.x}%`, top: `${t.y}%`, transform: 'translate(-50%, -50%)' }}
                            onClick={() => handleTargetClick(t.id)}
                        >
                            {(state === 'showing' || sequence.includes(t.id)) ? t.id + 1 : ''}
                        </div>
                    ))}

                    {state === 'result' && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/60 backdrop-blur-md z-10">
                            <CheckCircle2 className="h-16 w-16 text-green-500 mb-4" />
                            <h3 className="text-3xl font-black mb-8">Level Complete!</h3>
                            <Button size="lg" className="rounded-2xl h-14 px-10 text-lg font-bold" onClick={generateTargets}>
                                Next Level
                            </Button>
                        </div>
                    )}

                    {state === 'fail' && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/60 backdrop-blur-md z-10">
                            <XCircle className="h-16 w-16 text-red-500 mb-4" />
                            <h3 className="text-3xl font-black mb-2">Game Over</h3>
                            <p className="mb-8">Reached Level {level - 2}</p>
                            <Button size="lg" className="rounded-2xl h-14 px-10 text-lg font-bold" onClick={() => { setLevel(3); startGame(); }}>
                                Restart
                            </Button>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
