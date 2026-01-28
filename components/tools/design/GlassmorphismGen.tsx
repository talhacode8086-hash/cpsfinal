'use client';

import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Copy, Layers, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function GlassmorphismGen() {
    const [blur, setBlur] = useState(10);
    const [transparency, setTransparency] = useState(0.2);
    const [color, setColor] = useState('#ffffff');
    const [border, setBorder] = useState(10);

    const cssString = `background: rgba(${hexToRgb(color)}, ${transparency});\nbackdrop-filter: blur(${blur}px);\n-webkit-backdrop-filter: blur(${blur}px);\nborder-radius: 20px;\nborder: 1px solid rgba(255, 255, 255, 0.18);`;

    function hexToRgb(hex: string) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ?
            `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` :
            '255, 255, 255';
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(cssString);
    };

    return (
        <div className="grid gap-6 sm:gap-8 lg:grid-cols-2">
            <div className="space-y-6 sm:space-y-12">
                <div className="p-6 sm:p-12 rounded-[2rem] sm:rounded-[40px] bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 relative overflow-hidden flex items-center justify-center min-h-[300px] sm:min-h-[400px]">
                    <div className="absolute top-0 left-0 w-full h-full opacity-30 select-none pointer-events-none">
                        <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-300 rounded-full mix-blend-screen filter blur-xl animate-pulse" />
                        <div className="absolute bottom-20 right-20 w-48 h-48 bg-blue-300 rounded-full mix-blend-screen filter blur-2xl animate-bounce" />
                    </div>

                    <div
                        className="w-full p-6 sm:p-10 text-white relative z-10"
                        style={{
                            background: `rgba(${hexToRgb(color)}, ${transparency})`,
                            backdropFilter: `blur(${blur}px)`,
                            WebkitBackdropFilter: `blur(${blur}px)`,
                            borderRadius: '24px',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.15)'
                        }}
                    >
                        <h4 className="text-xl sm:text-3xl font-black tracking-tight mb-2">Premium UI</h4>
                        <p className="opacity-80 leading-relaxed text-xs sm:text-sm">Design smooth, modern glass interfaces instantly with this tool.</p>
                        <div className="mt-4 sm:mt-8 h-8 sm:h-10 w-24 sm:w-32 rounded-full bg-white/20 border border-white/30" />
                    </div>
                </div>

                <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-base sm:text-lg font-bold flex items-center gap-2">
                            <Layers className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                            Generated CSS
                        </h3>
                        <Button variant="outline" size="sm" className="rounded-full h-8 text-[10px] sm:text-xs" onClick={copyToClipboard}>
                            <Copy className="h-3.5 w-3.5 mr-1.5 sm:mr-2" /> Copy CSS
                        </Button>
                    </div>
                    <pre className="p-4 sm:p-6 bg-zinc-950 text-emerald-400 rounded-2xl sm:rounded-3xl font-mono text-[10px] sm:text-xs overflow-auto leading-relaxed border border-white/5">
                        {cssString}
                    </pre>
                </div>
            </div>

            <div className="space-y-6 sm:space-y-8 p-6 sm:p-8 bg-muted/20 rounded-[2rem] sm:rounded-[32px] border border-dashed border-primary/20">
                <div className="space-y-3 sm:space-y-2">
                    <div className="flex items-center justify-between font-bold text-xs sm:text-sm">
                        <span>Background Blur</span>
                        <span className="text-primary">{blur}px</span>
                    </div>
                    <input
                        type="range" min="0" max="25" step="1"
                        value={blur} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBlur(parseInt(e.target.value))}
                        className="w-full h-1.5 bg-muted-foreground/20 rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                </div>

                <div className="space-y-3 sm:space-y-2">
                    <div className="flex items-center justify-between font-bold text-xs sm:text-sm">
                        <span>Transparency</span>
                        <span className="text-primary">{(transparency * 100).toFixed(0)}%</span>
                    </div>
                    <input
                        type="range" min="0" max="1" step="0.05"
                        value={transparency} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTransparency(parseFloat(e.target.value))}
                        className="w-full h-1.5 bg-muted-foreground/20 rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                </div>

                <div className="space-y-3">
                    <Label className="font-bold text-xs sm:text-sm">Surface Color</Label>
                    <div className="flex gap-2 sm:gap-3">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-2xl border-2 border-white/20 shadow-inner shrink-0" style={{ backgroundColor: color }} />
                        <Input
                            type="text" value={color} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setColor(e.target.value)}
                            className="h-10 sm:h-12 rounded-xl font-mono text-xs sm:text-sm"
                        />
                    </div>
                </div>

                <div className="pt-6 sm:pt-8 border-t border-primary/10">
                    <div className="flex items-center gap-2 sm:gap-3 text-primary mb-3 sm:mb-4 font-bold text-sm">
                        <Sparkles className="h-4 w-4 sm:h-5 sm:w-5" /> Tips
                    </div>
                    <ul className="text-[10px] sm:text-xs text-muted-foreground space-y-2 sm:space-y-3">
                        <li className="flex gap-2"><span>•</span> Use light colors on dark backgrounds for the best effect.</li>
                        <li className="flex gap-2"><span>•</span> Keep border transparency low (around 10-20%) for realism.</li>
                        <li className="flex gap-2"><span>•</span> Works best when placed over vibrant or detailed backgrounds.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
