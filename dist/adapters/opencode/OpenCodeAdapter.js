import * as fs from 'fs/promises';
import * as path from 'path';
/**
 * Adapter for OpenCode agent configuration.
 */
export class OpenCodeAdapter {
    name = 'opencode';
    displayName = 'OpenCode';
    skillsDir;
    constructor() {
        this.skillsDir = `${process.env.HOME ?? ''}/.config/opencode/skills`;
    }
    async isInstalled() {
        try {
            const opencodeDir = `${process.env.HOME ?? ''}/.config/opencode`;
            const stat = await fs.stat(opencodeDir);
            return stat.isDirectory();
        }
        catch {
            return false;
        }
    }
    async configure(vaultPath, mode) {
        const skillDir = path.join(this.skillsDir, 'obsidian');
        await fs.mkdir(skillDir, { recursive: true });
        const skillContent = this.generateSkillContent(vaultPath, mode);
        const skillPath = path.join(skillDir, 'SKILL.md');
        await fs.writeFile(skillPath, skillContent, 'utf-8');
    }
    getSkillPath() {
        return path.join(this.skillsDir, 'obsidian', 'SKILL.md');
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
        return `# Obsidian Memory Skill

## Mode: ${mode === 'obsidian' ? 'Obsidian Original' : 'Standalone Alternative'}

## Vault Location

\`${vaultPath}/\`

## Structure

| Directory | Purpose |
|-----------|---------|
| Projects/ | Per-project documentation |
| Daily/ | Daily notes (YYYY-MM-DD.md) |
| Memory/ | Reusable knowledge |

## Protocol

### Read
\`\`\`bash
cat ${vaultPath}/Projects/{project}.md
grep -rn "query" ${vaultPath}/
\`\`\`

### Write
Files with YAML frontmatter (created, type, tags).

### Session Flow
1. Read daily note + project files
2. Save decisions to DECISIONS.md
3. Update daily note at end
`;
    }
}
//# sourceMappingURL=OpenCodeAdapter.js.map