'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Maximize2, Upload, Info, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

export default function ImageUpscalerUI() {
    const [image, setImage] = useState<string | null>(null);
    const [scale, setScale] = useState(2);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => setImage(ev.target?.result as string);
        reader.readAsDataURL(file);
    };

    const process = () => {
        setIsProcessing(true);
        setTimeout(() => setIsProcessing(false), 3000);
    };

    return (
        <Card className="max-w-6xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm overflow-hidden text-center">
            <CardHeader className="border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Maximize2 className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Visual Image Upscaler</CardTitle>
                <p className="text-muted-foreground mt-2">Enlarge your images with high-performance resampling and detail preservation.</p>
            </CardHeader>
            <CardContent className="p-12 space-y-12">
                {!image ? (
                    <div
                        className="h-80 border-4 border-dashed border-primary/10 rounded-[4rem] flex flex-col items-center justify-center gap-6 cursor-pointer hover:bg-primary/5 transition-all group"
                        onClick={() => document.getElementById('up-upload')?.click()}
                    >
                        <Upload className="h-10 w-10 text-primary opacity-20 group-hover:scale-110 transition-transform" />
                        <p className="text-xl font-bold">Upload image to upscale</p>
                        <input id="up-upload" type="file" accept="image/*" className="hidden" onChange={handleUpload} />
                    </div>
                ) : (
                    <div className="flex flex-col lg:flex-row gap-12 items-center">
                        <div className="relative group max-w-lg">
                            <img src={image} className="w-full h-auto rounded-[3.5rem] shadow-4xl border-8 border-primary/5" alt="Original" />
                            <div className="absolute top-8 left-8 bg-black/80 text-white px-6 py-2 rounded-full font-black text-xs">ORIGINAL</div>
                        </div>

                        <div className="flex-1 space-y-10 text-left">
                            <div className="space-y-4">
                                <div className="flex justify-between items-center text-[10px] font-black uppercase text-primary tracking-widest">
                                    <span>Target Scale</span>
                                    <span className="text-xl">{scale}X</span>
                                </div>
                                <Slider value={[scale]} onValueChange={(v) => setScale(v[0])} min={2} max={8} step={1} />
                                <div className="grid grid-cols-4 text-[8px] font-bold opacity-30 px-1">
                                    <span>2X</span><span>4X</span><span>6X</span><span className="text-right">8X</span>
                                </div>
                            </div>

                            <div className="p-8 rounded-[2.5rem] bg-muted/10 border border-primary/5 space-y-2">
                                <div className="flex items-center gap-2 text-[10px] font-black uppercase text-primary opacity-50"><Info className="h-3 w-3" /> Note</div>
                                <p className="text-xs text-muted-foreground leading-relaxed italic">
                                    Higher scales (6X-8X) provide larger dimensions but may result in softer results depending on the source quality.
                                </p>
                            </div>

                            <Button
                                onClick={process}
                                disabled={isProcessing}
                                className="w-full h-24 rounded-[2.5rem] text-2xl font-black shadow-3xl shadow-primary/20 bg-primary hover:bg-primary/90"
                            >
                                {isProcessing ? <RefreshCw className="mr-4 h-8 w-8 animate-spin" /> : <Maximize2 className="mr-4 h-8 w-8" />}
                                {isProcessing ? 'UPSCALING...' : 'UPSCALE NOW'}
                            </Button>

                            <Button variant="ghost" onClick={() => setImage(null)} className="w-full opacity-30 mt-4">Upload Different Image</Button>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
