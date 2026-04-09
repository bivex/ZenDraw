import { PatternGenerator } from './patterns.js';

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('pattern-canvas');
    const generator = new PatternGenerator(canvas);

    // UI Elements
    const generateBtn = document.getElementById('generate-btn');
    const clearBtn = document.getElementById('clear-btn');
    const difficultySelect = document.getElementById('difficulty');
    const downloadBtn = document.getElementById('download-btn');
    const selectAllBtn = document.getElementById('select-all');
    const deselectAllBtn = document.getElementById('deselect-all');
    const zoomInBtn = document.getElementById('zoom-in');
    const zoomOutBtn = document.getElementById('zoom-out');
    const zoomResetBtn = document.getElementById('zoom-reset');
    const zoomLevelDisplay = document.getElementById('zoom-level');
    const canvasWrapper = document.querySelector('.canvas-wrapper');

    // Exercise Type Checkboxes - Grouped by category for logic but mapped as single object
    const types = {
        // Lines & Accuracy
        straight: document.getElementById('type-straight'),
        zigzag: document.getElementById('type-zigzag'),
        chains: document.getElementById('type-chains'),
        // Flow & Rhythm
        wavy: document.getElementById('type-wavy'),
        ornament: document.getElementById('type-ornament'),
        ribbon: document.getElementById('type-ribbon'),
        // Form & Perspective
        spiral: document.getElementById('type-spiral'),
        planes: document.getElementById('type-planes'),
        contours: document.getElementById('type-contours'),
        funnel: document.getElementById('type-funnel'),
        forms: document.getElementById('type-forms'),
        organic: document.getElementById('type-organic'),
        shadows: document.getElementById('type-shadows'),
        boxes: document.getElementById('type-boxes'),
        // Tone & Texture
        intersect: document.getElementById('type-intersect'),
        pressure: document.getElementById('type-pressure'),
        gradient: document.getElementById('type-gradient'),
        textures: document.getElementById('type-textures'),
        negative: document.getElementById('type-negative'),
        // Biology & Anatomy
        face: document.getElementById('type-face'),
        eye: document.getElementById('type-eye'),
        hand: document.getElementById('type-hand'),
        figure: document.getElementById('type-figure'),
        skull: document.getElementById('type-skull'),
        torso: document.getElementById('type-torso')
    };

    // Zoom State
    let currentZoom = 1;

    function updateZoom(newZoom) {
        currentZoom = Math.min(Math.max(0.5, newZoom), 3);
        canvasWrapper.style.transform = `scale(${currentZoom})`;
        zoomLevelDisplay.textContent = `${Math.round(currentZoom * 100)}%`;
    }

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
        if (types.zigzag.checked) generator.drawZigzags();
        if (types.chains.checked) generator.drawChains();
        
        if (types.wavy.checked) generator.drawWavyLines();
        if (types.ornament.checked) generator.drawOrnaments();
        if (types.ribbon.checked) generator.drawRibbon();
        
        if (types.spiral.checked) generator.drawSpirals();
        if (types.planes.checked) generator.drawPlanes();
        if (types.contours.checked) generator.drawContours();
        if (types.funnel.checked) generator.drawFunnels();
        if (types.forms.checked) generator.drawForms();
        if (types.organic.checked) generator.drawOrganic();
        if (types.shadows.checked) generator.drawShadows();
        if (types.boxes.checked) generator.draw3DBoxes();
        
        if (types.intersect.checked) generator.drawIntersectingLines();
        if (types.pressure.checked) generator.drawPressure();
        if (types.gradient.checked) generator.drawGradient();
        if (types.textures.checked) generator.drawTextures();
        if (types.negative.checked) generator.drawNegative();

        if (types.face.checked) generator.drawFaceProportions();
        if (types.eye.checked) generator.drawEyeAnatomy();
        if (types.hand.checked) generator.drawHandFramework();
        if (types.figure.checked) generator.drawFigureProportions();
        if (types.skull.checked) generator.drawSkullConstruction();
        if (types.torso.checked) generator.drawTorsoStructure();
    }

    // Event Listeners
    const randomBtn = document.getElementById('random-btn');

    randomBtn.addEventListener('click', () => {
        // Deselect all
        Object.values(types).forEach(cb => { if(cb) cb.checked = false; });
        
        // Pick 1-3 random keys
        const keys = Object.keys(types);
        const count = 1 + Math.floor(Math.random() * 2); // 1 or 2 (keep it simple as requested)
        
        for (let i = 0; i < count; i++) {
            const randomKey = keys[Math.floor(Math.random() * keys.length)];
            types[randomKey].checked = true;
        }

        generatePattern();
    });

    generateBtn.addEventListener('click', () => {
        canvas.style.opacity = '0';
        setTimeout(() => {
            generatePattern();
            canvas.style.opacity = '1';
        }, 150);
    });

    clearBtn.addEventListener('click', () => {
        generator.clear();
    });

    selectAllBtn.addEventListener('click', () => {
        Object.values(types).forEach(cb => { if(cb) cb.checked = true; });
        generatePattern();
    });

    deselectAllBtn.addEventListener('click', () => {
        Object.values(types).forEach(cb => { if(cb) cb.checked = false; });
        generatePattern();
    });

    difficultySelect.addEventListener('change', () => {
        generatePattern();
    });

    zoomInBtn.addEventListener('click', () => updateZoom(currentZoom + 0.1));
    zoomOutBtn.addEventListener('click', () => updateZoom(currentZoom - 0.1));
    zoomResetBtn.addEventListener('click', () => updateZoom(1));

    downloadBtn.addEventListener('click', () => {
        const link = document.createElement('a');
        link.download = `zendraw-exercise-${Date.now()}.png`;
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

    window.addEventListener('wheel', (e) => {
        if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            const delta = e.deltaY > 0 ? -0.1 : 0.1;
            updateZoom(currentZoom + delta);
        }
    }, { passive: false });

    // Initial load
    initCanvas();
    canvas.style.transition = 'opacity 0.2s ease-in-out';
});
