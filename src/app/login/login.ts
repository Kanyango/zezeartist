
import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Headers, Http } from '@angular/http';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'login-component',
  templateUrl: 'login.html'
})
export class LoginComponent 
{
    loginForm: FormGroup;
    
    constructor(private fb: FormBuilder)
    {
        this.createForm();
     }
    
    createForm()
    {
      this.loginForm = this.fb.group({
        username: ['', Validators.required],
        password : ['', Validators.required]
      });
    }
    
    onSubmit()
    {
      
    } 
    private handleError(error: any): Promise<any>
     {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
    }
 
}
