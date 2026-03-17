import type { IAgentAdapter } from '../../core/interfaces/IAgentAdapter.js';
import type { InstallMode } from '../../core/interfaces/types.js';
/**
 * Adapter for Claude Code agent configuration.
 */
export declare class ClaudeCodeAdapter implements IAgentAdapter {
    readonly name = "claude";
    readonly displayName = "Claude Code";
    private readonly configDir;
    constructor();
    isInstalled(): Promise<boolean>;
    configure(vaultPath: string, mode: InstallMode): Promise<void>;
    getSkillPath(): string;
    validate(): Promise<boolean>;
    private generateSkillContent;
}
//# sourceMappingURL=ClaudeCodeAdapter.d.ts.map