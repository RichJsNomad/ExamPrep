import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import './index.css'
import '@mantine/core/styles.css'
import '@mantine/notifications/styles.css'
import '@mantine/dates/styles.css'
import '@mantine/charts/styles.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider
      theme={{
        colors: {
          blue: ['#e6f2ff', '#cce4ff', '#99c9ff', '#66adff', '#3392ff', '#2563EB', '#1e4fbc', '#173b8d', '#10285e', '#09152f'],
          purple: ['#f3e6ff', '#e6ccff', '#cc99ff', '#b366ff', '#9933ff', '#9333EA', '#7429bb', '#551f8c', '#37145d', '#180a2e'],
          green: ['#e6fff5', '#ccffeb', '#99ffd6', '#66ffc2', '#33ffad', '#10B981', '#0d9468', '#0a6f4e', '#074a34', '#03251a'],
          orange: ['#fff7e6', '#ffefcc', '#ffdf99', '#ffcf66', '#ffbf33', '#F59E0B', '#c47e09', '#935e07', '#623f04', '#311f02'],
        },
        primaryColor: 'blue',
        defaultRadius: 'md',
      }}
    >
      <Notifications position="top-right" />
      <App />
    </MantineProvider>
  </StrictMode>,
)
