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
        report.toJSON();
    }


    public downloadExcel(report: Report): void {
        const json = [report.toJSON()];
        console.log(json);
        const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
        const workbook: XLSX.WorkBook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, 'test');
    }

    private saveAsExcelFile(buffer: any, fileName: string): void {
        const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
        const data: Blob = new Blob([buffer], {
            type: EXCEL_TYPE
        });
        FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    }
    get reports() {
        return this._reports;
    }
}
