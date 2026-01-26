'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calculator } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ScientificCalculatorPro() {
    const [display, setDisplay] = useState('0');
    const [equation, setEquation] = useState('');

    const handleInput = (val: string) => {
        if (display === '0' || display === 'Error') {
            setDisplay(val);
        } else {
            setDisplay(display + val);
        }
    };

    const handleOp = (op: string) => {
        setEquation(display + ' ' + op + ' ');
        setDisplay('0');
    };

    const calculate = () => {
        try {
            const result = eval(equation + display);
            setDisplay(result.toString());
            setEquation('');
        } catch (e) {
            setDisplay('Error');
        }
    };

    const handleScientific = (func: string) => {
        const num = parseFloat(display);
        let res = 0;
        switch (func) {
            case 'sin': res = Math.sin(num); break;
            case 'cos': res = Math.cos(num); break;
            case 'tan': res = Math.tan(num); break;
            case 'log': res = Math.log10(num); break;
            case 'ln': res = Math.log(num); break;
            case 'sqrt': res = Math.sqrt(num); break;
            case 'pow': res = Math.pow(num, 2); break;
        }
        setDisplay(res.toFixed(4).replace(/\.?0+$/, ''));
    };

    return (
        <Card className="max-w-2xl mx-auto border-primary/10 shadow-2xl bg-card overflow-hidden rounded-[3rem]">
            <CardHeader className="bg-muted/30 p-8 border-b border-primary/5">
                <div className="flex justify-between items-center mb-4">
                    <Calculator className="h-6 w-6 text-primary" />
                    <span className="text-[10px] font-black uppercase tracking-widest opacity-40">Scientific Core v1.0</span>
                </div>
                <div className="text-right space-y-1 overflow-hidden">
                    <div className="text-sm font-bold text-muted-foreground h-6 animate-in slide-in-from-right-4">{equation}</div>
                    <div className="text-6xl font-black text-primary truncate leading-tight">{display}</div>
                </div>
            </CardHeader>
            <CardContent className="p-8 grid grid-cols-4 gap-3 bg-card">
                {/* Row 1 */}
                <CalcBtn label="sin" onClick={() => handleScientific('sin')} variant="secondary" />
                <CalcBtn label="cos" onClick={() => handleScientific('cos')} variant="secondary" />
                <CalcBtn label="tan" onClick={() => handleScientific('tan')} variant="secondary" />
                <CalcBtn label="AC" onClick={() => { setDisplay('0'); setEquation(''); }} variant="destructive" />

                {/* Row 2 */}
                <CalcBtn label="log" onClick={() => handleScientific('log')} variant="secondary" />
                <CalcBtn label="ln" onClick={() => handleScientific('ln')} variant="secondary" />
                <CalcBtn label="√" onClick={() => handleScientific('sqrt')} variant="secondary" />
                <CalcBtn label="÷" onClick={() => handleOp('/')} variant="primary" />

                {/* Row 3 */}
                <CalcBtn label="7" onClick={() => handleInput('7')} />
                <CalcBtn label="8" onClick={() => handleInput('8')} />
                <CalcBtn label="9" onClick={() => handleInput('9')} />
                <CalcBtn label="×" onClick={() => handleOp('*')} variant="primary" />

                {/* Row 4 */}
                <CalcBtn label="4" onClick={() => handleInput('4')} />
                <CalcBtn label="5" onClick={() => handleInput('5')} />
                <CalcBtn label="6" onClick={() => handleInput('6')} />
                <CalcBtn label="-" onClick={() => handleOp('-')} variant="primary" />

                {/* Row 5 */}
                <CalcBtn label="1" onClick={() => handleInput('1')} />
                <CalcBtn label="2" onClick={() => handleInput('2')} />
                <CalcBtn label="3" onClick={() => handleInput('3')} />
                <CalcBtn label="+" onClick={() => handleOp('+')} variant="primary" />

                {/* Row 6 */}
                <CalcBtn label="0" onClick={() => handleInput('0')} className="col-span-2" />
                <CalcBtn label="." onClick={() => handleInput('.')} />
                <CalcBtn label="=" onClick={calculate} variant="accent" />
            </CardContent>
        </Card>
    );
}

function CalcBtn({ label, onClick, variant = 'default', className = '' }: any) {
    const base = "h-16 rounded-2xl text-xl font-black transition-all active:scale-95 ";
    const variants = {
        default: "bg-muted/20 hover:bg-muted/40 text-foreground",
        primary: "bg-primary/10 hover:bg-primary/20 text-primary",
        secondary: "bg-muted/50 hover:bg-muted/70 text-muted-foreground text-sm uppercase",
        destructive: "bg-red-500/10 hover:bg-red-500/20 text-red-500",
        accent: "bg-primary text-primary-foreground shadow-lg shadow-primary/20",
    };

    return (
        <button
            onClick={onClick}
            className={base + (variants as any)[variant] + " " + className}
        >
            {label}
        </button>
    );
}
