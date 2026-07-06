import { useState } from 'react'
import { AnimatePresence, m } from 'framer-motion'
import { profile } from '../data.ts'
import { sectionThemes } from '../useActiveSection.ts'
import portrait from '../assets/portrait.webp'

export default function Sidebar({ active }: { active: string }) {
  const [photoLoaded, setPhotoLoaded] = useState(false)
  const theme = sectionThemes[active] ?? sectionThemes.about
  // Базовый слой держит предыдущий цвет, пока новый заливает панель волной
  const [baseBg, setBaseBg] = useState(theme.bg)

  return (
    <aside className="relative flex flex-col overflow-hidden lg:fixed lg:inset-y-0 lg:left-0 lg:w-[340px] xl:w-[400px]">
      {/* Заливка настроения кейса: новый цвет расходится «чернильной каплей» из нижнего угла */}
      <div className="absolute inset-0" style={{ background: baseBg }} aria-hidden />
      <div className="absolute inset-0 overflow-hidden" aria-hidden>
        <AnimatePresence>
          <m.div
            key={active}
            className="absolute size-[3000px] rounded-full"
            style={{ background: theme.bg, left: '18%', bottom: '4%' }}
            initial={{ scale: 0, x: '-50%', y: '50%' }}
            animate={{ scale: 1, x: '-50%', y: '50%' }}
            exit={{ opacity: 1 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            onAnimationComplete={() => setBaseBg(theme.bg)}
          />
        </AnimatePresence>
      </div>

      <m.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative z-10 flex flex-col gap-5 px-7 pt-8 pb-6"
      >
        <div className="flex flex-wrap gap-2">
          {profile.badges.map((b) => (
            <span
              key={b}
              className={`glass-chip rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors duration-700 ${
                theme.dark ? 'text-ink' : 'text-ink-soft'
              }`}
            >
              {b}
            </span>
          ))}
        </div>

        <h1
          className={`text-[28px] leading-tight font-semibold tracking-tight transition-colors duration-700 xl:text-[32px] ${
            theme.dark ? 'text-white' : 'text-ink'
          }`}
        >
          {profile.role}
          <br />
          {profile.grade}
        </h1>

        <p
          className={`text-sm leading-relaxed transition-colors duration-700 ${
            theme.dark ? 'text-white/70' : 'text-ink-soft'
          }`}
        >
          {profile.intro}
        </p>

        <div className="flex gap-2.5">
          <a
            href={profile.contact}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-dark inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-white transition-transform hover:scale-[1.03] active:scale-95"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M2.01 21 23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
            Связаться
          </a>
          <a
            href={profile.cv}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-chip inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-transform hover:scale-[1.03] active:scale-95"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <path d="M14 2v6h6" />
            </svg>
            CV
          </a>
        </div>
      </m.div>

      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative z-10 mt-auto min-h-0 flex-1"
      >
        {!photoLoaded && (
          <div className="skeleton absolute inset-0 max-h-[420px] lg:max-h-none" aria-hidden />
        )}
        <img
          src={portrait}
          alt="Константин, продуктовый дизайнер"
          width={915}
          height={1114}
          fetchPriority="high"
          decoding="async"
          onLoad={() => setPhotoLoaded(true)}
          className={`h-full max-h-[420px] w-full object-cover object-top transition-opacity duration-500 lg:max-h-none ${
            photoLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
        {/* Цвет панели мягко перетекает в фон фотографии (кроссфейд при смене кейса) */}
        <AnimatePresence>
          <m.div
            key={active}
            className="pointer-events-none absolute inset-0"
            style={{ background: `linear-gradient(to bottom, ${theme.bg} 0%, transparent 45%)` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, ease: 'easeOut' }}
            aria-hidden
          />
        </AnimatePresence>
      </m.div>
    </aside>
  )
}
