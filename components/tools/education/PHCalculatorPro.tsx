'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calculator, Beaker, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function PHCalculatorPro() {
    const [type, setType] = useState<'StrongAcid' | 'WeakAcid' | 'StrongBase' | 'WeakBase'>('StrongAcid');
    const [concentration, setConcentration] = useState('0.1');
    const [kValue, setKValue] = useState('1.8e-5'); // Default Ka for Acetic Acid

    const calculate = () => {
        const c = parseFloat(concentration) || 0;
        const k = parseFloat(kValue) || 0;

        let ph = 0;
        let poh = 0;
        let hPlus = 0;
        let ohMinus = 0;

        if (c <= 0) return null;

        switch (type) {
            case 'StrongAcid':
                hPlus = c;
                ph = -Math.log10(hPlus);
                poh = 14 - ph;
                ohMinus = Math.pow(10, -poh);
                break;
            case 'StrongBase':
                ohMinus = c;
                poh = -Math.log10(ohMinus);
                ph = 14 - poh;
                hPlus = Math.pow(10, -ph);
                break;
            case 'WeakAcid':
                // [H+] = sqrt(Ka * C)
                hPlus = Math.sqrt(k * c);
                ph = -Math.log10(hPlus);
                poh = 14 - ph;
                ohMinus = Math.pow(10, -poh);
                break;
            case 'WeakBase':
                // [OH-] = sqrt(Kb * C)
                ohMinus = Math.sqrt(k * c);
                poh = -Math.log10(ohMinus);
                ph = 14 - poh;
                hPlus = Math.pow(10, -ph);
                break;
        }

        return {
            ph: ph.toFixed(2),
            poh: poh.toFixed(2),
            hPlus: hPlus.toExponential(3),
            ohMinus: ohMinus.toExponential(3)
        };
    };

    const res = calculate();

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm overflow-hidden font-scholar">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Beaker className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">pH Calculator Pro</CardTitle>
                <p className="text-muted-foreground mt-2">Professional acid-base equilibrium solver for aqueous solutions.</p>
            </CardHeader>
            <CardContent className="p-12 space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase text-primary/40 tracking-widest pl-2">Solution Type</label>
                            <Select value={type} onValueChange={(v: any) => setType(v)}>
                                <SelectTrigger className="h-14 rounded-2xl border-primary/10 bg-background font-bold">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="StrongAcid">Strong Acid (e.g. HCl)</SelectItem>
                                    <SelectItem value="WeakAcid">Weak Acid (e.g. CH3COOH)</SelectItem>
                                    <SelectItem value="StrongBase">Strong Base (e.g. NaOH)</SelectItem>
                                    <SelectItem value="WeakBase">Weak Base (e.g. NH3)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-4">
                            <SolutionParam label="Concentration [M]" value={concentration} onChange={setConcentration} />
                            {(type === 'WeakAcid' || type === 'WeakBase') && (
                                <SolutionParam label={type === 'WeakAcid' ? 'Ka (Acid Const)' : 'Kb (Base Const)'} value={kValue} onChange={setKValue} />
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col justify-center gap-6">
                        <div className="p-10 rounded-[3rem] bg-primary border-4 border-primary shadow-3xl shadow-primary/30 flex flex-col items-center justify-center gap-2 text-white transition-all hover:scale-[1.02]">
                            <p className="text-[10px] font-black uppercase text-white/50 tracking-[0.4em]">CALCULATED PH</p>
                            <h2 className="text-8xl font-black">{res?.ph || '0.00'}</h2>
                            <div className="px-4 py-1 rounded-full bg-white/20 text-[10px] font-black uppercase tracking-widest">
                                {parseFloat(res?.ph || '7') < 7 ? 'ACIDIC' : parseFloat(res?.ph || '7') > 7 ? 'BASIC' : 'NEUTRAL'}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <ConcentrationBox label="pOH Value" value={res?.poh} unit="" />
                    <ConcentrationBox label="[H+] Concentration" value={res?.hPlus} unit="M" />
                    <ConcentrationBox label="[OH-] Concentration" value={res?.ohMinus} unit="M" />
                </div>

                <div className="p-10 rounded-[3.5rem] bg-primary/5 border border-primary/10 flex items-start gap-6">
                    <div className="p-3 bg-primary/10 rounded-2xl text-primary">
                        <Activity className="h-6 w-6" />
                    </div>
                    <div>
                        <h4 className="font-black text-primary uppercase text-[10px] tracking-widest mb-1">Equilibrium Context</h4>
                        <p className="text-xs text-muted-foreground leading-relaxed italic">
                            For weak systems, we assume the ionization is much smaller than the initial concentration ($x \ll C$) to simplify the calculation using the square root of $K \cdot C$.
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

function SolutionParam({ label, value, onChange }: any) {
    return (
        <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-primary/40 pl-2">{label}</label>
            <Input
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="h-14 rounded-2xl bg-muted/10 border-transparent focus:bg-background transition-colors font-bold text-lg px-6"
            />
        </div>
    );
}

function ConcentrationBox({ label, value, unit }: any) {
    return (
        <div className="p-8 rounded-[2.5rem] bg-background border border-primary/5 shadow-lg flex flex-col items-center gap-1 hover:border-primary/20 transition-all">
            <span className="text-[8px] font-black uppercase text-primary/40 tracking-widest">{label}</span>
            <h4 className="text-2xl font-black text-primary">{value || '0'}<span className="text-[10px] ml-1 opacity-40">{unit}</span></h4>
        </div>
    );
}
