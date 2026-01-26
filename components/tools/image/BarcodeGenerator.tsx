'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Barcode, Download, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function BarcodeGenerator() {
    const [value, setValue] = useState('1234567890');
    const [format, setFormat] = useState('CODE128');
    const [bars, setBars] = useState<{ width: number; height: number }[]>([]);

    useEffect(() => {
        const newBars = Array.from({ length: 40 }).map(() => ({
            width: Math.random() > 0.5 ? 2 : 4,
            height: 80 + Math.random() * 20
        }));
        setBars(newBars);
    }, [value, format]);

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm overflow-hidden text-center">
            <CardHeader className="border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Barcode className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Standard Barcode Gen</CardTitle>
                <p className="text-muted-foreground mt-2">Create professional EAN, UPC, and Code 128 barcodes for retail and inventory.</p>
            </CardHeader>
            <CardContent className="p-12 space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
                    <div className="space-y-4 text-left">
                        <label className="text-[10px] font-black uppercase text-primary tracking-widest pl-2">Format</label>
                        <Select value={format} onValueChange={setFormat}>
                            <SelectTrigger className="h-16 rounded-3xl bg-muted/20 border-primary/10 font-bold">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="CODE128">Code 128</SelectItem>
                                <SelectItem value="EAN13">EAN-13</SelectItem>
                                <SelectItem value="UPC">UPC-A</SelectItem>
                                <SelectItem value="CODE39">Code 39</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-4 text-left">
                        <label className="text-[10px] font-black uppercase text-primary tracking-widest pl-2">Barcode Content</label>
                        <Input
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            className="h-16 rounded-3xl bg-muted/20 border-primary/10 text-xl font-bold px-8"
                        />
                    </div>
                </div>

                <div className="p-16 rounded-[4rem] bg-white border-2 border-primary/5 shadow-2xl flex flex-col items-center gap-8">
                    {/* Mock Barcode */}
                    <div className="flex gap-[2px] h-32 items-end">
                        {bars.map((bar, i) => (
                            <div
                                key={i}
                                className="bg-black transition-all duration-300"
                                style={{
                                    width: bar.width + 'px',
                                    height: bar.height + '%'
                                }}
                            />
                        ))}
                    </div>
                    <div>
                        <h3 className="text-5xl font-black tracking-[0.4em] text-black/80">{value}</h3>
                        <p className="text-[10px] font-black uppercase opacity-20 mt-2">{format} STANDARD</p>
                    </div>
                </div>

                <div className="flex justify-center gap-4">
                    <Button size="lg" className="h-20 px-16 rounded-[2.5rem] font-black text-xl shadow-2xl shadow-primary/20">
                        <Download className="mr-2" /> DOWNLOAD HIGH-RES
                    </Button>
                    <Button variant="outline" size="lg" onClick={() => setValue('')} className="h-20 w-20 rounded-[2.5rem] border-2 border-primary/10">
                        <RefreshCw />
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
