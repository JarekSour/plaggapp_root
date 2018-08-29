import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ParametroService } from '../providers/parametro.service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

const complete_trampa = [
    'Jaula de captura viva', 'Lámpara TUV', 'Portacebo', 'PORTACEBO con Trampa Pegajosa'
];
const complete_sector = [
    'Perímetro exterior', 'Perímetro interior estructura', 'Oficinas', 'Baños', 'Packing'
];

@Component({
    selector: 'app-parametros',
    templateUrl: './parametros.component.html',
    styleUrls: ['./parametros.component.css',
        '../../assets/css/theme-default/bootstrap.css',
        '../../assets/css/theme-default/materialadmin.css',
        '../../assets/css/theme-default/font-awesome.min.css',
        '../../assets/css/theme-default/material-design-iconic-font.min.css']
})
export class ParametrosComponent implements OnInit {

    idAdministrador: any;
    trampa: boolean;
    cebo: boolean;
    veneno: boolean;
    instalacion: boolean;

    paramTrampa = { nombre: '', revision: '' }
    paramVeneno = { categoria: '', isp: '', formulacion: '', concentracion: '', dosis: '' }
    paramCebo = { categoria: '', marca: '', formulacion: '', isp: '', concentracion: '', dosis: '', superficie: '' }
    subCategoria = { token: localStorage.getItem('token'), user: 'root', id: '', categoria: '', subcategoria: '', pregunta: '', checkbox: false, respuesta: '' }
    subAplicacion = { token: localStorage.getItem('token'), user: 'root', nombre: '', id: '' }

    jsonParametro = { veneno: '', instalacion: '', categoria: '' }
    jsonTrampa: any;
    jsonCebo: any;
    jsonVeneno: any;
    jsonInstalacion: any;
    jsonSubCategoria = [];
    jsonSubAplicacion = [];
    ifSubcategoria: boolean;

