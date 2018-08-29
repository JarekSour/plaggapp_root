import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AuthService } from '../providers/auth.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { OrdenService } from '../providers/orden.service';
import { ExcelService } from '../providers/excel.service';
import { ResponseOptions } from '@angular/http/src/base_response_options';
import { PuntoService } from '../providers/punto.service';

@Component({
    selector: 'app-show-punto',
    templateUrl: './show-punto.component.html',
    styleUrls: [
        './show-punto.component.css',
        '../../assets/css/theme-default/bootstrap.css',
        '../../assets/css/theme-default/materialadmin.css',
        '../../assets/css/theme-default/font-awesome.min.css',
        '../../assets/css/theme-default/material-design-iconic-font.min.css'
    ]
})
export class ShowPuntoComponent implements OnInit {

    tipo: any;
    id: any;
    idAdministrador: any;
    puntos: any;
    modal: boolean;
    image: any;

    constructor(
        private location: Location,
        public puntoService: PuntoService,
        public excelService: ExcelService,
        public authService: AuthService,
        public ordenService: OrdenService,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.id = this.route.snapshot.paramMap.get('id');
        this.idAdministrador = this.route.snapshot.paramMap.get('id');
        this.tipo = this.route.snapshot.paramMap.get('tipo');

        this.puntoService.getInfoPunto({ token: localStorage.getItem('token'), user: 'admin', id: this.id }).then((response) => {
            if (response['status']) {
                this.puntos = response['puntos'];

                for (let item of this.puntos) {

                    if (item['actividad'] != null) {
                        let actividad = JSON.parse(item['actividad']);
                        let act = '';
                        for (let i of actividad) {
                            let subcategoria = i['subcategoria'] ? i['subcategoria'] : '';
                            let pregunta = i['pregunta'] ? i['pregunta'] + ':' : '';
                            let respuesta = i['answer'] ? i['answer'] : '';

                            act += subcategoria + '<br>' + pregunta + ' ' + respuesta + '<br>';
                        }
                        item['activity'] = act;
                    } else {
                        item['activity'] = '---';
                    }
                }
            }
        })
    }

    toExcel() {
        this.excelService.exportAsExcelFile(this.puntos, 'Puntos');
    }

    openModal(id) {
        this.image = false;
        this.puntoService.getImagePunto({ token: localStorage.getItem('token'), user: 'root', id: id }).then((response) => {
            if (response['status']) {
                this.image = response['image']['foto'];
            }
        })
        this.modal = true;
    }

    dismissModal() {
        this.modal = false;
    }

    checkTime(time) {
        var d930 = new Date(2010, 12, 21, time.split(':')[0], time.split(':')[1], time.split(':')[2], 0);
        var d931 = new Date(2010, 12, 21, 0, 4, 0, 0);
        var t930 = d930.getTime();
        var t931 = d931.getTime();

        if (t930 >= t931)
            return true
        else
            return false
    }

    toLeft() {
        $('#myTable').animate({ scrollLeft: '-=800' }, 1000);
    }

    toRight() {
        $('#myTable').animate({ scrollLeft: '+=800' }, 1000);
    }
}
