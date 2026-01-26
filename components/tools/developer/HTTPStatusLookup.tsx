'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Globe, Search, ArrowRight, ExternalLink } from 'lucide-react';
import { Input } from '@/components/ui/input';

const STATUS_CODES: Record<string, { title: string, desc: string, cat: string }> = {
    '200': { title: 'OK', desc: 'The request has succeeded.', cat: 'Success' },
    '201': { title: 'Created', desc: 'Request fulfilled, resulting in a new resource.', cat: 'Success' },
    '301': { title: 'Moved Permanently', desc: 'URL has been moved to a new address.', cat: 'Redirection' },
    '302': { title: 'Found', desc: 'URL is temporarily under a different address.', cat: 'Redirection' },
    '400': { title: 'Bad Request', desc: 'Server cannot process request due to client error.', cat: 'Client Error' },
    '401': { title: 'Unauthorized', desc: 'Authentication is required and has failed.', cat: 'Client Error' },
    '403': { title: 'Forbidden', desc: 'The server understood but refuses to authorize.', cat: 'Client Error' },
    '404': { title: 'Not Found', desc: 'The server cannot find the requested resource.', cat: 'Client Error' },
    '429': { title: 'Too Many Requests', desc: 'User has sent too many requests in a given time.', cat: 'Client Error' },
    '500': { title: 'Internal Server Error', desc: 'Generic error message for server-side failure.', cat: 'Server Error' },
    '502': { title: 'Bad Gateway', desc: 'Server received an invalid response from upstream.', cat: 'Server Error' },
    '503': { title: 'Service Unavailable', desc: 'Server is overloaded or down for maintenance.', cat: 'Server Error' },
};

export default function HTTPStatusLookup() {
    const [query, setQuery] = useState('');

    const filtered = Object.entries(STATUS_CODES).filter(([code, data]) =>
        code.includes(query) || data.title.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Globe className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">HTTP Status Lookup</CardTitle>
                <p className="text-muted-foreground mt-2">Quick reference for response codes and their meanings.</p>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
                    <Input
                        placeholder="Search code (e.g. 404) or name (e.g. Not Found)..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="pl-12 h-14 rounded-2xl bg-muted/20 border-primary/20 text-lg"
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {filtered.map(([code, data]) => (
                        <div key={code} className="p-6 rounded-[2rem] bg-background border border-primary/5 hover:border-primary/20 transition-all group">
                            <div className="flex justify-between items-start mb-4">
                                <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${data.cat === 'Success' ? 'bg-green-500/10 text-green-500' :
                                        data.cat === 'Redirection' ? 'bg-blue-500/10 text-blue-500' :
                                            data.cat === 'Client Error' ? 'bg-amber-500/10 text-amber-500' :
                                                'bg-destructive/10 text-destructive'
                                    }`}>
                                    {data.cat}
                                </span>
                                <span className="text-3xl font-black text-primary opacity-20 group-hover:opacity-100 transition-opacity">#{code}</span>
                            </div>
                            <h4 className="text-xl font-black mb-2 flex items-center gap-2">
                                <ArrowRight className="h-4 w-4 text-primary" /> {data.title}
                            </h4>
                            <p className="text-xs text-muted-foreground leading-relaxed">{data.desc}</p>
                        </div>
                    ))}
                </div>

                <div className="text-center">
                    <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Status" target="_blank" className="text-xs text-primary font-bold hover:underline flex items-center justify-center gap-2">
                        View Full MDN Documentation <ExternalLink className="h-3 w-3" />
                    </a>
                </div>
            </CardContent>
        </Card>
    );
}
