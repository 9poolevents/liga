# Liga 9 Pool Family — Musim II

Website statis yang siap diunggah ke GitHub dan dipublikasikan melalui GitHub Pages. Website ini menampilkan tab Overview, Peserta, Input Hasil, Klasemen, Keaktifan, Power Rating, Player vs Player, dan Informasi.

## Isi paket

| File | Fungsi |
|---|---|
| `index.html` | Struktur halaman dan navigasi utama |
| `styles.css` | Tema visual hitam, putih, emas, dan jingga senja; termasuk tampilan mobile |
| `app.js` | Logika tab, pencarian, pemuatan data Google Sheets, dan fallback preview |
| `config.js.example` | Template konfigurasi ID spreadsheet dan API key |
| `.gitignore` | Mencegah `config.js` ikut terunggah secara tidak sengaja |
| `README.md` | Panduan instalasi, koneksi Google Sheets, dan deploy |

## Struktur folder

```text
liga9-pool-family/
├── index.html
├── styles.css
├── app.js
├── config.js.example
├── .gitignore
└── README.md
```

## Persiapan Google Sheet

Buat enam tab dengan nama yang persis sama:

```text
Peserta
Input Hasil
Klasemen
Keaktifan
Power Rating
Player vs Player
```

Baris pertama setiap tab harus berisi header kolom. Contoh tab `Peserta`:

| Nama | Klub | Status |
|---|---|---|
| Budi | Family A | Aktif |
| Andi | Family B | Aktif |

Website membaca rentang `A:Z`. Data di luar kolom Z belum dibaca oleh versi ini.

## Mendapatkan `GOOGLE_SHEET_ID`

Contoh URL Google Sheet:

```text
https://docs.google.com/spreadsheets/d/1ABCxyz987654321/edit
```

Nilai `GOOGLE_SHEET_ID` adalah bagian berikut:

```text
1ABCxyz987654321
```

Jangan ikut menyalin `/edit`.

## Mengatur akses spreadsheet

Klik **Share / Bagikan** pada Google Sheet. Pada **General access / Akses umum**, pilih **Anyone with the link / Siapa saja yang memiliki link**, lalu pilih **Viewer / Pelihat**.

Website hanya membaca data. Website tidak melakukan perubahan pada spreadsheet.

## Membuat `GOOGLE_SHEETS_API_KEY`

