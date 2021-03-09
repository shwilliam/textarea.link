import Head from 'next/head'
import Link from 'next/link'
import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'

export const siteTitle = 'textarea.link'

export default function Layout({
  children,
  title = siteTitle,
  header = null,
  subHeader = null,
  noBack = false,
}) {
  return (
    <div className={styles.container}>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="another way to share your content" />
        <meta name="og:title" content={siteTitle} />
      </Head>
      <header className={header ? undefined : utilStyles.srOnly}>
        <h2 className={utilStyles.headingS}>{subHeader}</h2>
        <h1 className={utilStyles.headingL}>{header ?? title}</h1>
      </header>
      <main>{children}</main>
      {!noBack && (
        <div className={styles.back}>
          <Link href="/">
            <a>←</a>
          </Link>
        </div>
      )}
    </div>
  )
}
