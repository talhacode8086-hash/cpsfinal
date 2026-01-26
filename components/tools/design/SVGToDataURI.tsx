'use client';

import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Copy, Trash2, Code2, Image as ImageIcon } from 'lucide-react';

export default function SVGToDataURI() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');

    const convertToDataURI = () => {
        if (!input.trim()) return;

        try {
            // Encode the SVG
            const encoded = encodeURIComponent(input.trim())
                .replace(/'/g, "%27")
                .replace(/"/g, "%22");

            const uri = `data:image/svg+xml,${encoded}`;
            setOutput(uri);
        } catch (e) {
            setOutput('Error: Invalid SVG code');
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(output);
    };

    return (
        <div className="grid gap-8 lg:grid-cols-2">
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <Label className="text-lg">Paste SVG Code</Label>
                    <Button
                        variant="ghost" size="sm"
                        className="text-destructive"
                        onClick={() => { setInput(''); setOutput(''); }}
                        disabled={!input}
                    >
                        <Trash2 className="mr-2 h-4 w-4" /> Clear
                    </Button>
                </div>
                <textarea
                    className="min-h-[400px] w-full resize-none rounded-2xl border border-input bg-background p-6 font-mono text-xs shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20"
                    placeholder="<svg ...> ... </svg>"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <Button className="w-full rounded-xl h-12 shadow-lg shadow-primary/20" onClick={convertToDataURI} disabled={!input}>
                    <Code2 className="mr-2 h-4 w-4" /> Convert to Data URI
                </Button>
            </div>

            <div className="space-y-6">
                <div className="space-y-2">
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Live Result Preview</p>
                    <div className="h-48 w-full border-2 border-dashed rounded-3xl bg-muted/30 flex items-center justify-center overflow-hidden p-6 relative group">
                        {output && !output.startsWith('Error') ? (
                            <img src={output} alt="SVG Preview" className="max-w-full max-h-full transition-transform group-hover:scale-110" />
                        ) : (
                            <div className="text-center text-muted-foreground space-y-2">
                                <ImageIcon className="h-10 w-10 mx-auto opacity-20" />
                                <p className="text-xs italic">SVG output will be previewed here</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <Label className="text-lg">Data URI Output</Label>
                        <Button variant="outline" size="sm" className="rounded-full" onClick={copyToClipboard} disabled={!output}>
                            <Copy className="h-4 w-4 mr-2" /> Copy URI
                        </Button>
                    </div>
                    <div className="min-h-[200px] w-full rounded-2xl border bg-zinc-950 text-zinc-50 p-6 font-mono text-[10px] break-all overflow-auto">
                        {output || <span className="text-zinc-600 italic">Output will appear here...</span>}
                    </div>
                </div>

                <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10 text-xs text-primary leading-relaxed">
                    <strong>Note:</strong> Data URIs are great for embedding small SVGs directly into your CSS or HTML to reduce HTTP requests.
                </div>
            </div>
        </div>
    );
}
