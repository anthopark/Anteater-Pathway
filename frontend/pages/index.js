import Head from 'next/head'
import App from '@components/App';


export default function Home() {
  return (
    <>
      <Head>
        <title>Anteater Pathway</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>

      <App />


    </>
  )
}
