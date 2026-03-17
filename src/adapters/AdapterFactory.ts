import type { IAgentAdapter } from '../core/interfaces/IAgentAdapter.js';
import type { AgentType } from '../core/interfaces/types.js';
import { ClaudeCodeAdapter } from './claude/ClaudeCodeAdapter.js';
import { GooseAdapter } from './goose/GooseAdapter.js';
import { OpenCodeAdapter } from './opencode/OpenCodeAdapter.js';

/**
 * Factory for creating agent adapters.
 * Follows Factory Pattern.
 */
export class AdapterFactory {
  private static readonly adapters: Map<AgentType, () => IAgentAdapter> = new Map([
    ['claude', () => new ClaudeCodeAdapter()],
    ['goose', () => new GooseAdapter()],
    ['opencode', () => new OpenCodeAdapter()],
  ]);

  /**
   * Create an adapter for the specified agent type.
   */
  public static create(type: AgentType): IAgentAdapter {
    const factory = this.adapters.get(type);
    if (!factory) {
      throw new Error(`Unknown agent type: ${type}`);
    }
    return factory();
  }

  /**
   * Create all available adapters.
   */
  public static createAll(): IAgentAdapter[] {
    return Array.from(this.adapters.values()).map((factory) => factory());
  }

  /**
   * Get supported agent types.
   */
  public static getSupportedTypes(): AgentType[] {
    return Array.from(this.adapters.keys());
  }
}
