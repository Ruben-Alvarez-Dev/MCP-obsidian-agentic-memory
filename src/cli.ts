#!/usr/bin/env node
import { Command } from 'commander';
import { Installer } from './installer/Installer.js';
import { MetricsCollector } from './metrics/MetricsCollector.js';

const program = new Command();

program
  .name('obsidian-memory')
  .description('Universal Agent Memory System with Obsidian-compatible storage')
  .version('1.0.0');

program
  .command('install')
  .description('Install Obsidian Agent Memory')
  .option('-m, --mode <mode>', 'Installation mode: obsidian or standalone', 'standalone')
  .option('-p, --path <path>', 'Vault path')
  .option('-a, --agents <agents>', 'Agents to configure (comma-separated)', 'claude,goose,opencode')
  .option('-v, --verbose', 'Verbose output', false)
  .action(async (options) => {
    const installer = new Installer({
      mode: options.mode as 'obsidian' | 'standalone',
      vaultPath: options.path,
      agents: options.agents.split(','),
      verbose: options.verbose,
    });

    await installer.install();
  });

program
  .command('benchmark')
  .description('Run performance benchmarks')
  .option('-m, --mode <mode>', 'Mode to benchmark: obsidian, standalone, or both', 'both')
  .action(async (options) => {
    const collector = new MetricsCollector();

    console.log('Running benchmarks...\n');

    const modes =
      options.mode === 'both'
        ? (['obsidian', 'standalone'] as const)
        : [options.mode as 'obsidian' | 'standalone'];

    for (const mode of modes) {
      console.log(`=== ${mode.toUpperCase()} MODE ===`);
      const result = await collector.runBenchmark(mode);
      console.log(`Read latency: ${result.readLatency.toFixed(2)}ms`);
      console.log(`Write latency: ${result.writeLatency.toFixed(2)}ms`);
      console.log(`Search latency: ${result.searchLatency.toFixed(2)}ms`);
      console.log(`Memory usage: ${(result.memoryUsage / 1024 / 1024).toFixed(2)}MB`);
      console.log('');
    }
  });

program.parse();
