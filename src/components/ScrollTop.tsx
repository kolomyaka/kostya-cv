import { useEffect, useState } from 'react'
import { AnimatePresence, m } from 'framer-motion'

export default function ScrollTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <m.button
          type="button"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="border-line fixed right-4 bottom-28 z-50 lg:right-6 lg:bottom-10 flex size-11 items-center justify-center rounded-full border bg-white shadow-lg transition-transform hover:-translate-y-0.5"
          aria-label="Наверх"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
        </m.button>
      )}
    </AnimatePresence>
  )
}
