import { AppShell, Burger, Group, Title, Avatar, ActionIcon, Indicator, Divider, Popover, Text, Stack, Badge, ScrollArea, Tooltip } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconBell, IconHome, IconBook, IconTarget, IconWriting, IconFileText, IconTrophy, IconChartBar, IconUsers, IconCheck, IconCreditCard } from '@tabler/icons-react'
import { NavLink } from '@mantine/core'
import { Link, useLocation } from 'react-router-dom'
import type { ReactNode } from 'react'

interface MainLayoutProps {
  children: ReactNode
}

// Типы уведомлений
interface Notification {
  id: string
  title: string
  message: string
  time: string
  read: boolean
}

// Демо-уведомления
const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'Добро пожаловать!',
    message: 'Вы успешно зарегистрировались в ExamPrep. Начните свой путь к успеху!',
    time: '2 минуты назад',
    read: false,
  },
]

export function MainLayout({ children }: MainLayoutProps) {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure()
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true)
  const [notificationsOpened, { toggle: toggleNotifications }] = useDisclosure()
  const location = useLocation()

  const unreadCount = mockNotifications.filter(n => !n.read).length

  const studentItems = [
    { icon: IconHome, label: 'Главная', href: '/dashboard', color: 'blue', disabled: false },
    { icon: IconBook, label: 'Мои курсы', href: '/lesson/first', color: 'purple', disabled: false },
    { icon: IconTarget, label: 'Мой план поступления', href: '/roadmap', color: 'orange', disabled: false },
    { icon: IconWriting, label: 'Практика', href: '/daily/practice', color: 'green', disabled: false },
    { icon: IconFileText, label: 'Пробные экзамены', href: '/mock-exam/subjects', color: 'blue', disabled: false },
    { icon: IconTrophy, label: 'Достижения', href: '/achievements', color: 'orange', disabled: true },
    { icon: IconChartBar, label: 'Статистика', href: '/stats', color: 'purple', disabled: true },
    { icon: IconCreditCard, label: 'Подписка', href: '/subscription/plans', color: 'green', disabled: false },
  ]

  const parentItems = [
    { icon: IconUsers, label: 'Режим родителя', href: '/parent/dashboard', color: 'grape' },
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
            <Popover
              width={350}
              position="bottom-end"
              shadow="xl"
              opened={notificationsOpened}
              onChange={toggleNotifications}
            >
              <Popover.Target>
                <Indicator
                  inline
                  processing={unreadCount > 0}
                  color="red"
                  size={10}
                  offset={7}
                  label={unreadCount > 0 ? unreadCount : undefined}
                >
                  <ActionIcon
                    variant="subtle"
                    size="lg"
                    color="gray"
                    onClick={toggleNotifications}
                  >
                    <IconBell size={22} />
                  </ActionIcon>
                </Indicator>
              </Popover.Target>
              <Popover.Dropdown p={0}>
                <div style={{ padding: '16px', borderBottom: '1px solid #e9ecef' }}>
                  <Group justify="space-between">
                    <Text fw={700} size="lg">Уведомления</Text>
                    {unreadCount > 0 && (
                      <Badge size="sm" color="red" variant="filled">
                        {unreadCount} новых
                      </Badge>
                    )}
                  </Group>
                </div>
                <div>
                  <Stack gap={0}>
                    {mockNotifications.length === 0 ? (
                      <div style={{ padding: '32px', textAlign: 'center' }}>
                        <Text c="dimmed" size="sm">Нет уведомлений</Text>
                      </div>
                    ) : (
                      mockNotifications.map((notification) => (
                        <div
                          key={notification.id}
                          style={{
                            padding: '16px',
                            borderBottom: '1px solid #f1f3f5',
                            backgroundColor: notification.read ? 'transparent' : '#f8f9fa',
                            cursor: 'pointer',
                            transition: 'background-color 0.2s',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#e9ecef'
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = notification.read ? 'transparent' : '#f8f9fa'
                          }}
                        >
                          <Group align="flex-start" wrap="nowrap" gap="sm">
                            <div
                              style={{
                                width: 8,
                                height: 8,
                                borderRadius: '50%',
                                backgroundColor: notification.read ? 'transparent' : '#fa5252',
                                marginTop: 6,
                                flexShrink: 0,
                              }}
                            />
                            <div style={{ flex: 1 }}>
                              <Text fw={600} size="sm" mb={4}>
                                {notification.title}
                              </Text>
                              <Text size="xs" c="dimmed" mb={8}>
                                {notification.message}
                              </Text>
                              <Text size="xs" c="dimmed">
                                {notification.time}
                              </Text>
                            </div>
                            {!notification.read && (
                              <ActionIcon size="sm" variant="subtle" color="blue">
                                <IconCheck size={14} />
                              </ActionIcon>
                            )}
                          </Group>
                        </div>
                      ))
                    )}
                  </Stack>
                </div>
              </Popover.Dropdown>
            </Popover>
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
          {studentItems.map((item) => {
            if (item.disabled) {
              return (
                <Tooltip
                  key={item.href}
                  label="Скоро будет доступно"
                  position="right"
                  withArrow
                >
                  <div>
                    <NavLink
                      label={item.label}
                      leftSection={<item.icon size={20} stroke={1.5} />}
                      variant="subtle"
                      color={item.color}
                      mb="xs"
                      onClick={(e: React.MouseEvent) => {
                        e.preventDefault()
                        e.stopPropagation()
                      }}
                    />
                  </div>
                </Tooltip>
              )
            }

            return (
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
            )
          })}

          <Divider my="md" />

          {parentItems.map((item) => (
            <NavLink
              key={item.href}
              component={Link}
              to={item.href}
              label={item.label}
              leftSection={<item.icon size={20} stroke={1.5} />}
              active={location.pathname.startsWith('/parent')}
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
