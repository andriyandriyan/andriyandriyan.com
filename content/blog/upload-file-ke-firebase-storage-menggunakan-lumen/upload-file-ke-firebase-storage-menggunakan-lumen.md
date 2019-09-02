---
title: Upload File Ke Firebase Storage Menggunakan Lumen
date: 2019-09-02T04:00:00Z

---
Ketika membuat sebuah aplikasi, terkadang kita harus menyimpan berbagai file user seperti gambar, video dan lainnya. Biasanya kita akan menyimpan file tersebut pada server bersama dengan aplikasi yang kita buat. Pada dasarnya ini bukan sebuah masalah, tapi semakin lama aplikasi berjalan penyimpanan pada server pun semakin besar. Jika menggunakan shared hosting, otomatis kita harus upgrade paket hosting untuk menaikkan kapasitas penyimpanan pada hosting tersebut.

Saat ini menyimpan file tidak harus disimpan bersama aplikasi kita. Banyak layanan cloud storage yang tinggal pakai dan gratis(dengan batasan tertentu) seperti [**AWS S3**](https://aws.amazon.com/s3/), [**Google Cloud Store**](https://cloud.google.com/storage/) dan [**Firebase Storage**](https://firebase.google.com/docs/storage).

### Firebase Storage

Firebase Storage merupakan layanan cloud storage dari Firebase. Firebase Storage memberikan penyimpan gratis sebesar 5GB pada paket SPARK. Jika telah melebihi 5GB Anda dapat upgrade ke paket Blaze. Untuk detail informasi harga dapat dilihat [disini](https://firebase.google.com/pricing).

### Firebase Storage dengan Lumen

Pada dokumentasi Laravel, Laravel tidak menyediakan provider untuk meng-integrasikan Firebase Storage dengan Laravel/Lumen. Kita perlu menggunakan library tambahan yaitu `laravel-google-cloud-storage`.

# Langkah-langkah

### Buat Proyek Baru

Buat sebuah proyek lumen baru dengan mengetikan perintah berikut pada terminal kalian

```bash
$ composer create-project --prefer-dist laravel/lumen lumen-firebase-storage
```