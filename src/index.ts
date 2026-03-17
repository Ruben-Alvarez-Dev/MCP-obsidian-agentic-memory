// Core
export { Note, Vault, Agent, type NoteFrontmatter } from './core/entities/index.js';
export { NoteService, VaultService } from './core/services/index.js';
export type {
  INoteRepository,
  IAgentAdapter,
  IMetricsCollector,
  InstallMode,
  AgentType,
  InstallOptions,
  MetricsReport,
  BenchmarkResult,
} from './core/interfaces/index.js';

// Adapters
export {
  ClaudeCodeAdapter,
  GooseAdapter,
  OpenCodeAdapter,
  AdapterFactory,
} from './adapters/index.js';

// Infrastructure
export { FileSystemNoteRepository, VaultConfig } from './infrastructure/index.js';

// Installer
export { Installer } from './installer/Installer.js';

// Metrics
export { MetricsCollector } from './metrics/MetricsCollector.js';
