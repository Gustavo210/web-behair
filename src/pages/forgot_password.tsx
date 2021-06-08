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
              <div className={styles.groupByLabelInput}>
                <label htmlFor="email">Email</label>
                <input id="email" type="email" required className={styles.inputStyles} />
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
