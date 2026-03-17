import type { MetricsReport, BenchmarkResult, InstallMode } from './types.js';
/**
 * Metrics collector interface for performance measurement.
 */
export interface IMetricsCollector {
    /**
     * Start a timer for an operation.
     * @returns A function to call when operation completes.
     */
    startTimer(operation: string): () => number;
    /**
     * Record a latency measurement.
     */
    recordLatency(operation: string, ms: number): void;
    /**
     * Record current memory usage.
     */
    recordMemoryUsage(): void;
    /**
     * Get a metrics report for an operation.
     */
    getReport(operation: string): MetricsReport | null;
    /**
     * Run a benchmark comparison between modes.
     */
    runBenchmark(mode: InstallMode): Promise<BenchmarkResult>;
}
//# sourceMappingURL=IMetricsCollector.d.ts.map