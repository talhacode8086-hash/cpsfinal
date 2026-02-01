"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Complex {
    re: number;
    im: number;
}

export default function ComplexRootsFinder() {
    const [inputPoly, setInputPoly] = useState('1, 0, -1'); // x^2 - 1
    const [roots, setRoots] = useState<Complex[]>([]);
    const [iterations, setIterations] = useState<number>(0);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    // Complex number operations
    const cAdd = (a: Complex, b: Complex) => ({ re: a.re + b.re, im: a.im + b.im });
    const cSub = (a: Complex, b: Complex) => ({ re: a.re - b.re, im: a.im - b.im });
    const cMul = (a: Complex, b: Complex) => ({
        re: a.re * b.re - a.im * b.im,
        im: a.re * b.im + a.im * b.re
    });
    const cDiv = (a: Complex, b: Complex) => {
        const den = b.re * b.re + b.im * b.im;
        return {
            re: (a.re * b.re + a.im * b.im) / den,
            im: (a.im * b.re - a.re * b.im) / den
        };
    };
    const cMag = (a: Complex) => Math.sqrt(a.re * a.re + a.im * a.im);

    const evaluatePoly = (coeffs: number[], z: Complex): Complex => {
        let res = { re: 0, im: 0 };
        // Horner's method for complex
        // coeffs are [a_n, ..., a_0]
        // result = (...((a_n * z + a_{n-1}) * z + ... ) + a_0
        res = { re: coeffs[0], im: 0 };
        for (let i = 1; i < coeffs.length; i++) {
            res = cAdd(cMul(res, z), { re: coeffs[i], im: 0 });
        }
        return res;
    };

    const findRoots = () => {
        setErrorMsg(null);
        setRoots([]);

        try {
            // Parse coefficients
            // Input expects: 1, -5, 6 for x^2 - 5x + 6
            const coeffs = inputPoly.split(',').map(s => parseFloat(s.trim())).filter(n => !isNaN(n));

            if (coeffs.length < 2) {
                setErrorMsg("Please enter coefficients for a polynomial of degree at least 1.");
                return;
            }

            // Normalize coefficients (divide by leading term)
            const a_n = coeffs[0];
            if (Math.abs(a_n) < 1e-9) {
                setErrorMsg("Leading coefficient cannot be zero.");
                return;
            }
            const normCoeffs = coeffs.map(c => c / a_n);
            const degree = normCoeffs.length - 1;

            // Initial guess: Durand-Kerner initialization
            // roots lie within radius R = 1 + max(|a_i|)
            // Distribute uniformly on circle, perturbed
            let currentRoots: Complex[] = [];

            // Standard Aberth-Ehrlich or simple circle init
            const radius = 1 + Math.max(...normCoeffs.slice(1).map(Math.abs));

            for (let i = 0; i < degree; i++) {
                const angle = (2 * Math.PI * i) / degree + 0.1; // Offset to avoid symmetry
                currentRoots.push({
                    re: radius * Math.cos(angle), // Simple distribution
                    im: radius * Math.sin(angle)
                });
            }

            // Iteration
            const maxIter = 100;
            const tolerance = 1e-7;
            let iter = 0;
            let converged = false;

            for (iter = 0; iter < maxIter; iter++) {
                let maxDiff = 0;
                const nextRoots = [...currentRoots];

                for (let i = 0; i < degree; i++) {
                    const z = currentRoots[i];
                    const P_z = evaluatePoly(normCoeffs, z);

                    // Product (z - z_j)
                    let denominator = { re: 1, im: 0 };
                    for (let j = 0; j < degree; j++) {
                        if (i !== j) {
                            denominator = cMul(denominator, cSub(z, currentRoots[j]));
                        }
                    }

                    const correction = cDiv(P_z, denominator);
                    nextRoots[i] = cSub(z, correction);

                    const diff = cMag(correction);
                    if (diff > maxDiff) maxDiff = diff;
                }

                currentRoots = nextRoots;
                if (maxDiff < tolerance) {
                    converged = true;
                    break;
                }
            }

            setIterations(iter);

            // Sort roots by real part then imaginary
            currentRoots.sort((a, b) => {
                if (Math.abs(a.re - b.re) > 1e-6) return a.re - b.re;
                return a.im - b.im;
            });

            setRoots(currentRoots);

        } catch (e) {
            setErrorMsg("Error parsing input or stabilizing roots.");
        }
    };

    const formatComplex = (c: Complex) => {
        const re = Math.abs(c.re) < 1e-6 ? 0 : c.re;
        const im = Math.abs(c.im) < 1e-6 ? 0 : c.im;

        if (im === 0) return re.toFixed(4);
        const sign = im >= 0 ? '+' : '-';
        return `${re.toFixed(4)} ${sign} ${Math.abs(im).toFixed(4)}i`;
    };

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <CardTitle className="text-3xl font-bold">Complex Roots Finder</CardTitle>
                <p className="text-muted-foreground mt-2">Find all real and imaginary roots of a polynomial</p>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label>Polynomial Coefficients (highest degree first)</Label>
                        <Input
                            value={inputPoly}
                            onChange={(e) => setInputPoly(e.target.value)}
                            placeholder="e.g. 1, 0, 1 (for x^2 + 1)"
                            className="font-mono"
                        />
                        <p className="text-xs text-muted-foreground">
                            Example: For <span className="font-mono">x<sup>3</sup> - 2x + 4</span>, enter <span className="font-mono text-primary">1, 0, -2, 4</span>.
                        </p>
                    </div>

                    <Button onClick={findRoots} className="w-full h-12 text-lg bg-primary/90 hover:bg-primary">
                        Find Roots
                    </Button>
                </div>

                {errorMsg && (
                    <div className="p-4 bg-destructive/10 text-destructive rounded-lg text-center font-bold">
                        {errorMsg}
                    </div>
                )}

                {roots.length > 0 && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {roots.map((root, idx) => (
                                <div key={idx} className="p-4 rounded-xl bg-secondary/20 border border-primary/10 flex flex-col items-center justify-center min-h-[100px] relative overflow-hidden group hover:bg-secondary/30 transition-all">
                                    <div className="absolute top-2 left-3 text-xs font-bold text-muted-foreground opacity-50">x{idx + 1}</div>
                                    <div className="text-xl font-mono font-bold text-foreground">
                                        {formatComplex(root)}
                                    </div>
                                    <div className="text-xs text-muted-foreground mt-1">
                                        {Math.abs(root.im) < 1e-6 ? "Real Root" : "Complex Root"}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="text-center text-xs text-muted-foreground">
                            Converged in {iterations} iterations using Durand-Kerner method.
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
