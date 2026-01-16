import { ReactElement, ReactNode } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { MantineProvider } from '@mantine/core'

interface WrapperProps {
  children: ReactNode
}

function AllProviders({ children }: WrapperProps) {
  return <MantineProvider>{children}</MantineProvider>
}

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: AllProviders, ...options })

export * from '@testing-library/react'
export { customRender as render }
