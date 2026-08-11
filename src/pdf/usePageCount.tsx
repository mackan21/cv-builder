import { useEffect, useRef, useState } from 'react'
import { pdf } from '@react-pdf/renderer'
import type { CVData } from '../types/cv'
import { ResumeDocument } from './ResumeDocument'

// The HTML preview can't reliably predict react-pdf's own pagination (font
// metrics differ enough between the browser and react-pdf's embedded fonts
// that a CSS-height estimate gave a wrong page count in testing). So instead
// of guessing, generate the real PDF in the background and count its actual
// pages — slower, but always correct, since it's the same renderer the
// export button uses.
export function usePageCount(data: CVData) {
  const [pageCount, setPageCount] = useState(1)
  const timeoutRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    window.clearTimeout(timeoutRef.current)
    timeoutRef.current = window.setTimeout(async () => {
      try {
        const blob = await pdf(<ResumeDocument data={data} />).toBlob()
        const buffer = await blob.arrayBuffer()
        const text = new TextDecoder('latin1').decode(buffer)
        const matches = text.match(/\/Type\s*\/Page[^s]/g)
        setPageCount(matches?.length ?? 1)
      } catch {
        // Ignore transient errors from generating mid-edit (e.g. empty data).
      }
    }, 600)

    return () => window.clearTimeout(timeoutRef.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(data)])

  return pageCount
}
