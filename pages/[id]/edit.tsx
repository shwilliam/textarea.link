import {useEffect, useState} from 'react'
import {GetStaticPaths} from 'next'
import Router from 'next/router'
import {gql, useMutation, useQuery} from '@apollo/client'
import {initApollo} from '../../apollo/client'
import Layout from '../../components/layout'

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
    [editPost, {data, error}] = useMutation(EditPost),
    [errorMessage, setErrorMessage] = useState<string | null>(),
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

  useEffect(() => {
    if (!error) setErrorMessage(null)
    else if (error.message === 'invalid password')
      setErrorMessage('invalid password')
    else setErrorMessage('error updating post')
  }, [error])

  return (
    <Layout title={`${title ?? 'untitled'} (edit)`}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="title"
          value={title}
          onChange={handleTitleChange}
        />
        <textarea
          placeholder="what's on yer mind"
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
          {errorMessage && <p className="red">{errorMessage}</p>}
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
    fetchPolicy: 'network-only',
  })

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
      id: params.id,
    },
  }
}
