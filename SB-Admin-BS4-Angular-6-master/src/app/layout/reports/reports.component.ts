import { Component, OnInit } from '@angular/core';
import { ReportDataService } from '../report-data.service';
import { Report } from '../model/report.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-reports',
    templateUrl: './reports.component.html',
    styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
   advancedPagination: number;
   private _reports: Report[];
   constructor(private reportDataService: ReportDataService) {
    this.advancedPagination = 1;
}

    ngOnInit() {
        this.reportDataService.reportsByInsurer.subscribe(
            reports => (this._reports = reports),
            (error: HttpErrorResponse) => {
                console.log(error.message);
            }
        );
    }

    get reports() {
        return this._reports;
    }
}
