'use client';

import QueryProvider from '@/app/api/QueryProvider';
import AppThemeProvider from '@/app/theme/AppThemeProvider';

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <QueryProvider>
            <AppThemeProvider>{children}</AppThemeProvider>
        </QueryProvider>
    );
}
