import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '../styles/globals.css';
import { ColorSchemeScript } from '@mantine/core';
import ClientLayout from './client-layout';

export const metadata: Metadata = {
  title: 'Advolot - Legal Consultation Platform',
  description: 'Connect with legal experts for online consultations',
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
} 