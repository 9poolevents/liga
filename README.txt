LIGA 9 POOL FAMILY MUSIM II - PANDUAN

A. FILE WEBSITE
index.html = halaman utama
style.css = tampilan
app.js = logika data dan Player vs Player
config.js = daftar tab dan URL API
Code.gs = kode Google Apps Script untuk membaca hidden row/column

B. AKTIFKAN API AGAR HIDE/UNHIDE MENGIKUTI SHEET
1. Buka Google Sheet.
2. Pilih Extensions > Apps Script.
3. Hapus kode lama, lalu salin seluruh isi file Code.gs ke editor Apps Script.
4. Klik Deploy > New deployment.
5. Pilih type Web app.
6. Execute as: Me.
7. Who has access: Anyone.
8. Klik Deploy dan salin Web app URL.
9. Buka config.js dengan Notepad.
10. Isi sheetsApiUrl dengan URL tersebut, contoh:
   sheetsApiUrl: 'https://script.google.com/macros/s/XXXXXXXX/exec',
11. Unggah config.js, app.js, index.html, style.css, dan Code.gs ke GitHub.

API ini mengirim hanya baris dan kolom yang sedang terlihat, serta memeriksa status hidden setiap kali website melakukan refresh. Jika hide/unhide berubah di Google Sheet, tekan Segarkan atau tunggu maksimal 60 detik.

C. PLAYER VS PLAYER
Tab Player vs Player sekarang memiliki dua dropdown. Daftar pemain diambil dari tab Peserta. Setelah Pemain A dan B dipilih, website mencari pertandingan pasangan tersebut pada tab Input Hasil.

Agar rekap otomatis terbaca, baris header Input Hasil sebaiknya memakai nama kolom yang jelas, misalnya:
Tanggal | Pemain A | Skor A | Pemain B | Skor B | Status

Website akan menghitung jumlah pertandingan, kemenangan masing-masing, dan total skor. Nama kolom boleh menggunakan variasi Player A/Player B atau Nama A/Nama B.

D. GITHUB PAGES
Buat repository baru > upload file > Settings > Pages > Deploy from branch > main > /(root) > Save.

CATATAN KEAMANAN
Apps Script dijalankan sebagai pemilik spreadsheet dan dibuka untuk siapa saja. Karena website hanya membaca data, jangan tambahkan kode penulisan/edit data ke Code.gs tanpa perlindungan autentikasi.
