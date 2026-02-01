'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Download, Zap, AlertCircle, RefreshCw, X, Sliders } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';

export default function ImageGlitcher() {
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [intensity, setIntensity] = useState(30);
    const [isProcessing, setIsProcessing] = useState(false);
    const [processedUrl, setProcessedUrl] = useState<string | null>(null);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
            setPreviewUrl(URL.createObjectURL(selectedFile));
            setProcessedUrl(null);
        }
    };

    const applyGlitch = async () => {
        if (!previewUrl) return;
        setIsProcessing(true);
        const img = new Image();
        img.src = previewUrl;
        await new Promise(r => img.onload = r);

        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.drawImage(img, 0, 0);

        const it = intensity / 100;

        // RGB Shift
        if (it > 0.1) {
            const shift = it * 20;
            ctx.globalCompositeOperation = 'screen';
            ctx.drawImage(img, shift, 0); // Red shift
            ctx.globalCompositeOperation = 'source-over';
        }

        // Random Block Distortion
        for (let i = 0; i < intensity / 2; i++) {
            const x = Math.random() * img.width;
            const y = Math.random() * img.height;
            const w = Math.random() * (it * 300);
            const h = Math.random() * (it * 50);
            const dx = (Math.random() - 0.5) * (it * 100);
            ctx.drawImage(canvas, x, y, w, h, x + dx, y, w, h);
        }

        // Scanlines
        if (it > 0.4) {
            ctx.fillStyle = 'rgba(0,0,0,0.1)';
            for (let i = 0; i < img.height; i += 4) {
                ctx.fillRect(0, i, img.width, 1);
            }
        }

        setProcessedUrl(canvas.toDataURL(file?.type || 'image/png'));
        setIsProcessing(false);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            {!previewUrl ? (
                <div onClick={() => fileInputRef.current?.click()} className="border-2 border-dashed border-primary/20 rounded-[2.5rem] bg-muted/30 p-16 text-center cursor-pointer">
                    <Zap className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h3 className="text-2xl font-black">Cyberpunk Glitcher</h3>
                    <p className="text-muted-foreground mt-2">Add digital distortion and RGB shift to your photos.</p>
                    <input type="file" hidden ref={fileInputRef} onChange={handleFileChange} />
                </div>
            ) : (
                <div className="grid lg:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <div className="relative aspect-auto min-h-[300px] rounded-3xl overflow-hidden border bg-checkered flex items-center justify-center p-4">
                            <img src={processedUrl || previewUrl} alt="Preview" className="max-w-full max-h-[500px] object-contain rounded-lg" />
                        </div>
                        <Button variant="ghost" onClick={() => { setPreviewUrl(null); setProcessedUrl(null); }} className="w-full text-destructive"><X className="mr-2 h-4 w-4" /> Reset</Button>
                    </div>

                    <Card className="rounded-[2rem] glass-card border-primary/10 p-8 space-y-8">
                        <div className="space-y-4">
                            <div className="flex justify-between font-black text-sm uppercase tracking-tighter">
                                <label className="flex items-center gap-2"><Sliders className="h-4 w-4" /> Glitch Intensity</label>
                                <span className="text-primary">{intensity}%</span>
                            </div>
                            <Slider value={[intensity]} min={1} max={100} onValueChange={(v) => { setIntensity(v[0]); setProcessedUrl(null); }} />
                        </div>

                        <div className="pt-4">
                            <Button className="w-full h-14 rounded-2xl text-lg font-bold" onClick={applyGlitch} disabled={isProcessing}>
                                {isProcessing ? <RefreshCw className="mr-2 h-5 w-5 animate-spin" /> : 'Apply Glitch Effect'}
                            </Button>
                            {processedUrl && (
                                <Button className="w-full h-14 rounded-2xl text-lg font-bold bg-green-500 hover:bg-green-600 mt-4" onClick={() => {
                                    const link = document.createElement('a');
                                    link.href = processedUrl;
                                    link.download = `glitch-${file?.name || 'art.png'}`;
                                    link.click();
                                }}>
                                    <Download className="mr-2 h-5 w-5" /> Download Glitch
                                </Button>
                            )}
                        </div>
                    </Card>
                </div>
            )}
        </div>
    );
}
