'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeftRight, Upload, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ImageMirror() {
    const [image, setImage] = useState<string | null>(null);
    const [flippedH, setFlippedH] = useState(false);
    const [flippedV, setFlippedV] = useState(false);

    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => setImage(ev.target?.result as string);
        reader.readAsDataURL(file);
    };

    const download = () => {
        const canvas = document.createElement('canvas');
        const img = new Image();
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.translate(flippedH ? canvas.width : 0, flippedV ? canvas.height : 0);
                ctx.scale(flippedH ? -1 : 1, flippedV ? -1 : 1);
                ctx.drawImage(img, 0, 0);
                const link = document.createElement('a');
                link.download = 'mirrored-image.png';
                link.href = canvas.toDataURL();
                link.click();
            }
        };
        img.src = image!;
    };

    return (
        <Card className="max-w-6xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm overflow-hidden text-center">
            <CardHeader className="border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <ArrowLeftRight className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Image Mirror Tool</CardTitle>
                <p className="text-muted-foreground mt-2">Instantly flip your graphics horizontally or vertically with a single click.</p>
            </CardHeader>
            <CardContent className="p-12 space-y-12">
                {!image ? (
                    <div
                        className="h-80 border-4 border-dashed border-primary/10 rounded-[4rem] flex flex-col items-center justify-center gap-6 cursor-pointer hover:bg-primary/5 transition-all group"
                        onClick={() => document.getElementById('mir-upload')?.click()}
                    >
                        <Upload className="h-12 w-12 text-primary opacity-20" />
                        <p className="text-xl font-bold">Select image to flip</p>
                        <input id="mir-upload" type="file" accept="image/*" className="hidden" onChange={handleUpload} />
                    </div>
                ) : (
                    <div className="flex flex-col lg:flex-row gap-16 items-center justify-center">
                        <div className="relative overflow-hidden rounded-[4rem] shadow-4xl border-4 border-primary/5">
                            <img
                                src={image}
                                className="max-h-[500px] w-auto transition-transform duration-500"
                                style={{ transform: `scaleX(${flippedH ? -1 : 1}) scaleY(${flippedV ? -1 : 1})` }}
                                alt="Mirror Preview"
                            />
                            <div className="absolute top-6 left-6 flex gap-2">
                                {flippedH && <div className="bg-primary text-white p-2 rounded-xl text-[8px] font-black">HORIZONTALLY FLIPPED</div>}
                                {flippedV && <div className="bg-amber-500 text-white p-2 rounded-xl text-[8px] font-black">VERTICALLY FLIPPED</div>}
                            </div>
                        </div>

                        <div className="w-full lg:w-80 space-y-4">
                            <Button
                                variant={flippedH ? "default" : "outline"}
                                onClick={() => setFlippedH(!flippedH)}
                                className="w-full h-20 rounded-[2.5rem] font-black text-lg border-2"
                            >
                                <ArrowLeftRight className="mr-2" /> FLIP HORIZONTAL
                            </Button>
                            <Button
                                variant={flippedV ? "default" : "outline"}
                                onClick={() => setFlippedV(!flippedV)}
                                className="w-full h-20 rounded-[2.5rem] font-black text-lg border-2"
                            >
                                <div className="rotate-90"><ArrowLeftRight className="mr-2" /></div> FLIP VERTICAL
                            </Button>
                            <div className="pt-8">
                                <Button size="lg" onClick={download} className="w-full h-20 rounded-[2.5rem] font-black text-xl shadow-3xl shadow-primary/20">
                                    <Download className="mr-2" /> EXPORT FINAL
                                </Button>
                                <Button variant="ghost" onClick={() => setImage(null)} className="w-full opacity-30 mt-4">Change Photo</Button>
                            </div>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
