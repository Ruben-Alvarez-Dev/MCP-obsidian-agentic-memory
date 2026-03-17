/**
 * Agent entity representing an AI agent configuration.
 */
export class Agent {
    type;
    name;
    configPath;
    installed;
    constructor(type, name, configPath, installed = false) {
        this.type = type;
        this.name = name;
        this.configPath = configPath;
        this.installed = installed;
    }
    /**
     * Create a Claude Code agent instance.
     */
    static claude(installed = false) {
        return new Agent('claude', 'Claude Code', `${process.env.HOME ?? ''}/.claude/skills`, installed);
    }
    /**
     * Create a Goose agent instance.
     */
    static goose(installed = false) {
        return new Agent('goose', 'Goose', `${process.env.HOME ?? ''}/.config/goose/config.yaml`, installed);
    }
    /**
     * Create an OpenCode agent instance.
     */
    static opencode(installed = false) {
        return new Agent('opencode', 'OpenCode', `${process.env.HOME ?? ''}/.config/opencode/skills`, installed);
    }
    /**
     * Get the skill file name for this agent.
     */
    getSkillFileName() {
        switch (this.type) {
            case 'claude':
                return 'obsidian.md';
            case 'goose':
                return 'obsidian-memory';
            case 'opencode':
                return 'obsidian/SKILL.md';
        }
    }
}
//# sourceMappingURL=Agent.js.map