import { axiosRequest } from '../helpers'

const Main = ({
  pokemon,
  setPokemon,
  setAddPokemon,
  setIsEditing,
  setHide,
  setNotFound,
}) => {
  const handleClick = async ({ type = 'default' }) => {
    switch (type.toLowerCase()) {
      case 'edit':
        setHide(false)
        setAddPokemon(true)
        setIsEditing(true)
        setPokemon(pokemon)
        break
      case 'delete':
        let confirmDeletion = confirm('¿Estás seguro de eliminar este Pokemon?')
        if (confirmDeletion) {
          const [result, error] = await axiosRequest({
            method: 'DELETE',
            url: `/${pokemon.id}`,
          })
          if (error) {
            console.log(error)
            const message = error.message || 'Ha ocurrido un error'
            setNotFound({ error: true, message })
          } else {
            setNotFound({ error: false, message: '' })
            setAddPokemon(false)
            setHide(true)
            setPokemon({})
          }
        }
        break
      case 'default':
      default:
        setHide(true)
    }
  }
  return (
    <div className="main mb-2 bg-white">
      <table>
        <thead>
          <tr className="color-secondary">
            <th>Nombre</th>
            <th>Imagen</th>
            <th>Ataque</th>
            <th>Defensa</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{pokemon.name}</td>
            <td>
              {pokemon.image ? (
                <img
                  className="img-pokemon img-fit"
                  src={pokemon.image}
                  alt={pokemon.name}
                />
              ) : (
                'No hay imagen'
              )}
            </td>
            <td>{pokemon.attack}</td>
            <td>{pokemon.defense}</td>
            <td>
              <div className="actions">
                <i
                  className="btn bx bx-edit-alt color-main"
                  onClick={() => handleClick({ type: 'edit' })}
                  title={`Editar ${pokemon.name}`}
                ></i>
                <i
                  className="btn bx bx-trash color-main"
                  onClick={() => handleClick({ type: 'delete' })}
                  title={`Eliminar ${pokemon.name}`}
                ></i>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Main
