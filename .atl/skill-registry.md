# Skill Registry: OBSIDIAN-as-a-memory-server

> Generated: 2026-03-17
> Project: Universal Agent Memory System with Obsidian

## Available Skills

### SDD Workflow
| Skill | Description | Trigger |
|-------|-------------|---------|
| `sdd-init` | Initialize SDD context | `/sdd-init` |
| `sdd-explore` | Investigate before change | `/sdd-explore <topic>` |
| `sdd-propose` | Create change proposal | SDD phase |
| `sdd-spec` | Write specifications | SDD phase |
| `sdd-design` | Technical design | SDD phase |
| `sdd-tasks` | Break into tasks | SDD phase |
| `sdd-apply` | Implement tasks | SDD phase |
| `sdd-verify` | Validate implementation | SDD phase |
| `sdd-archive` | Archive completed change | SDD phase |

### Frameworks & Languages
| Skill | Description | Trigger |
|-------|-------------|---------|
| `typescript` | TypeScript strict patterns | `.ts` files |
| `react-19` | React 19 + Compiler | React components |
| `nextjs-15` | Next.js 15 App Router | Next.js routing |
| `angular/*` | Angular patterns | Angular code |
| `django-drf` | Django REST Framework | DRF ViewSets |
| `tailwind-4` | Tailwind CSS 4 | Tailwind styling |
| `zod-4` | Zod 4 validation | Schema validation |
| `zustand-5` | Zustand 5 state | State management |
| `ai-sdk-5` | Vercel AI SDK 5 | AI chat features |

### Testing
| Skill | Description | Trigger |
|-------|-------------|---------|
| `pytest` | Python testing | Python tests |
| `playwright` | E2E testing | E2E tests |

### Workflow
| Skill | Description | Trigger |
|-------|-------------|---------|
| `github-pr` | Pull request creation | PR creation |
| `jira-epic` | Jira epic creation | Epic creation |
| `jira-task` | Jira task creation | Task creation |
| `skill-creator` | Create new skills | Skill creation |
| `prd` | Product Requirements Doc | Feature planning |
| `ralph` | PRD to Ralph format | Ralph conversion |

## Project Conventions

### Root Files
| File | Purpose |
|------|---------|
| `CLAUDE.md` | Main context for Claude Code (global) |
| `.claude/settings.local.json` | Local permissions |

### Project Type
**New Project** - Universal Agent Memory System

**Goal**: Create a portable, universal memory system for AI agents using Obsidian as the storage backend.

**Target Agents**:
- Claude Code ✅
- Goose ✅
- OpenCode ✅
- Other CLI/IDE agents (future)

**Key Requirements**:
1. Work without Obsidian installed (markdown-first)
2. Be fully compatible with Obsidian when installed
3. Provide skills for each supported agent
4. Single source of truth, multiple adapters

## How to Use Skills

Before starting any task:
1. Check this registry for relevant skills
2. Read the specific `SKILL.md` file
3. Follow the patterns and guidelines

### Skill Locations
- **User-level**: `~/.claude/skills/`, `~/.config/opencode/skills/`
- **Project-level**: `.claude/skills/` (none yet)
