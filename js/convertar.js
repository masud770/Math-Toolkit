function doConversion() {
    const txt = document.getElementById('numInput').value.trim();
    const base = parseInt(document.getElementById('baseSelect').value);
    
    // Map text boxes securely
    const displayBin = document.getElementById('outBin');
    const displayOct = document.getElementById('outOct');
    const displayDec = document.getElementById('outDec');
    const displayHex = document.getElementById('outHex');

    // Instantly blank results if input clear
    if (txt === "") {
        displayBin.innerText = "---";
        displayOct.innerText = "---";
        displayDec.innerText = "---";
        displayHex.innerText = "---";
        return;
    }

    // Strict regex check rules for each numeric base system
    const regexPatterns = {
        2: /^[0-1]+$/,
        8: /^[0-7]+$/,
        10: /^[0-9]+$/,
        16: /^[0-9a-fA-F]+$/
    };

    // Flag input mismatch anomalies instantly
    if (!regexPatterns[base].test(txt)) {
        displayBin.innerText = "Invalid";
        displayOct.innerText = "Invalid";
        displayDec.innerText = "Invalid";
        displayHex.innerText = "Invalid";
        return;
    }

    // Convert value out across standard bases
    try {
        const decimalNum = parseInt(txt, base);
        
        displayBin.innerText = decimalNum.toString(2);
        displayOct.innerText = decimalNum.toString(8);
        displayDec.innerText = decimalNum.toString(10);
        displayHex.innerText = decimalNum.toString(16).toUpperCase();
    } catch (err) {
        displayBin.innerText = "Error";
        displayOct.innerText = "Error";
        displayDec.innerText = "Error";
        displayHex.innerText = "Error";
    }
}