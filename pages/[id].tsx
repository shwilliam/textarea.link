import {GetStaticPaths} from 'next'
import Head from 'next/head'
import {gql, useQuery} from '@apollo/client'
import {initApollo} from '../apollo/client'
import Layout from '../components/layout'
import utilStyles from '../styles/utils.module.css'

const GetPost = gql`
  query post($id: ID) {
    post(id: $id) {
      title
      body
    }
  }
`

export default function Post({id}) {
  const {data, loading, error} = useQuery(GetPost, {variables: {id}})

  if (loading || error) return null
  return (
    <Layout>
      <Head>
        <title>{data.post.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{data.post.title}</h1>
        <p>{data.post.body}</p>
      </article>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths<{slug: string}> = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export async function getStaticProps({params}) {
  const apolloClient = initApollo()

  await apolloClient.query({
    query: GetPost,
    variables: {
      id: params.id,
    },
  })

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
      id: params.id,
    },
  }
}
