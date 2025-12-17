import { AppShell, Burger, Group, Title, Avatar, ActionIcon, Indicator, ScrollArea } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconBell, IconHome, IconBook, IconTarget, IconWriting, IconFileText, IconTrophy, IconChartBar } from '@tabler/icons-react'
import { NavLink } from '@mantine/core'
import { Link, useLocation } from 'react-router-dom'
import type { ReactNode } from 'react'

interface MainLayoutProps {
  children: ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure()
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true)
  const location = useLocation()

  const navigationItems = [
    { icon: IconHome, label: 'Главная', href: '/', color: 'blue' },
    { icon: IconBook, label: 'Мои курсы', href: '/courses', color: 'purple' },
    { icon: IconTarget, label: 'Мой план поступления', href: '/roadmap', color: 'orange' },
    { icon: IconWriting, label: 'Практика', href: '/practice', color: 'green' },
    { icon: IconFileText, label: 'Пробные экзамены', href: '/mock-exam/subjects', color: 'blue' },
    { icon: IconTrophy, label: 'Достижения', href: '/achievements', color: 'orange' },
    { icon: IconChartBar, label: 'Статистика', href: '/stats', color: 'purple' },
  ]

  return (
    <AppShell
      header={{ height: 70 }}
      navbar={{
        width: 280,
        breakpoint: 'sm',
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
      padding="md"
    >
      {/* Header */}
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Group>
            <Burger
              opened={mobileOpened}
              onClick={toggleMobile}
              hiddenFrom="sm"
              size="sm"
            />
            <Burger
              opened={desktopOpened}
              onClick={toggleDesktop}
              visibleFrom="sm"
              size="sm"
            />
            <Title order={3} c="blue">🎓 ExamPrep</Title>
          </Group>

          <Group>
            <Indicator inline processing color="red" size={10} offset={7}>
              <ActionIcon variant="subtle" size="lg" color="gray">
                <IconBell size={22} />
              </ActionIcon>
            </Indicator>
            <Avatar
              src={null}
              alt="Иван Петров"
              color="blue"
              radius="xl"
              size="md"
            >
              ИП
            </Avatar>
          </Group>
        </Group>
      </AppShell.Header>

      {/* Navbar */}
      <AppShell.Navbar p="md">
        <AppShell.Section grow component={ScrollArea}>
          {navigationItems.map((item) => (
            <NavLink
              key={item.href}
              component={Link}
              to={item.href}
              label={item.label}
              leftSection={<item.icon size={20} stroke={1.5} />}
              active={location.pathname === item.href}
              variant="subtle"
              color={item.color}
              mb="xs"
            />
          ))}
        </AppShell.Section>
      </AppShell.Navbar>

      {/* Main Content */}
      <AppShell.Main>
        {children}
      </AppShell.Main>
    </AppShell>
  )
}
