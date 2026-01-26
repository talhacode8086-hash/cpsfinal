'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Copy, FileSpreadsheet, Download, Table } from 'lucide-react';
import { toast } from 'sonner';

export default function ListToCSV() {
    const [text, setText] = useState('');
    const [csv, setCsv] = useState('');

    const convertToCSV = () => {
        const lines = text.split('\n').filter(line => line.trim());
        const result = lines.join(',');
        setCsv(result);
        if (text) toast.success('CSV generated!');
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(csv);
        toast.success('CSV copied!');
    };

    const downloadCSV = () => {
        const element = document.createElement("a");
        const file = new Blob([csv], { type: 'text/csv' });
        element.href = URL.createObjectURL(file);
        element.download = "data.csv";
        document.body.appendChild(element);
        element.click();
        toast.success('CSV file downloading...');
    };

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <FileSpreadsheet className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">List to CSV Converter</CardTitle>
                <p className="text-muted-foreground mt-2">Turn bulleted or line-separated lists into structured CSV text.</p>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
                <Textarea
                    placeholder="Enter items (one per line)..."
                    className="min-h-[200px] text-lg p-6 rounded-2xl border-primary/20 focus:border-primary transition-all resize-none bg-background/50 font-mono"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />

                <Button onClick={convertToCSV} className="w-full h-12 rounded-xl font-bold shadow-lg shadow-primary/10">
                    <Table className="mr-2 h-5 w-5" /> Generate CSV String
                </Button>

                <div className="relative group">
                    <Textarea
                        readOnly
                        placeholder="test, item, result, csv..."
                        className="min-h-[100px] text-lg p-6 rounded-2xl border-primary/20 bg-muted/30 resize-none font-mono"
                        value={csv}
                    />
                    <div className="absolute top-4 right-4 flex gap-2">
                        <Button variant="ghost" size="icon" className="rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" onClick={handleCopy} disabled={!csv}>
                            <Copy className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" onClick={downloadCSV} disabled={!csv}>
                            <Download className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
