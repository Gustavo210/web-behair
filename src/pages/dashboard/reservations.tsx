import styles from '../../styles/Dashboard.module.css'
import route, { useRouter } from 'next/router'
import HeaderApp from '../../components/HeaderApp'
import { useEffect, useLayoutEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { PropsReservation, PropsUser } from '../../contract'
import api from '../../services/api'

export default function Reservations() {
  const route = useRouter()
  const [user, setUser] = useState<PropsUser | null>(null)
  const [reservations, setReservations] = useState<PropsReservation[]>([])
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

  async function handlerAcceptReservation(id: string) {
    await api.put(`/reservations/accept/${ id }`)
      .catch(error => {
        alert(error.response.data.message)
        return error
      })
    getData()
  }

  async function getData() {
    const data = await api.get(`establishments/${ user.id }`).catch(error => {
      alert(error.response.data.message)
      return error
    })
    const response = await api.get(
      `establishments/reservations/${ data.data.id }`,
    ).catch(error => {
      alert(error.response.data.message)
      return error
    })
    setReservations(response.data)
  }
  return (
    <>
      <HeaderApp title={`${ user?.name } ${ user?.surname }`} />
      <div className={styles.container}>
        <h1>Reservas</h1>
        <table>
          <thead>
            <tr>
              <td>Status</td>
              <td>Nome</td>
              <td>Observação</td>
              <td>Telefone</td>
              <td>ID</td>
              <td>Data de criação</td>
            </tr>
          </thead>
          <tbody>
            {reservations?.map((item, index) => {
              return (
                <tr key={index}>
                  <td>
                    {!item.is_active ? (
                      <button
                        className={styles.confirmationButton}
                        onClick={() => handlerAcceptReservation(item.id)}
                      >
                        Aprovar
                      </button>
                    ) : (
                      <button className={styles.successButton}>Aprovado</button>
                    )}
                  </td>
                  <td>{item.name}</td>
                  <td>{item.note}</td>
                  <td>
                    {item.phone.length === 11
                      ? item.phone.replace(
                        /^(\d\d)(\d{5})(\d{4}).*/,
                        '($1) $2-$3',
                      )
                      : item.phone.replace(
                        /^(\d\d)(\d{4})(\d{0,4}).*/,
                        '($1) $2-$3',
                      )}
                  </td>
                  <td>{item.id}</td>
                  <td>{new Date(item.created_at).toLocaleString()}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}
