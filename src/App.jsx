import { useState } from 'react'

import './App.css'

import { Form, Header, Main, Message } from './components'

function App() {
  const [pokemon, setPokemon] = useState({})
  const [addPokemon, setAddPokemon] = useState(false)
  const [hide, setHide] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [notFound, setNotFound] = useState({
    error: false,
    message: 'Not found',
  })
  const isEmpty = (obj) => Object.keys(obj).length <= 0
  return (
    <div className="app bg-light-gray">
      <div className="container">
        <h3 className="p-0 m-0">Listado de Pokemons</h3>
        <Header
          setPokemon={setPokemon}
          setAddPokemon={setAddPokemon}
          setIsEditing={setIsEditing}
          setHide={setHide}
          setNotFound={setNotFound}
        />
        {isEmpty(pokemon) && (
          <Message message="Ingresa el nombre del Pokemon" />
        )}
        {notFound.error && <Message message={notFound.message} />}
        {!isEmpty(pokemon) && (
          <Main
            pokemon={pokemon}
            setPokemon={setPokemon}
            setAddPokemon={setAddPokemon}
            setIsEditing={setIsEditing}
            setHide={setHide}
            setNotFound={setNotFound}
          />
        )}
        {addPokemon && !hide && (
          <Form
            pokemon={pokemon}
            isEditing={isEditing}
            setPokemon={setPokemon}
            setHide={setHide}
            setNotFound={setNotFound}
          />
        )}
      </div>
    </div>
  )
}

export default App
