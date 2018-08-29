import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AuthService } from '../providers/auth.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { PuntoService } from '../providers/punto.service';

@Component({
    selector: 'app-mapa',
    templateUrl: './mapa.component.html',
    styleUrls: ['./mapa.component.css',
        '../../assets/css/theme-default/bootstrap.css',
        '../../assets/css/theme-default/materialadmin.css',
        '../../assets/css/theme-default/font-awesome.min.css',
        '../../assets/css/theme-default/material-design-iconic-font.min.css']
})
export class MapaComponent implements OnInit {

    tipo: any;
    id: any;
    idAdministrador: any;
    lat: number;
    lng: number;
    zoom: number = 20;
    maxZoom: number = 22;
    mapTypeId: string = 'satellite';
    streetViewControl: boolean = false;
    markers = [];
    icon: string = 'https://i.imgur.com/pOHoEQ4.png';

    constructor(
        public puntoService: PuntoService,
        private location: Location,
        public router: Router,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {

        this.id = this.route.snapshot.paramMap.get('id');
        this.idAdministrador = this.route.snapshot.paramMap.get('id');
        this.tipo = this.route.snapshot.paramMap.get('tipo');

        this.puntoService.getCoordenadas({ token: localStorage.getItem('token'), user: 'root', id: this.id }).then((response) => {
            for (let item of response['puntos']) {
                this.lat = parseFloat(item['mapa'].split(',')[0]);
                this.lng = parseFloat(item['mapa'].split(',')[1]);
                this.markers.push({ lat: parseFloat(item['mapa'].split(',')[0]), lng: parseFloat(item['mapa'].split(',')[1]) })
            }
        })
    }
}
