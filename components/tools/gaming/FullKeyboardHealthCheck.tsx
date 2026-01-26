'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Keyboard, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

const LAYOUT = [
    ["Escape", "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12"],
    ["Backquote", "Digit1", "Digit2", "Digit3", "Digit4", "Digit5", "Digit6", "Digit7", "Digit8", "Digit9", "Digit0", "Minus", "Equal", "Backspace"],
    ["Tab", "KeyQ", "KeyW", "KeyE", "KeyR", "KeyT", "KeyY", "KeyU", "KeyI", "KeyO", "KeyP", "BracketLeft", "BracketRight", "Backslash"],
    ["CapsLock", "KeyA", "KeyS", "KeyD", "KeyF", "KeyG", "KeyH", "KeyJ", "KeyK", "KeyL", "Semicolon", "Quote", "Enter"],
    ["ShiftLeft", "KeyZ", "KeyX", "KeyC", "KeyV", "KeyB", "KeyN", "KeyM", "Comma", "Period", "Slash", "ShiftRight"],
    ["ControlLeft", "MetaLeft", "AltLeft", "Space", "AltRight", "MetaRight", "ContextMenu", "ControlRight"]
];

export default function FullKeyboardHealthCheck() {
    const [tested, setTested] = useState<Set<string>>(new Set());

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            setTested(prev => {
                const next = new Set(prev);
                next.add(e.code);
                return next;
            });
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const reset = () => setTested(new Set());

    return (
        <Card className="max-w-6xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <CheckCircle className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Full Keyboard Health Check</CardTitle>
                <p className="text-muted-foreground mt-2">Interactive map to test every switch on your keyboard. Keys turn green when registered.</p>
            </CardHeader>
            <CardContent className="p-8 space-y-12">
                <div className="flex flex-col gap-3">
                    {LAYOUT.map((row, i) => (
                        <div key={i} className="flex justify-center gap-1.5">
                            {row.map(code => (
                                <div
                                    key={code}
                                    className={`
                                        h-12 flex items-center justify-center rounded-lg text-[10px] font-bold px-2 border transition-all
                                        ${tested.has(code) ? 'bg-green-500 border-green-400 text-white animate-in zoom-in-75' : 'bg-background/40 border-primary/10 text-muted-foreground'}
                                        ${code === 'Space' ? 'w-64' : code === 'Enter' ? 'w-24' : code === 'ShiftLeft' ? 'w-28' : 'min-w-[48px]'}
                                    `}
                                >
                                    {code.replace('Key', '').replace('Digit', '').replace('Arrow', '')}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>

                <div className="flex justify-between items-center bg-muted/20 p-6 rounded-3xl border border-primary/5">
                    <div className="flex gap-8">
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-primary">Tested</p>
                            <p className="text-3xl font-black">{tested.size}</p>
                        </div>
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Remaining</p>
                            <p className="text-3xl font-black">{80 - tested.size}</p>
                        </div>
                    </div>
                    <Button variant="outline" className="rounded-xl h-12 px-8 font-bold" onClick={reset}>
                        <RefreshCw className="mr-2 h-4 w-4" /> Reset Layout
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
