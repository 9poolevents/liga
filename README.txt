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

REFRESH DATA
Refresh otomatis sekarang setiap 5 menit. Refresh otomatis berjalan tanpa menampilkan loading ulang sehingga halaman tidak berkedip. Loading hanya tampil saat pertama membuka halaman, berpindah tab, atau menekan tombol Segarkan.

PLAYER VS PLAYER V4
Versi ini memperbaiki masalah statistik 0 karena sheet menggunakan header Peserta A dan Peserta B, bukan Pemain A dan Pemain B. Website sekarang mengenali Peserta A/Peserta B, Pemain A/Pemain B, Nama A/Nama B, serta Skor A/Skor B.

Sumber fallback publik juga sudah diganti dari export CSV berdasarkan gid ke Google Visualization berdasarkan nama sheet. Ini membuat Input Hasil dan Player vs Player terbaca lebih stabil walaupun gid berubah.

Tab Player vs Player menampilkan dropdown, jumlah pertandingan, kemenangan masing-masing pemain, total skor, dan riwayat pertemuan. Jika pasangan belum pernah bertanding, website menampilkan pesan yang jelas.

Jika menggunakan Apps Script, deploy ulang Code.gs versi terbaru lalu pastikan config.js berisi URL Web App. Jika URL belum tersedia, fitur dropdown dan rekap tetap dapat bekerja menggunakan endpoint publik selama spreadsheet bisa dilihat publik; fitur hide/unhide persis tetap memerlukan Apps Script.

KARTU PEMAIN DI GOOGLE SHEET
File PlayerCard.gs membuat format kartu satu pemain seperti contoh. Skrip membaca Input Hasil, membuat dropdown nama, menghitung statistik, menampilkan lawan + tier, posisi Player A/B, skor, hasil, lalu mengisi nomor kosong sampai 40 dengan status Belum terisi.

CARA MEMASANG
1. Buka Extensions > Apps Script.
2. Tempel isi PlayerCard.gs.
3. Simpan, kembali ke Google Sheet, lalu refresh halaman.
4. Pilih menu Kartu Pemain > Siapkan / perbaiki kartu.
5. Pada B3, pilih nama pemain dari dropdown.
6. Setiap perubahan pilihan B3 akan memuat ulang statistik dan daftar pertandingan.

ASUMSI KOLOM INPUT HASIL
Header baris pertama harus memuat: ID Hasil, Peserta A, Tier A, Peserta B, Tier B, Skor A, Skor B, Status, dan/atau Pemenang Nyata. Posisi kolom boleh berubah karena skrip mencari berdasarkan nama header.

Catatan: skrip ini membaca data dari Input Hasil dan tidak mengubah Input Hasil. Ia hanya menulis ulang area A1:F54 pada sheet Player to Player atau Player vs Player. Buat salinan sheet terlebih dahulu jika ingin menjaga format lama.

PLAYER TO PLAYER MENGGUNAKAN PLAYER CARD
Tab website sekarang bernama Player to Player tetapi sumbernya adalah sheet Player Card. Website membaca struktur kartu: statistik pemain pada dua baris pertama, bagian lawan yang belum pernah dilawan, status, dan tier. Jika nama sheet Player Card diubah, ubah sheetName pada config.js.

PLAYER TO PLAYER KALKULASI OTOMATIS
Website kini menghitung kartu berdasarkan pemain yang dipilih. Sumbernya adalah Peserta untuk nama dan tier, Klasemen untuk ranking dan poin, serta Input Hasil untuk pertandingan, skor, menang/kalah, lawan sudah dihadapi, dan lawan belum dihadapi. Sheet Player Card tidak lagi diperlukan sebagai sumber perhitungan website.
