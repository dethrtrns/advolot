import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import '@mantine/core/styles.css';
import '../styles/globals.css';
import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import { theme } from '../lib/mantine';

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
        <MantineProvider theme={theme}>
          {children}
        </MantineProvider>
      </body>
    </html>
  );
} 