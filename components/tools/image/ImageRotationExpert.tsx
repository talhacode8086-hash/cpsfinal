'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, Download, RotateCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

export default function ImageRotate() {
    const [image, setImage] = useState<string | null>(null);
    const [rotation, setRotation] = useState(0);

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
            const angle = (rotation * Math.PI) / 180;
            const sin = Math.abs(Math.sin(angle));
            const cos = Math.abs(Math.cos(angle));

            canvas.width = img.width * cos + img.height * sin;
            canvas.height = img.width * sin + img.height * cos;

            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.translate(canvas.width / 2, canvas.height / 2);
                ctx.rotate(angle);
                ctx.drawImage(img, -img.width / 2, -img.height / 2);

                const link = document.createElement('a');
                link.download = 'rotated-image.png';
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
                    <RotateCw className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Exact Image Rotator</CardTitle>
                <p className="text-muted-foreground mt-2">Rotate images by precise degrees or standard 90/180 angles with lossless re-encoding.</p>
            </CardHeader>
            <CardContent className="p-12 space-y-12">
                {!image ? (
                    <div
                        className="h-80 border-4 border-dashed border-primary/10 rounded-[4rem] flex flex-col items-center justify-center gap-6 cursor-pointer hover:bg-primary/5 transition-all group"
                        onClick={() => document.getElementById('rot-upload')?.click()}
                    >
                        <Upload className="h-12 w-12 text-primary opacity-20 group-hover:scale-110 transition-transform" />
                        <p className="text-xl font-bold">Select image to rotate</p>
                        <input id="rot-upload" type="file" accept="image/*" className="hidden" onChange={handleUpload} />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="relative p-12 bg-muted/20 border-2 border-primary/5 rounded-[4rem] min-h-[400px] flex items-center justify-center overflow-hidden">
                            <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/graphy.png')]" />
                            <img
                                src={image}
                                className="max-h-[400px] w-auto transition-transform duration-300 shadow-4xl rounded-2xl"
                                style={{ transform: `rotate(${rotation}deg)` }}
                                alt="Rotation Preview"
                            />
                        </div>

                        <div className="space-y-12 text-left">
                            <div className="space-y-6">
                                <div className="flex justify-between items-center text-[10px] font-black uppercase text-primary tracking-widest">
                                    <span>Rotation Control</span>
                                    <span className="text-2xl">{rotation}°</span>
                                </div>
                                <Slider value={[rotation]} onValueChange={(v) => setRotation(v[0])} min={-180} max={180} step={1} className="h-4" />
                                <div className="grid grid-cols-5 text-[8px] font-bold opacity-30 px-1">
                                    <span>-180°</span><span>-90°</span><span className="text-center">0°</span><span className="text-right">90°</span><span className="text-right">180°</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                                {[-90, 0, 90].map(deg => (
                                    <Button key={deg} variant="outline" onClick={() => setRotation(deg)} className="h-16 rounded-2xl font-black">
                                        {deg === 0 ? 'RESET' : deg + '°'}
                                    </Button>
                                ))}
                            </div>

                            <div className="pt-8">
                                <Button size="lg" onClick={download} className="w-full h-24 rounded-[3rem] font-black text-2xl shadow-3xl shadow-primary/20">
                                    <Download className="mr-4 h-8 w-8" /> DOWNLOAD RESULT
                                </Button>
                                <Button variant="ghost" onClick={() => { setImage(null); setRotation(0); }} className="w-full opacity-30 mt-4">Upload Different Photo</Button>
                            </div>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
