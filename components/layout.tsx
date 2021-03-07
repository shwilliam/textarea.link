import Head from 'next/head'
import Link from 'next/link'
import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'

export const siteTitle = 'textarea.link'

export default function Layout({children, home = false}) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="TODO:" />
        <meta name="og:title" content={siteTitle} />
      </Head>
      <header className={styles.header}>
        {home && <h1 className={utilStyles.heading2Xl}>{siteTitle}</h1>}
      </header>
      <main>{children}</main>
      {!home && (
        <div className={styles.back}>
          <Link href="/">
            <a>←</a>
          </Link>
        </div>
      )}
    </div>
  )
}
