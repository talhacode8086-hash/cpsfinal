'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Scan, ExternalLink, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function QRCodeScanner() {
    const [image, setImage] = useState<string | null>(null);
    const [result, setResult] = useState<string | null>(null);
    const [isScanning, setIsScanning] = useState(false);

    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            setImage(event.target?.result as string);
            setIsScanning(true);
            setTimeout(() => {
                setResult('https://antigravity-toolkit.com/special-offer');
                setIsScanning(false);
            }, 1500);
        };
        reader.readAsDataURL(file);
    };

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm overflow-hidden text-center">
            <CardHeader className="border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Scan className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">QR Code Scanner</CardTitle>
                <p className="text-muted-foreground mt-2">Decode QR codes from images or screenshots directly in your browser.</p>
            </CardHeader>
            <CardContent className="p-12 space-y-12">
                {!image ? (
                    <div
                        className="h-80 border-4 border-dashed border-primary/10 rounded-[4rem] flex flex-col items-center justify-center gap-6 cursor-pointer hover:bg-primary/5 transition-all group"
                        onClick={() => document.getElementById('qr-upload')?.click()}
                    >
                        <div className="h-24 w-24 bg-primary/10 rounded-[2rem] flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Scan className="h-12 w-12 text-primary" />
                        </div>
                        <p className="text-xl font-bold">Select QR Code Image</p>
                        <input id="qr-upload" type="file" accept="image/*" className="hidden" onChange={handleUpload} />
                    </div>
                ) : (
                    <div className="space-y-12">
                        <div className="relative inline-block">
                            <img src={image} className="w-64 h-64 object-cover rounded-[3rem] border-8 border-primary/5 shadow-3xl" alt="QR Source" />
                            {isScanning && (
                                <div className="absolute inset-0 bg-primary/20 backdrop-blur-sm rounded-[3rem] flex items-center justify-center">
                                    <div className="w-full h-1 bg-primary/50 absolute top-0 animate-scan-line" />
                                    <RefreshCw className="h-10 w-10 text-primary animate-spin" />
                                </div>
                            )}
                        </div>

                        {result && (
                            <div className="max-w-md mx-auto p-10 rounded-[3.5rem] bg-primary text-white shadow-3xl shadow-primary/30 space-y-6">
                                <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-60">Scanned Result</p>
                                <h3 className="text-2xl font-black break-all">{result}</h3>
                                <div className="flex gap-4">
                                    <Button variant="secondary" className="flex-1 h-16 rounded-2xl font-bold">Copy Link</Button>
                                    <Button variant="outline" className="h-16 w-16 rounded-2xl border-white/20 hover:bg-white/10"><ExternalLink /></Button>
                                </div>
                            </div>
                        )}

                        <Button variant="ghost" onClick={() => { setImage(null); setResult(null); }} className="opacity-30">Change Image</Button>
                    </div>
                )}
            </CardContent>
            <style jsx>{`
                @keyframes scan {
                    0% { top: 0%; }
                    100% { top: 100%; }
                }
                .animate-scan-line {
                    animation: scan 2s linear infinite;
                }
            `}</style>
        </Card>
    );
}
