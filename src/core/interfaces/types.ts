/**
 * Installation mode selection.
 */
export type InstallMode = 'obsidian' | 'standalone';

/**
 * Agent identifier types.
 */
export type AgentType = 'claude' | 'goose' | 'opencode';

/**
 * Installation options passed to the installer.
 */
export interface InstallOptions {
  mode: InstallMode;
  vaultPath: string;
  agents: AgentType[];
  verbose: boolean;
}

/**
 * Metrics report structure.
 */
export interface MetricsReport {
  timestamp: Date;
  operation: string;
  latencies: {
    p50: number;
    p95: number;
    p99: number;
  };
  memoryUsage: {
    heapUsed: number;
    heapTotal: number;
    external: number;
  };
  diskIO?: {
    readBytes: number;
    writeBytes: number;
  };
}

/**
 * Benchmark comparison result.
 */
export interface BenchmarkResult {
  mode: InstallMode;
  readLatency: number;
  writeLatency: number;
  searchLatency: number;
  memoryUsage: number;
}
