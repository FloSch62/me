import type { SvgIconComponent } from '@mui/icons-material'
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined'
import ApiOutlinedIcon from '@mui/icons-material/ApiOutlined'
import CableOutlinedIcon from '@mui/icons-material/CableOutlined'
import ChecklistOutlinedIcon from '@mui/icons-material/ChecklistOutlined'
import DesktopWindowsOutlinedIcon from '@mui/icons-material/DesktopWindowsOutlined'
import DnsOutlinedIcon from '@mui/icons-material/DnsOutlined'
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined'
import ExtensionOutlinedIcon from '@mui/icons-material/ExtensionOutlined'
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined'
import HubOutlinedIcon from '@mui/icons-material/HubOutlined'
import LanOutlinedIcon from '@mui/icons-material/LanOutlined'
import ManageSearchOutlinedIcon from '@mui/icons-material/ManageSearchOutlined'
import MonitorHeartOutlinedIcon from '@mui/icons-material/MonitorHeartOutlined'
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined'
import SportsEsportsOutlinedIcon from '@mui/icons-material/SportsEsportsOutlined'
import StorageOutlinedIcon from '@mui/icons-material/StorageOutlined'
import TerminalOutlinedIcon from '@mui/icons-material/TerminalOutlined'
import WidgetsOutlinedIcon from '@mui/icons-material/WidgetsOutlined'

export interface Project {
  name: string
  description: string
  story?: string
  role: 'Maintainer' | 'Lead developer' | 'Creator'
  href: string
  language: string
  icon: SvgIconComponent
  featured?: boolean
}

export const srlLabsProjects: Project[] = [
  {
    name: 'containerlab',
    description:
      'Deploy container-based networking labs from declarative topology files. The flagship of the srl-labs ecosystem.',
    story: 'Racks and cables became a YAML file. Labs went from days to seconds.',
    role: 'Maintainer',
    href: 'https://github.com/srl-labs/containerlab',
    language: 'Go',
    icon: LanOutlinedIcon,
  },
  {
    name: 'vscode-containerlab',
    description:
      'The official Containerlab extension for VS Code: deploy, visualize and manage labs straight from the editor.',
    story: 'Redeploying a lab should not mean leaving the editor.',
    role: 'Lead developer',
    href: 'https://github.com/srl-labs/vscode-containerlab',
    language: 'TypeScript',
    icon: ExtensionOutlinedIcon,
  },
  {
    name: 'containerlab-app',
    description: 'Containerlab as a desktop app for Windows, macOS and Linux.',
    story: 'For everyone who prefers clicking to typing. No judgement.',
    role: 'Creator',
    href: 'https://github.com/srl-labs/containerlab-app',
    language: 'TypeScript',
    icon: DesktopWindowsOutlinedIcon,
  },
  {
    name: 'clab-ui',
    description:
      'Shared React UI and topology editing engine behind vscode-containerlab and containerlab-app.',
    story: 'Build the editor once, ship it in every containerlab frontend.',
    role: 'Lead developer',
    href: 'https://github.com/srl-labs/clab-ui',
    language: 'TypeScript',
    icon: WidgetsOutlinedIcon,
  },
  {
    name: 'clab-api-server',
    description: 'REST API server for driving containerlab remotely.',
    story: 'Labs you can start from anywhere, not just your own shell.',
    role: 'Lead developer',
    href: 'https://github.com/srl-labs/clab-api-server',
    language: 'Go',
    icon: ApiOutlinedIcon,
  },
  {
    name: 'clab-io-draw',
    description: 'Convert containerlab topologies into draw.io diagrams, and back.',
    story: 'Drawing topology diagrams by hand gets old fast.',
    role: 'Lead developer',
    href: 'https://github.com/srl-labs/clab-io-draw',
    language: 'Python',
    icon: AccountTreeOutlinedIcon,
  },
  {
    name: 'wsl-containerlab',
    description: 'A ready-to-use WSL distribution for network labbing on Windows.',
    story: 'Windows laptop, Linux labs. No dual boot required.',
    role: 'Maintainer',
    href: 'https://github.com/srl-labs/wsl-containerlab',
    language: 'Shell',
    icon: TerminalOutlinedIcon,
  },
]

