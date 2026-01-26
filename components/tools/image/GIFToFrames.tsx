'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, Download, RefreshCw, Film } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function GIFToFrames() {
    const [image, setImage] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);

    // Mocking frames for UI demonstration
    const frames = [1, 2, 3, 4, 5, 6, 7, 8];

    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (event) => {
            setImage(event.target?.result as string);
            setIsProcessing(true);
            setTimeout(() => setIsProcessing(false), 2000); // Simulate processing
        };
        reader.readAsDataURL(file);
    };

    return (
        <Card className="max-w-6xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm overflow-hidden text-center">
            <CardHeader className="border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Film className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">GIF to Frames Extractor</CardTitle>
                <p className="text-muted-foreground mt-2">Deconstruct animated GIFs into individual static frames for analysis or salvage.</p>
            </CardHeader>
            <CardContent className="p-12 space-y-12">
                {!image ? (
                    <div
                        className="h-64 border-4 border-dashed border-primary/10 rounded-[3rem] flex flex-col items-center justify-center gap-4 cursor-pointer hover:bg-primary/5 transition-all"
                        onClick={() => document.getElementById('gif-upload')?.click()}
                    >
                        <Upload className="h-10 w-10 text-primary opacity-20" />
                        <p className="font-bold text-muted-foreground">Upload Animated GIF</p>
                        <input id="gif-upload" type="file" accept="image/gif" className="hidden" onChange={handleUpload} />
                    </div>
                ) : (
                    <div className="space-y-12">
                        <div className="flex justify-center flex-col items-center gap-6">
                            <img src={image} className="w-64 h-auto rounded-3xl border-4 border-primary/5 shadow-2xl" alt="Original GIF" />
                            {isProcessing && <div className="flex items-center gap-2 text-primary font-bold animate-pulse"><RefreshCw className="animate-spin" /> Extracting Frames...</div>}
                        </div>

                        {!isProcessing && (
                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
                                {frames.map(f => (
                                    <div key={f} className="group relative aspect-square bg-white border border-primary/5 rounded-2xl overflow-hidden hover:scale-105 transition-all shadow-lg cursor-pointer">
                                        <div className="absolute inset-0 bg-primary/5 group-hover:bg-transparent" />
                                        <img src={image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all opacity-50 group-hover:opacity-100" />
                                        <div className="absolute bottom-2 right-2 text-[8px] font-black text-white bg-black/50 px-2 py-0.5 rounded-full">FRAME {f}</div>
                                        <button className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Download className="text-white h-6 w-6 drop-shadow-md" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                        <Button variant="ghost" onClick={() => setImage(null)} className="opacity-30">Upload New GIF</Button>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
