import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable()
export class ExcelService {

    constructor() { }

    public exportAsExcelFile(json: any[], excelFileName: string): void {
        let aux = [];
        for (let item of json)
            aux.push({
                PUNTO: item.nombre, 'TRAMPA / APLICACIÓN': item.trampa ? item.trampa : item.veneno, SECTOR: item.sector, PREGUNTA: item.activity.replace(/<br\s*\/?>/gi,'\r\n'), CEBO: item.cebo, ISP: item.isp,
                CONCENTRACIÓN: item.concentracion, DOSIS: item.dosis, SUPERFICIE: item.superficie, TIEMPO: item.tiempo, COMENTARIO: item.comentario
            })
        const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(aux);
        const workbook: XLSX.WorkBook = { Sheets: { 'Puntos': worksheet }, SheetNames: ['Puntos'] };
        const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
        this.saveAsExcelFile(excelBuffer, excelFileName);
    }

    private saveAsExcelFile(buffer: any, fileName: string): void {
        const data: Blob = new Blob([buffer], {
            type: EXCEL_TYPE
        });
        FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    }

}
