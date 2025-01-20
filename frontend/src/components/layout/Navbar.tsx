'use client';

import { useState } from 'react';
import { Container, Group, Menu, UnstyledButton, Text, Avatar, rem } from '@mantine/core';
import { IconChevronDown, IconUser, IconCalendar, IconMessage, IconLogout } from '@tabler/icons-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { notifications } from '@mantine/notifications';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'CLIENT' | 'LAWYER';
  profileImage?: string;
}

export function Navbar() {
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const router = useRouter();
  const userString = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
  const user: User | null = userString ? JSON.parse(userString) : null;

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    notifications.show({
      title: 'Logged out',
      message: 'You have been successfully logged out',
      color: 'green',
    });
    router.push('/auth/login');
  };

  return (
    <Container size="lg" h="100%">
      <Group justify="space-between" h="100%">
        <Link href="/dashboard" style={{ textDecoration: 'none', color: 'inherit' }}>
          <Text size="xl" fw={700}>Advolot</Text>
        </Link>

        <Group>
          {user?.role === 'CLIENT' && (
            <Link href="/lawyers" style={{ textDecoration: 'none' }}>
              <Text c="blue">Find a Lawyer</Text>
            </Link>
          )}

          <Menu
            width={260}
            position="bottom-end"
            transitionProps={{ transition: 'pop-top-right' }}
            onClose={() => setUserMenuOpened(false)}
            onOpen={() => setUserMenuOpened(true)}
            withinPortal
          >
            <Menu.Target>
              <UnstyledButton>
                <Group gap={7}>
                  <Avatar src={user?.profileImage} alt={user?.firstName} radius="xl" size={20} />
                  <Text fw={500} size="sm">
                    {user?.firstName} {user?.lastName}
                  </Text>
                  <IconChevronDown style={{ width: rem(12), height: rem(12) }} />
                </Group>
              </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
                leftSection={<IconUser style={{ width: rem(14), height: rem(14) }} />}
                component={Link}
                href="/profile"
              >
                Profile
              </Menu.Item>
              <Menu.Item
                leftSection={<IconCalendar style={{ width: rem(14), height: rem(14) }} />}
                component={Link}
                href="/appointments"
              >
                Appointments
              </Menu.Item>
              <Menu.Item
                leftSection={<IconMessage style={{ width: rem(14), height: rem(14) }} />}
                component={Link}
                href="/messages"
              >
                Messages
              </Menu.Item>
              <Menu.Item
                leftSection={<IconLogout style={{ width: rem(14), height: rem(14) }} />}
                onClick={handleLogout}
                color="red"
              >
                Logout
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Group>
    </Container>
  );
} 