'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Eye, AlertCircle, Monitor, Zap, MoveHorizontal } from 'lucide-react';
import { motion } from 'framer-motion';

export default function MotionBlurTest() {
    const [speed, setSpeed] = useState(10);
    const [isActive, setIsActive] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const requestRef = useRef<number>(0);
    const posRef = useRef(0);

    const animate = (time: number) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw moving UFO-like object
        const ufoX = posRef.current % canvas.width;

        // Draw grid for reference
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 1;
        for (let x = 0; x < canvas.width; x += 50) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvas.height);
            ctx.stroke();
        }

        // Draw the Object
        ctx.fillStyle = '#00ff00';
        ctx.shadowBlur = 0;

        // Body
        ctx.beginPath();
        ctx.ellipse(ufoX, 100, 30, 10, 0, 0, Math.PI * 2);
        ctx.fill();

        // Dome
        ctx.fillStyle = '#00ffff';
        ctx.beginPath();
        ctx.arc(ufoX, 95, 10, Math.PI, 0);
        ctx.fill();

        // Eyes/Lights
        ctx.fillStyle = '#fff';
        ctx.fillRect(ufoX - 10, 98, 4, 4);
        ctx.fillRect(ufoX + 6, 98, 4, 4);

        posRef.current += speed;
        requestRef.current = requestAnimationFrame(animate);
    };

    useEffect(() => {
        if (isActive) {
            requestRef.current = requestAnimationFrame(animate);
        } else {
            cancelAnimationFrame(requestRef.current);
        }
        return () => cancelAnimationFrame(requestRef.current);
    }, [isActive, speed]);

    return (
        <div className="mx-auto max-w-5xl space-y-8">
            <div className="grid gap-6 md:grid-cols-4">
                <div className="space-y-4">
                    <Card className="border-primary/10">
                        <CardHeader className="py-4">
                            <CardTitle className="text-xs font-bold uppercase tracking-widest">Test Controls</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <div className="flex justify-between text-[10px] font-bold">
                                    <Label>Velocity</Label>
                                    <span>{speed * 100} px/s</span>
                                </div>
                                <div className="flex gap-2">
                                    {[5, 10, 20].map(s => (
                                        <Button
                                            key={s}
                                            variant={speed === s ? "default" : "outline"}
                                            size="sm"
                                            className="flex-1 rounded-lg"
                                            onClick={() => setSpeed(s)}
                                        >
                                            {s === 5 ? 'Slow' : s === 10 ? 'Med' : 'Fast'}
                                        </Button>
                                    ))}
                                </div>
                            </div>

                            <Button
                                variant={isActive ? "destructive" : "default"}
                                className="w-full h-12 rounded-xl"
                                onClick={() => setIsActive(!isActive)}
                            >
                                {isActive ? "Stop Test" : "Start Test"}
                            </Button>
                        </CardContent>
                    </Card>

                    <div className="p-4 rounded-xl border bg-muted/30 space-y-3">
                        <h4 className="font-bold text-xs uppercase flex items-center gap-2">
                            <AlertCircle className="h-3 w-3 text-primary" />
                            How to test
                        </h4>
                        <p className="text-[10px] text-muted-foreground leading-relaxed">
                            Follow the moving object with your eyes. If you see "shadows" or "trails" behind it,
                            your monitor has significant ghosting or response time issues.
                        </p>
                    </div>
                </div>

                <Card className="md:col-span-3 border-none bg-black overflow-hidden relative min-h-[400px]">
                    <canvas
                        ref={canvasRef}
                        width={800}
                        height={200}
                        className="w-full h-full block"
                    />

                    {!isActive && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-md z-10 text-white gap-4">
                            <Eye className="h-10 w-10 opacity-40" />
                            <p className="font-bold tracking-widest text-xs uppercase">Click Start to begin motion test</p>
                        </div>
                    )}

                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center px-4 py-2 bg-white/5 rounded-lg border border-white/10">
                        <div className="flex items-center gap-2">
                            <Monitor className="h-3 w-3 text-white/50" />
                            <span className="text-[10px] font-mono text-white/50">800x200 RENDER CANVAS</span>
                        </div>
                        <div className="flex items-center gap-2 font-mono text-[10px] text-white/50">
                            <MoveHorizontal className="h-3 w-3" />
                            SYNC: V-SYNC (RAF)
                        </div>
                    </div>
                </Card>
            </div>

            <div className="rounded-2xl border bg-muted/30 p-8 space-y-6">
                <h3 className="text-xl font-bold flex items-center gap-2">
                    <Zap className="h-5 w-5 text-primary" />
                    Motion Clarity 101
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                    Ghosting happens when the pixels on your monitor can't change color fast enough to keep
                    up with a moving object. This creates a blurry "ghost" trail.
                </p>
                <div className="grid gap-6 md:grid-cols-2">
                    <div className="bg-background p-5 rounded-2xl border border-primary/5">
                        <h4 className="font-bold text-sm mb-2 text-primary">Overdrive</h4>
                        <p className="text-xs text-muted-foreground">Most gaming monitors have an 'Overdrive' or 'Response Time' setting in the OSD. Setting it too high can cause **Overshoot** (bright trails).</p>
                    </div>
                    <div className="bg-background p-5 rounded-2xl border border-primary/5">
                        <h4 className="font-bold text-sm mb-2 text-primary">ELMB / DYAC</h4>
                        <p className="text-xs text-muted-foreground">Strobe lighting technologies (Black Frame Insertion) can drastically improve motion clarity but may cause flickering or reduce brightness.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
