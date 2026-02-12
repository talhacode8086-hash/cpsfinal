'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Box } from 'lucide-react';

export default function MensurationCalculator() {
    const [shape, setShape] = useState<'cube' | 'cuboid' | 'cylinder' | 'sphere' | 'cone'>('cube');
    const [dim1, setDim1] = useState('');
    const [dim2, setDim2] = useState('');
    const [dim3, setDim3] = useState('');
    const [result, setResult] = useState<any>(null);

    const calculate = () => {
        const d1 = parseFloat(dim1);
        const d2 = parseFloat(dim2);
        const d3 = parseFloat(dim3);

        let area, volume;

        switch (shape) {
            case 'cube':
                area = 6 * d1 * d1;
                volume = d1 * d1 * d1;
                break;
            case 'cuboid':
                area = 2 * (d1 * d2 + d2 * d3 + d1 * d3);
                volume = d1 * d2 * d3;
                break;
            case 'cylinder':
                area = 2 * Math.PI * d1 * (d1 + d2);
                volume = Math.PI * d1 * d1 * d2;
                break;
            case 'sphere':
                area = 4 * Math.PI * d1 * d1;
                volume = (4 / 3) * Math.PI * d1 * d1 * d1;
                break;
            case 'cone':
                const l = Math.sqrt(d1 * d1 + d2 * d2);
                area = Math.PI * d1 * (d1 + l);
                volume = (1 / 3) * Math.PI * d1 * d1 * d2;
                break;
        }

        setResult({ area: area?.toFixed(4), volume: volume?.toFixed(4) });
    };

    const getInputLabels = () => {
        switch (shape) {
            case 'cube': return ['Side'];
            case 'cuboid': return ['Length', 'Width', 'Height'];
            case 'cylinder': return ['Radius', 'Height'];
            case 'sphere': return ['Radius'];
            case 'cone': return ['Radius', 'Height'];
        }
    };

    const labels = getInputLabels();

    return (
        <div className="max-w-4xl mx-auto space-y-8 py-8">
            <div className="text-center space-y-4">
                <div className="flex items-center justify-center gap-3">
                    <Box className="h-12 w-12 text-primary" />
                    <h1 className="text-4xl font-black">Mensuration Calculator</h1>
                </div>
                <p className="text-muted-foreground">Calculate surface area and volume of 3D shapes</p>
            </div>

            <Card className="p-8 space-y-6">
                <Select value={shape} onValueChange={(v: any) => setShape(v)}>
                    <SelectTrigger>
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="cube">Cube</SelectItem>
                        <SelectItem value="cuboid">Cuboid</SelectItem>
                        <SelectItem value="cylinder">Cylinder</SelectItem>
                        <SelectItem value="sphere">Sphere</SelectItem>
                        <SelectItem value="cone">Cone</SelectItem>
                    </SelectContent>
                </Select>

                <div className="space-y-4">
                    {labels[0] && <Input placeholder={labels[0]} value={dim1} onChange={(e) => setDim1(e.target.value)} type="number" step="any" />}
                    {labels[1] && <Input placeholder={labels[1]} value={dim2} onChange={(e) => setDim2(e.target.value)} type="number" step="any" />}
                    {labels[2] && <Input placeholder={labels[2]} value={dim3} onChange={(e) => setDim3(e.target.value)} type="number" step="any" />}
                </div>

                <Button onClick={calculate} className="w-full h-12">Calculate</Button>
            </Card>

            {result && (
                <Card className="p-8">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-6 bg-muted rounded-lg">
                            <p className="font-bold">Surface Area</p>
                            <p className="text-3xl font-bold mt-2">{result.area}</p>
                        </div>
                        <div className="p-6 bg-muted rounded-lg">
                            <p className="font-bold">Volume</p>
                            <p className="text-3xl font-bold mt-2">{result.volume}</p>
                        </div>
                    </div>
                </Card>
            )}
        </div>
    );
}
