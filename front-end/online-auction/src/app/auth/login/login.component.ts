import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from '../../_services/token-storage.service';
import {AuthService} from '../../_services/auth.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ErrorHandler} from "../../_shared/error-handler";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.scss' ]
})
export class LoginComponent implements OnInit {

  submitted = false;

  form: FormGroup;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  loading = false;

  constructor(private tokenStorage: TokenStorageService,
              private authService: AuthService,
              private router: Router,
              private errorHandler: ErrorHandler) {
  }

  ngOnInit(): void {
    if (this.tokenStorage.getUser() !== null) {
      this.router.navigate([ '/' ]);
    }
    this.form = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.maxLength(20)
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(120)
      ])
    });

    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }

  }

  onSubmit(): void {
    if (this.loading) {
      return;
    }
    this.loading = true;
    setTimeout(() => {
      this.submitForm();
    }, 10);
    // this.submitForm();
  }

  reloadPage(): void {
    window.location.reload();
  }

  submitForm(): void {
    this.loading = true;
    this.isLoginFailed = false;
    this.errorMessage = '';
    this.submitted = true;

    if (this.form.invalid) {
      this.loading = false;
      return;
    }
    this.authService.login(this.form.value).subscribe(
      (data) => {
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        this.reloadPage();
        this.loading = false;
      },
      (err) => {
        if (err.status === 401) {
          this.errorMessage = 'Invalid login and/or password';

        } else {
          this.errorMessage = err.message;
          this.errorHandler.handleError(err);
        }
        this.isLoginFailed = true;
        this.loading = false;

      }
    );
  }

}
