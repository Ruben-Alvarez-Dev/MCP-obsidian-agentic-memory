# ADR-001: TypeScript Strict Mode

## Status
Accepted

## Context
We need a language that provides type safety, good tooling, and enterprise-grade maintainability.

## Decision
Use TypeScript 5.x with strict mode enabled for all source code.

## Consequences

### Positive
- Compile-time type checking prevents runtime errors
- Excellent IDE support (IntelliSense, refactoring)
- Industry standard for enterprise JavaScript projects
- Self-documenting code through types

### Negative
- Additional build step required
- Learning curve for developers unfamiliar with TypeScript

## Alternatives Considered

| Option | Pros | Cons | Decision |
|--------|------|------|----------|
| JavaScript | No build step | No type safety | Rejected |
| Python | Simple syntax | Different ecosystem | Rejected |
| Rust | Performance | Steep learning curve | Rejected |

## Compliance
- All source files MUST have `.ts` extension
- All code MUST pass `tsc --strict` without errors
- No use of `any` type except in exceptional cases
