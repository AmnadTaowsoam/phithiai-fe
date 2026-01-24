/**
 * Export Utility Functions
 * Provides functionality for exporting data as PDF, Excel, CSV
 */

/**
 * Export data to CSV format
 */
export async function exportToCSV(
  data: Record<string, unknown>[],
  filename: string
): Promise<void> {
  // Get headers from first row
  const headers = Object.keys(data);
  
  // Convert data to CSV rows
  const csvRows = headers.map((header) => {
    return headers.map((key) => {
      const value = data[key];
      // Escape quotes and commas
      const escapedValue = String(value)
        .replace(/"/g, '""')
        .replace(/,/g, '","');
      
      return `"${escapedValue}"`;
    }).join(',');
  });

  // Create CSV content
  const csvContent = [headers.join(','), ...csvRows].join('\n');

  // Create blob and download
  const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${filename}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Export data to Excel format (simple HTML table that Excel can open)
 */
export async function exportToExcel(
  data: Record<string, unknown>[],
  filename: string
): Promise<void> {
  const headers = Object.keys(data);
  
  // Create HTML table
  const table = document.createElement('table');
  table.setAttribute('border', '1');
  table.setAttribute('cellpadding', '8');
  table.setAttribute('cellspacing', '0');

  // Header row
  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');
  headers.forEach((header) => {
    const th = document.createElement('th');
    th.textContent = header;
    th.style.cssText = 'background-color: #4F81BD; color: white; font-weight: bold; padding: 8px;';
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  table.appendChild(thead);

  // Data rows
  const tbody = document.createElement('tbody');
  Object.entries(data).forEach(([key, value]) => {
    const row = document.createElement('tr');
    
    const th = document.createElement('td');
    th.textContent = key;
    th.style.cssText = 'background-color: #F2F2F2; padding: 8px;';
    row.appendChild(th);

    const td = document.createElement('td');
    td.textContent = String(value);
    td.style.cssText = 'padding: 8px;';
    row.appendChild(td);

    tbody.appendChild(row);
  });
  table.appendChild(tbody);

  // Create HTML document
  const htmlContent = `
    <html xmlns:o="urn:schemas-microsoft-com:office:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>
          table { border-collapse: collapse; }
          td { border: 1px solid #ccc; }
        </style>
      </head>
      <body>
        ${table.outerHTML}
      </body>
    </html>
  `;

  const blob = new Blob([htmlContent], { type: 'application/vnd.ms-excel' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${filename}.xls`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Export bookings to PDF
 */
export async function exportBookingsToPDF(
  bookings: any[],
  filename: string = 'bookings'
): Promise<void> {
  // Create a simple text representation for PDF export
  // In a real implementation, this would use a PDF library like jsPDF
  const textContent = bookings.map((b, index) => {
    return `Booking #${index + 1}
Vendor: ${b.vendor?.name || 'N/A'}
Event: ${b.eventType || 'N/A'}
Date: ${b.eventDate ? new Date(b.eventDate).toLocaleDateString('th-TH') : 'N/A'}
Status: ${b.status || 'N/A'}
Total: ${b.total || 0}
Deposit: ${b.depositAmount || 0}
Balance: ${b.total && b.depositAmount ? b.total - b.depositAmount : 0}
-------------------`;
  }).join('\n');

  const blob = new Blob([textContent], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${filename}.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Export guest list to CSV
 */
export async function exportGuestsToCSV(
  guests: any[],
  filename: string = 'guests'
): Promise<void> {
  const data = guests.map((guest, index) => ({
    'No.': index + 1,
    'Name': guest.name || '',
    'Email': guest.email || '',
    'Phone': guest.phone || '',
    'Status': guest.status || '',
    'Table': guest.tableNumber || '',
  }));

  await exportToCSV(data, filename);
}

/**
 * Download a single document
 */
export function downloadDocument(
  url: string,
  filename: string
): void {
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.target = '_blank';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
