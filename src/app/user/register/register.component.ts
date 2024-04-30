import { Component } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import IUser from '../../models/user.model';
import { RegisterValidators } from '../validators/register-validators';
import { EmailTaken } from '../validators/email-taken';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  insubmission = false;
  constructor(private auth: AuthService, private emailTaken: EmailTaken) {}

  name = new FormControl('', [Validators.required, Validators.minLength(5)]);
  email = new FormControl(
    '',
    [Validators.required, Validators.email],
    [this.emailTaken.validate]
  );
  age = new FormControl<number | null>(null, [
    Validators.required,
    Validators.min(18),
    Validators.max(99),
  ]);
  password = new FormControl('', [
    Validators.required,
    Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm),
  ]);
  confirmPassword = new FormControl('', [Validators.required]);
  phoneNumber = new FormControl('', [
    Validators.required,
    Validators.minLength(13),
    Validators.maxLength(13),
  ]);
  showAlert = false;
  alertMsg = 'Acount is being created';
  alertColor = 'blue';

  registerForm = new FormGroup(
    {
      name: this.name,
      email: this.email,
      age: this.age,
      password: this.password,
      confirmPassword: this.confirmPassword,
      phoneNumber: this.phoneNumber,
    },
    [RegisterValidators.match('password', 'confirmPassword')]
  );

  public async registerUser() {
    this.showAlert = true;
    this.alertMsg = 'Acount is being created';
    this.alertColor = 'blue';
    this.insubmission = true;

    try {
      this.auth.createUser(this.registerForm.value as IUser);
    } catch (e) {
      console.log(e);
      this.alertMsg = 'Error occured.';
      this.alertColor = 'red';
      this.insubmission = false;
      return;
    }

    this.alertMsg = 'Account has been created!';
    this.alertColor = 'green';
  }
}
