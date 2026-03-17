/**
 * Vault configuration.
 */
export class VaultConfig {
    vaultPath;
    structure;
    constructor(vaultPath) {
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
    static default() {
        return new VaultConfig(`${process.env.HOME ?? ''}/agent-memory/vault`);
    }
    /**
     * Get full path to a structure directory.
     */
    getFullPath(key) {
        const subdir = this.structure[key];
        return `${this.vaultPath}/${subdir}`;
    }
}
//# sourceMappingURL=VaultConfig.js.map