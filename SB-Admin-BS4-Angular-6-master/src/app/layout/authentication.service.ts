import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { Insurer } from './model/insurer.model';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    private readonly url = 'http://localhost:8080/login';

    constructor(private http: HttpClient) {}

    login(username: string, password: string) {
        // sessionStorage.setItem('token', btoa('user' + ':' + 'password'));
         const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });

        return this.http
            .get(this.url, {headers})
            .pipe(
                map(insurer => {
                        sessionStorage.setItem('token', btoa(username + ':' + password));
                        console.log(insurer);
                        return true;
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
