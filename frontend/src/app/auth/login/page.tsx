'use client';

import { TextInput, PasswordInput, Button, Paper, Title, Container } from '@mantine/core';
import { useForm } from '@mantine/form';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { notifications } from '@mantine/notifications';
import api from '@/utils/api';

export default function LoginPage() {
  const router = useRouter();
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

  const handleSubmit = async (values: typeof form.values) => {
    try {
      const response = await api.post('/auth/login', values);
      const { access_token, user } = response.data;
      
      // Store the token and user data
      localStorage.setItem('access_token', access_token);
      localStorage.setItem('user', JSON.stringify(user));
      
      // Show success notification
      notifications.show({
        title: 'Success',
        message: 'Successfully logged in!',
        color: 'green',
      });

      // Redirect to dashboard
      router.push('/dashboard');
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ message: string }>;
      notifications.show({
        title: 'Error',
        message: axiosError.response?.data?.message || 'Failed to login',
        color: 'red',
      });
    }
  };

  return (
    <Container size={420} my={40}>
      <Title ta="center" mb={30}>
        Welcome back to Advolot!
      </Title>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={form.onSubmit(handleSubmit)}>
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