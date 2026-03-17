import * as fs from 'fs/promises';
import * as path from 'path';
/**
 * Adapter for Claude Code agent configuration.
 */
export class ClaudeCodeAdapter {
    name = 'claude';
    displayName = 'Claude Code';
    configDir;
    constructor() {
        this.configDir = `${process.env.HOME ?? ''}/.claude/skills`;
    }
    async isInstalled() {
        try {
            const claudeDir = `${process.env.HOME ?? ''}/.claude`;
            const stat = await fs.stat(claudeDir);
            return stat.isDirectory();
        }
        catch {
            return false;
        }
    }
    async configure(vaultPath, mode) {
        await fs.mkdir(this.configDir, { recursive: true });
        const skillContent = this.generateSkillContent(vaultPath, mode);
        const skillPath = path.join(this.configDir, 'obsidian.md');
        await fs.writeFile(skillPath, skillContent, 'utf-8');
    }
    getSkillPath() {
        return path.join(this.configDir, 'obsidian.md');
    }
    async validate() {
        try {
            const skillPath = this.getSkillPath();
            const stat = await fs.stat(skillPath);
            return stat.isFile();
        }
        catch {
            return false;
        }
    }
    generateSkillContent(vaultPath, mode) {
        const modeNote = mode === 'obsidian'
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
//# sourceMappingURL=ClaudeCodeAdapter.js.map