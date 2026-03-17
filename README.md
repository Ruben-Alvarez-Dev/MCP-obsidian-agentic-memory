# Universal Agent Memory System

Portable memory system for AI agents using Obsidian-compatible markdown storage.

## Features

- **Markdown-first**: Works without Obsidian installed
- **Multi-agent**: Supports Claude Code, Goose, OpenCode
- **Single source of truth**: All agents share the same vault
- **Plug and play**: Single installation script

## Installation

```bash
git clone https://github.com/gentleman-programming/obsidian-agent-memory.git
cd obsidian-agent-memory
./install.sh
```

## Vault Structure

```
~/agent-memory/vault/
├── Projects/   # Per-project memory
├── Daily/      # Daily notes (YYYY-MM-DD.md)
├── Memory/     # General agent memory
├── Templates/  # Note templates
└── System/     # Configuration
```

## Usage

### For Claude Code
The skill is automatically loaded. Use the vault at `~/agent-memory/vault/`.

### For Goose
The extension is registered. Access vault through file operations.

### For OpenCode
The skill is available. Read/write files in `~/agent-memory/vault/`.

## File Format

All notes use YAML frontmatter:

```markdown
---
created: 2026-03-17
type: project|daily|memory|template
tags: [tag1, tag2]
---

# Title

Content with [[wikilinks]] support.
```

## License

Apache-2.0
