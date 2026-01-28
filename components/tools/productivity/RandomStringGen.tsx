'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Copy, RefreshCw, Hash } from 'lucide-react';
import { toast } from 'sonner';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

export default function RandomStringGen() {
    const [result, setResult] = useState('');
    const [length, setLength] = useState([16]);
    const [options, setOptions] = useState({
        uppercase: true,
        lowercase: true,
        numbers: true,
        symbols: false
    });

    const handleCopy = () => {
        if (!result) return;
        navigator.clipboard.writeText(result);
        toast.success('Copied to clipboard!');
    };

    const generateString = () => {
        let charset = "";
        if (options.uppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        if (options.lowercase) charset += "abcdefghijklmnopqrstuvwxyz";
        if (options.numbers) charset += "0123456789";
        if (options.symbols) charset += "!@#$%^&*()_+~`|}{[]:;?><,./-=";

        if (!charset) {
            toast.error('Please select at least one character set');
            return;
        }

        let generated = "";
        for (let i = 0; i < length[0]; i++) {
            generated += charset.charAt(Math.floor(Math.random() * charset.length));
        }
        setResult(generated);
        toast.success('New string generated');
    };

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm overflow-hidden">
            <CardHeader className="text-center border-b border-primary/5 pb-6 sm:pb-8 p-4 sm:p-6 md:p-8">
                <div className="mx-auto w-12 h-12 sm:w-16 sm:h-16 bg-primary/10 rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-4">
                    <Hash className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
                </div>
                <CardTitle className="text-2xl sm:text-3xl font-bold">Random String Generator</CardTitle>
                <p className="text-xs sm:text-sm md:text-base text-muted-foreground mt-1 sm:mt-2">Create secure, random character sequences instantly.</p>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-8">
                <div className="space-y-4 sm:space-y-6 max-w-lg mx-auto">
                    <div className="space-y-3 sm:space-y-4">
                        <div className="flex justify-between items-center">
                            <Label className="text-base sm:text-lg font-bold">Length: {length[0]}</Label>
                        </div>
                        <Slider
                            value={length}
                            onValueChange={setLength}
                            min={4}
                            max={128}
                            step={1}
                            className="py-2 sm:py-4"
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="upper"
                                checked={options.uppercase}
                                onCheckedChange={(v: boolean) => setOptions(prev => ({ ...prev, uppercase: v }))}
                            />
                            <Label htmlFor="upper" className="text-xs sm:text-sm font-medium cursor-pointer">Uppercase (A-Z)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="lower"
                                checked={options.lowercase}
                                onCheckedChange={(v: boolean) => setOptions(prev => ({ ...prev, lowercase: v }))}
                            />
                            <Label htmlFor="lower" className="text-xs sm:text-sm font-medium cursor-pointer">Lowercase (a-z)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="numbers"
                                checked={options.numbers}
                                onCheckedChange={(v: boolean) => setOptions(prev => ({ ...prev, numbers: v }))}
                            />
                            <Label htmlFor="numbers" className="text-xs sm:text-sm font-medium cursor-pointer">Numbers (0-9)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="symbols"
                                checked={options.symbols}
                                onCheckedChange={(v: boolean) => setOptions(prev => ({ ...prev, symbols: v }))}
                            />
                            <Label htmlFor="symbols" className="text-xs sm:text-sm font-medium cursor-pointer">Symbols (!@#$)</Label>
                        </div>
                    </div>

                    <Button onClick={generateString} size="lg" className="w-full rounded-xl sm:rounded-2xl h-12 sm:h-14 text-sm sm:text-lg font-bold shadow-xl shadow-primary/20">
                        <RefreshCw className="mr-2 h-4 w-4 sm:h-5 sm:w-5" /> Generate String
                    </Button>
                </div>

                <div className="relative">
                    <Textarea
                        readOnly
                        placeholder="Generated string will appear here..."
                        className="min-h-[120px] sm:min-h-[150px] text-lg sm:text-2xl p-4 sm:p-8 rounded-xl sm:rounded-2xl border-primary/20 bg-muted/30 resize-none font-mono text-center tracking-wider break-all"
                        value={result}
                    />
                    {result && (
                        <div className="absolute bottom-4 right-4 flex gap-2">
                            <Button variant="outline" className="rounded-xl shadow-sm bg-background/80 backdrop-blur-sm" onClick={handleCopy}>
                                <Copy className="mr-2 h-4 w-4" /> Copy String
                            </Button>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
