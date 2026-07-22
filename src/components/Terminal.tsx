import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useEffect, useRef, useState } from 'react'
import type { Project } from '../data/projects'
import { edaLabsProjects, links, ownProjects, srlLabsProjects } from '../data/projects'

interface TerminalProps {
  mode: 'light' | 'dark'
  onToggleMode: () => void
}

interface Line {
  id: number
  kind: 'cmd' | 'out' | 'hint'
  text: string
}

const bootScript: Array<{ cmd: string; out: string[] }> = [
  { cmd: 'whoami', out: ['flosch, network automation @ nokia'] },
  { cmd: 'ls ~/github', out: ['srl-labs/   eda-labs/   FloSch62/'] },
  { cmd: 'git shortlog -sn --all', out: ['3,000+ commits, all in the open'] },
]

const bootHint = "# this shell is real. type 'help' to look around."

const helpLines = [
  'help          this list',
  'ls [org]      browse the repos',
  'cat <repo>    one repo, close up',
  'whoami        the short version',
  'theme         flip light/dark',
  'ping          check the link',
  'doom          you know why',
  'snake         arrow keys, q quits',
  'clear         tidy up',
]

const orgs: Record<string, Project[]> = {
  'srl-labs': srlLabsProjects,
  'eda-labs': edaLabsProjects,
  flosch62: ownProjects,
}

const allProjects = [...srlLabsProjects, ...edaLabsProjects, ...ownProjects]

function columns(names: string[], width = 24): string[] {
  const rows: string[] = []
  for (let i = 0; i < names.length; i += 2) {
    rows.push((names[i].padEnd(width) + (names[i + 1] ?? '')).trimEnd())
  }
  return rows
}

// Snake board size, in characters.
const SNAKE_W = 26
const SNAKE_H = 12

type Cell = [number, number]

interface SnakeGame {
  body: Cell[]
  pending: Cell
  dir: Cell
  food: Cell
  score: number
}

function placeFood(body: Cell[]): Cell {
  while (true) {
    const food: Cell = [
      Math.floor(Math.random() * SNAKE_W),
      Math.floor(Math.random() * SNAKE_H),
    ]
    if (!body.some(([x, y]) => x === food[0] && y === food[1])) return food
  }
}

