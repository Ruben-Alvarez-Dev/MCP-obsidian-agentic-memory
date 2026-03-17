/**
 * Service for note-related business logic.
 * Follows Single Responsibility Principle.
 */
export class NoteService {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    /**
     * Get a note by ID.
     */
    async getNote(id) {
        return this.repository.findById(id);
    }
    /**
     * Create or update a note.
     */
    async saveNote(note) {
        note.updatedAt = new Date();
        await this.repository.save(note);
    }
    /**
     * Delete a note.
     */
    async deleteNote(id) {
        return this.repository.delete(id);
    }
    /**
     * Search notes by query.
     */
    async searchNotes(query) {
        return this.repository.search(query);
    }
    /**
     * Get all notes.
     */
    async getAllNotes() {
        return this.repository.findAll();
    }
}
//# sourceMappingURL=NoteService.js.map