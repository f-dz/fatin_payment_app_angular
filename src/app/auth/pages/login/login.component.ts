import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isFail: boolean = false;
  isSubmitted: boolean = false;
  loader: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  form = {
    inputData: new FormGroup ({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{5,}$")])
    })
  };

  get email() {return this.form.inputData.get('email')}
  get password() {return this.form.inputData.get('password')}
  
  loginUser() {    
    this.isSubmitted = true;
    if(this.form.inputData.valid) {
      const loginData = this.form.inputData.value;
      this.loader = true;
      this.authService.login(loginData).subscribe((res: any) => {
        if(res.success == true) {
          this.authService.setAuthorizationToken(res.token);
          this.authService.setAuthorizationRefreshToken(res.refreshToken);
          this.authService.setExpiredToken(res.token);
          this.form.inputData.reset();
          this.isFail = false;
          this.loader = false;
          this.router.navigate(['paymentdetails']);
        }
      });
      if (this.loader == true) {
        setTimeout(() => {
          this.isSubmitted = false;
          this.isFail = true;
          this.loader = false;
        }, 12000);
      }
    }
  }

  ngOnInit(): void {
  }

}
