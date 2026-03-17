import * as fs from 'fs/promises';
import type { InstallMode, AgentType, InstallOptions } from '../core/interfaces/types.js';
import { AdapterFactory } from '../adapters/AdapterFactory.js';
import { Vault } from '../core/entities/Vault.js';

/**
 * Dual-mode installer for Obsidian Agent Memory.
 */
export class Installer {
  private readonly options: InstallOptions;

  constructor(options: Partial<InstallOptions> = {}) {
    this.options = {
      mode: options.mode ?? 'standalone',
      vaultPath: options.vaultPath ?? `${process.env.HOME ?? ''}/agent-memory/vault`,
      agents: options.agents ?? ['claude', 'goose', 'opencode'],
      verbose: options.verbose ?? false,
    };
  }

  /**
   * Run the installation.
   */
  public async install(): Promise<void> {
    this.log('Starting installation...');

    // Validate Obsidian mode
    if (this.options.mode === 'obsidian') {
      await this.validateObsidianInstalled();
    }

    // Create vault
    this.log(`Creating vault at ${this.options.vaultPath}`);
    await Vault.create(this.options.vaultPath);

    // Configure agents
    for (const agentType of this.options.agents) {
      await this.configureAgent(agentType);
    }

    this.log('Installation complete!');
  }

  /**
   * Validate Obsidian is installed for Obsidian mode.
   */
  private async validateObsidianInstalled(): Promise<void> {
    const obsidianPath = '/Applications/Obsidian.app';
    try {
      await fs.stat(obsidianPath);
      this.log('Obsidian found');
    } catch {
      console.warn('⚠️  Obsidian not found. Falling back to standalone mode.');
      console.warn('    Install Obsidian for full features: https://obsidian.md');
      this.options.mode = 'standalone';
    }
  }

  /**
   * Configure a specific agent.
   */
  private async configureAgent(type: AgentType): Promise<void> {
    this.log(`Configuring ${type}...`);

    const adapter = AdapterFactory.create(type);
    const isInstalled = await adapter.isInstalled();

    if (!isInstalled) {
      this.log(`  ${type} not installed, skipping`);
      return;
    }

    await adapter.configure(this.options.vaultPath, this.options.mode);
    this.log(`  ${type} configured successfully`);
  }

  /**
   * Log message if verbose mode.
   */
  private log(message: string): void {
    if (this.options.verbose) {
      console.log(message);
    }
  }
}
