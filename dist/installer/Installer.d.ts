import type { InstallOptions } from '../core/interfaces/types.js';
/**
 * Dual-mode installer for Obsidian Agent Memory.
 */
export declare class Installer {
    private readonly options;
    constructor(options?: Partial<InstallOptions>);
    /**
     * Run the installation.
     */
    install(): Promise<void>;
    /**
     * Validate Obsidian is installed for Obsidian mode.
     */
    private validateObsidianInstalled;
    /**
     * Configure a specific agent.
     */
    private configureAgent;
    /**
     * Log message if verbose mode.
     */
    private log;
}
//# sourceMappingURL=Installer.d.ts.map