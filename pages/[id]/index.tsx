import {GetStaticPaths} from 'next'
import Router from 'next/router'
import {gql, useQuery} from '@apollo/client'
import {initApollo} from '../../apollo/client'
import Layout from '../../components/layout'
import Date from '../../components/date'

const GetPost = gql`
  query post($id: ID) {
    post(id: $id) {
      title
      body
    }
  }
`

export default function Post({id}) {
  const {data, loading} = useQuery(GetPost, {variables: {id}})

  if (loading) return null
  if (!data?.post) {
    Router.push('/404')
    return null
  }
  return (
    <Layout
      title={data.post.title || 'untitled'}
      header={data.post.title || 'untitled'}
      subHeader={<Date timestamp={id} />}
    >
      <article>
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
    fetchPolicy: 'network-only',
    errorPolicy: 'ignore',
  })

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
      id: params.id,
    },
  }
}