export const edaLabsProjects: Project[] = [
  {
    name: 'vscode-eda',
    description: 'The EDA extension for VS Code: browse, edit and apply intent-based resources from the editor.',
    story: 'The fabric is code, so it should live where code lives.',
    role: 'Lead developer',
    href: 'https://github.com/eda-labs/vscode-eda',
    language: 'TypeScript',
    icon: ExtensionOutlinedIcon,
  },
  {
    name: 'clab-connector',
    description: 'Bring Containerlab topologies straight into Nokia EDA.',
    story: 'Two tools I use daily. They had to meet eventually.',
    role: 'Lead developer',
    href: 'https://github.com/eda-labs/clab-connector',
    language: 'Python',
    icon: CableOutlinedIcon,
  },
  {
    name: 'eda-telemetry-lab',
    description: 'Modern streaming telemetry for your data center, ready to run.',
    story: 'A live dashboard convinces faster than any slide deck.',
    role: 'Maintainer',
    href: 'https://github.com/eda-labs/eda-telemetry-lab',
    language: 'Shell',
    icon: MonitorHeartOutlinedIcon,
  },
  {
    name: 'wsl-eda',
    description: 'A ready-to-use WSL distribution for running Nokia EDA on Windows.',
    story: 'The wsl-containerlab trick, applied to a whole platform.',
    role: 'Maintainer',
    href: 'https://github.com/eda-labs/wsl-eda',
    language: 'Shell',
    icon: TerminalOutlinedIcon,
  },
  {
    name: 'eda-netbox-lab',
    description: 'Integration lab wiring NetBox as source of truth into Nokia EDA.',
    story: 'If NetBox is the source of truth, prove it end to end.',
    role: 'Creator',
    href: 'https://github.com/eda-labs/eda-netbox-lab',
    language: 'Python',
    icon: StorageOutlinedIcon,
  },
]

export const ownProjects: Project[] = [
  {
    name: 'Kubus',
    description:
      'A free, open-source multi-cluster Kubernetes GUI for Windows, macOS and Linux. Browse every resource across all your clusters at once, stream logs, open shells, forward ports, watch metrics and manage Helm.',
    story: 'I wanted every cluster in one window. It did not exist, so I built it.',
    role: 'Creator',
    href: 'https://github.com/FloSch62/Kubus',
    language: 'TypeScript',
    icon: HubOutlinedIcon,
    featured: true,
  },
  {
    name: 'recall',
    description:
      'Turn markdown files into study decks in the browser: spaced repetition, quizzes and a quest mode for learning.',
    story: 'My notes were piling up. Now they quiz me back.',
    role: 'Creator',
    href: 'https://github.com/FloSch62/recall',
    language: 'TypeScript',
    icon: SchoolOutlinedIcon,
    featured: true,
  },
  {
    name: 'srl-games',
    description: 'Can SR Linux run DOOM? Yes. DOOM and Snake, running on a router near you.',
    story: 'The question was never if a router can run DOOM, only when.',
    role: 'Creator',
    href: 'https://github.com/FloSch62/srl-games',
    language: 'Go',
    icon: SportsEsportsOutlinedIcon,
  },
  {
    name: 'clab-mcp-server',
    description: 'Model Context Protocol server for containerlab, written in Go.',
    story: 'Every good tool grows an API eventually. This one speaks MCP.',
    role: 'Creator',
    href: 'https://github.com/FloSch62/clab-mcp-server',
    language: 'Go',
    icon: DnsOutlinedIcon,
  },
  {
    name: 'eda-embeddingsearch',
    description: 'Turn plain-English questions into EQL queries for SR Linux and SR OS via embedding search.',
    story: 'Nobody remembers query syntax. Asking in plain English works.',
    role: 'Creator',
    href: 'https://github.com/FloSch62/eda-embeddingsearch',
    language: 'Go',
    icon: ManageSearchOutlinedIcon,
  },
  {
    name: 'go-test2html',
    description: 'Converts go test JSON output into beautiful HTML reports.',
    story: 'CI logs are written for machines. Humans deserve HTML.',
    role: 'Creator',
    href: 'https://github.com/FloSch62/go-test2html',
    language: 'JavaScript',
    icon: ChecklistOutlinedIcon,
  },
  {
    name: 'mkdocs-editor',
    description: 'Client-side WYSIWYG editor for MkDocs Material and Zensical markdown.',
    story: 'Docs get written when writing them is the easy part.',
    role: 'Creator',
    href: 'https://github.com/FloSch62/mkdocs-editor',
    language: 'TypeScript',
    icon: EditNoteOutlinedIcon,
  },
  {
    name: 'srsim-hw-schema',
    description: 'Generates and validates SR-SIM supported-hardware schemas from Nokia hardware appendices.',
    story: 'Hardware support lived in PDF appendices. Schemas beat PDFs.',
    role: 'Creator',
    href: 'https://github.com/FloSch62/srsim-hw-schema',
    language: 'TypeScript',
    icon: FactCheckOutlinedIcon,
  },
]

export const links = {
  github: 'https://github.com/FloSch62',
  linkedin: 'https://www.linkedin.com/in/florian-schwarz-812a34145/',
}
