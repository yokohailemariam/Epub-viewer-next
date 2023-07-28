import React, { useEffect, useRef, useState } from 'react'
import Wrapper from './wrapper'
import { ReactReader, ReactReaderStyle } from 'react-reader'

// const storage = global.localStorage || null;
// const DEMO_URL = 'https://react-reader.metabits.no/files/alice.epub'
// const DEMO_URL = "Mustafa.epub";
function Reader({ fullScreen, cancelFullScreen, urlQueryParam }) {
  const [background, setBackground] = useState('white')
  const [page, setPage] = useState('')
  const renditionRef = useRef(null)
  const [size, setSize] = useState(100)
  const [location, setlocation] = useState(null)
  // need to track the location for starting from the last page a user read.
  const tocRef = useRef(null)

  const ownStyles = {
    ...ReactReaderStyle,
    readerArea: {
      ...ReactReaderStyle.readerArea,
      backgroundColor: background
    }
  }
  // console.log(ReactReaderStyle)// this console will help to style

  const locationChanged = (epubcifi) => {
    setlocation(epubcifi)
    if (renditionRef && renditionRef.current && tocRef && tocRef.current) {
      if (
        renditionRef.current.location &&
        renditionRef.current.location.start
      ) {
        const { href, displayed } = renditionRef.current.location.start
        const chapter = tocRef.current.find((item) => item.href === href)
        setPage(
          `Page ${displayed.page + 1} of ${displayed.total} in chapter ${
            chapter ? chapter.label : 'n/a'
          }`
        )
      }
    }
  }
  const changeSize = (ev) => {
    setSize(ev.target.value)
  }

  useEffect(() => {
    if (renditionRef.current) {
      renditionRef.current.themes.fontSize(`${size}%`)
    }
  }, [size])

  return (
    <Wrapper screenMood={true}>
      <select
        className='fixed top-[10px] right-[60px] px-4 py-3 rounded-full'
        onClick={changeSize}
      >
        <option value={100}>100%</option>
        <option value={120}>120%</option>
        <option value={140}>140%</option>
        <option value={160}>160%</option>
        <option value={180}>180%</option>
        <option value={200}>200%</option>
      </select>

      <ReactReader
        location={location}
        url={urlQueryParam}
        locationChanged={locationChanged}
        tocChanged={(toc) => (tocRef.current = toc)}
        showToc={true}
        styles={ownStyles}
        epubOptions={{
          manager: 'continuous',
          flow: 'scrolled'
        }}
        getRendition={(rendition) => {
          const spine_get = rendition.book.spine.get.bind(rendition.book.spine)
          rendition.book.spine.get = function (target) {
            var t = spine_get(target)
            if (!t) {
              t = spine_get(undefined)
            }
            return t
          }
        }}
      />
      <p className='text-center mt-2'>{page}</p>
    </Wrapper>
  )
}

export default Reader
