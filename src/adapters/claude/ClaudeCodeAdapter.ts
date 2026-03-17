import * as fs from 'fs/promises';
import * as path from 'path';
import type { IAgentAdapter } from '../../core/interfaces/IAgentAdapter.js';
import type { InstallMode } from '../../core/interfaces/types.js';

/**
 * Adapter for Claude Code agent configuration.
 */
export class ClaudeCodeAdapter implements IAgentAdapter {
  public readonly name = 'claude';
  public readonly displayName = 'Claude Code';

  private readonly configDir: string;

  constructor() {
    this.configDir = `${process.env.HOME ?? ''}/.claude/skills`;
  }

  public async isInstalled(): Promise<boolean> {
    try {
      const claudeDir = `${process.env.HOME ?? ''}/.claude`;
      const stat = await fs.stat(claudeDir);
      return stat.isDirectory();
    } catch {
      return false;
    }
  }

  public async configure(vaultPath: string, mode: InstallMode): Promise<void> {
    await fs.mkdir(this.configDir, { recursive: true });

    const skillContent = this.generateSkillContent(vaultPath, mode);
    const skillPath = path.join(this.configDir, 'obsidian.md');

    await fs.writeFile(skillPath, skillContent, 'utf-8');
  }

  public getSkillPath(): string {
    return path.join(this.configDir, 'obsidian.md');
  }

  public async validate(): Promise<boolean> {
    try {
      const skillPath = this.getSkillPath();
      const stat = await fs.stat(skillPath);
      return stat.isFile();
    } catch {
      return false;
    }
  }

  private generateSkillContent(vaultPath: string, mode: InstallMode): string {
    const modeNote =
      mode === 'obsidian'
        ? 'Full Obsidian compatibility enabled. Open vault in Obsidian for graph view and sync.'
        : 'Standalone mode. Pure markdown operations without Obsidian dependencies.';

    return `---
name: obsidian
description: >
  Persistent memory system using Obsidian-compatible markdown vault.
  Trigger: When needing to save/recall information across sessions.
license: Apache-2.0
metadata:
  author: Ruben-Alvarez-Dev
  version: "1.0.0"
allowed-tools: Read, Edit, Write, Glob, Grep, Bash
---

# Obsidian Memory Skill

## Mode: ${mode === 'obsidian' ? 'Obsidian Original' : 'Standalone Alternative'}

${modeNote}

## Vault Location

\`${vaultPath}/\`

## Structure

| Directory | Purpose |
|-----------|---------|
| Projects/ | Per-project documentation |
| Daily/ | Daily notes (YYYY-MM-DD.md) |
| Memory/ | Reusable knowledge |
| Templates/ | Note templates |
| System/ | Configuration |

## Protocol

### Read
\`\`\`bash
cat ${vaultPath}/Projects/{project}.md
grep -rn "query" ${vaultPath}/
\`\`\`

### Write
Create files with YAML frontmatter:
\`\`\`markdown
---
created: YYYY-MM-DD
type: project|daily|memory
tags: [tag1, tag2]
---

# Title
Content with [[wikilinks]].
\`\`\`

## Session Protocol
1. **Start**: Read daily note + project files
2. **During**: Save decisions to DECISIONS.md
3. **End**: Update daily note with summary
`;
  }
}
