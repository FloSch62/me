import Container from '@mui/material/Container'
import Divider from '@mui/material/Divider'
import Link from '@mui/material/Link'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { links } from '../data/projects'

export default function Footer() {
  return (
    <Container maxWidth="lg" component="footer" sx={{ mt: 10, pb: 4 }}>
      <Divider sx={{ mb: 3 }} />
      <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
        <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1 }}>
          © {new Date().getFullYear()} Florian Schwarz
        </Typography>
        <Link href={links.github} target="_blank" rel="noopener" variant="body2" underline="hover">
          GitHub
        </Link>
        <Link href={links.linkedin} target="_blank" rel="noopener" variant="body2" underline="hover">
          LinkedIn
        </Link>
      </Stack>
    </Container>
  )
}
