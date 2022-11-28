import { Component } from 'react'

import { initializeApp } from 'firebase/app'
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore'

import CreateMenuItem from './CreateMenuItem'

const firebaseConfig = {
  apiKey: 'AIzaSyCOKRS_QQQhVIG9LEr1FvkQ6wWKzO4PCUU',
  authDomain: 'react-project-fca2c.firebaseapp.com',
  databaseURL: 'https://react-project-fca2c.firebaseio.com',
  projectId: 'react-project-fca2c',
  storageBucket: 'react-project-fca2c.appspot.com',
  messagingSenderId: '294456819285',
  appId: '1:294456819285:web:cb05dae1ed581afef01edc',
  measurementId: 'G-GQPC4S4NGT',
}

class RestaurantMenu extends Component {
  state = {
    products: [],
  }

  constructor() {
    super()

    const app = initializeApp(firebaseConfig)
    this.db = getFirestore(app)
  }

  componentDidMount() {
    getDocs(collection(this.db, 'products')).then((data) => {
      const products = []

      data.forEach((doc) => {
        products.push({ id: doc.id, ...doc.data() })
      })

      this.setState({ ...this.state, products })
    })
  }

  componentDidUpdate() {
    getDocs(collection(this.db, 'products')).then((data) => {
      const products = []

      data.forEach((doc) => {
        products.push({ id: doc.id, ...doc.data() })
      })

      this.setState({ ...this.state, products })
    })
  }

  addProduct = async ({ name, description, price }) => {
    await addDoc(collection(this.db, 'products'), {
      name,
      description,
      price,
    })
  }

  async removeProduct(id) {
    await deleteDoc(doc(this.db, 'products', id))

    this.setState(this.state)
  }

  render() {
    return this.state?.products ? (
      <div>
        <div>
          {this.state?.products.map(({ id, name, description, price }) => {
            return (
              <div key={id}>
                <div>{name}</div>
                <div>{description}</div>
                <div>{price}</div>
                <button onClick={() => this.removeProduct(id)}>Remove</button>
              </div>
            )
          })}
        </div>
        <CreateMenuItem addProduct={this.addProduct} />
      </div>
    ) : (
      <div>Loading...</div>
    )
  }
}

export default RestaurantMenu
