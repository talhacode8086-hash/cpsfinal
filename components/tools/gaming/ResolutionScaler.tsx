'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Monitor, Layers, Layout } from 'lucide-react';
import { toast } from 'sonner';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

export default function ResolutionScaler() {
    const [width, setWidth] = useState('1920');
    const [height, setHeight] = useState('1080');
    const [scale, setScale] = useState([100]);

    const scaledWidth = Math.round((parseInt(width) || 0) * (scale[0] / 100));
    const scaledHeight = Math.round((parseInt(height) || 0) * (scale[0] / 100));

    const totalPixels = scaledWidth * scaledHeight;
    const nativePixels = (parseInt(width) || 0) * (parseInt(height) || 0);
    const reduction = nativePixels ? (100 - (totalPixels / nativePixels) * 100).toFixed(1) : 0;

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Monitor className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Resolution Scaler</CardTitle>
                <p className="text-muted-foreground mt-2">Calculate render scale impact on performance and clarity.</p>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Native Width</Label>
                                <Input value={width} onChange={(e) => setWidth(e.target.value)} type="number" className="rounded-xl" />
                            </div>
                            <div className="space-y-2">
                                <Label>Native Height</Label>
                                <Input value={height} onChange={(e) => setHeight(e.target.value)} type="number" className="rounded-xl" />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between">
                                <Label className="font-bold">Render Scale: {scale[0]}%</Label>
                                <span className="text-primary font-bold">{scaledWidth} x {scaledHeight}</span>
                            </div>
                            <Slider value={scale} onValueChange={setScale} min={25} max={200} step={1} className="py-2" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        <div className="p-6 rounded-2xl bg-primary/10 border border-primary/10 flex flex-col items-center justify-center text-center">
                            <Layers className="h-6 w-6 text-primary mb-2" />
                            <p className="text-xs font-bold uppercase tracking-tighter text-primary">Pixel Load Reduction</p>
                            <p className="text-4xl font-black">{reduction}%</p>
                            <p className="text-xs text-muted-foreground mt-1">Less GPU power needed</p>
                        </div>
                        <div className="p-6 rounded-2xl bg-muted/30 border border-primary/5 flex flex-col items-center justify-center text-center">
                            <Layout className="h-6 w-6 text-muted-foreground mb-2" />
                            <p className="text-xs font-bold uppercase tracking-tighter">Total Scaled Pixels</p>
                            <p className="text-2xl font-black">{(totalPixels / 1000000).toFixed(2)}M</p>
                            <p className="text-xs text-muted-foreground mt-1">vs {(nativePixels / 1000000).toFixed(2)}M native</p>
                        </div>
                    </div>
                </div>

                <div className="pt-6 border-t border-primary/5 text-sm text-muted-foreground italic">
                    <p>Tip: Setting render scale to 75% at 4K provides almost identical load as 1440p native, but often with better UI clarity.</p>
                </div>
            </CardContent>
        </Card>
    );
}
