import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import * as fs from 'fs/promises';
import * as path from 'path';
import * as os from 'os';
import { Vault } from './Vault.js';
describe('Vault', () => {
    let tempDir;
    beforeEach(async () => {
        tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'vault-test-'));
    });
    afterEach(async () => {
        await fs.rm(tempDir, { recursive: true, force: true });
    });
    describe('create', () => {
        it('should create vault with default directories', async () => {
            const vault = await Vault.create(tempDir);
            expect(vault.path).toBe(tempDir);
            expect(vault.directories).toContain('Projects');
            expect(vault.directories).toContain('Daily');
            expect(vault.directories).toContain('Memory');
        });
        it('should create directories on disk', async () => {
            await Vault.create(tempDir);
            for (const dir of ['Projects', 'Daily', 'Memory', 'Templates', 'System']) {
                const stat = await fs.stat(path.join(tempDir, dir));
                expect(stat.isDirectory()).toBe(true);
            }
        });
    });
    describe('validate', () => {
        it('should return true for valid vault', async () => {
            const vault = await Vault.create(tempDir);
            const isValid = await vault.validate();
            expect(isValid).toBe(true);
        });
        it('should return false for missing directories', async () => {
            const vault = new Vault(tempDir);
            const isValid = await vault.validate();
            expect(isValid).toBe(false);
        });
    });
});
//# sourceMappingURL=Vault.test.js.map