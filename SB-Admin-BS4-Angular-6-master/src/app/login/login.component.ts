import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { routerTransition } from '../router.animations';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../layout/authentication.service';

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
        private http: HttpClient,
        private authenticationService: AuthenticationService
    ) {}

    ngOnInit() {
        this.logout();
    }

    login() {
        this.authenticationService.login(this.model.username, this.model.password).subscribe(val => {
            if (val) {
                this.router.navigate(['']);
            } else {
                alert('Could not login');
            }
        });
    }

    logout() {
        this.authenticationService.logout();
    }
}
