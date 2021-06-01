import styles from '../../styles/Dashboard.module.css'
import route, { useRouter } from 'next/router'
import HeaderApp from '../../components/HeaderApp'
import Cookies from 'js-cookie'
import { useEffect, useLayoutEffect, useState } from 'react'
import { PropsUser } from '../../contract'

export default function CreateProduct() {
  const route = useRouter()
  const [user, setUser] = useState<PropsUser | null>(null)
  const [image, setImage] = useState('')
  const [productName, setProductName] = useState('')
  const [productDescription, setProductDescription] = useState('')
  const [productPrice, setProductPrice] = useState('')
  useEffect(() => {
    const user = Cookies.get('@user')
    if (!user) {
      route.push('/')
    } else {
      setUser(JSON.parse(user))
    }
  }, [])

  async function getAllData(event) {
    event.preventDefault()
    console.log({
      image,
      productName,
      productDescription,
      productPrice,
    })
  }
  return (
    <>
      <HeaderApp title={`${user?.name} ${user?.surname}`} />
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
                  id="name"
                  type="text"
                />
              </div>
              <div className={styles.productDescription}>
                <label htmlFor="description">Descrição do produto</label>
                <textarea
                  value={productDescription}
                  onChange={(text) => setProductDescription(text.target.value)}
                  id="description"
                  placeholder="Descricao do produto"
                />
              </div>
              <div className={styles.productUrlAndCost}>
                <label htmlFor="price">Preço</label>
                <input
                  value={productPrice}
                  onChange={(text) => setProductPrice(text.target.value)}
                  id="price"
                  type="text"
                  placeholder="Preço"
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
