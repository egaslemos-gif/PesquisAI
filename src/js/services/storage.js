/**
 * Storage Service: Gere a persistência usando LocalStorage.
 * Prefixo oficial: rg_
 */

const PREFIX = 'rg_';

class StorageService {
    constructor() {
        this.storage = window.localStorage;
    }

    _getKey(key) {
        return `${PREFIX}${key}`;
    }

    saveWorkspace(workspaceId, workspaceData) {
        if (!workspaceId) {
            console.error('[StorageService] Erro: workspaceId não fornecido.');
            return false;
        }
        try {
            const serialized = JSON.stringify(workspaceData);
            this.storage.setItem(this._getKey(`workspace_${workspaceId}`), serialized);
            return true;
        } catch (error) {
            console.error('[StorageService] Erro ao guardar workspace:', error);
            // Emite erro se o eventBus já estiver carregado
            if (window.rgEventBus) {
                window.rgEventBus.emit('toast:show', {
                    message: 'Erro ao guardar dados locais. Pode estar sem espaço.',
                    type: 'error'
                });
            }
            return false;
        }
    }

    loadWorkspace(workspaceId) {
        if (!workspaceId) return null;
        try {
            const serialized = this.storage.getItem(this._getKey(`workspace_${workspaceId}`));
            if (!serialized) return null;
            return JSON.parse(serialized);
        } catch (error) {
            console.error('[StorageService] Erro ao carregar workspace:', error);
            return null;
        }
    }

    clearWorkspace(workspaceId) {
        if (workspaceId) {
            this.storage.removeItem(this._getKey(`workspace_${workspaceId}`));
        }
    }

    duplicateWorkspace(workspaceId, newTitle) {
        const originalData = this.loadWorkspace(workspaceId);
        if (!originalData) return null;

        // Generate new ID
        let newId;
        if (typeof crypto !== 'undefined' && crypto.randomUUID) {
            newId = `ws_${crypto.randomUUID().split('-')[0]}`;
        } else {
            newId = `ws_${Math.random().toString(36).substring(2, 10)}`;
        }

        // Clone data
        const newData = JSON.parse(JSON.stringify(originalData));
        newData.id = newId;
        newData.area = newTitle || `${originalData.area || 'Investigação'} (Cópia)`;

        // Save new workspace
        this.saveWorkspace(newId, newData);
        
        // Let ResearchIdentity know via event
        if (window.rgEventBus) {
            // Emulate a save to upsert into registry
            window.rgEventBus.emit('workspace:created', newData);
        }

        return newId;
    }

    renameWorkspace(workspaceId, newTitle) {
        if (!workspaceId || !newTitle) return false;
        
        const data = this.loadWorkspace(workspaceId);
        if (!data) return false;
        
        data.area = newTitle;
        this.saveWorkspace(workspaceId, data);
        
        // Notify
        if (window.rgEventBus) {
            window.rgEventBus.emit('workspace:updated', { workspace: data });
        }
        return true;
    }

    // Helper temporário para a migração automática na primeira vez
    getLegacyWorkspace() {
        try {
            const serialized = this.storage.getItem(this._getKey('workspace'));
            if (!serialized) return null;
            return JSON.parse(serialized);
        } catch (error) {
            return null;
        }
    }

    removeLegacyWorkspace() {
        this.storage.removeItem(this._getKey('workspace'));
    }
}

const storage = new StorageService();
window.rgStorage = storage;
