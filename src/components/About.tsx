import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { Fragment } from 'react'

const mono = '"JetBrains Mono Variable", monospace'

const career = [
  { year: '2004', entry: 'apprenticeship as an electronics technician, automotive industry' },
  { year: '2008', entry: 'maintenance technician for industrial robots and PLC lines' },
  { year: '2011', entry: 'state-certified engineer, electronics and communication' },
  { year: '2011', entry: 'software developer, intralogistics' },
  { year: '2013', entry: 'dual student at Alcatel-Lucent' },
  { year: '2016', entry: 'Alcatel-Lucent becomes Nokia, IP integration' },
  { year: '2017', entry: 'SDN integration with Nuage' },
  { year: '2021', entry: 'network automation for data-center fabrics' },
  { year: 'now', entry: 'containerlab, Nokia EDA and the tooling around them' },
]

export default function About() {
  return (
    <Box component="section" id="about" sx={{ mt: 8 }}>
      <Typography variant="h2" gutterBottom>
        The backstory
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3, maxWidth: '62ch' }}>
        The terminal up top has the short version. This is the longer one, and it starts on a
        factory floor.
      </Typography>
      <Paper variant="outlined" sx={{ borderRadius: 2.5, overflow: 'hidden' }}>
        <Box
          sx={{
            px: 2,
            py: 1,
            borderBottom: 1,
            borderColor: 'divider',
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
          }}
        >
          <Typography sx={{ fontFamily: mono, fontSize: 12.5, fontWeight: 600 }}>
            about.md
          </Typography>
          <Typography sx={{ fontFamily: mono, fontSize: 12, color: 'text.secondary' }}>
            human-readable
          </Typography>
        </Box>
        <Box
          sx={{
            p: { xs: 2.5, sm: 3 },
            display: 'grid',
            gridTemplateColumns: { xs: 'minmax(0, 1fr)', md: 'repeat(2, minmax(0, 1fr))' },
            columnGap: 5,
            rowGap: 3,
            alignItems: 'center',
          }}
        >
          <Stack spacing={2} sx={{ maxWidth: '68ch' }}>
            <Typography>
              I got into this through factory floors, not computer science. I trained as an
              electronics technician at an automotive supplier and spent my first working years
              keeping industrial robots and PLC lines running. Fixing machines slowly turned into
              programming them.
            </Typography>
            <Typography>
              In 2013 I joined Alcatel-Lucent as a dual student. The company became Nokia, the work
              moved from IP integration to SDN to data-center automation, and every step had more
              software in it than the one before. At some point the tooling around the job became
              the job, and that part happens in the open.
            </Typography>
          </Stack>
          <Box sx={{ fontFamily: mono, fontSize: 12.5, lineHeight: 1.9 }}>
            <Typography sx={{ font: 'inherit', mb: 0.5 }}>
              <Box component="span" sx={{ color: 'secondary.main' }}>
                {'$ '}
              </Box>
              git log --reverse --oneline florian
            </Typography>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'auto minmax(0, 1fr)',
                columnGap: 2,
                color: 'text.secondary',
              }}
            >
              {career.map((item) => (
                <Fragment key={item.entry}>
                  <Box component="span" sx={{ color: 'secondary.main' }}>
                    {item.year}
                  </Box>
                  <Box component="span">{item.entry}</Box>
                </Fragment>
              ))}
            </Box>
            <Typography sx={{ font: 'inherit', mt: 1, color: 'secondary.main', opacity: 0.85 }}>
              # the machines changed. the reflex did not.
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  )
}
