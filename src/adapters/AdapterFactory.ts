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
  /**
   * Create an adapter for the specified agent type.
   */
  public static create(type: AgentType): IAgentAdapter {
    switch (type) {
      case 'claude':
        return new ClaudeCodeAdapter();
      case 'goose':
        return new GooseAdapter();
      case 'opencode':
        return new OpenCodeAdapter();
      default:
        throw new Error(`Unknown agent type: ${type}`);
    }
  }

  /**
   * Create all available adapters.
   */
  public static createAll(): IAgentAdapter[] {
    return [
      new ClaudeCodeAdapter(),
      new GooseAdapter(),
      new OpenCodeAdapter(),
    ];
  }

  /**
   * Get supported agent types.
   */
  public static getSupportedTypes(): AgentType[] {
    return ['claude', 'goose', 'opencode'];
  }
}
