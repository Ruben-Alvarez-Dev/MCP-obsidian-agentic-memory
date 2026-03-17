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
export declare class Note {
    readonly id: string;
    readonly path: string;
    content: string;
    frontmatter: NoteFrontmatter;
    readonly createdAt: Date;
    updatedAt: Date;
    constructor(id: string, notePath: string, content: string, frontmatter: NoteFrontmatter, createdAt: Date, updatedAt: Date);
    /**
     * Create a Note from a file path.
     */
    static fromFile(filePath: string): Promise<Note>;
    /**
     * Parse markdown content into a Note.
     */
    static fromMarkdown(rawContent: string, filePath: string): Note;
    /**
     * Convert note to markdown with frontmatter.
     */
    toMarkdown(): string;
    /**
     * Generate a unique ID from file path.
     */
    private static generateId;
    /**
     * Parse YAML frontmatter from raw content.
     */
    private static parseFrontmatter;
    /**
     * Parse simple YAML frontmatter.
     */
    private static parseYamlFrontmatter;
    /**
     * Parse a YAML value.
     */
    private static parseYamlValue;
    /**
     * Create default frontmatter.
     */
    private static defaultFrontmatter;
    /**
     * Format frontmatter as YAML.
     */
    private formatFrontmatter;
}
//# sourceMappingURL=Note.d.ts.map