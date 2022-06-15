import { useMemo, useEffect, useState } from 'react'

import { axiosRequest } from '../helpers'

const Form = ({
  setPokemon,
  pokemon,
  isEditing,
  setHide,
  setNotFound,
  btnDisabled,
  setBtnDisabled,
}) => {
  const emptyState = {
    attack: '0',
    defense: '0',
    image: '',
    name: '',
  }
  const [values, setValues] = useState(
    Object.keys(pokemon).length > 0 && isEditing ? pokemon : emptyState
  )
  const [fieldError, setFieldError] = useState({
    attack: false,
    defense: false,
    image: false,
    name: false,
  })
  const inputText = useMemo(() => {
    return [
      {
        id: 'name',
        key: 1,
        name: 'name',
        placeholder: 'Nombre',
        type: 'text',
      },
      {
        id: 'image',
        key: 2,
        name: 'image',
        placeholder: 'Imagen',
        type: 'text',
      },
    ]
  }, [])
  const inputRange = useMemo(() => {
    return [
      {
        id: 'attack',
        key: 1,
        name: 'attack',
        placeholder: 'Ataque',
        type: 'range',
      },
      {
        id: 'defense',
        key: 2,
        name: 'defense',
        placeholder: 'Defensa',
        type: 'range',
      },
    ]
  }, [])
  const handleSubmit = (e) => e.preventDefault()
  const checkFields = (name, value) => {
    if (value.trim() === '') {
      setFieldError({ ...fieldError, [name]: true })
    } else {
      setFieldError({ ...fieldError, [name]: false })
    }
  }
  const handleChange = (e) => {
    const { name, value } = e.target
    setValues({ ...values, [name]: value })
    checkFields(name, value)
  }
  const handleFocus = (e) => {
    const { name, value } = e.target
    checkFields(name, value)
  }
  const handleBlur = (e) => {
    const { name, value } = e.target
    checkFields(name, value)
    if (fieldError['name'] || fieldError['image']) {
      setBtnDisabled(true)
    } else {
      setBtnDisabled(false)
    }
  }
  const handleClick = async ({ type = 'default' }) => {
    const data = {
      ...values,
      attack: parseInt(values.attack),
      defense: parseInt(values.defense),
      hp: parseInt(values.hp) || 100,
      idAuthor: values.idAuthor || 1,
      id_author: values.id_author || 1,
      type: values.type || 'normal',
    }
    const url = isEditing ? `/${values.id}` : '/?idAuthor=1'
    const method = isEditing ? 'PUT' : 'POST'
    switch (type.toLowerCase()) {
      case 'save':
        const [result, error] = await axiosRequest({
          method,
          url,
          data,
        })
        if (error) {
          console.log(error)
          const message = error.message || 'Ha ocurrido un error'
          setNotFound({ error: true, message })
        } else {
          setNotFound({ error: false, message: '' })
          setPokemon(result.data)
          setBtnDisabled(true)
          setHide(true)
        }
        break
      case 'cancel':
        setBtnDisabled(true)
        setHide(true)
      case 'default':
      default:
        setHide(true)
    }
  }
  useEffect(() => {
    if (isEditing) {
      setValues(pokemon)
      setFieldError({ ...fieldError, name: false, image: false })
    } else {
      setValues(emptyState)
    }
  }, [isEditing])
  return (
    <div className="form-container border-gray py-4 bg-white">
      <h3 className="text-center">{isEditing ? 'Editar' : 'Nuevo'} Pokemon</h3>
      <form className="form-crud" onSubmit={handleSubmit}>
        <div className="inputs mt-2 mb-2">
          <div>
            {inputText.map(({ type, name, placeholder, id, key }) => (
              <div className="fields text mb-2" key={key}>
                <label htmlFor={id}>{placeholder}: </label>
                <input
                  className={fieldError[name] ? 'border-error' : ''}
                  required
                  type={type}
                  name={name}
                  placeholder={placeholder}
                  id={id}
                  value={values[name]}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onFocus={handleFocus}
                />
              </div>
            ))}
          </div>
          <div>
            {inputRange.map(({ type, name, placeholder, id, key }) => (
              <div className="fields range mb-2" key={key}>
                <label htmlFor={id}>{placeholder}: </label>
                <div className="range-container">
                  <span>0</span>
                  <input
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    id={id}
                    value={values[name]}
                    onChange={handleChange}
                    title={`${placeholder}: ${values[name]}`}
                  />
                  <span>100</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="more-actions">
          <button
            className="bg-main color-white btn btn-action py-4 px-4"
            type="submit"
            disabled={btnDisabled}
            onClick={() => handleClick({ type: 'save' })}
          >
            <i className="bx bxs-save"></i>{' '}
            {isEditing ? 'Actualizar' : 'Guardar'}
          </button>
          <button
            className="bg-main color-white btn btn-action py-4 px-4"
            type="button"
            onClick={() => handleClick({ type: 'cancel' })}
          >
            <i className="bx bx-x"></i> Cancelar
          </button>
        </div>
      </form>
    </div>
  )
}

export default Form
