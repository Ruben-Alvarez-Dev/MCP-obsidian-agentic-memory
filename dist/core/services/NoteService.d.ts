import type { INoteRepository } from '../interfaces/INoteRepository.js';
import type { Note } from '../entities/Note.js';
/**
 * Service for note-related business logic.
 * Follows Single Responsibility Principle.
 */
export declare class NoteService {
    private readonly repository;
    constructor(repository: INoteRepository);
    /**
     * Get a note by ID.
     */
    getNote(id: string): Promise<Note | null>;
    /**
     * Create or update a note.
     */
    saveNote(note: Note): Promise<void>;
    /**
     * Delete a note.
     */
    deleteNote(id: string): Promise<boolean>;
    /**
     * Search notes by query.
     */
    searchNotes(query: string): Promise<Note[]>;
    /**
     * Get all notes.
     */
    getAllNotes(): Promise<Note[]>;
}
//# sourceMappingURL=NoteService.d.ts.map