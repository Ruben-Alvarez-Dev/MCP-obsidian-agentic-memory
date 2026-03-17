/**
 * Vault configuration.
 */
export class VaultConfig {
  public readonly vaultPath: string;
  public readonly structure: {
    projects: string;
    daily: string;
    memory: string;
    templates: string;
    system: string;
  };

  constructor(vaultPath: string) {
    this.vaultPath = vaultPath;
    this.structure = {
      projects: 'Projects',
      daily: 'Daily',
      memory: 'Memory',
      templates: 'Templates',
      system: 'System',
    };
  }

  /**
   * Create default configuration.
   */
  public static default(): VaultConfig {
    return new VaultConfig(`${process.env.HOME ?? ''}/agent-memory/vault`);
  }

  /**
   * Get full path to a structure directory.
   */
  public getFullPath(key: keyof VaultConfig['structure']): string {
    const subdir = this.structure[key];
    return `${this.vaultPath}/${subdir}`;
  }
}
