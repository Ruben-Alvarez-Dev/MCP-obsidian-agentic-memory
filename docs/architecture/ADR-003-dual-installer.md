# ADR-003: Dual Mode Installer

## Status
Accepted

## Context
Users may or may not have Obsidian installed. We want to support both scenarios while providing full features when Obsidian is available.

## Decision
Implement dual-mode installation:
1. **Obsidian Original**: Full compatibility with Obsidian app
2. **Standalone Alternative**: Pure markdown operations without Obsidian

## Modes Comparison

| Feature | Obsidian Original | Standalone Alternative |
|---------|-------------------|------------------------|
| Read/Write | ✅ | ✅ |
| Search | ✅ | ✅ (grep) |
| Graph View | ✅ | ❌ |
| Sync | ✅ | ❌ |
| Plugins | ✅ | ❌ |
| Dependencies | Obsidian.app | None |

## Implementation
- Installer detects if Obsidian is installed
- If Obsidian mode selected but not installed → fallback to Standalone
- Both modes use identical vault structure
- Metrics collected to compare performance

## Consequences

### Positive
- Works for all users regardless of Obsidian installation
- Clear upgrade path (install Obsidian later)
- Performance comparison available

### Negative
- Additional code paths to test
- Need to document both modes

## Compliance
- Installer MUST offer mode selection
- Fallback MUST be automatic when Obsidian not found
- Metrics MUST be collected for both modes
