export interface TextStats {
    characters: number;
    words: number;
    sentences: number;
    paragraphs: number;
    readingTime: number; // in minutes
}

export function analyzeText(text: string): TextStats {
    if (!text) {
        return { characters: 0, words: 0, sentences: 0, paragraphs: 0, readingTime: 0 };
    }

    const characters = text.length;
    // Match non-whitespace sequences
    const words = text.trim().split(/\s+/).filter(w => w.length > 0).length;
    // Rough sentence matching
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
    // Split by double newlines for paragraphs
    const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim().length > 0).length;

    const readingTime = Math.ceil(words / 200); // Average 200 wpm

    return {
        characters,
        words,
        sentences,
        paragraphs,
        readingTime,
    };
}
