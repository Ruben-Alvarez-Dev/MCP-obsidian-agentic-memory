# Obsidian Agent Memory

Universal Agent Memory System with Obsidian-compatible storage. Enterprise-grade TypeScript implementation following SOLID, Clean Architecture, and TDD principles.

## Features

- **Dual Mode**: Obsidian Original or Standalone Alternative
- **Multi-Agent**: Claude Code, Goose, OpenCode support
- **Type-Safe**: Full TypeScript strict mode
- **Tested**: >80% coverage with Vitest
- **Documented**: Architecture Decision Records (ADRs)

## Installation

```bash
# Clone repository
git clone https://github.com/Ruben-Alvarez-Dev/MCP-obsidian-agentic-memory.git
cd MCP-obsidian-agentic-memory

# Install dependencies
npm install

# Build
npm run build

# Run installer
npm run install
```

### Installation Modes

| Mode | Description | Requirements |
|------|-------------|--------------|
| **Obsidian Original** | Full Obsidian compatibility | Obsidian.app installed |
| **Standalone Alternative** | Pure markdown operations | None |

```bash
# Interactive install
npx obsidian-memory install

# Specific mode
npx obsidian-memory install --mode obsidian
npx obsidian-memory install --mode standalone

# With options
npx obsidian-memory install --mode standalone --agents claude,goose --verbose
```

## Architecture

```
src/
├── core/                    # Domain layer (SOLID)
│   ├── entities/           # Note, Vault, Agent
│   ├── interfaces/         # Contracts (ISP)
│   └── services/           # Business logic
├── adapters/               # Agent adapters
│   ├── claude/
│   ├── goose/
│   └── opencode/
├── infrastructure/         # Concrete implementations
│   ├── repositories/
│   └── config/
├── installer/              # Dual-mode installer
└── metrics/                # Performance benchmarks
```

### Design Patterns Used

| Pattern | Purpose |
|---------|---------|
| Repository | Abstract vault access |
| Adapter | Unify different agents |
| Factory | Create adapters |
| Strategy | Configurable search |
| Singleton | Global configuration |

## Development

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Lint code
npm run lint

# Format code
npm run format

# Run benchmarks
npm run benchmark
```

## Metrics & Benchmarks

Compare performance between modes:

```bash
npx obsidian-memory benchmark --mode both
```

Output includes:
- Read latency (p50, p95, p99)
- Write latency (p50, p95, p99)
- Search latency (p50, p95, p99)
- Memory usage

## Vault Structure

```
~/agent-memory/vault/
├── Projects/   # Per-project documentation
├── Daily/      # Daily notes (YYYY-MM-DD.md)
├── Memory/     # Reusable knowledge
├── Templates/  # Note templates
└── System/     # Configuration
```

## Documentation

- [ADR-001: TypeScript Strict Mode](docs/architecture/ADR-001-typescript.md)
- [ADR-002: Clean Architecture](docs/architecture/ADR-002-clean-architecture.md)
- [ADR-003: Dual Mode Installer](docs/architecture/ADR-003-dual-installer.md)

## API

```typescript
import {
  Note,
  Vault,
  NoteService,
  VaultService,
  Installer,
  MetricsCollector,
} from 'obsidian-agent-memory';

// Create vault
const vault = await Vault.create('~/my-vault');

// Create note
const note = Note.fromMarkdown(content, path);

// Install
const installer = new Installer({ mode: 'standalone' });
await installer.install();

// Benchmark
const collector = new MetricsCollector();
const result = await collector.runBenchmark('standalone');
```

## License

Apache-2.0 © Ruben-Alvarez-Dev
