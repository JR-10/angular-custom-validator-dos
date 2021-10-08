import { Component } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup,
  AbstractControl,
  FormControl,
} from '@angular/forms';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  name = 'Angular';
  registerForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.createRegisterForm();
    console.log(this.registerForm);
  }

  createRegisterForm() {
    this.registerForm = this.fb.group({
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        // this.emailMatchValidator,
      ]),
      username: new FormControl('', [Validators.required, this.wordValidator]),

      /*
      email: [
        '',
        [Validators.required, Validators.email, this.emailMatchValidator],
      ],
      username: ['', [Validators.required, this.wordValidator]],
      */
    });
  }

  emailMatchValidator(control: AbstractControl) {
    if (control.value !== 'email@gmail.com') {
      return false;
    } else {
      return { emailExists: true };
    }
  }

  wordValidator(control: FormControl) {
    // wordValidator(control: AbstractControl) {
    let valorData: boolean;
    console.log('Valor del input: ', control.value);
    const nameRegexp: RegExp[] = [
      /CREATE/,
      /ALTER/,
      /DROP/,
      /TRUNCATE/,
      /COMMENT/,
      /RENAME/,
      /INSERT/,
      /UPDATE/,
      /DELETE/,
      /GRANT/,
      /REVOKE/,
      /COMMIT/,
      /ROLLBACK/,
      /CONCAT/,
    ];

    for (const index in nameRegexp) {
      // console.log(`${index}: ${nameRegexp[index]}`);
      if (nameRegexp[index].test(control.value.toUpperCase())) {
        valorData = true;
        console.log('cumple');
        // break;
        return { invalidName: valorData };
      }
    }
  }

  guardar() {
    console.log('formulario: ', this.registerForm);

    console.log('entro');
    if (this.registerForm.valid) {
      console.log('formulario valido: ', this.registerForm.valid);
      console.log('formulario: ', this.registerForm.value);
    }
  }
}
