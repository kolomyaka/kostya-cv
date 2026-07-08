import { m } from 'framer-motion'
import { navItems } from '../data'

export default function FloatingNav({ active }: { active: string }) {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-[max(2.5rem,env(safe-area-inset-bottom))] z-50 flex justify-center px-4 lg:left-[400px]">
      <m.nav
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
        className="glass-nav pointer-events-auto flex max-w-full items-center rounded-full p-1 sm:gap-1 sm:p-1.5"
        aria-label="Навигация по кейсам"
      >
        {navItems.map((item) => {
          const isActive = active === item.id
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollTo(item.id)}
              className={`relative rounded-full px-2 py-2 text-xs font-normal whitespace-nowrap transition-colors sm:px-4 sm:text-[13px] ${
                isActive ? 'text-ink' : 'text-white/85 hover:text-white'
              }`}
            >
              {isActive && (
                <m.span
                  layoutId="nav-pill"
                  transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                  className="absolute inset-0 rounded-full bg-white"
                />
              )}
              <span className="relative">{item.label}</span>
            </button>
          )
        })}
      </m.nav>
    </div>
  )
}
