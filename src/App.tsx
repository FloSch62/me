import CssBaseline from '@mui/material/CssBaseline'
import Container from '@mui/material/Container'
import { ThemeProvider } from '@mui/material/styles'
import { useMemo, useState } from 'react'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Section from './components/Section'
import TopBar from './components/TopBar'
import { edaLabsProjects, sideProjects, srlLabsProjects } from './data/projects'
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
              I'm a maintainer in the srl-labs organization — home of containerlab, which spins up
              container-based networking labs from topology files defined as code. Most of my work
              there is the developer tooling around it.
            </>
          }
          projects={srlLabsProjects}
        />
        <Section
          id="eda"
          title="Nokia EDA community"
          lead={
            <>
              eda-labs is the community org around Nokia EDA — Event-Driven Automation, a
              declarative, intent-based platform for data-center fabrics. With 1,100+ commits I'm
              one of its most active contributors.
            </>
          }
          projects={edaLabsProjects}
        />
        <Section
          id="side-projects"
          title="Side projects"
          lead={
            <>The rest of what I build on my own time — from Kubernetes GUIs to DOOM on a router.</>
          }
          projects={sideProjects}
        />
      </Container>
      <Footer />
    </ThemeProvider>
  )
}
