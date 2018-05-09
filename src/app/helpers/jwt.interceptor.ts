import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
 
@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        let zezeUser = JSON.parse(localStorage.getItem('zezeUser'));
        if (zezeUser) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${zezeUser}`
                }
            });
        }
 
        return next.handle(request);
    }
}
