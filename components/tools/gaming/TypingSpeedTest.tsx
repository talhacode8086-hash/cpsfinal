'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Keyboard, RotateCcw } from 'lucide-react';

const SAMPLE_TEXT = "The quick brown fox jumps over the lazy dog. Accuracy and speed are the key components of a professional typing experience. Practice makes perfect when it comes to mastering your mechanical keyboard and improving your words per minute.";

export default function TypingSpeedTest() {
    const [text, setText] = useState('');
    const [startTime, setStartTime] = useState<number | null>(null);
    const [wpm, setWpm] = useState(0);
    const [accuracy, setAccuracy] = useState(100);
    const [isActive, setIsActive] = useState(false);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (isActive && text.length > 0) {
            const timeElapsed = (Date.now() - (startTime || Date.now())) / 60000; // in minutes
            const wordsTyped = text.length / 5;
            setWpm(Math.round(wordsTyped / (timeElapsed || 0.01)));

            let correctChars = 0;
            for (let i = 0; i < text.length; i++) {
                if (text[i] === SAMPLE_TEXT[i]) correctChars++;
            }
            setAccuracy(Math.round((correctChars / text.length) * 100));
        }

        if (text.length === SAMPLE_TEXT.length) {
            setIsActive(false);
        }
    }, [text, isActive, startTime]);

    const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (!isActive && e.target.value.length === 1) {
            setIsActive(true);
            setStartTime(Date.now());
        }
        setText(e.target.value);
    };

    const reset = () => {
        setText('');
        setStartTime(null);
        setWpm(0);
        setAccuracy(100);
        setIsActive(false);
        setTimeout(() => inputRef.current?.focus(), 0);
    };

    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Card className="bg-primary/5 border-primary/20">
                    <CardContent className="pt-6 text-center">
                        <div className="text-xs uppercase font-bold text-muted-foreground mb-1">WPM</div>
                        <div className="text-5xl font-black text-primary">{wpm}</div>
                    </CardContent>
                </Card>
                <Card className="bg-muted/50">
                    <CardContent className="pt-6 text-center">
                        <div className="text-xs uppercase font-bold text-muted-foreground mb-1">Accuracy</div>
                        <div className="text-5xl font-black">{accuracy}%</div>
                    </CardContent>
                </Card>
                <Card className="bg-muted/50">
                    <CardContent className="pt-6 text-center">
                        <div className="text-xs uppercase font-bold text-muted-foreground mb-1">Progress</div>
                        <div className="text-5xl font-black">{Math.round((text.length / SAMPLE_TEXT.length) * 100)}%</div>
                    </CardContent>
                </Card>
            </div>

            <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-primary/5 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative bg-card border-2 rounded-2xl p-8 font-mono text-xl leading-relaxed select-none">
                    <div className="flex flex-wrap gap-x-[2px]">
                        {SAMPLE_TEXT.split('').map((char, i) => {
                            let color = "text-muted-foreground/30";
                            if (i < text.length) {
                                color = text[i] === char ? "text-primary font-bold" : "text-destructive bg-destructive/10";
                            }
                            return <span key={i} className={`${color} transition-colors`}>{char}</span>;
                        })}
                    </div>

                    <textarea
                        ref={inputRef}
                        value={text}
                        onChange={handleInput}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-text resize-none"
                        autoFocus
                        autoCapitalize="off"
                        autoCorrect="off"
                        spellCheck="false"
                    />
                </div>
            </div>

            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Keyboard className="h-4 w-4" />
                    <span>Start typing to begin the test</span>
                </div>
                <Button variant="outline" className="gap-2 rounded-full px-6" onClick={reset}>
                    <RotateCcw className="h-4 w-4" /> Reset Test
                </Button>
            </div>
        </div>
    );
}
