const SITE_CONFIG = {
  spreadsheetId: '1Q09viBUTDP15MJ9TIS_G0mKVu3otZ3GaQcMHswdgWg0',
  sheetsApiUrl: 'https://script.google.com/macros/s/AKfycbwLJ9siSbnrwCYeEwfNq1lx0JhN3XsqNxleJDithm3CEONMA4_yqLW9Z7qJ_UWDCSNa/exec',
  refreshIntervalMs: 86400000,
  tabs: [
    { label: 'Peserta', sheetName: 'Peserta', gid: '1', description: 'Daftar peserta, tier, status, dan statistik dasar.' },
    { label: 'Input Hasil', sheetName: 'Input Hasil', gid: '2', description: 'Input dan riwayat hasil pertandingan.' },
    { label: 'Klasemen', sheetName: 'Klasemen', gid: '3', description: 'Klasemen sementara Liga 9 Pool Family.' },
    { label: 'Keaktifan', sheetName: 'Keaktifan', gid: '4', description: 'Ringkasan keaktifan peserta.' },
    { label: 'Power Rating', sheetName: 'Power Rating', gid: '5', description: 'Perbandingan power rating peserta.' },
    { label: 'Player to Player', sheetName: 'Player Card', gid: '7', type: 'pvp', description: 'Kartu pemain, statistik, riwayat pertandingan, dan lawan yang belum terlaksana.' },
    { label: 'Informasi', type: 'info', description: 'Informasi liga dan achievement mingguan.' }
  ],
  informationHtml: `
    <article class="info-card achievement-info-card">
      <p class="eyebrow accent">ACHIEVEMENT MINGGU I</p>
      <h3>Giant Killer</h3>
      <p>Penghargaan untuk peserta tier 3–4 yang berhasil mengalahkan pemain dengan tier lebih tinggi.</p>
      <div class="achievement-list">
        <div class="achievement-item"><strong>1. Alex</strong><span>Mengalahkan Iwan tier 1 dengan 9–7 dan Pandi tier 2 dengan 9–3.</span></div>
        <div class="achievement-item"><strong>2. Om Anto</strong><span>Mengalahkan Ko Charles tier 2 dengan 9–7 dan Bang Aceng tier 2 dengan 9–8.</span></div>
        <div class="achievement-item"><strong>3. Cek Wanwan</strong><span>Mengalahkan Chad tier 1 dengan 9–7.</span></div>
        <div class="achievement-item"><strong>4. Amos</strong><span>Mengalahkan Chad tier 1 dengan 9–6.</span></div>
        <div class="achievement-item"><strong>5. Aburizal</strong><span>Mengalahkan Ko Charles tier 2 dengan 9–8.</span></div>
      </div>
    </article>
    <article class="info-card achievement-info-card">
      <p class="eyebrow accent">ACHIEVEMENT MINGGU I</p>
      <h3>Resilience Award</h3>
      <p>Penghargaan untuk peserta yang tetap berjuang setelah kekalahan beruntun dan mampu bangkit.</p>
      <div class="achievement-list">
        <div class="achievement-item"><strong>1. Bang Larosa</strong><span>Lima kekalahan beruntun, lalu dua kemenangan berturut-turut. Kandidat terkuat karena berhasil bangkit dengan kemenangan.</span></div>
        <div class="achievement-item"><strong>2. Agus</strong><span>Empat kekalahan beruntun, lalu menang atas Cakra dengan skor 9–5.</span></div>
        <div class="achievement-item"><strong>3. Gideon</strong><span>Tiga kekalahan beruntun, lalu menang atas Ko Khenny dengan skor 9–6.</span></div>
        <div class="achievement-item"><strong>4. Amos</strong><span>Tiga kekalahan beruntun, lalu menang atas Chad tier 1 dengan skor 9–6.</span></div>
        <div class="achievement-item"><strong>5. Ko Asen</strong><span>Enam kekalahan beruntun. Kandidat kuat Never Give Up, tetapi belum diikuti kemenangan.</span></div>
      </div>
    </article>
    <article class="info-card achievement-info-card">
      <p class="eyebrow accent">ACHIEVEMENT MINGGU I</p>
      <h3>Close Fighter</h3>
      <p>Penghargaan untuk peserta yang memberikan perlawanan ketat dengan kekalahan tipis 8–9.</p>
      <div class="achievement-list">
        <div class="achievement-item"><strong>1. Aburizal</strong><span>Dua kali kalah 8–9 dari Ko Khenny dan Hezaro.</span></div>
        <div class="achievement-item"><strong>2. Andi Musi</strong><span>Dua kali kalah 8–9 dari Adi dan Habib.</span></div>
        <div class="achievement-item"><strong>3. Agus</strong><span>Satu kali kalah 8–9 dari Ko CG.</span></div>
        <div class="achievement-item"><strong>4. Om Mersi</strong><span>Satu kali kalah 8–9 dari Bang Aceng.</span></div>
      </div>
    </article>
    <article class="info-card achievement-info-card">
      <p class="eyebrow accent">ACHIEVEMENT MINGGU I</p>
      <h3>Never Give Up Award</h3>
      <p>Penghargaan untuk peserta yang terus bermain meskipun menghadapi kekalahan beruntun.</p>
      <div class="achievement-list">
        <div class="achievement-item"><strong>1. Ko Asen</strong><span>Enam kekalahan beruntun. Kandidat utama.</span></div>
        <div class="achievement-item"><strong>2. Bang Larosa</strong><span>Lima kekalahan beruntun, lalu dua kemenangan. Pesaing kuat dengan comeback.</span></div>
        <div class="achievement-item"><strong>3. Agus</strong><span>Empat kekalahan beruntun, lalu menang.</span></div>
        <div class="achievement-item"><strong>4. Andi Musi</strong><span>Empat kekalahan beruntun, masih aktif berpartisipasi.</span></div>
        <div class="achievement-item"><strong>5. Vincent</strong><span>Empat kekalahan beruntun sebagai peserta tier 4.</span></div>
      </div>
    </article>
    <article class="info-card">
      <h3>Sinkronisasi</h3>
      <p>Website ini otomatis sinkron sama data panitia. Anda gak perlu repot mikirin sistem di belakang layar, mending fokus mikirin gimana caranya nembak bola 9 gak meleset.</p>
    </article>
  `
};
