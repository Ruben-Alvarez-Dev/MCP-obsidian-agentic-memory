import { describe, it, expect } from 'vitest';
import { Note } from './Note.js';

describe('Note', () => {
  describe('fromMarkdown', () => {
    it('should parse note with frontmatter', () => {
      const raw = `---
created: 2026-03-17
type: project
tags: [test, unit]
---

# Test Note
Content here.`;

      const note = Note.fromMarkdown(raw, '/test/note.md');

      expect(note.frontmatter.type).toBe('project');
      expect(note.frontmatter.tags).toEqual(['test', 'unit']);
      expect(note.content).toBe('# Test Note\nContent here.');
    });

    it('should use defaults for missing frontmatter', () => {
      const raw = `Just content without frontmatter.`;
      const note = Note.fromMarkdown(raw, '/test/note.md');

      expect(note.frontmatter.type).toBe('memory');
      expect(note.frontmatter.tags).toEqual([]);
    });
  });

  describe('toMarkdown', () => {
    it('should generate valid markdown with frontmatter', () => {
      const note = new Note(
        'test-id',
        '/test/note.md',
        'Content',
        { created: new Date('2026-03-17'), type: 'project', tags: ['a', 'b'] },
        new Date(),
        new Date()
      );

      const md = note.toMarkdown();

      expect(md).toContain('---');
      expect(md).toContain('type: project');
      expect(md).toContain('tags: [a, b]');
      expect(md).toContain('Content');
    });
  });
});
