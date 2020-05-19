import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private httpClient: HttpClient) { }

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

  ngOnInit(): void {
  }

  signUp() {
    console.log(this.signupForm.value);
    if (this.signupForm.valid) {
      this.httpClient.post('http://localhost:8000/api/user/signup/',
      JSON.stringify(this.signupForm.value)).subscribe(res => {
        console.log('result', res);
      }, err => {
        console.log('err', err);
      }, () => {
        console.log('completed the http signup');
      });
    }
  }

}
