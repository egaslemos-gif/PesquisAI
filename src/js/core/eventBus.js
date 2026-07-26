/**
 * EventBus: Sistema minimalista de Pub/Sub para desacoplar módulos.
 * Apenas eventos permitidos pela arquitetura (Rule #4 do user feedback).
 */

const ALLOWED_EVENTS = [
    'workspace:loaded',
    'workspace:updated',
    'workspace:created',
    'engine:stateChanged',
    'artifact:saved',
    'step:changed',
    'workflow:completed',
    'toast:show',
    'prompt:copied',
    'rid:loaded',
    'researchEvents:loaded',
    'research:updated'
];

class EventBus {
    constructor() {
        this.listeners = {};
    }

    on(event, callback) {
        if (!ALLOWED_EVENTS.includes(event)) {
            console.warn(`[EventBus] Tentativa de subscrição a evento não permitido: ${event}`);
            return;
        }

        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(callback);
    }

    emit(event, payload = null) {
        if (!ALLOWED_EVENTS.includes(event)) {
            console.warn(`[EventBus] Tentativa de emissão de evento não permitido: ${event}`);
            return;
        }

        if (this.listeners[event]) {
            this.listeners[event].forEach(callback => {
                try {
                    callback(payload);
                } catch (error) {
                    console.error(`[EventBus] Erro ao executar listener para ${event}:`, error);
                }
            });
        }
    }
}

// Exporta uma instância única (Singleton)
const eventBus = new EventBus();
// Torna global para uso sem módulos se carregado via <script>
window.rgEventBus = eventBus;
