const SITE_CONFIG = {
  spreadsheetId: '1Q09viBUTDP15MJ9TIS_G0mKVu3otZ3GaQcMHswdgWg0',
  // Tempel URL Web App Apps Script di sini setelah deployment. Kosong = fallback CSV.
  sheetsApiUrl: 'https://script.google.com/macros/s/AKfycbwLJ9siSbnrwCYeEwfNq1lx0JhN3XsqNxleJDithm3CEONMA4_yqLW9Z7qJ_UWDCSNa/exec',
  refreshIntervalMs: 60000,
  tabs: [
    { label: 'Peserta', gid: '1', description: 'Daftar peserta, tier, status, dan statistik dasar.' },
    { label: 'Input Hasil', gid: '2', description: 'Input dan riwayat hasil pertandingan.' },
    { label: 'Klasemen', gid: '3', description: 'Klasemen sementara Liga 9 Pool Family.' },
    { label: 'Keaktifan', gid: '4', description: 'Ringkasan keaktifan peserta.' },
    { label: 'Power Rating', gid: '5', description: 'Perbandingan power rating peserta.' },
    { label: 'Player vs Player', gid: '2118784210', type: 'pvp', description: 'Pilih dua pemain untuk melihat statistik, skor, dan jadwal mereka.' },
    { label: 'Informasi', type: 'info', description: 'Informasi tambahan liga.' }
  ],
  informationHtml: `<article class="info-card"><p class="eyebrow accent">INFORMASI LIGA</p><h3>Selamat datang di Liga 9 Pool Family Musim II</h3><p>Edit bagian <strong>informationHtml</strong> di file <strong>config.js</strong> memakai Notepad untuk menambahkan peraturan, foto, pengumuman, atau tabel.</p></article><article class="info-card"><h3>Sinkronisasi</h3><p>Data akan mengikuti spreadsheet melalui Apps Script. Jika URL API masih kosong, website menggunakan CSV publik sebagai cadangan.</p></article>`
};
