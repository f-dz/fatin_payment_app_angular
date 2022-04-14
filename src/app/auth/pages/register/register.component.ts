import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  isSubmitted: boolean = false;
  isSuccess: boolean = false;
  isFailed: boolean = false;
  loader: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  form = {
    inputData: new FormGroup ({
      username: new FormControl('', [Validators.required, Validators.minLength(5)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{5,}$")])
    })
  };

  get username() {return this.form.inputData.get('username')}
  get email() {return this.form.inputData.get('email')}
  get password() {return this.form.inputData.get('password')}

  registerUser() {
    this.isSubmitted = true;
    if(this.form.inputData.valid) {
      const registerData = this.form.inputData.value;
      this.loader = true;
      this.authService.register(registerData).subscribe(res => {
        if(res){
          this.form.inputData.reset();
          this.isSubmitted = false;
          this.isSuccess = true;
          this.isFailed = false;
          this.loader = false;
        }
      });
      if (this.loader == true) {
        setTimeout(() => {
          this.isSubmitted = false;
          this.isFailed = true;
          this.isSuccess = false;
          this.loader = false;
        }, 12000);
      }
    }
  }

  ngOnInit(): void {
  }

}
