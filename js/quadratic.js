function solveQuadratic() {
    // 1. Grab input string values
    const aText = document.getElementById('quadA').value.trim();
    const bText = document.getElementById('quadB').value.trim();
    const cText = document.getElementById('quadC').value.trim();

    // 2. Grab display elements
    const outDisc = document.getElementById('outDiscriminant');
    const outR1 = document.getElementById('outRoot1');
    const outR2 = document.getElementById('outRoot2');

    // 3. Clear results instantly if fields are blank
    if (aText === "" || bText === "" || cText === "") {
        outDisc.innerText = "---";
        outR1.innerText = "---";
        outR2.innerText = "---";
        return;
    }

    // Convert inputs to floating numbers
    const a = parseFloat(aText);
    const b = parseFloat(bText);
    const c = parseFloat(cText);

    // 4. Input validation (a cannot be 0 in a quadratic equation)
    if (a === 0) {
        outDisc.innerText = "Invalid";
        outR1.innerText = "Linear Eq (a≠0)";
        outR2.innerText = "Linear Eq (a≠0)";
        return;
    }

    // 5. Calculate Discriminant (Δ = b² - 4ac)
    const discriminant = (b * b) - (4 * a * c);
    outDisc.innerText = discriminant.toFixed(2);

    // 6. Branch out logic based on discriminant nature
    if (discriminant > 0) {
        // Two distinct, real roots
        const r1 = (-b + Math.sqrt(discriminant)) / (2 * a);
        const r2 = (-b - Math.sqrt(discriminant)) / (2 * a);
        outR1.innerText = r1.toFixed(4);
        outR2.innerText = r2.toFixed(4);
    } 
    else if (discriminant === 0) {
        // One distinct repeating real root
        const r = -b / (2 * a);
        outR1.innerText = r.toFixed(4);
        outR2.innerText = r.toFixed(4) + " (Repeated)";
    } 
    else {
        // Complex / Imaginary roots
        const realPart = (-b / (2 * a)).toFixed(4);
        const imagPart = (Math.sqrt(-discriminant) / (2 * a)).toFixed(4);
        
        outR1.innerText = `${realPart} + ${imagPart}i`;
        outR2.innerText = `${realPart} - ${imagPart}i`;
    }
}