import Head from 'next/head'
import Layout from '../components/layout'
import utilStyles from '../styles/utils.module.css'

export default function FourOhFour() {
  return (
    <Layout>
      <Head>
        <title>404</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <h1 className={utilStyles.headingXl}>404</h1>
        <p>uh oh.. something's not right here</p>
      </section>
    </Layout>
  )
}
