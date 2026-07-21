import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward'
import type { Project } from '../data/projects'

const roleColor = {
  Maintainer: 'primary',
  'Lead developer': 'secondary',
  Creator: 'default',
} as const

export default function ProjectCard({ project }: { project: Project }) {
  const Icon = project.icon
  return (
    <Card>
      <CardActionArea
        href={project.href}
        target="_blank"
        rel="noopener"
        sx={{ height: '100%', alignItems: 'stretch' }}
      >
        <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <Icon color="primary" fontSize="small" />
            <Typography variant="subtitle1" sx={{ flexGrow: 1, minWidth: 0 }} noWrap>
              {project.name}
            </Typography>
            <Chip label={project.role} color={roleColor[project.role]} variant="outlined" />
          </Stack>
          <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1 }}>
            {project.description}
          </Typography>
          {project.story && (
            <Typography
              variant="caption"
              sx={{
                fontFamily: '"JetBrains Mono Variable", monospace',
                fontSize: 11.5,
                lineHeight: 1.5,
                color: 'text.secondary',
              }}
            >
              <Box component="span" sx={{ color: 'secondary.main' }}>
                {'# '}
              </Box>
              {project.story}
            </Typography>
          )}
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <Chip label={project.language} variant="outlined" />
            <Box sx={{ flexGrow: 1 }} />
            <ArrowOutwardIcon fontSize="inherit" color="disabled" />
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
