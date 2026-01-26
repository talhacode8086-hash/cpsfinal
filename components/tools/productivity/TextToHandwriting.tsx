'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PenTool, Type } from 'lucide-react';
import { toast } from 'sonner';
import { Label } from '@/components/ui/label';

export default function TextToHandwriting() {
    const [text, setText] = useState('');
    const [fontSize, setFontSize] = useState(24);
    const [fontFamily, setFontFamily] = useState('cursive');

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <PenTool className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Text to Handwriting</CardTitle>
                <p className="text-muted-foreground mt-2">Preview your text in various handwriting and cursive styles.</p>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
                <div className="space-y-4">
                    <Label className="font-bold">Enter Note Content</Label>
                    <Textarea
                        placeholder="Type your message here..."
                        className="min-h-[150px] text-lg p-6 rounded-2xl border-primary/20 focus:border-primary transition-all resize-none bg-background/50"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Button variant={fontFamily === 'cursive' ? 'default' : 'outline'} onClick={() => setFontFamily('cursive')} className="rounded-xl">Cursive</Button>
                    <Button variant={fontFamily === 'Dancing Script, cursive' ? 'default' : 'outline'} onClick={() => setFontFamily('Dancing Script, cursive')} className="rounded-xl font-style-dancing">Dancing</Button>
                    <Button variant={fontFamily === 'Pacifico, cursive' ? 'default' : 'outline'} onClick={() => setFontFamily('Pacifico, cursive')} className="rounded-xl font-style-pacifico">Pacifico</Button>
                    <Button variant={fontFamily === 'Indie Flower, cursive' ? 'default' : 'outline'} onClick={() => setFontFamily('Indie Flower, cursive')} className="rounded-xl font-style-indie">Indie</Button>
                </div>

                <div className="p-10 rounded-[2.5rem] bg-amber-50/50 border border-amber-200/20 shadow-inner min-h-[300px] flex items-start justify-center overflow-hidden">
                    <p
                        className="text-amber-900/80 w-full whitespace-pre-wrap leading-relaxed break-all"
                        style={{ fontFamily: fontFamily, fontSize: `${fontSize}px` }}
                    >
                        {text || 'Start typing to see your handwriting preview...'}
                    </p>
                </div>

                <p className="text-center text-xs text-muted-foreground italic">
                    Note: Handwriting fonts are loaded via browser defaults or system fonts for best performance.
                </p>
            </CardContent>
        </Card>
    );
}
