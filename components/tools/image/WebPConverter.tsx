'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RefreshCw, Upload, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function WebPConverter() {
    const [image, setImage] = useState<string | null>(null);
    const [format, setFormat] = useState('png');
    const [isConverting, setIsConverting] = useState(false);

    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (event) => setImage(event.target?.result as string);
        reader.readAsDataURL(file);
    };

    const convertAction = () => {
        setIsConverting(true);
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx?.drawImage(img, 0, 0);

            const link = document.createElement('a');
            link.download = `converted-from-webp.${format}`;
            link.href = canvas.toDataURL(`image/${format === 'jpg' ? 'jpeg' : format}`);
            link.click();
            setIsConverting(false);
        };
        img.src = image!;
    };

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm overflow-hidden text-center">
            <CardHeader className="border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <RefreshCw className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">WebP to JPG/PNG</CardTitle>
                <p className="text-muted-foreground mt-2">Make modern WebP images compatible with legacy software and older platforms.</p>
            </CardHeader>
            <CardContent className="p-12 space-y-12">
                {!image ? (
                    <div
                        className="h-64 border-4 border-dashed border-primary/10 rounded-[3rem] flex flex-col items-center justify-center gap-4 cursor-pointer hover:bg-primary/5 transition-all"
                        onClick={() => document.getElementById('webp-upload')?.click()}
                    >
                        <Upload className="h-12 w-12 text-primary opacity-20" />
                        <p className="font-bold text-muted-foreground">Select WebP File</p>
                        <input id="webp-upload" type="file" accept="image/webp" className="hidden" onChange={handleUpload} />
                    </div>
                ) : (
                    <div className="space-y-12">
                        <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
                            <img src={image} className="w-64 h-auto rounded-3xl border-4 border-primary/5 shadow-2xl" alt="Preview" />

                            <div className="space-y-6 text-left">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-primary tracking-widest pl-2">Output Format</label>
                                    <Select value={format} onValueChange={setFormat}>
                                        <SelectTrigger className="h-14 w-48 rounded-2xl bg-muted/20 border-primary/10 text-lg font-bold">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="png">PNG (Lossless)</SelectItem>
                                            <SelectItem value="jpg">JPG (Compressed)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <Button size="lg" onClick={convertAction} disabled={isConverting} className="h-20 px-12 rounded-[2rem] font-black text-xl w-full shadow-2xl shadow-primary/20">
                                    {isConverting ? <RefreshCw className="animate-spin" /> : <Download className="mr-2" />}
                                    CONVERT
                                </Button>
                            </div>
                        </div>

                        <Button variant="ghost" onClick={() => setImage(null)} className="opacity-30">Change Image</Button>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
