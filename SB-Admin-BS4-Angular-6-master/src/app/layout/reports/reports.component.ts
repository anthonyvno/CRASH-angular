import { Component, OnInit } from '@angular/core';
import { ReportDataService } from '../report-data.service';
import { Report } from '../model/report.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Subject } from 'rxjs';
import { distinctUntilChanged, debounceTime, map } from 'rxjs/operators';
import { NgbDateCustomParserFormatter } from './dateformat';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { VehicleTypeFilterPipe } from './vehicle-type-filter.pipe';
import { BeforeDateFilterPipe } from './before-date-filter.pipe';
import { AfterDateFilterPipe } from './after-date-filter.pipe';
import { InsuranceNumberFilterPipe } from './insurance-number-filter.pipe';
import { PostalCodeFilterPipe } from './postal-code-filter.pipe';

@Component({
    selector: 'app-reports',
    templateUrl: './reports.component.html',
    styleUrls: ['./reports.component.scss'],
    providers: [{ provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter }]
})
export class ReportsComponent implements OnInit {
    public filterInsuranceNumberSearch: string;
    public filterInsuranceNumber$ = new Subject<string>();
    public filterPostalCodeSearch: string;
    public filterAfterDateSearch: string;
    public filterBeforeDateSearch: string;
    public filterVehicleTypeSearch: string;
    public filterPostalCode$ = new Subject<string>();
    public loading = true;

    constructor(private reportDataService: ReportDataService) {
        this.filterInsuranceNumber$
            .pipe(
                distinctUntilChanged(),
                debounceTime(400),
                map(val => val.toLowerCase())
            )
            .subscribe(val => (this.filterInsuranceNumberSearch = val));
        this.filterPostalCode$
            .pipe(
                distinctUntilChanged(),
                debounceTime(400),
                map(val => val.toLowerCase())
            )
            .subscribe(val => (this.filterPostalCodeSearch = val));
        this.advancedPagination = 1;
        this.pageSize = 10;
    }
    advancedPagination: number;
    pageSize: number;
    insurer = atob(sessionStorage.getItem('token')).split(':')[0];
    private _reports: Report[];

    ngOnInit() {
        // this.loading = true;
        this.loadData();
    }
    loadData() {

        this.reportDataService.reportsByInsurer.subscribe(
            reports => {
                this._reports = this._reports = reports.sort((a: Report, b: Report) => {
                    if (new Date(a.dateReportReceived) > new Date(b.dateReportReceived)) {
                        return -1;
                    } else if (new Date(a.dateReportReceived) < new Date(b.dateReportReceived)) {
                        return 1;
                    } else {
                        return 0;
                    }
                });
                this.loading = false;
            },
            (error: HttpErrorResponse) => {
                console.log(error.message);
            }
        );
    }

    vehicleTypeFilter(filter: string) {
        this.filterVehicleTypeSearch = filter;
    }

    afterDateFilter(filter: string) {
        this.filterAfterDateSearch = filter;
    }

    beforeDateFilter(filter: string) {
        this.filterBeforeDateSearch = filter;
    }

    clickOnInput(filter: string) {
        const input = document.getElementById(filter);
        input.click();
    }

    public downloadPDF(report: Report) {
        const pdfString = report.pdfReport;
        const linkSource = 'data:application/pdf;base64,' + pdfString;
        const downloadLink = document.createElement('a');
        const fileName = 'Aanrijdingsformulier_' + report.id + '_.pdf';
        downloadLink.href = linkSource;
        downloadLink.download = fileName;
        downloadLink.click();

        const pdf = atob(pdfString);
        console.log(report.toJSON());
        console.log(report);
    }

    public downloadExcel(reports: Report[]): void {
        reports = new VehicleTypeFilterPipe().transform(reports, this.filterVehicleTypeSearch);
        reports = new BeforeDateFilterPipe().transform(reports, this.filterBeforeDateSearch);
        reports = new AfterDateFilterPipe().transform(reports, this.filterAfterDateSearch);
        reports = new InsuranceNumberFilterPipe().transform(reports, this.filterInsuranceNumberSearch);
        reports = new PostalCodeFilterPipe().transform(reports, this.filterPostalCodeSearch);
        const idArrayVanReports = reports.map(reports => reports.id);
        console.log(idArrayVanReports);
        const EXCEL_EXTENSION = '.xlsx';
        try {
            this.reportDataService.reportToExcel(idArrayVanReports).subscribe(data => {
                const downloadURL = window.URL.createObjectURL(data);
                const link = document.createElement('a');
                link.href = downloadURL;
                link.download = 'report.xlsx';
                link.click();
            });
        } catch (e) {
            console.log(e);
        }
    }

    get reports() {
        return this._reports;
    }
}
