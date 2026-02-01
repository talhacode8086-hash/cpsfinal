'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Download, Type, AlertCircle, RefreshCw, X, Palette, AlignLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';

export default function ImageTextAdder() {
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [text, setText] = useState('Your Caption');
    const [fontSize, setFontSize] = useState(48);
    const [textColor, setTextColor] = useState('#ffffff');
    const [shadowColor, setShadowColor] = useState('#000000');
    const [positionX, setPositionX] = useState(50);
    const [positionY, setPositionY] = useState(50);
    const [isProcessing, setIsProcessing] = useState(false);
    const [processedUrl, setProcessedUrl] = useState<string | null>(null);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
            setPreviewUrl(URL.createObjectURL(selectedFile));
        }
    };

    useEffect(() => {
        if (previewUrl) generateImage();
    }, [previewUrl, text, fontSize, textColor, shadowColor, positionX, positionY]);

    const generateImage = async () => {
        setIsProcessing(true);
        const img = new Image();
        img.src = previewUrl!;
        await new Promise(r => img.onload = r);

        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.drawImage(img, 0, 0);

        // Text settings
        const actualFontSize = (fontSize / 1000) * img.width;
        ctx.font = `bold ${actualFontSize}px Inter, system-ui, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        const x = (positionX / 100) * img.width;
        const y = (positionY / 100) * img.height;

        // Shadow
        ctx.shadowColor = shadowColor;
        ctx.shadowBlur = actualFontSize * 0.1;
        ctx.shadowOffsetX = actualFontSize * 0.05;
        ctx.shadowOffsetY = actualFontSize * 0.05;

        ctx.fillStyle = textColor;
        ctx.fillText(text, x, y);

        setProcessedUrl(canvas.toDataURL(file?.type || 'image/png'));
        setIsProcessing(false);
    };

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            {!previewUrl ? (
                <div onClick={() => fileInputRef.current?.click()} className="border-2 border-dashed border-primary/20 rounded-[3rem] bg-muted/30 p-24 text-center cursor-pointer">
                    <Type className="h-16 w-16 text-primary mx-auto mb-6" />
                    <h3 className="text-3xl font-black italic">Photo Text Art</h3>
                    <p className="text-muted-foreground text-lg mt-4 max-w-md mx-auto">Add high-impact captions and quotes to your images instantly.</p>
                    <input type="file" hidden ref={fileInputRef} onChange={handleFileChange} accept="image/*" />
                </div>
            ) : (
                <div className="grid lg:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <div className="relative aspect-auto min-h-[400px] rounded-[2.5rem] overflow-hidden border bg-checkered flex items-center justify-center p-8">
                            <img src={processedUrl || previewUrl} alt="Preview" className="max-w-full max-h-[600px] object-contain rounded-2xl shadow-4xl" />
                        </div>
                        <Button variant="ghost" onClick={() => setPreviewUrl(null)} className="w-full text-destructive"><X className="mr-2 h-4 w-4" /> Choose Another Image</Button>
                    </div>

                    <Card className="rounded-[3rem] glass-card border-primary/10 p-10 space-y-8 h-full">
                        <div className="space-y-4">
                            <label className="text-xs font-black uppercase tracking-widest text-primary/60">Your Text</label>
                            <Input value={text} onChange={(e) => setText(e.target.value)} className="h-14 rounded-2xl border-primary/20 text-xl font-bold bg-background/50" placeholder="Type something..." />
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <label className="text-xs font-black uppercase tracking-widest text-primary/60">Font Size</label>
                                <Slider value={[fontSize]} min={10} max={300} onValueChange={(v) => setFontSize(v[0])} />
                            </div>
                            <div className="space-y-4">
                                <label className="text-xs font-black uppercase tracking-widest text-primary/60">Color</label>
                                <div className="flex gap-2">
                                    <input type="color" value={textColor} onChange={(e) => setTextColor(e.target.value)} className="h-10 w-full rounded-xl cursor-pointer border-none" />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <label className="text-xs font-black uppercase tracking-widest text-primary/60">Position X/Y</label>
                            <div className="grid grid-cols-2 gap-4">
                                <Slider value={[positionX]} min={0} max={100} onValueChange={(v) => setPositionX(v[0])} />
                                <Slider value={[positionY]} min={0} max={100} onValueChange={(v) => setPositionY(v[0])} />
                            </div>
                        </div>

                        <Button className="w-full h-16 rounded-3xl text-xl font-black shadow-2xl shadow-primary/30 mt-4" onClick={() => {
                            const link = document.createElement('a');
                            link.href = processedUrl!;
                            link.download = `captioned-${file?.name || 'image.png'}`;
                            link.click();
                        }}>
                            <Download className="mr-3 h-7 w-7" /> EXPORT PHOTO
                        </Button>
                    </Card>
                </div>
            )}
        </div>
    );
}
