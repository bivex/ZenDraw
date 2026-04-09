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

    // ─── Biology & Anatomy ─────────────────────────────────────

    /**
     * Exercise 19: Facial Proportions
     * Draws face ovals with proportional guide lines for feature placement.
     */
    drawFaceProportions() {
        this.setupStroke(true);
        const { count } = this.getSettings();
        const faces = Math.min(count, 6);
        const margin = 80;

        for (let i = 0; i < faces; i++) {
            const cx = margin + Math.random() * (this.width - margin * 2);
            const cy = margin + Math.random() * (this.height - margin * 2);
            const faceW = 50 + Math.random() * 30;
            const faceH = faceW * 1.3;

            // Face oval
            this.ctx.beginPath();
            this.ctx.ellipse(cx, cy, faceW, faceH, 0, 0, Math.PI * 2);
            this.ctx.stroke();

            // Vertical center line
            this.ctx.beginPath();
            this.ctx.setLineDash([3, 5]);
            this.ctx.moveTo(cx, cy - faceH);
            this.ctx.lineTo(cx, cy + faceH);
            this.ctx.stroke();

            // Eye line (at half height)
            const eyeY = cy - faceH * 0.05;
            this.ctx.beginPath();
            this.ctx.moveTo(cx - faceW * 0.9, eyeY);
            this.ctx.lineTo(cx + faceW * 0.9, eyeY);
            this.ctx.stroke();

            // Eye corners
            this.drawPoint(cx - faceW * 0.35, eyeY);
            this.drawPoint(cx + faceW * 0.35, eyeY);
            this.drawPoint(cx - faceW * 0.65, eyeY);
            this.drawPoint(cx + faceW * 0.65, eyeY);

            // Nose line (at bottom third)
            const noseY = cy + faceH * 0.25;
            this.ctx.beginPath();
            this.ctx.moveTo(cx - faceW * 0.4, noseY);
            this.ctx.lineTo(cx + faceW * 0.4, noseY);
            this.ctx.stroke();
            this.drawPoint(cx, noseY);

            // Mouth line (at bottom quarter)
            const mouthY = cy + faceH * 0.5;
            this.ctx.beginPath();
            this.ctx.moveTo(cx - faceW * 0.3, mouthY);
            this.ctx.lineTo(cx + faceW * 0.3, mouthY);
            this.ctx.stroke();

            // Brow line
            const browY = cy - faceH * 0.3;
            this.ctx.beginPath();
            this.ctx.moveTo(cx - faceW * 0.7, browY);
            this.ctx.lineTo(cx + faceW * 0.7, browY);
            this.ctx.stroke();

            this.ctx.setLineDash([]);
        }
    }

    /**
     * Exercise 20: Eye Anatomy
     * Draws eye shape guides with iris, pupil, and eyelid curves.
     */
    drawEyeAnatomy() {
        this.setupStroke(true);
        const { count } = this.getSettings();
        const eyes = Math.min(count, 8);
        const margin = 80;

        for (let i = 0; i < eyes; i++) {
            const cx = margin + Math.random() * (this.width - margin * 2);
            const cy = margin + Math.random() * (this.height - margin * 2);
            const eyeW = 40 + Math.random() * 25;
            const eyeH = eyeW * 0.4;

            // Eye almond shape (upper lid)
            this.ctx.beginPath();
            this.ctx.moveTo(cx - eyeW, cy);
            this.ctx.quadraticCurveTo(cx, cy - eyeH * 2, cx + eyeW, cy);
            this.ctx.stroke();

            // Lower lid
            this.ctx.beginPath();
            this.ctx.moveTo(cx - eyeW, cy);
            this.ctx.quadraticCurveTo(cx, cy + eyeH, cx + eyeW, cy);
            this.ctx.stroke();

            // Iris
            this.ctx.beginPath();
            this.ctx.arc(cx, cy, eyeW * 0.35, 0, Math.PI * 2);
            this.ctx.stroke();

            // Pupil
            this.ctx.beginPath();
            this.ctx.arc(cx, cy, eyeW * 0.15, 0, Math.PI * 2);
            this.ctx.stroke();

            // Highlight point
            this.drawPoint(cx + eyeW * 0.1, cy - eyeW * 0.08);

            // Upper eyelid crease
            this.ctx.beginPath();
            this.ctx.setLineDash([2, 4]);
            this.ctx.moveTo(cx - eyeW * 0.9, cy - eyeH * 1.5);
            this.ctx.quadraticCurveTo(cx, cy - eyeH * 3, cx + eyeW * 0.9, cy - eyeH * 1.5);
            this.ctx.stroke();

            // Inner corner detail
            this.drawPoint(cx - eyeW, cy);
            // Outer corner detail
            this.drawPoint(cx + eyeW, cy);

            this.ctx.setLineDash([]);
        }
    }

    /**
     * Exercise 21: Hand Framework
     * Draws simplified hand construction with palm box and finger joint guides.
     */
    drawHandFramework() {
        this.setupStroke(true);
        const { count } = this.getSettings();
        const hands = Math.min(Math.ceil(count / 4), 4);
        const margin = 100;

        for (let i = 0; i < hands; i++) {
            const ox = margin + Math.random() * (this.width - margin * 2.5);
            const oy = margin + Math.random() * (this.height - margin * 2.5);
            const scale = 0.6 + Math.random() * 0.4;

            // Palm box
            const pw = 70 * scale;
            const ph = 80 * scale;
            this.ctx.strokeRect(ox, oy, pw, ph);

            // Palm center
            this.drawPoint(ox + pw / 2, oy + ph / 2);

            // Wrist
            this.ctx.beginPath();
            this.ctx.moveTo(ox + pw * 0.1, oy + ph);
            this.ctx.lineTo(ox + pw * 0.1, oy + ph + 30 * scale);
            this.ctx.moveTo(ox + pw * 0.9, oy + ph);
            this.ctx.lineTo(ox + pw * 0.9, oy + ph + 30 * scale);
            this.ctx.stroke();

            // Thumb
            const thumbBase = { x: ox, y: oy + ph * 0.3 };
            const thumbMid = { x: ox - 25 * scale, y: oy - 10 * scale };
            const thumbTip = { x: ox - 35 * scale, y: oy - 40 * scale };
            this.ctx.beginPath();
            this.ctx.moveTo(thumbBase.x, thumbBase.y);
            this.ctx.lineTo(thumbMid.x, thumbMid.y);
            this.ctx.lineTo(thumbTip.x, thumbTip.y);
            this.ctx.stroke();
            this.drawPoint(thumbBase.x, thumbBase.y);
            this.drawPoint(thumbMid.x, thumbMid.y);
            this.drawPoint(thumbTip.x, thumbTip.y);

            // Four fingers
            const fingerWidth = pw / 4;
            const fingerLengths = [55, 70, 65, 50].map(l => l * scale);

            for (let f = 0; f < 4; f++) {
                const baseX = ox + fingerWidth * f + fingerWidth * 0.5;
                const baseY = oy;
                const midX = baseX + (Math.random() - 0.5) * 5;
                const midY = baseY - fingerLengths[f] * 0.5;
                const tipX = baseX + (Math.random() - 0.5) * 8;
                const tipY = baseY - fingerLengths[f];

                this.ctx.beginPath();
                this.ctx.moveTo(baseX, baseY);
                this.ctx.lineTo(midX, midY);
                this.ctx.lineTo(tipX, tipY);
                this.ctx.stroke();

                this.drawPoint(baseX, baseY);
                this.drawPoint(midX, midY);
                this.drawPoint(tipX, tipY);

                // Knuckle circles
                this.ctx.beginPath();
                this.ctx.arc(baseX, baseY, 4 * scale, 0, Math.PI * 2);
                this.ctx.stroke();
            }
        }
    }

    /**
     * Exercise 22: Figure Proportions
     * Draws proportioned figure guides with head-count measurement lines.
     */
    drawFigureProportions() {
        this.setupStroke(true);
        const { count } = this.getSettings();
        const figures = Math.min(Math.ceil(count / 6), 3);
        const margin = 80;

        for (let i = 0; i < figures; i++) {
            const headSize = 30 + Math.random() * 15;
            const totalHeight = headSize * 8;
            const cx = margin + 60 + Math.random() * (this.width - margin * 2 - 120);

            // Scale to fit canvas
            const scale = Math.min(1, (this.height - margin * 2) / totalHeight);
            const sh = headSize * scale;
            const figH = sh * 8;
            const startY = margin + Math.random() * (this.height - margin * 2 - figH);

            // Head oval
            const headY = startY + sh;
            this.ctx.beginPath();
            this.ctx.ellipse(cx, startY + sh * 0.5, sh * 0.4, sh * 0.5, 0, 0, Math.PI * 2);
            this.ctx.stroke();

            // Head count guide lines (dashed)
            this.ctx.setLineDash([2, 4]);
            for (let h = 0; h <= 8; h++) {
                const ly = startY + h * sh;
                this.ctx.beginPath();
                this.ctx.moveTo(cx - 60, ly);
                this.ctx.lineTo(cx + 60, ly);
                this.ctx.stroke();
            }
            this.ctx.setLineDash([]);

            // Chin (1 head)
            const chin = startY + sh;
            // Shoulders (1.5 heads)
            const shoulderY = startY + sh * 1.5;
            const shoulderW = sh * 1.2;
            this.drawPoint(cx - shoulderW, shoulderY);
            this.drawPoint(cx + shoulderW, shoulderY);

            // Shoulder line
            this.ctx.beginPath();
            this.ctx.moveTo(cx - shoulderW, shoulderY);
            this.ctx.lineTo(cx + shoulderW, shoulderY);
            this.ctx.stroke();

            // Nipple line (2 heads)
            const chestY = startY + sh * 2;
            this.ctx.beginPath();
            this.ctx.setLineDash([3, 5]);
            this.ctx.moveTo(cx - shoulderW * 0.6, chestY);
            this.ctx.lineTo(cx + shoulderW * 0.6, chestY);
            this.ctx.stroke();

            // Navel (3 heads)
            const navelY = startY + sh * 3;
            this.drawPoint(cx, navelY);

            // Crotch (4 heads)
            const crotchY = startY + sh * 4;
            this.drawPoint(cx, crotchY);
            this.ctx.beginPath();
            this.ctx.moveTo(cx - shoulderW * 0.4, crotchY);
            this.ctx.lineTo(cx + shoulderW * 0.4, crotchY);
            this.ctx.stroke();

            // Knee (6 heads)
            const kneeY = startY + sh * 6;
            this.drawPoint(cx - shoulderW * 0.3, kneeY);
            this.drawPoint(cx + shoulderW * 0.3, kneeY);

            // Foot (8 heads)
            const footY = startY + sh * 8;

            // Spine/center line
            this.ctx.beginPath();
            this.ctx.setLineDash([4, 6]);
            this.ctx.moveTo(cx, chin);
            this.ctx.lineTo(cx, crotchY);
            this.ctx.stroke();
            this.ctx.setLineDash([]);

            // Arm guides
            const elbowY = startY + sh * 3;
            const wristY = startY + sh * 4.2;
            // Left arm
            this.ctx.beginPath();
            this.ctx.moveTo(cx - shoulderW, shoulderY);
            this.ctx.lineTo(cx - shoulderW * 0.8, elbowY);
            this.ctx.lineTo(cx - shoulderW * 0.5, wristY);
            this.ctx.stroke();
            // Right arm
            this.ctx.beginPath();
            this.ctx.moveTo(cx + shoulderW, shoulderY);
            this.ctx.lineTo(cx + shoulderW * 0.8, elbowY);
            this.ctx.lineTo(cx + shoulderW * 0.5, wristY);
            this.ctx.stroke();

            // Leg guides
            // Left leg
            this.ctx.beginPath();
            this.ctx.moveTo(cx - shoulderW * 0.25, crotchY);
            this.ctx.lineTo(cx - shoulderW * 0.3, kneeY);
            this.ctx.lineTo(cx - shoulderW * 0.25, footY);
            this.ctx.stroke();
            // Right leg
            this.ctx.beginPath();
            this.ctx.moveTo(cx + shoulderW * 0.25, crotchY);
            this.ctx.lineTo(cx + shoulderW * 0.3, kneeY);
            this.ctx.lineTo(cx + shoulderW * 0.25, footY);
            this.ctx.stroke();
        }
    }

    /**
     * Exercise 23: Skull Construction
     * Draws simplified skull outlines with cranial vault and facial bone guides.
     */
    drawSkullConstruction() {
        this.setupStroke(true);
        const { count } = this.getSettings();
        const skulls = Math.min(count, 4);
        const margin = 100;

        for (let i = 0; i < skulls; i++) {
            const cx = margin + Math.random() * (this.width - margin * 2);
            const cy = margin + Math.random() * (this.height - margin * 2);
            const s = 35 + Math.random() * 20;

            // Cranium (large oval)
            this.ctx.beginPath();
            this.ctx.ellipse(cx, cy - s * 0.3, s * 0.8, s, 0, 0, Math.PI * 2);
            this.ctx.stroke();

            // Jaw (U-shape)
            this.ctx.beginPath();
            this.ctx.moveTo(cx - s * 0.55, cy + s * 0.2);
            this.ctx.quadraticCurveTo(cx - s * 0.55, cy + s * 1.1, cx, cy + s * 1.2);
            this.ctx.quadraticCurveTo(cx + s * 0.55, cy + s * 1.1, cx + s * 0.55, cy + s * 0.2);
            this.ctx.stroke();

            // Eye sockets
            const eyeY = cy + s * 0.15;
            this.ctx.beginPath();
            this.ctx.ellipse(cx - s * 0.28, eyeY, s * 0.2, s * 0.15, 0, 0, Math.PI * 2);
            this.ctx.stroke();
            this.ctx.beginPath();
            this.ctx.ellipse(cx + s * 0.28, eyeY, s * 0.2, s * 0.15, 0, 0, Math.PI * 2);
            this.ctx.stroke();

            // Nasal cavity
            this.ctx.beginPath();
            this.ctx.moveTo(cx - s * 0.12, cy + s * 0.35);
            this.ctx.quadraticCurveTo(cx, cy + s * 0.6, cx + s * 0.12, cy + s * 0.35);
            this.ctx.stroke();

            // Zygomatic arches (cheekbones)
            this.ctx.beginPath();
            this.ctx.setLineDash([2, 3]);
            this.ctx.moveTo(cx - s * 0.8, cy + s * 0.1);
            this.ctx.lineTo(cx - s * 0.55, cy + s * 0.35);
            this.ctx.stroke();
            this.ctx.beginPath();
            this.ctx.moveTo(cx + s * 0.8, cy + s * 0.1);
            this.ctx.lineTo(cx + s * 0.55, cy + s * 0.35);
            this.ctx.stroke();
            this.ctx.setLineDash([]);

            // Key landmark points
            this.drawPoint(cx, cy - s);          // Crown
            this.drawPoint(cx - s * 0.28, eyeY); // Left eye center
            this.drawPoint(cx + s * 0.28, eyeY); // Right eye center
            this.drawPoint(cx, cy + s * 0.48);   // Nose base
            this.drawPoint(cx, cy + s * 1.2);    // Chin
        }
    }

    /**
     * Exercise 24: Torso Structure
     * Draws simplified ribcage and pelvis forms with spinal connection.
     */
    drawTorsoStructure() {
        this.setupStroke(true);
        const { count } = this.getSettings();
        const torsos = Math.min(Math.ceil(count / 6), 3);
        const margin = 80;

        for (let i = 0; i < torsos; i++) {
            const cx = margin + Math.random() * (this.width - margin * 2);
            const cy = margin + Math.random() * (this.height - margin * 2);
            const s = 30 + Math.random() * 15;

            // Spine
            this.ctx.beginPath();
            this.ctx.setLineDash([3, 5]);
            this.ctx.moveTo(cx, cy - s * 3);
            this.ctx.quadraticCurveTo(cx + s * 0.3, cy - s, cx, cy + s * 0.5);
            this.ctx.quadraticCurveTo(cx - s * 0.2, cy + s * 1.5, cx, cy + s * 2.5);
            this.ctx.stroke();
            this.ctx.setLineDash([]);

            // Ribcage (egg shape)
            this.ctx.beginPath();
            this.ctx.ellipse(cx, cy - s * 1.2, s * 1.2, s * 1.8, 0, 0, Math.PI * 2);
            this.ctx.stroke();

            // Rib lines
            for (let r = 0; r < 4; r++) {
                const ribY = cy - s * 2 + r * s * 0.7;
                const ribW = s * (0.6 + r * 0.2);
                this.ctx.beginPath();
                this.ctx.setLineDash([2, 3]);
                this.ctx.moveTo(cx - ribW, ribY);
                this.ctx.quadraticCurveTo(cx, ribY + s * 0.2, cx + ribW, ribY);
                this.ctx.stroke();
                this.ctx.setLineDash([]);
            }

            // Pelvis (butterfly shape)
            this.ctx.beginPath();
            this.ctx.moveTo(cx - s * 1.3, cy + s * 0.8);
            this.ctx.quadraticCurveTo(cx - s * 0.5, cy + s * 1.2, cx, cy + s * 1.5);
            this.ctx.quadraticCurveTo(cx + s * 0.5, cy + s * 1.2, cx + s * 1.3, cy + s * 0.8);
            this.ctx.stroke();

            // Pelvis bottom
            this.ctx.beginPath();
            this.ctx.moveTo(cx - s * 1.3, cy + s * 0.8);
            this.ctx.quadraticCurveTo(cx - s * 1.2, cy + s * 2, cx - s * 0.3, cy + s * 2.3);
            this.ctx.stroke();
            this.ctx.beginPath();
            this.ctx.moveTo(cx + s * 1.3, cy + s * 0.8);
            this.ctx.quadraticCurveTo(cx + s * 1.2, cy + s * 2, cx + s * 0.3, cy + s * 2.3);
            this.ctx.stroke();

            // Shoulder line
            this.ctx.beginPath();
            this.ctx.moveTo(cx - s * 1.6, cy - s * 2.2);
            this.ctx.lineTo(cx + s * 1.6, cy - s * 2.2);
            this.ctx.stroke();

            // Key points
            this.drawPoint(cx, cy - s * 3);       // C7/top
            this.drawPoint(cx - s * 1.6, cy - s * 2.2); // Left shoulder
            this.drawPoint(cx + s * 1.6, cy - s * 2.2); // Right shoulder
            this.drawPoint(cx, cy + s * 1.5);      // Sacrum
        }
    }

    /**
     * Exercise 25: 3D Boxes
     * Draws 3D box wireframes from various angles with perspective guides.
     */
    draw3DBoxes() {
        this.setupStroke(true);
        const { count } = this.getSettings();
        const boxes = Math.min(Math.ceil(count / 4), 3);
        const margin = 100;

        for (let i = 0; i < boxes; i++) {
            const cx = margin + Math.random() * (this.width - margin * 2);
            const cy = margin + Math.random() * (this.height - margin * 2);
            const size = 40 + Math.random() * 50;

            // Random rotation angles for the 3 offset directions
            const dx1 = (Math.random() - 0.5) * size * 1.2;
            const dy1 = -(20 + Math.random() * size * 0.6);
            const dx2 = (Math.random() - 0.5) * size * 1.2;
            const dy2 = (Math.random() - 0.5) * size * 0.5;

            // Front face corners
            const f0 = { x: cx, y: cy };
            const f1 = { x: cx + size, y: cy };
            const f2 = { x: cx + size, y: cy + size };
            const f3 = { x: cx, y: cy + size };

            // Back face corners (offset)
            const b0 = { x: cx + dx1, y: cy + dy1 };
            const b1 = { x: cx + size + dx1, y: cy + dy1 };
            const b2 = { x: cx + size + dx1, y: cy + size + dy1 };
            const b3 = { x: cx + dx1, y: cy + size + dy1 };

            // Front face
            this.ctx.beginPath();
            this.ctx.moveTo(f0.x, f0.y);
            this.ctx.lineTo(f1.x, f1.y);
            this.ctx.lineTo(f2.x, f2.y);
            this.ctx.lineTo(f3.x, f3.y);
            this.ctx.closePath();
            this.ctx.stroke();

            // Back face
            this.ctx.beginPath();
            this.ctx.moveTo(b0.x, b0.y);
            this.ctx.lineTo(b1.x, b1.y);
            this.ctx.lineTo(b2.x, b2.y);
            this.ctx.lineTo(b3.x, b3.y);
            this.ctx.closePath();
            this.ctx.stroke();

            // Connecting edges (front to back)
            this.ctx.beginPath();
            this.ctx.moveTo(f0.x, f0.y); this.ctx.lineTo(b0.x, b0.y);
            this.ctx.moveTo(f1.x, f1.y); this.ctx.lineTo(b1.x, b1.y);
            this.ctx.moveTo(f2.x, f2.y); this.ctx.lineTo(b2.x, b2.y);
            this.ctx.moveTo(f3.x, f3.y); this.ctx.lineTo(b3.x, b3.y);
            this.ctx.stroke();

            // Diagonal construction lines (dashed) to show inner structure
            this.ctx.beginPath();
            this.ctx.setLineDash([2, 4]);
            // Front face diagonals
            this.ctx.moveTo(f0.x, f0.y); this.ctx.lineTo(f2.x, f2.y);
            this.ctx.moveTo(f1.x, f1.y); this.ctx.lineTo(f3.x, f3.y);
            // Back face diagonals
            this.ctx.moveTo(b0.x, b0.y); this.ctx.lineTo(b2.x, b2.y);
            this.ctx.moveTo(b1.x, b1.y); this.ctx.lineTo(b3.x, b3.y);
            this.ctx.stroke();
            this.ctx.setLineDash([]);

            // Corner points
            [f0, f1, f2, f3].forEach(p => this.drawPoint(p.x, p.y));
            [b0, b1, b2, b3].forEach(p => this.drawPoint(p.x, p.y));
        }
    }
}
