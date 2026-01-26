'use client';

import { Navbar } from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';
import { Footer } from '@/components/layout/Footer';
import { useSidebar } from '@/components/providers/SidebarProvider';
import { cn } from '@/lib/utils';
import PageWrapper from './PageWrapper';

export default function MainLayout({ children }: { children: React.ReactNode }) {
    const { isCollapsed } = useSidebar();

    return (
        <div className="relative flex min-h-screen flex-col bg-background selection:bg-primary selection:text-primary-foreground">
            <Navbar />
            <div className="flex flex-1 pt-16">
                <Sidebar />
                <main className={cn(
                    "flex-1 transition-all duration-300 ease-in-out",
                    isCollapsed ? "lg:pl-0" : "lg:pl-64"
                )}>
                    <div className="container py-6 min-h-[calc(100vh-4rem)]">
                        <PageWrapper>
                            {children}
                        </PageWrapper>
                    </div>
                    <Footer />
                </main>
            </div>
        </div>
    );
}
