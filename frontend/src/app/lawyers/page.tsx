/**
 * Lawyer Search Page
 * 
 * Provides functionality for clients to search and filter lawyers based on:
 * - Name or specialty (text search)
 * - Specific legal specialties (multi-select)
 * - Maximum hourly rate
 * 
 * Results are displayed in cards showing lawyer profiles with key information
 * and a link to view their full profile.
 */
'use client';

import { useState, useEffect } from 'react';
import { Container, Title, TextInput, MultiSelect, NumberInput, Group, Paper, Text, Button, Stack, Loader, Center } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconSearch } from '@tabler/icons-react';
import { AppLayout } from '@/components/layout/AppLayout';
import api from '@/utils/api';

/**
 * Interface representing a lawyer's profile data
 */
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
  // State management for search results and filters
  const [lawyers, setLawyers] = useState<Lawyer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
  const [maxHourlyRate, setMaxHourlyRate] = useState<number | undefined>(undefined);

  // Predefined list of legal specialties
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

  /**
   * Fetches lawyers based on current filter settings
   * Re-runs when any filter changes
   */
  useEffect(() => {
    const fetchLawyers = async () => {
      try {
        // Call API with current filter parameters
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
        // Show error notification if request fails
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

  // Show loading state while fetching data
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

        {/* Search and Filter Controls */}
        <Paper shadow="sm" p="md" mb="xl">
          <Stack>
            {/* Text search input */}
            <TextInput
              placeholder="Search by name or specialty"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              leftSection={<IconSearch size={16} />}
            />
            <Group grow>
              {/* Specialty filter */}
              <MultiSelect
                label="Specialties"
                placeholder="Select specialties"
                data={specialtiesList}
                value={selectedSpecialties}
                onChange={setSelectedSpecialties}
              />
              {/* Hourly rate filter */}
              <NumberInput
                label="Maximum Hourly Rate"
                placeholder="Enter amount"
                value={maxHourlyRate}
                onChange={(val: number | string | undefined) => setMaxHourlyRate(typeof val === 'number' ? val : undefined)}
                min={0}
                prefix="$"
              />
            </Group>
          </Stack>
        </Paper>

        {/* Results Section */}
        {lawyers.length === 0 ? (
          // Show message when no results found
          <Text c="dimmed" ta="center">No lawyers found matching your criteria.</Text>
        ) : (
          // Display lawyer cards
          <Stack>
            {lawyers.map((lawyer) => (
              <Paper key={lawyer.id} shadow="sm" p="md">
                {/* Lawyer header with name and rate */}
                <Group justify="space-between" mb="xs">
                  <div>
                    <Text size="lg" fw={500}>{lawyer.firstName} {lawyer.lastName}</Text>
                    <Text size="sm" c="dimmed">Bar Number: {lawyer.barNumber || 'N/A'}</Text>
                  </div>
                  <Text fw={500}>${lawyer.hourlyRate}/hr</Text>
                </Group>
                {/* Lawyer bio */}
                <Text size="sm" mb="md">{lawyer.bio || 'No bio provided'}</Text>
                {/* Specialties tags */}
                <Group gap={8} mb="md">
                  {lawyer.specialties.map((specialty) => (
                    <Text key={specialty} size="sm" c="blue">{specialty}</Text>
                  ))}
                </Group>
                {/* Profile link */}
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