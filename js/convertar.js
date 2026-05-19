function convertNumber() {
    // 1. Get input elements
    const inputEl = document.getElementById('numberInput');
    const baseEl = document.getElementById('fromBase');
    
    // 2. Get display elements
    const results = {
        bin: document.getElementById('binaryResult'),
        oct: document.getElementById('octalResult'),
        dec: document.getElementById('decimalResult'),
        hex: document.getElementById('hexResult')
    };

    const val = inputEl.value.trim();
    const base = parseInt(baseEl.value);

    // Reset if empty
    if (!val) {
        Object.values(results).forEach(el => el.innerText = "---");
        return;
    }

    // 3. Validation Logic
    const rules = {
        2: /^[0-1]+$/,
        8: /^[0-7]+$/,
        10: /^[0-9]+$/,
        16: /^[0-9a-fA-F]+$/
    };

    if (!rules[base].test(val)) {
        Object.values(results).forEach(el => el.innerText = "Base Error");
        return;
    }

    // 4. Automatic Conversion
    try {
        const decimal = parseInt(val, base);
        
        if (isNaN(decimal)) throw new Error();

        results.bin.innerText = decimal.toString(2);
        results.oct.innerText = decimal.toString(8);
        results.dec.innerText = decimal.toString(10);
        results.hex.innerText = decimal.toString(16).toUpperCase();
        
        // Reset color to normal
        Object.values(results).forEach(el => el.style.color = "#8ab4f8");
    } catch (e) {
        Object.values(results).forEach(el => el.innerText = "Error");
    }
}