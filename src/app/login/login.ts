
import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Headers, Http } from '@angular/http';

@Component({
  selector: 'login-component',
  templateUrl: 'login.html'
})
export class LoginComponent 
{
  public fbUrl = 'https://zezeapp.herokuapp.com/auth/facebook/';
    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http,
            private router: Router,
            private route: ActivatedRoute){}
    
    fbStrategy()
    {
       this.http.get(this.fbUrl)
            .toPromise()
            .then(res => {
                        console.log(res.json());
                        this.router.navigate(['../release']);

             })
            .catch(this.handleError)
    }
    private handleError(error: any): Promise<any>
     {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
    }
 
}
