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

### Install Dependency

Ada 2 dependency yang kita butuhkan yaitu `league/flysystem` dan
`superbalist/laravel-google-cloud-storage`

```bash
$ composer require league/flysystem superbalist/laravel-google-cloud-storage
```

Kemudian daftarkan service provider di `bootstrap/app.php`

```php
$app->register(Superbalist\LaravelGoogleCloudStorage\GoogleCloudStorageServiceProvider::class);
```

Selanjutnya membuat file konfigurasi untuk Firebase Storage di `config/filesystems.php`. Isi filenya ada sebagai berikut

```php
<?php
return [
    /*
    |--------------------------------------------------------------------------
    | Default Filesystem Disk
    |--------------------------------------------------------------------------
    |
    | Here you may specify the default filesystem disk that should be used
    | by the framework. The "local" disk, as well as a variety of cloud
    | based disks are available to your application. Just store away!
    |
    */
    'default' => env('FILESYSTEM_DRIVER', 'local'),
    /*
    |--------------------------------------------------------------------------
    | Default Cloud Filesystem Disk
    |--------------------------------------------------------------------------
    |
    | Many applications store files both locally and in the cloud. For this
    | reason, you may specify a default "cloud" driver here. This driver
    | will be bound as the Cloud disk implementation in the container.
    |
    */
    'cloud' => env('FILESYSTEM_CLOUD', 's3'),
    /*
    |--------------------------------------------------------------------------
    | Filesystem Disks
    |--------------------------------------------------------------------------
    |
    | Here you may configure as many filesystem "disks" as you wish, and you
    | may even configure multiple disks of the same driver. Defaults have
    | been setup for each driver as an example of the required options.
    |
    | Supported Drivers: "local", "ftp", "sftp", "s3", "rackspace"
    |
    */
    'disks' => [
        'local' => [
            'driver' => 'local',
            'root' => storage_path('app'),
        ],
        'public' => [
            'driver' => 'local',
            'root' => storage_path('app/public'),
            'url' => env('APP_URL').'/storage',
            'visibility' => 'public',
        ],
        'gcs' => [
            'driver' => 'gcs',
            'project_id' => env('GOOGLE_CLOUD_PROJECT_ID', 'your-project-id'),
            'key_file' => env('GOOGLE_CLOUD_KEY_FILE', null),
            'bucket' => env('GOOGLE_CLOUD_STORAGE_BUCKET', 'your-bucket'),
            'path_prefix' => env('GOOGLE_CLOUD_STORAGE_PATH_PREFIX', null),
            'storage_api_uri' => env('GOOGLE_CLOUD_STORAGE_API_URI', null),
            'visibility' => 'public',
        ],
    ],
];
```