---
title: Login dan Register di Ionic Menggunakan Firebase
date: "2018-04-01T01:05:06.284Z"
---

Login dan register adalah fitur dasar yang harus dibuat saat kita membuat sebuah aplikasi. Umumnya fungsi ini ditangni oleh bahasa di server side seperti NodeJs, PHP, Ruby, Java atau yang lainnya. Tapi pada tutorial kali ini saya akan membagikan bagaimana membuat login dan register di Ionic menggunakan Firebase.

Dalam membuat login dan register di Ionic menggunakan Firebase kita akan membuat beberapa fungsi yaitu :

*   Register akun baru
*   Verifikasi akun email
*   Login dengan akun yang telah ada
*   Reset password

Keempat fungsi diatas akan ditangani oleh Firebase.

### Membuat Project Ionic

Pertama adalah membuat project ionic. Buka Terminal tau Command Prompt dan arahkan pada directory yang diinginkan dan jalankan command berikut :  
`$ ionic start firebase-auth blank`

Setelah project berhasil dibuat, masuk kedalam directory project ionic dan install package firebase

`$ cd firebase-auth`

`$ npm install firebase angularfire2 --save`

### Membuat Project Firebase

Selanjutnya kita harus membuat sebuah project pada Firebase Console. Silahkan buka [link ini](http://console.firebase.google.com/).

Pada halaman console pilih add project

![](./Screen-Shot-2018-02-27-at-17.04.12-300x168.png "Login dan Register di Ionic Menggunakan Firebase")

Setelah itu isi form pada pop up yang tampil, isikan nama project, untuk pilihan negara hanya optional saja. Kemudian klik create project.

![](./Screen-Shot-2018-02-27-at-17.09.05-300x282.png "Login dan Register di Ionic Menggunakan Firebase")

Setelah selesai dibuat masuk ke dalam dashboard project, dibagian kanan klik “Add Another App” dan pilih “Add firebase to your web app”

![](./Screen-Shot-2018-02-27-at-17.14.56-300x128.png "Login dan Register di Ionic Menggunakan Firebase")

Copy script yang saya tandai

![](./Screen-Shot-2018-02-27-at-17.24.21-300x199.png "Login dan Register di Ionic Menggunakan Firebase")

Lalu pindah menu **Authentication** pilih tab **SIGN-IN METHOD** dan ubah status provider **Email/Password** menjadi **Enabled**

![](./Screen-Shot-2018-03-25-at-23.49.36-300x96.png "Login dan Register di Ionic Menggunakan Firebase")

### Coding Aplikasi Ionic

Buka folder project ionic dengan text editor lalu buka file `src/app.module.ts` lalu import module angular fire serta paste hasil konfigurasi firebase yang di copy dari console firebase

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

// Angular Fire Module
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';

// AngularFire Settings
export const firebaseConfig = {
	apiKey: "AIzaSyDx_sw-5k4dadS5YZ_4gUzWT-1Xana9Phw",
	authDomain: "projectapp-654b9.firebaseapp.com",
	databaseURL: "https://projectapp-654b9.firebaseio.com",
	projectId: "projectapp-654b9",
	storageBucket: "projectapp-654b9.appspot.com",
	messagingSenderId: "796115019408"
};

@NgModule({
	declarations: [
		MyApp,
	],
	imports: [
		BrowserModule,
		IonicModule.forRoot(MyApp),
		AngularFireModule.initializeApp(firebaseConfig),
	],
	bootstrap: [IonicApp],
	entryComponents: [
		MyApp,
	],
	providers: [
		{provide: ErrorHandler, useClass: IonicErrorHandler},
		AngularFireAuth,
	]
})
export class AppModule {}
```

###### Membuat halaman login

Buat sebuah page login dengan menjalan command berikut pada terminal

`$ ionic g page Login`

Buka file `src/app/app.component.ts`, kita perlu menambahkan module AngularFireAuth dan pengecekan status login user pada constructor

```typescript
import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
	templateUrl: 'app.html'
})
export class MyApp {
	rootPage:any

