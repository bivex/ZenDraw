/**
 * Academic Drawing Exercises Module
 * Focuses on muscle memory, precision, and stroke confidence.
 */

export class PatternGenerator {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.width = canvas.width;
        this.height = canvas.height;
        this.difficulty = 'medium';
    }

    setDifficulty(difficulty) {
        this.difficulty = difficulty;
    }

    clear() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    }

    resize() {
        const dpr = window.devicePixelRatio || 1;
        const rect = this.canvas.getBoundingClientRect();
        this.canvas.width = Math.floor(rect.width * dpr);
        this.canvas.height = Math.floor(rect.height * dpr);
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.ctx.scale(dpr, dpr);
        this.width = rect.width;
        this.height = rect.height;
    }

    getSettings() {
        const d = this.difficulty;
        return {
            count: d === 'easy' ? 6 : (d === 'medium' ? 12 : 24),
            spacing: d === 'easy' ? 60 : (d === 'medium' ? 40 : 25),
            lineWidth: d === 'easy' ? 1.5 : (d === 'medium' ? 1 : 0.7),
            pointSize: d === 'easy' ? 3 : (d === 'medium' ? 2 : 1.5)
        };
    }

    setupStroke(isGuide = false) {
        this.ctx.strokeStyle = isGuide ? 'rgba(0, 0, 0, 0.15)' : 'rgba(30, 30, 30, 0.8)';
        this.ctx.fillStyle = 'rgba(30, 30, 30, 0.8)';
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';
        this.ctx.lineWidth = this.getSettings().lineWidth;
    }

    drawPoint(x, y) {
        const size = this.getSettings().pointSize;
        this.ctx.beginPath();
        this.ctx.arc(x, y, size, 0, Math.PI * 2);
        this.ctx.fill();
    }

    /**
     * Exercise 1: Ghosted Lines
     * Training: Accuracy and straight strokes between two points.
     */
    drawStraightLines() {
        this.setupStroke(true); // Draw guides as faint lines
        const { count } = this.getSettings();
        const margin = 60;

        for (let i = 0; i < count; i++) {
            const x1 = margin + Math.random() * (this.width - margin * 2);
            const y1 = margin + Math.random() * (this.height - margin * 2);
            const x2 = margin + Math.random() * (this.width - margin * 2);
            const y2 = margin + Math.random() * (this.height - margin * 2);

            // Draw start and end points
            this.drawPoint(x1, y1);
            this.drawPoint(x2, y2);

            // Draw a very faint guide line
            this.ctx.beginPath();
            this.ctx.setLineDash([5, 10]);
            this.ctx.moveTo(x1, y1);
            this.ctx.lineTo(x2, y2);
            this.ctx.stroke();
            this.ctx.setLineDash([]);
        }
    }

    /**
     * Exercise 2: S-Curves & Flow
     * Training: Controlled curves and shoulder movement.
     */
    drawWavyLines() {
        this.setupStroke();
        const { count, spacing } = this.getSettings();
        const margin = 80;

        for (let i = 0; i < count / 2; i++) {
            const baseY = margin + i * (spacing * 2);
            if (baseY > this.height - margin) break;

            this.ctx.beginPath();
            this.ctx.moveTo(margin, baseY);
            
            const cp1x = margin + (this.width - margin * 2) * 0.33;
            const cp1y = baseY - spacing * 2;
            const cp2x = margin + (this.width - margin * 2) * 0.66;
            const cp2y = baseY + spacing * 2;
            const x2 = this.width - margin;
            const y2 = baseY;

            this.ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x2, y2);
            this.ctx.stroke();
            
            // Draw hints for curve peaks
            this.drawPoint(cp1x, cp1y);
            this.drawPoint(cp2x, cp2y);
        }
    }

    /**
     * Exercise 3: Sharp Turns (Zigzags)
     * Training: Sudden changes in direction and joint control.
     */
    drawZigzags() {
        this.setupStroke();
        const { count, spacing } = this.getSettings();
        const margin = 60;

        for (let i = 0; i < count / 3; i++) {
            const x = margin + Math.random() * (this.width - margin * 2);
            let y = margin;
            this.ctx.beginPath();
            this.ctx.moveTo(x, y);
            
            while (y < this.height - margin) {
                const step = 40 + Math.random() * 60;
                const offset = (Math.random() - 0.5) * 100;
                y += step;
                this.ctx.lineTo(x + offset, y);
                this.drawPoint(x + offset, y);
            }
            this.ctx.stroke();
        }
    }

    /**
     * Exercise 4: Confidence Ovals
     * Training: Circular motion and repeating the same path.
     */
    drawSpirals() {
        this.setupStroke(true);
        const { count } = this.getSettings();
        const rows = Math.ceil(Math.sqrt(count));
        const cols = rows;
        const cellW = this.width / (cols + 1);
        const cellH = this.height / (rows + 1);

        for (let r = 1; r <= rows; r++) {
            for (let c = 1; c <= cols; c++) {
                const cx = c * cellW;
                const cy = r * cellH;
                const rx = cellW * 0.4;
                const ry = cellH * 0.3;
                
                // Draw guides
                this.ctx.beginPath();
                this.ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
                this.ctx.setLineDash([2, 4]);
                this.ctx.stroke();
                this.ctx.setLineDash([]);
                
                // Center point
                this.drawPoint(cx, cy);
            }
        }
    }

    /**
     * Exercise 5: Cross-Hatching (Tonal control)
     * Training: Parallelism and density.
     */
    drawIntersectingLines() {
        this.setupStroke();
        const { count, spacing } = this.getSettings();
        const boxSize = 120;
        const margin = 80;

        for (let i = 0; i < 4; i++) {
            const x = margin + (i % 2) * (this.width - margin * 2 - boxSize);
            const y = margin + Math.floor(i / 2) * (this.height - margin * 2 - boxSize);
            
            this.drawHatchingBox(x, y, boxSize, spacing);
        }
    }

    drawHatchingBox(x, y, size, spacing) {
        this.ctx.strokeRect(x, y, size, size);
        
        // Horizontal hatching
        this.ctx.beginPath();
        for (let i = spacing; i < size; i += spacing) {
            this.ctx.moveTo(x, y + i);
            this.ctx.lineTo(x + size, y + i);
        }
        this.ctx.stroke();

        // Diagonal hatching
        this.ctx.beginPath();
        for (let i = spacing; i < size * 2; i += spacing) {
            this.ctx.moveTo(Math.max(x, x + i - size), Math.min(y + size, y + i));
            this.ctx.lineTo(Math.min(x + size, x + i), Math.max(y, y + i - size));
        }
        this.ctx.stroke();
    }

    /**
     * Exercise 6: Meanders (Repetition)
     * Training: Pattern recognition and rhythm.
     */
    drawOrnaments() {
        this.setupStroke();
        const margin = 100;
        const size = 30;
        
        for (let y = margin; y < this.height - margin; y += margin) {
            this.ctx.beginPath();
            this.ctx.moveTo(margin, y);
            for (let x = margin; x < this.width - margin; x += size) {
                this.ctx.lineTo(x + size, y);
                this.ctx.lineTo(x + size, y + size/2);
                this.ctx.lineTo(x + size/2, y + size/2);
                this.ctx.lineTo(x + size/2, y - size/2);
            }
            this.ctx.stroke();
        }
    }

    /**
     * Exercise 7: Perspective Planes
     * Training: 3D spatial awareness.
     */
    drawPlanes() {
        this.setupStroke(true);
        const { count } = this.getSettings();
        const margin = 100;

        for (let i = 0; i < count / 4; i++) {
            const x = margin + Math.random() * (this.width - margin * 3);
            const y = margin + Math.random() * (this.height - margin * 3);
            const w = 150 + Math.random() * 100;
            const h = 150 + Math.random() * 100;

            const skewX = (Math.random() - 0.5) * 60;
            const skewY = (Math.random() - 0.5) * 60;

            const pts = [
                {x: x, y: y},
                {x: x + w + skewX, y: y + skewY},
                {x: x + w, y: y + h},
                {x: x - skewX, y: y + h - skewY}
            ];

            // Draw plane
            this.ctx.beginPath();
            this.ctx.moveTo(pts[0].x, pts[0].y);
            pts.forEach(p => this.ctx.lineTo(p.x, p.y));
            this.ctx.closePath();
            this.ctx.stroke();

            // Draw diagonals
            this.ctx.beginPath();
            this.ctx.moveTo(pts[0].x, pts[0].y);
            this.ctx.lineTo(pts[2].x, pts[2].y);
            this.ctx.moveTo(pts[1].x, pts[1].y);
            this.ctx.lineTo(pts[3].x, pts[3].y);
            this.ctx.stroke();

            pts.forEach(p => this.drawPoint(p.x, p.y));
        }
    }

    /**
     * Exercise 8: Surface Contours
     * Training: Visualizing form and volume.
     */
    drawContours() {
        this.setupStroke();
        const { count } = this.getSettings();
        const margin = 120;

        for (let i = 0; i < count / 4; i++) {
            const cx = margin + Math.random() * (this.width - margin * 2);
            const cy = margin + Math.random() * (this.height - margin * 2);
            const r = 60 + Math.random() * 40;

            // Draw base ellipse
            this.ctx.beginPath();
            this.ctx.arc(cx, cy, r, 0, Math.PI * 2);
            this.ctx.stroke();

            // Draw curved contour lines
            for (let j = -2; j <= 2; j++) {
                if (j === 0) continue;
                this.ctx.beginPath();
                const offset = j * (r / 3);
                this.ctx.ellipse(cx, cy, Math.abs(offset), r, 0, 0, Math.PI * 2);
                this.ctx.stroke();
            }
        }
    }

    /**
     * Exercise 9: Accuracy Chains
     * Training: Sequential precision.
     */
    drawChains() {
        this.setupStroke(true);
        const { count } = this.getSettings();
        const margin = 80;

        for (let i = 0; i < count / 6; i++) {
            let px = margin + Math.random() * (this.width - margin * 2);
            let py = margin + Math.random() * (this.height - margin * 2);
            this.drawPoint(px, py);

            for (let j = 0; j < 5; j++) {
                const nx = px + (Math.random() - 0.5) * 200;
                const ny = py + (Math.random() - 0.5) * 200;
                
                this.ctx.beginPath();
                this.ctx.setLineDash([2, 4]);
                this.ctx.moveTo(px, py);
                this.ctx.lineTo(nx, ny);
                this.ctx.stroke();
                this.ctx.setLineDash([]);
                
                this.drawPoint(nx, ny);
                px = nx; py = ny;
            }
        }
    }

    /**
     * Exercise 10: Pressure Tapers
     * Training: Controlling line weight.
     */
    drawPressure() {
        this.setupStroke();
        const { count, spacing } = this.getSettings();
        const margin = 100;

        for (let i = 0; i < count; i++) {
            const y = margin + i * spacing;
            if (y > this.height - margin) break;

            this.ctx.beginPath();
            const x1 = margin;
            const x2 = this.width - margin;
            
            // Simulate taper by drawing multiple segments with decreasing width
            const segments = 20;
            const step = (x2 - x1) / segments;
            
            for (let s = 0; s < segments; s++) {
                const curX = x1 + s * step;
                const weight = Math.max(0.1, (1 - s / segments) * 3);
                this.ctx.lineWidth = weight;
                this.ctx.beginPath();
                this.ctx.moveTo(curX, y);
                this.ctx.lineTo(curX + step, y);
                this.ctx.stroke();
            }
        }
    }

    /**
     * Exercise 11: Perspective Funnels
     * Training: Perspective circles and alignment.
     */
    drawFunnels() {
        this.setupStroke(true);
        const margin = 150;
        const cx = this.width / 2;
        const cy = this.height / 2;
        
        // V-shape lines
        this.ctx.beginPath();
        this.ctx.moveTo(cx - 300, cy - 200);
        this.ctx.lineTo(cx, cy);
        this.ctx.lineTo(cx + 300, cy - 200);
        this.ctx.stroke();

        // Ellipses in funnel
        for (let i = 1; i <= 6; i++) {
            const y = cy - i * 40;
            const rx = i * 20;
            const ry = i * 8;
            this.ctx.beginPath();
            this.ctx.ellipse(cx, y, rx, ry, 0, 0, Math.PI * 2);
            this.ctx.stroke();
            this.drawPoint(cx, y);
        }
    }

    /**
     * Exercise 12: Flowing Ribbons
     * Training: Long shoulder-driven parallel curves.
     */
    drawRibbon() {
        this.setupStroke();
        const { count } = this.getSettings();
        
        for (let i = 0; i < count / 8; i++) {
            const startY = 100 + Math.random() * (this.height - 200);
            const width = 40;
            
            this.drawSingleRibbon(startY, width);
        }
    }

    drawSingleRibbon(startY, width) {
        const points = [];
        const segments = 5;
        const step = this.width / segments;

        for (let i = 0; i <= segments; i++) {
            points.push({
                x: i * step,
                y: startY + Math.sin(i * 1.2) * 100 + (Math.random() - 0.5) * 50
            });
        }

        // Draw top and bottom edges
        [0, width].forEach(offset => {
            this.ctx.beginPath();
            this.ctx.moveTo(points[0].x, points[0].y + offset);
            for (let i = 0; i < points.length - 1; i++) {
                const cp1x = (points[i].x + points[i+1].x) / 2;
                this.ctx.quadraticCurveTo(points[i].x, points[i].y + offset, cp1x, (points[i].y + points[i+1].y) / 2 + offset);
            }
            this.ctx.stroke();
        });
    }

    /**
     * Exercise 13: Density Gradients
     * Training: Smooth tonal transitions.
     */
    drawGradient() {
        this.setupStroke();
        const margin = 100;
        const h = 60;
        const w = this.width - margin * 2;

        for (let i = 0; i < 3; i++) {
            const y = margin + i * (h + 40);
            this.ctx.strokeRect(margin, y, w, h);
            
            // Draw hatching with increasing density
            for (let x = 0; x < w; x += 2) {
                const probability = x / w;
                if (Math.random() < probability) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(margin + x, y);
                    this.ctx.lineTo(margin + x, y + h);
                    this.ctx.stroke();
                }
            }
        }
    }

    /**
     * Exercise 14: Form Intersections
     * Training: Identifying overlapping volumes.
     */
    drawForms() {
        this.setupStroke(true);
        const { count } = this.getSettings();
        
        for (let i = 0; i < count / 6; i++) {
            const x = Math.random() * (this.width - 200) + 100;
            const y = Math.random() * (this.height - 200) + 100;
            
            // Box 1
            this.ctx.strokeRect(x, y, 80, 80);
            // Box 2 (Offset)
            this.ctx.strokeRect(x + 30, y + 20, 80, 80);
            
            // Highlight intersection dots
            this.drawPoint(x + 30, y + 20);
            this.drawPoint(x + 80, y + 80);
        }
    }
}
