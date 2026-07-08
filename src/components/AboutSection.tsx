import { m } from 'framer-motion'
import { about } from '../data'
import SmartImage from './SmartImage'
import about1 from '../assets/about-1.webp'
import about2 from '../assets/about-2.webp'
import about3 from '../assets/about-3.webp'
import about4 from '../assets/about-4.webp'

const photos = [
  { src: about1, width: 888, height: 887 },
  { src: about2, width: 887, height: 887 },
  { src: about3, width: 888, height: 884 },
  { src: about4, width: 887, height: 884 },
]

export default function AboutSection() {
  return (
    <section id={about.id} className="scroll-mt-10">
      <m.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
        className="space-y-4"
      >
        <h2 className="text-2xl font-normal tracking-tight">{about.title}</h2>
        {about.paragraphs.map((p, i) => (
          <p key={i} className="max-w-3xl text-sm leading-relaxed text-ink-soft">
            {p}
          </p>
        ))}
      </m.div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {photos.map((p, i) => (
          <m.div
            key={p.src}
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: i * 0.07, ease: 'easeOut' }}
          >
            <SmartImage
              src={p.src}
              alt={`Фото ${i + 1}`}
              width={p.width}
              height={p.height}
              className="rounded-2xl"
            />
          </m.div>
        ))}
      </div>

      <m.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
        className="mt-10"
      >
        <h3 className="mb-4 text-lg font-normal tracking-tight">Мои рабочие инструменты</h3>
        <div className="flex flex-wrap gap-2.5">
          {about.tools.map((t) => (
            <img
              key={t.name}
              src={encodeURI(t.src)}
              alt={t.name}
              title={t.name}
              loading="lazy"
              className="size-11 rounded-xl transition-transform hover:-translate-y-0.5"
            />
          ))}
        </div>
      </m.div>
    </section>
  )
}
