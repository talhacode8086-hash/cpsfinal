'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Activity, ShieldAlert, CheckCircle2 } from 'lucide-react';

export default function MouseDurability() {
    const [clicks, setClicks] = useState({ left: 0, right: 0, middle: 0 });
    const [doubleClicks, setDoubleClicks] = useState(0);
    const [lastClickTime, setLastClickTime] = useState(0);

    const handleClick = (button: 'left' | 'right' | 'middle') => {
        const now = Date.now();
        if (now - lastClickTime < 50 && button === 'left') { // 50ms is common debounce threshold
            setDoubleClicks(prev => prev + 1);
        }
        setLastClickTime(now);
        setClicks(prev => ({ ...prev, [button]: prev[button] + 1 }));
    };

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {(['left', 'right', 'middle'] as const).map(btn => (
                    <Card key={btn} className="relative overflow-hidden group">
                        <CardContent className="pt-8 text-center">
                            <div className="absolute top-2 right-2 opacity-10 group-hover:opacity-20 transition-opacity">
                                <Activity className="h-12 w-12" />
                            </div>
                            <div className="text-xs font-bold uppercase text-muted-foreground mb-1">{btn} button</div>
                            <div className="text-5xl font-black text-primary">{clicks[btn]}</div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div
                className="h-[250px] bg-muted/20 rounded-3xl border-4 border-dashed border-primary/20 flex items-center justify-center cursor-pointer hover:bg-muted/30 transition-all select-none"
                onMouseDown={(e) => {
                    e.preventDefault();
                    if (e.button === 0) handleClick('left');
                    if (e.button === 1) handleClick('middle');
                    if (e.button === 2) handleClick('right');
                }}
                onContextMenu={(e) => e.preventDefault()}
            >
                <div className="text-center space-y-2">
                    <p className="text-xl font-bold">CLICK ME RAPIDLY</p>
                    <p className="text-sm text-muted-foreground">Test for missed clicks or accidental double clicks</p>
                </div>
            </div>

            <Card className={doubleClicks > 0 ? "border-destructive/50 bg-destructive/5" : "border-primary/50 bg-primary/5"}>
                <CardContent className="py-6 flex items-center gap-4">
                    {doubleClicks > 0 ? (
                        <ShieldAlert className="h-8 w-8 text-destructive" />
                    ) : (
                        <CheckCircle2 className="h-8 w-8 text-primary" />
                    )}
                    <div>
                        <div className="font-bold">Ghost Click Detection (Debounce Test)</div>
                        <p className="text-sm text-muted-foreground">
                            {doubleClicks > 0
                                ? `Detected ${doubleClicks} potential unintended double-clicks (below 50ms).`
                                : "No unintended ghost clicks detected so far."}
                        </p>
                    </div>
                </CardContent>
            </Card>

            <div className="flex justify-center">
                <Button variant="ghost" onClick={() => { setClicks({ left: 0, right: 0, middle: 0 }); setDoubleClicks(0); }}>
                    Reset Counters
                </Button>
            </div>
        </div>
    );
}
