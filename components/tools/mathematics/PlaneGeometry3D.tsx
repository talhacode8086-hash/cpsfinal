"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function PlaneGeometry3D() {
    // Mode 1: Plane from 3 Points
    const [p1, setP1] = useState('1, 0, 0');
    const [p2, setP2] = useState('0, 1, 0');
    const [p3, setP3] = useState('0, 0, 1');
    const [planeRes, setPlaneRes] = useState<any>(null);

    // Mode 2: Distance Point to Plane
    const [distPt, setDistPt] = useState('2, 3, 4');
    const [planeEq, setPlaneEq] = useState('1, 1, 1, -1'); // Ax + By + Cz + D = 0 -> A,B,C,D
    const [distRes, setDistRes] = useState<string | null>(null);

    const parseVec = (str: string) => str.split(',').map(s => parseFloat(s.trim()));

    const calculatePlane = () => {
        try {
            const A = parseVec(p1);
            const B = parseVec(p2);
            const C = parseVec(p3);

            if ([A, B, C].some(v => v.length !== 3 || v.some(isNaN))) {
                setPlaneRes({ error: "Invalid points. Enter x, y, z" });
                return;
            }

            // Vectors AB and AC
            const AB = [B[0] - A[0], B[1] - A[1], B[2] - A[2]];
            const AC = [C[0] - A[0], C[1] - A[1], C[2] - A[2]];

            // Normal n = AB x AC
            const nx = AB[1] * AC[2] - AB[2] * AC[1];
            const ny = AB[2] * AC[0] - AB[0] * AC[2];
            const nz = AB[0] * AC[1] - AB[1] * AC[0];

            // Equation: nx(x-x0) + ny(y-y0) + nz(z-z0) = 0
            // nx*x + ny*y + nz*z - (nx*x0 + ny*y0 + nz*z0) = 0
            // D = - (nx*A[0] + ny*A[1] + nz*A[2])
            const D = -(nx * A[0] + ny * A[1] + nz * A[2]);

            // Check if collinear (normal is zero vector)
            if (Math.abs(nx) < 1e-9 && Math.abs(ny) < 1e-9 && Math.abs(nz) < 1e-9) {
                setPlaneRes({ error: "Points are collinear. Cannot determine a unique plane." });
                return;
            }

            // Simplify if possible (divide by GCD or magnitude? Just keeping raw is fine for now, or normalize)
            // Let's keep it simply formatted.

            const formatTerm = (c: number, v: string) => {
                if (c === 0) return '';
                const sign = c < 0 ? ' - ' : ' + ';
                const val = Math.abs(c);
                if (val === 1) return `${sign}${v}`;
                return `${sign}${val}${v}`;
            };

            // Build string: "ax + by + cz + d = 0"
            // First term special handling
            let eqStr = "";
            let first = true;

            if (nx !== 0) {
                eqStr += `${nx}x`;
                first = false;
            }
            if (ny !== 0) {
                if (first) eqStr += `${ny}y`;
                else eqStr += formatTerm(ny, 'y');
                first = false;
            }
            if (nz !== 0) {
                if (first) eqStr += `${nz}z`;
                else eqStr += formatTerm(nz, 'z');
                first = false;
            }
            if (D !== 0) {
                if (first) eqStr += `${D}`;
                else eqStr += formatTerm(D, '');
            }
            eqStr += " = 0";

            // Fix leading " + "
            if (eqStr.startsWith(' + ')) eqStr = eqStr.substring(3);

            setPlaneRes({
                normal: `(${nx}, ${ny}, ${nz})`,
                equation: eqStr,
                d: D
            });

        } catch (e) {
            setPlaneRes({ error: "Error parsing input." });
        }
    };

    const calculateDist = () => {
        try {
            const P = parseVec(distPt);
            const Eq = parseVec(planeEq); // A, B, C, D

            if (P.length !== 3 || Eq.length !== 4 || P.some(isNaN) || Eq.some(isNaN)) {
                setDistRes("Invalid input.");
                return;
            }

            const [x, y, z] = P;
            const [A, B, C, D] = Eq;

            // Dist = |Ax + By + Cz + D| / sqrt(A^2 + B^2 + C^2)
            const num = Math.abs(A * x + B * y + C * z + D);
            const den = Math.sqrt(A * A + B * B + C * C);

            if (den === 0) {
                setDistRes("Invalid plane equation (Normal is zero vector).");
                return;
            }

            const dist = num / den;
            setDistRes(dist.toFixed(6));

        } catch (e) {
            setDistRes("Error calculating.");
        }
    };

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <CardTitle className="text-3xl font-bold">3D Plane Geometry</CardTitle>
                <p className="text-muted-foreground mt-2">Plane equations and 3D distances</p>
            </CardHeader>
            <CardContent className="p-8">
                <Tabs defaultValue="points" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-8">
                        <TabsTrigger value="points">Plane from 3 Points</TabsTrigger>
                        <TabsTrigger value="dist">Point to Plane Distance</TabsTrigger>
                    </TabsList>

                    <TabsContent value="points" className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <Label>Point 1 (x, y, z)</Label>
                                <Input value={p1} onChange={(e) => setP1(e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label>Point 2 (x, y, z)</Label>
                                <Input value={p2} onChange={(e) => setP2(e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label>Point 3 (x, y, z)</Label>
                                <Input value={p3} onChange={(e) => setP3(e.target.value)} />
                            </div>
                        </div>
                        <Button onClick={calculatePlane} className="w-full">Find Plane Equation</Button>

                        {planeRes && (
                            <div className="mt-6 p-6 bg-secondary/20 rounded-xl border border-primary/10 animate-in fade-in">
                                {planeRes.error ? (
                                    <div className="text-destructive font-bold">{planeRes.error}</div>
                                ) : (
                                    <div className="space-y-4">
                                        <div>
                                            <div className="text-xs text-muted-foreground uppercase tracking-widest">Normal Vector</div>
                                            <div className="text-xl font-mono text-primary font-bold">{planeRes.normal}</div>
                                        </div>
                                        <div>
                                            <div className="text-xs text-muted-foreground uppercase tracking-widest">Equation</div>
                                            <div className="text-2xl font-mono text-primary font-bold">{planeRes.equation}</div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </TabsContent>

                    <TabsContent value="dist" className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label>Point P (x, y, z)</Label>
                                <Input value={distPt} onChange={(e) => setDistPt(e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label>Plane Coefficients (A, B, C, D)</Label>
                                <Input
                                    value={planeEq}
                                    onChange={(e) => setPlaneEq(e.target.value)}
                                    placeholder="1, -2, 3, 4 for x - 2y + 3z + 4 = 0"
                                />
                                <p className="text-xs text-muted-foreground">For Ax + By + Cz + D = 0</p>
                            </div>
                        </div>
                        <Button onClick={calculateDist} className="w-full">Calculate Distance</Button>

                        {distRes && (
                            <div className="mt-6 p-6 bg-secondary/20 rounded-xl border border-primary/10 text-center animate-in fade-in">
                                <div className="text-xs text-muted-foreground uppercase tracking-widest mb-2">Distance</div>
                                <div className="text-3xl font-mono font-bold text-primary">{distRes}</div>
                            </div>
                        )}
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    );
}
