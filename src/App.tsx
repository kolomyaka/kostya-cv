import Sidebar from './components/Sidebar.tsx'
import CaseSection from './components/CaseSection.tsx'
import AboutSection from './components/AboutSection.tsx'
import FloatingNav from './components/FloatingNav.tsx'
import ScrollTop from './components/ScrollTop.tsx'
import { cases } from './data.ts'
import { useActiveSection } from './useActiveSection.ts'

export default function App() {
  const active = useActiveSection()
  return (
    <div>
      <Sidebar active={active} />
      <main className="lg:ml-[340px] xl:ml-[400px]">
        <div className="mx-auto max-w-4xl space-y-16 px-6 pt-10 pb-32 sm:px-10">
          {cases.map((study) => (
            <CaseSection key={study.id} study={study} />
          ))}
          <AboutSection />
        </div>
      </main>
      <FloatingNav active={active} />
      <ScrollTop />
    </div>
  )
}
