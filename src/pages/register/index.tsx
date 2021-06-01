import styles from '../../styles/Register.module.css'
import Image from 'next/image'
import { FiArrowLeft } from 'react-icons/fi'
import route from 'next/router'
import { useState } from 'react'

export default function Register() {
  function navigateGoBack() {
    route.back()
  }

  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  async function submitForm(event) {
    event.preventDefault()
    localStorage.setItem(
      '@DataNewUser',
      btoa(
        JSON.stringify({
          name,
          surname,
          email,
          password,
          confirmPassword,
        }),
      ),
    )

    if (password != confirmPassword) {
      alert('O campo senha e confirmar senha devem ser iguais')
    }

    route.push('register/create_establishment')
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
          <h1>Cadastro de Usuário</h1>
          <form action="" onSubmit={submitForm}>
            <div className={styles.groupByLabelInput}>
              <label htmlFor="name">Nome</label>
              <input
                value={name}
                id="name"
                required
                className={styles.inputStyles}
                onChange={(text) => setName(text.target.value)}
                type="text"
              />
            </div>
            <div className={styles.groupByLabelInput}>
              <label htmlFor="surname">Sobrenome</label>
              <input
                value={surname}
                required
                id="surname"
                className={styles.inputStyles}
                onChange={(text) => setSurname(text.target.value)}
                type="text"
              />
            </div>
            <div className={styles.groupByLabelInput}>
              <label htmlFor="email">Email</label>
              <input
                value={email}
                required
                id="email"
                className={styles.inputStyles}
                onChange={(text) => setEmail(text.target.value)}
                type="email"
              />
            </div>
            <hr />
            <div className={styles.groupByLabelInput}>
              <label htmlFor="password">Senha</label>
              <input
                value={password}
                required
                id="password"
                minLength={4}
                className={styles.inputStyles}
                onChange={(text) => setPassword(text.target.value)}
                type="password"
              />
            </div>
            <div className={styles.groupByLabelInput}>
              <label htmlFor="confirmPassword">Confirmar senha</label>
              <input
                value={confirmPassword}
                required
                minLength={4}
                id="confirmPassword"
                className={styles.inputStyles}
                onChange={(text) => setConfirmPassword(text.target.value)}
                type="password"
              />
            </div>
            <button type="submit">Confirmar</button>
          </form>
        </div>
      </section>
      <section className={styles.sectionLogo}>
        <Image src="/images/icon-hair.png" width={250} height={250} />
      </section>
    </div>
  )
}
