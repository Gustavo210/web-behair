import styles from '../../styles/Dashboard.module.css'
import { useRouter } from 'next/router'
import HeaderApp from '../../components/HeaderApp'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import IntlCurrencyInput from 'react-intl-currency-input'

import { PropsUser } from '../../contract'
import api from '../../services/api'

export default function CreateProduct() {
  const route = useRouter()
  const [user, setUser] = useState<PropsUser | null>(null)
  const [image, setImage] = useState('')
  const [productName, setProductName] = useState('')
  const [productDescription, setProductDescription] = useState('')

  const [productPriceRaw, setProductPriceRaw] = useState(0)
  useEffect(() => {
    const user = Cookies.get('@user')
    if (!user) {
      route.push('/')
    } else {
      setUser(JSON.parse(user))
    }
  }, [])

  const handleChange = (event, value, maskedValue) => {
    event.preventDefault()
    setProductPriceRaw(value)
  }

  const currencyConfig = {
    locale: 'pt-BR',
    formats: {
      number: {
        BRL: {
          style: 'currency',
          currency: 'BRL',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        },
      },
    },
  }
  async function getAllData(event) {
    event.preventDefault()

    const data = await api.get(`establishments/${ user.id }`)
    if (!data?.data?.id) {
      route.replace('/')
    }
    const createProduct = {
      name: productName,
      photo: image,
      description: productDescription,
      cost: productPriceRaw,
      id_establishment: data.data.id,
    }
    if (!productName || !image || !productDescription || !productPriceRaw) {
      alert('erro ao cadastrar produto, preencha todos os campos corretamente')
    }
    const response = await api.post('products', createProduct).catch(error => {
      alert(error.response.data.message)
      return error
    })
    if (response.status === 201) {
      route.replace('/dashboard')
      return
    }
    alert('Erro ao cadastrar produto')
  }
  return (
    <>
      <HeaderApp title={`${ user?.name } ${ user?.surname }`} />
      <div className={styles.container}>
        <h1>Novo produto</h1>
        <form className={styles.containerProduct} onSubmit={getAllData}>
          <div className={styles.containerInfoProduct}>
            <div className={styles.productImage}>
              {image ? (
                <img src={image} alt="" />
              ) : (
                <div className={styles.emptyImage}></div>
              )}
              <input
                value={image}
                onChange={(text) => setImage(text.target.value)}
                type="text"
                placeholder="link da imagem"
              />
            </div>
            <div className={styles.productInput}>
              <div className={styles.productName}>
                <label htmlFor="name">Nome do produto</label>
                <input
                  value={productName}
                  onChange={(text) => setProductName(text.target.value)}
                  required
                  id="name"
                  type="text"
                />
              </div>
              <div className={styles.productDescription}>
                <label htmlFor="description">Descrição do produto</label>
                <textarea
                  value={productDescription}
                  onChange={(text) => setProductDescription(text.target.value)}
                  required
                  id="description"
                  placeholder="Descricao do produto"
                />
              </div>
              <div className={styles.productUrlAndCost}>
                <label htmlFor="price">Preço</label>
                <IntlCurrencyInput
                  required
                  id="price"
                  placeholder="Preço"
                  value={productPriceRaw}
                  currency="BRL"
                  config={currencyConfig}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div>
            <div className={styles.containerButton}>
              <button>Salvar</button>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}