	constructor(private afAuth: AngularFireAuth) {
		this.afAuth.authState.subscribe(user => {
			if (!user || !user.emailVerified) {
				this.rootPage = 'LoginPage'
			} else {
				this.rootPage = 'HomePage'
			}
		})
	}
}
```
Lalu buka file `src/pages/login/login.html` tambahkan form input email dan password untuk login dan tombol untuk register dan reset password

```html
<ion-header>
	<ion-navbar>
		<ion-title>Login</ion-title>
	</ion-navbar>
</ion-header>

<ion-content padding>
	<form #form="ngForm" (ngSubmit)="login()">
		<ion-list>
			<ion-item>
				<ion-label floating>Email</ion-label>
				<ion-input type="text" [(ngModel)]="user.email" name="email" required></ion-input>
			</ion-item>
			<ion-item>
				<ion-label floating>Password</ion-label>
				<ion-input type="password" [(ngModel)]="user.password" name="password" required></ion-input>
			</ion-item>
		</ion-list>
		<button ion-button block type="submit" [disabled]="!form.valid">Login</button>
	</form>
	<ion-grid>
		<ion-row>
			<ion-col>
				<button ion-button block (tap)="toRegister()">Create Account</button>
			</ion-col>
			<ion-col>
				<button ion-button block (tap)="toResetPassword()">Reset Password</button>
			</ion-col>
		</ion-row>
	</ion-grid>
</ion-content>
```

![](./login-page-296x600.png "Login dan Register di Ionic Menggunakan Firebase")

Setelah itu buat file baru pada folder `src/pages/home` dan beri nama `home.module.ts`
```typescript
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';

@NgModule({
	declarations: [
		HomePage,
	],
	imports: [
		IonicPageModule.forChild(HomePage),
	],
})
export class HomePageModule {}
```
File diatas digunakan untuk membuat lazy load pada page ionic

Selanjutnya buka file `src/pages/login/login.ts` kita perlu membuat 3 method yaitu `login`, `toRegister` dan `toResetPassword`
```typescript
import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

@IonicPage()
@Component({
	selector: 'page-login',
	templateUrl: 'login.html',
})
export class LoginPage {
	user: any = {}

	constructor(private navCtrl: NavController, private afAuth: AngularFireAuth, private alertCtrl: AlertController) {
	}

	login() {
		this.afAuth.auth.signInWithEmailAndPassword(this.user.email, this.user.password).then(data => {
			if (!data.emailVerified) {
				let alert = this.alertCtrl.create({
					title: 'Failed',
					message: 'Email has not been verified',
					buttons: ['OK']
				})
				alert.present()
			} else {
		this.navCtrl.setRoot('HomePage')
		}
		}).catch(err => {
			let alert = this.alertCtrl.create({
				title: 'Failed',
				message: err.message,
				buttons: ['OK']
			})
			alert.present()
		})
	}

	toRegister() {
		this.navCtrl.push('RegisterPage')
	}

	toResetPassword() {
		this.navCtrl.push('ResetPasswordPage')
	}

}
```
Pada method `login` di atas ada penambahan pengecekan apakah email sudah diverifikasi atau belum, method `toRegister` untuk pindah ke halaman register dan method `toResetPassword` untuk pindah ke halaman reset password

###### Membuat halaman register

Buat sebuah page register dengan command berikut pada terminal

`$ ionic g page Register`

Kemudian ubah `file src/pages/register/register.html`
```html
<ion-header>    
	<ion-navbar>
		<ion-title>Register</ion-title>
	</ion-navbar>
</ion-header>

<ion-content padding>
	<form #form="ngForm" (ngSubmit)="register()">
		<ion-list>
			<ion-item>
				<ion-label floating>Email</ion-label>
				<ion-input type="text" [(ngModel)]="user.email" name="email" required></ion-input>
			</ion-item>
			<ion-item>
				<ion-label floating>Password</ion-label>
				<ion-input type="password" [(ngModel)]="user.password" name="password" required></ion-input>
			</ion-item>
			<p class="text-md-danger" *ngIf="error">{{ error }}</p>
		</ion-list>
		<button ion-button block type="submit" [disabled]="!form.valid">Register</button>
	</form>
