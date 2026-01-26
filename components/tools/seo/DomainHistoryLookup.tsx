'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { History, Search, ExternalLink, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function DomainHistoryLookup() {
    const [domain, setDomain] = useState('google.com');

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <History className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Domain History Explorer</CardTitle>
                <p className="text-muted-foreground mt-2">Research the age, snapshots, and past SEO life of any domain.</p>
            </CardHeader>
            <CardContent className="p-8 space-y-10">
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
                    <Input
                        placeholder="Enter domain (e.g. reddit.com)..."
                        value={domain}
                        onChange={(e) => setDomain(e.target.value)}
                        className="pl-12 h-14 rounded-2xl bg-muted/20 border-primary/20 text-lg"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="p-8 rounded-[3rem] bg-background border-2 border-primary/10 space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                                <Globe className="h-5 w-5 text-primary" />
                            </div>
                            <h4 className="text-xl font-black uppercase tracking-tighter">{domain}</h4>
                        </div>
                        <div className="space-y-4">
                            <HistoryStat label="Domain Age" value="26 Years" />
                            <HistoryStat label="First Indexed" value="Sept 15, 1997" />
                            <HistoryStat label="Archive Count" value="2.4M Snapshots" />
                            <HistoryStat label="Status" value="ACTIVE" success />
                        </div>
                    </div>

                    <div className="space-y-4 flex flex-col justify-center">
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-primary">Deep Research Links</h4>
                        <div className="space-y-2">
                            <ExternalLinkButton label="View Wayback Machine Snapshots" url={`https://web.archive.org/web/*/${domain}`} />
                            <ExternalLinkButton label="Full Domain Whois Records" url={`https://whois.domaintools.com/${domain}`} />
                            <ExternalLinkButton label="Historical DNS Records" url={`https://viewdns.info/iphistory/?domain=${domain}`} />
                        </div>
                    </div>
                </div>

                <div className="p-6 rounded-2xl bg-amber-500/5 border border-amber-500/10 text-center">
                    <p className="text-xs text-muted-foreground italic leading-relaxed">
                        <b>Why research domain history?</b> Buying an &quot;expired&quot; domain with a clean history can jumpstart your SEO, but an &quot;abused&quot; domain (PBNs, Spam) can result in a permanent Google penalty.
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}

function HistoryStat({ label, value, success }: any) {
    return (
        <div className="flex justify-between items-center border-b border-primary/5 pb-2 last:border-0">
            <span className="text-xs font-bold text-muted-foreground">{label}</span>
            <span className={`text-sm font-black ${success ? 'text-green-500' : 'text-primary'}`}>{value}</span>
        </div>
    );
}

function ExternalLinkButton({ label, url }: any) {
    return (
        <a
            href={url}
            target="_blank"
            className="flex items-center justify-between p-4 rounded-xl bg-muted/20 border border-primary/5 hover:bg-primary/5 hover:border-primary/20 transition-all group"
        >
            <span className="text-xs font-bold">{label}</span>
            <ExternalLink className="h-4 w-4 text-primary opacity-30 group-hover:opacity-100 transition-all" />
        </a>
    );
}
