import * as fs from 'fs/promises';
import type { IAgentAdapter } from '../../core/interfaces/IAgentAdapter.js';
import type { InstallMode } from '../../core/interfaces/types.js';

/**
 * Adapter for Goose agent configuration.
 */
export class GooseAdapter implements IAgentAdapter {
  public readonly name = 'goose';
  public readonly displayName = 'Goose';

  private readonly configPath: string;

  constructor() {
    this.configPath = `${process.env.HOME ?? ''}/.config/goose/config.yaml`;
  }

  public async isInstalled(): Promise<boolean> {
    try {
      const stat = await fs.stat(this.configPath);
      return stat.isFile();
    } catch {
      return false;
    }
  }

  public async configure(vaultPath: string, mode: InstallMode): Promise<void> {
    const configDir = `${process.env.HOME ?? ''}/.config/goose`;
    await fs.mkdir(configDir, { recursive: true });

    let content: string;

    try {
      content = await fs.readFile(this.configPath, 'utf-8');
    } catch {
      content = 'extensions:\n';
    }

    // Check if already configured
    if (content.includes('obsidian-memory:')) {
      return;
    }

    // Add extension
    const extension = this.generateExtensionConfig(vaultPath, mode);
    content = content.replace(
      /^extensions:\s*$/m,
      `extensions:\n${extension}\n`
    );

    await fs.writeFile(this.configPath, content, 'utf-8');
  }

  public getSkillPath(): string {
    return this.configPath;
  }

  public async validate(): Promise<boolean> {
    try {
      const content = await fs.readFile(this.configPath, 'utf-8');
      return content.includes('obsidian-memory:');
    } catch {
      return false;
    }
  }

  private generateExtensionConfig(vaultPath: string, mode: InstallMode): string {
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
