import Head from 'next/head'
import Link from 'next/link'
import styles from './layout.module.css'

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
      <header className={header ? undefined : 'sr-only'}>
        <h1 className="no-margin">{header ?? title}</h1>
        <h2 className="small no-margin">{subHeader}</h2>
      </header>
      <main>{children}</main>
      {!noBack && (
        <div className={styles.back}>
          <Link href="/">
            <a>Back</a>
          </Link>
        </div>
      )}
    </div>
  )
}
