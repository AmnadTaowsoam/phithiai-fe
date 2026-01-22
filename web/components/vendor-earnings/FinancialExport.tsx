'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  IconDownload,
  IconFileText,
  IconCalendar,
  IconFilter,
  IconCheck,
  IconX,
  IconFileCv,
  IconFileSpreadsheet,
  IconFileDescription,
  IconReceipt,
  IconChartBar
} from '@tabler/icons-react';

export interface FinancialRecord {
  id: string;
  date: Date;
  description: string;
  category: string;
  grossAmount: number;
  commissionRate: number;
  commissionAmount: number;
  platformFee: number;
  processingFee: number;
  taxAmount: number;
  netAmount: number;
  reference?: string;
}

export interface TaxSummary {
  period: { start: Date; end: Date };
  totalGrossRevenue: number;
  totalCommission: number;
  totalPlatformFee: number;
  totalProcessingFee: number;
  totalTax: number;
  totalNetPayout: number;
  taxRate: number;
  taxableAmount: number;
}

export interface ExportOptions {
  format: 'csv' | 'pdf' | 'json';
  dateRange: {
    start: Date;
    end: Date;
  };
  includeTaxSummary: boolean;
  includeLedgerDetails: boolean;
  groupByCategory: boolean;
}

export function FinancialExport() {
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportOptions, setExportOptions] = useState<ExportOptions>({
    format: 'csv',
    dateRange: {
      start: new Date(new Date().getFullYear(), new Date().getMonth(), 1), // First day of current month
      end: new Date()
    },
    includeTaxSummary: true,
    includeLedgerDetails: true,
    groupByCategory: true
  });
  const [isExporting, setIsExporting] = useState(false);

  // Mock financial records
  const mockRecords: FinancialRecord[] = [
    {
      id: 'TXN-001',
      date: new Date('2026-01-28'),
      description: 'Wedding Ceremony - Smith Family',
      category: 'Wedding',
      grossAmount: 85000,
      commissionRate: 10,
      commissionAmount: 8500,
      platformFee: 1700,
      processingFee: 1275,
      taxAmount: 850,
      netAmount: 72675,
      reference: 'BK-2026-001'
    },
    {
      id: 'TXN-002',
      date: new Date('2026-01-25'),
      description: 'Ordination Ceremony - Johnson',
      category: 'Ordination',
      grossAmount: 45000,
      commissionRate: 10,
      commissionAmount: 4500,
      platformFee: 900,
      processingFee: 675,
      taxAmount: 450,
      netAmount: 38475,
      reference: 'BK-2026-002'
    },
    {
      id: 'TXN-003',
      date: new Date('2026-01-22'),
      description: 'Merit Making - Temple Event',
      category: 'Merit',
      grossAmount: 25000,
      commissionRate: 10,
      commissionAmount: 2500,
      platformFee: 500,
      processingFee: 375,
      taxAmount: 250,
      netAmount: 21375,
      reference: 'BK-2026-003'
    },
    {
      id: 'TXN-004',
      date: new Date('2026-01-20'),
      description: 'Wedding Ceremony - Davis',
      category: 'Wedding',
      grossAmount: 30000,
      commissionRate: 10,
      commissionAmount: 3000,
      platformFee: 600,
      processingFee: 450,
      taxAmount: 300,
      netAmount: 25650,
      reference: 'BK-2026-004'
    },
    {
      id: 'TXN-005',
      date: new Date('2026-01-18'),
      description: 'Refund - Cancelled Booking',
      category: 'Refund',
      grossAmount: -15000,
      commissionRate: 10,
      commissionAmount: -1500,
      platformFee: -300,
      processingFee: -225,
      taxAmount: -150,
      netAmount: -12825,
      reference: 'RF-2026-001'
    },
  ];

  const calculateTaxSummary = (records: FinancialRecord[]): TaxSummary => {
    const validRecords = records.filter(r => r.grossAmount > 0);
    const totalGrossRevenue = validRecords.reduce((sum, r) => sum + r.grossAmount, 0);
    const totalCommission = validRecords.reduce((sum, r) => sum + r.commissionAmount, 0);
    const totalPlatformFee = validRecords.reduce((sum, r) => sum + r.platformFee, 0);
    const totalProcessingFee = validRecords.reduce((sum, r) => sum + r.processingFee, 0);
    const totalTax = validRecords.reduce((sum, r) => sum + r.taxAmount, 0);
    const totalNetPayout = validRecords.reduce((sum, r) => sum + r.netAmount, 0);

    const taxRate = 0.01; // 1% tax rate
    const taxableAmount = totalGrossRevenue;

    return {
      period: exportOptions.dateRange,
      totalGrossRevenue,
      totalCommission,
      totalPlatformFee,
      totalProcessingFee,
      totalTax,
      totalNetPayout,
      taxRate,
      taxableAmount
    };
  };

  const formatCurrency = (amount: number) => {
    return `${amount.toLocaleString('th-TH')} THB`;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('th-TH', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const handleExport = async () => {
    setIsExporting(true);
    // Simulate export delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    const filteredRecords = mockRecords.filter(
      record => record.date >= exportOptions.dateRange.start && record.date <= exportOptions.dateRange.end
    );

    const taxSummary = calculateTaxSummary(filteredRecords);

    switch (exportOptions.format) {
      case 'csv':
        exportToCSV(filteredRecords, taxSummary);
        break;
      case 'pdf':
        exportToPDF(filteredRecords, taxSummary);
        break;
      case 'json':
        exportToJSON(filteredRecords, taxSummary);
        break;
    }

    setIsExporting(false);
    setShowExportModal(false);
  };

  const exportToCSV = (records: FinancialRecord[], taxSummary: TaxSummary) => {
    let csv = '';

    if (exportOptions.includeTaxSummary) {
      csv += 'TAX SUMMARY\n';
      csv += `Period,${formatDate(taxSummary.period.start)} - ${formatDate(taxSummary.period.end)}\n`;
      csv += `Total Gross Revenue,${taxSummary.totalGrossRevenue}\n`;
      csv += `Total Commission,${taxSummary.totalCommission}\n`;
      csv += `Total Platform Fee,${taxSummary.totalPlatformFee}\n`;
      csv += `Total Processing Fee,${taxSummary.totalProcessingFee}\n`;
      csv += `Total Tax,${taxSummary.totalTax}\n`;
      csv += `Total Net Payout,${taxSummary.totalNetPayout}\n`;
      csv += `Tax Rate,${(taxSummary.taxRate * 100)}%\n\n`;
    }

    csv += 'TRANSACTION DETAILS\n';
    csv += 'Date,Description,Category,Gross Amount,Commission Rate,Commission Amount,Platform Fee,Processing Fee,Tax Amount,Net Amount,Reference\n';

    records.forEach(record => {
      csv += `${formatDate(record.date)},${record.description},${record.category},${record.grossAmount},${record.commissionRate}%,${record.commissionAmount},${record.platformFee},${record.processingFee},${record.taxAmount},${record.netAmount},${record.reference || ''}\n`;
    });

    downloadFile(csv, `financial-export-${Date.now()}.csv`, 'text/csv');
  };

  const exportToPDF = (records: FinancialRecord[], taxSummary: TaxSummary) => {
    // For PDF export, we'll create a text-based representation
    // In production, this would use a library like jsPDF or react-pdf
    let content = 'PHITHIAI FINANCIAL REPORT\n';
    content += '='.repeat(50) + '\n\n';

    if (exportOptions.includeTaxSummary) {
      content += 'TAX SUMMARY\n';
      content += '-'.repeat(20) + '\n';
      content += `Period: ${formatDate(taxSummary.period.start)} - ${formatDate(taxSummary.period.end)}\n`;
      content += `Total Gross Revenue: ${formatCurrency(taxSummary.totalGrossRevenue)}\n`;
      content += `Total Commission: ${formatCurrency(taxSummary.totalCommission)}\n`;
      content += `Total Platform Fee: ${formatCurrency(taxSummary.totalPlatformFee)}\n`;
      content += `Total Processing Fee: ${formatCurrency(taxSummary.totalProcessingFee)}\n`;
      content += `Total Tax: ${formatCurrency(taxSummary.totalTax)}\n`;
      content += `Total Net Payout: ${formatCurrency(taxSummary.totalNetPayout)}\n`;
      content += `Tax Rate: ${(taxSummary.taxRate * 100)}%\n\n`;
    }

    content += 'TRANSACTION DETAILS\n';
    content += '-'.repeat(20) + '\n\n';

    records.forEach(record => {
      content += `Date: ${formatDate(record.date)}\n`;
      content += `Description: ${record.description}\n`;
      content += `Category: ${record.category}\n`;
      content += `Gross Amount: ${formatCurrency(record.grossAmount)}\n`;
      content += `Commission Rate: ${record.commissionRate}%\n`;
      content += `Commission Amount: ${formatCurrency(record.commissionAmount)}\n`;
      content += `Platform Fee: ${formatCurrency(record.platformFee)}\n`;
      content += `Processing Fee: ${formatCurrency(record.processingFee)}\n`;
      content += `Tax Amount: ${formatCurrency(record.taxAmount)}\n`;
      content += `Net Amount: ${formatCurrency(record.netAmount)}\n`;
      content += `Reference: ${record.reference || 'N/A'}\n`;
      content += '\n' + '-'.repeat(40) + '\n\n';
    });

    downloadFile(content, `financial-export-${Date.now()}.txt`, 'text/plain');
  };

  const exportToJSON = (records: FinancialRecord[], taxSummary: TaxSummary) => {
    const data = {
      exportDate: new Date().toISOString(),
      format: 'json',
      dateRange: {
        start: exportOptions.dateRange.start.toISOString(),
        end: exportOptions.dateRange.end.toISOString()
      },
      taxSummary: exportOptions.includeTaxSummary ? {
        period: {
          start: taxSummary.period.start.toISOString(),
          end: taxSummary.period.end.toISOString()
        },
        totalGrossRevenue: taxSummary.totalGrossRevenue,
        totalCommission: taxSummary.totalCommission,
        totalPlatformFee: taxSummary.totalPlatformFee,
        totalProcessingFee: taxSummary.totalProcessingFee,
        totalTax: taxSummary.totalTax,
        totalNetPayout: taxSummary.totalNetPayout,
        taxRate: taxSummary.taxRate,
        taxableAmount: taxSummary.taxableAmount
      } : undefined,
      records: records.map(record => ({
        id: record.id,
        date: record.date.toISOString(),
        description: record.description,
        category: record.category,
        grossAmount: record.grossAmount,
        commissionRate: record.commissionRate,
        commissionAmount: record.commissionAmount,
        platformFee: record.platformFee,
        processingFee: record.processingFee,
        taxAmount: record.taxAmount,
        netAmount: record.netAmount,
        reference: record.reference
      }))
    };

    downloadFile(JSON.stringify(data, null, 2), `financial-export-${Date.now()}.json`, 'application/json');
  };

  const downloadFile = (content: string, filename: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const getFormatIcon = (format: string) => {
    switch (format) {
      case 'csv': return IconFileCv;
      case 'pdf': return IconFileSpreadsheet;
      case 'json': return IconFileDescription;
      default: return IconFileText;
    }
  };

  const getFormatLabel = (format: string) => {
    switch (format) {
      case 'csv': return 'CSV (Excel)';
      case 'pdf': return 'PDF Report';
      case 'json': return 'JSON (API)';
      default: return 'Text';
    }
  };

  const getFormatDescription = (format: string) => {
    switch (format) {
      case 'csv': return 'Compatible with Xero, QuickBooks, Excel';
      case 'pdf': return 'Printable financial report';
      case 'json': return 'Machine-readable data format';
      default: return 'Plain text format';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
            <IconDownload className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Financial Export</h2>
            <p className="text-sm text-gray-500">Download your financial data for accounting</p>
          </div>
        </div>
        <button
          onClick={() => setShowExportModal(true)}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700"
        >
          <IconDownload className="w-4 h-4" />
          Export Data
        </button>
      </div>

      {/* Quick Export Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {(['csv', 'pdf', 'json'] as const).map((format) => {
          const FormatIcon = getFormatIcon(format);
          return (
            <motion.button
              key={format}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setExportOptions({ ...exportOptions, format });
                setShowExportModal(true);
              }}
              className="p-5 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-purple-300 transition-all text-left"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                  <FormatIcon className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{getFormatLabel(format)}</h3>
                </div>
              </div>
              <p className="text-sm text-gray-600">{getFormatDescription(format)}</p>
            </motion.button>
          );
        })}
      </div>

      {/* Export Modal */}
      {showExportModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowExportModal(false)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Export Financial Data</h3>
                  <p className="text-sm text-gray-500">Configure your export settings</p>
                </div>
                <button
                  onClick={() => setShowExportModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <IconX className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Format Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Export Format
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {(['csv', 'pdf', 'json'] as const).map((format) => {
                    const FormatIcon = getFormatIcon(format);
                    return (
                      <button
                        key={format}
                        onClick={() => setExportOptions({ ...exportOptions, format })}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          exportOptions.format === format
                            ? 'border-purple-500 bg-purple-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex flex-col items-center gap-2">
                          <FormatIcon className={`w-6 h-6 ${exportOptions.format === format ? 'text-purple-600' : 'text-gray-400'}`} />
                          <span className={`text-sm font-medium ${exportOptions.format === format ? 'text-purple-700' : 'text-gray-700'}`}>
                            {format.toUpperCase()}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Date Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  <div className="flex items-center gap-2">
                    <IconCalendar className="w-4 h-4 text-gray-400" />
                    Date Range
                  </div>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Start Date</label>
                    <input
                      type="date"
                      value={exportOptions.dateRange.start.toISOString().split('T')[0]}
                      onChange={(e) => setExportOptions({
                        ...exportOptions,
                        dateRange: { ...exportOptions.dateRange, start: new Date(e.target.value) }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">End Date</label>
                    <input
                      type="date"
                      value={exportOptions.dateRange.end.toISOString().split('T')[0]}
                      onChange={(e) => setExportOptions({
                        ...exportOptions,
                        dateRange: { ...exportOptions.dateRange, end: new Date(e.target.value) }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => setExportOptions({
                      ...exportOptions,
                      dateRange: {
                        start: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
                        end: new Date()
                      }
                    })}
                    className="px-3 py-1.5 text-xs font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                  >
                    This Month
                  </button>
                  <button
                    onClick={() => setExportOptions({
                      ...exportOptions,
                      dateRange: {
                        start: new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1),
                        end: new Date(new Date().getFullYear(), new Date().getMonth(), 0)
                      }
                    })}
                    className="px-3 py-1.5 text-xs font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                  >
                    Last Month
                  </button>
                  <button
                    onClick={() => setExportOptions({
                      ...exportOptions,
                      dateRange: {
                        start: new Date(new Date().getFullYear(), 0, 1),
                        end: new Date()
                      }
                    })}
                    className="px-3 py-1.5 text-xs font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                  >
                    This Year
                  </button>
                </div>
              </div>

              {/* Export Options */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  <div className="flex items-center gap-2">
                    <IconFilter className="w-4 h-4 text-gray-400" />
                    Include in Export
                  </div>
                </label>
                <div className="space-y-3">
                  <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${exportOptions.includeTaxSummary ? 'border-purple-500 bg-purple-500' : 'border-gray-300'}`}>
                        {exportOptions.includeTaxSummary && <IconCheck className="w-3.5 h-3.5 text-white" />}
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-900">Tax Summary</span>
                        <p className="text-xs text-gray-500">Include tax calculations for annual reporting</p>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={exportOptions.includeTaxSummary}
                      onChange={(e) => setExportOptions({ ...exportOptions, includeTaxSummary: e.target.checked })}
                      className="sr-only"
                    />
                  </label>

                  <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${exportOptions.includeLedgerDetails ? 'border-purple-500 bg-purple-500' : 'border-gray-300'}`}>
                        {exportOptions.includeLedgerDetails && <IconCheck className="w-3.5 h-3.5 text-white" />}
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-900">Ledger Details</span>
                        <p className="text-xs text-gray-500">Include full transaction history</p>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={exportOptions.includeLedgerDetails}
                      onChange={(e) => setExportOptions({ ...exportOptions, includeLedgerDetails: e.target.checked })}
                      className="sr-only"
                    />
                  </label>

                  <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${exportOptions.groupByCategory ? 'border-purple-500 bg-purple-500' : 'border-gray-300'}`}>
                        {exportOptions.groupByCategory && <IconCheck className="w-3.5 h-3.5 text-white" />}
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-900">Group by Category</span>
                        <p className="text-xs text-gray-500">Organize transactions by service type</p>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={exportOptions.groupByCategory}
                      onChange={(e) => setExportOptions({ ...exportOptions, groupByCategory: e.target.checked })}
                      className="sr-only"
                    />
                  </label>
                </div>
              </div>

              {/* Preview */}
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-start gap-2">
                  <IconReceipt className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-blue-900">Export Preview</h4>
                    <p className="text-xs text-blue-700 mt-1">
                      {mockRecords.filter(
                        record => record.date >= exportOptions.dateRange.start && record.date <= exportOptions.dateRange.end
                      ).length} transactions will be exported in {getFormatLabel(exportOptions.format)} format
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={() => setShowExportModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleExport}
                disabled={isExporting}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isExporting ? (
                  <>
                    <IconChartBar className="w-4 h-4 animate-spin" />
                    Exporting...
                  </>
                ) : (
                  <>
                    <IconDownload className="w-4 h-4" />
                    Export {exportOptions.format.toUpperCase()}
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