</ion-content>
```
![](./register-page-295x600.png "Login dan Register di Ionic Menggunakan Firebase")

Setelah itu kita harus membuat beberapa function untuk register dan kirim email verifikasi
```typescript
import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

@IonicPage()
@Component({
	selector: 'page-register',
	templateUrl: 'register.html',
})
export class RegisterPage {
	user: any = {}
	error: string
	constructor(private afAuth: AngularFireAuth, private navCtrl: NavController, private alertCtrl: AlertController) {
	}

	register() {
		this.afAuth.auth.createUserWithEmailAndPassword(this.user.email, this.user.password)
		.then(data => {
			let alert = this.alertCtrl.create({
				title: 'Success',
				message: 'Email verification has been sent',
				buttons: ['OK']
			})
			alert.present()
			this.navCtrl.pop()
			this.emailVerification()
		})
		.catch(err => {
			console.log(err)
			this.error = err.message
		})
	}

	emailVerification() {
		this.afAuth.auth.currentUser.sendEmailVerification().then(data => {
			console.log(data)
		}).catch(error => {
			console.log(error)
		})
	}
}
```
Setelah itu kita coba untuk register

![](./register-success-296x600.png "Login dan Register di Ionic Menggunakan Firebase")

Jika success maka akan seperti gambar di atas,

Sekarang kita mencoba untuk login sebelum verifikasi email

![](./email-not-verified-296x600.png "Login dan Register di Ionic Menggunakan Firebase")

Setelah dicoba ternyata gagal, sekarang coba cek email

Ini adalah isi email verifikasi yang masuk setelah register

![](./email-verifikasi-768x230.png "Login dan Register di Ionic Menggunakan Firebase")

Klik tautan pada isi email tersebut, maka kita sukses untuk verifikasi email![](./sukses-verifikasi.png "Login dan Register di Ionic Menggunakan Firebase")

###### membuat halaman home

Sebelum kita login, kita harus mengubah halaman home terlebih dahulu

Buka file `src/pages/home/home.html` ubah file tersebut menjadi seperti berikut
```html
<ion-header>
	<ion-navbar>
		<ion-title>
			Home
		</ion-title>
	</ion-navbar>
</ion-header>

<ion-content>
	<ion-list>
		<ion-item>
			<ion-icon name="mail" item-start></ion-icon>
			{{ user.email }}
		</ion-item>
	</ion-list>
	<ion-grid>
		<ion-row>
			<ion-col>
				<button ion-button block (tap)="changePassword()">Change Password</button>
			</ion-col>
			<ion-col>
				<button ion-button block color="danger" (tap)="logout()">Logout</button>
			</ion-col>
		</ion-row>
	</ion-grid>
</ion-content>
```
Setelah itu buka file `src/pages/home/home.ts`, buat sebuah function untuk change password untuk dan logout
```typescript
import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

@IonicPage()
@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {
	user: any = {}

	constructor(private navCtrl: NavController, private afAuth: AngularFireAuth, private alertCtrl: AlertController) {
		this.afAuth.authState.subscribe(user => {
			if (user != null) {
			this.user.email = user.email
			} else {
			this.navCtrl.setRoot('LoginPage')
			}
		})
	}

	changePassword() {
		let emailAddress = this.user.email
		this.afAuth.auth.sendPasswordResetEmail(emailAddress).then(() => {
			let alert = this.alertCtrl.create({
					title: 'Success',
					message: 'Email reset password has been sent',
					buttons: ['OK']
				})
				alert.present()
		}).catch((error) => {
			console.log(error)
		});
	}

	logout() {
		let confirm = this.alertCtrl.create({
			title: 'Confirmation',
			message: 'Logout from account ?',
			buttons: [
			{ text: 'Cancel' },
			{
				text: 'Yes',
				handler: () => {
				this.afAuth.auth.signOut()
				this.navCtrl.setRoot('LoginPage')
				}
			}
			]
		})
		confirm.present()
	}

}
```
Pada function change password, firebase mengirim email untuk reset password

Sekarang coba untuk login, jika berhasil maka akan tampil seperti gambar dibawah ini

![](./home-page-296x600.png "Login dan Register di Ionic Menggunakan Firebase")

Saat logout di klik maka akan tampil konfirmasi logout

![](./confirm-logout-296x600.png "Login dan Register di Ionic Menggunakan Firebase")

###### membuat halaman reset password

Pada terminal jalan command berikut untuk membuat page reset password

`$ ionic g page ResetPassword`

Setelah itu ubah file `src/pages/reset-password/reset-password.html`
```html
<ion-header>

	<ion-navbar>
		<ion-title>Reset Password</ion-title>
	</ion-navbar>

