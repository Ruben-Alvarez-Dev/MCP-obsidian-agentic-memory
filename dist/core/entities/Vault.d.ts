/**
 * Vault entity representing the memory storage root.
 */
export declare class Vault {
    readonly path: string;
    readonly directories: readonly string[];
    private static readonly DEFAULT_DIRECTORIES;
    constructor(vaultPath: string, directories?: readonly string[]);
    /**
     * Create a new vault at the specified path.
     */
    static create(vaultPath: string): Promise<Vault>;
    /**
     * Check if a vault exists at the path.
     */
    static exists(vaultPath: string): Promise<boolean>;
    /**
     * Initialize vault directory structure.
     */
    private initialize;
    /**
     * Get path to a specific directory.
     */
    getDirectoryPath(name: string): string;
    /**
     * Validate vault structure.
     */
    validate(): Promise<boolean>;
}
//# sourceMappingURL=Vault.d.ts.map