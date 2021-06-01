import Head from 'next/head'
import '../styles/globals.css'
import 'leaflet/dist/leaflet.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>My new cool app</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
