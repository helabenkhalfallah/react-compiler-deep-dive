import AppThemeProvider from '@/app/theme/AppThemeProvider';

export function Providers({ children }: { children: React.ReactNode }) {
    return <AppThemeProvider>{children}</AppThemeProvider>;
}
