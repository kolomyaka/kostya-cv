import Sidebar from './components/Sidebar'
import CaseSection from './components/CaseSection'
import AboutSection from './components/AboutSection'
import FloatingNav from './components/FloatingNav'
import ScrollTop from './components/ScrollTop'
import { cases } from './data'
import { useActiveSection } from './useActiveSection'

export default function App() {
  const active = useActiveSection()
  return (
    <div>
      <Sidebar />
      <main className="lg:ml-[400px]">
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
