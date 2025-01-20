'use client';

import { useState, useEffect } from 'react';
import { Container, Title, Card, Text, Button, Group, SimpleGrid, Badge, Switch } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import axios from 'axios';

interface Client {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface Appointment {
  id: string;
  clientId: string;
  startTime: string;
  endTime: string;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED';
  client: Client;
}

interface Availability {
  id: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

export default function LawyerDashboard() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [availability, setAvailability] = useState<Availability[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
    fetchAvailability();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get('http://localhost:3002/appointments/lawyer');
      setAppointments(response.data);
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: 'Failed to fetch appointments. Please try again.',
        color: 'red',
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchAvailability = async () => {
    try {
      const response = await axios.get('http://localhost:3002/availability');
      setAvailability(response.data);
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: 'Failed to fetch availability. Please try again.',
        color: 'red',
      });
    }
  };

  const updateAppointmentStatus = async (appointmentId: string, status: 'CONFIRMED' | 'CANCELLED') => {
    try {
      await axios.patch(`http://localhost:3002/appointments/${appointmentId}`, { status });
      
      notifications.show({
        title: 'Success',
        message: `Appointment ${status.toLowerCase()} successfully!`,
        color: 'green',
      });

      fetchAppointments();
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: 'Failed to update appointment status. Please try again.',
        color: 'red',
      });
    }
  };

  const updateAvailability = async (dayOfWeek: number, isAvailable: boolean) => {
    try {
      await axios.post('http://localhost:3002/availability', {
        dayOfWeek,
        isAvailable,
        startTime: '09:00',  // Default work hours
        endTime: '17:00',
      });

      notifications.show({
        title: 'Success',
        message: 'Availability updated successfully!',
        color: 'green',
      });

      fetchAvailability();
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: 'Failed to update availability. Please try again.',
        color: 'red',
      });
    }
  };

  const getDayName = (day: number) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[day];
  };

  return (
    <Container size="lg" py="xl">
      <Title order={2} mb="xl">Lawyer Dashboard</Title>

      <Card withBorder shadow="sm" p="md" mb="xl">
        <Title order={3} mb="md">Upcoming Appointments</Title>
        {appointments.length === 0 ? (
          <Text c="dimmed">No appointments scheduled yet.</Text>
        ) : (
          <SimpleGrid cols={3}>
            {appointments.map((appointment) => (
              <Card key={appointment.id} withBorder p="sm">
                <Text fw={500}>{appointment.client.firstName} {appointment.client.lastName}</Text>
                <Text size="sm" c="dimmed">
                  {new Date(appointment.startTime).toLocaleString()}
                </Text>
                <Badge mb="sm" color={
                  appointment.status === 'CONFIRMED' ? 'green' : 
                  appointment.status === 'CANCELLED' ? 'red' : 'yellow'
                }>
                  {appointment.status}
                </Badge>
                {appointment.status === 'PENDING' && (
                  <Group>
                    <Button 
                      size="xs" 
                      color="green"
                      onClick={() => updateAppointmentStatus(appointment.id, 'CONFIRMED')}
                    >
                      Confirm
                    </Button>
                    <Button 
                      size="xs" 
                      color="red"
                      onClick={() => updateAppointmentStatus(appointment.id, 'CANCELLED')}
                    >
                      Cancel
                    </Button>
                  </Group>
                )}
              </Card>
            ))}
          </SimpleGrid>
        )}
      </Card>

      <Card withBorder shadow="sm" p="md">
        <Title order={3} mb="md">Weekly Availability</Title>
        <SimpleGrid cols={7}>
          {[0, 1, 2, 3, 4, 5, 6].map((day) => {
            const dayAvailability = availability.find(a => a.dayOfWeek === day);
            return (
              <Card key={day} withBorder p="sm">
                <Text fw={500} mb="xs">{getDayName(day)}</Text>
                <Switch
                  checked={dayAvailability?.isAvailable ?? false}
                  onChange={(event) => updateAvailability(day, event.currentTarget.checked)}
                  label={dayAvailability?.isAvailable ? 'Available' : 'Unavailable'}
                />
                {dayAvailability?.isAvailable && (
                  <Text size="sm" mt="xs">
                    {dayAvailability.startTime} - {dayAvailability.endTime}
                  </Text>
                )}
              </Card>
            );
          })}
        </SimpleGrid>
      </Card>
    </Container>
  );
} 