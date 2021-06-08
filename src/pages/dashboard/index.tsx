import styles from '../../styles/Dashboard.module.css'
import route, { useRouter } from 'next/router'
import HeaderApp from '../../components/HeaderApp'
import { useEffect, useLayoutEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { PropsUser } from '../../contract'
import ProductItem from '../../components/ProductItem'
import api from '../../services/api'
import { PropsEstablishments } from '../../contract'

export default function Dashboard() {
  const route = useRouter()
  const [user, setUser] = useState<PropsUser | null>(null)
  const [
    esteblishments,
    setEstablishments,
  ] = useState<PropsEstablishments | null>(null)
  useEffect(() => {
    const user = Cookies.get('@user')
    if (!user) {
      route.push('/')
    } else {
      setUser(JSON.parse(user))
    }
  }, [])

  useEffect(() => {
    if (user) {
      getData()
    }
  }, [user])
  async function getData() {
    const data = await api.get(`establishments/${ user.id }`)
      .catch(error => {
        alert(error.response.data.message)
        return error
      })
    setEstablishments(data.data)
  }

  async function removeItem(id: string) {
    await api.delete(`products/${ id }`).catch(error => {
      alert(error.response.data.message)
      return error
    })
    getData()
  }
  async function editItem(id: string) {
    route.push(`/dashboard/edit/${ id }`)
  }
  return (
    <>
      <HeaderApp title={`${ user?.name } ${ user?.surname }`} />
      <div className={styles.container}>
        {esteblishments && (
          <>
            <div className={styles.containerInfoDashboard}>
              <div className={styles.titulo}>
                {esteblishments.photo && <img src={esteblishments.photo} />}
                <h2>Dashboard</h2>
              </div>
              <div className={styles.description}>
                <span>
                  Estabelecimento {` `}
                  <strong>{esteblishments.name}</strong>
                </span>
                <span>
                  Horario de funcionamento de{' '}
                  {new Date(esteblishments.init_hours)
                    .toLocaleTimeString()
                    .split(':')
                    .splice(0, 2)
                    .join(':')}{' '}
                  até as{' '}
                  {new Date(esteblishments.final_hours)
                    .toLocaleTimeString()
                    .split(':')
                    .splice(0, 2)
                    .join(':')}
                </span>
              </div>
              <small>ID: {esteblishments.id}</small>
            </div>

            <h3 className={styles.titleProduct}>Produtos</h3>
            <div className={styles.containerProducts}>
              {esteblishments?.products.map((item, index) => {
                return (
                  <ProductItem
                    onClickDelete={(id) => removeItem(id)}
                    onClickEdit={(id) => editItem(id)}
                    key={index}
                    {...item}
                  />
                )
              })}
            </div>
          </>
        )}
      </div>
    </>
  )
}
