import styles from '../../../styles/Dashboard.module.css'
import { useRouter } from 'next/router'
import HeaderApp from '../../../components/HeaderApp'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { PropsProduct, PropsUser } from '../../../contract'
import api from '../../../services/api'
import { GetStaticPaths, GetStaticProps } from 'next'
import IntlCurrencyInput from 'react-intl-currency-input'

const CreateProduct: React.FC<PropsProduct> = (props) => {
  const route = useRouter()
  const [user, setUser] = useState<PropsUser | null>(null)
  const [image, setImage] = useState(props.photo)
  const [productName, setProductName] = useState(props.name)
  const [productDescription, setProductDescription] = useState(
    props.description,
  )
  const [productPriceRaw, setProductPriceRaw] = useState(
    Number(props.cost.toFixed(2)),
  )
  useEffect(() => {
    const user = Cookies.get('@user')
    if (!user) {
      route.push('/')
    } else {
      setUser(JSON.parse(user))
    }
  }, [])
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

  const handleChange = (event, value, maskedValue) => {
    event.preventDefault()
    setProductPriceRaw(value)
  }

  async function setData(event) {
    event.preventDefault()
    const createProduct = {
      name: productName,
      photo: image,
      description: productDescription,
      cost: productPriceRaw,
    }
    if (!productName || !image || !productDescription || !productPriceRaw) {
      alert('erro ao cadastrar produto, preencha todos os campos corretamente')
    }
    const response = await api.put(`products/${props.id}`, createProduct)
    if (response.status === 200) {
      route.replace('/dashboard')
      return
    }
    alert('Erro ao salvar produto')
  }
  return (
    <>
      <HeaderApp title={`${user?.name} ${user?.surname}`} />
      <div className={styles.container}>
        <h1>Editar produto</h1>
        <form className={styles.containerProduct} onSubmit={setData}>
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
                  id="name"
                  required
                  type="text"
                />
              </div>
              <div className={styles.productDescription}>
                <label htmlFor="description">Descrição do produto</label>
                <textarea
                  value={productDescription}
                  onChange={(text) => setProductDescription(text.target.value)}
                  id="description"
                  required
                  placeholder="Descricao do produto"
                />
              </div>
              <div className={styles.productUrlAndCost}>
                <label htmlFor="price">Preço</label>
                <IntlCurrencyInput
                  required
                  id="price"
                  placeholder="Preço"
                  currency="BRL"
                  config={currencyConfig}
                  onChange={handleChange}
                  value={productPriceRaw}
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
export default CreateProduct

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}
export const getStaticProps: GetStaticProps = async (ctx) => {
  const id = ctx.params.id
  const { data } = await api.get(`products/${id}`)
  if (data) {
    return {
      props: data,
      revalidate: 1000,
    }
  }
  return {
    props: {},
    redirect: '/dashboard',
  }
}
