import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
import { TecnicoService } from '../providers/tecnico.service';
import { ClienteService } from '../providers/cliente.service';
import { OrdenService } from '../providers/orden.service';

@Component({
    selector: 'app-list-orden-by',
    templateUrl: './list-orden-by.component.html',
    styleUrls: [
        './list-orden-by.component.css',
        '../../assets/css/theme-default/bootstrap.css',
        '../../assets/css/theme-default/materialadmin.css',
        '../../assets/css/theme-default/font-awesome.min.css',
        '../../assets/css/theme-default/material-design-iconic-font.min.css'
    ]
})
export class ListOrdenByComponent implements OnInit {

    p: number = 1;
    tipo: any;
    ordenes: any;
    idAdministrador: any;

    constructor(
        public ordenService: OrdenService,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.idAdministrador = this.route.snapshot.paramMap.get('idadmin');
        let id = this.route.snapshot.paramMap.get('id');
        let tipo = this.route.snapshot.paramMap.get('tipo');

        if (tipo == 'cliente') {
            this.tipo = 'cliente';
            this.ordenService.getOrderByClien({ token: localStorage.getItem('token'), user: 'root', idadmin: this.idAdministrador, idclient: id }).then((response) => {
                this.ordenes = response['data'];
            })
        } else {
            this.tipo = 'técnico';
            this.ordenService.getOrderByTech({ token: localStorage.getItem('token'), user: 'root', idadmin: this.idAdministrador, idtech: id }).then((response) => {
                this.ordenes = response['data'];
            })
        }
    }

    toDetail(item, type) {
        this.router.navigate(['/detalle', this.idAdministrador, this.tipo, item['id']]);
    }

}
