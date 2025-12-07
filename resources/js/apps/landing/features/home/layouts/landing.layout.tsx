import { PropsWithChildren } from 'react';
import { LandingHeader } from '@/apps/landing/features/home/components/landing-header';
import { LandingFooter } from '@/apps/landing/features/home/components/landing-footer';

export function LandingLayout({ children }: PropsWithChildren) {
    return (
        <div className="relative min-h-screen bg-gradient-to-b from-white via-gray-50 to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
            <LandingHeader />
            <main className="relative">{children}</main>
            <LandingFooter />
        </div>
    );
}
