/**
 * Vault configuration.
 */
export declare class VaultConfig {
    readonly vaultPath: string;
    readonly structure: {
        projects: string;
        daily: string;
        memory: string;
        templates: string;
        system: string;
    };
    constructor(vaultPath: string);
    /**
     * Create default configuration.
     */
    static default(): VaultConfig;
    /**
     * Get full path to a structure directory.
     */
    getFullPath(key: keyof VaultConfig['structure']): string;
}
//# sourceMappingURL=VaultConfig.d.ts.map