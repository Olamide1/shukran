import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private httpClient: HttpClient, private router: Router) { }

  signupForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    phonenumber: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d{11}|\+234\d{10}$/) // ^\d{11}|\+234\d{10}$
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ])
  });

  signupFormData = new FormData();

  ngOnInit(): void {
  }

  signUp() {
    console.log(this.signupForm.value);
    if (this.signupForm.valid) {

      Object.entries(this.signupForm.value).forEach((value: [string, string | Blob], index, arr) => {
        this.signupFormData.append(value[0], value[1]);
      });

      this.httpClient.post('http://localhost:3000/api/createaccount',
      this.signupForm.value/* this.signupFormData */).subscribe(res => {
        console.log('result', res);
        this.router.navigate(['/dashboard']);
      }, err => {
        console.log('err', err);
      }, () => {
        console.log('completed the http signup');
      });
    }
  }

}
