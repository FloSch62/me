import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import type { ReactNode } from 'react'
import type { Project } from '../data/projects'
import ProjectCard from './ProjectCard'

interface SectionProps {
  id: string
  title: string
  lead: ReactNode
  projects: Project[]
}

export default function Section({ id, title, lead, projects }: SectionProps) {
  if (projects.length === 0) return null
  return (
    <Box component="section" id={id} sx={{ mt: 8 }}>
      <Typography variant="h2" gutterBottom>
        {title}
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3, maxWidth: '62ch' }}>
        {lead}
      </Typography>
      <Grid container spacing={2}>
        {projects.map((project) => (
          <Grid key={project.name} size={project.featured ? { xs: 12, md: 6 } : { xs: 12, sm: 6, md: 4 }}>
            <ProjectCard project={project} />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
