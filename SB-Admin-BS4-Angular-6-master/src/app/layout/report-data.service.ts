import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Insurer } from './model/insurer.model';
import { Observable } from 'rxjs';
import { map, filter, find } from 'rxjs/operators';
import { Report } from './model/report.model';

@Injectable({
    providedIn: 'root'
})
export class ReportDataService {
    private readonly _appUrl = 'http://localhost:8080';

    constructor(private http: HttpClient) {}

    get insurers(): Observable<Insurer[]> {
        const headers = new HttpHeaders({ Authorization: 'Basic ' + sessionStorage.getItem('token') });

        return this.http.get(`${this._appUrl}/insurers/`, { headers }).pipe(map((list: any[]): Insurer[] => list.map(Insurer.fromJson)));
    }

    get reportsByInsurer(): Observable<Report[]> {
        const headers = new HttpHeaders({ Authorization: 'Basic ' + sessionStorage.getItem('token') });
        const insurerName = atob(sessionStorage.getItem('token')).split(':')[0];
        console.log(insurerName);

        return this.http
            .get(`${this._appUrl}/reports/insurer/` + insurerName, { headers })
            .pipe(map((list: any[]): Report[] => list.map(Report.fromJson)));
    }
}
