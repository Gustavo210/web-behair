import styles from '../styles/Register.module.css'
import Image from 'next/image'
import route from 'next/router'
import { FiArrowLeft } from 'react-icons/fi'

export default function ForgotPassword() {
  function navigateGoBack() {
    route.back()
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
          <form action="">
            <input placeholder="Email" type="email" />
            <button type="submit">Enviar</button>
          </form>
        </div>
      </section>
      <section className={styles.sectionLogo}>
        <Image src="/images/icon-hair.png" width={250} height={250} />
      </section>
    </div>
  )
}
