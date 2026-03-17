import type { Note } from '../entities/Note.js';

/**
 * Repository interface for Note persistence.
 * Follows Interface Segregation Principle - only essential CRUD operations.
 */
export interface INoteRepository {
  /**
   * Find a note by its unique identifier.
   */
  findById(id: string): Promise<Note | null>;

  /**
   * Find a note by its file path.
   */
  findByPath(path: string): Promise<Note | null>;

  /**
   * Retrieve all notes from the vault.
   */
  findAll(): Promise<Note[]>;

  /**
   * Persist a note to storage.
   */
  save(note: Note): Promise<void>;

  /**
   * Delete a note by its identifier.
   * @returns true if deleted, false if not found
   */
  delete(id: string): Promise<boolean>;

  /**
   * Search notes by content query.
   */
  search(query: string): Promise<Note[]>;
}
