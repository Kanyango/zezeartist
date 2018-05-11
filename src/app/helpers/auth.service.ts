import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
 
@Injectable()
export class AuthenticationService {
    constructor(private http: Http) { }
    
    private loginUrl = 'https://zezeserver.herokuapp.com/login';
  
    login(username: string, password: string) {
        return this.http.post(this.loginUrl, { username: username, password: password })
            .map(user => {
                   let rtnd = user.json();
                    
                    localStorage.setItem('zezeUser', rtnd.token);
                
                    return user;

            });
    }
 
    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('zezeUser');
    }
}
