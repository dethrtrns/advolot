import { TextInput, PasswordInput, Button, Paper, Title, Container, Select } from '@mantine/core';
import { useForm } from '@mantine/form';

export default function SignupPage() {
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      role: '',
      phoneNumber: '',
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => (value.length < 8 ? 'Password must be at least 8 characters' : null),
      firstName: (value) => (value.length < 2 ? 'First name must be at least 2 characters' : null),
      lastName: (value) => (value.length < 2 ? 'Last name must be at least 2 characters' : null),
      role: (value) => (!value ? 'Please select a role' : null),
    },
  });

  return (
    <Container size={420} my={40}>
      <Title ta="center" mb={30}>
        Create your account
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
          <TextInput
            label="First Name"
            placeholder="John"
            required
            mt="md"
            {...form.getInputProps('firstName')}
          />
          <TextInput
            label="Last Name"
            placeholder="Doe"
            required
            mt="md"
            {...form.getInputProps('lastName')}
          />
          <Select
            label="Role"
            placeholder="Select your role"
            required
            mt="md"
            data={[
              { value: 'CLIENT', label: 'Client' },
              { value: 'LAWYER', label: 'Lawyer' },
            ]}
            {...form.getInputProps('role')}
          />
          <TextInput
            label="Phone Number"
            placeholder="+1234567890"
            mt="md"
            {...form.getInputProps('phoneNumber')}
          />
          <Button fullWidth mt="xl" type="submit">
            Sign up
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