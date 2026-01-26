'use client';

import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, Download, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function FaviconGen() {
    const [image, setImage] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const sizes = [16, 32, 48, 64];

    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (event) => setImage(event.target?.result as string);
        reader.readAsDataURL(file);
    };

    const downloadSize = (size: number) => {
        if (!image) return;
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = size;
            canvas.height = size;
            const ctx = canvas.getContext('2d');
            ctx?.drawImage(img, 0, 0, size, size);

            const link = document.createElement('a');
            link.download = `favicon-${size}x${size}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
        };
        img.src = image;
    };

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm overflow-hidden text-center">
            <CardHeader className="border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Target className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Quick Favicon Gen</CardTitle>
                <p className="text-muted-foreground mt-2">Transform your brand logo into standard 16x16 and 32x32 web icons.</p>
            </CardHeader>
            <CardContent className="p-12 space-y-12">
                {!image ? (
                    <div
                        className="h-64 border-4 border-dashed border-primary/10 rounded-[3rem] flex flex-col items-center justify-center gap-4 cursor-pointer hover:bg-primary/5 transition-all"
                        onClick={() => document.getElementById('fav-upload')?.click()}
                    >
                        <Upload className="h-10 w-10 text-primary opacity-20" />
                        <p className="font-bold text-muted-foreground">Upload your high-res logo</p>
                        <input id="fav-upload" type="file" accept="image/*" className="hidden" onChange={handleUpload} />
                    </div>
                ) : (
                    <div className="space-y-12">
                        <div className="flex justify-center">
                            <img src={image} className="w-48 h-48 object-contain rounded-3xl border-4 border-primary/5 bg-white shadow-2xl p-4" alt="Original" />
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {sizes.map(size => (
                                <div key={size} className="p-6 rounded-[2.5rem] bg-background border-2 border-primary/5 flex flex-col items-center gap-4 group hover:border-primary/20 transition-all">
                                    <div className="bg-white p-2 rounded-lg shadow-inner border border-black/5" style={{ width: size + 16, height: size + 16, display: 'flex', alignItems: 'center', justifySelf: 'center' }}>
                                        <img src={image} className="mx-auto" style={{ width: size, height: size }} />
                                    </div>
                                    <p className="text-[10px] font-black uppercase opacity-40">{size}x{size}</p>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="rounded-xl w-full border-primary/10 hover:bg-primary hover:text-white"
                                        onClick={() => downloadSize(size)}
                                    >
                                        <Download className="h-4 w-4" />
                                    </Button>
                                </div>
                            ))}
                        </div>

                        <Button variant="ghost" onClick={() => setImage(null)} className="opacity-30">Change Image</Button>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
