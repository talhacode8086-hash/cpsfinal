'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Copy, Zap } from 'lucide-react';
import { toast } from 'sonner';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';

const ZALGO_UP = [
    '\u030d', '\u030e', '\u0304', '\u0305', '\u033f', '\u0311', '\u0306', '\u0310',
    '\u0352', '\u033e', '\u035b', '\u0346', '\u0341', '\u034a', '\u034b', '\u034c',
    '\u034c', '\u0344', '\u030a', '\u030b', '\u030c', '\u0300', '\u0301', '\u0302',
    '\u0303', '\u0314', '\u0315', '\u0316', '\u0317'
];

const ZALGO_DOWN = [
    '\u0316', '\u0317', '\u0318', '\u0319', '\u031c', '\u031d', '\u031e', '\u031f',
    '\u0320', '\u0324', '\u0325', '\u0326', '\u0329', '\u032a', '\u032b', '\u032c',
    '\u032d', '\u032e', '\u032f', '\u0330', '\u0331', '\u0332', '\u0333', '\u0339',
    '\u033a', '\u033b', '\u0347', '\u0348', '\u0349', '\u034d', '\u034e', '\u0353',
    '\u0354', '\u0355', '\u0356', '\u0359', '\u035a', '\u0323'
];

const ZALGO_MID = [
    '\u0315', '\u031b', '\u0340', '\u0341', '\u0358', '\u0321', '\u0322', '\u0327',
    '\u0328', '\u0334', '\u0335', '\u0336', '\u0337', '\u0338', '\u035c', '\u035d',
    '\u035e', '\u035f', '\u0360', '\u0362', '\u0338', '\u0337', '\u0334', '\u0321', '\u0328', '\u034b'
];

export default function ZalgoTextGenerator() {
    const [text, setText] = useState('');
    const [intensity, setIntensity] = useState([5]);

    const [zalgoText, setZalgoText] = useState('');

    useEffect(() => {
        if (!text) {
            setZalgoText('');
            return;
        }
        let result = '';
        for (let i = 0; i < text.length; i++) {
            result += text[i];
            const numZalgos = Math.floor(Math.random() * intensity[0]);
            for (let j = 0; j < numZalgos; j++) {
                const choice = Math.floor(Math.random() * 3);
                if (choice === 0) result += ZALGO_UP[Math.floor(Math.random() * ZALGO_UP.length)];
                else if (choice === 1) result += ZALGO_MID[Math.floor(Math.random() * ZALGO_MID.length)];
                else result += ZALGO_DOWN[Math.floor(Math.random() * ZALGO_DOWN.length)];
            }
        }
        setZalgoText(result);
    }, [text, intensity]);

    const handleCopy = () => {
        navigator.clipboard.writeText(zalgoText);
        toast.success('Glitch text copied!');
    };

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Zap className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Zalgo Text Generator</CardTitle>
                <p className="text-muted-foreground mt-2">I´VE COME TO DESTROY YOUR TEXT FLAVOR.</p>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
                <div className="space-y-4">
                    <Label className="flex items-center gap-2 font-bold italic">
                        Glitch Intensity: <span className="text-primary">{intensity[0]}</span>
                    </Label>
                    <Slider
                        value={intensity}
                        onValueChange={setIntensity}
                        min={1}
                        max={15}
                        step={1}
                        className="py-4"
                    />
                </div>

                <Textarea
                    placeholder="Type your pure text here..."
                    className="min-h-[150px] text-lg p-6 rounded-2xl border-primary/20 focus:border-primary transition-all resize-none bg-background/50"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />

                <div className="relative min-h-[150px] p-8 rounded-2xl bg-muted/30 border border-primary/5 flex items-center justify-center text-center">
                    <div className="text-2xl font-bold overflow-hidden break-all max-w-full">
                        {text ? zalgoText : 'yÌ¶oÌ¶uÌ¶rÌ¶ Ì¶gÌ¶lÌ¶iÌ¶tÌ¶cÌ¶hÌ¶ Ì¶wÌ¶iÌ¶lÌ¶lÌ¶ Ì¶aÌ¶pÌ¶pÌ¶eÌ¶aÌ¶rÌ¶ Ì¶hÌ¶eÌ¶rÌ¶eÌ¶'}
                    </div>
                </div>

                <div className="flex gap-4">
                    <Button onClick={() => setText(text)} className="flex-1 h-12 rounded-xl font-bold">Refresh Glitch</Button>
                    <Button onClick={handleCopy} variant="outline" className="flex-1 h-12 rounded-xl font-bold">
                        <Copy className="mr-2 h-4 w-4" /> Copy Glitch
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
