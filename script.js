import { PatternGenerator } from './patterns.js';

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('pattern-canvas');
    const generator = new PatternGenerator(canvas);

    // UI Elements
    const generateBtn = document.getElementById('generate-btn');
    const clearBtn = document.getElementById('clear-btn');
    const difficultySelect = document.getElementById('difficulty');
    const downloadBtn = document.getElementById('download-btn');

    // Checkboxes
    const types = {
        straight: document.getElementById('type-straight'),
        wavy: document.getElementById('type-wavy'),
        zigzag: document.getElementById('type-zigzag'),
        spiral: document.getElementById('type-spiral'),
        intersect: document.getElementById('type-intersect'),
        ornament: document.getElementById('type-ornament'),
        planes: document.getElementById('type-planes'),
        contours: document.getElementById('type-contours'),
        chains: document.getElementById('type-chains'),
        pressure: document.getElementById('type-pressure'),
        funnel: document.getElementById('type-funnel'),
        ribbon: document.getElementById('type-ribbon'),
        gradient: document.getElementById('type-gradient'),
        forms: document.getElementById('type-forms')
    };

    const selectAllBtn = document.getElementById('select-all');
    const deselectAllBtn = document.getElementById('deselect-all');

    selectAllBtn.addEventListener('click', () => {
        Object.values(types).forEach(cb => cb.checked = true);
        generatePattern();
    });

    deselectAllBtn.addEventListener('click', () => {
        Object.values(types).forEach(cb => cb.checked = false);
        generatePattern();
    });

    // Zoom Controls
    const zoomInBtn = document.getElementById('zoom-in');
    const zoomOutBtn = document.getElementById('zoom-out');
    const zoomResetBtn = document.getElementById('zoom-reset');
    const zoomLevelDisplay = document.getElementById('zoom-level');
    const canvasWrapper = document.querySelector('.canvas-wrapper');

    let currentZoom = 1;

    function updateZoom(newZoom) {
        currentZoom = Math.min(Math.max(0.5, newZoom), 3); // Limit 50% to 300%
        canvasWrapper.style.transform = `scale(${currentZoom})`;
        zoomLevelDisplay.textContent = `${Math.round(currentZoom * 100)}%`;
    }

    zoomInBtn.addEventListener('click', () => updateZoom(currentZoom + 0.1));
    zoomOutBtn.addEventListener('click', () => updateZoom(currentZoom - 0.1));
    zoomResetBtn.addEventListener('click', () => updateZoom(1));

    // Optional: Mouse wheel zoom
    window.addEventListener('wheel', (e) => {
        if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            const delta = e.deltaY > 0 ? -0.1 : 0.1;
            updateZoom(currentZoom + delta);
        }
    }, { passive: false });

    // Initialize Canvas Size
    function initCanvas() {
        generator.resize();
        generatePattern();
    }

    // Generate Pattern based on selected types
    function generatePattern() {
        generator.clear();
        generator.setDifficulty(difficultySelect.value);

        if (types.straight.checked) generator.drawStraightLines();
        if (types.wavy.checked) generator.drawWavyLines();
        if (types.zigzag.checked) generator.drawZigzags();
        if (types.spiral.checked) generator.drawSpirals();
        if (types.intersect.checked) generator.drawIntersectingLines();
        if (types.ornament.checked) generator.drawOrnaments();
        if (types.planes.checked) generator.drawPlanes();
        if (types.contours.checked) generator.drawContours();
        if (types.chains.checked) generator.drawChains();
        if (types.pressure.checked) generator.drawPressure();
        if (types.funnel.checked) generator.drawFunnels();
        if (types.ribbon.checked) generator.drawRibbon();
        if (types.gradient.checked) generator.drawGradient();
        if (types.forms.checked) generator.drawForms();
    }

    // Event Listeners
    generateBtn.addEventListener('click', () => {
        // Add a small animation effect to the canvas on click
        canvas.style.opacity = '0';
        setTimeout(() => {
            generatePattern();
            canvas.style.opacity = '1';
        }, 150);
    });

    clearBtn.addEventListener('click', () => {
        generator.clear();
    });

    difficultySelect.addEventListener('change', () => {
        generatePattern();
    });

    downloadBtn.addEventListener('click', () => {
        const link = document.createElement('a');
        link.download = `zendraw-pattern-${Date.now()}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
    });

    // Handle Window Resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            initCanvas();
        }, 250);
    });

    // Initial load
    initCanvas();
    
    // Add CSS transition for opacity
    canvas.style.transition = 'opacity 0.2s ease-in-out';
});
