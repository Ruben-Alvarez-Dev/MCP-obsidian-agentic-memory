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
    static create(type) {
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
    static createAll() {
        return [
            new ClaudeCodeAdapter(),
            new GooseAdapter(),
            new OpenCodeAdapter(),
        ];
    }
    /**
     * Get supported agent types.
     */
    static getSupportedTypes() {
        return ['claude', 'goose', 'opencode'];
    }
}
//# sourceMappingURL=AdapterFactory.js.map