'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tag, Sparkles } from 'lucide-react';

export default function DiscountCalculator() {
    const [price, setPrice] = useState<number>(100);
    const [discount, setDiscount] = useState<number>(20);
    const [tax, setTax] = useState<number>(0);

    const discountAmount = (price * discount) / 100;
    const discountedPrice = price - discountAmount;
    const taxAmount = (discountedPrice * tax) / 100;
    const finalPrice = discountedPrice + taxAmount;

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Tag className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Discount Calculator</CardTitle>
                <p className="text-muted-foreground mt-2">Calculate final savings and prices after discounts.</p>
            </CardHeader>
            <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-12">
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold">Original Price ($)</label>
                            <Input
                                type="number"
                                className="h-12 rounded-xl"
                                value={price}
                                onChange={(e) => setPrice(parseFloat(e.target.value) || 0)}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold">Discount (%)</label>
                            <Input
                                type="number"
                                className="h-12 rounded-xl border-primary/30"
                                value={discount}
                                onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold">Tax Percentage (%) - Optional</label>
                            <Input
                                type="number"
                                className="h-12 rounded-xl"
                                value={tax}
                                onChange={(e) => setTax(parseFloat(e.target.value) || 0)}
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="p-10 rounded-[2.5rem] bg-gradient-to-br from-primary to-primary/80 text-primary-foreground text-center relative overflow-hidden shadow-2xl">
                            <Sparkles className="absolute top-4 right-4 h-8 w-8 opacity-20" />
                            <p className="text-xs font-bold uppercase tracking-[0.2em] mb-4 opacity-70">Final Price</p>
                            <h2 className="text-6xl font-black">${finalPrice.toFixed(2)}</h2>
                            <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-[10px] uppercase font-bold opacity-60 mb-1">You Save</p>
                                    <p className="text-xl font-black">${discountAmount.toFixed(2)}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase font-bold opacity-60 mb-1">Tax Amount</p>
                                    <p className="text-xl font-black">${taxAmount.toFixed(2)}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
