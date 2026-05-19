let currentMode = 'deg';
let lastResult = 0; 
let isFinished = false; // NEW: Tracks if the calculation is done

const display = document.getElementById('main-display');
const historyDisplay = document.getElementById('history-display');

function setMode(mode) {
    currentMode = mode;
    // Remove active from both
    document.getElementById('deg-toggle').classList.remove('active');
    document.getElementById('rad-toggle').classList.remove('active');
    
    // Add to the selected one
    if (mode === 'deg') {
        document.getElementById('deg-toggle').classList.add('active');
    } else {
        document.getElementById('rad-toggle').classList.add('active');
    }
}

function append(char) {
    const operators = ['+', '-', '*', '/', '÷', '×', '^', '%'];
    
    // Check if we just finished a calculation
    if (isFinished) {
        // If the next button is an operator, continue from the result
        if (operators.includes(char)) {
            isFinished = false; 
        } else {
            // If the next button is a number/function, clear and start fresh
            display.value = '';
            isFinished = false;
        }
    }

    if (display.value === '0' || display.value === 'Error') {
        display.value = char;
    } else {
        display.value += char;
    }
}

function backspace() {
    if (isFinished) {
        historyDisplay.innerText = '';
        isFinished = false;
        return;
    }
    if (display.value.length > 1) {
        display.value = display.value.slice(0, -1);
    } else {
        display.value = '0';
    }
}

function clearDisplay() {
    display.value = '0';
    historyDisplay.innerText = '';
    isFinished = false;
}

function useAns() {
    if (isFinished) {
        display.value = 'Ans';
        isFinished = false;
    } else {
        if (display.value === '0') display.value = 'Ans';
        else display.value += 'Ans';
    }
}

function runCalculate() {
    try {
        let expression = display.value;
        if(expression === '0') return;

        let processExpr = expression.replace(/÷/g, '/').replace(/×/g, '*').replace(/π/g, 'pi');
        processExpr = processExpr.replace(/Ans/g, `(${lastResult})`);

        if (currentMode === 'deg') {
            processExpr = processExpr.replace(/sin\(([^)]+)\)/g, 'sin($1 deg)');
            processExpr = processExpr.replace(/cos\(([^)]+)\)/g, 'cos($1 deg)');
            processExpr = processExpr.replace(/tan\(([^)]+)\)/g, 'tan($1 deg)');
        }

        const openCount = (processExpr.match(/\(/g) || []).length;
        const closeCount = (processExpr.match(/\)/g) || []).length;
        if (openCount > closeCount) {
            processExpr += ')'.repeat(openCount - closeCount);
        }

        const result = math.evaluate(processExpr);
        
        historyDisplay.innerText = expression + " =";
        display.value = math.format(result, { precision: 10 });
        
        lastResult = result; 
        isFinished = true; // Set flag to true because we just finished
        
    } catch (e) {
        display.value = "Error";
        isFinished = true;
    }
}