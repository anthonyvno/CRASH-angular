import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    private readonly url = 'http://localhost:8080/login';

    constructor(private http: HttpClient) {}

    login(username: string, password: string): Observable<boolean> {
        return this.http
            .post<Observable<boolean>>(this.url, {
                userName: username,
                password: password
            })
            .pipe(
                map((res: any) => {
                    if (res) {
                        sessionStorage.setItem('token', btoa(username + ':' + password));
                        return true;
                    } else {
                        alert('Authentication failed.');
                        return false;
                    }
                })
            );
    }

    logout() {
        sessionStorage.removeItem('token');
    }

    isUserLoggedIn() {
        return sessionStorage.getItem('token') != null;
    }
}
