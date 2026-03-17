import { FileSystemNoteRepository } from '../infrastructure/repositories/FileSystemNoteRepository.js';
/**
 * Metrics collector for performance measurement.
 */
export class MetricsCollector {
    latencies = new Map();
    startTimer(operation) {
        const start = performance.now();
        return () => {
            const elapsed = performance.now() - start;
            this.recordLatency(operation, elapsed);
            return elapsed;
        };
    }
    recordLatency(operation, ms) {
        const existing = this.latencies.get(operation) ?? [];
        existing.push(ms);
        this.latencies.set(operation, existing);
    }
    recordMemoryUsage() {
        const usage = process.memoryUsage();
        // Store for later retrieval in report
        this.latencies.set('memory_heapUsed', [usage.heapUsed]);
        this.latencies.set('memory_heapTotal', [usage.heapTotal]);
    }
    getReport(operation) {
        const latencies = this.latencies.get(operation);
        if (!latencies || latencies.length === 0)
            return null;
        const sorted = [...latencies].sort((a, b) => a - b);
        const p50 = sorted[Math.floor(sorted.length * 0.5)] ?? 0;
        const p95 = sorted[Math.floor(sorted.length * 0.95)] ?? 0;
        const p99 = sorted[Math.floor(sorted.length * 0.99)] ?? 0;
        return {
            timestamp: new Date(),
            operation,
            latencies: { p50, p95, p99 },
            memoryUsage: {
                heapUsed: this.latencies.get('memory_heapUsed')?.[0] ?? 0,
                heapTotal: this.latencies.get('memory_heapTotal')?.[0] ?? 0,
                external: 0,
            },
        };
    }
    async runBenchmark(mode) {
        const vaultPath = `${process.env.HOME ?? ''}/agent-memory/vault`;
        const repo = new FileSystemNoteRepository(vaultPath);
        // Read benchmark
        const readTimer = this.startTimer('read');
        await repo.findAll();
        const readLatency = readTimer();
        // Write benchmark
        const writeTimer = this.startTimer('write');
        // Write test would go here
        const writeLatency = writeTimer();
        // Search benchmark
        const searchTimer = this.startTimer('search');
        await repo.search('test');
        const searchLatency = searchTimer();
        this.recordMemoryUsage();
        const memory = process.memoryUsage();
        return {
            mode,
            readLatency,
            writeLatency,
            searchLatency,
            memoryUsage: memory.heapUsed,
        };
    }
}
//# sourceMappingURL=MetricsCollector.js.map