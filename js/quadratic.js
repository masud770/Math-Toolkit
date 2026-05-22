/**
 * Professional Quadratic Solver Logic
 * Fixed: Scaling, Precision, and Responsive Graphing
 */

function solveQuadratic() {
    const a = parseFloat(document.getElementById('quadA').value);
    const b = parseFloat(document.getElementById('quadB').value);
    const c = parseFloat(document.getElementById('quadC').value);

    const hero = document.getElementById('heroRoots');
    const valDisc = document.getElementById('valDisc');
    const valVertex = document.getElementById('valVertex');
    const valSum = document.getElementById('valSum');
    const valProd = document.getElementById('valProd');

    // Validation
    if (isNaN(a) || isNaN(b) || isNaN(c)) return;

    if (a === 0) {
        hero.innerText = "Not Quadratic (a=0)";
        return;
    }

    // 1. Math Logic: Discriminant
    const D = (b * b) - (4 * a * c);
    valDisc.innerText = Number.isInteger(D) ? D : D.toFixed(2);
    
    // 2. Math Logic: Roots
    let r1, r2;
    if (D > 0) {
        r1 = (-b + Math.sqrt(D)) / (2 * a);
        r2 = (-b - Math.sqrt(D)) / (2 * a);
        hero.innerText = `${formatNum(r1)}, ${formatNum(r2)}`;
    } else if (D === 0) {
        r1 = -b / (2 * a);
        hero.innerText = formatNum(r1);
    } else {
        const real = -b / (2 * a);
        const imag = Math.sqrt(-D) / (2 * a);
        hero.innerText = `${formatNum(real)} ± ${formatNum(Math.abs(imag))}i`;
    }

    // 3. Math Logic: Vertex & Properties
    const h = -b / (2 * a);
    const k = (a * h * h) + (b * h) + c;
    valVertex.innerText = `(${formatNum(h)}, ${formatNum(k)})`;
    valSum.innerText = formatNum(-b / a);
    valProd.innerText = formatNum(c / a);

    // 4. Graphing
    drawGraph(a, b, c, h, k, r1, r2, D);
}

// Helper to clean up numbers (removes .00)
function formatNum(num) {
    return Number.isInteger(num) ? num : parseFloat(num.toFixed(3));
}

function drawGraph(a, b, c, vh, vk, r1, r2, D) {
    const canvas = document.getElementById('quadGraph');
    const ctx = canvas.getContext('2d');
    
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const w = rect.width;
    const h = rect.height;
    ctx.clearRect(0, 0, w, h);

    // Smart Scaling: Adjust zoom based on Vertex and Roots
    let maxVal = Math.max(Math.abs(vh), Math.abs(vk), Math.abs(r1 || 0), Math.abs(r2 || 0), 5);
    const padding = 1.5; 
    const unit = (w / 2) / (maxVal * padding); 

    // Draw Grid & Axes
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 1;
    ctx.beginPath();
    for(let i = -20; i <= 20; i++) { // Vertical lines
        ctx.moveTo(w/2 + i * unit, 0); ctx.lineTo(w/2 + i * unit, h);
        ctx.moveTo(0, h/2 + i * unit); ctx.lineTo(w, h/2 + i * unit);
    }
    ctx.stroke();

    ctx.strokeStyle = '#475569'; // Main Axes
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(w/2, 0); ctx.lineTo(w/2, h);
    ctx.moveTo(0, h/2); ctx.lineTo(w, h/2);
    ctx.stroke();

    // Draw Parabola
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 3;
    ctx.beginPath();

    const range = maxVal * 2;
    for (let x = -range; x <= range; x += 0.05) {
        const y = a * x * x + b * x + c;
        const cx = w/2 + x * unit;
        const cy = h/2 - y * unit;

        if (x === -range) ctx.moveTo(cx, cy);
        else if (cy >= -50 && cy <= h + 50) ctx.lineTo(cx, cy); // Optimization
    }
    ctx.stroke();

    // Draw Root Points if Real
    if (D >= 0) {
        ctx.fillStyle = '#fbbf24';
        [r1, r2].forEach(r => {
            if (r !== undefined) {
                ctx.beginPath();
                ctx.arc(w/2 + r * unit, h/2, 4, 0, Math.PI * 2);
                ctx.fill();
            }
        });
    }
}

window.onload = solveQuadratic;
window.addEventListener('resize', solveQuadratic);