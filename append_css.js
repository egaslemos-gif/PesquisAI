const fs = require('fs');

const cssToAppend = `
/* Navigation Dropdown Container */
.nav-dropdown {
    display: flex;
    align-items: center;
    gap: var(--space-4);
}

@media (max-width: 1024px) {
    .nav-dropdown {
        display: none;
        position: absolute;
        top: 60px;
        left: var(--space-4);
        background: var(--color-white);
        flex-direction: column;
        align-items: stretch;
        padding: var(--space-4);
        border-radius: var(--radius-md);
        box-shadow: var(--shadow-lg);
        z-index: 1000;
        min-width: 200px;
        border: 1px solid var(--color-gray-200);
    }

    .nav-dropdown.active {
        display: flex;
    }
    
    .nav-dropdown .btn-app-bar {
        color: var(--color-gray-800);
        justify-content: flex-start;
        padding: var(--space-3) var(--space-4);
        height: auto;
        width: 100%;
        border-radius: var(--radius-sm);
    }
    
    .nav-dropdown .btn-app-bar:hover {
        background: var(--color-gray-100);
        color: var(--color-gray-900);
    }

    .nav-dropdown .btn-app-bar.active {
        background: var(--color-primary-50);
        color: var(--color-primary-700);
    }
    
    .nav-dropdown .icon-slot {
        color: var(--color-primary-600);
        transform: none;
        position: static;
    }
    
    .nav-dropdown .btn-text {
        display: inline !important;
    }
}
`;

fs.appendFileSync('src/css/main.css', cssToAppend);
console.log('CSS appended.');
