import type { INoteRepository } from '../interfaces/INoteRepository.js';
import type { Note } from '../entities/Note.js';

/**
 * Service for note-related business logic.
 * Follows Single Responsibility Principle.
 */
export class NoteService {
  constructor(private readonly repository: INoteRepository) {}

  /**
   * Get a note by ID.
   */
  public async getNote(id: string): Promise<Note | null> {
    return this.repository.findById(id);
  }

  /**
   * Create or update a note.
   */
  public async saveNote(note: Note): Promise<void> {
    note.updatedAt = new Date();
    await this.repository.save(note);
  }

  /**
   * Delete a note.
   */
  public async deleteNote(id: string): Promise<boolean> {
    return this.repository.delete(id);
  }

  /**
   * Search notes by query.
   */
  public async searchNotes(query: string): Promise<Note[]> {
    return this.repository.search(query);
  }

  /**
   * Get all notes.
   */
  public async getAllNotes(): Promise<Note[]> {
    return this.repository.findAll();
  }
}
