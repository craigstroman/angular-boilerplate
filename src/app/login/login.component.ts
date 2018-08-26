import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../shared/services/APIService/api.service';
import { AuthService } from '../shared/services/AuthService/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public frm: FormGroup;
  public hasFailed: boolean = false;
  public isBusy: boolean = false;
  public usernameInputError: boolean = false;
  public passwordInputError: boolean = false;


  constructor(
    private _fb: FormBuilder,
    private _apiService: ApiService,
    private _authService: AuthService,
    private _router: Router
  ) {
    this.frm = _fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  public updateStatus() {
    if (this.frm.get('username').valid) {
      this.usernameInputError = false;
    }

    if (this.frm.get('password').valid) {
      this.passwordInputError = false;
    }
  }

  public doSignIn() {
    if (this.frm.invalid) {
      this.usernameInputError = (this.frm.get('username').invalid)? true : false;

      this.passwordInputError = (this.frm.get('password').invalid)? true : false;
      return;
    }

    this.isBusy = true;
    this.hasFailed = false;

    const username: string = this.frm.get('username').value;
    const password: string = this.frm.get('password').value;

    this._apiService
      .signIn(username, password)
      .subscribe(res => {
        console.log('res: ', res);
        if (res.access_token) {
          this._authService
              .doSignIn(res.access_token);

          this._router.navigate(['dashboard']);
        }
      },
      (error) => {
        console.log('error: ', error);
        this.isBusy = false;
        this.hasFailed = true;
      })
  }

}
