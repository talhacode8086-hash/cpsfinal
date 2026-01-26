'use client';

import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RefreshCw, Download, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function SVGToPNG() {
    const [svgData, setSvgData] = useState('');
    const [width, setWidth] = useState(1024);
    const [isConverting, setIsConverting] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const convert = () => {
        if (!svgData) return;
        setIsConverting(true);

        const img = new Image();
        const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
        const url = URL.createObjectURL(svgBlob);

        img.onload = () => {
            const canvas = canvasRef.current;
            if (!canvas) return;
            const aspect = img.width / img.height;
            canvas.width = width;
            canvas.height = width / aspect;

            const ctx = canvas.getContext('2d');
            ctx?.clearRect(0, 0, canvas.width, canvas.height);
            ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);

            setIsConverting(false);
            URL.revokeObjectURL(url);
        };
        img.src = url;
    };

    const download = () => {
        const link = document.createElement('a');
        link.download = 'vector-export.png';
        link.href = canvasRef.current?.toDataURL('image/png') || '';
        link.click();
    };

    return (
        <Card className="max-w-6xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm overflow-hidden text-center">
            <CardHeader className="border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <RefreshCw className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">SVG to PNG Converter</CardTitle>
                <p className="text-muted-foreground mt-2">Convert scalable vector graphics into high-resolution transparent PNG images.</p>
            </CardHeader>
            <CardContent className="p-12 space-y-12">
                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="flex-1 space-y-6 text-left">
                        <label className="text-[10px] font-black uppercase text-primary tracking-widest pl-2">Paste SVG Code</label>
                        <textarea
                            value={svgData}
                            onChange={(e) => setSvgData(e.target.value)}
                            className="w-full h-80 p-6 rounded-[2.5rem] bg-muted/20 border-2 border-primary/10 font-mono text-xs resize-none focus:border-primary/40 outline-none transition-all"
                            placeholder='<svg xmlns="http://www.w3.org/2000/svg" ... >'
                        />
                        <div className="flex gap-4">
                            <div className="flex-1 space-y-2">
                                <label className="text-[10px] font-black uppercase opacity-40">Target Width (PX)</label>
                                <Input type="number" value={width} onChange={(e) => setWidth(parseInt(e.target.value) || 1024)} className="h-14 rounded-2xl" />
                            </div>
                            <Button onClick={convert} disabled={!svgData || isConverting} className="h-24 px-12 rounded-[2rem] font-black text-lg self-end shadow-2xl shadow-primary/20">
                                {isConverting ? <RefreshCw className="animate-spin" /> : 'GENERATE PNG'}
                            </Button>
                        </div>
                    </div>

                    <div className="flex-1 p-12 bg-[url('https://www.transparenttextures.com/patterns/checkerboard.png')] rounded-[3.5rem] flex flex-col items-center justify-center border-4 border-dashed border-primary/5 overflow-hidden">
                        {svgData ? (
                            <div className="space-y-8 flex flex-col items-center">
                                <canvas ref={canvasRef} className="max-w-full h-auto rounded-3xl shadow-4xl border-4 border-white animate-in zoom-in duration-500" />
                                <Button size="lg" onClick={download} className="h-16 px-12 rounded-2xl font-black bg-white text-primary hover:bg-white/90">
                                    <Download className="mr-2" /> DOWNLOAD AT {width}PX
                                </Button>
                            </div>
                        ) : (
                            <div className="text-center opacity-20 space-y-4">
                                <ImageIcon className="h-24 w-24 mx-auto" />
                                <p className="font-bold italic">Preview will appear here</p>
                            </div>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
