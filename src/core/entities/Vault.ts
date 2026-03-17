import * as fs from 'fs/promises';
import * as path from 'path';

/**
 * Vault entity representing the memory storage root.
 */
export class Vault {
  public readonly path: string;
  public readonly directories: readonly string[];

  private static readonly DEFAULT_DIRECTORIES = [
    'Projects',
    'Daily',
    'Memory',
    'Templates',
    'System',
  ] as const;

  constructor(vaultPath: string, directories: readonly string[] = Vault.DEFAULT_DIRECTORIES) {
    this.path = vaultPath;
    this.directories = directories;
  }

  /**
   * Create a new vault at the specified path.
   */
  public static async create(vaultPath: string): Promise<Vault> {
    const vault = new Vault(vaultPath);
    await vault.initialize();
    return vault;
  }

  /**
   * Check if a vault exists at the path.
   */
  public static async exists(vaultPath: string): Promise<boolean> {
    try {
      const stat = await fs.stat(vaultPath);
      return stat.isDirectory();
    } catch {
      return false;
    }
  }

  /**
   * Initialize vault directory structure.
   */
  private async initialize(): Promise<void> {
    await fs.mkdir(this.path, { recursive: true });

    for (const dir of this.directories) {
      const dirPath = path.join(this.path, dir);
      await fs.mkdir(dirPath, { recursive: true });
    }
  }

  /**
   * Get path to a specific directory.
   */
  public getDirectoryPath(name: string): string {
    return path.join(this.path, name);
  }

  /**
   * Validate vault structure.
   */
  public async validate(): Promise<boolean> {
    for (const dir of this.directories) {
      const dirPath = path.join(this.path, dir);
      try {
        const stat = await fs.stat(dirPath);
        if (!stat.isDirectory()) return false;
      } catch {
        return false;
      }
    }
    return true;
  }
}
