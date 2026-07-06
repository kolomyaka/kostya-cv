import { useEffect, useRef, useState } from 'react'

interface Props {
  src: string
  alt: string
  width: number
  height: number
  eager?: boolean
  className?: string
}

// Картинка с фиксированной пропорцией (нет скачков вёрстки),
// скелетоном-шиммером на время загрузки и плавным появлением.
export default function SmartImage({ src, alt, width, height, eager, className = '' }: Props) {
  const [loaded, setLoaded] = useState(false)
  const ref = useRef<HTMLImageElement>(null)

  // Закэшированная картинка может быть готова до подписки на onLoad
  useEffect(() => {
    if (ref.current?.complete) setLoaded(true)
  }, [])

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      {!loaded && <div className="skeleton absolute inset-0" aria-hidden />}
      <img
        ref={ref}
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={eager ? 'eager' : 'lazy'}
        fetchPriority={eager ? 'high' : 'auto'}
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={`h-full w-full object-cover transition-opacity duration-500 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  )
}
