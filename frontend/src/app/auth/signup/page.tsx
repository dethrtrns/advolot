'use client';

import { useForm } from '@mantine/form';
import { TextInput, PasswordInput, Button, Paper, Title, Container, Select, MultiSelect, NumberInput } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const router = useRouter();
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      role: '',
      phoneNumber: '',
      barNumber: '',
      specialties: [],
      hourlyRate: 0,
      bio: '',
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => (value.length >= 8 ? null : 'Password must be at least 8 characters'),
      firstName: (value) => (value.length >= 2 ? null : 'First name must be at least 2 characters'),
      lastName: (value) => (value.length >= 2 ? null : 'Last name must be at least 2 characters'),
      role: (value) => (!value ? 'Role is required' : null),
    },
  });

  const handleSubmit = async (values: any) => {
    try {
      const formData = {
        ...values,
        specialties: values.specialties || undefined,
        hourlyRate: values.hourlyRate ? Number(values.hourlyRate) : undefined,
      };

      const response = await axios.post('http://localhost:3002/auth/signup', formData);
      notifications.show({
        title: 'Success',
        message: 'Account created successfully! Please log in.',
        color: 'green',
      });
      router.push('/auth/login');
    } catch (error: any) {
      notifications.show({
        title: 'Error',
        message: error.response?.data?.message || 'Something went wrong',
        color: 'red',
      });
    }
  };

  const isLawyer = form.values.role === 'LAWYER';

  return (
    <Container size={420} my={40}>
      <Title ta="center">Create an Account</Title>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            label="Email"
            placeholder="you@example.com"
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
            placeholder="Your first name"
            required
            mt="md"
            {...form.getInputProps('firstName')}
          />
          <TextInput
            label="Last Name"
            placeholder="Your last name"
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
          {isLawyer && (
            <>
              <TextInput
                label="Bar Number"
                placeholder="Your bar number"
                mt="md"
                {...form.getInputProps('barNumber')}
              />
              <MultiSelect
                label="Specialties"
                placeholder="Select your specialties"
                mt="md"
                data={[
                  { value: 'Corporate Law', label: 'Corporate Law' },
                  { value: 'Family Law', label: 'Family Law' },
                  { value: 'Criminal Law', label: 'Criminal Law' },
                  { value: 'Real Estate Law', label: 'Real Estate Law' },
                  { value: 'Intellectual Property', label: 'Intellectual Property' },
                ]}
                {...form.getInputProps('specialties')}
              />
              <NumberInput
                label="Hourly Rate"
                placeholder="Your hourly rate"
                min={0}
                mt="md"
                {...form.getInputProps('hourlyRate')}
              />
              <TextInput
                label="Bio"
                placeholder="Tell us about yourself"
                mt="md"
                {...form.getInputProps('bio')}
              />
            </>
          )}
          <Button fullWidth mt="xl" type="submit">
            Sign up
          </Button>
        </form>
      </Paper>
    </Container>
  );
} 