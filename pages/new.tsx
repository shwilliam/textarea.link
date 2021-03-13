import {useEffect, useState} from 'react'
import Link from 'next/link'
import {gql, useMutation} from '@apollo/client'
import Layout from '../components/layout'

const CreatePost = gql`
  mutation createPost($title: String, $body: String) {
    createPost(title: $title, body: $body) {
      id
      password
    }
  }
`

export default function New() {
  const [createPost, {data, error}] = useMutation(CreatePost),
    [errorMessage, setErrorMessage] = useState<string | null>(),
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

  useEffect(() => {
    if (!error) setErrorMessage(null)
    else setErrorMessage('error creating post')
  }, [error])

  return (
    <Layout title="new textarea">
      {data?.createPost ? (
        <>
          <p>
            <Link href={`/${data.createPost.id}`}>
              <a>textarea.link/{data.createPost.id}</a>
            </Link>
          </p>
          <p>
            Edit password: {data.createPost.password}
            <br />
            (you will need this to update your post)
          </p>
          <p>
            Append your link with{' '}
            <Link href={`/${data.createPost.id}/edit`}>
              <a>/edit</a>
            </Link>{' '}
            to update your post
          </p>
        </>
      ) : (
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
            required
          />
          <button type="submit">save</button>
          {errorMessage && <p className="red">{errorMessage}</p>}
        </form>
      )}
    </Layout>
  )
}
