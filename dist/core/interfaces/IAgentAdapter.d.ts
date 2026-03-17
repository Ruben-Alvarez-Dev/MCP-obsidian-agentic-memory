import type { InstallMode } from './types.js';
/**
 * Adapter interface for agent-specific configuration.
 * Follows Adapter pattern - uniform interface for different agents.
 */
export interface IAgentAdapter {
    /**
     * Unique identifier for the agent.
     */
    readonly name: string;
    /**
     * Display name for user-facing messages.
     */
    readonly displayName: string;
    /**
     * Check if the agent is installed on this system.
     */
    isInstalled(): Promise<boolean>;
    /**
     * Configure the agent to use the vault.
     * @param vaultPath - Absolute path to the vault
     * @param mode - Installation mode (obsidian or standalone)
     */
    configure(vaultPath: string, mode: InstallMode): Promise<void>;
    /**
     * Get the path where agent skills are stored.
     */
    getSkillPath(): string;
    /**
     * Validate that the agent is correctly configured.
     */
    validate(): Promise<boolean>;
}
//# sourceMappingURL=IAgentAdapter.d.ts.map