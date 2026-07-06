import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { LazyMotion } from 'framer-motion'
import './index.css'
import App from './App.tsx'

// Ядро анимаций подгружается отдельным чанком, не блокируя первый рендер
const loadMotionFeatures = () => import('./motion-features.ts').then((mod) => mod.default)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LazyMotion features={loadMotionFeatures} strict>
      <App />
    </LazyMotion>
  </StrictMode>,
)
