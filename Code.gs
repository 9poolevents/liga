const SPREADSHEET_ID = '1Q09viBUTDP15MJ9TIS_G0mKVu3otZ3GaQcMHswdgWg0';

function doGet(e) {
  const gid = String((e && e.parameter && e.parameter.gid) || '');
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheets().find(s => String(s.getSheetId()) === gid) || ss.getSheets()[0];
  const range = sheet.getDataRange();
  const values = range.getDisplayValues();
  const firstRow = range.getRow();
  const firstColumn = range.getColumn();
  const hiddenRows = [];
  const hiddenColumns = [];

  for (let r = 0; r < values.length; r++) {
    if (sheet.isRowHiddenByUser(firstRow + r)) hiddenRows.push(r);
  }
  for (let c = 0; c < (values[0] || []).length; c++) {
    if (sheet.isColumnHiddenByUser(firstColumn + c)) hiddenColumns.push(c);
  }

  const headerIndex = values.findIndex(row => row.filter(String).length >= 2);
  const safeHeaderIndex = headerIndex < 0 ? 0 : headerIndex;
  const headers = values[safeHeaderIndex] || [];
  const dataRows = values.slice(safeHeaderIndex + 1);
  const visibleRows = values.filter((_, i) => !hiddenRows.includes(i));
  const visibleHeaders = headers.filter((_, i) => !hiddenColumns.includes(i));
  const visibleDataRows = dataRows
    .map((row, i) => ({ row, sourceIndex: safeHeaderIndex + 1 + i }))
    .filter(item => !hiddenRows.includes(item.sourceIndex))
    .map(item => item.row.filter((_, i) => !hiddenColumns.includes(i)));

  return ContentService.createTextOutput(JSON.stringify({
    ok: true,
    gid: sheet.getSheetId(),
    name: sheet.getName(),
    updatedAt: new Date().toISOString(),
    headers: visibleHeaders,
    rows: visibleRows.map(row => row.filter((_, i) => !hiddenColumns.includes(i))),
    dataRows: visibleDataRows,
    hiddenRows: hiddenRows,
    hiddenColumns: hiddenColumns
  })).setMimeType(ContentService.MimeType.JSON);
}

function test() { Logger.log(doGet({parameter: {gid: '1'}}).getContent()); }
