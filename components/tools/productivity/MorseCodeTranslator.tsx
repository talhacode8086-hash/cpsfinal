'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Copy, Activity, Play } from 'lucide-react';
import { toast } from 'sonner';

const MORSE_CODE: Record<string, string> = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
    'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
    'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
    'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
    'Y': '-.--', 'Z': '--..', '1': '.----', '2': '..---', '3': '...--',
    '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..',
    '9': '----.', '0': '-----', ' ': '/'
};

const REVERSE_MORSE: Record<string, string> = Object.entries(MORSE_CODE).reduce((acc, [char, code]) => {
    acc[code] = char;
    return acc;
}, {} as Record<string, string>);

export default function MorseCodeTranslator() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');

    const encode = () => {
        const result = input.toUpperCase().split('')
            .map(char => MORSE_CODE[char] || char)
            .join(' ');
        setOutput(result);
        toast.success('Encoded to Morse');
    };

    const decode = () => {
        const result = input.trim().split(/\s+/)
            .map(code => REVERSE_MORSE[code] || code)
            .join('');
        setOutput(result);
        toast.success('Decoded to Text');
    };

    const playMorse = () => {
        if (!output || typeof window === 'undefined') return;

        const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const dot = 0.1;
        const dash = dot * 3;
        const pause = dot;

        let time = ctx.currentTime;

        output.split('').forEach(char => {
            if (char === '.' || char === '-') {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.connect(gain);
                gain.connect(ctx.destination);

                const duration = char === '.' ? dot : dash;
                osc.start(time);
                osc.stop(time + duration);
                time += duration + pause;
            } else if (char === ' ') {
                time += dash;
            } else if (char === '/') {
                time += dot * 7;
            }
        });

        toast.info('Playing Morse code audio...');
    };

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Activity className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Morse Code Translator</CardTitle>
                <p className="text-muted-foreground mt-2">Translate between text and International Morse Code.</p>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
                <div className="space-y-4">
                    <Textarea
                        placeholder="Enter text to encode OR Morse code to decode..."
                        className="min-h-[150px] text-lg p-6 rounded-2xl border-primary/20 focus:border-primary transition-all resize-none bg-background/50 font-mono"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />

                    <div className="flex gap-3">
                        <Button onClick={encode} className="flex-1 h-12 rounded-xl font-bold">Text to Morse</Button>
                        <Button onClick={decode} variant="outline" className="flex-1 h-12 rounded-xl font-bold">Morse to Text</Button>
                    </div>

                    <div className="relative group">
                        <Textarea
                            readOnly
                            placeholder="Result will appear here..."
                            className="min-h-[150px] text-lg p-6 rounded-2xl border-primary/20 bg-muted/30 resize-none font-mono"
                            value={output}
                        />
                        <div className="absolute top-4 right-4 flex gap-2">
                            <Button variant="ghost" size="icon" className="rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" onClick={playMorse} disabled={!output}>
                                <Play className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => {
                                navigator.clipboard.writeText(output);
                                toast.success('Copied!');
                            }} disabled={!output}>
                                <Copy className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
