let mode = 'metric';

function setUnit(u) {
    mode = u;
    document.getElementById('metric-group').style.display = u === 'metric' ? 'block' : 'none';
    document.getElementById('us-group').style.display = u === 'us' ? 'block' : 'none';
    document.getElementById('btn-metric').classList.toggle('active', u === 'metric');
    document.getElementById('btn-us').classList.toggle('active', u === 'us');
    calculateBMI();
}

function calculateBMI() {
    const weight = parseFloat(document.getElementById('weight').value);
    let h = 0;

    if (mode === 'metric') {
        h = parseFloat(document.getElementById('height-cm').value) / 100;
    } else {
        const ft = parseFloat(document.getElementById('height-ft').value) || 0;
        const inch = parseFloat(document.getElementById('height-in').value) || 0;
        h = (ft * 0.3048) + (inch * 0.0254);
    }

    if (h > 0 && weight > 0) {
        const bmi = (weight / (h * h)).toFixed(1);
        document.getElementById('bmi-value').innerText = bmi;

        // Pointer math: BMI 15-40 maps to 0-100%
        let pos = ((bmi - 15) / (40 - 15)) * 100;
        pos = Math.max(0, Math.min(pos, 100));
        document.getElementById('bmi-pointer').style.left = `${Math.min(100, Math.max(0, pos))}%`;

        document.querySelectorAll('.table-item').forEach(i => i.classList.remove('highlight'));

        if (bmi < 18.5) update("Underweight", "#7dd3fc", "row-thin");
        else if (bmi < 25) update("Healthy", "#50fa7b", "row-normal");
        else if (bmi < 30) update("Overweight", "#f1fa8c", "row-over");
        else update("Obese", "#ff5555", "row-obese");
    }
}

const bmiAdvice = {
    underweight: "Your weight is below the healthy range. Focus on nutrient-dense foods like proteins, healthy fats (avocados, nuts), and whole grains. Strength training may help build muscle mass safely.",
    healthy: "Excellent! You are in the healthy weight range. Maintain this by staying active for at least 30 minutes a day and keeping a balanced diet rich in vegetables and lean protein.",
    overweight: "You are slightly above the healthy range. Small changes like reducing sugary drinks, controlling portion sizes, and increasing daily steps (aim for 10k) can make a big difference.",
    obese: "Your BMI indicates a higher health risk. It is highly recommended to consult a nutritionist or doctor. Focus on sustainable lifestyle changes, regular cardio, and avoiding processed foods."
};

function update(status, color, rowId) {
    const statusLabel = document.getElementById('bmi-status');
    const adviceBox = document.getElementById('advice-box');
    const adviceText = document.getElementById('advice-text');

    // 1. Update Status & Color
    statusLabel.innerText = status;
    statusLabel.style.color = color;

    // 2. Highlight Table Row
    document.querySelectorAll('.table-item').forEach(row => row.classList.remove('highlight'));
    document.getElementById(rowId).classList.add('highlight');

    // 3. Show Professional Advice
    adviceBox.style.display = "block";
    if (rowId === 'row-thin') adviceText.innerText = bmiAdvice.underweight;
    else if (rowId === 'row-normal') adviceText.innerText = bmiAdvice.healthy;
    else if (rowId === 'row-over') adviceText.innerText = bmiAdvice.overweight;
    else if (rowId === 'row-obese') adviceText.innerText = bmiAdvice.obese;
}