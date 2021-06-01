import styles from '../styles/Home.module.css'
import Image from 'next/image'
import Link from 'next/link'
import route from 'next/router'
import api from '../services/api'
import { useState } from 'react'
import Cookie from 'js-cookie'

export default function Home() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  async function submitForm(event) {
    event.preventDefault()

    await api
      .post('users/login', {
        email,
        password,
      })
      .then((response) => {
        if (response.status === 200) {
          route.push('dashboard')
          Cookie.set('@user', response.data)
        }
      })
      .catch(console.log)
  }
  return (
    <div className={styles.container}>
      <section className={styles.sectionLogin}>
        <h1>Login</h1>

        <form onSubmit={submitForm}>
          <input
            placeholder="Email"
            value={email}
            onChange={(text) => setEmail(text.target.value)}
            type="email"
            required
          />
          <input
            placeholder="Senha"
            value={password}
            onChange={(text) => setPassword(text.target.value)}
            type="password"
            required
          />
          <Link href="/forgot_password">
            <a className={styles.forgotPassword}>Esqueci minha senha</a>
          </Link>
          <button type="submit">Entrar</button>
          <p className={styles.separator}>OU</p>
          <Link href="/register">
            <a className={styles.buttonRegister}>Cadastrar-se</a>
          </Link>
        </form>
      </section>
      <section className={styles.sectionLogo}>
        <Image src="/images/icon-hair.png" width={250} height={250} />
      </section>
    </div>
  )
}