    search_trampa = (text$: Observable<string>) =>
        text$.debounceTime(200).distinctUntilChanged().map(term => term.length < 2 ? [] : complete_trampa.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10));

    search_sector = (text$: Observable<string>) =>
        text$.debounceTime(200).distinctUntilChanged().map(term => term.length < 2 ? [] : complete_sector.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10));

    constructor(
        private toastr: ToastrService,
        private router: Router,
        private route: ActivatedRoute,
        public parametroService: ParametroService
    ) {
        this.trampa = true;
        this.cebo = false;
        this.veneno = false;
        this.instalacion = false;
    }

    ngOnInit() {
        this.idAdministrador = this.route.snapshot.paramMap.get('id');

        this.parametroService.listTrampas({ token: localStorage.getItem('token'), user: 'root', id: this.idAdministrador }).then((response) => {
            if (response['status'])
                this.jsonTrampa = response['data']
        })
        this.parametroService.listCebos({ token: localStorage.getItem('token'), user: 'root', id: this.idAdministrador }).then((response) => {
            if (response['status'])
                this.jsonCebo = response['data']
        })
        this.parametroService.listVenenos({ token: localStorage.getItem('token'), user: 'root', id: this.idAdministrador }).then((response) => {
            if (response['status'])
                this.jsonVeneno = response['data']
        })
        this.parametroService.listInstalaciones({ token: localStorage.getItem('token'), user: 'root', id: this.idAdministrador }).then((response) => {
            if (response['status'])
                this.jsonInstalacion = response['data']
        })
        this.parametroService.listSubAplicaciones({ token: localStorage.getItem('token'), user: 'root', id: this.idAdministrador }).then((response) => {
            if (response['status'])
                this.jsonSubAplicacion = response['data']
        })
    }

    eventProp(num) {
        switch (num) {
            case 1:
                this.trampa = true;
                this.cebo = false;
                this.veneno = false;
                this.instalacion = false;
                break;
            case 2:
                this.trampa = false;
                this.cebo = true;
                this.veneno = false
                this.instalacion = false;
                break;
            case 3:
                this.trampa = false;
                this.cebo = false;
                this.veneno = true
                this.instalacion = false;
                break;
            case 4:
                this.trampa = false;
                this.cebo = false;
                this.veneno = false
                this.instalacion = true;
                break;
        }
    }

    showSubCategoria(sub) {
        this.jsonSubCategoria = [];
        this.ifSubcategoria = true;
        this.subCategoria.categoria = sub;
        this.parametroService.listSubcategoria({ token: localStorage.getItem('token'), user: 'root', id: this.idAdministrador, categoria: sub }).then((response) => {
            if (response['status'])
                this.jsonSubCategoria = response['subcategoria'];
        })
    }

    newTrampa() {
        this.parametroService.newTrampa({ token: localStorage.getItem('token'), user: 'root', id: this.idAdministrador, nombre: this.paramTrampa.nombre, revision: this.paramTrampa.revision }).then((response) => {
            if (response['status']) {
                this.jsonTrampa.push({ id: response['id'], nombre: this.paramTrampa.nombre });
                this.paramTrampa.nombre = '';
                this.paramTrampa.revision = '';
            } else {
                if (response['error'] == 'exist') {
                    this.toastr.error('', 'La trampa ya existe', {
                        closeButton: true,
                        positionClass: 'toast-bottom-right',
                        timeOut: 6000,
                        extendedTimeOut: 3000
                    });
                }
            }
        })
    }

    newSubCategoria() {
        this.subCategoria.id = this.idAdministrador;
        this.parametroService.newSubCategoria(this.subCategoria).then((response) => {
            if (response['status']) {
                this.jsonSubCategoria.push({
                    id: response['id'], categoria: this.subCategoria.categoria, subcategoria: this.subCategoria.subcategoria,
                    pregunta: this.subCategoria.pregunta == '' ? '---' : this.subCategoria.pregunta,
                    respuesta: this.subCategoria.respuesta
                });
                this.subCategoria.subcategoria = '';
                this.subCategoria.checkbox = false;
                this.subCategoria.pregunta = '';
            } else if (response['error'] == 'exist') {
                this.toastr.error('', 'La sub-categoría ya existe', {
                    closeButton: true,
                    positionClass: 'toast-bottom-right',
                    timeOut: 6000,
                    extendedTimeOut: 3000
                });
            }
        })
    }

    newCebo() {
        this.parametroService.newCebo({ token: localStorage.getItem('token'), user: 'root', id: this.idAdministrador, cebo: this.paramCebo }).then((response) => {
            if (response['status']) {
                this.jsonCebo.push({
                    id: response['id'], marca: this.paramCebo.marca, formulacion: this.paramCebo.formulacion,
                    isp: this.paramCebo.isp, concentracion: this.paramCebo.concentracion, dosis: this.paramCebo.dosis,
                    superficie: this.paramCebo.superficie, categoria: this.paramCebo.categoria
                });
                this.paramCebo.marca = '';
                this.paramCebo.concentracion = '';
                this.paramCebo.dosis = '';
                this.paramCebo.formulacion = '';
                this.paramCebo.isp = '';
                this.paramCebo.superficie = '';
            }
        })
    }

    newSubAplicacion() {
        this.subAplicacion.id = this.idAdministrador;
        this.parametroService.newSubAplicacion(this.subAplicacion).then((response) => {
            if (response['status']) {
                this.jsonSubAplicacion.push({ id: response['id'], nombre: this.subAplicacion.nombre });
                this.subAplicacion.nombre = '';
            } else if (response['error'] == 'exist') {
                this.toastr.error('', 'La categoría ya existe', {
                    closeButton: true,
                    positionClass: 'toast-bottom-right',
                    timeOut: 6000,
                    extendedTimeOut: 3000
                });
            }
        })
    }

    newVeneno() {
        this.parametroService.newVeneno({
            token: localStorage.getItem('token'), user: 'root', id: this.idAdministrador, nombre: this.jsonParametro.veneno,
            categoria: this.paramVeneno.categoria, isp: this.paramVeneno.isp, formulacion: this.paramVeneno.formulacion, concentracion: this.paramVeneno.concentracion, dosis: this.paramVeneno.dosis
        }).then((response) => {
            if (response['status']) {
                this.jsonVeneno.push({
                    id: response['id'], nombre: this.jsonParametro.veneno, categoria: this.paramVeneno.categoria, isp: this.paramVeneno.isp, formulacion: this.paramVeneno.formulacion,
                    concentracion: this.paramVeneno.concentracion, dosis: this.paramVeneno.dosis
                });
                this.jsonParametro.veneno = '';
                this.paramVeneno.categoria = '';
                this.paramVeneno.isp = '';
                this.paramVeneno.formulacion = '';
                this.paramVeneno.concentracion = '';
                this.paramVeneno.dosis = '';
            }
        })
    }

    newInstalacion() {
        this.parametroService.newInstalacion({ token: localStorage.getItem('token'), user: 'root', id: this.idAdministrador, nombre: this.jsonParametro.instalacion }).then((response) => {
            if (response['status']) {
                this.jsonInstalacion.push({ id: response['id'], nombre: this.jsonParametro.instalacion });
                this.jsonParametro.instalacion = '';
            } else {
                if (response['error'] == 'exist') {
                    this.toastr.error('', 'La instalación ya existe', {
                        closeButton: true,
                        positionClass: 'toast-bottom-right',
                        timeOut: 6000,
                        extendedTimeOut: 3000
                    });
                }
            }
        })
    }

    deleteTrampa(id, nombre) {
        this.parametroService.deleteTrampa({ token: localStorage.getItem('token'), user: 'root', id_admin: this.idAdministrador, id: id }).then((response) => {
            this.jsonTrampa = this.jsonTrampa.filter(item => item.id !== id);
            if (nombre == this.subCategoria.categoria) {
                this.ifSubcategoria = false;
            }
        })
    }

    deleteSubCategoria(id) {
        this.parametroService.deleteSubCategoria({ token: localStorage.getItem('token'), user: 'root', id_admin: this.idAdministrador, id: id }).then((response) => {
            this.jsonSubCategoria = this.jsonSubCategoria.filter(item => item.id !== id);
        })
    }

    deleteCebo(id) {
        this.parametroService.deleteCebo({ token: localStorage.getItem('token'), user: 'root', id_admin: this.idAdministrador, id: id }).then((response) => {
            this.jsonCebo = this.jsonCebo.filter(item => item.id !== id);
        })
    }

    deleteSubAplicacion(id) {
        this.parametroService.deleteSubAplicacion({ token: localStorage.getItem('token'), user: 'root', id_admin: this.idAdministrador, id: id }).then((response) => {
            this.jsonSubAplicacion = this.jsonSubAplicacion.filter(item => item.id !== id);
        })
    }

    deleteVeneno(id) {
        this.parametroService.deleteVeneno({ token: localStorage.getItem('token'), user: 'root', id_admin: this.idAdministrador, id: id }).then((response) => {
            this.jsonVeneno = this.jsonVeneno.filter(item => item.id !== id);
        })
    }

    deleteInstalacion(id) {
        this.parametroService.deleteInstalacion({ token: localStorage.getItem('token'), user: 'root', id_admin: this.idAdministrador, id: id }).then((response) => {
            this.jsonInstalacion = this.jsonInstalacion.filter(item => item.id !== id);
        })
    }

    checkCheckbox(e) {
        if (e.target.checked)
            this.subCategoria.checkbox = true;
        else
            this.subCategoria.checkbox = false;
    }
}
