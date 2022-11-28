import { useState } from 'react'

function CreateMenuItem({ addProduct }) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState(0)

  const onSubmit = () => {
    addProduct({ name, description, price })
  }

  return (
    <div>
      <div>
        Name:{' '}
        <input
          name="name"
          value={name}
          onChange={({ target: { value } }) => setName(value)}
        />
      </div>
      <div>
        Description:{' '}
        <input
          name="description"
          value={description}
          onChange={({ target: { value } }) => setDescription(value)}
        />
      </div>
      <div>
        Price:{' '}
        <input
          name="price"
          value={price}
          onChange={({ target: { value } }) => setPrice(value)}
        />
      </div>
      <button onClick={onSubmit}>Create</button>
    </div>
  )
}

export default CreateMenuItem
