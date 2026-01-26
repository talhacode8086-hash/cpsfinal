'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function ColorBlindSim() {
    const [deficiency, setDeficiency] = useState('none');

    const filters: Record<string, string> = {
        none: 'none',
        protanopia: 'grayscale(1) brightness(0.9) contrast(1.2) sepia(0.5) hue-rotate(-20deg)',
        deuteranopia: 'grayscale(0.8) sepia(0.2) hue-rotate(50deg)',
        tritanopia: 'grayscale(0.5) sepia(0.1) hue-rotate(180deg)',
        achromatopsia: 'grayscale(1)'
    };

    return (
        <Card className="max-w-6xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm overflow-hidden">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Eye className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Color Blindness Simulator</CardTitle>
                <p className="text-muted-foreground mt-2">Validate your design accessibility by simulating different visual deficiencies.</p>
            </CardHeader>
            <CardContent className="p-12 space-y-12">
                <div className="flex justify-center mb-8">
                    <Select value={deficiency} onValueChange={setDeficiency}>
                        <SelectTrigger className="h-16 w-80 rounded-2xl bg-muted/20 border-primary/10 text-lg font-bold">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="none">Normal Vision</SelectItem>
                            <SelectItem value="protanopia">Protanopia (Red-blind)</SelectItem>
                            <SelectItem value="deuteranopia">Deuteranopia (Green-blind)</SelectItem>
                            <SelectItem value="tritanopia">Tritanopia (Blue-blind)</SelectItem>
                            <SelectItem value="achromatopsia">Achromatopsia (Total-blind)</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div
                    className="grid grid-cols-1 md:grid-cols-2 gap-12 transition-all duration-700 ease-in-out"
                    style={{ filter: filters[deficiency] }}
                >
                    {/* UI Samples */}
                    <div className="space-y-8 p-12 rounded-[3.5rem] bg-background border-2 border-primary/5 shadow-2xl">
                        <div className="h-12 w-32 bg-primary rounded-xl" />
                        <div className="h-24 w-full bg-destructive/80 rounded-2xl" />
                        <div className="flex gap-4">
                            <div className="h-16 w-16 bg-amber-500 rounded-full" />
                            <div className="h-16 w-16 bg-green-500 rounded-full" />
                            <div className="h-16 w-16 bg-blue-500 rounded-full" />
                        </div>
                        <div className="space-y-2">
                            <div className="h-4 w-full bg-muted/20 rounded-full" />
                            <div className="h-4 w-3/4 bg-muted/20 rounded-full" />
                        </div>
                    </div>

                    <div className="space-y-8 p-12 rounded-[3.5rem] bg-background border-2 border-primary/5 shadow-2xl overflow-hidden relative group">
                        <img
                            src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&auto=format&fit=crop&q=60"
                            alt="Color Demo"
                            className="w-full h-80 object-cover rounded-3xl"
                        />
                        <div className="p-6 bg-primary text-white rounded-2xl text-center font-black">
                            CHECKING ACCESSIBILITY
                        </div>
                    </div>
                </div>

                <div className="p-8 rounded-[3rem] bg-primary/5 border border-primary/10 flex items-center gap-6">
                    <Info className="h-10 w-10 text-primary shrink-0" />
                    <div className="text-xs text-muted-foreground leading-relaxed italic">
                        <strong>Note:</strong> This simulation is an approximation using CSS filters to demonstrate how different colors can appear similar to those with CVD. Always use high contrast and secondary indicators (icons/text) in your UI.
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
