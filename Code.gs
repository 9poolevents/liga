const SPREADSHEET_ID = '1Q09viBUTDP15MJ9TIS_G0mKVu3otZ3GaQcMHswdgWg0';

function doGet(e) {
  const params = (e && e.parameter) || {};
  const requestedName = String(params.name || '').trim();
  const requestedGid = String(params.gid || '').trim();
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  // Nama sheet adalah sumber utama; gid hanya fallback untuk kompatibilitas.
  const sheet = (requestedName && ss.getSheetByName(requestedName))
    || ss.getSheets().find(s => String(s.getSheetId()) === requestedGid)
    || ss.getSheets()[0];
  const range = sheet.getDataRange();
  const values = range.getDisplayValues();
  const firstRow = range.getRow();
  const firstColumn = range.getColumn();
  const width = values.length ? values[0].length : 0;
  const hiddenRows = [];
  const hiddenColumns = [];

  for (let r = 0; r < values.length; r++) {
    if (sheet.isRowHiddenByUser(firstRow + r)) hiddenRows.push(r);
  }
  for (let c = 0; c < width; c++) {
    if (sheet.isColumnHiddenByUser(firstColumn + c)) hiddenColumns.push(c);
  }

  const visible = (row) => row.filter((_, i) => !hiddenColumns.includes(i));
  const headerIndex = values.findIndex(row => row.filter(String).length >= 2);
  const safeHeaderIndex = headerIndex < 0 ? 0 : headerIndex;
  const headers = visible(values[safeHeaderIndex] || []);
  const dataRows = values
    .map((row, sourceIndex) => ({ row: visible(row), sourceIndex }))
    .filter(item => !hiddenRows.includes(item.sourceIndex));

  return ContentService.createTextOutput(JSON.stringify({
    ok: true,
    requestedName,
    requestedGid,
    gid: sheet.getSheetId(),
    name: sheet.getName(),
    updatedAt: new Date().toISOString(),
    headers,
    rows: dataRows.map(item => item.row),
    dataRows: dataRows.slice(safeHeaderIndex + 1).map(item => item.row),
    hiddenRows,
    hiddenColumns
  })).setMimeType(ContentService.MimeType.JSON);
}

function test() { Logger.log(doGet({parameter: {name: 'Input Hasil'}}).getContent()); }
