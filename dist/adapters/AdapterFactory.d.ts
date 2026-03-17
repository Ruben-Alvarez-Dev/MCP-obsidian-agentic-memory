import type { IAgentAdapter } from '../core/interfaces/IAgentAdapter.js';
import type { AgentType } from '../core/interfaces/types.js';
/**
 * Factory for creating agent adapters.
 * Follows Factory Pattern.
 */
export declare class AdapterFactory {
    /**
     * Create an adapter for the specified agent type.
     */
    static create(type: AgentType): IAgentAdapter;
    /**
     * Create all available adapters.
     */
    static createAll(): IAgentAdapter[];
    /**
     * Get supported agent types.
     */
    static getSupportedTypes(): AgentType[];
}
//# sourceMappingURL=AdapterFactory.d.ts.map