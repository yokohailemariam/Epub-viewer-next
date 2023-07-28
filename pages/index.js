import Head from 'next/head'
import { Fragment, useState } from 'react'
import Reader from '../components/reader/ereader'
import { useRouter } from 'next/router'

export default function Home() {
  const [isFullScreen, setIsFullScreen] = useState(false)

  const router = useRouter()
  const url = router.asPath.split('?')[1]
  const token = router.query.token

  let epubUrl = ''

  if (url && token) {
    const url2 = url.replace(/^url=/, '')

    epubUrl = url2 + '?alt=media&' + 'token=' + token
  } else {
    epubUrl = router.query.url
  }

  const toggleFullScreen = () => {
    setIsFullScreen((fullscreen) => !fullscreen)
  }

  return (
    <Fragment>
      <Head>
        <title>Ebook powered by epub.js</title>
        <meta name='description' content='Read epub files with ebook' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className='w-full min-h-screen relative'>
        {epubUrl && (
          <Reader
            urlQueryParam={epubUrl}
            fullScreen={isFullScreen}
            cancelFullScreen={toggleFullScreen}
          />
        )}
      </main>
    </Fragment>
  )
}
