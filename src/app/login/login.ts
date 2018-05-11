
import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Headers, Http } from '@angular/http';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../helpers/auth.service';

@Component({
  selector: 'login-component',
  templateUrl: 'login.html'
})
export class LoginComponent 
{
    loginForm: FormGroup;
    model = {username: '', password: ''};
    alert = false;
  
    constructor(private route: ActivatedRoute,
                private router: Router,
                private fb: FormBuilder,
                private authenticationService: AuthenticationService)
       {
          this.createForm();
       }
  
    ngOnInit() {
        // reset login status
        this.authenticationService.logout();
    }
    
    createForm()
    {
      this.loginForm = this.fb.group({
        username: ['', Validators.required],
        password : ['', Validators.required]
      });
    }
    
    login() {
        //this.loading = true;
        this.model.username = this.loginForm.value.username;
        this.model.password = this.loginForm.value.password;
        
        console.log('Iam model', this.model);
        console.log('Iam username', this.loginForm);
      
        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(
                data => {
                    this.router.navigate(['/release']);
                },
                error => {
                   // this.alertService.error(error);
                    //this.loading = false;
                  this.alert = true;
                });
    }
    private handleError(error: any): Promise<any>
     {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
    }
 
}
