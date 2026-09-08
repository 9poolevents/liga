# Liga 9 Pool Family — Musim II

Website GitHub Pages ini menampilkan data Google Sheet dengan mengikuti tampilan sheet secara langsung. Versi ini menggunakan **Google Apps Script bridge** agar website dapat menerima:

- hanya kolom yang terlihat;
- hanya baris yang terlihat;
- urutan kolom dan baris sesuai Google Sheet;
- lebar kolom sesuai Google Sheet;
- tinggi baris sesuai Google Sheet;
- nilai yang sudah diformat sebagai teks oleh Google Sheet.

## Struktur folder

```text
liga9-pool-family/
├── index.html
├── styles.css
├── app.js
├── config.js.example
├── .gitignore
├── README.md
└── apps-script/
    └── Code.gs
```

## Struktur tab Google Sheet

Nama tab harus persis:

```text
Peserta
Input Hasil
Klasemen
Keaktifan
Power Rating
Player vs Player
```

Baris pertama setiap tab digunakan sebagai header. Website tidak lagi memaksakan susunan kolom khusus. Jika Anda mengubah urutan kolom di Google Sheet, website akan mengikuti urutan tersebut.

## Mengapa menggunakan Google Apps Script?

GitHub Pages tidak dapat mengetahui baris atau kolom yang disembunyikan melalui endpoint publik biasa. Google Apps Script berjalan dengan akses Google Sheet dan dapat membaca `isRowHiddenByUser`, `isColumnHiddenByUser`, `getColumnWidth`, serta `getRowHeight`.

Website membaca hasil dari Apps Script, bukan langsung membaca API key Google Cloud. Karena itu, API key Google Sheets tidak diperlukan.

## Menyiapkan Apps Script

1. Buka Google Sheet Anda.
2. Pilih **Extensions → Apps Script**.
3. Hapus kode awal yang ada.
4. Buka file `apps-script/Code.gs` dari paket ini.
5. Salin seluruh isinya ke editor Apps Script.
6. Klik ikon **Project Settings**.
7. Pada bagian **Script Properties**, tambahkan:

```text
Property: SPREADSHEET_ID
Value: ID_GOOGLE_SHEET_ANDA
```

ID spreadsheet diambil dari URL:

```text
https://docs.google.com/spreadsheets/d/1ABCxyz987654321/edit
```

Nilainya adalah:

```text
1ABCxyz987654321
```

8. Kembali ke editor Apps Script.
9. Klik **Deploy → New deployment**.
10. Pada jenis deployment, pilih **Web app**.
11. Isi:

```text
Execute as: Me
Who has access: Anyone
```

12. Klik **Deploy**.
13. Jika diminta otorisasi, pilih akun Google Anda dan izinkan akses ke spreadsheet.
14. Salin **Web app URL** yang berakhiran `/exec`.

Contoh:

```text
https://script.google.com/macros/s/DEPLOYMENT_ID/exec
```

## Mengisi `config.js`

Buat file `config.js` di root repository, satu folder dengan `index.html`:

```javascript
window.LIGA_CONFIG = {
  GOOGLE_SHEETS_BRIDGE_URL: "https://script.google.com/macros/s/DEPLOYMENT_ID/exec"
};
```

Tidak perlu menambahkan `GOOGLE_SHEET_ID` atau `GOOGLE_SHEETS_API_KEY` pada versi ini.

## Cara membuat baris atau kolom tidak tampil

Di Google Sheet:

- klik kanan nomor baris, lalu pilih **Hide row**;
- klik kanan huruf kolom, lalu pilih **Hide column**.

Setelah website di-refresh, baris dan kolom tersebut tidak akan dikirim ke website.

Untuk menampilkan kembali:

- klik tanda panah kecil di antara baris atau kolom yang tersembunyi;
- pilih **Unhide row** atau **Unhide column**.

Catatan: versi ini membaca baris/kolom yang disembunyikan oleh pengguna. Filter tampilan biasa dapat memiliki perilaku berbeda tergantung konfigurasi Google Sheet.

## Komposisi ukuran otomatis

Ukuran tabel website mengikuti Google Sheet:

- lebar kolom dibaca dalam pixel dari `getColumnWidth`;
- tinggi baris dibaca dalam pixel dari `getRowHeight`;
- teks panjang dapat membungkus di dalam sel agar tidak merusak layout;
- pada HP, tabel tetap dapat digeser horizontal jika total lebar kolom lebih besar dari layar.

Jika Anda ingin kolom lebih lebar atau lebih sempit, ubah langsung ukuran kolom di Google Sheet, lalu refresh website.

## Upload ke GitHub

Upload atau timpa file berikut:

```text
index.html
styles.css
app.js
config.js.example
README.md
apps-script/Code.gs
```

Kemudian buat file baru:

```text
config.js
```

Isi dengan URL Web App Apps Script. Commit semua perubahan.

## Deploy GitHub Pages

1. Buka **Settings → Pages** pada repository.
2. Pilih **Deploy from a branch**.
3. Pilih branch `main`.
4. Pilih folder `/ (root)`.
5. Klik **Save**.
6. Tunggu GitHub Pages selesai memperbarui.
7. Buka URL website dan klik **Refresh**.

## Pengaturan akses Google Sheet

Untuk bridge ini, spreadsheet tidak perlu dipublikasikan sebagai **Anyone with the link** jika Web App Apps Script dijalankan sebagai akun pemilik dan deployment memberikan akses **Anyone**. Namun, jangan menyimpan data rahasia pada website publik karena data yang dikirim bridge tetap dapat dilihat oleh pengunjung website.

## Jika data belum tampil

Periksa:

1. URL `GOOGLE_SHEETS_BRIDGE_URL` berakhiran `/exec`.
2. Deployment Apps Script menggunakan **Execute as: Me**.
3. **Who has access** disetel **Anyone**.
4. Script Property bernama `SPREADSHEET_ID` sudah dibuat.
5. ID spreadsheet benar.
6. Nama keenam tab benar.
7. Setelah mengubah kode Apps Script, buat deployment version baru atau gunakan **Manage deployments → Edit → New version**.
8. Tekan `Ctrl + F5` pada website.

## Menghapus API key lama

Versi ini tidak menggunakan API key. Jika Anda sebelumnya membuat API key Google Cloud, buka [Google Cloud Credentials](https://console.cloud.google.com/apis/credentials), pilih project `Liga 9 Pool Family`, lalu pada bagian **API Keys** pilih menu tiga titik dan klik **Delete** atau **Disable**.

Hapus juga API key dari `config.js`. Isi file tersebut hanya boleh seperti ini:

```javascript
window.LIGA_CONFIG = {
  GOOGLE_SHEETS_BRIDGE_URL: "URL_WEB_APP_APPS_SCRIPT"
};
```

## Referensi

[1]: https://developers.google.com/apps-script/guides/web "Google Apps Script — Web Apps"
[2]: https://developers.google.com/apps-script/reference/spreadsheet/sheet "Google Apps Script — Sheet class"
[3]: https://docs.github.com/en/pages "GitHub Docs — GitHub Pages"
