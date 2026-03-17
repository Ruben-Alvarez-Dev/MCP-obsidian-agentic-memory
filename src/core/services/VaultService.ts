import { Vault } from '../entities/Vault.js';

/**
 * Service for vault management.
 */
export class VaultService {
  /**
   * Initialize a new vault.
   */
  public async initializeVault(vaultPath: string): Promise<Vault> {
    return Vault.create(vaultPath);
  }

  /**
   * Validate an existing vault.
   */
  public async validateVault(vault: Vault): Promise<boolean> {
    return vault.validate();
  }

  /**
   * Get the default vault path.
   */
  public getDefaultVaultPath(): string {
    return `${process.env.HOME ?? ''}/agent-memory/vault`;
  }
}
