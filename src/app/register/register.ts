
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Component({
    selector: 'register-component',
    templateUrl: 'register.html'
})

export class RegisterComponent 
{
    public registerForm: FormGroup;
    alert = false;
    
    private registerUrl = 'https://zezeserver.herokuapp.com/session/create/';
    
    constructor(private router: Router, private _fb: FormBuilder, private http: Http) {
    this.createForm();
    }
    
    createForm()
    {
        this.registerForm = this._fb.group(
                    {
                        firstname    : ['', Validators.required],
                        lastname     : ['', Validators.required],
                        email        : ['', Validators.required],
                        phone        : ['', Validators.required],
                        password     : ['', Validators.required]
                        //biz_coverage: ['', Validators.required]
                    
                    })
    }
    
    register()
    {
       this.http.post(this.registerUrl ,this.registerForm.value)
            .subscribe(
                data => {
                    //this.alertService.success('Registration successful', true);
                    //this.router.navigate(['/login']);
                },
                error => {
                    //this.alert= true;
                    
                });
    
    }
    /*register() {
        //this.loading = true;
        
        this.http.post(this.registerUrl, this.registerForm.value)
                    .toPromise()
                    .then(res => { this.router.navigate(['/login']); })
                    .catch(this.handleError)
    }*/
    
    private handleError(error: any): Promise<any>
    {
          console.error('An error occurred', error); // for demo purposes only
          return Promise.reject(error.message || error);
    }
    
    
}
