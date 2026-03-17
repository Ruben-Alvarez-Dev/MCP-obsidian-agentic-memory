import * as fs from 'fs/promises';
import * as path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';
import type { INoteRepository } from '../../core/interfaces/INoteRepository.js';
import { Note } from '../../core/entities/Note.js';

const execAsync = promisify(exec);

/**
 * File system implementation of INoteRepository.
 */
export class FileSystemNoteRepository implements INoteRepository {
  private readonly vaultPath: string;
  private readonly notes: Map<string, Note> = new Map();

  constructor(vaultPath: string) {
    this.vaultPath = vaultPath;
  }

  public async findById(id: string): Promise<Note | null> {
    return this.notes.get(id) ?? null;
  }

  public async findByPath(notePath: string): Promise<Note | null> {
    try {
      return await Note.fromFile(notePath);
    } catch {
      return null;
    }
  }

  public async findAll(): Promise<Note[]> {
    const notes: Note[] = [];

    const scanDir = async (dir: string): Promise<void> => {
      try {
        const entries = await fs.readdir(dir, { withFileTypes: true });

        for (const entry of entries) {
          const fullPath = path.join(dir, entry.name);

          if (entry.isDirectory()) {
            await scanDir(fullPath);
          } else if (entry.isFile() && entry.name.endsWith('.md')) {
            const note = await Note.fromFile(fullPath);
            notes.push(note);
            this.notes.set(note.id, note);
          }
        }
      } catch {
        // Directory doesn't exist or can't be read
      }
    };

    await scanDir(this.vaultPath);
    return notes;
  }

  public async save(note: Note): Promise<void> {
    const dir = path.dirname(note.path);
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(note.path, note.toMarkdown(), 'utf-8');
    this.notes.set(note.id, note);
  }

  public async delete(id: string): Promise<boolean> {
    const note = this.notes.get(id);
    if (!note) return false;

    try {
      await fs.unlink(note.path);
      this.notes.delete(id);
      return true;
    } catch {
      return false;
    }
  }

  public async search(query: string): Promise<Note[]> {
    const results: Note[] = [];

    try {
      const { stdout } = await execAsync(
        `grep -rl "${query}" "${this.vaultPath}" --include="*.md" 2>/dev/null || true`
      );

      const files = stdout.trim().split('\n').filter(Boolean);

      for (const file of files) {
        const note = await this.findByPath(file);
        if (note) results.push(note);
      }
    } catch {
      // grep failed, return empty results
    }

    return results;
  }
}
