'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Download, ShieldCheck, AlertCircle, RefreshCw, X, FileCheck, ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function MetadataCleaner() {
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isCleaned, setIsCleaned] = useState(false);
    const [processedUrl, setProcessedUrl] = useState<string | null>(null);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile && selectedFile.type.startsWith('image/')) {
            setFile(selectedFile);
            setPreviewUrl(URL.createObjectURL(selectedFile));
            setIsCleaned(false);
            setProcessedUrl(null);
        }
    };

    const cleanMetadata = async () => {
        if (!file) return;

        setIsProcessing(true);

        // The most reliable way to clean metadata in-browser is to re-draw the image on a canvas
        // This strips all EXIF/XMP/IPTC data since canvas only captures pixels.
        const img = new Image();
        img.src = previewUrl!;

        await new Promise(resolve => {
            img.onload = resolve;
        });

        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.drawImage(img, 0, 0);

        // Convert to data URL - canvas.toDataURL strips metadata
        const cleanedDataUrl = canvas.toDataURL(file.type);

        setProcessedUrl(cleanedDataUrl);
        setIsCleaned(true);
        setIsProcessing(false);
    };

    const downloadImage = () => {
        if (!processedUrl) return;
        const link = document.createElement('a');
        link.href = processedUrl;
        link.download = `private-${file?.name || 'cleaned-image'}`;
        link.click();
    };

    const reset = () => {
        setFile(null);
        setPreviewUrl(null);
        setIsCleaned(false);
        setProcessedUrl(null);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <AnimatePresence mode="wait">
                {!file ? (
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
                                if (droppedFile?.type.startsWith('image/')) {
                                    setFile(droppedFile);
                                    setPreviewUrl(URL.createObjectURL(droppedFile));
                                }
                            }}
                            onClick={() => fileInputRef.current?.click()}
                            className="group relative flex flex-col items-center justify-center border-2 border-dashed border-primary/20 rounded-[2.5rem] bg-muted/30 p-16 text-center cursor-pointer transition-all hover:bg-primary/[0.03] hover:border-primary/40 overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="mb-6 h-20 w-20 rounded-3xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                                <ShieldCheck className="h-10 w-10 text-primary" />
                            </div>
                            <div className="space-y-4 relative z-10">
                                <h3 className="text-3xl font-black tracking-tight">Protect Your Privacy</h3>
                                <p className="text-muted-foreground text-lg max-w-sm mx-auto leading-relaxed">
                                    Remove EXIF data, GPS location, and camera info from your photos instantly.
                                </p>
                                <Button className="mt-4 rounded-full px-8 h-12 text-lg font-bold shadow-xl shadow-primary/20">
                                    Upload Photo
                                </Button>
                            </div>
                            <input type="file" className="hidden" ref={fileInputRef} onChange={handleFileChange} accept="image/jpeg,image/png" />
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="results"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="grid lg:grid-cols-2 gap-8"
                    >
                        <div className="space-y-4">
                            <div className="relative aspect-auto rounded-3xl overflow-hidden border bg-checkered min-h-[300px] flex items-center justify-center p-4 shadow-inner">
                                <img src={previewUrl!} alt="Preview" className="max-w-full max-h-[500px] object-contain rounded-lg" />
                                <div className="absolute top-4 left-4 bg-background/80 backdrop-blur px-3 py-1 rounded-full text-xs font-bold border flex items-center gap-2">
                                    {isCleaned ? <FileCheck className="h-3 w-3 text-green-500" /> : <ShieldAlert className="h-3 w-3 text-amber-500" />}
                                    {isCleaned ? 'Metadata Removed' : 'Metadata Present'}
                                </div>
                            </div>
                            <Button variant="ghost" onClick={reset} className="w-full text-destructive hover:bg-destructive/10">
                                <X className="h-4 w-4 mr-2" /> Choose Another
                            </Button>
                        </div>

                        <div className="space-y-6">
                            <Card className="rounded-[2.5rem] border-primary/10 shadow-xl overflow-hidden glass-card">
                                <CardContent className="p-8 space-y-6">
                                    <h4 className="font-black text-2xl tracking-tighter uppercase flex items-center gap-2">
                                        <ShieldCheck className="h-6 w-6 text-primary" /> Privacy Guard
                                    </h4>

                                    <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                                        <p>
                                            Every photo you take contains hidden data:
                                        </p>
                                        <ul className="list-disc pl-5 space-y-1 font-medium">
                                            <li>GPS Coordinates (Exact location)</li>
                                            <li>Camera & Lens Model</li>
                                            <li>Exposure Settings (ISO, Shutter)</li>
                                            <li>Date and Time original</li>
                                        </ul>
                                        <p className="bg-primary/5 p-4 rounded-2xl border border-primary/10 text-primary font-bold">
                                            This tool creates a new copy of your image pixels while ignoring all header metadata.
                                        </p>
                                    </div>

                                    <div className="pt-4 space-y-4">
                                        {isCleaned ? (
                                            <Button
                                                className="w-full h-14 rounded-2xl bg-green-500 hover:bg-green-600 text-white font-bold text-lg shadow-xl shadow-green-500/20"
                                                onClick={downloadImage}
                                            >
                                                <Download className="mr-2 h-6 w-6" /> Download Privacy-Safe Copy
                                            </Button>
                                        ) : (
                                            <Button
                                                className="w-full h-14 rounded-2xl font-bold text-lg shadow-xl shadow-primary/20"
                                                onClick={cleanMetadata}
                                                disabled={isProcessing}
                                            >
                                                {isProcessing ? <RefreshCw className="mr-2 h-6 w-6 animate-spin" /> : <ShieldCheck className="mr-2 h-6 w-6" />}
                                                Clean All Metadata
                                            </Button>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>

                            <div className="p-6 rounded-[2rem] bg-blue-500/5 border border-blue-500/10 flex gap-4 items-start">
                                <AlertCircle className="h-6 w-6 text-blue-500 shrink-0" />
                                <p className="text-xs text-muted-foreground leading-relaxed">
                                    Your personal data is safe. This tool never uploads your files; the "cleaning" happens locally by rebuilding the image bit-by-bit in your current browser tab.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
