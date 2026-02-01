'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Download, Layers, AlertCircle, RefreshCw, X, Type, Image as ImageIcon, Settings2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';

export default function ImageOverlay() {
    const [baseFile, setBaseFile] = useState<File | null>(null);
    const [basePreview, setBasePreview] = useState<string | null>(null);
    const [overlayFile, setOverlayFile] = useState<File | null>(null);
    const [overlayPreview, setOverlayPreview] = useState<string | null>(null);

    const [opacity, setOpacity] = useState(70);
    const [scale, setScale] = useState(30);
    const [position, setPosition] = useState('bottom-right');
    const [isProcessing, setIsProcessing] = useState(false);
    const [processedUrl, setProcessedUrl] = useState<string | null>(null);

    const baseInputRef = useRef<HTMLInputElement>(null);
    const overlayInputRef = useRef<HTMLInputElement>(null);

    const handleBaseFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setBaseFile(file);
            setBasePreview(URL.createObjectURL(file));
        }
    };

    const handleOverlayFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setOverlayFile(file);
            setOverlayPreview(URL.createObjectURL(file));
        }
    };

    useEffect(() => {
        if (basePreview && overlayPreview) generateOverlay();
    }, [basePreview, overlayPreview, opacity, scale, position]);

    const generateOverlay = async () => {
        setIsProcessing(true);
        const base = new Image();
        base.src = basePreview!;
        const over = new Image();
        over.src = overlayPreview!;

        await Promise.all([
            new Promise(r => base.onload = r),
            new Promise(r => over.onload = r)
        ]);

        const canvas = document.createElement('canvas');
        canvas.width = base.width;
        canvas.height = base.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.drawImage(base, 0, 0);

        const overW = base.width * (scale / 100);
        const overH = overW * (over.height / over.width);

        let x = 0, y = 0;
        const margin = base.width * 0.05;

        if (position === 'top-left') { x = margin; y = margin; }
        else if (position === 'top-right') { x = base.width - overW - margin; y = margin; }
        else if (position === 'bottom-left') { x = margin; y = base.height - overH - margin; }
        else if (position === 'bottom-right') { x = base.width - overW - margin; y = base.height - overH - margin; }
        else if (position === 'center') { x = (base.width - overW) / 2; y = (base.height - overH) / 2; }

        ctx.globalAlpha = opacity / 100;
        ctx.drawImage(over, x, y, overW, overH);
        ctx.globalAlpha = 1.0;

        setProcessedUrl(canvas.toDataURL('image/png'));
        setIsProcessing(false);
    };

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            <div className="grid lg:grid-cols-2 gap-8">
                {/* Upload Slots */}
                <div className="space-y-6">
                    <div
                        onClick={() => baseInputRef.current?.click()}
                        className={cn(
                            "group relative h-48 border-2 border-dashed rounded-[2rem] flex flex-col items-center justify-center cursor-pointer transition-all overflow-hidden",
                            basePreview ? "border-primary bg-primary/5" : "border-primary/20 bg-muted/30 hover:border-primary/40"
                        )}
                    >
                        {basePreview ? (
                            <img src={basePreview} className="absolute inset-0 w-full h-full object-cover opacity-30 px-4 py-4" alt="Base preview" />
                        ) : null}
                        <ImageIcon className="h-10 w-10 text-primary mb-2 z-10" />
                        <span className="font-bold z-10">{basePreview ? 'Change Main Image' : 'Upload Main Image'}</span>
                        <input type="file" hidden ref={baseInputRef} onChange={handleBaseFile} accept="image/*" />
                    </div>

                    <div
                        onClick={() => overlayInputRef.current?.click()}
                        className={cn(
                            "group relative h-48 border-2 border-dashed rounded-[2rem] flex flex-col items-center justify-center cursor-pointer transition-all overflow-hidden",
                            overlayPreview ? "border-primary bg-primary/5" : "border-primary/20 bg-muted/30 hover:border-primary/40"
                        )}
                    >
                        {overlayPreview ? (
                            <img src={overlayPreview} className="absolute inset-0 w-full h-full object-contain opacity-50 p-8" alt="Overlay preview" />
                        ) : null}
                        <Layers className="h-10 w-10 text-primary mb-2 z-10" />
                        <span className="font-bold z-10">{overlayPreview ? 'Change Overlay Logo' : 'Upload Watermark/Logo'}</span>
                        <input type="file" hidden ref={overlayInputRef} onChange={handleOverlayFile} accept="image/*" />
                    </div>

                    {basePreview && overlayPreview && (
                        <div className="aspect-video relative rounded-3xl border bg-checkered overflow-hidden flex items-center justify-center">
                            <img src={processedUrl || basePreview} className="max-w-full max-h-full" alt="Final" />
                        </div>
                    )}
                </div>

                {/* Controls */}
                <div className="space-y-6">
                    <Card className="rounded-[2.5rem] glass-card overflow-hidden border-primary/10 shadow-xl">
                        <CardContent className="p-8 space-y-8">
                            <h3 className="font-black text-2xl uppercase tracking-tighter flex items-center gap-2">
                                <Settings2 className="h-6 w-6 text-primary" /> Overlay Settings
                            </h3>

                            <div className="space-y-4">
                                <div className="flex justify-between font-bold text-sm">
                                    <label>Watermark Size</label>
                                    <span className="text-primary">{scale}%</span>
                                </div>
                                <Slider value={[scale]} min={5} max={100} onValueChange={(v) => setScale(v[0])} />
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between font-bold text-sm">
                                    <label>Opacity</label>
                                    <span className="text-primary">{opacity}%</span>
                                </div>
                                <Slider value={[opacity]} min={0} max={100} onValueChange={(v) => setOpacity(v[0])} />
                            </div>

                            <div className="space-y-4">
                                <label className="font-bold text-sm block">Position</label>
                                <div className="grid grid-cols-3 gap-2">
                                    {['top-left', 'top-right', 'center', 'bottom-left', 'bottom-right'].map(pos => (
                                        <Button
                                            key={pos}
                                            variant={position === pos ? 'default' : 'outline'}
                                            size="sm"
                                            onClick={() => setPosition(pos)}
                                            className="text-[10px] uppercase font-bold rounded-xl"
                                        >
                                            {pos.replace('-', ' ')}
                                        </Button>
                                    ))}
                                </div>
                            </div>

                            <Button
                                className="w-full h-14 rounded-2xl text-lg font-bold"
                                disabled={!processedUrl}
                                onClick={() => {
                                    const link = document.createElement('a');
                                    link.href = processedUrl!;
                                    link.download = 'watermarked-image.png';
                                    link.click();
                                }}
                            >
                                <Download className="mr-2 h-6 w-6" /> Save Final Image
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
