import GitHubIcon from '@mui/icons-material/GitHub'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { links } from '../data/projects'

const terminalLines: Array<{ cmd: string; out: string[] }> = [
  { cmd: 'whoami', out: ['flosch, network automation @ nokia'] },
  { cmd: 'ls ~/github', out: ['srl-labs/   eda-labs/   FloSch62/'] },
  { cmd: 'git shortlog -sn --all', out: ['3,000+ commits, all in the open'] },
]

export default function Hero() {
  return (
    <Stack component="section" spacing={2} sx={{ alignItems: 'center', textAlign: 'center', mt: 6 }}>
      <Avatar
        src="./avatar.jpg"
        alt="Portrait of Florian Schwarz"
        sx={{ width: 160, height: 160, boxShadow: 4 }}
      />
      <Typography variant="h1">Hi, I'm FloSch</Typography>
      <Typography variant="subtitle1" color="text.secondary">
        aka Florian Schwarz · Network automation engineer at <strong>Nokia</strong> · Stuttgart,
        Germany
      </Typography>
      <Typography sx={{ maxWidth: '58ch' }}>
        I automate data-center networks at Nokia and build the tooling for it in the open:
        containerlab in srl-labs, the Nokia EDA ecosystem in eda-labs, and my own apps like Kubus.
        Open source isn't something I do next to the job, it's how the work gets done.
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
      <Paper
        variant="outlined"
        sx={{
          mt: 3,
          px: 2.5,
          py: 2,
          textAlign: 'left',
          width: '100%',
          maxWidth: 460,
          fontFamily: '"JetBrains Mono Variable", monospace',
          fontSize: 13,
          lineHeight: 1.9,
        }}
      >
        <Stack direction="row" spacing={0.75} sx={{ mb: 1.5 }}>
          {['#f87171', '#e7b341', '#4ade80'].map((dot) => (
            <Box key={dot} sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: dot }} />
          ))}
        </Stack>
        {terminalLines.map(({ cmd, out }) => (
          <Box key={cmd}>
            <Typography component="div" sx={{ font: 'inherit' }}>
              <Box component="span" sx={{ color: 'secondary.main' }}>
                ${' '}
              </Box>
              {cmd}
            </Typography>
            {out.map((line) => (
              <Typography key={line} component="div" color="text.secondary" sx={{ font: 'inherit' }}>
                {line}
              </Typography>
            ))}
          </Box>
        ))}
      </Paper>
    </Stack>
  )
}
