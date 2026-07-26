/**
 * Clipboard Service: Copia texto para a área de transferência.
 */

class ClipboardService {
    async copyText(text, buttonElement = null) {
        let success = false;
        try {
            if (navigator.clipboard && navigator.clipboard.writeText) {
                await navigator.clipboard.writeText(text);
                success = true;
            } else {
                throw new Error("Clipboard API not available");
            }
        } catch (err) {
            console.warn('[ClipboardService] Clipboard API falhou, tentando fallback: ', err);
            try {
                const textArea = document.createElement("textarea");
                textArea.value = text;
                textArea.style.position = "fixed";
                textArea.style.left = "-999999px";
                textArea.style.top = "-999999px";
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                success = document.execCommand('copy');
                textArea.remove();
            } catch (fallbackErr) {
                console.error('[ClipboardService] Fallback falhou: ', fallbackErr);
                success = false;
            }
        }

        if (success) {
            if (window.rgEventBus) {
                window.rgEventBus.emit('toast:show', {
                    message: 'Prompt copiado com sucesso!',
                    type: 'success'
                });
            }

            if (buttonElement) {
                const originalText = buttonElement.innerHTML;
                buttonElement.classList.add('copied');
                buttonElement.innerHTML = '<span>✅</span> Copiado';
                
                setTimeout(() => {
                    buttonElement.classList.remove('copied');
                    buttonElement.innerHTML = originalText;
                }, 2000);
            }
            
            return true;
        } else {
            if (window.rgEventBus) {
                window.rgEventBus.emit('toast:show', {
                    message: 'Falha ao copiar. Por favor, selecione e copie manualmente.',
                    type: 'error'
                });
            }
            return false;
        }
    }
}

const clipboardService = new ClipboardService();
window.rgClipboard = clipboardService;
