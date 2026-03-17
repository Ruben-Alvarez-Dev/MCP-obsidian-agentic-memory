import type { MetricsReport, BenchmarkResult, InstallMode } from '../core/interfaces/types.js';
import type { IMetricsCollector } from '../core/interfaces/IMetricsCollector.js';
/**
 * Metrics collector for performance measurement.
 */
export declare class MetricsCollector implements IMetricsCollector {
    private readonly latencies;
    startTimer(operation: string): () => number;
    recordLatency(operation: string, ms: number): void;
    recordMemoryUsage(): void;
    getReport(operation: string): MetricsReport | null;
    runBenchmark(mode: InstallMode): Promise<BenchmarkResult>;
}
//# sourceMappingURL=MetricsCollector.d.ts.map