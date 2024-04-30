import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  credentials = {
    email: '',
    password: '',
  };
  inSubmisison = false;
  showAlert = false;
  alertMsg = 'login successful';
  alertColor = 'blue';

  constructor(private auth: AngularFireAuth) {}

  public async login() {
    this.inSubmisison = true;
    this.showAlert = true;
    this.alertMsg = 'Logging in to your account';
    this.alertColor = 'blue';

    try {
      await this.auth.signInWithEmailAndPassword(
        this.credentials.email,
        this.credentials.password
      );
    } catch (e) {
      console.log(e);
      this.inSubmisison = false;
      this.alertMsg = 'Login Error';
      this.alertColor = 'red';
      return;
    }
    this.alertMsg = 'Loggin Successful!';
    this.alertColor = 'green';
  }
}
