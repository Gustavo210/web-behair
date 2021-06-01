import styles from './styles.module.css'
import Link from 'next/link'

const HeaderApp: React.FC<{ title: string }> = (props) => {
  return (
    <>
      <header className={styles.container}>
        <div className={styles.title}>
          <strong>{props.title}</strong>
        </div>
        <div className={styles.links}>
          <Link href="/dashboard">
            <a>Home</a>
          </Link>
          <Link href="/dashboard/reservations">
            <a>Reservas</a>
          </Link>
          <Link href="/dashboard/create_product">
            <a>Cadastrar produtos</a>
          </Link>
          <Link href="/">
            <a>Sair</a>
          </Link>
        </div>
      </header>
      <div className={styles.spacer}></div>
    </>
  )
}

export default HeaderApp
