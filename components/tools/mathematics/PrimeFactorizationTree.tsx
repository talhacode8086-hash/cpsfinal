"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function PrimeFactorizationTree() {
    const [numStr, setNumStr] = useState('60');
    const [tree, setTree] = useState<any>(null);

    const calculate = () => {
        let n = parseInt(numStr);
        if (isNaN(n) || n < 2) {
            setTree({ error: "Enter an integer > 1." });
            return;
        }
        if (n > 1000000000) {
            setTree({ error: "Number too large for this tool." });
            return;
        }

        // Generate tree structure: { val: n, left: {val: factor}, right: {val: quotient, ...} }
        // Simple strategy: Find smallest factor `p`. Left = p, Right = n/p. Recurse on Right.

        const buildTree = (val: number): any => {
            let factor = -1;
            // Trial division
            // optimization: checks up to sqrt(val), then val itself
            const limit = Math.sqrt(val);
            for (let i = 2; i <= limit; i++) {
                if (val % i === 0) {
                    factor = i;
                    break;
                }
            }
            if (factor === -1) {
                // val is prime
                return { val: val, isPrime: true };
            }

            return {
                val: val,
                isPrime: false,
                left: { val: factor, isPrime: true }, // Smallest factor of composite is prime
                right: buildTree(val / factor)
            };
        };

        const root = buildTree(n);

        // Flatten for linear step display if needed, but we want visual tree
        setTree({ root });
    };

    // Recursive component for Tree Node
    const TreeNode = ({ node }: { node: any }) => {
        if (!node) return null;

        return (
            <div className="flex flex-col items-center">
                <div className={`
                    w-12 h-12 flex items-center justify-center rounded-full border-2 
                    font-bold text-lg mb-2 z-10 bg-background
                    ${node.isPrime ? 'border-primary text-primary bg-primary/10' : 'border-muted-foreground text-muted-foreground'}
                `}>
                    {node.val}
                </div>

                {!node.isPrime && (
                    <div className="flex flex-col items-center relative">
                        {/* CSS Branch connection */}
                        <div className="h-6 w-full flex">
                            <div className="h-full w-1/2 border-r border-muted-foreground/30 transform skew-x-12 origin-bottom-right translate-x-3"></div>
                            <div className="h-full w-1/2 border-l border-muted-foreground/30 transform -skew-x-12 origin-bottom-left -translate-x-3"></div>
                        </div>
                        <div className="flex gap-8 mt-2">
                            <TreeNode node={node.left} />
                            <TreeNode node={node.right} />
                        </div>
                    </div>
                )}
            </div>
        );
    };

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <CardTitle className="text-3xl font-bold">Prime Factorization Tree</CardTitle>
                <p className="text-muted-foreground mt-2">Visualize the breakdown of composite numbers</p>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
                <div className="flex gap-4 items-end max-w-md mx-auto">
                    <div className="flex-1 space-y-2">
                        <Label>Number</Label>
                        <Input
                            type="number"
                            value={numStr}
                            onChange={(e) => setNumStr(e.target.value)}
                            placeholder="e.g. 60"
                        />
                    </div>
                    <Button onClick={calculate} className="bg-primary/90 hover:bg-primary">
                        Factorize
                    </Button>
                </div>

                {tree && (
                    <div className="mt-8 overflow-x-auto p-8 rounded-xl bg-secondary/10 border border-primary/5 min-h-[300px] flex items-start justify-center animate-in fade-in">
                        {tree.error ? (
                            <div className="text-destructive font-bold">{tree.error}</div>
                        ) : (
                            <TreeNode node={tree.root} />
                        )}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
