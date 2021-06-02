import Head from 'next/head'
import styles from '../styles/app.module.css'
import '../styles/globals.css'
import 'leaflet/dist/leaflet.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Icut</title>
      </Head>
      <div className={styles.mobile}>👨‍🔧 Acesse o site pelo desktop</div>
      <div className={styles.desktop}>
        <Component {...pageProps} />
      </div>
    </>
  )
}

export default MyApp
