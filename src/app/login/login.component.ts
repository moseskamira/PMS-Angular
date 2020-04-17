import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { DataService } from '../data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  myUserName: string;
  myPassword: string;

  constructor(
    private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, 
    private dataService: DataService) { 
      this.loginForm = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
      });
      // Redirect to home page if already logged in
      // if (this.authenticationService.currentUserValue) { 
      //   this.router.navigate(['/']);
    }

  ngOnInit() {
   this.setReturnUrl();
    
  }

  setReturnUrl() {
  this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  submitFormData() {
    this.submitted = true;
    if (this.loginForm.invalid) {
        return;
    }
    this.loading = true;
    this.myUserName = this.loginForm.get('username').value;
    this.myPassword = this.loginForm.get('password').value;
    console.log(this.myUserName);
    console.log(this.myPassword);
    // this.dataService.login(this.loginForm.get('username').value, this.loginForm.get('password').value)
    //     .pipe(first())
    //     .subscribe(
    //         data => {
    //             this.router.navigate([this.returnUrl]);
    //         },
    //         error => {
    //             this.error = error;
    //             this.loading = false;
    //         });

  }

}
