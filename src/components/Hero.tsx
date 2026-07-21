import GitHubIcon from '@mui/icons-material/GitHub'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { links } from '../data/projects'
import Terminal from './Terminal'

interface HeroProps {
  mode: 'light' | 'dark'
  onToggleMode: () => void
}

export default function Hero({ mode, onToggleMode }: HeroProps) {
  return (
    <Stack component="section" spacing={2} sx={{ alignItems: 'center', textAlign: 'center', mt: 6 }}>
      <Avatar
        src="./avatar.jpg"
        alt="Portrait of Florian Schwarz"
        sx={{ width: 160, height: 160, boxShadow: 4 }}
      />
      <Typography variant="h1">Hi, I'm FloSch</Typography>
      <Typography variant="subtitle1" color="text.secondary">
        aka Florian Schwarz · Network automation engineer at <strong>Nokia</strong> ·
        Germany
      </Typography>
      <Typography sx={{ maxWidth: '58ch' }}>
        I automate data-center networks at Nokia and build the tooling for it in the open:
        containerlab in srl-labs, the Nokia EDA ecosystem in eda-labs, and my own apps like Kubus.
        Open source is how the work gets done.
      </Typography>
      <Stack direction="row" spacing={1.5} sx={{ pt: 1 }}>
        <Button
          variant="contained"
          startIcon={<GitHubIcon />}
          href={links.github}
          target="_blank"
          rel="noopener"
        >
          GitHub
        </Button>
        <Button
          variant="outlined"
          startIcon={<LinkedInIcon />}
          href={links.linkedin}
          target="_blank"
          rel="noopener"
        >
          LinkedIn
        </Button>
      </Stack>
      <Terminal mode={mode} onToggleMode={onToggleMode} />
    </Stack>
  )
}
