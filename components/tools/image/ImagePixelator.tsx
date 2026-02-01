'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Download, Grid, AlertCircle, RefreshCw, X, Sliders } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';

export default function ImagePixelator() {
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [pixelSize, setPixelSize] = useState(20);
    const [isProcessing, setIsProcessing] = useState(false);
    const [processedUrl, setProcessedUrl] = useState<string | null>(null);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile && selectedFile.type.startsWith('image/')) {
            setFile(selectedFile);
            setPreviewUrl(URL.createObjectURL(selectedFile));
            setProcessedUrl(null);
        }
    };

    const pixelate = async () => {
        if (!previewUrl) return;
        setIsProcessing(true);
        const img = new Image();
        img.src = previewUrl;
        await new Promise(r => img.onload = r);

        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d', { alpha: true });
        if (!ctx) return;

        // The trick to pixelate is to draw small then scale up with smoothing off
        const w = img.width;
        const h = img.height;
        const pSize = Math.max(1, pixelSize);

        const smallCanvas = document.createElement('canvas');
        smallCanvas.width = Math.ceil(w / pSize);
        smallCanvas.height = Math.ceil(h / pSize);
        const sCtx = smallCanvas.getContext('2d');
        if (!sCtx) return;

        sCtx.drawImage(img, 0, 0, smallCanvas.width, smallCanvas.height);

        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(smallCanvas, 0, 0, smallCanvas.width, smallCanvas.height, 0, 0, w, h);

        setProcessedUrl(canvas.toDataURL(file?.type || 'image/png'));
        setIsProcessing(false);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            {!previewUrl ? (
                <div onClick={() => fileInputRef.current?.click()} className="border-2 border-dashed border-primary/20 rounded-[2.5rem] bg-muted/30 p-16 text-center cursor-pointer">
                    <Grid className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h3 className="text-2xl font-black">Pixel Art Generator</h3>
                    <p className="text-muted-foreground mt-2">Convert your photos into 8-bit or 16-bit style pixel art.</p>
                    <input type="file" hidden ref={fileInputRef} onChange={handleFileChange} />
                </div>
            ) : (
                <div className="grid lg:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <div className="relative aspect-auto min-h-[300px] rounded-3xl overflow-hidden border bg-checkered flex items-center justify-center p-4">
                            <img src={processedUrl || previewUrl} alt="Preview" className="max-w-full max-h-[500px] object-contain rounded-lg" style={{ imageRendering: 'pixelated' }} />
                        </div>
                        <Button variant="ghost" onClick={() => { setPreviewUrl(null); setProcessedUrl(null); }} className="w-full text-destructive"><X className="mr-2 h-4 w-4" /> Reset</Button>
                    </div>

                    <Card className="rounded-[2rem] glass-card border-primary/10 p-8 space-y-8">
                        <div className="space-y-4">
                            <div className="flex justify-between font-black text-sm uppercase tracking-tighter">
                                <label className="flex items-center gap-2"><Sliders className="h-4 w-4" /> Pixel Size</label>
                                <span className="text-primary">{pixelSize}px</span>
                            </div>
                            <Slider value={[pixelSize]} min={1} max={100} onValueChange={(v) => { setPixelSize(v[0]); setProcessedUrl(null); }} />
                        </div>

                        <div className="pt-4">
                            {processedUrl ? (
                                <Button className="w-full h-14 rounded-2xl text-lg font-bold" onClick={() => {
                                    const link = document.createElement('a');
                                    link.href = processedUrl;
                                    link.download = `pixel-${file?.name || 'art.png'}`;
                                    link.click();
                                }}>
                                    <Download className="mr-2 h-5 w-5" /> Download Pixel Art
                                </Button>
                            ) : (
                                <Button className="w-full h-14 rounded-2xl text-lg font-bold" onClick={pixelate} disabled={isProcessing}>
                                    {isProcessing ? <RefreshCw className="mr-2 h-5 w-5 animate-spin" /> : 'Generate Pixel Art'}
                                </Button>
                            )}
                        </div>

                        <div className="p-4 rounded-2xl bg-primary/5 border border-primary/10 flex gap-3 text-xs text-muted-foreground italic">
                            <AlertCircle className="h-4 w-4 text-primary shrink-0" />
                            Tip: Larger pixel sizes create a more abstract, retro look. 1-5px is great for sharp digital art, while 20px+ creates mosaic effects.
                        </div>
                    </Card>
                </div>
            )}
        </div>
    );
}
