'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Square, Copy, Check, MousePointer2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';

export default function CustomButtonGenerator() {
    const [text, setText] = useState('Get Started');
    const [bg, setBg] = useState('#7c3aed');
    const [radius, setRadius] = useState(12);
    const [paddingH, setPaddingH] = useState(32);
    const [paddingV, setPaddingV] = useState(16);
    const [fontSize, setFontSize] = useState(16);

    const [copied, setCopied] = useState(false);

    const cssCode = `.btn-custom {\n  background-color: ${bg};\n  color: white;\n  padding: ${paddingV}px ${paddingH}px;\n  border-radius: ${radius}px;\n  font-size: ${fontSize}px;\n  font-weight: 800;\n  border: none;\n  cursor: pointer;\n  transition: all 0.2s ease;\n  box-shadow: 0 10px 15px -3px ${bg}40;\n}\n\n.btn-custom:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 20px 25px -5px ${bg}60;\n  filter: brightness(1.1);\n}`;

    return (
        <Card className="max-w-6xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm overflow-hidden">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Square className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Premium Button Gen</CardTitle>
                <p className="text-muted-foreground mt-2">Design production-ready components with modern hover effects.</p>
            </CardHeader>
            <CardContent className="p-0 flex flex-col lg:flex-row">
                {/* Controls */}
                <div className="w-full lg:w-96 bg-muted/5 p-8 border-b lg:border-b-0 lg:border-r border-primary/5 space-y-8">
                    <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase text-primary">Button Label</label>
                        <Input value={text} onChange={(e) => setText(e.target.value)} className="h-12 rounded-xl" />
                    </div>

                    <div className="space-y-6">
                        <LabelSlider label="Border Radius" value={radius} max={50} onChange={setRadius} />
                        <LabelSlider label="Horizontal Padding" value={paddingH} max={64} min={12} onChange={setPaddingH} />
                        <LabelSlider label="Vertical Padding" value={paddingV} max={32} min={8} onChange={setPaddingV} />
                        <LabelSlider label="Font Size" value={fontSize} max={24} min={12} onChange={setFontSize} />
                    </div>

                    <div className="space-y-4 pt-4 border-t border-primary/5">
                        <label className="text-[10px] font-black uppercase text-primary">Brand Color</label>
                        <div className="flex gap-4">
                            <input type="color" value={bg} onChange={(e) => setBg(e.target.value)} className="h-12 w-12 rounded-lg cursor-pointer bg-transparent border-none" />
                            <Input value={bg} onChange={(e) => setBg(e.target.value)} className="h-12 flex-1 rounded-xl font-mono uppercase" />
                        </div>
                    </div>
                </div>

                {/* Preview */}
                <div className="flex-1 p-24 flex flex-col items-center justify-center gap-16 bg-[url('https://www.transparenttextures.com/patterns/cross-stripes.png')] bg-opacity-5">
                    <div className="relative group">
                        <button
                            className="transition-all duration-300 active:scale-95 shadow-2xl"
                            style={{
                                backgroundColor: bg,
                                padding: `${paddingV}px ${paddingH}px`,
                                borderRadius: `${radius}px`,
                                fontSize: `${fontSize}px`,
                                color: 'white',
                                fontWeight: 800,
                                boxShadow: `0 10px 40px -10px ${bg}AA`
                            }}
                        >
                            {text}
                        </button>
                        <MousePointer2 className="absolute -bottom-10 -right-10 h-8 w-8 text-primary opacity-0 group-hover:opacity-100 transition-opacity animate-bounce" />
                    </div>

                    <div className="w-full max-w-xl space-y-4">
                        <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-primary opacity-50">
                            <span>Tailored CSS Code</span>
                            <button
                                onClick={() => {
                                    navigator.clipboard.writeText(cssCode);
                                    setCopied(true);
                                    setTimeout(() => setCopied(false), 2000);
                                }}
                                className="flex items-center gap-2 hover:opacity-100 transition-opacity"
                            >
                                {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                                {copied ? 'COPIED' : 'COPY CODE'}
                            </button>
                        </div>
                        <pre className="p-8 rounded-[2.5rem] bg-muted/20 border border-primary/10 font-mono text-xs overflow-x-auto leading-relaxed max-h-64">
                            {cssCode}
                        </pre>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

function LabelSlider({ label, value, max, min = 0, onChange }: any) {
    return (
        <div className="space-y-3">
            <div className="flex justify-between text-[10px] font-black uppercase text-primary opacity-60">
                <span>{label}</span>
                <span>{value}px</span>
            </div>
            <Slider value={[value]} onValueChange={(v) => onChange(v[0])} max={max} min={min} step={1} />
        </div>
    );
}
