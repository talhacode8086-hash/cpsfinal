import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'About Us - Assets Tools Hub',
    description: 'Learn more about Assets Tools Hub, our mission, and the team behind the ultimate online toolkit for gamers and developers.',
};

export default function AboutPage() {
    return (
        <div className="container py-12 max-w-4xl">
            <h1 className="text-4xl font-extrabold tracking-tight mb-8">About Us</h1>
            <div className="prose prose-slate dark:prose-invert max-w-none space-y-6">
                <p className="lead text-xl text-muted-foreground">
                    Welcome to <strong>Assets Tools Hub</strong>, the ultimate ecosystem designed for gamers, developers, and productivity enthusiasts.
                </p>

                <section>
                    <h2 className="text-2xl font-bold mt-8 mb-4">Our Mission</h2>
                    <p>
                        In a digital world cluttered with paywalls and complex software, our mission is simple:
                        <strong> To provide professional-grade, browser-based tools completely free of charge.</strong>
                    </p>
                    <p>
                        Whether you are an aspiring esports athlete training your aim, a developer debugging code, or a student converting units,
                        we believe you deserve fast, accurate, and accessible tools without the hassle of downloads or sign-ups.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold mt-8 mb-4">What We Offer</h2>
                    <ul className="list-disc pl-6 space-y-2">
                        <li><strong>Gaming Utilities:</strong> From sensitivity converters to aim trainers, we provide the metrics that help you win.</li>
                        <li><strong>Developer Tools:</strong> Formatters, validators, and converters that run locally in your browser for maximum security.</li>
                        <li><strong>Productivity Suite:</strong> Everyday utilities like word counters and unit converters to speed up your workflow.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-bold mt-8 mb-4">Why Choose Us?</h2>
                    <p>
                        We prioritize <strong>performance</strong> and <strong>privacy</strong>. Unlike other tool sites, most of our utilities run
                        client-side, meaning your data (like photos or code snippets) never leaves your device. We are constantly updating our
                        suite based on community feedback to ensure we stay ahead of the curve.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold mt-8 mb-4">Connect With Us</h2>
                    <p>
                        We love hearing from our users. If you have a suggestion for a new tool or found a bug, please check out our
                        <a href="/contact" className="text-primary hover:underline font-medium mx-1">Contact Page</a>.
                    </p>
                </section>
            </div>
        </div>
    );
}
