'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Download, Smartphone, AlertCircle, RefreshCw, X, Instagram, Youtube, Twitter, Facebook } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const PRESETS = [
    { id: '1:1', name: 'Instagram Square', ratio: 1, icon: Instagram },
    { id: '4:5', name: 'Instagram Portrait', ratio: 0.8, icon: Instagram },
    { id: '9:16', name: 'TikTok / Reel', ratio: 0.5625, icon: Smartphone },
    { id: '16:9', name: 'YouTube / FB', ratio: 1.777, icon: Youtube },
    { id: '2:1', name: 'Twitter Post', ratio: 2, icon: Twitter },
    { id: '4:3', name: 'Classic TV', ratio: 1.333, icon: Facebook },
];

export default function ImageAspectRatio() {
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [selectedPreset, setSelectedPreset] = useState(PRESETS[0]);
    const [mode, setMode] = useState<'crop' | 'pad'>('crop');
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
    }, [previewUrl, selectedPreset, mode]);

    const generateImage = async () => {
        setIsProcessing(true);
        const img = new Image();
        img.src = previewUrl!;
        await new Promise(r => img.onload = r);

        const targetRatio = selectedPreset.ratio;
        const canvas = document.createElement('canvas');

        let targetW, targetH;

        if (mode === 'crop') {
            // Calculate best crop
            if (img.width / img.height > targetRatio) {
                targetH = img.height;
                targetW = img.height * targetRatio;
            } else {
                targetW = img.width;
                targetH = img.width / targetRatio;
            }
            canvas.width = targetW;
            canvas.height = targetH;
            const ctx = canvas.getContext('2d');
            if (ctx) ctx.drawImage(img, (img.width - targetW) / 2, (img.height - targetH) / 2, targetW, targetH, 0, 0, targetW, targetH);
        } else {
            // Padding
            if (img.width / img.height > targetRatio) {
                targetW = img.width;
                targetH = img.width / targetRatio;
            } else {
                targetH = img.height;
                targetW = img.height * targetRatio;
            }
            canvas.width = targetW;
            canvas.height = targetH;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.fillStyle = '#ffffff'; // Default padding white
                ctx.fillRect(0, 0, targetW, targetH);
                ctx.drawImage(img, (targetW - img.width) / 2, (targetH - img.height) / 2);
            }
        }

        setProcessedUrl(canvas.toDataURL(file?.type || 'image/png'));
        setIsProcessing(false);
    };

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            {!previewUrl ? (
                <div onClick={() => fileInputRef.current?.click()} className="border-2 border-dashed border-primary/20 rounded-[3rem] bg-muted/30 p-24 text-center cursor-pointer">
                    <Smartphone className="h-16 w-16 text-primary mx-auto mb-6" />
                    <h3 className="text-3xl font-black italic">Social Aspect Studio</h3>
                    <p className="text-muted-foreground text-lg mt-4 max-w-sm mx-auto">Optimize your content for any social platform instantly.</p>
                    <input type="file" hidden ref={fileInputRef} onChange={handleFileChange} />
                </div>
            ) : (
                <div className="grid lg:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <div className="relative aspect-auto min-h-[400px] rounded-[2.5rem] overflow-hidden border bg-checkered flex items-center justify-center p-8">
                            <img src={processedUrl || previewUrl} alt="Preview" className="max-w-full max-h-[600px] object-contain rounded-2xl shadow-4xl" />
                        </div>
                        <Button variant="ghost" onClick={() => setPreviewUrl(null)} className="w-full text-destructive"><X className="mr-2 h-4 w-4" /> Reset</Button>
                    </div>

                    <Card className="rounded-[3rem] glass-card border-primary/10 p-10 space-y-8 h-full">
                        <div className="space-y-6">
                            <label className="text-xs font-black uppercase tracking-widest text-primary/60">Select Platform</label>
                            <div className="grid grid-cols-2 gap-4">
                                {PRESETS.map(p => (
                                    <button
                                        key={p.id}
                                        onClick={() => setSelectedPreset(p)}
                                        className={cn(
                                            "p-4 rounded-2xl border transition-all text-sm font-bold flex items-center gap-3",
                                            selectedPreset.id === p.id ? "border-primary bg-primary/10 text-primary" : "border-primary/10 text-muted-foreground hover:bg-primary/5"
                                        )}
                                    >
                                        <p.icon className="h-5 w-5" />
                                        <div className="text-left">
                                            <div className="text-xs opacity-60 uppercase tracking-tighter">{p.id}</div>
                                            <div>{p.name}</div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <label className="text-xs font-black uppercase tracking-widest text-primary/60">Adjustment Mode</label>
                            <div className="grid grid-cols-2 gap-4">
                                <Button variant={mode === 'crop' ? 'default' : 'outline'} onClick={() => setMode('crop')} className="h-12 rounded-xl font-bold">Smart Crop</Button>
                                <Button variant={mode === 'pad' ? 'default' : 'outline'} onClick={() => setMode('pad')} className="h-12 rounded-xl font-bold">Add Padding</Button>
                            </div>
                        </div>

                        <Button className="w-full h-16 rounded-3xl text-xl font-black shadow-2xl shadow-primary/30 mt-4" onClick={() => {
                            const link = document.createElement('a');
                            link.href = processedUrl!;
                            link.download = `${selectedPreset.name.replace(' ', '-')}-${file?.name || 'social.png'}`;
                            link.click();
                        }}>
                            <Download className="mr-3 h-7 w-7" /> DOWNLOAD FOR {selectedPreset.name.split(' ')[0].toUpperCase()}
                        </Button>
                    </Card>
                </div>
            )}
        </div>
    );
}
