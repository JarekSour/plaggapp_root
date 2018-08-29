import { Component, OnInit } from '@angular/core';
import 'assets/js/libs/jquery/jquery-migrate-1.2.1.min.js';
import 'assets/js/libs/bootstrap/bootstrap.min.js';
import 'assets/js/libs/spin.js/spin.min.js';
import 'assets/js/libs/autosize/jquery.autosize.min.js';
import 'assets/js/core/source/App.js';
import 'assets/js/core/source/AppNavigation.js';
import 'assets/js/core/source/AppOffcanvas.js';
import 'assets/js/core/source/AppCard.js';
import 'assets/js/core/source/AppForm.js';
import 'assets/js/core/source/AppNavSearch.js';
import 'assets/js/core/source/AppVendor.js';
import { Router } from '@angular/router';
import { ParametroService } from '../providers/parametro.service';
import { AuthService } from '../providers/auth.service';
import { IMyDrpOptions } from 'mydaterangepicker';
import { ClienteService } from '../providers/cliente.service';

@Component({
    selector: 'app-informes',
    templateUrl: './informes.component.html',
    styleUrls: [
        './informes.component.css',
        '../../assets/css/theme-default/bootstrap.css',
        '../../assets/css/theme-default/materialadmin.css',
        '../../assets/css/theme-default/font-awesome.min.css',
        '../../assets/css/theme-default/material-design-iconic-font.min.css'
    ]
})
export class InformesComponent implements OnInit {

    //bar chart
    public barChartOptions: any = {
        scaleShowVerticalLines: false,
        responsive: true,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    };
    public trampaChartLabels: Array<any> = [];
    public ceboChartLabels: Array<any> = [];
    public venenoChartLabels: Array<any> = [];
    public consumoChartLabels: Array<any> = [];
    public cambiosChartLabels: Array<any> = [];
    public barChartType: string = 'bar';
    public barChartLegend: boolean = false;
    public pieChartLegend: boolean = true;
    public trampaChartData: any[] = [
        { data: [], label: 'Trampas' }
    ];
    public cebosChartData: any[] = [
        { data: [], label: 'Cebos' }
    ];
    public venenoChartData: any[] = [
        { data: [], label: 'Aplicaciones' }
    ];
    public consumoChartData: any[] = [
        { data: [], label: 'Consumo' }
    ];
    public cambiosChartData: any[] = [
        { data: [], label: 'Cambios' }
    ];

    // Pie
    public tecnicosChartLabels: Array<any> = [];
    public tecnicosChartData: Array<any> = [];
    public clientesChartLabels: Array<any> = [];
    public clientesChartData: Array<any> = [];
    public pieChartType: string = 'pie';

    public myDateRangePickerOptions: IMyDrpOptions = {
        dateFormat: 'dd/mm/yyyy',
        dayLabels: { su: 'Dom', mo: 'Lun', tu: 'Mar', we: 'Mie', th: 'Jue', fr: 'Vie', sa: 'Sab' },
        monthLabels: { 1: 'Ene', 2: 'Feb', 3: 'Mar', 4: 'Abr', 5: 'May', 6: 'Jun', 7: 'Jul', 8: 'Ago', 9: 'Sep', 10: 'Oct', 11: 'Nov', 12: 'Dic' },
        selectBeginDateTxt: 'Selecciona fecha de inicio',
        selectEndDateTxt: 'Selecciona fecha de termino',
        showClearDateRangeBtn: false,
        indicateInvalidDateRange: true
    };
    public model: any = {};

    first5: boolean;
    second5: boolean;
    third5: boolean;
    fourth5: boolean;
    fiveth5: boolean;
    sixth: boolean;
    seventh: boolean;

    clientList: any;
    cambo: any;

    constructor(
        public clientService: ClienteService,
        public authService: AuthService,
        public parametroService: ParametroService,
        public router: Router
    ) {
        var myDate = new Date()
        myDate.setDate(myDate.getDate() - 30)

        this.model = {
            beginDate: { year: myDate.getFullYear(), month: myDate.getMonth() + 1, day: myDate.getDate() },
            endDate: { year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate() }
        }
    }

    ngOnInit() {
        if (!this.authService.islogged())
            this.router.navigate(['/login']);

        this.first5 = true;

        this.btnSearch();
    }

    selectTab(e) {
        switch (e) {
            case 'first5':
                this.first5 = true;
                this.second5 = false;
                this.third5 = false;
                this.fourth5 = false;
                this.fiveth5 = false;
                this.sixth = false;
                this.seventh = false;
                break;
            case 'second5':
                this.first5 = false;
                this.second5 = true;
                this.third5 = false;
                this.fourth5 = false;
                this.fiveth5 = false;
                this.sixth = false;
                this.seventh = false;
                break;
            case 'third5':
                this.first5 = false;
                this.second5 = false;
                this.third5 = true;
                this.fourth5 = false;
                this.fiveth5 = false;
                this.sixth = false;
                this.seventh = false;
                break;
            case 'fourth5':
                this.first5 = false;
                this.second5 = false;
                this.third5 = false;
                this.fourth5 = true;
                this.fiveth5 = false;
                this.sixth = false;
                this.seventh = false;
                break;
            case 'fiveth5':
                this.first5 = false;
                this.second5 = false;
                this.third5 = false;
                this.fourth5 = false;
                this.fiveth5 = true;
                this.sixth = false;
                this.seventh = false;
                break;
            case 'sixth':
                this.first5 = false;
                this.second5 = false;
                this.third5 = false;
                this.fourth5 = false;
                this.fiveth5 = false;
                this.sixth = true;
                this.seventh = false;
                break;
            case 'seventh':
                this.first5 = false;
                this.second5 = false;
                this.third5 = false;
                this.fourth5 = false;
                this.fiveth5 = false;
                this.sixth = false;
                this.seventh = true;
                break;
            default:
                break;
        };
    }

