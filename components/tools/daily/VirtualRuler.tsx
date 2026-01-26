'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Ruler, Maximize } from 'lucide-react';
import { Slider } from '@/components/ui/slider';

export default function VirtualRuler() {
    const [pixelsPerCm, setPixelsPerCm] = useState(37.8); // Standard 96 DPI estimate
    const [isVertical, setIsVertical] = useState(false);

    // Calibration: Real world 10cm = ? pixels
    // Users can calibrate with a real object (credit card is 8.56cm)

    return (
        <Card className="max-w-6xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm overflow-hidden">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Ruler className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Virtual Screen Ruler</CardTitle>
                <p className="text-muted-foreground mt-2">Precise on-screen measurements. Calibrate for real-world accuracy.</p>
            </CardHeader>
            <CardContent className="p-0 relative min-h-[600px] flex flex-col">
                <div className="p-8 border-b border-primary/5 bg-muted/5 flex flex-wrap gap-8 items-center justify-center">
                    <div className="space-y-2 w-64">
                        <div className="flex justify-between text-[10px] font-black uppercase text-primary">
                            <span>Calibration (PPI Correction)</span>
                            <span>{pixelsPerCm.toFixed(1)} px/cm</span>
                        </div>
                        <Slider value={[pixelsPerCm]} onValueChange={(v) => setPixelsPerCm(v[0])} min={20} max={100} step={0.1} />
                    </div>
                    <button
                        onClick={() => setIsVertical(!isVertical)}
                        className="p-4 rounded-2xl bg-primary text-white font-bold flex items-center gap-2"
                    >
                        <Maximize className={isVertical ? "rotate-90" : ""} />
                        Switch to {isVertical ? 'Horizontal' : 'Vertical'}
                    </button>
                    <div className="text-xs text-muted-foreground max-w-xs italic">
                        Tip: Place a standard credit card (8.56cm) against the screen and adjust the slider until the ruler matches the card.
                    </div>
                </div>

                <div className={`flex-1 overflow-auto p-12 relative bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]`}>
                    <div className={`relative bg-background border-2 border-primary/20 shadow-2xl transition-all ${isVertical ? 'w-24 h-[1000px]' : 'h-24 w-[1200px]'
                        }`}>
                        {/* Ruler Markings */}
                        {Array.from({ length: 40 }).map((_, cm) => (
                            <div
                                key={cm}
                                className="absolute"
                                style={{
                                    left: isVertical ? 0 : cm * pixelsPerCm,
                                    top: isVertical ? cm * pixelsPerCm : 0,
                                    width: isVertical ? '100%' : '1px',
                                    height: isVertical ? '1px' : '100%'
                                }}
                            >
                                {/* CM Line */}
                                <div className={`${isVertical ? 'w-8 h-[2px]' : 'w-[2px] h-8'} bg-primary`} />
                                <span className={`absolute text-[10px] font-black ${isVertical ? 'left-10 top-0 -translate-y-1/2' : 'top-10 left-0 -translate-x-1/2'
                                    }`}>
                                    {cm}
                                </span>

                                {/* MM Lines */}
                                {Array.from({ length: 9 }).map((_, mm) => (
                                    <div
                                        key={mm}
                                        className="absolute bg-primary/30"
                                        style={{
                                            left: isVertical ? 0 : (mm + 1) * (pixelsPerCm / 10),
                                            top: isVertical ? (mm + 1) * (pixelsPerCm / 10) : 0,
                                            width: isVertical ? (mm === 4 ? '6px' : '4px') : '1px',
                                            height: isVertical ? '1px' : (mm === 4 ? '6px' : '4px')
                                        }}
                                    />
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
