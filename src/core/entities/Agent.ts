import type { AgentType } from '../interfaces/types.js';

/**
 * Agent entity representing an AI agent configuration.
 */
export class Agent {
  public readonly type: AgentType;
  public readonly name: string;
  public readonly configPath: string;
  public installed: boolean;

  constructor(type: AgentType, name: string, configPath: string, installed = false) {
    this.type = type;
    this.name = name;
    this.configPath = configPath;
    this.installed = installed;
  }

  /**
   * Create a Claude Code agent instance.
   */
  public static claude(installed = false): Agent {
    return new Agent(
      'claude',
      'Claude Code',
      `${process.env.HOME ?? ''}/.claude/skills`,
      installed
    );
  }

  /**
   * Create a Goose agent instance.
   */
  public static goose(installed = false): Agent {
    return new Agent(
      'goose',
      'Goose',
      `${process.env.HOME ?? ''}/.config/goose/config.yaml`,
      installed
    );
  }

  /**
   * Create an OpenCode agent instance.
   */
  public static opencode(installed = false): Agent {
    return new Agent(
      'opencode',
      'OpenCode',
      `${process.env.HOME ?? ''}/.config/opencode/skills`,
      installed
    );
  }

  /**
   * Get the skill file name for this agent.
   */
  public getSkillFileName(): string {
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
