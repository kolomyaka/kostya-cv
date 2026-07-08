import { useEffect, useState } from 'react'
import { navItems } from './data'

// Скролл-спай: какой кейс сейчас на экране (общий для таббара и панели)
export function useActiveSection() {
  const [active, setActive] = useState(navItems[0].id)

  useEffect(() => {
    const onScroll = () => {
      const probe = window.innerHeight * 0.35
      let current = navItems[0].id
      for (const { id } of navItems) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= probe) current = id
      }
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) {
        current = navItems[navItems.length - 1].id
      }
      setActive(current)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return active
}
