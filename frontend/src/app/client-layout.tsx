'use client';

import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { theme } from '../lib/mantine';
import { ReactNode } from 'react';

export default function ClientLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <MantineProvider theme={theme}>
      <Notifications position="top-right" />
      {children}
    </MantineProvider>
  );
} 