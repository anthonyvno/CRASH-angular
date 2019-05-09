import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { routerTransition } from '../router.animations';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
    model: any = {};

    constructor(
    private route: ActivatedRoute,
      public router: Router,
      private http: HttpClient
      ) {}

    ngOnInit() {
        sessionStorage.setItem('token', '');
        localStorage.setItem('isLoggedin', 'false');
    }

    login() {
        const url = 'http://localhost:8080/login';
        const result = this.http.post<Observable<boolean>>(url, {
            userName: this.model.username,
            password: this.model.password
        }).subscribe(isValid => {
            if (isValid) {
                sessionStorage.setItem('token', btoa(this.model.username + ':' + this.model.password));
                this.router.navigate(['']);
            } else {
                alert('Authentication failed.');
            }
        });
        console.log(result);
        console.log(this.http.get(url));
         localStorage.setItem('isLoggedin', 'true');
    }
}
