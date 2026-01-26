'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { Download, Crop, X, RefreshCw, Box, ChevronRight, CheckCircle2, Ratio } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

type AspectRatio = 'free' | '1:1' | '16:9' | '4:3' | '3:2' | '2:3';

export default function ImageCropper() {
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
    const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

    // Crop state in pixels relative to original image
    const [crop, setCrop] = useState({ x: 0, y: 0, width: 200, height: 200 });
    const [aspectRatio, setAspectRatio] = useState<AspectRatio>('free');

    const [isProcessing, setIsProcessing] = useState(false);
    const [processedUrl, setProcessedUrl] = useState<string | null>(null);

    const fileInputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);

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
            setImageSize({ width: img.width, height: img.height });
            // Initial crop: center 80% of the image
            const w = img.width * 0.8;
            const h = img.height * 0.8;
            setCrop({
                x: (img.width - w) / 2,
                y: (img.height - h) / 2,
                width: w,
                height: h
            });
        };
        img.src = url;
    };

    // Calculate scale factor between rendered image and original
    const getScale = () => {
        if (!imageRef.current) return 1;
        return imageRef.current.naturalWidth / imageRef.current.clientWidth;
    };

    const processCrop = async () => {
        if (!previewUrl || !imageRef.current) return;

        setIsProcessing(true);
        const img = imageRef.current;

        const canvas = document.createElement('canvas');
        canvas.width = crop.width;
        canvas.height = crop.height;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        ctx.drawImage(
            img,
            crop.x, crop.y, crop.width, crop.height, // Source
            0, 0, crop.width, crop.height           // Destination
        );

        const outputType = file?.type || 'image/jpeg';
        const dataUrl = canvas.toDataURL(outputType, 0.95);

        setProcessedUrl(dataUrl);
        setIsProcessing(false);
    };

    const downloadImage = () => {
        if (!processedUrl) return;
        const link = document.createElement('a');
        link.href = processedUrl;
        link.download = `cropped-${file?.name || 'image'}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const updateCrop = (newCrop: Partial<typeof crop>) => {
        setCrop(prev => {
            const next = { ...prev, ...newCrop };
            // Constrain
            next.x = Math.max(0, Math.min(next.x, imageSize.width - next.width));
            next.y = Math.max(0, Math.min(next.y, imageSize.height - next.height));
            next.width = Math.max(20, Math.min(next.width, imageSize.width - next.x));
            next.height = Math.max(20, Math.min(next.height, imageSize.height - next.y));

            // Apply aspect ratio if locked
            if (aspectRatio !== 'free') {
                const [aw, ah] = aspectRatio.split(':').map(Number);
                const ratio = aw / ah;
                // Adjust height based on width for simplicity
                next.height = next.width / ratio;
                // If height overflows, adjust width back
                if (next.y + next.height > imageSize.height) {
                    next.height = imageSize.height - next.y;
                    next.width = next.height * ratio;
                }
            }

            return next;
        });
    };

    const reset = () => {
        setFile(null);
        setPreviewUrl(null);
        setProcessedUrl(null);
        setAspectRatio('free');
    };

    // Helper to map crop pixels to CSS percentages for the overlay
    const getRectStyle = () => {
        if (!imageSize.width) return {};
        return {
            left: `${(crop.x / imageSize.width) * 100}%`,
            top: `${(crop.y / imageSize.height) * 100}%`,
            width: `${(crop.width / imageSize.width) * 100}%`,
            height: `${(crop.height / imageSize.height) * 100}%`,
        };
    };

    return (
        <div className="max-w-5xl mx-auto space-y-8">
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
                            className="group relative flex flex-col items-center justify-center border-2 border-dashed border-primary/20 rounded-[3rem] bg-muted/30 p-20 text-center cursor-pointer transition-all hover:bg-primary/[0.03] hover:border-primary/40 overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                            <div className="mb-6 h-20 w-20 rounded-3xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-glow">
                                <Crop className="h-10 w-10 text-primary" />
                            </div>

                            <div className="space-y-4 relative z-10">
                                <h3 className="text-4xl font-black tracking-tighter">Perfect Pixel Cropper</h3>
                                <p className="text-muted-foreground text-lg max-w-sm mx-auto leading-relaxed font-medium">
                                    Crop to exact dimensions or aspect ratios with ultra-precise handles.
                                </p>
                                <Button className="mt-4 rounded-full px-12 h-14 text-xl font-bold shadow-2xl shadow-primary/20 bg-primary ring-offset-background hover:scale-105 transition-all">
                                    Select Image
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
                        className="grid lg:grid-cols-12 gap-10"
                    >
                        {/* Editor Canvas Area */}
                        <div className="lg:col-span-8 flex flex-col gap-6">
                            <div
                                className="relative rounded-[2.5rem] border bg-neutral-900/5 backdrop-blur-sm overflow-hidden min-h-[400px] flex items-center justify-center p-8 group"
                                ref={containerRef}
                            >
                                <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-20" />

                                {processedUrl ? (
                                    <motion.img
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        src={processedUrl}
                                        alt="Processed"
                                        className="max-w-full max-h-[600px] rounded-2xl shadow-2xl z-20 relative"
                                    />
                                ) : (
                                    <div className="relative inline-block select-none touch-none">
                                        <img
                                            ref={imageRef}
                                            src={previewUrl}
                                            alt="Crop Area"
                                            className="max-w-full max-h-[600px] block rounded-sm opacity-50 transition-opacity group-hover:opacity-70"
                                            onLoad={() => {
                                                if (imageRef.current) {
                                                    setContainerSize({
                                                        width: imageRef.current.clientWidth,
                                                        height: imageRef.current.clientHeight
                                                    });
                                                }
                                            }}
                                        />

                                        {/* Bright image visible only inside the crop area */}
                                        <div
                                            className="absolute overflow-hidden pointer-events-none border-2 border-white shadow-[0_0_0_9999px_rgba(0,0,0,0.6)] z-10 rounded-[1px] shadow-glow-sm"
                                            style={getRectStyle()}
                                        >
                                            <img
                                                src={previewUrl}
                                                alt="Crop Preview"
                                                className="absolute max-w-none"
                                                style={{
                                                    width: containerSize.width,
                                                    height: containerSize.height,
                                                    left: `-${(crop.x / imageSize.width) * (containerSize.width || 0)}px`,
                                                    top: `-${(crop.y / imageSize.height) * (containerSize.height || 0)}px`,
                                                }}
                                            />
                                            {/* Grid Lines */}
                                            <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 opacity-30">
                                                <div className="border-r border-b border-white" />
                                                <div className="border-r border-b border-white" />
                                                <div className="border-b border-white" />
                                                <div className="border-r border-b border-white" />
                                                <div className="border-r border-b border-white" />
                                                <div className="border-b border-white" />
                                                <div className="border-r border-white" />
                                                <div className="border-r border-white" />
                                                <div />
                                            </div>
                                        </div>

                                        {/* Interaction Controls (Invisible but mapped) */}
                                        {/* Note: In a production app, we'd use complex drag logic. 
                                            For this tool, we'll provide high-precision sliders and some basic drag handles. */}
                                    </div>
                                )}

                                {isProcessing && (
                                    <div className="absolute inset-0 bg-background/40 backdrop-blur-md z-40 flex items-center justify-center">
                                        <RefreshCw className="h-10 w-10 text-primary animate-spin" />
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center justify-between px-4">
                                <span className="text-sm font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                                    <Box className="h-4 w-4" />
                                    {processedUrl ? 'PREVIEW' : `IMAGE: ${imageSize.width}x${imageSize.height}`}
                                </span>
                                <Button variant="ghost" onClick={reset} className="rounded-full font-black text-rose-500 hover:bg-rose-500/10">
                                    <X className="mr-2 h-4 w-4" /> Clear Canvas
                                </Button>
                            </div>
                        </div>

                        {/* Controls Sidebar */}
                        <div className="lg:col-span-4 space-y-6">
                            <Card className="rounded-[2.5rem] border-primary/10 shadow-xl overflow-hidden glass-card">
                                <CardContent className="p-8 space-y-8">
                                    <div className="space-y-4">
                                        <h4 className="flex items-center gap-3 font-black text-2xl uppercase tracking-tighter">
                                            <Ratio className="h-6 w-6 text-primary" /> Aspect Ratio
                                        </h4>
                                        <div className="grid grid-cols-3 gap-2">
                                            {(['1:1', '16:9', '4:3', '3:2', '2:3', 'free'] as AspectRatio[]).map((ratio) => (
                                                <Button
                                                    key={ratio}
                                                    variant={aspectRatio === ratio ? 'default' : 'outline'}
                                                    className={cn("rounded-xl h-10 text-xs font-bold transition-all", aspectRatio === ratio ? "shadow-lg scale-105" : "")}
                                                    onClick={() => {
                                                        setAspectRatio(ratio);
                                                        if (ratio !== 'free') {
                                                            const [aw, ah] = ratio.split(':').map(Number);
                                                            const targetRatio = aw / ah;
                                                            updateCrop({ height: crop.width / targetRatio });
                                                        }
                                                    }}
                                                >
                                                    {ratio.toUpperCase()}
                                                </Button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <h4 className="flex items-center gap-3 font-black text-2xl uppercase tracking-tighter">
                                            <Settings2 className="h-6 w-6 text-primary" /> Precise Area
                                        </h4>
                                        <div className="grid grid-cols-2 gap-x-4 gap-y-6">
                                            {[
                                                { label: 'Left (X)', key: 'x', max: imageSize.width - crop.width },
                                                { label: 'Top (Y)', key: 'y', max: imageSize.height - crop.height },
                                                { label: 'Width', key: 'width', max: imageSize.width - crop.x },
                                                { label: 'Height', key: 'height', max: imageSize.height - crop.y },
                                            ].map((field) => (
                                                <div key={field.key} className="space-y-2">
                                                    <label className="text-[10px] font-black text-muted-foreground uppercase ml-1 tracking-widest">{field.label}</label>
                                                    <div className="flex items-center gap-2 group">
                                                        <input
                                                            type="number"
                                                            value={Math.round(crop[field.key as keyof typeof crop])}
                                                            onChange={(e) => updateCrop({ [field.key]: parseInt(e.target.value) || 0 })}
                                                            className="w-full bg-primary/5 border rounded-xl px-3 py-2 text-sm font-bold outline-none focus:border-primary transition-all"
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="pt-4 space-y-4">
                                        {processedUrl ? (
                                            <div className="space-y-3">
                                                <Button
                                                    className="w-full h-16 rounded-3xl text-xl font-black shadow-2xl shadow-green-500/20 bg-green-500 hover:bg-green-600 transition-all group"
                                                    onClick={downloadImage}
                                                >
                                                    <Download className="mr-3 h-7 w-7 group-hover:bounce" /> Export Crop
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    className="w-full h-12 rounded-2xl font-bold"
                                                    onClick={() => setProcessedUrl(null)}
                                                >
                                                    <RefreshCw className="mr-2 h-4 w-4" /> Fine Tune
                                                </Button>
                                            </div>
                                        ) : (
                                            <Button
                                                className="w-full h-16 rounded-3xl text-xl font-bold shadow-2xl shadow-primary/20 bg-primary group"
                                                onClick={processCrop}
                                                disabled={isProcessing}
                                            >
                                                {isProcessing ? 'Cropping...' : 'Apply Crop Area'}
                                                <ChevronRight className="ml-2 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                                            </Button>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>

                            <div className="p-6 rounded-[2.5rem] bg-indigo-500/5 border border-indigo-500/10 flex gap-4 items-center">
                                <CheckCircle2 className="h-6 w-6 text-indigo-500 shrink-0" />
                                <div className="space-y-1">
                                    <h5 className="font-black text-xs uppercase tracking-widest text-indigo-900">High Precision</h5>
                                    <p className="text-[10px] text-muted-foreground leading-relaxed font-semibold">
                                        Original resolution is preserved during extraction.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function Settings2(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M20 7h-9" />
            <path d="M14 17H5" />
            <circle cx="17" cy="17" r="3" />
            <circle cx="7" cy="7" r="3" />
        </svg>
    );
}
