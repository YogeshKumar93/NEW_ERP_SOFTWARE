// resources/js/Utils/PrintHelper.js

export const printRowReceipt = (title, details, organization = "BIGGBRAINS 4.0 ERP") => {
    const printWindow = window.open('', '_blank', 'width=900,height=700');
    if (!printWindow) {
        alert("Please allow pop-ups for this site to print.");
        return;
    }

    // Tally style table rows generation
    const detailsHtml = Object.entries(details).map(([label, value]) => `
        <tr>
            <td class="label">${label}</td>
            <td class="separator">:</td>
            <td class="value">${value || '-'}</td>
        </tr>
    `).join('');

    const htmlContent = `
        <html>
            <head>
                <title>Print - ${title}</title>
                <style>
                    @page { size: A5 landscape; margin: 5mm; }
                    body { 
                        font-family: 'Consolas', 'Courier New', monospace; 
                        padding: 10px; 
                        background-color: #fff;
                        color: #000;
                    }
                    /* Main Tally Border Container */
                    .tally-container {
                        border: 2px solid #000;
                        padding: 1px;
                        min-height: 95vh;
                    }
                    .inner-border {
                        border: 1px solid #000;
                        padding: 15px;
                        height: 100%;
                    }
                    /* Header Section */
                    .header {
                        text-align: center;
                        border-bottom: 1px solid #000;
                        margin-bottom: 20px;
                        padding-bottom: 10px;
                    }
                    .header h2 {
                        margin: 0;
                        font-size: 20px;
                        text-decoration: underline;
                        letter-spacing: 2px;
                    }
                    .org-name {
                        font-size: 16px;
                        font-weight: bold;
                        margin-top: 5px;
                        display: block;
                    }
                    /* Table Styles */
                    .content-table {
                        width: 100%;
                        border-collapse: collapse;
                        margin-top: 10px;
                    }
                    .content-table td {
                        padding: 6px 0;
                        font-size: 14px;
                        vertical-align: top;
                    }
                    .label {
                        width: 30%;
                        font-weight: bold;
                        text-transform: uppercase;
                    }
                    .separator {
                        width: 5%;
                        text-align: center;
                    }
                    .value {
                        width: 65%;
                        font-weight: normal;
                    }
                    /* Footer Section */
                    .footer {
                        margin-top: 50px;
                        display: flex;
                        justify-content: space-between;
                        align-items: flex-end;
                    }
                    .timestamp {
                        font-size: 10px;
                        font-style: italic;
                    }
                    .signature-box {
                        text-align: center;
                    }
                    .signature-line {
                        border-top: 1px solid #000;
                        width: 200px;
                        margin-top: 40px;
                        padding-top: 5px;
                        font-weight: bold;
                        font-size: 12px;
                    }
                    @media print {
                        body { padding: 0; }
                        .tally-container { border-width: 2px; }
                    }
                </style>
            </head>
            <body>
                <div class="tally-container">
                    <div class="inner-border">
                        <div class="header">
                            <h2>${title}</h2>
                            <span class="org-name">${organization}</span>
                        </div>
                        
                        <table class="content-table">
                            ${detailsHtml}
                        </table>

                        <div class="footer">
                            <div class="timestamp">
                                Date: ${new Date().toLocaleDateString()}<br>
                                Time: ${new Date().toLocaleTimeString()}
                            </div>
                            <div class="signature-box">
                                <p style="font-size: 11px; margin-bottom: 30px;">For ${organization}</p>
                                <div class="signature-line">Authorised Signatory</div>
                            </div>
                        </div>
                    </div>
                </div>
                <script>
                    window.onload = function() {
                        window.print();
                        // window.close(); // Agar aap chahte hain print ke baad tab band ho jaye to ise uncomment karein
                    };
                </script>
            </body>
        </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
};