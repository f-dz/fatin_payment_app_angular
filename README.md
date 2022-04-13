Nama    : Fatin Dzakiyah
Kode    : FSDO003ONL002

Catatan :
Aplikasi ini telah di deploy dan bisa digunakan secara online melalui link

Petunjuk Penggunaan Aplikasi PaymentApp :
1.  Jalanan `ng serve` pada terminal, pastikan terhubung ke jaringan internet karena aplikasi ini menggunakan server dari aplikasi yang sudah di deploy pada `http://fatin-payment-app.herokuapp.com`
2.  Halaman pertama yang muncul ketika belum melakukan autentikasi adalah halaman login
3.  Jika belum memiliki akun, klik tombol `Register here` lalu pengguna akan diarahkan ke halaman register
4.  Halaman register berisi form untuk input username, email, dan password dengan ketentuan tertentu
5.  Jika sudah selesai mengisi, klik tombol `REGISTER`, jika username dan email yang diinputkan belum tersedia, maka akan muncul pemeberitahuan registrasi sukses, jika username dan email sudah pernah digunakan untuk registrasi sebelumnya maka muncul pemberitahuan registrasi gagal
6.  Jika sudah memiliki akun, kembali ke halaman login dengan klik `Login here` dan akan diarahkan ke halaman login
7.  Isi email dan password pada form login lalu klik `LOGIN`, jika berhasil pengguna akan diarahkan langsung ke halaman payment detail, jika login gagal akan muncul pemberitahuan bahwa email atau password yang dimasukkan salah
8.  Halaman payment detail berisi tabel payment detail dan form untuk menambahkan dan mengedit payment detail
9.  Untuk menambahkan payment detail baru, isi form `Add New Payment Detail` dengan inputan-inputan yang memiliki ketentuan tertentu, jika ingin mengulang pengisian klik `RELOAD`, jika sudah selesai mengisi klik `SUBMIT` lalu muncul pesan sukses dan otomatis akan menambah pada tabel payment detail
10. Untuk mengedit payment detail yang sudah ada, klik pada baris payment detail yang ingin diubah, lalu akan muncul form `Update Payment Detail` sekaligus muncul tombol `Add Payment Detail` jika pengguna berubah pikiran dari yang semula ingin mengedit menjadi ingin menambah data baru
11. Pada form update, data sebelumnya otomatis sudah terisi pada masing-masing kolom sehingga pengguna hanya perlu mengedit bagian yang perlu saja, jika ingin mengulang pengisian klik `RELOAD`, jika sudah selesai mengedit klik `SUBMIT` lalu muncul pesan sukses dan otomatis akan mengupdate pada tabel payment detail
12. Untuk menghapus payment detail, klik tombol hapus yang berupa ikon tempat sampah pada tabel payment detail lalu muncul konfirmasi apakah yakin ingin menghapus atau tidak, jika tidak klik `CANCEL`, jika iya klik `DELETE` lalu akan muncul pesan sukses menghapus dan otomatis mengupdate pada tabel payment detail
13. Sesi login yang diberikan adalah 30 menit, jika sudah 30 menit dan pengguna masih mengakses payment detail, maka akan muncul alert bahwa pengguna sudah tidak terautentikasi lalu diarahkan ke halaman login
14. Untuk melakukan logout, klik tombol `LOGOUT` yang terdapat pada pojok kanan halaman payment detail
15. Jika sudah logout, maka pengguna tidak bisa mengakses halaman payment detail dan harus login ulang
16. Jika pengguna memasukkan url yang salah maka akan diarahkan ke halaman page not found

## PaymentApp
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.17.
## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
# fatin_payment_app_angular
