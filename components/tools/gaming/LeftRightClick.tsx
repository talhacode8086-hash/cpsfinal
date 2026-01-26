'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';


export default function LeftRightClick() {
    const [counts, setCounts] = useState({ left: 0, right: 0 });
    const [fastest, setFastest] = useState({ left: 0, right: 0 });

    const handleAction = (type: 'left' | 'right') => {
        setCounts(prev => ({ ...prev, [type]: prev[type] + 1 }));
    };

    const ratio = counts.left + counts.right === 0
        ? 50
        : (counts.left / (counts.left + counts.right)) * 100;

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row gap-6">
                <div className="flex-1 space-y-4">
                    <Card className="border-blue-500/20 bg-blue-500/5">
                        <CardContent className="pt-6 text-center">
                            <div className="text-xs font-bold uppercase text-blue-500 mb-1">Left Click Strength</div>
                            <div className="text-6xl font-black text-blue-600">{counts.left}</div>
                        </CardContent>
                    </Card>
                    <Button
                        className="w-full h-32 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-xl font-bold transition-transform active:scale-95"
                        onMouseDown={(e) => e.button === 0 && handleAction('left')}
                    >
                        LEFT CLICK
                    </Button>
                </div>

                <div className="flex-1 space-y-4">
                    <Card className="border-red-500/20 bg-red-500/5">
                        <CardContent className="pt-6 text-center">
                            <div className="text-xs font-bold uppercase text-red-500 mb-1">Right Click Strength</div>
                            <div className="text-6xl font-black text-red-600">{counts.right}</div>
                        </CardContent>
                    </Card>
                    <Button
                        className="w-full h-32 bg-red-600 hover:bg-red-700 text-white rounded-2xl text-xl font-bold transition-transform active:scale-95"
                        onMouseDown={(e) => e.button === 2 && handleAction('right')}
                        onContextMenu={(e) => e.preventDefault()}
                    >
                        RIGHT CLICK
                    </Button>
                </div>
            </div>

            <div className="space-y-2">
                <div className="flex justify-between text-sm font-bold">
                    <span className="text-blue-600">LEFT {ratio.toFixed(0)}%</span>
                    <span className="text-red-600">RIGHT {(100 - ratio).toFixed(0)}%</span>
                </div>
                <div className="h-6 w-full bg-muted rounded-full overflow-hidden flex shadow-inner">
                    <div
                        className="h-full bg-blue-600 transition-all duration-300"
                        style={{ width: `${ratio}%` }}
                    />
                    <div
                        className="h-full bg-red-600 transition-all duration-300"
                        style={{ width: `${100 - ratio}%` }}
                    />
                </div>
                <p className="text-center text-sm text-muted-foreground mt-2 italic">
                    Compare yours or your mouse's actuation speed between primary and secondary buttons.
                </p>
            </div>

            <div className="flex justify-center">
                <Button variant="outline" onClick={() => setCounts({ left: 0, right: 0 })}>
                    Reset Comparison
                </Button>
            </div>
        </div>
    );
}
