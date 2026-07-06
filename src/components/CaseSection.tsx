import { useState } from 'react'
import { AnimatePresence, m } from 'framer-motion'
import type { CaseBlock, CaseStudy, Figure } from '../data.ts'
import { Chip, MetricChip } from './Chip.tsx'
import SmartImage from './SmartImage.tsx'

function FadeIn({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <m.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </m.div>
  )
}

function BulletList({ label, items }: { label: string; items: string[] }) {
  return (
    <div>
      <p className="mb-2.5 text-sm text-ink-soft">{label}</p>
      <ul className="space-y-2.5">
        {items.map((item, i) => (
          <li key={i} className="flex gap-2.5 text-sm leading-relaxed text-ink-soft">
            <span className="mt-[9px] size-[3px] shrink-0 rounded-full bg-ink-soft" aria-hidden />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function ResultList({ items }: { items: string[] }) {
  return (
    <div>
      <p className="mb-2.5 text-sm text-ink-soft">Результат:</p>
      <ul className="space-y-2.5">
        {items.map((item, i) => (
          <li key={i} className="flex gap-2.5 text-sm leading-relaxed text-ink-soft">
            <svg
              className="text-accent mt-0.5 shrink-0"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden
            >
              <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20m-1.2 14.5-4.3-4.3 1.4-1.4 2.9 2.9 5.9-5.9 1.4 1.4z" />
            </svg>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function FigureGrid({ figures }: { figures: Figure[] }) {
  const wide = figures.filter((f) => f.wide)
  const normal = figures.filter((f) => !f.wide)
  const cols =
    normal.length >= 3 ? 'sm:grid-cols-3' : normal.length === 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-1'
  return (
    <div className="space-y-6">
      {wide.map((f) => (
        <FadeIn key={f.src}>
          <figure>
            <div className="border-line overflow-hidden rounded-2xl border bg-white">
              <SmartImage src={f.src} alt={f.caption} width={f.width} height={f.height} />
            </div>
            <figcaption className="mt-2.5 text-center text-xs text-ink-soft">{f.caption}</figcaption>
          </figure>
        </FadeIn>
      ))}
      {normal.length > 0 && (
        <div className={`grid grid-cols-1 gap-6 ${cols}`}>
          {normal.map((f, i) => (
            <m.figure
              key={f.src}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, delay: i * 0.08, ease: 'easeOut' }}
            >
              <SmartImage
                src={f.src}
                alt={f.caption}
                width={f.width}
                height={f.height}
                className="rounded-2xl"
              />
              <figcaption className="mt-2.5 text-center text-xs text-ink-soft">
                {f.caption}
              </figcaption>
            </m.figure>
          ))}
        </div>
      )}
    </div>
  )
}

function BlockBody({ block }: { block: CaseBlock }) {
  return (
    <div className="space-y-6">
      {block.problems && <BulletList label="Проблемы до внедрения:" items={block.problems} />}
      {block.solutions && <BulletList label="Решение:" items={block.solutions} />}
      {block.results && <ResultList items={block.results} />}
      <FigureGrid figures={block.figures} />
    </div>
  )
}

function CollapsibleBlock({ block }: { block: CaseBlock }) {
  const [open, setOpen] = useState(true)
  return (
    <div className="border-line border-t pt-7">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="group flex w-full items-center justify-between gap-4 text-left"
        aria-expanded={open}
      >
        <span className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <span className="text-lg font-semibold tracking-tight">{block.title}</span>
          {block.metrics?.map((m) => (
            <MetricChip key={m}>{m}</MetricChip>
          ))}
        </span>
        <m.svg
          animate={{ rotate: open ? 0 : 180 }}
          transition={{ duration: 0.25 }}
          className="shrink-0 text-ink-soft transition-colors group-hover:text-ink"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden
        >
          <path d="m18 15-6-6-6 6" />
        </m.svg>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <m.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="pt-6">
              <BlockBody block={block} />
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function CaseSection({ study }: { study: CaseStudy }) {
  return (
    <section id={study.id} className="scroll-mt-10">
      <FadeIn className="space-y-4">
        <div className="flex gap-2">
          {study.tags.map((t) => (
            <Chip key={t}>{t}</Chip>
          ))}
        </div>
        <h2 className="text-2xl font-semibold tracking-tight">{study.title}</h2>
        <p className="max-w-3xl text-sm leading-relaxed text-ink-soft">{study.description}</p>
        <div>
          <h3 className="mb-3 text-lg font-semibold tracking-tight">
            Продукты, над которыми работал:
          </h3>
          <div className="flex flex-wrap gap-2">
            {study.products.map((p) => (
              <Chip key={p}>{p}</Chip>
            ))}
          </div>
        </div>
      </FadeIn>

      <div className="mt-8 space-y-10">
        {study.blocks.map((block, i) =>
          block.collapsible ? (
            <CollapsibleBlock key={block.title ?? i} block={block} />
          ) : (
            <BlockBody key={block.title ?? i} block={block} />
          ),
        )}
      </div>
    </section>
  )
}
