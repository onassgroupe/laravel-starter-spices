import { PropsWithChildren } from 'react';

interface AppShellProps extends PropsWithChildren {
    header?: React.ReactNode;
    sidebar?: React.ReactNode;
}

export function AppShell({ children, header, sidebar }: AppShellProps) {
    return (
        <div className="min-h-screen bg-background">
            {header}
            <div className="flex">
                {sidebar}
                <main className="flex-1 p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
