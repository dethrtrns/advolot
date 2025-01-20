import { Button, Container, Text, Title } from '@mantine/core';

export default function HomePage() {
  return (
    <Container size="lg" className="py-20">
      <Title order={1} className="text-center mb-4">
        Welcome to Advolot
      </Title>
      <Text className="text-center mb-8">
        Connect with legal experts for online consultations
      </Text>
      <div className="flex justify-center gap-4">
        <Button component="a" href="/auth/login" variant="filled">
          Login
        </Button>
        <Button component="a" href="/auth/signup" variant="outline">
          Sign Up
        </Button>
      </div>
    </Container>
  );
} 