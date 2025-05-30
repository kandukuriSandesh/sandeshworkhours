import * as XLSX from 'xlsx';

export const downloadCsv = (tableHoursData, startDate, endDate) => {
  if (!tableHoursData || tableHoursData.length === 0) return;

  // 1. Define your Excel headers
  const headers = ['Date', 'Start Time', 'End Time', 'Total Hours', 'Break', 'Holiday'];

  // 2. Map your data objects to rows (same order as headers)
  const rows = tableHoursData.map(({ date, start, end, total_hours, break: brk, holiday, special_day }) => [
    date,
    start,
    end,
    total_hours,
    brk ?? 'No break',
    holiday ? 'Applied Holiday' : special_day ? special_day : '-',
  ]);

  // 3. Create worksheet from data
  const worksheet = XLSX.utils.aoa_to_sheet([headers, ...rows]);

  // 4. Set column widths (wch = "characters width")
  worksheet['!cols'] = [
    { wch: 15 }, // Date column
    { wch: 12 }, // Start Time
    { wch: 12 }, // End Time
    { wch: 15 }, // Total Hours
    { wch: 15 }, // Break
    { wch: 15 }, // Holiday
  ];

  // 5. Create workbook
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Work Hours');

  // 6. Save as Excel file
  const filename = `${startDate}-${endDate} work-hours.xlsx`;
  XLSX.writeFile(workbook, filename);
};



