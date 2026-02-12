import { Logo } from '@/components/ui/Logo';
import Link from 'next/link';
import { Github, Twitter, Mail, Facebook, Instagram } from 'lucide-react';

export function Footer() {
    return (
        <footer className="border-t bg-muted/30">
            <div className="container py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center space-x-2">
                            <Logo className="h-6 w-6" />
                            <span className="font-bold text-xl">Assets Tools Hub</span>
                        </Link>
                        <p className="text-sm text-muted-foreground mt-4 max-w-xs">
                            Assets Tools Hub offers 300+ free professional web tools for gamers, developers, and creators.
                            Open source and free forever.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-bold mb-4">Platform</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/explore" className="hover:text-primary transition-colors">Explore Tools</Link></li>
                            <li><Link href="/demo" className="hover:text-primary transition-colors">Watch Demo</Link></li>
                            <li><Link href="/pro" className="hover:text-primary transition-colors">Pro Access</Link></li>
                            <li><Link href="/roadmap" className="hover:text-primary transition-colors">Roadmap</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-4">Support</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
                            <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
                            <li><Link href="/blog" className="hover:text-primary transition-colors">Blog & Guides</Link></li>
                            <li><Link href="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/terms-of-service" className="hover:text-primary transition-colors">Terms of Service</Link></li>
                            <li><Link href="/disclaimer" className="hover:text-primary transition-colors">Disclaimer</Link></li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h4 className="font-bold">Connect</h4>
                        <div className="flex gap-4">
                            {[
                                { icon: Twitter, href: "https://x.com/Assetstoolshub" },
                                { icon: Facebook, href: "https://www.facebook.com/profile.php?id=61587082742579" },
                                { icon: Instagram, href: "https://www.instagram.com/assetstoolshub/" },
                                { icon: Mail, href: "mailto:support@assetstoolshub.com" }
                            ].map(({ icon: Icon, href }, i) => (
                                <Link
                                    key={i}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="h-9 w-9 bg-background border rounded-lg flex items-center justify-center hover:text-primary hover:border-primary transition-all shadow-sm"
                                >
                                    <Icon className="h-4 w-4" />
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
                    <p>© 2026 AssetsToolsHub. All rights reserved.</p>
                    <p>Designed with ❤️ for the community.</p>
                </div>
            </div>
        </footer>
    );
}
