'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FileCode2 } from 'lucide-react';

export default function PolynomialAnalyzer() {
    const [coefficients, setCoefficients] = useState('');
    const [result, setResult] = useState<any>(null);

    const analyze = () => {
        const coeffs = coefficients.split(',').map(c => parseFloat(c.trim())).filter(c => !isNaN(c));
        if (coeffs.length === 0) return;

        const degree = coeffs.length - 1;
        const leadingCoef = coeffs[0];

        // Build polynomial string
        let polyString = '';
        coeffs.forEach((c, i) => {
            const power = degree - i;
            if (c === 0) return;

            const sign = c > 0 && i > 0 ? ' + ' : c < 0 ? ' - ' : '';
            const absC = Math.abs(c);
            const coefStr = absC === 1 && power > 0 ? '' : absC.toString();

            if (power === 0) polyString += sign + absC;
            else if (power === 1) polyString += sign + coefStr + 'x';
            else polyString += sign + coefStr + 'x^' + power;
        });

        setResult({
            polynomial: polyString || '0',
            degree,
            leadingCoef,
            type: degree === 0 ? 'Constant' : degree === 1 ? 'Linear' : degree === 2 ? 'Quadratic' : degree === 3 ? 'Cubic' : `Degree ${degree}`
        });
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 py-8">
            <div className="text-center space-y-4">
                <div className="flex items-center justify-center gap-3">
                    <FileCode2 className="h-12 w-12 text-primary" />
                    <h1 className="text-4xl font-black">Polynomial Analyzer</h1>
                </div>
                <p className="text-muted-foreground">Analyze polynomial functions and their properties</p>
            </div>

            <Card className="p-8 space-y-6">
                <Input
                    placeholder="Enter coefficients (e.g., 1, -5, 6 for x² - 5x + 6)"
                    value={coefficients}
                    onChange={(e) => setCoefficients(e.target.value)}
                    className="text-lg"
                />
                <Button onClick={analyze} className="w-full h-12">Analyze Polynomial</Button>
            </Card>

            {result && (
                <Card className="p-8 space-y-4">
                    <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">Polynomial Function</p>
                        <p className="text-3xl font-mono font-bold">f(x) = {result.polynomial}</p>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mt-6">
                        <div className="p-4 bg-muted rounded-lg">
                            <p className="font-bold">Type</p>
                            <p className="text-2xl">{result.type}</p>
                        </div>
                        <div className="p-4 bg-muted rounded-lg">
                            <p className="font-bold">Degree</p>
                            <p className="text-2xl">{result.degree}</p>
                        </div>
                        <div className="p-4 bg-muted rounded-lg">
                            <p className="font-bold">Leading Coefficient</p>
                            <p className="text-2xl">{result.leadingCoef}</p>
                        </div>
                    </div>
                </Card>
            )}
        </div>
    );
}
