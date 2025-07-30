// src/hooks/useVisitorId.js
import { useState, useEffect } from 'react'
import FingerprintJS from '@fingerprintjs/fingerprintjs'

export function useVisitorId() {
  const [visitorId, setVisitorId] = useState(null)

  useEffect(() => {
    let mounted = true
    FingerprintJS.load().then(fp => {
      fp.get().then(result => {
        if (!mounted) return
        localStorage.setItem('visitorId', result.visitorId)
        setVisitorId(result.visitorId)
      })
    })
    return () => { mounted = false }
  }, [])

  return visitorId
}
