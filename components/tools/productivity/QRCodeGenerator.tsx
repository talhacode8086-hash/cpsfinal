'use client';

import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, QrCode, Share2 } from 'lucide-react';
import { toast } from 'sonner';

export default function QRCodeGenerator() {
    const [value, setValue] = useState('https://toolshub.com');

    const downloadQRCode = () => {
        const svg = document.querySelector('.qr-code svg');
        if (!svg) return;

        const svgData = new XMLSerializer().serializeToString(svg);
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();

        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx?.drawImage(img, 0, 0);
            const pngFile = canvas.toDataURL('image/png');
            const downloadLink = document.createElement('a');
            downloadLink.download = 'toolshub-qr-code.png';
            downloadLink.href = pngFile;
            downloadLink.click();
            toast.success('QR Code downloaded!');
        };

        img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
    };

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <QrCode className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">QR Code Generator</CardTitle>
                <p className="text-muted-foreground mt-2">Create customizable QR codes for links, text, and more.</p>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
                <div className="space-y-4">
                    <label className="text-sm font-bold ml-1">QR Content (URL or Text)</label>
                    <Input
                        placeholder="Enter URL or text..."
                        className="h-12 rounded-xl border-primary/20 focus:border-primary transition-all text-lg"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                    />
                </div>

                <div className="flex flex-col items-center justify-center gap-8 py-4">
                    <div className="qr-code p-6 bg-white rounded-3xl shadow-inner border border-primary/5 transition-transform hover:scale-105">
                        <QRCodeSVG
                            value={value}
                            size={200}
                            level="H"
                            includeMargin={false}
                        />
                    </div>

                    <div className="flex gap-4 w-full max-w-sm">
                        <Button className="flex-1 rounded-xl h-12 font-bold shadow-lg shadow-primary/10" onClick={downloadQRCode}>
                            <Download className="mr-2 h-5 w-5" />
                            Download PNG
                        </Button>
                        <Button variant="outline" size="icon" className="rounded-xl h-12 w-12" onClick={() => {
                            navigator.clipboard.writeText(value);
                            toast.success('Content copied to clipboard!');
                        }}>
                            <Share2 className="h-5 w-5" />
                        </Button>
                    </div>
                </div>

                <div className="bg-primary/5 rounded-2xl p-6 border border-primary/10">
                    <h4 className="font-bold flex items-center gap-2 mb-2">
                        <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                        Pro Tip
                    </h4>
                    <p className="text-sm text-muted-foreground">
                        Use high-quality images for better scanning. Our QR codes are vector-based and can be scaled to any size without losing quality.
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}
