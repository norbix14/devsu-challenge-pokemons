import { render, screen } from '@testing-library/react'

import { beforeEach, describe, test } from 'vitest'

import App from '../App'

describe('App', () => {
  beforeEach(() => {
    render(<App />)
  })
  test('Debe mostrar la app.', () => {
    const result = render()
    expect(result).toMatchSnapshot()
  })
  test('Debe mostrar el formulario de busqueda del Pokemon.', () => {
    expect(screen.queryByPlaceholderText('Buscar')).toBeDefined()
  })
  test('Debe mostrar el botón de Nuevo Pokemon.', () => {
    expect(screen.queryByText('Nuevo')).toBeDefined()
  })
  test('Debe mostrar el mensaje de inicio.', () => {
    expect(screen.getByText(/Ingresa el nombre del Pokemon/i)).toBeDefined()
  })
})
