import { Component, OnInit } from '@angular/core';
import { ReportDataService } from '../report-data.service';
import { Report } from '../model/report.model';
import { HttpErrorResponse } from '@angular/common/http';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

@Component({
    selector: 'app-reports',
    templateUrl: './reports.component.html',
    styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
    constructor(private reportDataService: ReportDataService) {
        this.advancedPagination = 1;
        this.pageSize = 20;
    }
    advancedPagination: number;
    pageSize: number;
    insurer = atob(sessionStorage.getItem('token')).split(':')[0];
    private _reports: Report[];

    ngOnInit() {
        this.reportDataService.reportsByInsurer.subscribe(
            reports => (this._reports = reports),
            (error: HttpErrorResponse) => {
                console.log(error.message);
            }
        );
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

    public downloadExcel(report: Report): void {
        console.log(report.id);
        const EXCEL_EXTENSION = '.xlsx';
        this.reportDataService.reportToExcel(report.id).subscribe((data) => {

            const downloadURL = window.URL.createObjectURL(data);
            const link = document.createElement('a');
            link.href = downloadURL;
            link.download = 'report.xlsx';
            link.click();

          });
    }

    get reports() {
        return this._reports;
    }
}
