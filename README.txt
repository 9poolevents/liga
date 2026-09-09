LIGA 9 POOL FAMILY MUSIM II - PANDUAN V3

PERBAIKAN UTAMA
- Setiap tab website sekarang meminta sheet Google Sheet berdasarkan NAMA sheet yang sama persis: Peserta, Input Hasil, Klasemen, Keaktifan, Power Rating, Player vs Player.
- Gid tetap dikirim sebagai cadangan.
- Tema website sudah diubah menjadi dark charcoal dengan aksen emas hangat dan jingga senja.
- Layout tabel tetap dapat digeser horizontal di HP tanpa merusak ukuran teks.

AGAR PERBAIKAN AKTIF
1. Di Google Sheet, pastikan nama sheet persis:
   Peserta
   Input Hasil
   Klasemen
   Keaktifan
   Power Rating
   Player vs Player
2. Salin Code.gs versi terbaru ke Extensions > Apps Script.
3. Karena kode Apps Script berubah, buka Deploy > Manage deployments > Edit deployment > Version: New version > Deploy.
4. Pastikan Execute as: Me dan Who has access: Anyone.
5. Salin Web app URL ke config.js pada sheetsApiUrl. Jangan biarkan teks TEMPEL_URL_WEB_APP_APPS_SCRIPT_DI_SINI.
6. Upload ulang index.html, style.css, app.js, config.js ke GitHub.
7. Lakukan hard refresh browser dengan Ctrl+F5.

HIDE/UNHIDE
Website meminta data dengan nama sheet. Apps Script memeriksa setiap baris dan kolom menggunakan isRowHiddenByUser dan isColumnHiddenByUser. Tekan Segarkan atau tunggu maksimal 60 detik setelah perubahan hide/unhide.

PLAYER VS PLAYER
Dropdown mengambil nama dari sheet Peserta. Rekap pasangan mengambil data dari sheet Input Hasil. Gunakan header jelas: Tanggal | Pemain A | Skor A | Pemain B | Skor B | Status. Variasi Player A/Score A/Player B/Score B juga didukung.

EDIT DENGAN NOTEPAD
- config.js: URL API, nama tab, dan Informasi.
- style.css: warna dan tampilan.
- app.js: aturan pengambilan dan perhitungan data.

GITHUB PAGES
Settings > Pages > Deploy from branch > main > /(root) > Save.
