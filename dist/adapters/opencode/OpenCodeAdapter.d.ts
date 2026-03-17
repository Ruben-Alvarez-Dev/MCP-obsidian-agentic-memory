import type { IAgentAdapter } from '../../core/interfaces/IAgentAdapter.js';
import type { InstallMode } from '../../core/interfaces/types.js';
/**
 * Adapter for OpenCode agent configuration.
 */
export declare class OpenCodeAdapter implements IAgentAdapter {
    readonly name = "opencode";
    readonly displayName = "OpenCode";
    private readonly skillsDir;
    constructor();
    isInstalled(): Promise<boolean>;
    configure(vaultPath: string, mode: InstallMode): Promise<void>;
    getSkillPath(): string;
    validate(): Promise<boolean>;
    private generateSkillContent;
}
//# sourceMappingURL=OpenCodeAdapter.d.ts.map