import styles from '../../styles/CreateEstablishment.module.css'
import { FiArrowLeft } from 'react-icons/fi'
import route from 'next/router'
import dynamic from 'next/dynamic'
import { LeafletMouseEvent } from 'leaflet'
import { useEffect, useState } from 'react'
import { PropsUser } from '../../contract'
import api from '../../services/api'
const Map = dynamic(() => import('../../components/Map'), { ssr: false })

interface PropsReturnUser extends PropsUser {
  password: string
  confirmPassword: string
}

export default function create_establishment() {
  function navigateGoBack() {
    route.back()
  }

  useEffect(() => {
    const userData = JSON.parse(
      atob(localStorage.getItem('@DataNewUser')),
    ) as PropsReturnUser

    if (!userData.email || !userData.name) {
      route.push('register')
    }

    setUser(userData)
  }, [])

  const [position, setPosition] = useState({ latitude: 0, longitude: 0 })
  const [establishmentName, setEstablishmentName] = useState('')
  const [URLPhoto, setURLPhoto] = useState('')
  const [initHours, setInitHours] = useState('')
  const [finalHours, setFinalHours] = useState('')
  const [user, setUser] = useState<PropsReturnUser>()
  function handleMapClick(event: LeafletMouseEvent) {
    const { lat, lng } = event.latlng

    setPosition({ latitude: lat, longitude: lng })
  }

  function getHours(hours: string) {
    const hourArr = hours.split(':')
    const hourU = new Date().setHours(Number(hourArr[0]))
    const dateU = new Date(hourU).setMinutes(Number(hourArr[1]))
    const finalDate = new Date(dateU)
    return finalDate
  }
  async function submitForm(event) {
    event.preventDefault()

    if (position.longitude === 0 && position.longitude === 0) {
      alert('Escolha no mapa, a localização do seu estabelecimento')
      return
    }

    const userEstablishment = {
      URLPhoto,
      establishmentName,
      finalHours: getHours(finalHours),
      initHours: getHours(initHours),
      latitude: position.latitude,
      longitude: position.longitude,
      password: user.password,
      email: user.email,
      name: user.name,
      surname: user.surname,
    }
    await api.post('/register', userEstablishment)
    route.push('/')
  }
  return (
    <div className={styles.container}>
      <section className={styles.sectionRegister}>
        <header>
          <button
            className={styles.goBack}
            onClick={navigateGoBack}
            type="button"
          >
            <FiArrowLeft />
          </button>
        </header>
        <div className={styles.containerRegister}>
          <h1>Cadastro de Estabelecimento</h1>
          <form action="" onSubmit={submitForm}>
            <div className={styles.groupByLabelInput}>
              <label htmlFor="nameEstablishment">Nome do estabelecimento</label>
              <input
                value={establishmentName}
                id="nameEstablishment"
                required
                className={styles.inputStyles}
                onChange={(text) => setEstablishmentName(text.target.value)}
                type="text"
              />
            </div>
            <div className={styles.groupByLabelInput}>
              <label htmlFor="URLPhoto">Url da foto</label>
              <input
                id="URLPhoto"
                value={URLPhoto}
                className={styles.inputStyles}
                onChange={(text) => setURLPhoto(text.target.value)}
                type="text"
              />
            </div>
            <div>
              <div className={styles.groupByLabelInput}>
                <label htmlFor="init_hours">Horário de inicio</label>
                <input
                  id="init_hours"
                  required
                  value={initHours}
                  className={styles.inputStyles}
                  onChange={(text) => setInitHours(text.target.value)}
                  type="time"
                />
              </div>
              <div className={styles.groupByLabelInput}>
                <label htmlFor="final_hours">Horário de encerramento</label>
                <input
                  id="final_hours"
                  required
                  value={finalHours}
                  className={styles.inputStyles}
                  onChange={(text) => setFinalHours(text.target.value)}
                  type="time"
                />
              </div>
            </div>
            <button type="submit">Cadastrar</button>
          </form>
        </div>
      </section>
      <section className={styles.sectionLogo}>
        <Map position={position} handleMapClick={handleMapClick} />
      </section>
    </div>
  )
}
