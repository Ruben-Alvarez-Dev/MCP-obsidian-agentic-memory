import * as fs from 'fs/promises';
import * as path from 'path';
/**
 * Note entity representing a single markdown file in the vault.
 * Follows Single Responsibility Principle - only handles note data.
 */
export class Note {
    id;
    path;
    content;
    frontmatter;
    createdAt;
    updatedAt;
    constructor(id, notePath, content, frontmatter, createdAt, updatedAt) {
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
    static async fromFile(filePath) {
        const rawContent = await fs.readFile(filePath, 'utf-8');
        return Note.fromMarkdown(rawContent, filePath);
    }
    /**
     * Parse markdown content into a Note.
     */
    static fromMarkdown(rawContent, filePath) {
        const { frontmatter, content } = Note.parseFrontmatter(rawContent);
        const id = Note.generateId(filePath);
        const now = new Date();
        return new Note(id, filePath, content, frontmatter, frontmatter.created ?? now, now);
    }
    /**
     * Convert note to markdown with frontmatter.
     */
    toMarkdown() {
        const fm = this.formatFrontmatter();
        return `---\n${fm}\n---\n\n${this.content}`;
    }
    /**
     * Generate a unique ID from file path.
     */
    static generateId(filePath) {
        const basename = path.basename(filePath, '.md');
        const hash = Buffer.from(filePath).toString('base64').slice(0, 8);
        return `${basename}-${hash}`;
    }
    /**
     * Parse YAML frontmatter from raw content.
     */
    static parseFrontmatter(rawContent) {
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
    static parseYamlFrontmatter(yaml) {
        const lines = yaml.split('\n');
        const result = {};
        for (const line of lines) {
            const [key, ...valueParts] = line.split(':');
            if (key && valueParts.length > 0) {
                const value = valueParts.join(':').trim();
                result[key.trim()] = Note.parseYamlValue(value);
            }
        }
        return {
            created: result.created instanceof Date ? result.created : new Date(),
            type: ['project', 'daily', 'memory', 'template'].includes(result.type)
                ? result.type
                : 'memory',
            tags: Array.isArray(result.tags) ? result.tags : [],
            ...result,
        };
    }
    /**
     * Parse a YAML value.
     */
    static parseYamlValue(value) {
        if (value.startsWith('[') && value.endsWith(']')) {
            return value
                .slice(1, -1)
                .split(',')
                .map((s) => s.trim().replace(/^["']|["']$/g, ''));
        }
        if (value === 'true')
            return true;
        if (value === 'false')
            return false;
        if (/^\d+$/.test(value))
            return parseInt(value, 10);
        return value.replace(/^["']|["']$/g, '');
    }
    /**
     * Create default frontmatter.
     */
    static defaultFrontmatter() {
        return {
            created: new Date(),
            type: 'memory',
            tags: [],
        };
    }
    /**
     * Format frontmatter as YAML.
     */
    formatFrontmatter() {
        const lines = [];
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
//# sourceMappingURL=Note.js.map