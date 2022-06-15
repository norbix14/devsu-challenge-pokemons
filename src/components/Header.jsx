import { useState } from 'react'

import { axiosRequest } from '../helpers/'

const Header = ({
  setPokemon,
  setAddPokemon,
  setIsEditing,
  setHide,
  setNotFound,
  setBtnDisabled,
}) => {
  const [value, setValue] = useState('')
  const handleSubmit = async (e) => {
    e.preventDefault()
    const [result, error] = await axiosRequest({
      method: 'GET',
      url: '/?idAuthor=1',
    })
    if (error) {
      console.log(error)
      const message = error.message || 'Ha ocurrido un error'
      setNotFound({ error: true, message })
    } else {
      const filtered = result.data.filter((p) => {
        return p.name.toLowerCase() === value.toLowerCase()
      })
      if (filtered.length > 0) {
        const pokemon = Object.keys(filtered[0]).length > 0 ? filtered[0] : {}
        setNotFound({ error: false, message: '' })
        setPokemon(pokemon)
      } else {
        setNotFound({ error: true, message: 'No se encontró ningún Pokemon' })
        setPokemon({})
      }
    }
  }
  const handleChange = (e) => setValue(e.target.value)
  const handleClick = ({ type = 'default' }) => {
    switch (type.toLowerCase()) {
      case 'add':
        setIsEditing(false)
        setHide(false)
        setAddPokemon(true)
        setBtnDisabled(true)
        break
      case 'default':
      default:
        setHide(true)
    }
  }
  return (
    <div className="header mt-2 mb-2">
      <form
        className="form-search bg-white py-2 border-gray"
        onSubmit={handleSubmit}
      >
        <span>
          <i className="bx bx-search-alt-2"></i>
        </span>
        <input
          className="border-none"
          type="search"
          placeholder="Buscar"
          required
          value={value}
          onChange={handleChange}
        />
      </form>
      <button
        type="button"
        className="bg-main color-white btn btn-action py-4 px-4"
        onClick={() => handleClick({ type: 'add' })}
      >
        <i className="bx bx-plus"></i> Nuevo
      </button>
    </div>
  )
}

export default Header
