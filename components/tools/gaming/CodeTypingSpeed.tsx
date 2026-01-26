'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Code, CheckCircle2, Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const CODE_EXAMPLES: Record<string, string> = {
    javascript: `function calculateSum(a, b) {\n  const result = a + b;\n  console.log("Result:", result);\n  return result;\n}`,
    python: `def greet_user(name):\n    message = f"Hello, {name}!"\n    print(message)\n    return True`,
    css: `.card-container {\n  display: flex;\n  justify-content: center;\n  border-radius: 12px;\n  padding: 2rem;\n}`,
};

export default function CodeTypingSpeed() {
    const [lang, setLang] = useState('javascript');
    const [state, setState] = useState<'idle' | 'playing' | 'result'>('idle');
    const [input, setInput] = useState("");
    const [startTime, setStartTime] = useState(0);
    const [wpm, setWpm] = useState(0);

    const target = CODE_EXAMPLES[lang];

    const startGame = () => {
        setInput("");
        setWpm(0);
        setState('playing');
        setStartTime(Date.now());
    };

    const handleInput = (val: string) => {
        setInput(val);
        if (val.trim() === target.trim()) {
            const duration = (Date.now() - startTime) / 60000;
            const finalWpm = Math.round((target.length / 5) / duration);
            setWpm(finalWpm);
            setState('result');
        }
    };

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Code className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Code Snippet Speed Test</CardTitle>
                <p className="text-muted-foreground mt-2">Practice typing brackets, semicolons, and indentation for better dev speed.</p>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
                <div className="flex justify-between items-center bg-muted/30 p-4 rounded-2xl border border-primary/5">
                    <div className="flex items-center gap-2">
                        <Terminal className="h-4 w-4 text-primary" />
                        <span className="text-sm font-bold uppercase tracking-widest text-primary">Language Selection</span>
                    </div>
                    <Select value={lang} onValueChange={setLang} disabled={state === 'playing'}>
                        <SelectTrigger className="w-[180px] h-10 rounded-xl">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="javascript">JavaScript</SelectItem>
                            <SelectItem value="python">Python</SelectItem>
                            <SelectItem value="css">CSS</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="relative p-8 bg-black/80 rounded-[2rem] border border-white/10 font-mono text-sm leading-relaxed overflow-hidden">
                    <pre className="text-white/50">{target}</pre>
                    {state === 'playing' && (
                        <textarea
                            autoFocus
                            value={input}
                            onChange={(e) => handleInput(e.target.value)}
                            className="absolute inset-0 p-8 bg-transparent text-primary outline-none resize-none caret-white"
                            spellCheck="false"
                        />
                    )}
                    {state === 'idle' && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm">
                            <Button size="lg" className="rounded-2xl" onClick={startGame}>Start Coding Test</Button>
                        </div>
                    )}
                    {state === 'result' && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-md">
                            <CheckCircle2 className="h-12 w-12 text-green-500 mb-4" />
                            <h3 className="text-5xl font-black text-white">{wpm} WPM</h3>
                            <p className="text-white/60 mb-8 uppercase tracking-widest text-xs font-bold">Code Speed Precision</p>
                            <Button size="lg" className="rounded-2xl" onClick={startGame}>Repeat Challenge</Button>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