    btnSearch() {
        let init = this.model.beginDate.year + '-' + this.model.beginDate.month + '-' + this.model.beginDate.day;
        let fini = this.model.endDate.year + '-' + this.model.endDate.month + '-' + this.model.endDate.day;
        // this.parametroService.informe({ token: localStorage.getItem('token'), init: init, fini: fini }).then((response) => {
        //     if (response['status']) {

        //         this.trampaChartLabels.length = 0;
        //         this.ceboChartLabels.length = 0;
        //         this.venenoChartLabels.length = 0;
        //         this.tecnicosChartLabels.length = 0;
        //         this.clientesChartLabels.length = 0;
        //         this.consumoChartLabels.length = 0;

        //         let trampasUsadas = response['trampasUsadas'];
        //         let auxTrampaData = [];

        //         for (let item of trampasUsadas) {
        //             this.trampaChartLabels.push(item.trampa);
        //             auxTrampaData.push(item.count);
        //         }
        //         let _trampaChartData: Array<any> = new Array(10);
        //         _trampaChartData[0] = { data: auxTrampaData, label: this.trampaChartData[0].label };
        //         this.trampaChartData = _trampaChartData;
        //         /////////////////////////////////////////////////////////////////////////////////////////////////////////
        //         let cebosUsados = response['cebosUsados'];
        //         let auxCeboData = [];
        //         for (let item of cebosUsados) {
        //             this.ceboChartLabels.push(item.cebo);
        //             auxCeboData.push(item.count);
        //         }

        //         let _ceboChartData: Array<any> = new Array(10);
        //         _ceboChartData[0] = { data: auxCeboData, label: this.cebosChartData[0].label };
        //         this.cebosChartData = _ceboChartData;

        //         /////////////////////////////////////////////////////////////////////////////////////////////////////////
        //         let venenosUsados = response['venenosUsados'];
        //         let auxVenenoData = [];
        //         for (let item of venenosUsados) {
        //             this.venenoChartLabels.push(item.veneno);
        //             auxVenenoData.push(item.count);
        //         }

        //         let _venenoChartData: Array<any> = new Array(10);
        //         _venenoChartData[0] = { data: auxVenenoData, label: this.venenoChartData[0].label };
        //         this.venenoChartData = _venenoChartData;

        //         /////////////////////////////////////////////////////////////////////////////////////////////////////////
        //         let tecnicos = response['tecnicos'];
        //         let auxTecnicos = [];
        //         let sumT = 0;
        //         for (let i = 0; i < tecnicos.length; i++) {
        //             if (i > 3) {
        //                 sumT += tecnicos[i].count
        //             } else {
        //                 this.tecnicosChartLabels.push(tecnicos[i].nombre + ' ' + tecnicos[i].apellido_paterno)
        //                 auxTecnicos.push(tecnicos[i].count)
        //             }
        //         }
        //         if (sumT > 0) {
        //             this.tecnicosChartLabels.push('Otros')
        //             auxTecnicos.push(sumT)
        //         }
        //         this.tecnicosChartData = auxTecnicos;

        //         /////////////////////////////////////////////////////////////////////////////////////////////////////////
        //         let clientes = response['clientes']
        //         let auxClientes = [];
        //         let sumC = 0;
        //         for (let i = 0; i < clientes.length; i++) {
        //             if (i > 3) {
        //                 sumC += clientes[i].count
        //             } else {
        //                 this.clientesChartLabels.push(clientes[i].nombre_empresa)
        //                 auxClientes.push(clientes[i].count)
        //             }
        //         }
        //         if (sumC > 0) {
        //             this.clientesChartLabels.push('Otros')
        //             auxClientes.push(sumT)
        //         }
        //         this.clientesChartData = auxClientes;

        //         /////////////////////////////////////////////////////////////////////////////////////////////////////////
        //         let consumoUsadas = response['consumo'];
        //         let auxConsumoData = [];

        //         for (let item of consumoUsadas) {
        //             this.consumoChartLabels.push(item.nombre_empresa);
        //             auxConsumoData.push(item.count);
        //         }
        //         let _consumoChartData: Array<any> = new Array(10);
        //         _consumoChartData[0] = { data: auxConsumoData, label: this.consumoChartData[0].label };
        //         this.consumoChartData = _consumoChartData;

        //         /////////////////////////////////////////////////////////////////////////////////////////////////////////
        //         this.cambo = response['cambios']
        //     }

        //     this.clientService.getAllClient({ token: localStorage.getItem('token') }).then((response) => {
        //         this.clientList = response['data'];
        //     })
        // })
    }

    changeCliente(e) {
        this.cambiosChartLabels.length = 0;
        let cambiosUsadas = this.cambo.filter(i => i.id_cliente == e.target.value);
        let auxCambiosData = [];

        for (let item of cambiosUsadas) {
            this.cambiosChartLabels.push(item.nombre);
            auxCambiosData.push(item.count);
        }
        let _cambiosChartData: Array<any> = new Array();
        _cambiosChartData[0] = { data: auxCambiosData, label: this.cambiosChartData[0].label };
        this.cambiosChartData = _cambiosChartData;
    }

}
