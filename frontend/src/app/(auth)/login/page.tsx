import { TextInput, PasswordInput, Button, Paper, Title, Container } from '@mantine/core';
import { useForm } from '@mantine/form';

export default function LoginPage() {
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => (value.length < 8 ? 'Password must be at least 8 characters' : null),
    },
  });

  return (
    <Container size={420} my={40}>
      <Title ta="center" mb={30}>
        Welcome back to Advolot!
      </Title>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form>
          <TextInput
            label="Email"
            placeholder="your@email.com"
            required
            {...form.getInputProps('email')}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            mt="md"
            {...form.getInputProps('password')}
          />
          <Button fullWidth mt="xl" type="submit">
            Sign in
          </Button>

          <Button
            component="a"
            href="/auth/google"
            variant="outline"
            fullWidth
            mt="sm"
          >
            Continue with Google
          </Button>
        </form>
      </Paper>
    </Container>
  );
} 