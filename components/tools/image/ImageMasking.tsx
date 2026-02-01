'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Download, Shapes, AlertCircle, RefreshCw, X, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const MASKS = [
    { id: 'circle', name: 'Circle', path: 'circle(50% at 50% 50%)' },
    { id: 'square', name: 'Rounded Square', path: 'inset(0% round 15%)' },
    { id: 'star', name: 'Star', path: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' },
    { id: 'hexagon', name: 'Hexagon', path: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)' },
    { id: 'diamond', name: 'Diamond', path: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' },
    { id: 'triangle', name: 'Triangle', path: 'polygon(50% 0%, 0% 100%, 100% 100%)' },
    { id: 'heart', name: 'Heart', path: 'path("M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z")' }
];

export default function ImageMasking() {
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [selectedMask, setSelectedMask] = useState(MASKS[0]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [processedUrl, setProcessedUrl] = useState<string | null>(null);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile && selectedFile.type.startsWith('image/')) {
            loadImage(selectedFile);
        }
    };

    const loadImage = (selectedFile: File) => {
        setFile(selectedFile);
        const url = URL.createObjectURL(selectedFile);
        setPreviewUrl(url);
        setProcessedUrl(null);
    };

    const applyMask = async () => {
        if (!previewUrl) return;

        setIsProcessing(true);
        const img = new Image();
        img.src = previewUrl;

        await new Promise(resolve => {
            img.onload = resolve;
        });

        const canvas = document.createElement('canvas');
        const size = Math.min(img.width, img.height);
        canvas.width = size;
        canvas.height = size;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.clearRect(0, 0, size, size);

        // Apply masking logic via Path2D or clipping
        ctx.beginPath();
        if (selectedMask.id === 'circle') {
            ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
        } else if (selectedMask.id === 'hexagon') {
            for (let i = 0; i < 6; i++) {
                const angle = (i * Math.PI) / 3;
                const x = size / 2 + (size / 2) * Math.cos(angle);
                const y = size / 2 + (size / 2) * Math.sin(angle);
                if (i === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
        } else if (selectedMask.id === 'triangle') {
            ctx.moveTo(size / 2, 0);
            ctx.lineTo(0, size);
            ctx.lineTo(size, size);
        } else if (selectedMask.id === 'diamond') {
            ctx.moveTo(size / 2, 0);
            ctx.lineTo(size, size / 2);
            ctx.lineTo(size / 2, size);
            ctx.lineTo(0, size / 2);
        } else if (selectedMask.id === 'star') {
            const spikes = 5;
            const outerRadius = size / 2;
            const innerRadius = size / 4;
            let rot = (Math.PI / 2) * 3;
            let x = size / 2;
            let y = size / 2;
            const step = Math.PI / spikes;

            ctx.moveTo(size / 2, size / 2 - outerRadius);
            for (let i = 0; i < spikes; i++) {
                x = size / 2 + Math.cos(rot) * outerRadius;
                y = size / 2 + Math.sin(rot) * outerRadius;
                ctx.lineTo(x, y);
                rot += step;

                x = size / 2 + Math.cos(rot) * innerRadius;
                y = size / 2 + Math.sin(rot) * innerRadius;
                ctx.lineTo(x, y);
                rot += step;
            }
        } else {
            // Default to rounded rect for others in this simplified version
            const radius = size * 0.15;
            ctx.moveTo(radius, 0);
            ctx.lineTo(size - radius, 0);
            ctx.quadraticCurveTo(size, 0, size, radius);
            ctx.lineTo(size, size - radius);
            ctx.quadraticCurveTo(size, size, size - radius, size);
            ctx.lineTo(radius, size);
            ctx.quadraticCurveTo(0, size, 0, size - radius);
            ctx.lineTo(0, radius);
            ctx.quadraticCurveTo(0, 0, radius, 0);
        }
        ctx.closePath();
        ctx.clip();

        // Draw image centered and cropped
        const offsetX = (img.width - size) / 2;
        const offsetY = (img.height - size) / 2;
        ctx.drawImage(img, offsetX, offsetY, size, size, 0, 0, size, size);

        setProcessedUrl(canvas.toDataURL('image/png'));
        setIsProcessing(false);
    };

    const downloadImage = () => {
        if (!processedUrl) return;
        const link = document.createElement('a');
        link.href = processedUrl;
        link.download = `masked-${file?.name.split('.')[0] || 'image'}.png`;
        link.click();
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <AnimatePresence mode="wait">
                {!previewUrl ? (
                    <motion.div
                        key="uploader"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                    >
                        <div
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={(e) => {
                                e.preventDefault();
                                const droppedFile = e.dataTransfer.files[0];
                                if (droppedFile?.type.startsWith('image/')) loadImage(droppedFile);
                            }}
                            onClick={() => fileInputRef.current?.click()}
                            className="group relative flex flex-col items-center justify-center border-2 border-dashed border-primary/20 rounded-[2.5rem] bg-muted/30 p-16 text-center cursor-pointer transition-all hover:bg-primary/[0.03] hover:border-primary/40 overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="mb-6 h-20 w-20 rounded-3xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                                <Shapes className="h-10 w-10 text-primary" />
                            </div>
                            <div className="space-y-4 relative z-10">
                                <h3 className="text-3xl font-black tracking-tight">Drop your image here</h3>
                                <p className="text-muted-foreground text-lg max-w-sm mx-auto leading-relaxed">
                                    Apply creative shapes and masks to your photos.
                                </p>
                                <Button className="mt-4 rounded-full px-8 h-12 text-lg font-bold shadow-xl shadow-primary/20">
                                    Choose Iamge
                                </Button>
                            </div>
                            <input type="file" className="hidden" ref={fileInputRef} onChange={handleFileChange} accept="image/*" />
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="editor"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="grid lg:grid-cols-2 gap-8"
                    >
                        <div className="space-y-4">
                            <div className="relative aspect-square rounded-3xl overflow-hidden border bg-checkered shadow-inner flex items-center justify-center p-8">
                                <img
                                    src={processedUrl || previewUrl}
                                    style={{ clipPath: processedUrl ? 'none' : selectedMask.path }}
                                    alt="Preview"
                                    className="max-w-full max-h-full object-cover rounded-lg shadow-2xl transition-all duration-300"
                                />
                                {isProcessing && (
                                    <div className="absolute inset-0 bg-background/60 backdrop-blur-sm flex items-center justify-center">
                                        <RefreshCw className="h-10 w-10 text-primary animate-spin" />
                                    </div>
                                )}
                            </div>
                            <Button variant="ghost" size="sm" onClick={() => { setPreviewUrl(null); setProcessedUrl(null); }} className="w-full text-destructive hover:bg-destructive/10">
                                <X className="h-4 w-4 mr-2" /> Start Over
                            </Button>
                        </div>

                        <div className="space-y-6">
                            <Card className="rounded-[2rem] border-primary/10 shadow-xl overflow-hidden glass-card">
                                <CardContent className="p-8 space-y-8">
                                    <div className="space-y-4">
                                        <h4 className="font-black text-xl uppercase tracking-tighter flex items-center gap-2">
                                            <Shapes className="h-5 w-5 text-primary" /> Choose Shape
                                        </h4>
                                        <div className="grid grid-cols-3 gap-3">
                                            {MASKS.map((mask) => (
                                                <button
                                                    key={mask.id}
                                                    onClick={() => { setSelectedMask(mask); setProcessedUrl(null); }}
                                                    className={cn(
                                                        "p-4 rounded-2xl border transition-all text-sm font-bold flex flex-col items-center gap-2 hover:bg-primary/5",
                                                        selectedMask.id === mask.id ? "border-primary bg-primary/10 text-primary" : "border-primary/10 text-muted-foreground"
                                                    )}
                                                >
                                                    <div className="h-8 w-8 bg-current opacity-20" style={{ clipPath: mask.path }} />
                                                    {mask.name}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="pt-4 space-y-4">
                                        {processedUrl ? (
                                            <Button
                                                className="w-full h-14 rounded-2xl text-lg font-bold shadow-xl shadow-primary/20 bg-green-500 hover:bg-green-600 transition-all"
                                                onClick={downloadImage}
                                            >
                                                <Download className="mr-2 h-6 w-6" /> Download Shape
                                            </Button>
                                        ) : (
                                            <Button
                                                className="w-full h-14 rounded-2xl text-lg font-bold shadow-xl shadow-primary/20"
                                                onClick={applyMask}
                                                disabled={isProcessing}
                                            >
                                                Apply Mask <ImageIcon className="ml-2 h-5 w-5" />
                                            </Button>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>

                            <div className="p-6 rounded-[2rem] bg-blue-500/5 border border-blue-500/10 flex gap-4 items-start">
                                <AlertCircle className="h-6 w-6 text-blue-500 shrink-0" />
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    Selected image will be cropped to a square and masked into your chosen shape locally in the browser.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
