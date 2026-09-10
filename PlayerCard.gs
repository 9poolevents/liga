const PLAYER_CARD_CONFIG = {
  targetNames: ['Player to Player', 'Player vs Player'],
  sourceResults: 'Input Hasil',
  sourcePlayers: 'Peserta',
  sourceStandings: 'Klasemen',
  selectedCell: 'B3',
  firstMatchRow: 15,
  lastMatchRow: 54
};

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('Kartu Pemain')
    .addItem('Siapkan / perbaiki kartu', 'setupPlayerCard')
    .addItem('Muat ulang kartu', 'refreshPlayerCard')
    .addToUi();
}

function setupPlayerCard() {
  const ss = SpreadsheetApp.getActive();
  const sheet = findTargetSheet_(ss);
  if (!sheet) throw new Error('Sheet Player to Player atau Player vs Player tidak ditemukan.');

  sheet.getRange('A1:F54').clearContent();
  sheet.getRange('A1:F54').clearDataValidations();
  sheet.getRange('A1:F54').clearFormat();

  sheet.getRange('A1:F1').merge().setValue('KARTU PEMAIN');
  sheet.getRange('A3:B12').setValues([
    ['Pilih Nama', ''], ['Ranking', ''], ['Main', ''], ['Menang', ''], ['Kalah', ''],
    ['Rack Menang', ''], ['Rack Kalah', ''], ['Selisih', ''], ['Poin', ''], ['Win %', '']
  ]);
  sheet.getRange('A14:F14').setValues([['No', 'ID Hasil', 'Lawan', 'Posisi sebagai', 'Skor', 'Hasil']]);

  const names = getPlayerNames_();
  if (!names.length) throw new Error('Nama pemain tidak ditemukan dari sheet Peserta atau Input Hasil.');
  const validation = SpreadsheetApp.newDataValidation().requireValueInList(names, true).setAllowInvalid(false).build();
  sheet.getRange(PLAYER_CARD_CONFIG.selectedCell).setDataValidation(validation).setValue(names[0]);

  stylePlayerCard_(sheet);
  refreshPlayerCard();
}

function refreshPlayerCard() {
  const ss = SpreadsheetApp.getActive();
  const sheet = findTargetSheet_(ss);
  if (!sheet) throw new Error('Sheet kartu pemain tidak ditemukan.');
  const selected = String(sheet.getRange(PLAYER_CARD_CONFIG.selectedCell).getDisplayValue()).trim();
  if (!selected) return;

  const matches = getMatchesForPlayer_(selected);
  const stats = buildStats_(matches, selected);
  const standings = getStanding_(selected);

  sheet.getRange('B4:B12').setValues([[
    standings.rank || '', stats.played, stats.wins, stats.losses,
    stats.rackWin, stats.rackLoss, stats.rackWin - stats.rackLoss,
    standings.points || stats.rackWin, stats.played ? stats.wins / stats.played : 0
  ]]);
  sheet.getRange('B12').setNumberFormat('0.0%');

  const output = [];
  for (let i = 0; i < 40; i++) {
    const match = matches[i];
    if (match) {
      output.push([i + 1, match.id, match.opponent, match.position, match.score, match.result]);
    } else {
      output.push([i + 1, '', '', '', '', 'Belum terisi']);
    }
  }
  sheet.getRange('A15:F54').setValues(output);
  stylePlayerCard_(sheet);
}

function onEdit(e) {
  if (!e || !e.range) return;
  const sheet = e.range.getSheet();
  if (PLAYER_CARD_CONFIG.targetNames.indexOf(sheet.getName()) < 0) return;
  if (e.range.getA1Notation() === PLAYER_CARD_CONFIG.selectedCell) refreshPlayerCard();
}

function findTargetSheet_(ss) {
  for (const name of PLAYER_CARD_CONFIG.targetNames) {
    const sheet = ss.getSheetByName(name);
    if (sheet) return sheet;
  }
  return null;
}

function getPlayerNames_() {
  const ss = SpreadsheetApp.getActive();
  const names = new Set();
  const addFrom = (sheetName) => {
    const sheet = ss.getSheetByName(sheetName);
    if (!sheet) return;
    const values = sheet.getDataRange().getDisplayValues();
    const headers = values[0] || [];
    let nameIndex = headers.findIndex(h => /nama\s*peserta|nama|pemain|peserta/i.test(h));
    if (nameIndex < 0) nameIndex = 1;
    values.slice(1).forEach(row => { const name = String(row[nameIndex] || '').trim(); if (name) names.add(name); });
  };
  addFrom(PLAYER_CARD_CONFIG.sourcePlayers);
  if (!names.size) {
    const sheet = SpreadsheetApp.getActive().getSheetByName(PLAYER_CARD_CONFIG.sourceResults);
    if (sheet) {
      const values = sheet.getDataRange().getDisplayValues();
      const headers = values[0] || [];
      const indices = headers.map((h, i) => /peserta|pemain|player|nama/i.test(h) ? i : -1).filter(i => i >= 0);
      values.slice(1).forEach(row => indices.forEach(i => { const name = String(row[i] || '').trim(); if (name) names.add(name); }));
    }
  }
  return [...names].sort((a, b) => a.localeCompare(b, 'id'));
}

