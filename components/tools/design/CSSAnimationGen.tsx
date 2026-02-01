'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Copy, Play, RefreshCw, Zap } from 'lucide-react';
import { toast } from 'sonner';

const CSSAnimationGen = () => {
    const [animationType, setAnimationType] = useState('bounce');
    const [duration, setDuration] = useState(1);
    const [timing, setTiming] = useState('ease-in-out');
    const [iteration, setIteration] = useState('infinite');
    const [direction, setDirection] = useState('normal');

    const keyframes = {
        bounce: `@keyframes bounce {
    0%, 20%, 50%, 80%, 100% {transform: translateY(0);}
    40% {transform: translateY(-30px);}
    60% {transform: translateY(-15px);}
}`,
        shake: `@keyframes shake {
    0% { transform: translateX(0); }
    25% { transform: translateX(-10px); }
    50% { transform: translateX(10px); }
    75% { transform: translateX(-10px); }
    100% { transform: translateX(0); }
}`,
        fade: `@keyframes fadeIn {
    from { opacity: 0; transform: scale(0.9); }
    to { opacity: 1; transform: scale(1); }
}`,
        spin: `@keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}`,
        pulse: `@keyframes pulse {
    0% { transform: scale(1); filter: brightness(1); }
    50% { transform: scale(1.05); filter: brightness(1.2); }
    100% { transform: scale(1); filter: brightness(1); }
}`
    };

    const animationStyle = `${animationType} ${duration}s ${timing} ${iteration} ${direction}`;

    const copyCode = () => {
        const code = `${keyframes[animationType as keyof typeof keyframes]}\n\n.animated-element {\n  animation: ${animationStyle};\n}`;
        navigator.clipboard.writeText(code);
        toast.success('Animation CSS copied!');
    };

    return (
        <Card className="w-full max-w-5xl mx-auto dark:bg-zinc-900/50 backdrop-blur-sm border-zinc-200 dark:border-zinc-800 shadow-xl">
            <style dangerouslySetInnerHTML={{ __html: keyframes[animationType as keyof typeof keyframes] }} />
            <CardHeader>
                <CardTitle className="text-2xl font-bold flex items-center gap-2">
                    <Zap className="w-6 h-6 text-yellow-500" />
                    CSS Animation Generator
                </CardTitle>
                <CardDescription>Generate keyframes and utility classes for common UI animations</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <section className="space-y-4">
                            <div className="space-y-2">
                                <Label>Select Motion</Label>
                                <Select value={animationType} onValueChange={setAnimationType}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select animation" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="bounce">Bouncing Effect</SelectItem>
                                        <SelectItem value="shake">Shake Attention</SelectItem>
                                        <SelectItem value="fade">Smooth Fade In</SelectItem>
                                        <SelectItem value="spin">Infinite Rotation</SelectItem>
                                        <SelectItem value="pulse">Breathing Pulse</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label>Duration: {duration}s</Label>
                                <Slider value={[duration]} min={0.1} max={5} step={0.1} onValueChange={(v) => setDuration(v[0])} />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Easing</Label>
                                    <Select value={timing} onValueChange={setTiming}>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="linear">Linear</SelectItem>
                                            <SelectItem value="ease">Ease</SelectItem>
                                            <SelectItem value="ease-in">Ease In</SelectItem>
                                            <SelectItem value="ease-out">Ease Out</SelectItem>
                                            <SelectItem value="ease-in-out">Ease In Out</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label>Iteration</Label>
                                    <Select value={iteration} onValueChange={setIteration}>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="1">Once</SelectItem>
                                            <SelectItem value="2">Twice</SelectItem>
                                            <SelectItem value="infinite">Infinite</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </section>

                        <div className="space-y-2">
                            <Label className="text-xs font-bold uppercase tracking-wider opacity-70">Implementation Code</Label>
                            <div className="relative group">
                                <pre className="p-4 bg-zinc-100 dark:bg-zinc-800 rounded-xl overflow-x-auto text-[10px] font-mono border dark:border-zinc-700 max-h-[250px]">
                                    <code className="text-amber-600 dark:text-amber-400">
                                        {keyframes[animationType as keyof typeof keyframes]}
                                        {'\n\n'}.animated-element {'{'}{'\n'}  animation: {animationStyle};{'\n'}{'}'}
                                    </code>
                                </pre>
                                <Button
                                    size="sm"
                                    variant="secondary"
                                    className="absolute top-2 right-2"
                                    onClick={copyCode}
                                >
                                    <Copy className="w-3 h-3 mr-2" /> Copy
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col items-center justify-center space-y-8 p-12 rounded-3xl bg-zinc-50 dark:bg-zinc-950 border-2 border-dashed border-zinc-200 dark:border-zinc-800">
                        <div
                            className="w-32 h-32 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-3xl shadow-xl flex items-center justify-center"
                            style={{ animation: animationStyle }}
                        >
                            <Play className="w-12 h-12 text-white fill-current" />
                        </div>
                        <div className="text-center space-y-2">
                            <p className="font-bold text-zinc-500 uppercase tracking-tighter">Live Preview</p>
                            <Button variant="outline" size="sm" onClick={() => {
                                // Simple force re-animation
                                setDuration(d => d + 0.00001);
                                setTimeout(() => setDuration(d => Math.round(d * 10) / 10), 10);
                            }} className="gap-2">
                                <RefreshCw className="w-4 h-4" /> Replay
                            </Button>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default CSSAnimationGen;
