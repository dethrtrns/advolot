'use client';

import { AppShell } from '@mantine/core';
import { Navbar } from './Navbar';
import AuthGuard from '../auth/AuthGuard';

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <AuthGuard>
      <AppShell
        header={{ height: 60 }}
        padding="md"
      >
        <AppShell.Header>
          <Navbar />
        </AppShell.Header>
        <AppShell.Main>
          {children}
        </AppShell.Main>
      </AppShell>
    </AuthGuard>
  );
} 