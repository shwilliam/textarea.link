import Link from 'next/link'
import Layout, {siteTitle} from '../components/layout'

export default function Home() {
  return (
    <Layout header={siteTitle} noBack>
      <p>another way to share your content</p>
      <Link href="/new">create textarea</Link>
    </Layout>
  )
}
