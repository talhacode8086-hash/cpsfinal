'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Copy, Eye, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import ReactMarkdown from 'react-markdown';

export default function MarkdownPreviewer() {
    const [markdown, setMarkdown] = useState('# Hello World\n\nStart writing your **Markdown** here.\n\n- Lists\n- Links\n- Codes');
    const [viewMode, setViewMode] = useState<'both' | 'edit' | 'preview'>('both');

    const handleCopy = () => {
        navigator.clipboard.writeText(markdown);
        toast.success('Markdown copied to clipboard!');
    };

    return (
        <Card className="max-w-6xl mx-auto border-primary/10 shadow-2xl bg-card/50 backdrop-blur-sm overflow-hidden">
            <CardHeader className="text-center border-b border-primary/5 pb-8 relative">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Eye className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Markdown Previewer</CardTitle>
                <p className="text-muted-foreground mt-2">Write and preview Markdown in real-time with a clean, professional editor.</p>

                <div className="absolute bottom-4 right-8 flex gap-2">
                    <Button variant={viewMode === 'edit' ? 'default' : 'outline'} size="sm" className="rounded-lg" onClick={() => setViewMode('edit')}>Edit</Button>
                    <Button variant={viewMode === 'both' ? 'default' : 'outline'} size="sm" className="rounded-lg" onClick={() => setViewMode('both')}>Both</Button>
                    <Button variant={viewMode === 'preview' ? 'default' : 'outline'} size="sm" className="rounded-lg" onClick={() => setViewMode('preview')}>Preview</Button>
                </div>
            </CardHeader>
            <CardContent className="p-0">
                <div className={`grid ${viewMode === 'both' ? 'md:grid-cols-2' : 'grid-cols-1'} min-h-[500px]`}>
                    {/* Editor */}
                    {(viewMode === 'edit' || viewMode === 'both') && (
                        <div className="flex flex-col border-r border-primary/5">
                            <div className="flex items-center justify-between px-6 py-3 bg-muted/30 border-b border-primary/5">
                                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Editor</span>
                                <div className="flex gap-2">
                                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg" onClick={handleCopy} title="Copy Markdown">
                                        <Copy className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-destructive" onClick={() => setMarkdown('')} title="Clear">
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                            <Textarea
                                className="flex-1 p-8 text-lg font-mono border-none focus-visible:ring-0 resize-none bg-transparent"
                                value={markdown}
                                onChange={(e) => setMarkdown(e.target.value)}
                            />
                        </div>
                    )}

                    {/* Preview */}
                    {(viewMode === 'preview' || viewMode === 'both') && (
                        <div className="flex flex-col bg-muted/10">
                            <div className="flex items-center justify-between px-6 py-3 bg-muted/30 border-b border-primary/5">
                                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Preview</span>
                            </div>
                            <div className="flex-1 p-8 prose prose-slate dark:prose-invert max-w-none overflow-y-auto">
                                <ReactMarkdown>{markdown}</ReactMarkdown>
                            </div>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
