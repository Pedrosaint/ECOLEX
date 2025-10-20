
export const printContent = (htmlContent: string, title = "Print Preview") => {
  const printWindow = window.open("", "", "width=900,height=650");
  if (!printWindow) return;

  printWindow.document.write(`
    <html>
      <head>
        <title>${title}</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 20px;
            color: #333;
          }
          table {
            border-collapse: collapse;
            width: 100%;
          }
          th, td {
            border: 1px solid #ccc;
            padding: 8px;
            text-align: left;
          }
          th {
            background-color: #f4f4f4;
          }
          h2 {
            text-align: center;
            margin-bottom: 16px;
          }
          /* Hide elements with this class when printing */
          .no-print {
            display: none !important;
          }
        </style>
      </head>
      <body>
        <h2>${title}</h2>
        ${htmlContent}
      </body>
    </html>
  `);

  printWindow.document.close();
  printWindow.focus();

  setTimeout(() => {
    printWindow.print();
    printWindow.close();
  }, 500);
};
