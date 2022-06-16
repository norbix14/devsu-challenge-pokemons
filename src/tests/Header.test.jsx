import { render } from '@testing-library/react'

import { describe, test, expect } from 'vitest'

import Header from '../components/Header'

describe('Header', () => {
  test('Debe mostrar el componente', () => {
    const result = render(
      <Header
        setIsEditing={() => {}}
        setAddPokemon={() => {}}
        setHide={() => {}}
        setBtnDisabled={() => {}}
      />
    )
    expect(result).toMatchSnapshot()
  })
})
