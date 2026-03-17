import type { INoteRepository } from '../../core/interfaces/INoteRepository.js';
import { Note } from '../../core/entities/Note.js';
/**
 * File system implementation of INoteRepository.
 */
export declare class FileSystemNoteRepository implements INoteRepository {
    private readonly vaultPath;
    private readonly notes;
    constructor(vaultPath: string);
    findById(id: string): Promise<Note | null>;
    findByPath(notePath: string): Promise<Note | null>;
    findAll(): Promise<Note[]>;
    save(note: Note): Promise<void>;
    delete(id: string): Promise<boolean>;
    search(query: string): Promise<Note[]>;
}
//# sourceMappingURL=FileSystemNoteRepository.d.ts.map