function getMatchesForPlayer_(selected) {
  const sheet = SpreadsheetApp.getActive().getSheetByName(PLAYER_CARD_CONFIG.sourceResults);
  if (!sheet) throw new Error('Sheet Input Hasil tidak ditemukan.');
  const values = sheet.getDataRange().getDisplayValues();
  const headers = values[0] || [];
  const index = (patterns) => headers.findIndex(h => patterns.some(p => new RegExp(p, 'i').test(h)));
  const idI = index(['id\\s*hasil', '^id$']);
  const aI = index(['peserta\\s*a', 'pemain\\s*a', 'player\\s*a', 'nama\\s*a']);
  const bI = index(['peserta\\s*b', 'pemain\\s*b', 'player\\s*b', 'nama\\s*b']);
  const tierAI = index(['tier\\s*a']);
  const tierBI = index(['tier\\s*b']);
  const scoreAI = index(['skor\\s*a', 'score\\s*a']);
  const scoreBI = index(['skor\\s*b', 'score\\s*b']);
  const statusI = index(['status']);
  const winnerI = index(['pemenang']);
  if (aI < 0 || bI < 0) throw new Error('Kolom Peserta A dan Peserta B tidak ditemukan di Input Hasil.');

  return values.slice(1).map(row => {
    const a = String(row[aI] || '').trim();
    const b = String(row[bI] || '').trim();
    if (a !== selected && b !== selected) return null;
    const isA = a === selected;
    const opponentName = isA ? b : a;
    const opponentTier = isA ? (tierBI >= 0 ? row[tierBI] : '') : (tierAI >= 0 ? row[tierAI] : '');
    const opponent = `${opponentName}${opponentTier ? ` ${opponentTier}` : ''}`.trim();
    const rawA = scoreAI >= 0 ? row[scoreAI] : '';
    const rawB = scoreBI >= 0 ? row[scoreBI] : '';
    const scoreA = toNumber_(rawA);
    const scoreB = toNumber_(rawB);
    const status = statusI >= 0 ? String(row[statusI] || '').trim() : '';
    const pending = /belum|rencana|pending|terjadwal/i.test(status) || (scoreA === 0 && scoreB === 0 && !/selesai|finish|valid/i.test(status));
    const own = isA ? scoreA : scoreB;
    const enemy = isA ? scoreB : scoreA;
    let result = 'Belum terlaksana';
    if (!pending) {
      if (winnerI >= 0 && String(row[winnerI] || '').trim() === selected) result = 'Menang';
      else if (winnerI >= 0 && String(row[winnerI] || '').trim() && String(row[winnerI] || '').trim() !== selected) result = 'Kalah';
      else if (own > enemy) result = 'Menang';
      else if (own < enemy) result = 'Kalah';
      else result = 'Seri';
    }
    return {
      id: idI >= 0 ? row[idI] : '', opponent,
      position: isA ? 'Player A' : 'Player B',
      score: pending ? '0 - 0' : `${own} - ${enemy}`,
      result, pending, own, enemy
    };
  }).filter(Boolean);
}

function buildStats_(matches, selected) {
  const played = matches.filter(m => !m.pending);
  return {
    played: played.length,
    wins: played.filter(m => m.result === 'Menang').length,
    losses: played.filter(m => m.result === 'Kalah').length,
    rackWin: played.reduce((n, m) => n + m.own, 0),
    rackLoss: played.reduce((n, m) => n + m.enemy, 0)
  };
}

function getStanding_(selected) {
  const sheet = SpreadsheetApp.getActive().getSheetByName(PLAYER_CARD_CONFIG.sourceStandings);
  if (!sheet) return {};
  const values = sheet.getDataRange().getDisplayValues();
  const headers = values[0] || [];
  const find = (patterns) => headers.findIndex(h => patterns.some(p => new RegExp(p, 'i').test(h)));
  const nameI = find(['nama|pemain|peserta']);
  const rankI = find(['rank|peringkat']);
  const pointsI = find(['poin|points']);
  const row = values.slice(1).find(r => String(r[nameI] || '').trim() === selected);
  return row ? { rank: rankI >= 0 ? row[rankI] : '', points: pointsI >= 0 ? row[pointsI] : '' } : {};
}

function toNumber_(value) {
  const n = Number(String(value || '').replace(',', '.').replace(/[^0-9.-]/g, ''));
  return Number.isFinite(n) ? n : 0;
}

function stylePlayerCard_(sheet) {
  sheet.setFrozenRows(14);
  sheet.setColumnWidths(1, 1, 60);
  sheet.setColumnWidths(2, 1, 110);
  sheet.setColumnWidths(3, 1, 190);
  sheet.setColumnWidths(4, 1, 125);
  sheet.setColumnWidths(5, 1, 100);
  sheet.setColumnWidths(6, 1, 125);
  sheet.getRange('A1:F1').setBackground('#1f1f1f').setFontColor('#f6c453').setFontWeight('bold').setFontSize(15).setHorizontalAlignment('center');
  sheet.getRange('A3:A12').setBackground('#f3ead8').setFontWeight('bold');
  sheet.getRange('B3').setBackground('#fff2c9').setFontWeight('bold').setFontColor('#9a4f18');
  sheet.getRange('A14:F14').setBackground('#1f1f1f').setFontColor('#f6c453').setFontWeight('bold');
  sheet.getRange('A15:F54').setBorder(true, true, true, true, true, true, '#ded6c8', SpreadsheetApp.BorderStyle.SOLID);
  sheet.getRange('A15:A54').setHorizontalAlignment('center');
  sheet.getRange('E15:E54').setHorizontalAlignment('center');
  sheet.getRange('F15:F54').setFontWeight('bold');
  sheet.getRange('A1:F54').setVerticalAlignment('middle');
  sheet.getRange('A1:F54').setWrap(true);
}
