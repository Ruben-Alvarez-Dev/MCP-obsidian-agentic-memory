import { Vault } from '../entities/Vault.js';
/**
 * Service for vault management.
 */
export class VaultService {
    /**
     * Initialize a new vault.
     */
    async initializeVault(vaultPath) {
        return Vault.create(vaultPath);
    }
    /**
     * Validate an existing vault.
     */
    async validateVault(vault) {
        return vault.validate();
    }
    /**
     * Get the default vault path.
     */
    getDefaultVaultPath() {
        return `${process.env.HOME ?? ''}/agent-memory/vault`;
    }
}
//# sourceMappingURL=VaultService.js.map