import { identifierName } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Admin } from 'src/app/models/admin';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  admin: Admin | undefined;
  registerForm: FormGroup;
  title = "register";

  constructor(private fb: FormBuilder, 
              private router: Router, 
              private toastr: ToastrService,
              private _authService: AuthService,
              private aRouter: ActivatedRoute) { 
    this.registerForm = this.fb.group({
      _id: [],
      adminName: ['', Validators.required],
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      creationDate: [],
    });
}
  ngOnInit(): void {
    }

  registerAdmin() {
    const admin: Admin = {
      _id: this.registerForm.get('_id')?.value,
      adminName: this.registerForm.get('adminName')?.value,
      fullName: this.registerForm.get('fullName')?.value,
      email: this.registerForm.get('email')?.value,
      password: this.registerForm.get('password')?.value,
      creationDate: this.registerForm.get('creationDate')?.value,
    }
    
    this._authService.register(admin).subscribe(res => {
      console.log(res);
      localStorage.setItem('token', res);      
      this.router.navigate(['/']);
    }, error => {
      console.log(error);
      this.registerForm.reset();
    })
  }
}
