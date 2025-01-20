'use client';

import { useState, useEffect } from 'react';
import { Container, Title, TextInput, MultiSelect, NumberInput, Group, Paper, Text, Button, Stack, Loader, Center } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconSearch } from '@tabler/icons-react';
import { AppLayout } from '@/components/layout/AppLayout';
import api from '@/utils/api';

interface Lawyer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  specialties: string[];
  hourlyRate: number;
  bio?: string;
  barNumber?: string;
}

export default function LawyersPage() {
  const [lawyers, setLawyers] = useState<Lawyer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
  const [maxHourlyRate, setMaxHourlyRate] = useState<number | undefined>(undefined);

  // List of legal specialties (you can expand this list)
  const specialtiesList = [
    'Criminal Law',
    'Family Law',
    'Corporate Law',
    'Intellectual Property',
    'Real Estate',
    'Immigration',
    'Employment Law',
    'Tax Law',
    'Civil Litigation',
    'Estate Planning'
  ];

  useEffect(() => {
    const fetchLawyers = async () => {
      try {
        const response = await api.get('/users', {
          params: {
            role: 'LAWYER',
            specialties: selectedSpecialties.length > 0 ? selectedSpecialties.join(',') : undefined,
            maxHourlyRate,
            search: searchTerm || undefined
          }
        });
        setLawyers(response.data);
      } catch (error) {
        notifications.show({
          title: 'Error',
          message: 'Failed to load lawyers',
          color: 'red'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchLawyers();
  }, [searchTerm, selectedSpecialties, maxHourlyRate]);

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
        <Title order={1} mb="lg">Find a Lawyer</Title>

        {/* Search and Filter Section */}
        <Paper shadow="sm" p="md" mb="xl">
          <Stack>
            <TextInput
              placeholder="Search by name or specialty"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              leftSection={<IconSearch size={16} />}
            />
            <Group grow>
              <MultiSelect
                label="Specialties"
                placeholder="Select specialties"
                data={specialtiesList}
                value={selectedSpecialties}
                onChange={setSelectedSpecialties}
              />
              <NumberInput
                label="Maximum Hourly Rate"
                placeholder="Enter amount"
                value={maxHourlyRate}
                onChange={(val) => setMaxHourlyRate(val || undefined)}
                min={0}
                prefix="$"
              />
            </Group>
          </Stack>
        </Paper>

        {/* Results Section */}
        {lawyers.length === 0 ? (
          <Text c="dimmed" ta="center">No lawyers found matching your criteria.</Text>
        ) : (
          <Stack>
            {lawyers.map((lawyer) => (
              <Paper key={lawyer.id} shadow="sm" p="md">
                <Group justify="space-between" mb="xs">
                  <div>
                    <Text size="lg" fw={500}>{lawyer.firstName} {lawyer.lastName}</Text>
                    <Text size="sm" c="dimmed">Bar Number: {lawyer.barNumber || 'N/A'}</Text>
                  </div>
                  <Text fw={500}>${lawyer.hourlyRate}/hr</Text>
                </Group>
                <Text size="sm" mb="md">{lawyer.bio || 'No bio provided'}</Text>
                <Group gap={8} mb="md">
                  {lawyer.specialties.map((specialty) => (
                    <Text key={specialty} size="sm" c="blue">{specialty}</Text>
                  ))}
                </Group>
                <Button variant="light" component="a" href={`/lawyers/${lawyer.id}`}>
                  View Profile
                </Button>
              </Paper>
            ))}
          </Stack>
        )}
      </Container>
    </AppLayout>
  );
} 