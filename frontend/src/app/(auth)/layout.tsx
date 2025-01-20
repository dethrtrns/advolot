import { Container } from '@mantine/core';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container size="sm" py={40}>
      {children}
    </Container>
  );
} 