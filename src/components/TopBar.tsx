import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import GitHubIcon from '@mui/icons-material/GitHub'
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import { links } from '../data/projects'

interface TopBarProps {
  mode: 'light' | 'dark'
  onToggleMode: () => void
}

export default function TopBar({ mode, onToggleMode }: TopBarProps) {
  return (
    <Container maxWidth="lg" component="header" sx={{ py: 2, display: 'flex', alignItems: 'center' }}>
      <Typography sx={{ fontFamily: '"JetBrains Mono Variable", monospace', fontWeight: 600 }}>
        flosch.me
      </Typography>
      <Box sx={{ flexGrow: 1 }} />
      <Tooltip title="GitHub">
        <IconButton href={links.github} target="_blank" rel="noopener" aria-label="GitHub">
          <GitHubIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="LinkedIn">
        <IconButton href={links.linkedin} target="_blank" rel="noopener" aria-label="LinkedIn">
          <LinkedInIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}>
        <IconButton onClick={onToggleMode} aria-label="Toggle color theme">
          {mode === 'dark' ? <LightModeOutlinedIcon /> : <DarkModeOutlinedIcon />}
        </IconButton>
      </Tooltip>
    </Container>
  )
}
