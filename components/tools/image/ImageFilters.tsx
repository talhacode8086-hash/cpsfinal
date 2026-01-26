'use client';

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sliders, Upload, Download, RefreshCw, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

export default function ImageFilters() {
    const [image, setImage] = useState<string | null>(null);
    const [grayscale, setGrayscale] = useState(0);
    const [sepia, setSepia] = useState(0);
    const [blur, setBlur] = useState(0);
    const [brightness, setBrightness] = useState(100);
    const [contrast, setContrast] = useState(100);
    const [hue, setHue] = useState(0);

    const filterStr = `grayscale(${grayscale}%) sepia(${sepia}%) blur(${blur}px) brightness(${brightness}%) contrast(${contrast}%) hue-rotate(${hue}deg)`;

    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (event) => setImage(event.target?.result as string);
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
                ctx.filter = filterStr;
                ctx.drawImage(img, 0, 0);
                const link = document.createElement('a');
                link.download = 'filtered-image.png';
                link.href = canvas.toDataURL();
                link.click();
            }
        };
        img.src = image!;
    };

    const reset = () => {
        setGrayscale(0);
        setSepia(0);
        setBlur(0);
        setBrightness(100);
        setContrast(100);
        setHue(0);
    };

    return (
        <Card className="max-w-6xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm overflow-hidden">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Sliders className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Image Filters Pro</CardTitle>
                <p className="text-muted-foreground mt-2">Enhanced photo manipulation tools with real-time hardware-accelerated previews.</p>
            </CardHeader>
            <CardContent className="p-0 flex flex-col lg:flex-row">
                {!image ? (
                    <div className="flex-1 p-24 flex items-center justify-center">
                        <Button onClick={() => document.getElementById('filter-upload')?.click()} className="h-32 w-80 rounded-[3rem] text-2xl font-black">
                            <Upload className="mr-4 h-8 w-8" /> UPLOAD PHOTO
                        </Button>
                        <input id="filter-upload" type="file" accept="image/*" className="hidden" onChange={handleUpload} />
                    </div>
                ) : (
                    <>
                        {/* Controls */}
                        <div className="w-full lg:w-80 bg-muted/5 p-8 border-b lg:border-b-0 lg:border-r border-primary/5 space-y-8 h-full overflow-y-auto max-h-[700px]">
                            <FilterSlider label="Brightness" value={brightness} max={200} onChange={setBrightness} unit="%" />
                            <FilterSlider label="Contrast" value={contrast} max={200} onChange={setContrast} unit="%" />
                            <FilterSlider label="Grayscale" value={grayscale} max={100} onChange={setGrayscale} unit="%" />
                            <FilterSlider label="Sepia" value={sepia} max={100} onChange={setSepia} unit="%" />
                            <FilterSlider label="Blur" value={blur} max={20} onChange={setBlur} unit="px" />
                            <FilterSlider label="Hue Rotate" value={hue} max={360} onChange={setHue} unit="deg" />

                            <div className="pt-8 border-t border-primary/5 flex gap-4">
                                <Button variant="outline" onClick={reset} className="flex-1 h-12 rounded-xl font-bold"><RefreshCw className="mr-2 h-4 w-4" /> Reset</Button>
                            </div>
                        </div>

                        {/* Preview */}
                        <div className="flex-1 p-12 flex flex-col items-center justify-center bg-[url('https://www.transparenttextures.com/patterns/black-linen.png')] relative">
                            <div className="relative group max-w-full">
                                <img
                                    src={image}
                                    style={{ filter: filterStr }}
                                    className="max-h-[500px] w-auto rounded-[2.5rem] shadow-4xl border-4 border-white/10 transition-all duration-300"
                                    alt="Filter Preview"
                                />
                                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-[2.5rem] flex items-center justify-center pointer-events-none">
                                    <Layers className="h-12 w-12 text-primary animate-pulse" />
                                </div>
                            </div>

                            <div className="mt-12 flex gap-4">
                                <Button size="lg" onClick={download} className="h-16 px-12 rounded-2xl font-black shadow-xl shadow-primary/20">
                                    <Download className="mr-2 h-6 w-6" /> SAVE ENHANCED IMAGE
                                </Button>
                                <Button variant="outline" size="lg" onClick={() => setImage(null)} className="h-16 w-16 rounded-2xl border-2 border-primary/10">
                                    <RefreshCw className="h-6 w-6" />
                                </Button>
                            </div>
                        </div>
                    </>
                )}
            </CardContent>
        </Card>
    );
}

function FilterSlider({ label, value, max, unit, onChange }: any) {
    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center text-[10px] font-black uppercase text-primary/60">
                <span>{label}</span>
                <span>{value}{unit}</span>
            </div>
            <Slider value={[value]} onValueChange={(v) => onChange(v[0])} max={max} step={1} />
        </div>
    );
}
