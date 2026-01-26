'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DollarSign, Building, Wallet, Calculator, PieChart } from 'lucide-react';

export default function SalaryTaxCalc() {
    const [income, setIncome] = useState<string>('50000');
    const [period, setPeriod] = useState<string>('year');
    const [filingStatus, setFilingStatus] = useState<string>('single');
    const [state, setState] = useState<string>('NY'); // Simplified state selection

    const calculateTax = () => {
        const annualIncome = period === 'year' ? parseFloat(income) :
            period === 'month' ? parseFloat(income) * 12 :
                parseFloat(income) * 52; // week

        // Simplified 2024 Tax Brackets (Federal)
        let federalTax = 0;
        let taxable = annualIncome - 14600; // Standard deduction for single
        if (filingStatus === 'married') taxable = annualIncome - 29200;

        if (taxable <= 0) federalTax = 0;
        else if (taxable <= 11600) federalTax = taxable * 0.10;
        else if (taxable <= 47150) federalTax = 1160 + (taxable - 11600) * 0.12;
        else if (taxable <= 100525) federalTax = 5426 + (taxable - 47150) * 0.22;
        else if (taxable <= 191950) federalTax = 17168 + (taxable - 100525) * 0.24;
        else if (taxable <= 243725) federalTax = 39110 + (taxable - 191950) * 0.32;
        else if (taxable <= 609350) federalTax = 55678 + (taxable - 243725) * 0.35;
        else federalTax = 183647 + (taxable - 609350) * 0.37;

        // Simplified FICA
        const socialSecurity = Math.min(annualIncome, 168600) * 0.062;
        const medicare = annualIncome * 0.0145;
        const fica = socialSecurity + medicare;

        // Simplified State Tax (Flat 5% estimate for demo purposes)
        const stateTax = annualIncome * 0.05;

        const totalTax = federalTax + fica + stateTax;
        const netPay = annualIncome - totalTax;

        return {
            annual: { gross: annualIncome, tax: totalTax, net: netPay },
            monthly: { gross: annualIncome / 12, tax: totalTax / 12, net: netPay / 12 },
            biweekly: { gross: annualIncome / 26, tax: totalTax / 26, net: netPay / 26 },
            federalTax,
            fica,
            stateTax
        };
    };

    const result = calculateTax();

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            <Card className="border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
                <CardHeader className="border-b border-primary/5 pb-8">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                            <Calculator className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                            <CardTitle className="text-2xl font-bold">Salary Paycheck Calculator</CardTitle>
                            <p className="text-muted-foreground">Estimate your take-home pay after taxes and deductions.</p>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-8 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                            <Label>Gross Income</Label>
                            <div className="relative">
                                <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    className="pl-9 h-12 text-lg font-bold"
                                    value={income}
                                    onChange={(e) => setIncome(e.target.value)}
                                    type="number"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>Pay Frequency</Label>
                            <Select value={period} onValueChange={setPeriod}>
                                <SelectTrigger className="h-12"><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="year">Annually (Year)</SelectItem>
                                    <SelectItem value="month">Monthly</SelectItem>
                                    <SelectItem value="week">Weekly</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label>Filing Status</Label>
                            <Select value={filingStatus} onValueChange={setFilingStatus}>
                                <SelectTrigger className="h-12"><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="single">Single</SelectItem>
                                    <SelectItem value="married">Married Filing Jointly</SelectItem>
                                    <SelectItem value="head">Head of Household</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <SummaryCard
                            title="Annual Net Pay"
                            amount={result.annual.net}
                            icon={<Wallet className="h-6 w-6 text-green-500" />}
                            bg="bg-green-500/10"
                            border="border-green-500/20"
                        />
                        <SummaryCard
                            title="Monthly Net Pay"
                            amount={result.monthly.net}
                            icon={<Building className="h-6 w-6 text-blue-500" />}
                            bg="bg-blue-500/10"
                            border="border-blue-500/20"
                        />
                        <SummaryCard
                            title="Bi-Weekly Net Pay"
                            amount={result.biweekly.net}
                            icon={<DollarSign className="h-6 w-6 text-indigo-500" />}
                            bg="bg-indigo-500/10"
                            border="border-indigo-500/20"
                        />
                    </div>

                    <div className="bg-muted/30 rounded-2xl p-6 border border-primary/5">
                        <h4 className="font-bold mb-4 flex items-center gap-2">
                            <PieChart className="h-4 w-4" /> Tax Breakdown (Estimated Annual)
                        </h4>
                        <div className="space-y-3">
                            <TaxRow label="Federal Income Tax" amount={result.federalTax} total={result.annual.gross} color="bg-red-500" />
                            <TaxRow label="State Income Tax" amount={result.stateTax} total={result.annual.gross} color="bg-orange-500" />
                            <TaxRow label="FICA (Social Security & Medicare)" amount={result.fica} total={result.annual.gross} color="bg-amber-500" />
                            <div className="pt-2 border-t border-primary/10 flex justify-between font-bold">
                                <span>Total Taxes</span>
                                <span className="text-destructive">-${Math.round(result.annual.tax).toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

function SummaryCard({ title, amount, icon, bg, border }: any) {
    return (
        <div className={`p-6 rounded-2xl border ${bg} ${border} flex flex-col gap-2`}>
            <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase opacity-60">{title}</span>
                {icon}
            </div>
            <span className="text-2xl font-black">${Math.round(amount).toLocaleString()}</span>
        </div>
    );
}

function TaxRow({ label, amount, total, color }: any) {
    const percent = ((amount / total) * 100).toFixed(1);
    return (
        <div className="space-y-1">
            <div className="flex justify-between text-sm">
                <span>{label}</span>
                <span className="font-mono">${Math.round(amount).toLocaleString()} ({percent}%)</span>
            </div>
            <div className="h-2 w-full bg-background rounded-full overflow-hidden">
                <div className={`h-full ${color}`} style={{ width: `${percent}%` }} />
            </div>
        </div>
    );
}
