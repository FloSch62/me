import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { alpha, useTheme } from '@mui/material/styles'
import { useMemo, useState } from 'react'
import type { Project } from '../data/projects'
import { edaLabsProjects, ownProjects, srlLabsProjects } from '../data/projects'

const CX = 460
const CY = 230

interface OrgDef {
  id: string
  x: number
  y: number
  sectionId: string
  projects: Project[]
  spreadDeg: number
  leafR: number
  labelPos: 'right' | 'below'
}

const ORG_DEFS: OrgDef[] = [
  {
    id: 'srl-labs',
    x: 250,
    y: 140,
    sectionId: 'containerlab',
    projects: srlLabsProjects,
    spreadDeg: 130,
    leafR: 95,
    labelPos: 'below',
  },
  {
    id: 'eda-labs',
    x: 260,
    y: 340,
    sectionId: 'eda',
    projects: edaLabsProjects,
    spreadDeg: 110,
    leafR: 95,
    labelPos: 'right',
  },
  {
    id: 'FloSch62',
    x: 690,
    y: 230,
    sectionId: 'projects',
    projects: ownProjects,
    spreadDeg: 150,
    leafR: 108,
    labelPos: 'below',
  },
]

interface Leaf {
  project: Project
  orgId: string
  x: number
  y: number
  anchor: 'start' | 'middle' | 'end'
  lx: number
  ly: number
}

// Node radii plus a small gap, so edges stop at the circle instead of running under it.
const R_CENTER = 34
const R_ORG = 20
const R_NOKIA = 15
const R_LEAF = 8

function trimEdge(x1: number, y1: number, x2: number, y2: number, r1: number, r2: number) {
  const dx = x2 - x1
  const dy = y2 - y1
  const len = Math.hypot(dx, dy)
  const ux = dx / len
  const uy = dy / len
  return {
    x1: x1 + ux * r1,
    y1: y1 + uy * r1,
    x2: x2 - ux * r2,
    y2: y2 - uy * r2,
  }
}

function buildLeaves(): Leaf[] {
  const leaves: Leaf[] = []
  for (const org of ORG_DEFS) {
    const base = Math.atan2(org.y - CY, org.x - CX)
    const spread = (org.spreadDeg * Math.PI) / 180
    const n = org.projects.length
    org.projects.forEach((project, i) => {
      const angle = base - spread / 2 + (n === 1 ? spread / 2 : (spread * i) / (n - 1))
      const x = org.x + org.leafR * Math.cos(angle)
      const y = org.y + org.leafR * Math.sin(angle)
      const dx = Math.cos(angle)
      let anchor: Leaf['anchor'] = 'middle'
      let lx = x
      let ly = y + 3.5
      if (dx > 0.25) {
        anchor = 'start'
        lx = x + 9
      } else if (dx < -0.25) {
        anchor = 'end'
        lx = x - 9
      } else {
        ly = Math.sin(angle) > 0 ? y + 17 : y - 11
      }
      leaves.push({ project, orgId: org.id, x, y, anchor, lx, ly })
    })
  }
  return leaves
}

