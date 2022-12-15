import { render, screen } from '@testing-library/react'
import App from './App'

test('renders layout configuration buttons', () => {
  render(<App />)
  const configHeader = screen.getByText(/Layout/i)
  expect(configHeader).toBeInTheDocument()
})

test('changes board layout by configuration ', () => {
  render(<App />)
  const configHeader = screen.getByText(/Layout/i)
  expect(configHeader).toBeInTheDocument()
})
