import {useEffect, useState} from 'react'
import {GetStaticPaths} from 'next'
import Head from 'next/head'
import Router from 'next/router'
import {gql, useMutation, useQuery} from '@apollo/client'
import Layout from '../../components/layout'
import utilStyles from '../../styles/utils.module.css'
import {initApollo} from '../../apollo/client'

const GetPost = gql`
  query post($id: ID) {
    post(id: $id) {
      title
      body
    }
  }
`

const EditPost = gql`
  mutation editPost(
    $id: ID!
    $title: String
    $body: String
    $password: String!
  ) {
    editPost(id: $id, title: $title, body: $body, password: $password)
  }
`

export default function Edit({id}) {
  const {data: postData} = useQuery(GetPost, {variables: {id}}),
    [editPost, {data}] = useMutation(EditPost),
    [body, setBody] = useState(postData.post.body ?? ''),
    handleBodyChange = e => setBody(e.target.value),
    [title, setTitle] = useState(postData.post.title ?? 'untitled'),
    handleTitleChange = e => setTitle(e.target.value),
    [password, setPassword] = useState(''),
    handlePasswordChange = e => setPassword(e.target.value),
    handleSubmit = e => {
      e.preventDefault()
      editPost({
        variables: {
          id,
          title,
          body,
          password,
        },
      })
      // TODO: show incorrect password message
    }

  useEffect(() => {
    if (postData) {
      setTitle(postData.post.title)
      setBody(postData.post.body)
    }
  }, [postData])

  useEffect(() => {
    if (data?.editPost) Router.push(`/${data.editPost}`)
  }, [data])

  return (
    <Layout>
      <Head>
        <title>{title ?? 'untitled'}</title>
      </Head>
      <form onSubmit={handleSubmit}>
        <input
          className={utilStyles.titleInput}
          type="text"
          value={title}
          onChange={handleTitleChange}
        />
        <textarea
          className={utilStyles.textArea}
          value={body}
          onChange={handleBodyChange}
        />
        <div>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="edit password"
            required
          />
          <button type="submit">update</button>
        </div>
      </form>
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
