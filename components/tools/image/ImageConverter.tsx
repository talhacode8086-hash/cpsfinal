'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Download, RefreshCw, X, ArrowRightLeft, CheckCircle2, FileType, Zap, Scale } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';

interface ImageConverterProps {
    mode: 'jpg-to-png' | 'png-to-jpg';
}

export default function ImageConverter({ mode }: ImageConverterProps) {
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [processedUrl, setProcessedUrl] = useState<string | null>(null);
    const [quality, setQuality] = useState(90);
    const [stats, setStats] = useState({ original: 0, processed: 0 });

    const fileInputRef = useRef<HTMLInputElement>(null);
    const targetFormat = mode === 'jpg-to-png' ? 'PNG' : 'JPG';
    const sourceFormat = mode === 'jpg-to-png' ? 'JPG' : 'PNG';

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile && selectedFile.type.startsWith('image/')) {
            loadImage(selectedFile);
        }
    };

    const loadImage = (selectedFile: File) => {
        setFile(selectedFile);
        setStats({ original: selectedFile.size, processed: 0 });
        const url = URL.createObjectURL(selectedFile);
        setPreviewUrl(url);
        setProcessedUrl(null);
    };

    const processImage = async () => {
        if (!previewUrl) return;

        setIsProcessing(true);
        const img = new Image();
        img.src = previewUrl;

        await new Promise(resolve => {
            img.onload = resolve;
        });

        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        if (mode === 'png-to-jpg') {
            // Fill background with white for JPG if there's transparency
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        ctx.drawImage(img, 0, 0);

        const outputMime = mode === 'jpg-to-png' ? 'image/png' : 'image/jpeg';
        const dataUrl = canvas.toDataURL(outputMime, mode === 'png-to-jpg' ? quality / 100 : 1);

        setProcessedUrl(dataUrl);

        // Calculate output size (approximate from base64)
        const head = mode === 'jpg-to-png' ? 'data:image/png;base64,' : 'data:image/jpeg;base64,';
        const sizeInBytes = Math.round((dataUrl.length - head.length) * 3 / 4);
        setStats(prev => ({ ...prev, processed: sizeInBytes }));

        setIsProcessing(false);
    };

    const downloadImage = () => {
        if (!processedUrl) return;
        const link = document.createElement('a');
        link.href = processedUrl;
        const extension = targetFormat.toLowerCase();
        const baseName = file?.name.substring(0, file.name.lastIndexOf('.')) || 'image';
        link.download = `${baseName}.${extension}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const formatSize = (bytes: number) => {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const reset = () => {
        setFile(null);
        setPreviewUrl(null);
        setProcessedUrl(null);
        setStats({ original: 0, processed: 0 });
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <AnimatePresence mode="wait">
                {!previewUrl ? (
                    <motion.div
                        key="uploader"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
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

                            <div className="mb-6 flex items-center justify-center gap-4">
                                <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center font-black text-primary text-xl">
                                    {sourceFormat}
                                </div>
                                <ArrowRightLeft className="h-8 w-8 text-primary shadow-glow" />
                                <div className="h-16 w-16 rounded-2xl bg-primary flex items-center justify-center font-black text-primary-foreground text-xl shadow-lg shadow-primary/20">
                                    {targetFormat}
                                </div>
                            </div>

                            <div className="space-y-4 relative z-10">
                                <h3 className="text-3xl font-black tracking-tight">Convert {sourceFormat} to {targetFormat}</h3>
                                <p className="text-muted-foreground text-lg max-w-sm mx-auto leading-relaxed">
                                    Fast, secure, and preserves quality. No limits, works entirely in your browser.
                                </p>
                                <Button className="mt-4 rounded-full px-8 h-12 text-lg font-bold shadow-xl shadow-primary/20">
                                    Upload Image
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
                        key="converter"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="grid lg:grid-cols-2 gap-8"
                    >
                        <div className="space-y-6">
                            <div className="relative aspect-square rounded-[3rem] overflow-hidden border bg-muted/30 p-8 flex items-center justify-center shadow-inner group">
                                <img
                                    src={processedUrl || previewUrl}
                                    alt="Preview"
                                    className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl transition-transform duration-500 group-hover:scale-105"
                                />
                                {isProcessing && (
                                    <div className="absolute inset-0 bg-background/60 backdrop-blur-sm flex items-center justify-center">
                                        <div className="flex flex-col items-center gap-4">
                                            <RefreshCw className="h-12 w-12 text-primary animate-spin" />
                                            <span className="font-black">CONVERTING...</span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="flex gap-4">
                                <Card className="flex-1 rounded-3xl border-primary/5 bg-primary/[0.02] p-4 text-center">
                                    <div className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Original {sourceFormat}</div>
                                    <div className="font-black text-lg">{formatSize(stats.original)}</div>
                                </Card>
                                {stats.processed > 0 && (
                                    <Card className="flex-1 rounded-3xl border-green-500/20 bg-green-500/5 p-4 text-center">
                                        <div className="text-[10px] font-bold text-green-600/70 uppercase mb-1">Converted {targetFormat}</div>
                                        <div className="font-black text-lg text-green-600">{formatSize(stats.processed)}</div>
                                    </Card>
                                )}
                            </div>
                        </div>

                        <div className="space-y-6">
                            <Card className="rounded-[2.5rem] border-primary/10 shadow-2xl overflow-hidden glass-card">
                                <CardContent className="p-10 space-y-8">
                                    <div className="space-y-4">
                                        <h4 className="flex items-center gap-3 font-black text-2xl uppercase tracking-tighter">
                                            <FileType className="h-6 w-6 text-primary" /> Conversion Settings
                                        </h4>
                                        <p className="text-muted-foreground">
                                            Converting from <span className="font-bold text-foreground">{file?.type.split('/')[1].toUpperCase()}</span>
                                            to <span className="font-bold text-primary">{targetFormat}</span>
                                        </p>
                                    </div>

                                    {mode === 'png-to-jpg' && (
                                        <div className="space-y-6">
                                            <div className="flex justify-between items-center">
                                                <h5 className="font-bold text-sm uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                                                    <Zap className="h-4 w-4 text-primary" /> Output Quality
                                                </h5>
                                                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-black text-sm">{quality}%</span>
                                            </div>
                                            <Slider
                                                defaultValue={[quality]}
                                                max={100}
                                                step={1}
                                                onValueChange={(val) => setQuality(val[0])}
                                            />
                                        </div>
                                    )}

                                    {mode === 'jpg-to-png' && (
                                        <div className="p-6 rounded-3xl bg-blue-500/5 border border-blue-500/10 flex gap-3">
                                            <CheckCircle2 className="h-5 w-5 text-blue-500 shrink-0" />
                                            <p className="text-sm text-muted-foreground leading-relaxed">
                                                Transparency detected in source will be preserved in the PNG output.
                                            </p>
                                        </div>
                                    )}

                                    <div className="pt-4 space-y-4">
                                        {processedUrl ? (
                                            <div className="space-y-4">
                                                <Button
                                                    className="w-full h-16 rounded-[1.5rem] text-xl font-bold shadow-2xl shadow-primary/20 group relative overflow-hidden"
                                                    onClick={downloadImage}
                                                >
                                                    <div className="absolute inset-0 bg-gradient-to-r from-primary via-blue-500 to-primary bg-[length:200%_100%] animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity" />
                                                    <span className="relative flex items-center justify-center">
                                                        <Download className="mr-3 h-7 w-7" /> Download {targetFormat}
                                                    </span>
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    className="w-full h-12 rounded-2xl font-bold text-muted-foreground"
                                                    onClick={reset}
                                                >
                                                    <X className="mr-2 h-4 w-4" /> Start Over
                                                </Button>
                                            </div>
                                        ) : (
                                            <Button
                                                className="w-full h-16 rounded-[1.5rem] text-xl font-bold shadow-xl shadow-primary/20"
                                                onClick={processImage}
                                                disabled={isProcessing}
                                            >
                                                {isProcessing ? 'Converting...' : `Convert to ${targetFormat} Now`}
                                                <ArrowRightLeft className="ml-3 h-6 w-6" />
                                            </Button>
                                        )}
                                    </div>

                                    <div className="flex items-center gap-3 text-xs text-muted-foreground font-medium pt-2">
                                        <Scale className="h-4 w-4" />
                                        <span>No file size limits. All work is done locally.</span>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
