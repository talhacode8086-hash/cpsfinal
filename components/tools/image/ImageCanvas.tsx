'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Download, Maximize, AlertCircle, RefreshCw, X, Palette, Layout } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';

export default function ImageCanvas() {
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [originalSize, setOriginalSize] = useState({ width: 0, height: 0 });
    const [canvasColor, setCanvasColor] = useState('#ffffff');
    const [padding, setPadding] = useState(50);
    const [aspectRatio, setAspectRatio] = useState('original');
    const [isProcessing, setIsProcessing] = useState(false);
    const [processedUrl, setProcessedUrl] = useState<string | null>(null);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile && selectedFile.type.startsWith('image/')) loadImage(selectedFile);
    };

    const loadImage = (selectedFile: File) => {
        setFile(selectedFile);
        const url = URL.createObjectURL(selectedFile);
        setPreviewUrl(url);
        setProcessedUrl(null);
        const img = new Image();
        img.onload = () => setOriginalSize({ width: img.width, height: img.height });
        img.src = url;
    };

    useEffect(() => {
        if (previewUrl) updateCanvas();
    }, [padding, canvasColor, aspectRatio]);

    const updateCanvas = async () => {
        if (!previewUrl) return;
        setIsProcessing(true);
        const img = new Image();
        img.src = previewUrl;
        await new Promise(r => (img.onload = r));

        const canvas = document.createElement('canvas');
        let cW = img.width + padding * 2;
        let cH = img.height + padding * 2;

        if (aspectRatio === '1:1') {
            const side = Math.max(cW, cH);
            cW = side;
            cH = side;
        } else if (aspectRatio === '4:5') {
            // Instagram Portrait
            const targetRatio = 4 / 5;
            if (cW / cH > targetRatio) cH = cW / targetRatio;
            else cW = cH * targetRatio;
        } else if (aspectRatio === '16:9') {
            const targetRatio = 16 / 9;
            if (cW / cH > targetRatio) cH = cW / targetRatio;
            else cW = cH * targetRatio;
        }

        canvas.width = cW;
        canvas.height = cH;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.fillStyle = canvasColor;
        ctx.fillRect(0, 0, cW, cH);
        ctx.drawImage(img, (cW - img.width) / 2, (cH - img.height) / 2);

        setProcessedUrl(canvas.toDataURL('image/png'));
        setIsProcessing(false);
    };

    const download = () => {
        const link = document.createElement('a');
        link.href = processedUrl!;
        link.download = `canvas-${file?.name || 'image'}.png`;
        link.click();
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            {!previewUrl ? (
                <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-primary/20 rounded-[2.5rem] bg-muted/30 p-16 text-center cursor-pointer hover:bg-primary/[0.03] transition-all"
                >
                    <Upload className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h3 className="text-2xl font-black">Add Canvas Background</h3>
                    <p className="text-muted-foreground mt-2">Center your image on a colored background or add padding.</p>
                    <input type="file" hidden ref={fileInputRef} onChange={handleFileChange} accept="image/*" />
                </div>
            ) : (
                <div className="grid lg:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <div className="relative aspect-square rounded-3xl overflow-hidden border bg-checkered p-8 flex items-center justify-center">
                            <img src={processedUrl || previewUrl} alt="Preview" className="max-w-full max-h-full shadow-2xl rounded" />
                        </div>
                        <Button variant="ghost" onClick={() => setPreviewUrl(null)} className="w-full text-destructive"><X className="mr-2 h-4 w-4" /> Reset</Button>
                    </div>

                    <Card className="rounded-[2rem] glass-card overflow-hidden border-primary/10">
                        <CardContent className="p-8 space-y-6">
                            <div className="space-y-4">
                                <label className="text-sm font-bold flex items-center gap-2"><Maximize className="h-4 w-4" /> Padding (px)</label>
                                <Slider value={[padding]} min={0} max={500} onValueChange={(v) => setPadding(v[0])} />
                            </div>

                            <div className="space-y-4">
                                <label className="text-sm font-bold flex items-center gap-2"><Palette className="h-4 w-4" /> Background Color</label>
                                <div className="flex gap-2 flex-wrap">
                                    {['#ffffff', '#000000', '#f3f4f6', '#3b82f6', '#ef4444', '#10b981'].map(c => (
                                        <button key={c} onClick={() => setCanvasColor(c)} className={cn("h-8 w-8 rounded-full border-2", canvasColor === c ? 'border-primary' : 'border-transparent')} style={{ background: c }} />
                                    ))}
                                    <input type="color" value={canvasColor} onChange={(e) => setCanvasColor(e.target.value)} className="h-8 w-8 rounded-full border-none cursor-pointer" />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className="text-sm font-bold flex items-center gap-2"><Layout className="h-4 w-4" /> Aspect Ratio</label>
                                <div className="grid grid-cols-2 gap-2">
                                    {['original', '1:1', '4:5', '16:9'].map(r => (
                                        <Button key={r} variant={aspectRatio === r ? 'default' : 'outline'} size="sm" onClick={() => setAspectRatio(r)} className="rounded-xl">{r}</Button>
                                    ))}
                                </div>
                            </div>

                            <Button onClick={download} className="w-full h-14 rounded-2xl text-lg font-bold mt-4" disabled={!processedUrl}>
                                <Download className="mr-2 h-5 w-5" /> Download Image
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
}
