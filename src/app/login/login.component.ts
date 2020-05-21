import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private httpClient: HttpClient, private router: Router) { }

  loginForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ])
  });

  ngOnInit(): void {
  }

  login() {
    console.log(this.loginForm.value);
    if (this.loginForm.valid) {
      this.httpClient.post('http://localhost:3000/api/login',
      JSON.stringify(this.loginForm.value)).subscribe((res: any) => {
        console.log('result', res);
        this.router.navigate(['/dashboard']);
        /* if (res.response === 'OK') {
          console.log('redirecting');
          this.router.navigate(['/dashboard']);
        } */
      }, err => {
        console.log('err', err);
      }, () => {
        // maybe count the number of tries
        console.log('completed the http signup');
      });
    } else { // tell them

    }
  }

}
