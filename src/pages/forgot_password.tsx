import styles from '../styles/Register.module.css'
import Image from 'next/image'
import route from 'next/router'
import { FiArrowLeft } from 'react-icons/fi'
import api from '../services/api'
import { useState } from 'react'

export default function ForgotPassword() {
  const [email, setEmail] = useState("")
  function navigateGoBack() {
    route.back()
  }

  async function submitForm(event) {
    event.preventDefault()
    await api.post("users/forgot", { email })
    alert("Um email de verificação foi enviado para sua caixa de mensagens.")
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
          <h1>Esqueci minha senha</h1>
          <form action="" onSubmit={submitForm}>
            <div className={styles.groupByLabelInput}>
              <label htmlFor="email">Email</label>
              <input id="email" value={email} type="email" onChange={(text) => setEmail(text.target.value)} required className={styles.inputStyles} />
            </div>
            <button type="submit">Enviar</button>
          </form>
        </div>
      </section>
      <section className={styles.sectionLogo}>
        <Image src="/logoWeb.png" width={250} height={250} />
      </section>
    </div>
  )
}
