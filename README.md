# Liga 9 Pool Family — Musim II

Website statis siap GitHub Pages untuk menampilkan Overview, Peserta, Input Hasil, Klasemen, Keaktifan, Power Rating, Player vs Player, dan Informasi.

## File project

| File | Fungsi |
|---|---|
| `index.html` | Struktur halaman dan navigasi |
| `styles.css` | Desain responsif |
| `app.js` | Tab, tabel, pencarian, dan koneksi Google Sheet |
| `config.js.example` | Template ID spreadsheet |
| `.gitignore` | Mengabaikan `config.js` lokal |
| `README.md` | Panduan ini |

## Struktur Google Sheet

Buat enam tab dengan nama persis:

```text
Peserta
Input Hasil
Klasemen
Keaktifan
Power Rating
Player vs Player
```

Baris pertama setiap tab harus berisi nama kolom. Website membaca kolom `A:Z`.

## Koneksi Google Sheet tanpa API key

Versi ini menggunakan endpoint publik Google Visualization. Anda tidak perlu membuat atau memasukkan API key. Spreadsheet harus dapat dibaca publik.

Di Google Sheet, buka **Share → General access → Anyone with the link → Viewer**. Website hanya membaca data dan tidak dapat mengubah spreadsheet.

## Mengisi konfigurasi

Buat salinan `config.js.example` dengan nama `config.js`.

Windows Command Prompt:

```bat
copy config.js.example config.js
```

Windows PowerShell:

```powershell
Copy-Item config.js.example config.js
```

macOS/Linux:

```bash
cp config.js.example config.js
```

Isi `config.js` dengan ID spreadsheet:

```javascript
window.LIGA_CONFIG = {
  GOOGLE_SHEET_ID: "1ABCxyz987654321"
};
```

Contoh URL spreadsheet:

```text
https://docs.google.com/spreadsheets/d/1ABCxyz987654321/edit
```

Nilai ID adalah bagian di antara `/d/` dan `/edit`.

## Upload ke GitHub

1. Buat repository baru di GitHub.
2. Upload `index.html`, `styles.css`, `app.js`, `config.js.example`, `.gitignore`, dan `README.md`.
3. Buat file baru bernama `config.js` di root repository.
4. Isi `config.js` dengan ID spreadsheet Anda.
5. Commit perubahan.

Karena spreadsheet bersifat publik, jangan menyimpan password, nomor identitas, atau data rahasia di dalamnya.

## Deploy ke GitHub Pages

1. Buka repository.
2. Pilih **Settings → Pages**.
3. Pada **Build and deployment**, pilih **Deploy from a branch**.
4. Pilih branch `main` dan folder `/ (root)`.
5. Klik **Save**.
6. Buka URL GitHub Pages yang diberikan GitHub.

Contoh:

```text
https://nama-akun.github.io/nama-repository/
```

## Menghapus API key lama

Karena versi baru tidak memakai API key, API key lama sebaiknya dihapus atau dinonaktifkan.

1. Buka [Google Cloud Credentials](https://console.cloud.google.com/apis/credentials).
2. Pilih project `Liga 9 Pool Family`.
3. Pada bagian **API Keys**, cari key lama.
4. Klik menu tiga titik di sebelah key.
5. Pilih **Delete** untuk menghapus permanen, atau buka key lalu pilih **Disable** bila ingin menyimpannya sementara.
6. Konfirmasi tindakan tersebut.

Setelah itu, buka repository GitHub dan hapus API key dari file `config.js` sehingga isinya hanya:

```javascript
window.LIGA_CONFIG = {
  GOOGLE_SHEET_ID: "ID_GOOGLE_SHEET_ANDA"
};
```

Jika API key lama pernah tersimpan di riwayat commit GitHub, tetap hapus atau nonaktifkan key tersebut di Google Cloud. Menghapus teks dari commit terbaru saja tidak membuat key lama aman.

## Pengujian lokal

Jangan membuka `index.html` dengan double-click. Jalankan server lokal:

```bash
python -m http.server 8080
```

Buka `http://localhost:8080`.

## Jika data belum muncul

Periksa nama tab, akses **Anyone with the link → Viewer**, ID spreadsheet, dan posisi `config.js` yang harus satu folder dengan `index.html`. Tekan `Ctrl + F5` setelah GitHub Pages selesai memperbarui.

## Referensi

[1]: https://support.google.com/docs/answer/2494822 "Google Drive Help — Share files from Google Drive"
[2]: https://docs.github.com/en/pages "GitHub Docs — GitHub Pages"
[3]: https://developers.google.com/google-ads/api/docs/concepts/curl "Google APIs — Public data access concepts"

## Kolom khusus tab Peserta

Tab `Peserta` hanya menampilkan kolom berikut dalam urutan tetap:

| Urutan | Header yang tampil |
|---:|---|
| 1 | No. — dibuat otomatis oleh website |
| 2 | No ID |
| 3 | Nama Peserta |
| 4 | Tier |
| 5 | Kolom4 |
| 6 | Petunjuk |

Gunakan header berikut pada baris pertama tab `Peserta`:

```text
No ID | Nama Peserta | Tier | Kolom4 | Petunjuk
```

Kolom `No.` tidak perlu dibuat di Google Sheet karena website membuat nomor urut otomatis. Nama header boleh menggunakan variasi spasi atau huruf besar-kecil; website akan mencocokkannya secara fleksibel.

