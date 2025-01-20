'use client';

import { useState, useEffect } from 'react';
import { Container, Title, Card, Text, Button, Group, SimpleGrid, Badge, TextInput } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import axios from 'axios';

interface Lawyer {
  id: string;
  firstName: string;
  lastName: string;
  specialization: string;
  experience: string;
  consultationFee: string;
  bio: string;
}

interface Appointment {
  id: string;
  lawyerId: string;
  clientId: string;
  startTime: string;
  endTime: string;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED';
  lawyer: Lawyer;
}

export default function ClientDashboard() {
  const [lawyers, setLawyers] = useState<Lawyer[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLawyers();
    fetchAppointments();
  }, []);

  const fetchLawyers = async () => {
    try {
      const response = await axios.get('http://localhost:3002/users/lawyers');
      setLawyers(response.data);
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: 'Failed to fetch lawyers. Please try again.',
        color: 'red',
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchAppointments = async () => {
    try {
      const response = await axios.get('http://localhost:3002/appointments/client');
      setAppointments(response.data);
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: 'Failed to fetch appointments. Please try again.',
        color: 'red',
      });
    }
  };

  const bookAppointment = async (lawyerId: string) => {
    try {
      // This is a simplified version. In a real app, you'd show a date/time picker
      const startTime = new Date();
      startTime.setHours(startTime.getHours() + 1);
      const endTime = new Date(startTime);
      endTime.setHours(endTime.getHours() + 1);

      await axios.post('http://localhost:3002/appointments', {
        lawyerId,
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
      });

      notifications.show({
        title: 'Success',
        message: 'Appointment booked successfully!',
        color: 'green',
      });

      fetchAppointments();
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: 'Failed to book appointment. Please try again.',
        color: 'red',
      });
    }
  };

  const filteredLawyers = lawyers.filter(lawyer => 
    lawyer.specialization.toLowerCase().includes(searchQuery.toLowerCase()) ||
    `${lawyer.firstName} ${lawyer.lastName}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container size="lg" py="xl">
      <Title order={2} mb="xl">Your Dashboard</Title>

      <Card withBorder shadow="sm" p="md" mb="xl">
        <Title order={3} mb="md">Your Appointments</Title>
        {appointments.length === 0 ? (
          <Text c="dimmed">No appointments scheduled yet.</Text>
        ) : (
          <SimpleGrid cols={3}>
            {appointments.map((appointment) => (
              <Card key={appointment.id} withBorder p="sm">
                <Text fw={500}>{appointment.lawyer.firstName} {appointment.lawyer.lastName}</Text>
                <Text size="sm" c="dimmed">
                  {new Date(appointment.startTime).toLocaleString()}
                </Text>
                <Badge color={appointment.status === 'CONFIRMED' ? 'green' : 'yellow'}>
                  {appointment.status}
                </Badge>
              </Card>
            ))}
          </SimpleGrid>
        )}
      </Card>

      <Card withBorder shadow="sm" p="md">
        <Group justify="space-between" mb="md">
          <Title order={3}>Available Lawyers</Title>
          <TextInput
            placeholder="Search by name or specialization"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Group>

        <SimpleGrid cols={3}>
          {filteredLawyers.map((lawyer) => (
            <Card key={lawyer.id} withBorder p="md">
              <Text fw={500}>{lawyer.firstName} {lawyer.lastName}</Text>
              <Badge mb="xs">{lawyer.specialization}</Badge>
              <Text size="sm" mb="xs">{lawyer.experience} years of experience</Text>
              <Text size="sm" mb="xs">₹{lawyer.consultationFee}/hour</Text>
              <Text size="sm" mb="md" lineClamp={2}>{lawyer.bio}</Text>
              <Button onClick={() => bookAppointment(lawyer.id)} fullWidth>
                Book Consultation
              </Button>
            </Card>
          ))}
        </SimpleGrid>
      </Card>
    </Container>
  );
} 