import { Component, OnInit } from '@angular/core';
import { AdminService } from '../providers/admin.service';
import { TecnicoService } from '../providers/tecnico.service';
import { OrdenService } from '../providers/orden.service';
import { ClienteService } from '../providers/cliente.service';
import { IDayCalendarConfig } from 'ng2-date-picker';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-new-orden',
    templateUrl: './new-orden.component.html',
    styleUrls: ['./new-orden.component.css',
        '../../assets/css/theme-default/bootstrap.css',
        '../../assets/css/theme-default/materialadmin.css',
        '../../assets/css/theme-default/font-awesome.min.css',
        '../../assets/css/theme-default/material-design-iconic-font.min.css']
})
export class NewOrdenComponent implements OnInit {

    idAdministrador: any;
    servicios = { desinsectado: false, desratizado: false, sanitizado: false, tuv: false, control: false };
    orden = { token: localStorage.getItem('token'), user: 'root', id: '', fecha: '', tecnico: '', cliente: '', servicios: '' }
    config: IDayCalendarConfig = {
        locale: 'es',
        firstDayOfWeek: 'mo',
        format: 'DD/MM/YYYY',
        min: ''
    }
    tech: any;
    client: any;
    ifLoading: any;

    constructor(
        private route: ActivatedRoute,
        private toastr: ToastrService,
        public router: Router,
        public techService: TecnicoService,
        public ordenService: OrdenService,
        public clientService: ClienteService
    ) { }

    ngOnInit() {
        this.idAdministrador = this.route.snapshot.paramMap.get('idadmin');
        let date = new Date();
        this.orden.fecha = ("0" + date.getDate()).slice(-2) + '/' + ("0" + (date.getMonth() + 1)).slice(-2) + '/' + date.getFullYear();
        this.config.min = this.orden.fecha;

        this.techService.getAllTech({ token: localStorage.getItem('token'), user: 'root', id: this.idAdministrador }).then((response) => {
            if (response['status'])
                this.tech = response['data'];
        })

        this.clientService.getAllClient({ token: localStorage.getItem('token'), user: 'root', id: this.idAdministrador }).then((response) => {
            if (response['status'])
                this.client = response['data'];
        })
    }

    changeControl() {
        this.servicios.control = !this.servicios.control;
    }
    changeTuv() {
        this.servicios.tuv = !this.servicios.tuv;
    }
    changeSanitizaado() {
        this.servicios.sanitizado = !this.servicios.sanitizado;
    }
    changeDesratizado() {
        this.servicios.desratizado = !this.servicios.desratizado;
    }
    changeDesinsectado() {
        this.servicios.desinsectado = !this.servicios.desinsectado;
    }

    newOrden() {
        let aux = [];
        if (this.servicios.control == true)
            aux.push('Control paloma');
        if (this.servicios.tuv == true)
            aux.push('Tuv');
        if (this.servicios.sanitizado == true)
            aux.push('Sanitizado');
        if (this.servicios.desratizado == true)
            aux.push('Desratizado');
        if (this.servicios.desinsectado == true)
            aux.push('Desinsectado');

        if (aux.length < 1) {
            this.toastr.error('', 'Debes elegir al menos un tipo de servicio', {
                closeButton: true,
                positionClass: 'toast-bottom-right',
                timeOut: 6000,
                extendedTimeOut: 3000
            });
        } else {
            this.orden.servicios = aux.join(', ');

            this.ifLoading = true;
            this.orden.id = this.idAdministrador;
            this.ordenService.newOrden(this.orden).then((response) => {
                if (response['status']) {
                    this.toastr.success('', 'La orden fue creada exitosamente!', {
                        closeButton: true,
                        positionClass: 'toast-bottom-right',
                        timeOut: 6000,
                        extendedTimeOut: 3000
                    });
                    this.router.navigate(['/agendamiento', this.idAdministrador]);
                } else {
                    this.toastr.error('', 'Ups!, ocurrio un error', {
                        closeButton: true,
                        positionClass: 'toast-bottom-right',
                        timeOut: 6000,
                        extendedTimeOut: 3000
                    });
                }
                this.ifLoading = false;
            })
        }
    }

}
