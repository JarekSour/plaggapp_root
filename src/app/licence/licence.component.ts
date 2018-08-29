import { Component, OnInit } from '@angular/core';
import { LicenceService } from '../providers/licence.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-licence',
    templateUrl: './licence.component.html',
    styleUrls: ['./licence.component.css',
        '../../assets/css/theme-default/bootstrap.css',
        '../../assets/css/theme-default/materialadmin.css',
        '../../assets/css/theme-default/font-awesome.min.css',
        '../../assets/css/theme-default/material-design-iconic-font.min.css']
})
export class LicenceComponent implements OnInit {

    cardLicence: boolean;
    ifLoading: boolean;
    json = {
        token: localStorage.getItem('token'), user: 'root',
        nombre: '', max_device: 0
    }
    licencias = [];

    constructor(
        private toastr: ToastrService,
        public licenceService: LicenceService
    ) {
        this.cardLicence = false;
    }

    ngOnInit() {
        this.licenceService.getAllLicence(this.json).then((response) => {
            if (response['status'])
                this.licencias = response['data']
        })
    }

    newLicence() {
        if (this.json.max_device < 1) {
            this.toastr.error('', 'El número de dispositivos debe ser mayor a 0', {
                closeButton: true,
                positionClass: 'toast-bottom-right',
                timeOut: 6000,
                extendedTimeOut: 3000
            });
        } else {
            this.ifLoading = true;
            this.licenceService.newLicence(this.json).then((response) => {
                if (response['status']) {
                    this.toastr.success('', 'La licencia ha sido creada!', {
                        closeButton: true,
                        positionClass: 'toast-bottom-right',
                        timeOut: 6000,
                        extendedTimeOut: 3000
                    });

                    this.ifLoading = false;
                    this.cardLicence = false;
                    this.licencias.push({ id: response['id'], key: response['key'], nombre: this.json.nombre, max_device: this.json.max_device });
                    this.json.nombre = '';
                    this.json.max_device = 0;
                }
            })
        }
    }

    copyClipboard(key) {
        var input = document.createElement("input");
        input.setAttribute('type', 'text');
        input.value = key;
        document.body.appendChild(input);
        input.select();
        document.execCommand("Copy");
        input.remove();
    }

    showCardNewLicence() {
        this.cardLicence = true;
    }

}
