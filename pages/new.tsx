import {useState} from 'react'
import Head from 'next/head'
import Link from 'next/link'
import {gql, useMutation} from '@apollo/client'
import Layout from '../components/layout'
import utilStyles from '../styles/utils.module.css'

const CreatePost = gql`
  mutation createPost($title: String, $body: String) {
    createPost(title: $title, body: $body) {
      id
      password
    }
  }
`

export default function New() {
  const [createPost, {data}] = useMutation(CreatePost),
    [body, setBody] = useState(''),
    handleBodyChange = e => setBody(e.target.value),
    [title, setTitle] = useState('untitled'),
    handleTitleChange = e => setTitle(e.target.value),
    handleSubmit = e => {
      e.preventDefault()
      createPost({
        variables: {
          title,
          body,
        },
      })
    }

  return (
    <Layout>
      <Head>
        <title>new textarea</title>
      </Head>
      {data?.createPost ? (
        <>
          <p>
            <div>Edit password: {data.createPost.password}</div>
            <div>(you will need this to update your post)</div>
          </p>
          <Link href={`/${data.createPost.id}`}>view post</Link>
        </>
      ) : (
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
            required
          />
          <button type="submit">create</button>
        </form>
      )}
    </Layout>
  )
}
