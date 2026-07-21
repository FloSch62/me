import CssBaseline from '@mui/material/CssBaseline'
import Container from '@mui/material/Container'
import { ThemeProvider } from '@mui/material/styles'
import { useMemo, useState } from 'react'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Section from './components/Section'
import TopBar from './components/TopBar'
import { edaLabsProjects, ownProjects, srlLabsProjects } from './data/projects'
import { buildTheme } from './theme'

type Mode = 'light' | 'dark'

function initialMode(): Mode {
  const stored = localStorage.getItem('theme')
  if (stored === 'light' || stored === 'dark') return stored
  return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export default function App() {
  const [mode, setMode] = useState<Mode>(initialMode)
  const theme = useMemo(() => buildTheme(mode), [mode])

  const toggleMode = () => {
    const next = mode === 'dark' ? 'light' : 'dark'
    setMode(next)
    localStorage.setItem('theme', next)
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <TopBar mode={mode} onToggleMode={toggleMode} />
      <Container maxWidth="lg" component="main" sx={{ pb: 4 }}>
        <Hero />
        <Section
          id="containerlab"
          title="The containerlab ecosystem"
          lead={
            <>
              I'm a maintainer in the srl-labs organization, home of containerlab, which spins up
              container-based networking labs from topology files defined as code. Most of my work
              there is the developer tooling around it.
            </>
          }
          projects={srlLabsProjects}
        />
        <Section
          id="eda"
          title="Nokia EDA"
          lead={
            <>
              Nokia EDA, our Event-Driven Automation platform for data-center fabrics, grows its
              ecosystem in the open at eda-labs. With 1,100+ commits I'm one of the most active
              contributors there.
            </>
          }
          projects={edaLabsProjects}
        />
        <Section
          id="projects"
          title="Apps and tools"
          lead={
            <>
              Projects from my own GitHub, from a full multi-cluster Kubernetes GUI to DOOM on a
              router.
            </>
          }
          projects={ownProjects}
        />
      </Container>
      <Footer />
    </ThemeProvider>
  )
}