1. Buka [Google Cloud Console](https://console.cloud.google.com/).
2. Buat project baru, misalnya `Liga 9 Pool Family`.
3. Buka [Google Sheets API Library](https://console.cloud.google.com/apis/library/sheets.googleapis.com).
4. Pilih project yang baru dibuat.
5. Klik **Enable / Aktifkan**.
6. Buka menu **APIs & Services → Credentials**.
7. Klik **Create credentials → API key**.
8. Salin API key yang dibuat.
9. Edit API key tersebut.
10. Pada **API restrictions**, pilih **Restrict key**.
11. Pilih hanya **Google Sheets API**.
12. Simpan perubahan.

## Menyiapkan file konfigurasi lokal

Di komputer, buat salinan `config.js.example` dengan nama `config.js`.

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

Buka `config.js`, lalu isi:

```javascript
window.LIGA_CONFIG = {
  GOOGLE_SHEET_ID: "1ABCxyz987654321",
  GOOGLE_SHEETS_API_KEY: "AIzaSyXXXXXXXXXXXXXXXX"
};
```

## Catatan keamanan API key

Versi GitHub Pages adalah website statis. Karena itu, API key yang dipakai dari browser secara teknis dapat terlihat oleh pengunjung. Untuk mengurangi risiko:

1. Batasi API key hanya ke **Google Sheets API**.
2. Pada **Application restrictions**, gunakan **HTTP referrers**.
3. Masukkan domain GitHub Pages, misalnya:

```text
https://nama-akun.github.io/*
```

4. Jangan memberikan izin Editor pada spreadsheet.
5. Jangan pernah mengunggah `config.js` ke repository publik jika Anda belum membatasi API key.

Untuk tingkat keamanan yang lebih tinggi, gunakan backend serverless seperti Vercel Functions atau Cloudflare Workers. Pada arsitektur tersebut API key disimpan di server, bukan di browser.

## Upload ke GitHub melalui browser

1. Login ke [GitHub](https://github.com/).
2. Klik **New repository**.
3. Isi nama repository, misalnya `liga9-pool-family`.
4. Pilih **Public** jika ingin memakai GitHub Pages secara gratis.
5. Klik **Create repository**.
6. Klik **Add file → Upload files**.
7. Upload file berikut:
   - `index.html`
   - `styles.css`
   - `app.js`
   - `config.js.example`
   - `.gitignore`
   - `README.md`
8. Klik **Commit changes**.

### Cara memasukkan konfigurasi pada GitHub Pages

Karena GitHub Pages perlu membaca `config.js`, Anda memiliki dua pilihan.

#### Pilihan A — Praktis untuk website komunitas

1. Buat file baru di repository bernama `config.js`.
2. Masukkan konfigurasi berikut:

```javascript
window.LIGA_CONFIG = {
  GOOGLE_SHEET_ID: "ID_SHEET_ANDA",
  GOOGLE_SHEETS_API_KEY: "API_KEY_ANDA"
};
```

3. Commit file tersebut.
4. Pastikan API key sudah dibatasi berdasarkan domain GitHub Pages.

#### Pilihan B — Uji coba tanpa data nyata terlebih dahulu

Jangan buat `config.js`. Website tetap dapat dibuka dalam **Preview mode** dengan data contoh. Setelah konfigurasi siap, tambahkan `config.js`.

## Deploy ke GitHub Pages

1. Buka repository GitHub Anda.
2. Klik **Settings**.
3. Pilih **Pages** pada menu sebelah kiri.
4. Pada bagian **Build and deployment**, pilih:
   - **Source:** `Deploy from a branch`
   - **Branch:** `main`
   - **Folder:** `/ (root)`
5. Klik **Save**.
6. Tunggu beberapa menit.
7. GitHub akan memberikan alamat seperti:

```text
https://nama-akun.github.io/liga9-pool-family/
```

Buka alamat tersebut dan klik **Refresh** pada website.

## Upload melalui Git Bash atau terminal

Jika Git sudah terpasang:

```bash
git clone https://github.com/NAMA_AKUN/liga9-pool-family.git
cd liga9-pool-family
```

Salin semua file paket ini ke folder tersebut. Setelah itu:

```bash
git add .
git commit -m "Buat website Liga 9 Pool Family Musim II"
git push origin main
```

## Pengujian lokal

Dilarang membuka `index.html` dengan double-click jika ingin menguji fetch API secara konsisten. Jalankan server lokal.

Dengan Python:

```bash
python -m http.server 8080
```

Kemudian buka:

```text
http://localhost:8080
```

Dengan VS Code, Anda juga dapat memakai extension **Live Server**.

## Jika data tidak muncul

Periksa hal berikut:

1. Nama tab Google Sheet harus sama persis.
2. Baris pertama harus berisi nama kolom.
3. Spreadsheet harus memiliki akses Viewer untuk siapa saja yang memiliki link.
4. Google Sheets API harus sudah diaktifkan.
5. API key harus dibatasi ke Google Sheets API.
6. `GOOGLE_SHEET_ID` tidak boleh berisi `/edit`.
7. `config.js` harus berada satu folder dengan `index.html`.
8. Buka Developer Tools browser dengan `F12`, lalu lihat tab **Console** untuk error detail.

## Menambahkan informasi panitia

Edit fungsi `information()` pada `app.js`. Anda dapat mengubah judul, isi pengumuman, dan teks informasi tanpa mengubah layout utama.

## Referensi

[1]: https://developers.google.com/workspace/guides/enable-apis "Google Workspace — Enable APIs"
[2]: https://support.google.com/googleapi/answer/6158862 "Google API Console Help — Setting up API keys"
[3]: https://support.google.com/docs/answer/2494822 "Google Drive Help — Share files from Google Drive"
[4]: https://docs.github.com/en/pages "GitHub Docs — GitHub Pages"
