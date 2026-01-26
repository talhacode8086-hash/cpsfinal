'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, Layers, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Base64ToImage() {
    const [b64, setB64] = useState('');
    const [isValid, setIsValid] = useState(false);

    const handleInput = (val: string) => {
        setB64(val);
        setIsValid(val.startsWith('data:image/') || val.length > 100);
    };

    const download = () => {
        const link = document.createElement('a');
        link.download = 'decoded-image.png';
        link.href = b64.startsWith('data:image/') ? b64 : `data:image/png;base64,${b64}`;
        link.click();
    };

    return (
        <Card className="max-w-6xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm overflow-hidden text-center">
            <CardHeader className="border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <ImageIcon className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Base64 to Image</CardTitle>
                <p className="text-muted-foreground mt-2">Decode and restore visual files from Base64 data strings instantly.</p>
            </CardHeader>
            <CardContent className="p-12 space-y-12">
                <div className="flex flex-col lg:flex-row gap-12">
                    <div className="flex-1 space-y-6 text-left">
                        <label className="text-[10px] font-black uppercase text-primary tracking-widest pl-2">Paste Base64 Data String</label>
                        <textarea
                            value={b64}
                            onChange={(e) => handleInput(e.target.value)}
                            className="w-full h-80 p-8 rounded-[3rem] bg-muted/20 border-2 border-primary/10 font-mono text-[10px] resize-none focus:border-primary/40 outline-none transition-all scrollbar-hide"
                            placeholder="data:image/png;base64,..."
                        />
                        <Button
                            onClick={download}
                            disabled={!isValid}
                            className="w-full h-20 rounded-[2.5rem] font-black text-xl shadow-2xl shadow-primary/20"
                        >
                            <Download className="mr-2" /> RESTORE & DOWNLOAD
                        </Button>
                    </div>

                    <div className="flex-1 p-12 rounded-[3.5rem] bg-[url('https://www.transparenttextures.com/patterns/checkerboard.png')] border-4 border-dashed border-primary/5 flex flex-col items-center justify-center min-h-[400px]">
                        {isValid ? (
                            <img
                                src={b64.startsWith('data:image/') ? b64 : `data:image/png;base64,${b64}`}
                                className="max-w-full h-auto rounded-3xl shadow-4xl border-4 border-white animate-in zoom-in duration-500"
                                alt="Decoded"
                            />
                        ) : (
                            <div className="text-center opacity-20 space-y-4">
                                <Layers className="h-24 w-24 mx-auto" />
                                <p className="font-bold italic">Image preview will appear here</p>
                            </div>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
