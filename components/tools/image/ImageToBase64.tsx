'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Code, Upload, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ImageToBase64() {
    const [image, setImage] = useState<string | null>(null);
    const [base64, setBase64] = useState('');
    const [copied, setCopied] = useState(false);

    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (event) => {
            const dataUrl = event.target?.result as string;
            setImage(dataUrl);
            setBase64(dataUrl);
        };
        reader.readAsDataURL(file);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(base64);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <Card className="max-w-6xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm overflow-hidden text-center">
            <CardHeader className="border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Code className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Image to Base64</CardTitle>
                <p className="text-muted-foreground mt-2">Encode any image into a text format for direct embedding in CSS or HTML.</p>
            </CardHeader>
            <CardContent className="p-12 space-y-12">
                {!image ? (
                    <div
                        className="h-64 border-4 border-dashed border-primary/10 rounded-[4rem] flex flex-col items-center justify-center gap-4 cursor-pointer hover:bg-primary/5 transition-all group"
                        onClick={() => document.getElementById('b64-upload')?.click()}
                    >
                        <Upload className="h-12 w-12 text-primary opacity-20 group-hover:scale-110 transition-transform" />
                        <p className="font-bold text-muted-foreground">Click to upload image</p>
                        <input id="b64-upload" type="file" accept="image/*" className="hidden" onChange={handleUpload} />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <img src={image} className="max-h-80 mx-auto rounded-3xl border-4 border-primary/5 shadow-2xl" alt="Preview" />
                            <Button variant="ghost" onClick={() => { setImage(null); setBase64(''); }} className="opacity-30">Change Image</Button>
                        </div>

                        <div className="space-y-4 text-left">
                            <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-primary">
                                <span>Encoded Data String</span>
                                <button onClick={copyToClipboard} className="flex items-center gap-2 hover:opacity-100 transition-opacity">
                                    {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                                    {copied ? 'COPIED' : 'COPY ALL'}
                                </button>
                            </div>
                            <div className="h-64 p-6 rounded-[2.5rem] bg-muted/20 border border-primary/10 font-mono text-[10px] break-all overflow-y-auto leading-relaxed scrollbar-hide">
                                {base64}
                            </div>
                            <p className="text-xs text-muted-foreground italic">Total characters: {base64.length.toLocaleString()}</p>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
