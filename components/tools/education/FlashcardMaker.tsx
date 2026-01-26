'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Layers, Plus, ChevronLeft, ChevronRight, RotateCw, Trash2, Edit3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Flashcard {
    id: number;
    front: string;
    back: string;
}

export default function FlashcardMaker() {
    const [cards, setCards] = useState<Flashcard[]>([
        { id: 1, front: 'Photosynthesis', back: 'The process by which green plants and some other organisms use sunlight to synthesize foods from carbon dioxide and water.' },
        { id: 2, front: 'Mitosis', back: 'A type of cell division that results in two daughter cells each having the same number and kind of chromosomes as the parent nucleus.' }
    ]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [showEditor, setShowEditor] = useState(false);

    const [newFront, setNewFront] = useState('');
    const [newBack, setNewBack] = useState('');

    const addCard = () => {
        if (!newFront || !newBack) return;
        setCards([...cards, { id: Date.now(), front: newFront, back: newBack }]);
        setNewFront('');
        setNewBack('');
    };

    const nextCard = () => {
        setIsFlipped(false);
        setTimeout(() => setCurrentIndex((currentIndex + 1) % cards.length), 150);
    };

    const prevCard = () => {
        setIsFlipped(false);
        setTimeout(() => setCurrentIndex((currentIndex - 1 + cards.length) % cards.length), 150);
    };

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm overflow-hidden">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Layers className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Interactive Flashcards</CardTitle>
                <p className="text-muted-foreground mt-2">Master any subject with active recall and digital study decks.</p>
            </CardHeader>
            <CardContent className="p-12 space-y-12">

                {/* Progress Bar */}
                <div className="w-full h-2 bg-muted/20 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-primary transition-all duration-500"
                        style={{ width: `${((currentIndex + 1) / cards.length) * 100}%` }}
                    />
                </div>

                {/* Flashcard Component */}
                <div className="perspective-1000 h-96 w-full cursor-pointer" onClick={() => setIsFlipped(!isFlipped)}>
                    <div className={`relative w-full h-full transition-all duration-500 preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
                        {/* Front */}
                        <div className="absolute inset-0 bg-background border-4 border-primary/10 rounded-[4rem] flex flex-col items-center justify-center text-center p-12 backface-hidden shadow-2xl">
                            <p className="text-[10px] font-black uppercase text-primary/40 tracking-[0.5em] mb-8">QUESTION</p>
                            <h3 className="text-4xl font-black text-primary leading-tight">{cards[currentIndex]?.front}</h3>
                            <div className="mt-12 flex items-center gap-2 text-muted-foreground text-xs font-bold animate-pulse">
                                <RotateCw className="h-4 w-4" /> Click to reveal answer
                            </div>
                        </div>
                        {/* Back */}
                        <div className="absolute inset-0 bg-primary text-primary-foreground rounded-[4rem] flex flex-col items-center justify-center text-center p-12 backface-hidden rotate-y-180 shadow-2xl overflow-y-auto">
                            <p className="text-[10px] font-black uppercase text-white/50 tracking-[0.5em] mb-6">ANSWER</p>
                            <p className="text-xl font-bold leading-relaxed">{cards[currentIndex]?.back}</p>
                        </div>
                    </div>
                </div>

                {/* Controls */}
                <div className="flex justify-between items-center px-12">
                    <Button variant="outline" size="lg" className="h-16 w-16 rounded-2xl" onClick={(e) => { e.stopPropagation(); prevCard(); }}>
                        <ChevronLeft />
                    </Button>
                    <div className="text-center">
                        <span className="text-2xl font-black text-primary">{currentIndex + 1}</span>
                        <span className="text-xl font-bold opacity-20 mx-2">/</span>
                        <span className="text-xl font-bold opacity-40">{cards.length}</span>
                    </div>
                    <Button variant="outline" size="lg" className="h-16 w-16 rounded-2xl" onClick={(e) => { e.stopPropagation(); nextCard(); }}>
                        <ChevronRight />
                    </Button>
                </div>

                {/* Editor Toggle */}
                <div className="pt-8 border-t border-primary/5">
                    <Button
                        variant="ghost"
                        className="w-full h-14 rounded-2xl text-muted-foreground hover:text-primary transition-colors"
                        onClick={() => setShowEditor(!showEditor)}
                    >
                        <Edit3 className="mr-2 h-4 w-4" /> {showEditor ? 'Hide Deck Editor' : 'Edit Study Deck'}
                    </Button>

                    {showEditor && (
                        <div className="mt-8 p-8 bg-muted/20 rounded-[3rem] border border-primary/5 space-y-6 animate-in fade-in zoom-in duration-300">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <textarea
                                    placeholder="Front Side (Question)"
                                    value={newFront}
                                    onChange={(e) => setNewFront(e.target.value)}
                                    className="h-32 p-6 rounded-3xl bg-background border border-primary/10 focus:border-primary outline-none transition-all resize-none font-bold"
                                />
                                <textarea
                                    placeholder="Back Side (Answer)"
                                    value={newBack}
                                    onChange={(e) => setNewBack(e.target.value)}
                                    className="h-32 p-6 rounded-3xl bg-background border border-primary/10 focus:border-primary outline-none transition-all resize-none font-bold"
                                />
                            </div>
                            <Button onClick={addCard} className="w-full h-14 rounded-2xl font-bold">
                                <Plus className="mr-2" /> Add New Card to Deck
                            </Button>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                                {cards.map((c, i) => (
                                    <div key={c.id} className="p-4 bg-background border border-primary/5 rounded-2xl flex justify-between items-center group">
                                        <span className="text-xs font-bold truncate pr-2">#{i + 1}: {c.front}</span>
                                        <button onClick={() => setCards(cards.filter(card => card.id !== c.id))} className="text-destructive opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </CardContent>
            <style jsx>{`
                .perspective-1000 { perspective: 1000px; }
                .preserve-3d { transform-style: preserve-3d; }
                .backface-hidden { backface-visibility: hidden; }
                .rotate-y-180 { transform: rotateY(180deg); }
            `}</style>
        </Card>
    );
}
