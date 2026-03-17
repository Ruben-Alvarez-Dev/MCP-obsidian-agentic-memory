import type { IAgentAdapter } from '../../core/interfaces/IAgentAdapter.js';
import type { InstallMode } from '../../core/interfaces/types.js';
/**
 * Adapter for Goose agent configuration.
 */
export declare class GooseAdapter implements IAgentAdapter {
    readonly name = "goose";
    readonly displayName = "Goose";
    private readonly configPath;
    constructor();
    isInstalled(): Promise<boolean>;
    configure(vaultPath: string, mode: InstallMode): Promise<void>;
    getSkillPath(): string;
    validate(): Promise<boolean>;
    private generateExtensionConfig;
}
//# sourceMappingURL=GooseAdapter.d.ts.map