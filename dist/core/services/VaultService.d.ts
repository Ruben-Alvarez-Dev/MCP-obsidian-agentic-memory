import { Vault } from '../entities/Vault.js';
/**
 * Service for vault management.
 */
export declare class VaultService {
    /**
     * Initialize a new vault.
     */
    initializeVault(vaultPath: string): Promise<Vault>;
    /**
     * Validate an existing vault.
     */
    validateVault(vault: Vault): Promise<boolean>;
    /**
     * Get the default vault path.
     */
    getDefaultVaultPath(): string;
}
//# sourceMappingURL=VaultService.d.ts.map