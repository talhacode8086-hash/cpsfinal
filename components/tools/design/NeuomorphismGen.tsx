'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Box, Copy, Check, Sun, Moon } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';

export default function NeuomorphismGen() {
    const [size, setSize] = useState(150);
    const [radius, setRadius] = useState(30);
    const [distance, setDistance] = useState(20);
    const [blur, setBlur] = useState(40);
    const [intensity, setIntensity] = useState(0.15);
    const [bgColor, setBgColor] = useState('#e0e0e0');
    const [isDark, setIsDark] = useState(false);

    const [copied, setCopied] = useState(false);

    const shadow1 = `${distance}px ${distance}px ${blur}px #bebebe`;
    const shadow2 = `-${distance}px -${distance}px ${blur}px #ffffff`;

    // Simple dark mode mock
    const currentShadow1 = isDark ? `${distance}px ${distance}px ${blur}px #121212` : shadow1;
    const currentShadow2 = isDark ? `-${distance}px -${distance}px ${blur}px #323232` : shadow2;

    const cssCode = `border-radius: ${radius}px;\nbackground: ${isDark ? '#212121' : bgColor};\nbox-shadow: ${currentShadow1},\n            ${currentShadow2};`;

    return (
        <Card className="max-w-6xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm overflow-hidden">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Box className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Neuomorphism Generator</CardTitle>
                <p className="text-muted-foreground mt-2">Create soft, extruded modern UI elements with the &quot;Neumorphic&quot; aesthetic.</p>
            </CardHeader>
            <CardContent className="p-0 flex flex-col lg:flex-row">
                {/* Controls */}
                <div className="w-full lg:w-96 bg-muted/5 p-8 border-b lg:border-b-0 lg:border-r border-primary/5 space-y-8">
                    <ParamSlider label="Radius" value={radius} min={0} max={100} onChange={setRadius} />
                    <ParamSlider label="Distance" value={distance} min={5} max={50} onChange={setDistance} />
                    <ParamSlider label="Blur" value={blur} min={0} max={100} onChange={setBlur} />

                    <div className="pt-8 border-t border-primary/5 space-y-4">
                        <div className="flex justify-between items-center text-[10px] font-black uppercase text-primary">
                            <span>Background Mode</span>
                            <Button variant="outline" size="sm" onClick={() => setIsDark(!isDark)} className="rounded-xl px-6">
                                {isDark ? <Moon className="h-4 w-4 mr-2" /> : <Sun className="h-4 w-4 mr-2" />}
                                {isDark ? 'DARK' : 'LIGHT'}
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Preview */}
                <div className={`flex-1 p-24 flex flex-col items-center justify-center gap-16 transition-colors duration-500 ${isDark ? 'bg-[#212121]' : 'bg-[#e0e0e0]'}`}>
                    <div
                        className="w-64 h-64 bg-inherit transition-all duration-300"
                        style={{
                            borderRadius: `${radius}px`,
                            boxShadow: `${currentShadow1}, ${currentShadow2}`
                        }}
                    />

                    <div className={`w-full max-w-xl space-y-4 ${isDark ? 'text-white' : 'text-primary'}`}>
                        <div className="flex justify-between text-[10px] font-black uppercase tracking-widest opacity-50">
                            <span>CSS Template</span>
                            <button
                                onClick={() => {
                                    navigator.clipboard.writeText(cssCode);
                                    setCopied(true);
                                    setTimeout(() => setCopied(false), 2000);
                                }}
                                className="flex items-center gap-2 hover:opacity-100 transition-opacity"
                            >
                                {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                                {copied ? 'COPIED' : 'COPY'}
                            </button>
                        </div>
                        <pre className={`p-8 rounded-[2.5rem] font-mono text-xs leading-relaxed border ${isDark ? 'bg-black/20 border-white/5' : 'bg-white/40 border-black/5'}`}>
                            {cssCode}
                        </pre>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

function ParamSlider({ label, value, min, max, onChange }: any) {
    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-tighter text-primary/60">
                <span>{label}</span>
                <span>{value}px</span>
            </div>
            <Slider value={[value]} onValueChange={(v) => onChange(v[0])} min={min} max={max} step={1} />
        </div>
    );
}
