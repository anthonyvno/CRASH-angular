import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Insurer } from './model/insurer.model';
import { Observable } from 'rxjs';
import { map, filter, find } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ReportDataService {
    private readonly _appUrl = 'http://localhost:8080';

    constructor(private http: HttpClient) {}

    get insurers(): Observable<Insurer[]> {
        const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa('user' + ':' + 'password') });

        return this.http.get(`${this._appUrl}/insurers/`, { headers }).pipe(map((list: any[]): Insurer[] => list.map(Insurer.fromJson)));
    }
}