export default function Terminal({ mode, onToggleMode }: TerminalProps) {
  const [lines, setLines] = useState<Line[]>([])
  const [typing, setTyping] = useState<string | null>(null)
  const [ready, setReady] = useState(false)
  const [input, setInput] = useState('')
  const [snakeOn, setSnakeOn] = useState(false)
  const [, setFrame] = useState(0)

  const nextId = useRef(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const histRef = useRef<string[]>([])
  const histPos = useRef<number | null>(null)
  const snakeRef = useRef<SnakeGame | null>(null)
  const aliveRef = useRef(true)

  const push = (kind: Line['kind'], text: string) => {
    setLines((prev) => [...prev.slice(-199), { id: nextId.current++, kind, text }])
  }
  const pushAll = (kind: Line['kind'], texts: string[]) => {
    setLines((prev) => [
      ...prev.slice(-(200 - texts.length)),
      ...texts.map((text) => ({ id: nextId.current++, kind, text })),
    ])
  }

  useEffect(() => {
    aliveRef.current = true
    return () => {
      aliveRef.current = false
    }
  }, [])

  // Boot sequence: type the classic three commands, then hand over the prompt.
  useEffect(() => {
    let cancelled = false
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))
    setLines([])
    setReady(false)
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
    const run = async () => {
      if (reduced) {
        for (const step of bootScript) {
          push('cmd', step.cmd)
          pushAll('out', step.out)
        }
        push('hint', bootHint)
        setReady(true)
        return
      }
      await sleep(500)
      for (const step of bootScript) {
        for (let i = 1; i <= step.cmd.length; i++) {
          if (cancelled) return
          setTyping(step.cmd.slice(0, i))
          await sleep(26 + Math.random() * 38)
        }
        await sleep(160)
        if (cancelled) return
        setTyping(null)
        push('cmd', step.cmd)
        pushAll('out', step.out)
        await sleep(280)
      }
      if (cancelled) return
      push('hint', bootHint)
      setReady(true)
    }
    void run()
    return () => {
      cancelled = true
    }
  }, [])

  // Keep the latest line in view.
  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  })

  const endSnake = (score: number | null) => {
    snakeRef.current = null
    setSnakeOn(false)
    if (score !== null) {
      push('out', `game over. score ${score}.`)
      push('hint', score >= 5 ? '# respectable.' : '# the fabric wins this round.')
    } else {
      push('hint', '# fine, back to work.')
    }
    inputRef.current?.focus({ preventScroll: true })
  }

  // Snake loop and controls, only while the game is on.
  useEffect(() => {
    if (!snakeOn) return
    const dirs: Record<string, Cell> = {
      ArrowUp: [0, -1],
      ArrowDown: [0, 1],
      ArrowLeft: [-1, 0],
      ArrowRight: [1, 0],
      w: [0, -1],
      s: [0, 1],
      a: [-1, 0],
      d: [1, 0],
    }
    const onKey = (e: KeyboardEvent) => {
      const game = snakeRef.current
      if (!game) return
      const next = dirs[e.key]
      if (next) {
        e.preventDefault()
        if (next[0] !== -game.dir[0] || next[1] !== -game.dir[1]) game.pending = next
      } else if (e.key === 'q' || e.key === 'Escape') {
        e.preventDefault()
        endSnake(null)
      }
    }
    const tick = () => {
      const game = snakeRef.current
      if (!game) return
      game.dir = game.pending
      const head: Cell = [game.body[0][0] + game.dir[0], game.body[0][1] + game.dir[1]]
      const hitWall = head[0] < 0 || head[0] >= SNAKE_W || head[1] < 0 || head[1] >= SNAKE_H
      const hitSelf = game.body.some(([x, y]) => x === head[0] && y === head[1])
      if (hitWall || hitSelf) {
        endSnake(game.score)
        return
      }
      game.body.unshift(head)
      if (head[0] === game.food[0] && head[1] === game.food[1]) {
        game.score += 1
        game.food = placeFood(game.body)
      } else {
        game.body.pop()
      }
      setFrame((f) => f + 1)
    }
    window.addEventListener('keydown', onKey)
    const timer = setInterval(tick, 130)
    return () => {
      window.removeEventListener('keydown', onKey)
      clearInterval(timer)
    }
  }, [snakeOn])

  const startSnake = () => {
    snakeRef.current = {
      body: [
        [6, 6],
        [5, 6],
        [4, 6],
      ],
      dir: [1, 0],
      pending: [1, 0],
      food: placeFood([[6, 6]]),
      score: 0,
    }
    setSnakeOn(true)
  }

  const runPing = () => {
    push('out', 'PING flosch.me: 56 data bytes')
    for (let i = 1; i <= 3; i++) {
      setTimeout(() => {
        if (!aliveRef.current) return
        const ms = (Math.random() * 0.6 + 0.2).toFixed(3)
        push('out', `64 bytes from flosch.me: icmp_seq=${i} ttl=64 time=${ms} ms`)
        if (i === 3) push('hint', '# zero packet loss. you are already here.')
      }, 380 * i)
    }
  }

  const exec = (raw: string) => {
    const text = raw.trim()
    push('cmd', text)
    if (!text) return
    histRef.current.push(text)
    histPos.current = null

    const [first = '', ...args] = text.split(/\s+/)
    const cmd = first.toLowerCase()
    const arg = args.join(' ')

    switch (cmd) {
      case 'help':
        pushAll('out', helpLines)
        push('hint', "# help doesn't list everything.")
        break
      case 'whoami':
        push('out', 'flosch, network automation @ nokia')
        push('out', 'aka Florian Schwarz, Germany')
        break
      case 'ls': {
        const key = arg.toLowerCase().replace(/\/+$/, '')
        if (!key) {
          push('out', 'srl-labs/   eda-labs/   FloSch62/   about.md')
        } else if (key === 'about.md') {
          push('out', 'about.md')
        } else if (orgs[key]) {
          pushAll('out', columns(orgs[key].map((p) => p.name)))
        } else {
          push('out', `ls: cannot access '${arg}': no such directory`)
        }
        break
      }
      case 'cat': {
        if (!arg) {
          push('out', 'usage: cat <repo>  (or cat about.md)')
          break
        }
        const key = arg.toLowerCase().replace(/\.md$/, '')
        if (key === 'about') {
          push('out', 'I automate data-center networks at Nokia and build')
          push('out', 'the tooling for it in the open. This page is one of')
          push('out', 'the smaller projects.')
          break
        }
        const project = allProjects.find((p) => p.name.toLowerCase() === key)
        if (project) {
          push('out', project.description)
          push('out', project.href)
        } else {
          push('out', `cat: ${arg}: no such file or directory`)
        }
        break
      }
      case 'theme': {
        const want = arg.toLowerCase()
        if (want === mode) {
          push('out', `already in ${mode} mode`)
        } else {
          onToggleMode()
          push('out', `ok, ${mode === 'dark' ? 'light' : 'dark'} mode`)
        }
        break
      }
      case 'ping':
        runPing()
        break
      case 'github':
        push('out', `opening ${links.github}`)
        window.open(links.github, '_blank', 'noopener')
        break
      case 'linkedin':
        push('out', `opening ${links.linkedin}`)
        window.open(links.linkedin, '_blank', 'noopener')
        break
      case 'open':
        if (arg === 'github') {
          push('out', `opening ${links.github}`)
          window.open(links.github, '_blank', 'noopener')
        } else if (arg === 'linkedin') {
          push('out', `opening ${links.linkedin}`)
          window.open(links.linkedin, '_blank', 'noopener')
        } else {
          push('out', "open what? try 'open github' or 'open linkedin'")
        }
        break
      case 'doom': {
        push('out', 'IDDQD accepted.')
        const games = ownProjects.find((p) => p.name === 'srl-games')
        setTimeout(() => {
          if (!aliveRef.current || !games) return
          push('out', 'sending you to a router that runs it...')
          window.open(games.href, '_blank', 'noopener')
        }, 600)
        break
      }
      case 'snake':
        startSnake()
        break
      case 'sudo':
        if (arg.toLowerCase() === 'make coffee') {
          push('out', "make: *** [coffee] Error 418: I'm a teapot")
        } else {
          push('out', 'flosch is not in the sudoers file.')
          push('out', 'This incident will be reported.')
        }
        break
      case 'make':
        if (arg.toLowerCase() === 'coffee') {
          push('out', 'make: coffee needs root. try sudo.')
        } else {
          push('out', `make: *** No rule to make target '${arg || ''}'. Stop.`)
        }
        break
      case 'rm':
        push('out', 'rm: refusing. this is my website.')
        break
      case 'exit':
        push('out', 'logout')
        push('hint', '# nice try. the rest of the page is below.')
        break
      case 'clear':
        setLines([])
        break
      default:
        push('out', `zsh: command not found: ${cmd} (try 'help')`)
    }
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      exec(input)
      setInput('')
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      const hist = histRef.current
      if (hist.length === 0) return
      const pos = histPos.current === null ? hist.length - 1 : Math.max(0, histPos.current - 1)
      histPos.current = pos
      setInput(hist[pos])
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      const hist = histRef.current
      if (histPos.current === null) return
      const pos = histPos.current + 1
      if (pos >= hist.length) {
        histPos.current = null
        setInput('')
      } else {
        histPos.current = pos
        setInput(hist[pos])
      }
    }
  }

  const focusInput = () => {
    if (window.getSelection()?.toString()) return
    inputRef.current?.focus({ preventScroll: true })
  }

  const renderSnake = () => {
    const game = snakeRef.current
    if (!game) return null
    const grid: string[][] = Array.from({ length: SNAKE_H }, () => Array(SNAKE_W).fill(' '))
    grid[game.food[1]][game.food[0]] = '*'
    game.body.forEach(([x, y], i) => {
      grid[y][x] = i === 0 ? '@' : 'o'
    })
    const rows = [
      `╭${'─'.repeat(SNAKE_W)}╮`,
      ...grid.map((row) => `│${row.join('')}│`),
      `╰${'─'.repeat(SNAKE_W)}╯`,
      `score ${game.score}   q quits`,
    ]
    return (
      <Box component="pre" sx={{ m: 0, font: 'inherit', lineHeight: 1.3 }}>
        {rows.join('\n')}
      </Box>
    )
  }

  const cursor = (
    <Box
      component="span"
      sx={{
        display: 'inline-block',
        width: '0.55em',
        height: '1.05em',
        ml: '1px',
        verticalAlign: 'text-bottom',
        bgcolor: 'secondary.main',
        animation: 'term-blink 1.1s steps(2) infinite',
        '@keyframes term-blink': { '50%': { opacity: 0 } },
        '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
      }}
    />
  )

  return (
    <Paper
      variant="outlined"
      onClick={focusInput}
      aria-label="Interactive terminal"
      sx={{
        mt: 3,
        px: 2.5,
        py: 2,
        textAlign: 'left',
        width: '100%',
        maxWidth: 560,
        cursor: 'text',
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
      <Box ref={scrollRef} sx={{ height: 264, overflowY: 'auto', overscrollBehavior: 'contain' }}>
        {lines.map((line) => (
          <Typography
            key={line.id}
            component="div"
            sx={{
              font: 'inherit',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              color: line.kind === 'cmd' ? 'text.primary' : 'text.secondary',
              ...(line.kind === 'hint' && { color: 'secondary.main', opacity: 0.85 }),
            }}
          >
            {line.kind === 'cmd' && (
              <Box component="span" sx={{ color: 'secondary.main' }}>
                {'$ '}
              </Box>
            )}
            {line.text}
          </Typography>
        ))}
        {typing !== null && (
          <Typography component="div" sx={{ font: 'inherit' }}>
            <Box component="span" sx={{ color: 'secondary.main' }}>
              {'$ '}
            </Box>
            {typing}
            {cursor}
          </Typography>
        )}
        {snakeOn && renderSnake()}
        {ready && !snakeOn && (
          <Typography component="div" sx={{ font: 'inherit' }}>
            <Box component="span" sx={{ color: 'secondary.main' }}>
              {'$ '}
            </Box>
            {input}
            {cursor}
          </Typography>
        )}
      </Box>
      <Box
        component="input"
        ref={inputRef}
        value={input}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
        onKeyDown={onKeyDown}
        aria-label="Terminal input"
        autoCapitalize="none"
        autoCorrect="off"
        spellCheck={false}
        sx={{
          position: 'absolute',
          opacity: 0,
          width: '1px',
          height: '1px',
          border: 0,
          p: 0,
          pointerEvents: 'none',
        }}
      />
    </Paper>
  )
}