export default function Topology() {
  const theme = useTheme()
  const [hovered, setHovered] = useState<string | null>(null)
  const leaves = useMemo(buildLeaves, [])

  const edgeColor = alpha(theme.palette.text.secondary, 0.35)
  const hotColor = theme.palette.primary.main
  const mono = '"JetBrains Mono Variable", monospace'

  const isHot = (a: string, b: string) => hovered === a || hovered === b

  const jumpTo = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const nodeProps = (id: string, action: () => void, label: string) => ({
    tabIndex: 0,
    role: 'link' as const,
    'aria-label': label,
    cursor: 'pointer',
    onClick: action,
    onMouseEnter: () => setHovered(id),
    onMouseLeave: () => setHovered(null),
    onFocus: () => setHovered(id),
    onBlur: () => setHovered(null),
    onKeyDown: (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        action()
      }
    },
    style: { outline: 'none' },
  })

  return (
    <Box component="section" id="topology" sx={{ mt: 8 }}>
      <Typography variant="h2" gutterBottom>
        The topology
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3, maxWidth: '62ch' }}>
        Everything I work on connects, so here it is drawn the way I would draw a lab. Hover the
        nodes, click an org to jump to its section, click a project to open it.
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
            flosch.clab.yml
          </Typography>
          <Typography sx={{ fontFamily: mono, fontSize: 12, color: 'text.secondary' }}>
            deployed
          </Typography>
        </Box>
        <Box sx={{ overflowX: 'auto' }}>
          <Box
            component="svg"
            viewBox="0 0 950 460"
            sx={{
              display: 'block',
              width: '100%',
              minWidth: 680,
              height: 'auto',
              '@media (prefers-reduced-motion: reduce)': {
                '& .topo-packet': { display: 'none' },
              },
            }}
          >
            <defs>
              <clipPath id="topo-avatar-clip">
                <circle cx={CX} cy={CY} r={26} />
              </clipPath>
            </defs>

            {/* center to nokia */}
            {(() => {
              const e = trimEdge(CX, CY, 460, 84, R_CENTER, R_NOKIA)
              return (
                <line
                  {...e}
                  stroke={isHot('flosch', 'nokia') ? hotColor : edgeColor}
                  strokeWidth={isHot('flosch', 'nokia') ? 1.8 : 1.1}
                  style={{ transition: 'stroke 120ms ease' }}
                />
              )
            })()}

            {/* center to orgs, with a packet in flight */}
            {ORG_DEFS.map((org, i) => {
              const e = trimEdge(CX, CY, org.x, org.y, R_CENTER, R_ORG)
              return (
                <g key={`edge-${org.id}`}>
                  <line
                    {...e}
                    stroke={isHot('flosch', org.id) ? hotColor : edgeColor}
                    strokeWidth={isHot('flosch', org.id) ? 1.8 : 1.1}
                    style={{ transition: 'stroke 120ms ease' }}
                  />
                  <circle className="topo-packet" r={2.5} fill={theme.palette.secondary.main}>
                    <animateMotion
                      dur="3.4s"
                      begin={`${i * 1.15}s`}
                      repeatCount="indefinite"
                      path={`M ${e.x1} ${e.y1} L ${e.x2} ${e.y2}`}
                    />
                  </circle>
                </g>
              )
            })}

            {/* org to project edges */}
            {leaves.map((leaf) => {
              const org = ORG_DEFS.find((o) => o.id === leaf.orgId)!
              const hot = isHot(leaf.project.name, leaf.orgId)
              const e = trimEdge(org.x, org.y, leaf.x, leaf.y, R_ORG, R_LEAF)
              return (
                <line
                  key={`leafedge-${leaf.project.name}`}
                  {...e}
                  stroke={hot ? hotColor : edgeColor}
                  strokeWidth={hot ? 1.6 : 1}
                  style={{ transition: 'stroke 120ms ease' }}
                />
              )
            })}

            {/* project leaves */}
            {leaves.map((leaf) => {
              const hot = hovered === leaf.project.name
              return (
                <g
                  key={`leaf-${leaf.project.name}`}
                  {...nodeProps(
                    leaf.project.name,
                    () => window.open(leaf.project.href, '_blank', 'noopener'),
                    `Open ${leaf.project.name} on GitHub`,
                  )}
                >
                  <title>{leaf.project.description}</title>
                  <circle
                    cx={leaf.x}
                    cy={leaf.y}
                    r={hot ? 6 : 4.5}
                    fill={hot ? hotColor : alpha(theme.palette.text.secondary, 0.9)}
                    style={{ transition: 'fill 120ms ease, r 120ms ease' }}
                  />
                  <text
                    x={leaf.lx}
                    y={leaf.ly}
                    textAnchor={leaf.anchor}
                    fontFamily={mono}
                    fontSize={10.5}
                    fill={hot ? theme.palette.text.primary : theme.palette.text.secondary}
                    style={{ transition: 'fill 120ms ease' }}
                  >
                    {leaf.project.name}
                  </text>
                </g>
              )
            })}

            {/* nokia */}
            <g
              onMouseEnter={() => setHovered('nokia')}
              onMouseLeave={() => setHovered(null)}
            >
              <title>The day job</title>
              <circle
                cx={460}
                cy={84}
                r={12}
                fill={theme.palette.background.paper}
                stroke={theme.palette.secondary.main}
                strokeWidth={1.5}
              />
              <text
                x={460}
                y={62}
                textAnchor="middle"
                fontFamily={mono}
                fontSize={11.5}
                fontWeight={600}
                fill={theme.palette.text.primary}
              >
                nokia
              </text>
            </g>

            {/* orgs */}
            {ORG_DEFS.map((org) => {
              const hot = hovered === org.id
              return (
                <g
                  key={`org-${org.id}`}
                  {...nodeProps(org.id, () => jumpTo(org.sectionId), `Jump to the ${org.id} section`)}
                >
                  <title>{`${org.projects.length} repos, click to jump down`}</title>
                  <circle
                    cx={org.x}
                    cy={org.y}
                    r={17}
                    fill={hot ? alpha(hotColor, 0.15) : theme.palette.background.paper}
                    stroke={hotColor}
                    strokeWidth={hot ? 2.5 : 1.5}
                    style={{ transition: 'fill 120ms ease, stroke-width 120ms ease' }}
                  />
                  <text
                    x={org.labelPos === 'right' ? org.x + 24 : org.x}
                    y={org.labelPos === 'right' ? org.y + 4 : org.y + 34}
                    textAnchor={org.labelPos === 'right' ? 'start' : 'middle'}
                    fontFamily={mono}
                    fontSize={11.5}
                    fontWeight={600}
                    fill={theme.palette.text.primary}
                  >
                    {org.id}
                  </text>
                </g>
              )
            })}

            {/* center */}
            <g
              onMouseEnter={() => setHovered('flosch')}
              onMouseLeave={() => setHovered(null)}
            >
              <circle
                cx={CX}
                cy={CY}
                r={30}
                fill={theme.palette.background.paper}
                stroke={hotColor}
                strokeWidth={2}
              />
              <image
                href="./avatar.jpg"
                x={CX - 26}
                y={CY - 26}
                width={52}
                height={52}
                clipPath="url(#topo-avatar-clip)"
                preserveAspectRatio="xMidYMid slice"
              />
              <text
                x={CX}
                y={CY + 48}
                textAnchor="middle"
                fontFamily={mono}
                fontSize={11.5}
                fontWeight={600}
                fill={theme.palette.text.primary}
              >
                flosch
              </text>
            </g>
          </Box>
        </Box>
      </Paper>
    </Box>
  )
}
