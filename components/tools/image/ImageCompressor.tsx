'use client';

import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Minimize, Upload, Download, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

export default function ImageCompressor() {
    const [image, setImage] = useState<string | null>(null);
    const [quality, setQuality] = useState(0.8);
    const [originalSize, setOriginalSize] = useState(0);
    const [compressedSize, setCompressedSize] = useState(0);
    const [isProcessing, setIsProcessing] = useState(false);

    const canvasRef = useRef<HTMLCanvasElement>(null);

    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setOriginalSize(file.size);
        const reader = new FileReader();
        reader.onload = (event) => {
            setImage(event.target?.result as string);
            compress(event.target?.result as string, quality);
        };
        reader.readAsDataURL(file);
    };

    const compress = (dataUrl: string, q: number) => {
        setIsProcessing(true);
        const img = new Image();
        img.onload = () => {
            const canvas = canvasRef.current;
            if (!canvas) return;
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx?.drawImage(img, 0, 0);

            const compressed = canvas.toDataURL('image/jpeg', q);
            // Rough size estimate from base64
            setCompressedSize(Math.round((compressed.length - 'data:image/jpeg;base64,'.length) * 0.75));
            setIsProcessing(false);
        };
        img.src = dataUrl;
    };

    const download = () => {
        const link = document.createElement('a');
        link.download = 'compressed-image.jpg';
        link.href = canvasRef.current?.toDataURL('image/jpeg', quality) || '';
        link.click();
    };

    const formatSize = (bytes: number) => {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm overflow-hidden">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Minimize className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Smart Image Compressor</CardTitle>
                <p className="text-muted-foreground mt-2">Optimize your images for the web with real-time compression control.</p>
            </CardHeader>
            <CardContent className="p-12 space-y-12">
                {!image ? (
                    <div className="relative group cursor-pointer" onClick={() => document.getElementById('img-upload')?.click()}>
                        <div className="h-64 border-4 border-dashed border-primary/10 rounded-[3rem] flex flex-col items-center justify-center gap-4 group-hover:bg-primary/5 transition-all">
                            <Upload className="h-12 w-12 text-primary opacity-30 group-hover:scale-110 transition-transform" />
                            <p className="font-bold text-muted-foreground">Click to upload image (JPG/PNG)</p>
                        </div>
                        <input id="img-upload" type="file" accept="image/*" className="hidden" onChange={handleUpload} />
                    </div>
                ) : (
                    <div className="space-y-12">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                            <img src={image} className="w-full h-auto rounded-3xl border-4 border-primary/5 shadow-2xl" alt="Preview" />

                            <div className="space-y-8">
                                <div className="space-y-4">
                                    <div className="flex justify-between text-[10px] font-black uppercase text-primary tracking-widest">
                                        <span>Compression Quality</span>
                                        <span>{Math.round(quality * 100)}%</span>
                                    </div>
                                    <Slider
                                        value={[quality * 100]}
                                        onValueChange={(v) => {
                                            setQuality(v[0] / 100);
                                            compress(image, v[0] / 100);
                                        }}
                                        min={1} max={100}
                                    />
                                </div>

                                <div className="p-8 rounded-[2.5rem] bg-muted/10 border border-primary/5 space-y-4">
                                    <div className="flex justify-between items-center text-sm font-bold opacity-60">
                                        <span>Original</span>
                                        <span>{formatSize(originalSize)}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-lg font-black text-primary">
                                        <span>Compressed</span>
                                        <span>{formatSize(compressedSize)}</span>
                                    </div>
                                    <div className="pt-2">
                                        <div className="h-2 w-full bg-primary/10 rounded-full overflow-hidden">
                                            <div className="h-full bg-primary" style={{ width: `${(compressedSize / originalSize) * 100}%` }} />
                                        </div>
                                        <p className="text-[10px] font-black uppercase text-center mt-2 opacity-50">
                                            Saved {Math.max(0, Math.round((1 - compressedSize / originalSize) * 100))}%
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <Button size="lg" onClick={download} className="flex-1 h-20 rounded-[2rem] font-black text-xl shadow-2xl shadow-primary/20">
                                        <Download className="mr-2" /> DOWNLOAD
                                    </Button>
                                    <Button variant="outline" size="lg" onClick={() => setImage(null)} className="h-20 w-20 rounded-[2rem] border-2 border-primary/10">
                                        <RefreshCw />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <canvas ref={canvasRef} className="hidden" />
            </CardContent>
        </Card>
    );
}
