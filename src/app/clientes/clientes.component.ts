import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../providers/cliente.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-clientes',
    templateUrl: './clientes.component.html',
    styleUrls: [
        './clientes.component.css',
        '../../assets/css/theme-default/bootstrap.css',
        '../../assets/css/theme-default/materialadmin.css',
        '../../assets/css/theme-default/font-awesome.min.css',
        '../../assets/css/theme-default/material-design-iconic-font.min.css'
    ]
})
export class ClientesComponent implements OnInit {

    client: any;
    idAdministrador: any;

    constructor(
        private route: ActivatedRoute,
        public clienteService: ClienteService,
        public router: Router
    ) { }

    ngOnInit() {
        this.idAdministrador = this.route.snapshot.paramMap.get('id');
        this.clienteService.getAllClient({ token: localStorage.getItem('token'), user: 'root', id: this.idAdministrador }).then((response) => {
            if (response['status']) {
                this.client = response['data'];
            }
        })
    }

}
