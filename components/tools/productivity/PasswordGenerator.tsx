'use client';

import { useState, useCallback, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Copy, RefreshCw } from 'lucide-react';

export default function PasswordGenerator() {
    const [password, setPassword] = useState('');
    const [length, setLength] = useState(16);
    const [includeUppercase, setIncludeUppercase] = useState(true);
    const [includeLowercase, setIncludeLowercase] = useState(true);
    const [includeNumbers, setIncludeNumbers] = useState(true);
    const [includeSymbols, setIncludeSymbols] = useState(true);

    const generatePassword = useCallback(() => {
        let charset = '';
        if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
        if (includeNumbers) charset += '0123456789';
        if (includeSymbols) charset += '!@#$%^&*()_+~`|}{[]:;?><,./-=';

        if (charset === '') return '';

        let generatedPassword = '';
        for (let i = 0; i < length; i++) {
            generatedPassword += charset.charAt(Math.floor(Math.random() * charset.length));
        }
        setPassword(generatedPassword);
    }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols]);

    useEffect(() => {
        generatePassword();
    }, [generatePassword]);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(password);
    };

    return (
        <div className="mx-auto max-w-2xl space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Generator</CardTitle>
                    <CardDescription>
                        Customize your password settings to generate a secure password.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="rounded-lg bg-muted p-6 text-center">
                        <div className="flex items-center justify-center gap-4">
                            <span className="text-2xl font-mono font-bold break-all tracking-wider">
                                {password || 'Select options...'}
                            </span>
                            <div className="flex shrink-0 gap-2">
                                <Button size="icon" variant="ghost" onClick={generatePassword}>
                                    <RefreshCw className="h-4 w-4" />
                                </Button>
                                <Button size="icon" variant="ghost" onClick={copyToClipboard}>
                                    <Copy className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <Label>Password Length: {length}</Label>
                            </div>
                            <input
                                type="range"
                                min="4"
                                max="64"
                                step="1"
                                value={length}
                                onChange={(e) => setLength(parseInt(e.target.value))}
                                className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                            />
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    id="upper"
                                    checked={includeUppercase}
                                    onChange={(e) => setIncludeUppercase(e.target.checked)}
                                    className="h-4 w-4 rounded border-input bg-background"
                                />
                                <Label htmlFor="upper">Include Uppercase</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    id="lower"
                                    checked={includeLowercase}
                                    onChange={(e) => setIncludeLowercase(e.target.checked)}
                                    className="h-4 w-4 rounded border-input bg-background"
                                />
                                <Label htmlFor="lower">Include Lowercase</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    id="numbers"
                                    checked={includeNumbers}
                                    onChange={(e) => setIncludeNumbers(e.target.checked)}
                                    className="h-4 w-4 rounded border-input bg-background"
                                />
                                <Label htmlFor="numbers">Include Numbers</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    id="symbols"
                                    checked={includeSymbols}
                                    onChange={(e) => setIncludeSymbols(e.target.checked)}
                                    className="h-4 w-4 rounded border-input bg-background"
                                />
                                <Label htmlFor="symbols">Include Symbols</Label>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
