'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { convertSensitivity, games } from '@/lib/calculations/sensitivity';
import { Copy } from 'lucide-react';

export default function SensitivityConverter() {
    const [amount, setAmount] = useState<string>('1');
    const [sourceGame, setSourceGame] = useState<string>('cs2');
    const [targetGame, setTargetGame] = useState<string>('valorant');
    const [sourceDpi, setSourceDpi] = useState<string>('800');
    const [targetDpi, setTargetDpi] = useState<string>('800');

    const result = convertSensitivity(
        parseFloat(amount),
        sourceGame,
        targetGame,
        parseFloat(sourceDpi),
        parseFloat(targetDpi)
    );

    const copyToClipboard = () => {
        navigator.clipboard.writeText(result);
    };

    return (
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Converter</CardTitle>
                    <CardDescription>
                        Enter your current settings to find the equivalent in another game.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label>Source Game</Label>
                            <select
                                className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                value={sourceGame}
                                onChange={(e) => setSourceGame(e.target.value)}
                            >
                                {games.map((g) => (
                                    <option key={g.id} value={g.id}>
                                        {g.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="space-y-2">
                            <Label>Target Game</Label>
                            <select
                                className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                value={targetGame}
                                onChange={(e) => setTargetGame(e.target.value)}
                            >
                                {games.map((g) => (
                                    <option key={g.id} value={g.id}>
                                        {g.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="space-y-2">
                            <Label>Sensitivity</Label>
                            <Input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>DPI (Source)</Label>
                            <Input
                                type="number"
                                value={sourceDpi}
                                onChange={(e) => setSourceDpi(e.target.value)}
                            />
                        </div>
                        <div className="hidden md:block"></div>
                        <div className="space-y-2">
                            <Label>DPI (Target) - Optional</Label>
                            <Input
                                type="number"
                                value={targetDpi}
                                onChange={(e) => setTargetDpi(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="rounded-lg bg-muted p-6">
                        <div className="flex flex-col items-center justify-center space-y-2 text-center">
                            <span className="text-sm font-medium text-muted-foreground">
                                Converted Sensitivity
                            </span>
                            <div className="flex items-center gap-4">
                                <span className="text-4xl font-bold tracking-tight">
                                    {result || '---'}
                                </span>
                                <Button size="icon" variant="ghost" onClick={copyToClipboard}>
                                    <Copy className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>How it works</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">
                        Sensitivity is calculated based on the &quot;Yaw&quot; value of each game engine, which determines how many degrees the camera turns per mouse count. We also factor in DPI (Dots Per Inch) key differences to ensure your &quot;cm/360&quot; (physical distance needed to turn 360 degrees) remains constant across games.
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
