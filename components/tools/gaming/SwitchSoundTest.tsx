'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Volume2, Music, Keyboard } from 'lucide-react';

export default function SwitchSoundTest() {
    const [activeSwitch, setActiveSwitch] = useState('blue');

    const switches = [
        { id: 'blue', name: 'Clicky Blue', color: 'bg-blue-600', description: 'Tactile and loud, unmistakable click sound.' },
        { id: 'red', name: 'Linear Red', color: 'bg-red-600', description: 'Smooth travel, quiet, preferred for fast gaming.' },
        { id: 'brown', name: 'Tactile Brown', color: 'bg-amber-800', description: 'Small bump but quiet, great all-rounder.' },
        { id: 'silver', name: 'Speed Silver', color: 'bg-zinc-400', description: 'Extremely fast actuation, low resistance.' }
    ];

    const playSound = () => {
        // In a real app, we would play small audio files here.
        // For this demo, we can use the Web Audio API or just simulate.
        console.log(`Playing ${activeSwitch} switch sound`);
    };

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {switches.map(sw => (
                    <button
                        key={sw.id}
                        onClick={() => setActiveSwitch(sw.id)}
                        className={`p-6 rounded-3xl border-2 transition-all text-left relative overflow-hidden group ${activeSwitch === sw.id ? 'border-primary ring-4 ring-primary/10 bg-primary/5' : 'border-muted hover:border-muted-foreground/30'}`}
                    >
                        <div className={`h-12 w-12 rounded-2xl ${sw.color} shadow-lg mb-4 flex items-center justify-center text-white`}>
                            <div className="w-4 h-4 rounded-sm border-2 border-white/40" />
                        </div>
                        <h3 className="font-black uppercase text-xs tracking-tighter mb-1">{sw.name}</h3>
                        <p className="text-[10px] text-muted-foreground line-clamp-2 leading-tight">{sw.description}</p>
                        {activeSwitch === sw.id && (
                            <div className="absolute top-2 right-2">
                                <Volume2 className="h-4 w-4 text-primary animate-pulse" />
                            </div>
                        )}
                    </button>
                ))}
            </div>

            <Card className="border-zinc-950 dark:border-white bg-zinc-950 text-white rounded-[3rem] overflow-hidden shadow-2xl">
                <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row h-[350px]">
                        <div className="flex-1 p-12 flex flex-col justify-center gap-6">
                            <div className="space-y-2">
                                <div className="text-xs font-black uppercase tracking-[0.3em] text-primary">Acoustic Preview</div>
                                <h2 className="text-4xl font-black">Simulation Mode</h2>
                                <p className="text-zinc-500 max-w-[300px]">Experience the auditory signature of premium mechanical switches before you buy.</p>
                            </div>
                            <Button size="lg" className="w-fit rounded-full px-8 h-12" onMouseDown={playSound}>
                                <Music className="mr-2 h-4 w-4" /> PLAY SOUND
                            </Button>
                        </div>
                        <div className="flex-1 bg-gradient-to-br from-zinc-900 to-black relative flex items-center justify-center p-8 group">
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
                            <div className={`w-32 h-32 rounded-[2rem] flex items-center justify-center ring-8 ring-white/5 shadow-2xl transition-all duration-500 scale-110 group-active:scale-95 ${switches.find(s => s.id === activeSwitch)?.color}`}>
                                <Keyboard className="h-12 w-12 text-white/50" />
                            </div>
                            <div className="absolute bottom-8 text-center">
                                <span className="text-[10px] font-bold uppercase tracking-widest opacity-50">Press and hold to test</span>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="bg-muted p-6 rounded-2xl flex gap-4 items-center border border-muted-foreground/10">
                <div className="h-10 w-10 rounded-full bg-background flex items-center justify-center shadow-sm">
                    <Volume2 className="h-5 w-5 text-muted-foreground" />
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                    Note: This is a digital simulation. Actual sounds vary based on keycap material (PBT/ABS), case mounting (Gasket/Tray), and desk mat thickness.
                </p>
            </div>
        </div>
    );
}
