'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Download, Maximize, AlertCircle, RefreshCw, Lock, X, Settings2, ArrowRightLeft, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';

export default function ImageResizer() {
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [originalSize, setOriginalSize] = useState({ width: 0, height: 0 });
    const [newSize, setNewSize] = useState({ width: 0, height: 0 });
    const [maintainAspectRatio, setMaintainAspectRatio] = useState(true);
    const [quality, setQuality] = useState(90);
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

        const img = new Image();
        img.onload = () => {
            setOriginalSize({ width: img.width, height: img.height });
            setNewSize({ width: img.width, height: img.height });
        };
        img.src = url;
    };

    const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const width = parseInt(e.target.value) || 0;
        if (maintainAspectRatio && originalSize.width > 0) {
            const ratio = originalSize.height / originalSize.width;
            setNewSize({ width, height: Math.round(width * ratio) });
        } else {
            setNewSize(prev => ({ ...prev, width }));
        }
    };

    const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const height = parseInt(e.target.value) || 0;
        if (maintainAspectRatio && originalSize.height > 0) {
            const ratio = originalSize.width / originalSize.height;
            setNewSize({ height, width: Math.round(height * ratio) });
        } else {
            setNewSize(prev => ({ ...prev, height }));
        }
    };

    const processImage = async () => {
        if (!previewUrl || newSize.width === 0 || newSize.height === 0) return;

        setIsProcessing(true);
        const img = new Image();
        img.src = previewUrl;

        await new Promise(resolve => {
            img.onload = resolve;
        });

        const canvas = document.createElement('canvas');
        canvas.width = newSize.width;
        canvas.height = newSize.height;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, newSize.width, newSize.height);

        const outputType = file?.type || 'image/jpeg';
        const dataUrl = canvas.toDataURL(outputType, quality / 100);

        setProcessedUrl(dataUrl);
        setIsProcessing(false);
    };

    const downloadImage = () => {
        if (!processedUrl) return;
        const link = document.createElement('a');
        link.href = processedUrl;
        link.download = `resized-${file?.name || 'image'}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const reset = () => {
        setFile(null);
        setPreviewUrl(null);
        setProcessedUrl(null);
        setOriginalSize({ width: 0, height: 0 });
        setNewSize({ width: 0, height: 0 });
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
                                <Upload className="h-10 w-10 text-primary" />
                            </div>

                            <div className="space-y-4 relative z-10">
                                <h3 className="text-3xl font-black tracking-tight">Drop your image here</h3>
                                <p className="text-muted-foreground text-lg max-w-sm mx-auto leading-relaxed">
                                    Upload JPG, PNG, or WebP to resize instantly. 100% private, runs entirely in your browser.
                                </p>
                                <Button className="mt-4 rounded-full px-8 h-12 text-lg font-bold shadow-xl shadow-primary/20">
                                    Choose File
                                </Button>
                            </div>

                            <input
                                type="file"
                                className="hidden"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                accept="image/*"
                            />
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="editor"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="grid lg:grid-cols-2 gap-8"
                    >
                        {/* Preview Area */}
                        <div className="space-y-4">
                            <div className="relative aspect-auto rounded-3xl overflow-hidden border bg-checkered shadow-inner min-h-[300px] flex items-center justify-center p-4">
                                <img
                                    src={processedUrl || previewUrl}
                                    alt="Preview"
                                    className="max-w-full max-h-[500px] object-contain rounded-lg shadow-2xl"
                                />
                                {isProcessing && (
                                    <div className="absolute inset-0 bg-background/60 backdrop-blur-sm flex items-center justify-center">
                                        <div className="flex flex-col items-center gap-4">
                                            <RefreshCw className="h-10 w-10 text-primary animate-spin" />
                                            <span className="font-bold text-lg">Processing...</span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center justify-between px-2">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
                                    <ImageIcon className="h-4 w-4" />
                                    <span>Original: {originalSize.width} × {originalSize.height} px</span>
                                </div>
                                <Button variant="ghost" size="sm" onClick={reset} className="rounded-full text-destructive hover:bg-destructive/10">
                                    <X className="h-4 w-4 mr-2" /> Remove Image
                                </Button>
                            </div>
                        </div>

                        {/* Controls Area */}
                        <div className="space-y-6">
                            <Card className="rounded-[2rem] border-primary/10 shadow-xl overflow-hidden glass-card">
                                <CardContent className="p-8 space-y-8">
                                    <div className="space-y-4">
                                        <h4 className="flex items-center gap-2 font-black text-xl mb-4 uppercase tracking-tighter">
                                            <Maximize className="h-5 w-5 text-primary" /> Dimensions
                                        </h4>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-muted-foreground uppercase ml-1">Width (px)</label>
                                                <Input
                                                    type="number"
                                                    value={newSize.width}
                                                    onChange={handleWidthChange}
                                                    className="h-12 rounded-2xl border-primary/20 font-bold text-lg"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-muted-foreground uppercase ml-1">Height (px)</label>
                                                <Input
                                                    type="number"
                                                    value={newSize.height}
                                                    onChange={handleHeightChange}
                                                    className="h-12 rounded-2xl border-primary/20 font-bold text-lg"
                                                />
                                            </div>
                                        </div>

                                        <Button
                                            variant="outline"
                                            className={cn(
                                                "w-full rounded-2xl h-12 transition-all gap-2",
                                                maintainAspectRatio ? "bg-primary/5 border-primary text-primary" : ""
                                            )}
                                            onClick={() => setMaintainAspectRatio(!maintainAspectRatio)}
                                        >
                                            <Lock className={cn("h-4 w-4", maintainAspectRatio ? "fill-current" : "")} />
                                            Maintain Aspect Ratio
                                        </Button>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="flex justify-between items-center mb-2">
                                            <h4 className="flex items-center gap-2 font-black text-xl uppercase tracking-tighter">
                                                <Settings2 className="h-5 w-5 text-primary" /> Options
                                            </h4>
                                            <span className="text-sm font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">{quality}% Quality</span>
                                        </div>
                                        <Slider
                                            defaultValue={[quality]}
                                            max={100}
                                            step={1}
                                            onValueChange={(val) => setQuality(val[0])}
                                            className="py-4"
                                        />
                                        <p className="text-xs text-muted-foreground italic leading-relaxed">
                                            Note: For PNG files, quality primarily affects internal compression level.
                                        </p>
                                    </div>

                                    <div className="pt-4 space-y-4">
                                        {processedUrl ? (
                                            <Button
                                                className="w-full h-14 rounded-2xl text-lg font-bold shadow-xl shadow-primary/20 bg-green-500 hover:bg-green-600 transition-all"
                                                onClick={downloadImage}
                                            >
                                                <Download className="mr-2 h-6 w-6" /> Download Image
                                            </Button>
                                        ) : (
                                            <Button
                                                className="w-full h-14 rounded-2xl text-lg font-bold shadow-xl shadow-primary/20"
                                                onClick={processImage}
                                                disabled={isProcessing}
                                            >
                                                Resize Image Now <ArrowRightLeft className="ml-2 h-5 w-5" />
                                            </Button>
                                        )}

                                        {processedUrl && (
                                            <Button
                                                variant="ghost"
                                                className="w-full h-12 rounded-2xl font-bold"
                                                onClick={() => setProcessedUrl(null)}
                                            >
                                                <RefreshCw className="mr-2 h-4 w-4" /> Start Over
                                            </Button>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>

                            <div className="p-6 rounded-[2rem] bg-blue-500/5 border border-blue-500/10 flex gap-4 items-start">
                                <AlertCircle className="h-6 w-6 text-blue-500 shrink-0" />
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    Your image is processed locally using the canvas API. No files are uploaded to any server, keeping your data secure and private.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
