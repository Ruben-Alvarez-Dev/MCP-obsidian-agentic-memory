import * as fs from 'fs/promises';
import * as path from 'path';
/**
 * Vault entity representing the memory storage root.
 */
export class Vault {
    path;
    directories;
    static DEFAULT_DIRECTORIES = [
        'Projects',
        'Daily',
        'Memory',
        'Templates',
        'System',
    ];
    constructor(vaultPath, directories = Vault.DEFAULT_DIRECTORIES) {
        this.path = vaultPath;
        this.directories = directories;
    }
    /**
     * Create a new vault at the specified path.
     */
    static async create(vaultPath) {
        const vault = new Vault(vaultPath);
        await vault.initialize();
        return vault;
    }
    /**
     * Check if a vault exists at the path.
     */
    static async exists(vaultPath) {
        try {
            const stat = await fs.stat(vaultPath);
            return stat.isDirectory();
        }
        catch {
            return false;
        }
    }
    /**
     * Initialize vault directory structure.
     */
    async initialize() {
        await fs.mkdir(this.path, { recursive: true });
        for (const dir of this.directories) {
            const dirPath = path.join(this.path, dir);
            await fs.mkdir(dirPath, { recursive: true });
        }
    }
    /**
     * Get path to a specific directory.
     */
    getDirectoryPath(name) {
        return path.join(this.path, name);
    }
    /**
     * Validate vault structure.
     */
    async validate() {
        for (const dir of this.directories) {
            const dirPath = path.join(this.path, dir);
            try {
                const stat = await fs.stat(dirPath);
                if (!stat.isDirectory())
                    return false;
            }
            catch {
                return false;
            }
        }
        return true;
    }
}
//# sourceMappingURL=Vault.js.map