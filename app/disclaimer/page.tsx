import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Disclaimer - Assets Tools Hub',
    description: 'Disclaimer and liability limitations for using Assets Tools Hub.',
};

export default function DisclaimerPage() {
    return (
        <div className="container py-12 max-w-4xl">
            <h1 className="text-4xl font-extrabold tracking-tight mb-8">Disclaimer</h1>
            <div className="prose prose-slate dark:prose-invert max-w-none space-y-6">
                <p className="text-muted-foreground">
                    Last updated: January 26, 2026
                </p>

                <section>
                    <h2 className="text-2xl font-bold mt-8 mb-4">General Information</h2>
                    <p>
                        The information provided by <strong>Assets Tools Hub</strong> (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) on this website is for general informational and educational purposes only.
                        All information on the Site is provided in good faith, ensuring that our tools function as described. However, we make no representation or warranty
                        of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information or calculation produced by our tools.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold mt-8 mb-4">No Professional Advice</h2>
                    <p>
                        The tools and content on this site do not constitute professional advice.
                        <ul>
                            <li><strong>Financial Tools:</strong> Calculation results for loans, tips, or taxes are estimates only and should not be considered as financial advice.</li>
                            <li><strong>Health Tools:</strong> BMI and calorie calculators are for educational purposes and not a substitute for medical advice.</li>
                            <li><strong>Legal Tools:</strong> Any text processing or document generation is not legal advice.</li>
                        </ul>
                    </p>
                    <p>
                        Always consult with a qualified professional before making decisions based on data from this website.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold mt-8 mb-4">External Links Disclaimer</h2>
                    <p>
                        The Site may contain (or you may be sent through the Site to) links to other websites or content belonging to or originating from third parties.
                        Such external links are not investigated, monitored, or checked for accuracy, adequacy, validity, reliability, availability, or completeness by us.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold mt-8 mb-4">Limitation of Liability</h2>
                    <p>
                        Under no circumstance shall we have any liability to you for any loss or damage of any kind incurred as a result of the use of the site or reliance on
                        any information provided on the site. Your use of the site and your reliance on any information on the site is solely at your own risk.
                    </p>
                </section>
            </div>
        </div>
    );
}
