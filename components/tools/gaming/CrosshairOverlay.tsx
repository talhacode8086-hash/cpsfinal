'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Crosshair } from 'lucide-react';

export default function CrosshairOverlay() {
    const [size, setSize] = useState(10);
    const [thickness, setThickness] = useState(2);
    const [gap, setGap] = useState(4);
    const [color, setColor] = useState('#00ff00');
    const [dot, setDot] = useState(false);

    return (
        <div className="space-y-8 max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div
                    className="h-[500px] bg-zinc-950 dark:bg-black rounded-[3rem] shadow-2xl relative flex items-center justify-center overflow-hidden border-8 border-zinc-900"
                    style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '40px 40px' }}
                >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

                    {/* The Crosshair */}
                    <div className="relative flex items-center justify-center pointer-events-none">
                        {dot && (
                            <div
                                className="absolute rounded-full"
                                style={{ width: `${thickness}px`, height: `${thickness}px`, backgroundColor: color }}
                            />
                        )}
                        {/* Top */}
                        <div
                            className="absolute"
                            style={{
                                width: `${thickness}px`,
                                height: `${size}px`,
                                backgroundColor: color,
                                top: `calc(-${size}px - ${gap}px)`
                            }}
                        />
                        {/* Bottom */}
                        <div
                            className="absolute"
                            style={{
                                width: `${thickness}px`,
                                height: `${size}px`,
                                backgroundColor: color,
                                bottom: `calc(-${size}px - ${gap}px)`
                            }}
                        />
                        {/* Left */}
                        <div
                            className="absolute"
                            style={{
                                height: `${thickness}px`,
                                width: `${size}px`,
                                backgroundColor: color,
                                left: `calc(-${size}px - ${gap}px)`
                            }}
                        />
                        {/* Right */}
                        <div
                            className="absolute"
                            style={{
                                height: `${thickness}px`,
                                width: `${size}px`,
                                backgroundColor: color,
                                right: `calc(-${size}px - ${gap}px)`
                            }}
                        />
                    </div>

                    <div className="absolute bottom-10 left-10 p-4 bg-zinc-900/80 backdrop-blur-xl rounded-2xl border border-white/5 text-white/40 text-[10px] font-bold uppercase tracking-widest">
                        Preview Engine v2.4
                    </div>
                </div>

                <div className="space-y-8 py-4">
                    <div className="space-y-2">
                        <h2 className="text-4xl font-black tracking-tighter">CROSSHAIR DESIGNER</h2>
                        <p className="text-muted-foreground">Customize your perfect reticle for any game engine.</p>
                    </div>

                    <Card className="border-none bg-muted/30 rounded-[2rem]">
                        <CardContent className="p-8 space-y-6">
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <label className="text-sm font-black uppercase text-muted-foreground tracking-widest">Size</label>
                                    <span className="text-primary font-bold">{size}</span>
                                </div>
                                <input type="range" min="1" max="50" value={size} onChange={(e) => setSize(parseInt(e.target.value))} className="w-full" />
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <label className="text-sm font-black uppercase text-muted-foreground tracking-widest">Thickness</label>
                                    <span className="text-primary font-bold">{thickness}</span>
                                </div>
                                <input type="range" min="1" max="10" value={thickness} onChange={(e) => setThickness(parseInt(e.target.value))} className="w-full" />
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <label className="text-sm font-black uppercase text-muted-foreground tracking-widest">Gap</label>
                                    <span className="text-primary font-bold">{gap}</span>
                                </div>
                                <input type="range" min="-10" max="20" value={gap} onChange={(e) => setGap(parseInt(e.target.value))} className="w-full" />
                            </div>

                            <div className="flex items-center justify-between p-4 bg-background/50 rounded-2xl border border-muted">
                                <div className="flex items-center gap-2">
                                    <input type="checkbox" checked={dot} onChange={(e) => setDot(e.target.checked)} className="h-4 w-4 rounded border-muted" />
                                    <span className="text-sm font-bold uppercase">Center Dot</span>
                                </div>
                                <div className="flex gap-2">
                                    {['#00ff00', '#ff0000', '#00ffff', '#ffffff', '#ffff00'].map(c => (
                                        <button key={c} onClick={() => setColor(c)} className={`h-6 w-6 rounded-full border-2 ${color === c ? 'border-white ring-2 ring-primary/20' : 'border-transparent'}`} style={{ backgroundColor: c }} />
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Button className="w-full h-16 rounded-2xl text-lg font-bold shadow-xl shadow-primary/20">
                        GENERATE CFG CODE
                    </Button>
                </div>
            </div>
        </div>
    );
}
