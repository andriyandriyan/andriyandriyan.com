---
title: Upload File Ke Firebase Storage Menggunakan Lumen
date: 2019-09-02T04:00:00Z

---
Ketika membuat sebuah aplikasi, terkadang kita harus menyimpan berbagai file user seperti gambar, video dan lainnya. Biasanya kita akan menyimpan file tersebut pada server bersama dengan aplikasi yang kita buat. Pada dasarnya ini bukan sebuah masalah, tapi semakin lama aplikasi berjalan penyimpanan pada server pun semakin besar. Jika menggunakan shared hosting, otomatis kita harus upgrade paket hosting untuk menaikkan kapasitas penyimpanan pada hosting tersebut.

Saat ini menyimpan file tidak harus disimpan bersama aplikasi kita. Banyak layanan cloud storage yang tinggal pakai dan gratis(dengan batasan tertentu) seperti **AWS S3**, **Google Cloud Store** dan **Firebase Storage**