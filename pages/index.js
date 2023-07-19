import Head from 'next/head'
import { Fragment, useState } from 'react'
import Header from '../components/header/header'
import Reader from '../components/reader/ereader'
import { useRouter } from 'next/router'

export default function Home() {
  const [isFullScreen, setIsFullScreen] = useState(false)

  const router = useRouter()
  const url = router.query.url

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
        <Header toggleView={toggleFullScreen} />
        <Reader
          urlQueryParam={url}
          fullScreen={isFullScreen}
          cancelFullScreen={toggleFullScreen}
        />
      </main>
    </Fragment>
  )
}
