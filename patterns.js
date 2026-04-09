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
        this.ctx.setLineDash([]);
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
     */
    drawStraightLines() {
        this.setupStroke(true);
        const { count } = this.getSettings();
        const margin = 60;
        for (let i = 0; i < count; i++) {
            const x1 = margin + Math.random() * (this.width - margin * 2);
            const y1 = margin + Math.random() * (this.height - margin * 2);
            const x2 = margin + Math.random() * (this.width - margin * 2);
            const y2 = margin + Math.random() * (this.height - margin * 2);
            this.drawPoint(x1, y1);
            this.drawPoint(x2, y2);
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
            this.ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, this.width - margin, baseY);
            this.ctx.stroke();
            this.drawPoint(cp1x, cp1y);
            this.drawPoint(cp2x, cp2y);
        }
    }

    /**
     * Exercise 3: Precision Zigzags
     */
    drawZigzags() {
        this.setupStroke();
        const { count } = this.getSettings();
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
                this.ctx.beginPath();
                this.ctx.ellipse(cx, cy, cellW * 0.4, cellH * 0.3, 0, 0, Math.PI * 2);
                this.ctx.setLineDash([2, 4]);
                this.ctx.stroke();
                this.ctx.setLineDash([]);
                this.drawPoint(cx, cy);
            }
        }
    }

    /**
     * Exercise 5: Tonal Hatching
     */
    drawIntersectingLines() {
        this.setupStroke();
        const { spacing } = this.getSettings();
        const boxSize = 120;
        const margin = 80;
        for (let i = 0; i < 4; i++) {
            const x = margin + (i % 2) * (this.width - margin * 2 - boxSize);
            const y = margin + Math.floor(i / 2) * (this.height - margin * 2 - boxSize);
            this.ctx.strokeRect(x, y, boxSize, boxSize);
            this.ctx.beginPath();
            for (let j = spacing; j < boxSize; j += spacing) {
                this.ctx.moveTo(x, y + j);
                this.ctx.lineTo(x + boxSize, y + j);
            }
            this.ctx.stroke();
        }
    }

    /**
     * Exercise 6: Rhythmic Meanders
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
            const pts = [{x, y}, {x: x+w+skewX, y: y+skewX/2}, {x: x+w, y: y+h}, {x: x-skewX, y: y+h-skewX/2}];
            this.ctx.beginPath();
            this.ctx.moveTo(pts[0].x, pts[0].y);
            pts.forEach(p => this.ctx.lineTo(p.x, p.y));
            this.ctx.closePath();
            this.ctx.stroke();
            this.ctx.beginPath();
            this.ctx.moveTo(pts[0].x, pts[0].y); this.ctx.lineTo(pts[2].x, pts[2].y);
            this.ctx.moveTo(pts[1].x, pts[1].y); this.ctx.lineTo(pts[3].x, pts[3].y);
            this.ctx.stroke();
            pts.forEach(p => this.drawPoint(p.x, p.y));
        }
    }

    /**
     * Exercise 8: Surface Contours
     */
    drawContours() {
        this.setupStroke();
        const { count } = this.getSettings();
        const margin = 120;
        for (let i = 0; i < count / 4; i++) {
            const cx = margin + Math.random() * (this.width - margin * 2);
            const cy = margin + Math.random() * (this.height - margin * 2);
            const r = 60 + Math.random() * 40;
            this.ctx.beginPath();
            this.ctx.arc(cx, cy, r, 0, Math.PI * 2);
            this.ctx.stroke();
            for (let j = -2; j <= 2; j++) {
                if (j === 0) continue;
                this.ctx.beginPath();
                this.ctx.ellipse(cx, cy, Math.abs(j * (r/3)), r, 0, 0, Math.PI * 2);
                this.ctx.stroke();
            }
        }
    }

    /**
     * Exercise 9: Accuracy Chains
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
                this.ctx.moveTo(px, py); this.ctx.lineTo(nx, ny);
                this.ctx.stroke();
                this.ctx.setLineDash([]);
                this.drawPoint(nx, ny);
                px = nx; py = ny;
            }
        }
    }

    /**
     * Exercise 10: Pressure Tapers
     */
    drawPressure() {
        this.setupStroke();
        const { count, spacing } = this.getSettings();
        const margin = 100;
        for (let i = 0; i < count; i++) {
            const y = margin + i * spacing;
            if (y > this.height - margin) break;
            const segments = 20;
            const step = (this.width - margin * 2) / segments;
            for (let s = 0; s < segments; s++) {
                this.ctx.lineWidth = Math.max(0.1, (1 - s / segments) * 3);
                this.ctx.beginPath();
                this.ctx.moveTo(margin + s * step, y);
                this.ctx.lineTo(margin + (s + 1) * step, y);
                this.ctx.stroke();
            }
        }
    }

    /**
     * Exercise 11: Perspective Funnels
     */
    drawFunnels() {
        this.setupStroke(true);
        const cx = this.width / 2;
        const cy = this.height / 2;
        this.ctx.beginPath();
        this.ctx.moveTo(cx - 300, cy - 200); this.ctx.lineTo(cx, cy); this.ctx.lineTo(cx + 300, cy - 200);
        this.ctx.stroke();
        for (let i = 1; i <= 6; i++) {
            const y = cy - i * 40;
            this.ctx.beginPath();
            this.ctx.ellipse(cx, y, i * 20, i * 8, 0, 0, Math.PI * 2);
            this.ctx.stroke();
            this.drawPoint(cx, y);
        }
    }

    /**
     * Exercise 12: Flowing Ribbons
     */
    drawRibbon() {
        this.setupStroke();
        const { count } = this.getSettings();
        for (let i = 0; i < count / 8; i++) {
            const startY = 100 + Math.random() * (this.height - 200);
            const points = [];
            const segments = 5;
            const step = this.width / segments;
            for (let j = 0; j <= segments; j++) {
                points.push({x: j * step, y: startY + Math.sin(j * 1.2) * 100 + (Math.random() - 0.5) * 50});
            }
            [0, 40].forEach(offset => {
                this.ctx.beginPath();
                this.ctx.moveTo(points[0].x, points[0].y + offset);
                for (let j = 0; j < points.length - 1; j++) {
                    this.ctx.quadraticCurveTo(points[j].x, points[j].y + offset, (points[j].x + points[j+1].x) / 2, (points[j].y + points[j+1].y) / 2 + offset);
                }
                this.ctx.stroke();
            });
        }
    }

    /**
     * Exercise 13: Density Gradients
     */
    drawGradient() {
        this.setupStroke();
        const margin = 100;
        const h = 60;
        const w = this.width - margin * 2;
        for (let i = 0; i < 3; i++) {
            const y = margin + i * (h + 40);
            this.ctx.strokeRect(margin, y, w, h);
            for (let x = 0; x < w; x += 2) {
                if (Math.random() < x / w) {
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
     */
    drawForms() {
        this.setupStroke(true);
        const { count } = this.getSettings();
        for (let i = 0; i < count / 6; i++) {
            const x = Math.random() * (this.width - 200) + 100;
            const y = Math.random() * (this.height - 200) + 100;
            this.ctx.strokeRect(x, y, 80, 80);
            this.ctx.strokeRect(x + 30, y + 20, 80, 80);
            this.drawPoint(x + 30, y + 20);
            this.drawPoint(x + 80, y + 80);
        }
    }

    /**
     * Exercise 15: Organic Forms (Sausages)
     */
    drawOrganic() {
        this.setupStroke();
        const { count } = this.getSettings();
        for (let i = 0; i < count / 8; i++) {
            const cx = Math.random() * this.width;
            const cy = Math.random() * this.height;
            const r = 40 + Math.random() * 40;
            
            this.ctx.beginPath();
            this.ctx.ellipse(cx, cy, r*2, r, Math.random() * Math.PI, 0, Math.PI * 2);
            this.ctx.stroke();
            
            // Draw wrapping contour
            this.ctx.beginPath();
            this.ctx.ellipse(cx, cy, r/2, r, Math.random() * Math.PI, 0, Math.PI * 2);
            this.ctx.setLineDash([2, 2]);
            this.ctx.stroke();
            this.ctx.setLineDash([]);
        }
    }

    /**
     * Exercise 16: Cast Shadows
     */
    drawShadows() {
        this.setupStroke(true);
        const { count } = this.getSettings();
        for (let i = 0; i < count / 6; i++) {
            const x = 100 + Math.random() * (this.width - 200);
            const y = 100 + Math.random() * (this.height - 200);
            const size = 50;
            
            // Draw cube wireframe
            this.ctx.strokeRect(x, y, size, size);
            this.ctx.beginPath();
            this.ctx.moveTo(x, y); this.ctx.lineTo(x - 20, y - 20);
            this.ctx.lineTo(x + size - 20, y - 20); this.ctx.lineTo(x + size, y);
            this.ctx.stroke();
            
            // Draw shadow area (faint)
            this.ctx.fillStyle = 'rgba(0,0,0,0.05)';
            this.ctx.beginPath();
            this.ctx.moveTo(x, y + size);
            this.ctx.lineTo(x - 40, y + size + 20);
            this.ctx.lineTo(x + size - 20, y + size + 20);
            this.ctx.lineTo(x + size, y + size);
            this.ctx.fill();
        }
    }

    /**
     * Exercise 17: Texture Patches
     */
    drawTextures() {
        this.setupStroke();
        const margin = 100;
        const size = 80;
        for (let i = 0; i < 4; i++) {
            const x = margin + i * (size + 40);
            const y = this.height - margin - size;
            this.ctx.strokeRect(x, y, size, size);
            
            // Draw random texture dots/lines
            for (let j = 0; j < 50; j++) {
                const tx = x + Math.random() * size;
                const ty = y + Math.random() * size;
                this.ctx.beginPath();
                this.ctx.arc(tx, ty, 0.5, 0, Math.PI * 2);
                this.ctx.fill();
            }
        }
    }

    /**
     * Exercise 18: Negative Space
     */
    drawNegative() {
        this.setupStroke(true);
        const margin = 120;
        this.ctx.beginPath();
        for (let i = 0; i < 5; i++) {
            const x = margin + Math.random() * (this.width - margin * 2);
            const y = margin + Math.random() * (this.height - margin * 2);
            this.ctx.lineTo(x, y);
            this.drawPoint(x, y);
        }
        this.ctx.stroke();
        
        // Highlight some 'negative' pockets
        this.ctx.fillStyle = 'rgba(0,0,0,0.03)';
        this.ctx.fill();
    }
}
