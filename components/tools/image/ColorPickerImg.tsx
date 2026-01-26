'use client';

import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Pipette, Upload, Copy, Check, Info, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ColorPickerImg() {
    const [image, setImage] = useState<string | null>(null);
    const [hex, setHex] = useState('#7c3aed');
    const [copied, setCopied] = useState(false);

    const canvasRef = useRef<HTMLCanvasElement>(null);

    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (event) => {
            setImage(event.target?.result as string);
            drawToCanvas(event.target?.result as string);
        };
        reader.readAsDataURL(file);
    };

    const drawToCanvas = (src: string) => {
        const img = new Image();
        img.onload = () => {
            const canvas = canvasRef.current;
            if (!canvas) return;
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx?.drawImage(img, 0, 0);
        };
        img.src = src;
    };

    const pickColor = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();
        const x = (e.clientX - rect.left) * (canvas.width / rect.width);
        const y = (e.clientY - rect.top) * (canvas.height / rect.height);

        const ctx = canvas.getContext('2d');
        const [r, g, b] = ctx!.getImageData(x, y, 1, 1).data;
        const newHex = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
        setHex(newHex);
    };

    const copyHex = () => {
        navigator.clipboard.writeText(hex.toUpperCase());
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <Card className="max-w-6xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm overflow-hidden text-center">
            <CardHeader className="border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Pipette className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Image Color Picker</CardTitle>
                <p className="text-muted-foreground mt-2">Upload any photo and extract exact color codes from your visual inspiration.</p>
            </CardHeader>
            <CardContent className="p-12 space-y-12">
                {!image ? (
                    <div
                        className="h-96 border-4 border-dashed border-primary/10 rounded-[4rem] flex flex-col items-center justify-center gap-6 cursor-pointer hover:bg-primary/5 transition-all group"
                        onClick={() => document.getElementById('picker-upload')?.click()}
                    >
                        <Upload className="h-12 w-12 text-primary opacity-20 group-hover:scale-110 transition-transform" />
                        <p className="font-bold text-muted-foreground">Select photo to pick colors</p>
                        <input id="picker-upload" type="file" accept="image/*" className="hidden" onChange={handleUpload} />
                    </div>
                ) : (
                    <div className="flex flex-col lg:flex-row gap-12 items-center">
                        <div className="relative group max-w-xl cursor-crosshair">
                            <canvas
                                ref={canvasRef}
                                onClick={pickColor}
                                className="w-full h-auto rounded-[3rem] shadow-4xl border-4 border-primary/5"
                            />
                            <div className="absolute -top-4 -right-4 bg-primary text-white p-4 rounded-2xl font-black text-xs shadow-xl animate-bounce">
                                CLICK TO PICK
                            </div>
                        </div>

                        <div className="flex-1 space-y-8 text-center">
                            <div
                                className="w-48 h-48 mx-auto rounded-[3rem] shadow-2xl transition-all duration-300 border-8 border-white"
                                style={{ backgroundColor: hex }}
                            />

                            <div className="space-y-4">
                                <h3 className="text-6xl font-black text-primary uppercase">{hex}</h3>
                                <div className="flex justify-center gap-4">
                                    <Button size="lg" onClick={copyHex} className="h-16 px-12 rounded-2xl font-black">
                                        {copied ? <Check className="mr-2 h-5 w-5" /> : <Copy className="mr-2 h-5 w-5" />}
                                        {copied ? 'COPIED' : 'COPY HEX'}
                                    </Button>
                                    <Button variant="outline" size="lg" onClick={() => setImage(null)} className="h-16 w-16 rounded-2xl">
                                        <RefreshCw />
                                    </Button>
                                </div>
                            </div>

                            <div className="p-6 rounded-2xl bg-muted/10 border border-primary/5 flex items-center gap-4 text-left">
                                <Info className="h-6 w-6 text-primary shrink-0" />
                                <p className="text-[10px] font-bold text-muted-foreground leading-relaxed">
                                    RGB: {parseInt(hex.slice(1, 3), 16)}, {parseInt(hex.slice(3, 5), 16)}, {parseInt(hex.slice(5, 7), 16)}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
