import * as fs from 'fs/promises';
import * as path from 'path';

/**
 * Frontmatter structure for Obsidian-compatible notes.
 */
export interface NoteFrontmatter {
  created: Date;
  type: 'project' | 'daily' | 'memory' | 'template';
  tags: string[];
  [key: string]: unknown;
}

/**
 * Note entity representing a single markdown file in the vault.
 * Follows Single Responsibility Principle - only handles note data.
 */
export class Note {
  public readonly id: string;
  public readonly path: string;
  public content: string;
  public frontmatter: NoteFrontmatter;
  public readonly createdAt: Date;
  public updatedAt: Date;

  constructor(
    id: string,
    notePath: string,
    content: string,
    frontmatter: NoteFrontmatter,
    createdAt: Date,
    updatedAt: Date
  ) {
    this.id = id;
    this.path = notePath;
    this.content = content;
    this.frontmatter = frontmatter;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  /**
   * Create a Note from a file path.
   */
  public static async fromFile(filePath: string): Promise<Note> {
    const rawContent = await fs.readFile(filePath, 'utf-8');
    return Note.fromMarkdown(rawContent, filePath);
  }

  /**
   * Parse markdown content into a Note.
   */
  public static fromMarkdown(rawContent: string, filePath: string): Note {
    const { frontmatter, content } = Note.parseFrontmatter(rawContent);
    const id = Note.generateId(filePath);
    const now = new Date();

    return new Note(
      id,
      filePath,
      content,
      frontmatter,
      frontmatter.created ?? now,
      now
    );
  }

  /**
   * Convert note to markdown with frontmatter.
   */
  public toMarkdown(): string {
    const fm = this.formatFrontmatter();
    return `---\n${fm}\n---\n\n${this.content}`;
  }

  /**
   * Generate a unique ID from file path.
   */
  private static generateId(filePath: string): string {
    const basename = path.basename(filePath, '.md');
    const hash = Buffer.from(filePath).toString('base64').slice(0, 8);
    return `${basename}-${hash}`;
  }

  /**
   * Parse YAML frontmatter from raw content.
   */
  private static parseFrontmatter(rawContent: string): {
    frontmatter: NoteFrontmatter;
    content: string;
  } {
    const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
    const match = rawContent.match(frontmatterRegex);

    if (!match) {
      return {
        frontmatter: Note.defaultFrontmatter(),
        content: rawContent.trim(),
      };
    }

    const [, fmRaw, content] = match;
    const frontmatter = Note.parseYamlFrontmatter(fmRaw ?? '');

    return { frontmatter, content: (content ?? '').trim() };
  }

  /**
   * Parse simple YAML frontmatter.
   */
  private static parseYamlFrontmatter(yaml: string): NoteFrontmatter {
    const lines = yaml.split('\n');
    const result: Record<string, unknown> = {};

    for (const line of lines) {
      const [key, ...valueParts] = line.split(':');
      if (key && valueParts.length > 0) {
        const value = valueParts.join(':').trim();
        result[key.trim()] = Note.parseYamlValue(value);
      }
    }

    return {
      created: result.created instanceof Date ? result.created : new Date(),
      type: ['project', 'daily', 'memory', 'template'].includes(
        result.type as string
      )
        ? (result.type as NoteFrontmatter['type'])
        : 'memory',
      tags: Array.isArray(result.tags) ? (result.tags as string[]) : [],
      ...result,
    };
  }

  /**
   * Parse a YAML value.
   */
  private static parseYamlValue(value: string): unknown {
    if (value.startsWith('[') && value.endsWith(']')) {
      return value
        .slice(1, -1)
        .split(',')
        .map((s) => s.trim().replace(/^["']|["']$/g, ''));
    }
    if (value === 'true') return true;
    if (value === 'false') return false;
    if (/^\d+$/.test(value)) return parseInt(value, 10);
    return value.replace(/^["']|["']$/g, '');
  }

  /**
   * Create default frontmatter.
   */
  private static defaultFrontmatter(): NoteFrontmatter {
    return {
      created: new Date(),
      type: 'memory',
      tags: [],
    };
  }

  /**
   * Format frontmatter as YAML.
   */
  private formatFrontmatter(): string {
    const lines: string[] = [];
    lines.push(`created: ${this.frontmatter.created.toISOString().split('T')[0]}`);
    lines.push(`type: ${this.frontmatter.type}`);
    lines.push(`tags: [${this.frontmatter.tags.join(', ')}]`);

    for (const [key, value] of Object.entries(this.frontmatter)) {
      if (!['created', 'type', 'tags'].includes(key)) {
        lines.push(`${key}: ${String(value)}`);
      }
    }

    return lines.join('\n');
  }
}
