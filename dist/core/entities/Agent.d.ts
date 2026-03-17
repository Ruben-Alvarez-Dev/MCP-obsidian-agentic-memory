import type { AgentType } from '../interfaces/types.js';
/**
 * Agent entity representing an AI agent configuration.
 */
export declare class Agent {
    readonly type: AgentType;
    readonly name: string;
    readonly configPath: string;
    installed: boolean;
    constructor(type: AgentType, name: string, configPath: string, installed?: boolean);
    /**
     * Create a Claude Code agent instance.
     */
    static claude(installed?: boolean): Agent;
    /**
     * Create a Goose agent instance.
     */
    static goose(installed?: boolean): Agent;
    /**
     * Create an OpenCode agent instance.
     */
    static opencode(installed?: boolean): Agent;
    /**
     * Get the skill file name for this agent.
     */
    getSkillFileName(): string;
}
//# sourceMappingURL=Agent.d.ts.map