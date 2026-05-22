function solveQuadratic() {
    const a = parseFloat(document.getElementById('quadA').value);
    const b = parseFloat(document.getElementById('quadB').value);
    const c = parseFloat(document.getElementById('quadC').value);

    const outDisc = document.getElementById('outDisc');
    const outNature = document.getElementById('outNature');
    const outR1 = document.getElementById('outR1');
    const outR2 = document.getElementById('outR2');

    if (isNaN(a) || isNaN(b) || isNaN(c)) {
        outDisc.innerText = "---";
        outNature.innerText = "Awaiting Input...";
        outR1.innerText = "---";
        outR2.innerText = "---";
        return;
    }

    if (a === 0) {
        outNature.innerText = "Not Quadratic (a=0)";
        return;
    }

    const D = (b * b) - (4 * a * c);
    outDisc.innerText = D.toFixed(2);

    if (D > 0) {
        const x1 = (-b + Math.sqrt(D)) / (2 * a);
        const x2 = (-b - Math.sqrt(D)) / (2 * a);
        outR1.innerText = x1.toFixed(4);
        outR2.innerText = x2.toFixed(4);
        outNature.innerText = "Two Real & Distinct Roots";
        outNature.style.color = "#4ade80"; // Green
    } 
    else if (D === 0) {
        const x = -b / (2 * a);
        outR1.innerText = x.toFixed(4);
        outR2.innerText = x.toFixed(4);
        outNature.innerText = "One Repeating Real Root";
        outNature.style.color = "#facc15"; // Yellow
    } 
    else {
        const real = (-b / (2 * a)).toFixed(4);
        const imag = (Math.sqrt(-D) / (2 * a)).toFixed(4);
        outR1.innerText = `${real} + ${imag}i`;
        outR2.innerText = `${real} - ${imag}i`;
        outNature.innerText = "Two Complex Roots";
        outNature.style.color = "#f87171"; // Red
    }
}