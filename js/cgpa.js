/**
 * CGPA Analysis Dashboard Logic
 * Handles dynamic row addition, CGPA calculation, and PDF export.
 */

// Function to add a new subject row to the table
function addRow() {
    const tableBody = document.getElementById('subject-body');
    const tr = document.createElement('tr');
    
    tr.innerHTML = `
        <td><input type="text" class="subj-input" placeholder="e.g. Physics"></td>
        <td><input type="number" step="0.25" min="0" class="credit-input" placeholder="3.0"></td>
        <td>
            <select class="grade-input">
                <option value="4.00">A+ (4.00)</option>
                <option value="3.75">A (3.75)</option>
                <option value="3.50">A- (3.50)</option>
                <option value="3.25">B+ (3.25)</option>
                <option value="3.00">B (3.00)</option>
                <option value="2.75">B- (2.75)</option>
                <option value="2.50">C+ (2.50)</option>
                <option value="2.00">C (2.00)</option>
                <option value="1.00">D (1.00)</option>
                <option value="0.00">F (0.00)</option>
            </select>
        </td>
        <td><button class="delete-btn" onclick="this.closest('tr').remove()"><i class="ri-close-circle-line"></i></button></td>
    `;
    tableBody.appendChild(tr);
}

// Function to calculate CGPA and update the UI
function calculateCGPA() {
    const rows = document.querySelectorAll('#subject-body tr');
    let totalPoints = 0;
    let totalCredits = 0;
    let hasNegativeError = false;

    rows.forEach(row => {
        const creditInput = row.querySelector('.credit-input');
        const creditVal = creditInput.value;
        const gradeVal = parseFloat(row.querySelector('.grade-input').value);

        if (creditVal !== "") {
            const credit = parseFloat(creditVal);
            
            // Validation: Ensure credits aren't negative
            if (credit < 0) {
                hasNegativeError = true;
                creditInput.style.border = "1px solid #ff5555";
            } else {
                creditInput.style.border = ""; // Reset border if fixed
                totalPoints += (credit * gradeVal);
                totalCredits += credit;
            }
        }
    });

    if (hasNegativeError) {
        alert("Error: Credits cannot be negative numbers!");
        return null;
    }

    if (totalCredits > 0) {
        const cgpa = (totalPoints / totalCredits).toFixed(2);
        
        // Update UI elements based on your HTML IDs
        document.getElementById('final-cgpa').innerText = cgpa;
        document.getElementById('res-credits').innerText = totalCredits.toFixed(2);
        document.getElementById('res-points').innerText = totalPoints.toFixed(2);
        
        // Show the result card
        document.getElementById('cgpa-result-card').style.display = "block";
        
        return { cgpa, totalCredits, totalPoints };
    } else {
        alert("Please enter credits for at least one subject.");
        return null;
    }
}

// Function to generate and download the PDF marksheet
function downloadResult() {
    // Run calculation first to ensure we have data
    const calc = calculateCGPA();
    if (!calc) return;

    // Get metadata from inputs
    const studentName = document.getElementById('student-name').value || "Not Provided";
    const instituteName = document.getElementById('inst-name').value || "Math Toolkit Academy";
    const programName = document.getElementById('prog-name').value || "Academic Program";

    // Build the dynamic table rows for the PDF
    let pdfRows = "";
    document.querySelectorAll('#subject-body tr').forEach(row => {
        const sub = row.querySelector('.subj-input').value || "Subject";
        const crd = row.querySelector('.credit-input').value;
        const grd = row.querySelector('.grade-input').options[row.querySelector('.grade-input').selectedIndex].text;
        
        if (crd && parseFloat(crd) >= 0) {
            pdfRows += `
                <tr>
                    <td style="border: 1px solid #000; padding: 10px;">${sub}</td>
                    <td style="border: 1px solid #000; padding: 10px; text-align: center;">${crd}</td>
                    <td style="border: 1px solid #000; padding: 10px; text-align: center;">${grd}</td>
                </tr>`;
        }
    });

    // Construct the Marksheet HTML string
    const marksheetHTML = `
        <div style="padding: 40px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #000; background: #fff;">
            <div style="text-align: center; border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 20px;">
                <h1 style="margin: 0; text-transform: uppercase;">${instituteName}</h1>
                <p style="margin: 5px 0; font-size: 14px; letter-spacing: 2px;">UNOFFICIAL ACADEMIC MARKSHEET</p>
            </div>
            
            <div style="display: flex; justify-content: space-between; margin-bottom: 30px; font-size: 14px;">
                <div>
                    <p><strong>Student:</strong> ${studentName}</p>
                    <p><strong>Program:</strong> ${programName}</p>
                </div>
                <div style="text-align: right;">
                    <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
                    <p><strong>Status:</strong> Generated via Math Toolkit</p>
                </div>
            </div>

            <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
                <thead>
                    <tr style="background: #f2f2f2;">
                        <th style="border: 1px solid #000; padding: 12px; text-align: left;">Subject Name</th>
                        <th style="border: 1px solid #000; padding: 12px; width: 100px;">Credits</th>
                        <th style="border: 1px solid #000; padding: 12px; width: 150px;">Grade Point</th>
                    </tr>
                </thead>
                <tbody>
                    ${pdfRows}
                </tbody>
            </table>

            <div style="display: flex; justify-content: flex-end;">
                <div style="width: 250px; text-align: right; border-top: 2px solid #000; padding-top: 10px;">
                    <p style="margin: 5px 0;">Total Credits: <strong>${calc.totalCredits.toFixed(2)}</strong></p>
                    <p style="margin: 5px 0;">Total Points: <strong>${calc.totalPoints.toFixed(2)}</strong></p>
                    <h2 style="margin: 10px 0; color: #000;">Final CGPA: ${calc.cgpa}</h2>
                </div>
            </div>
            
            <div style="margin-top: 50px; font-size: 10px; color: #666; text-align: center;">
                This is a computer-generated document. No signature required.
            </div>
        </div>
    `;

    // PDF Configuration
    const options = {
        margin: 0.5,
        filename: `${studentName.replace(/\s+/g, '_')}_Marksheet.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    // Execute Download
    html2pdf().from(marksheetHTML).set(options).save();
}