const SITE_CONFIG = {
  spreadsheetId: '1Q09viBUTDP15MJ9TIS_G0mKVu3otZ3GaQcMHswdgWg0',
  // Isi dengan URL deployment Web App Apps Script agar hide/unhide ikut persis.
  sheetsApiUrl: 'https://script.google.com/macros/s/AKfycbwLJ9siSbnrwCYeEwfNq1lx0JhN3XsqNxleJDithm3CEONMA4_yqLW9Z7qJ_UWDCSNa/exec',
  // Refresh otomatis setiap 5 menit. Refresh berkala berjalan tanpa overlay loading.
  refreshIntervalMs: 300000,
  tabs: [
    { label: 'Peserta', sheetName: 'Peserta', gid: '1', description: 'Daftar peserta, tier, status, dan statistik dasar.' },
    { label: 'Input Hasil', sheetName: 'Input Hasil', gid: '2', description: 'Input dan riwayat hasil pertandingan.' },
    { label: 'Klasemen', sheetName: 'Klasemen', gid: '3', description: 'Klasemen sementara Liga 9 Pool Family.' },
    { label: 'Keaktifan', sheetName: 'Keaktifan', gid: '4', description: 'Ringkasan keaktifan peserta.' },
    { label: 'Power Rating', sheetName: 'Power Rating', gid: '5', description: 'Perbandingan power rating peserta.' },
    { label: 'Player vs Player', sheetName: 'Player vs Player', gid: '6', type: 'pvp', description: 'Pilih dua pemain untuk melihat statistik, skor, dan jadwal mereka.' },
    { label: 'Informasi', type: 'info', description: 'Informasi tambahan liga.' }
  ],
  informationHtml: `<article class="info-card"><p class="eyebrow accent">INFORMASI LIGA</p><h3>Selamat datang di Liga 9 Pool Family Musim II</h3><p>Edit bagian <strong>informationHtml</strong> di file <strong>config.js</strong> memakai Notepad untuk menambahkan peraturan, foto, pengumuman, atau tabel.</p></article><article class="info-card"><h3>Sinkronisasi</h3><p>Data mengikuti sheet berdasarkan <strong>nama tab</strong>. Hide/unhide baris dan kolom dibaca Apps Script setiap kali refresh.</p></article>`
};
