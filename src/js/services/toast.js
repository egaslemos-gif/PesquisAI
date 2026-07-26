/**
 * Toast Service: Feedback visual para o utilizador.
 */

class ToastService {
    constructor() {
        this.containerId = 'toast-container';
    }

    init() {
        if (!document.getElementById(this.containerId)) {
            const container = document.createElement('div');
            container.id = this.containerId;
            container.className = 'toast-container';
            document.body.appendChild(container);
        }
        
        // Ouve eventos do EventBus
        if (window.rgEventBus) {
            window.rgEventBus.on('toast:show', (payload) => this.show(payload.message, payload.type));
        }
    }

    /**
     * Mostra um toast
     * @param {string} message A mensagem a mostrar
     * @param {string} type 'success', 'warning', 'info' ou 'error'
     */
    show(message, type = 'info', title = null) {
        const container = document.getElementById(this.containerId);
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.style.cssText = `
            display: flex;
            align-items: flex-start;
            gap: 12px;
            background: white;
            padding: 16px;
            border-radius: 8px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.1);
            border-left: 4px solid var(--color-${type === 'error' ? 'error' : type === 'success' ? 'success' : type === 'warning' ? 'warning' : 'primary'}-500);
            min-width: 300px;
            pointer-events: auto;
            position: relative;
            transform: translateY(20px);
            opacity: 0;
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        `;
        
        // Ícone por tipo
        const icons = {
            success: window.SVGIcons ? window.SVGIcons.checkCircle : '✅',
            warning: window.SVGIcons ? window.SVGIcons.alertTriangle : '⚠️',
            info: window.SVGIcons ? window.SVGIcons.info : 'ℹ️',
            error: window.SVGIcons ? window.SVGIcons.xCircle : '❌'
        };
        
        const defaultTitles = {
            success: 'Sucesso',
            warning: 'Aviso',
            info: 'Informação',
            error: 'Erro'
        };
        
        const iconColor = `var(--color-${type === 'error' ? 'error' : type === 'success' ? 'success' : type === 'warning' ? 'warning' : 'primary'}-600)`;

        toast.innerHTML = `
            <div class="toast-icon" style="color: ${iconColor}; display: flex; align-items: center; justify-content: center; width: 24px; height: 24px;">
                ${icons[type] || icons.info}
            </div>
            <div style="flex: 1; display: flex; flex-direction: column;">
                <span style="font-weight: var(--font-semibold); font-size: var(--text-sm); color: var(--color-gray-900); margin-bottom: 2px;">
                    ${title || defaultTitles[type]}
                </span>
                <span class="toast-message" style="font-size: var(--text-sm); color: var(--color-gray-600); line-height: 1.4;">
                    ${message}
                </span>
            </div>
            <button class="toast-close" style="background: none; border: none; cursor: pointer; color: var(--color-gray-400); padding: 4px; border-radius: 4px; display: flex; align-items: center; justify-content: center; transition: all 0.2s;">
                ${window.SVGIcons ? window.SVGIcons.x : '✕'}
            </button>
        `;

        container.appendChild(toast);
        
        // Entrada com animação
        requestAnimationFrame(() => {
            toast.style.transform = 'translateY(0)';
            toast.style.opacity = '1';
        });

        // Evento de fechar manual
        const closeBtn = toast.querySelector('.toast-close');
        if (closeBtn) {
            closeBtn.addEventListener('mouseenter', () => closeBtn.style.background = 'var(--color-gray-100)');
            closeBtn.addEventListener('mouseleave', () => closeBtn.style.background = 'transparent');
            closeBtn.addEventListener('click', () => {
                toast.style.transform = 'translateY(-10px)';
                toast.style.opacity = '0';
                setTimeout(() => {
                    if (toast.parentNode) toast.parentNode.removeChild(toast);
                }, 300);
            });
        }

        // Remove após 5 segundos
        setTimeout(() => {
            if (toast.parentNode) {
                toast.style.transform = 'translateY(-10px)';
                toast.style.opacity = '0';
                setTimeout(() => {
                    if (toast.parentNode) toast.parentNode.removeChild(toast);
                }, 300);
            }
        }, 5000);
    }
}

const toastService = new ToastService();
window.rgToast = toastService;
