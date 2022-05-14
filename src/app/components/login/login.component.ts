import { identifierName } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Admin } from 'src/app/models/admin';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  admin: Admin | undefined;
  loginForm: FormGroup;
  title = "login";

  constructor(private fb: FormBuilder, 
              private router: Router, 
              private toastr: ToastrService,
              private _authService: AuthService,
              private aRouter: ActivatedRoute) { 
    this.loginForm = this.fb.group({
      _id: [],
      adminName: ['', Validators.required],
      fullName: [''],
      email: [''],
      password: ['', Validators.required],
      creationDate: [],
    });
}
  ngOnInit(): void {
    }

  loginAdmin() {
    const admin: Admin = {
      _id: this.loginForm.get('_id')?.value,
      adminName: this.loginForm.get('adminName')?.value,
      fullName: this.loginForm.get('fullName')?.value,
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value,
      creationDate: this.loginForm.get('creationDate')?.value,
    }
    
    this._authService.login(admin).subscribe((res: any) => {
      localStorage.setItem('token', res.token);   
      console.log(res);
      this.router.navigate(['/dashboard']);
    }, error => {
      console.log(error);
      this.loginForm.reset();
    })
  }
}
