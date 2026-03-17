import * as fs from 'fs/promises';
/**
 * Adapter for Goose agent configuration.
 */
export class GooseAdapter {
    name = 'goose';
    displayName = 'Goose';
    configPath;
    constructor() {
        this.configPath = `${process.env.HOME ?? ''}/.config/goose/config.yaml`;
    }
    async isInstalled() {
        try {
            const stat = await fs.stat(this.configPath);
            return stat.isFile();
        }
        catch {
            return false;
        }
    }
    async configure(vaultPath, mode) {
        const configDir = `${process.env.HOME ?? ''}/.config/goose`;
        await fs.mkdir(configDir, { recursive: true });
        let content;
        try {
            content = await fs.readFile(this.configPath, 'utf-8');
        }
        catch {
            content = 'extensions:\n';
        }
        // Check if already configured
        if (content.includes('obsidian-memory:')) {
            return;
        }
        // Add extension
        const extension = this.generateExtensionConfig(vaultPath, mode);
        content = content.replace(/^extensions:\s*$/m, `extensions:\n${extension}\n`);
        await fs.writeFile(this.configPath, content, 'utf-8');
    }
    getSkillPath() {
        return this.configPath;
    }
    async validate() {
        try {
            const content = await fs.readFile(this.configPath, 'utf-8');
            return content.includes('obsidian-memory:');
        }
        catch {
            return false;
        }
    }
    generateExtensionConfig(vaultPath, mode) {
        return `  obsidian-memory:
    enabled: true
    type: builtin
    name: obsidian-memory
    description: Persistent memory using Obsidian vault at ${vaultPath}
    display_name: Obsidian Memory
    timeout: 300
    bundled: false
    available_tools: []
    vault_path: ${vaultPath}
    mode: ${mode}`;
    }
}
//# sourceMappingURL=GooseAdapter.js.map