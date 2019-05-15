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
    pageSize: number;
    insurer = atob(sessionStorage.getItem('token')).split(':')[0];
    private _reports: Report[];
    constructor(private reportDataService: ReportDataService) {
        this.advancedPagination = 1;
        this.pageSize = 20;
    }

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
        const fileName = 'sample.pdf';

        downloadLink.href = linkSource;
        downloadLink.download = fileName;
        downloadLink.click();

        const pdf = atob(pdfString);
        console.log('File Size:', Math.round(pdf.length / 1024), 'KB');
        console.log('PDF Version:', pdf.match(/^.PDF-([0-9.]+)/)[1]);
        console.log('Create Date:', pdf.match(/<xmp:CreateDate>(.+?)<\/xmp:CreateDate>/)[1]);
        console.log('Modify Date:', pdf.match(/<xmp:ModifyDate>(.+?)<\/xmp:ModifyDate>/)[1]);
        console.log('Creator Tool:', pdf.match(/<xmp:CreatorTool>(.+?)<\/xmp:CreatorTool>/)[1]);
    }

    get reports() {
        return this._reports;
    }
}
