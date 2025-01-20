'use client';

import { useState, useEffect } from 'react';
import { Container, Title, Text, Paper, Group, Button, Loader, Center } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import api from '@/utils/api';
import { AppLayout } from '@/components/layout/AppLayout';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'CLIENT' | 'LAWYER';
  specialties?: string[];
  hourlyRate?: number;
  bio?: string;
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get('/users/me');
        setUser(response.data);
      } catch (error) {
        notifications.show({
          title: 'Error',
          message: 'Failed to load user data',
          color: 'red',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <AppLayout>
        <Center h={400}>
          <Loader size="lg" />
        </Center>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <Container size="lg">
        <Title order={1} mb="lg">Welcome, {user?.firstName}!</Title>
        
        {user?.role === 'LAWYER' ? (
          <Paper shadow="sm" p="md" mb="lg">
            <Title order={2} size="h3" mb="md">Your Profile</Title>
            <Text mb="xs"><strong>Specialties:</strong> {user.specialties?.join(', ') || 'Not specified'}</Text>
            <Text mb="xs"><strong>Hourly Rate:</strong> ${user.hourlyRate || 0}/hour</Text>
            <Text mb="lg"><strong>Bio:</strong> {user.bio || 'No bio provided'}</Text>
            <Button component="a" href="/profile" variant="light">Edit Profile</Button>
          </Paper>
        ) : (
          <Paper shadow="sm" p="md" mb="lg">
            <Title order={2} size="h3" mb="md">Find Legal Help</Title>
            <Text mb="lg">Search for lawyers based on their specialties and schedule consultations.</Text>
            <Button component="a" href="/lawyers" variant="filled">Find a Lawyer</Button>
          </Paper>
        )}

        <Paper shadow="sm" p="md">
          <Title order={2} size="h3" mb="md">
            {user?.role === 'LAWYER' ? 'Manage Appointments' : 'My Appointments'}
          </Title>
          <Text mb="lg">
            {user?.role === 'LAWYER'
              ? 'View and manage your upcoming consultations with clients.'
              : 'View and manage your scheduled consultations with lawyers.'}
          </Text>
          <Button component="a" href="/appointments" variant="light">
            View Appointments
          </Button>
        </Paper>
      </Container>
    </AppLayout>
  );
} 