</ion-header>

<ion-content padding>
	<form #form="ngForm" (ngSubmit)="reset()">
		<ion-list>
			<ion-item>
				<ion-label floating>Email</ion-label>
				<ion-input type="email" [(ngModel)]="user.email" name="email" required></ion-input>
			</ion-item>
		</ion-list>
		<button ion-button block type="submit" [disabled]="!form.valid">Reset Password</button>
	</form>
</ion-content>
```
Lalu ubah juga file `src/pages/reset-password/reset-password.ts`
```typescript
import { Component } from '@angular/core';
import { IonicPage, AlertController, NavController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

@IonicPage()
@Component({
	selector: 'page-reset-password',
	templateUrl: 'reset-password.html',
})
export class ResetPasswordPage {
	user: any = {}

	constructor(private afAuth: AngularFireAuth, private alertCtrl: AlertController, private navCtrl: NavController) {
	}

	reset() {
		this.afAuth.auth.sendPasswordResetEmail(this.user.email).then(() => {
			this.showAlert('Success', 'Email reset password has been sent')
			this.navCtrl.pop()
		}).catch(error => {
			console.log(error)
			this.showAlert('Failed', error.message)
		})
	}

	showAlert(title, message) {
		let alert = this.alertCtrl.create({
			title: title,
			message: message,
			buttons: ['OK']
		})
		alert.present()
	}

}
```
File diatas berisi function untuk reset password dan firebase mengirim email untuk reset password

Ini adalah halaman reset password

![](./reset-password-page-296x600.png "Login dan Register di Ionic Menggunakan Firebase")

Jika email tidak terdaftar pada database firebase maka akan tampil alert

![](./failled-reset-password-296x600.png "Login dan Register di Ionic Menggunakan Firebase")

Tapi jika email terdaftar maka akan tampil alert sukses

![](./success-reset-password-296x600.png "Login dan Register di Ionic Menggunakan Firebase")

Berikut ini adalah isi email saat reset password

![](./email-reset-password-900x270.png "Login dan Register di Ionic Menggunakan Firebase")

Setelah di klik maka akan diarahkan ke form reset password

![](./form-reset-password.png "Login dan Register di Ionic Menggunakan Firebase")

Dan password berhasil direset

![](./password-changed.png "Login dan Register di Ionic Menggunakan Firebase")

Setelah itu coba login dengen password baru anda.

###### Reset password pada halaman home

Pada halaman home kita juga telah membuat function untuk mereset password, saat di klik maka akan tampil alert success dan email berisi link reset password terkirim ke email kita seperti pada halaman reset password

![](./reset-password-home-296x600.png "Login dan Register di Ionic Menggunakan Firebase")

Demikianlah cara membuat login dan register di Ionic menggunakan Firebase.

###### tambahan

Kalian dapat mengubah template dari email verifikasi dan reset password pada tab **TEMPLATES**

![](./template-email-300x159.png "Login dan Register di Ionic Menggunakan Firebase")

Full source dapat kalian download pada akun github saya [https://github.com/andriyandriyan/ionic-firebase-auth](https://github.com/andriyandriyan/ionic-firebase-auth)

Untuk demo aplikasi dapat kalian lihat [disini](http://andriyandriyan.com/ionic-firebase-auth)