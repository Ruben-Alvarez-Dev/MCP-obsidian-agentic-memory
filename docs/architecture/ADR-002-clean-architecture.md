# ADR-002: Clean Architecture

## Status
Accepted

## Context
We need an architecture that supports testability, maintainability, and independence from frameworks.

## Decision
Implement Clean Architecture with three layers: Core, Adapters, Infrastructure.

## Layers

```
┌─────────────────────────────────────┐
│           Core (Domain)             │
│  Entities, Interfaces, Services     │
│  No external dependencies           │
└─────────────────────────────────────┘
              ▲
              │
┌─────────────────────────────────────┐
│           Adapters                  │
│  ClaudeCode, Goose, OpenCode        │
│  Implements core interfaces         │
└─────────────────────────────────────┘
              ▲
              │
┌─────────────────────────────────────┐
│         Infrastructure              │
│  FileSystem, Config, External APIs  │
│  Concrete implementations           │
└─────────────────────────────────────┘
```

## Dependency Rule
Dependencies point inward. Adapters depend on Core. Infrastructure depends on Core. Core depends on nothing.

## Consequences

### Positive
- Core business logic isolated from external concerns
- Easy to test (mock interfaces)
- Easy to swap implementations (new agents, new storage)

### Negative
- More boilerplate code
- Need to define interfaces upfront

## Compliance
- Core layer MUST NOT import from adapters or infrastructure
- All external dependencies MUST be behind interfaces
