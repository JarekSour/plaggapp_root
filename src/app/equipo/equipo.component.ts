import { Component, OnInit, ViewChild } from '@angular/core';
import { TecnicoService } from '../providers/tecnico.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ImageCropperComponent, CropperSettings } from 'ng2-img-cropper';
import { ToastrService } from 'ngx-toastr';
import { DocumentoService } from '../providers/documento.service';

@Component({
    selector: 'app-equipo',
    templateUrl: './equipo.component.html',
    styleUrls: [
        './equipo.component.css',
        '../../assets/css/theme-default/bootstrap.css',
        '../../assets/css/theme-default/materialadmin.css',
        '../../assets/css/theme-default/font-awesome.min.css',
        '../../assets/css/theme-default/material-design-iconic-font.min.css'
    ]
})
export class EquipoComponent implements OnInit {

    idAdministrador: any;
    tech: any;

    @ViewChild('cropper', undefined) cropper: ImageCropperComponent;
    cropperSettings: CropperSettings;
    data: any;
    auxFirma: any;

    existFirmaJefe: boolean;
    divFirmaJefe: boolean;
    bloqueTexto: boolean;
    btnCrop: boolean;
    btnAdd: boolean;
    image: boolean;
    dvCrop: boolean;

    constructor(
        public documentoService: DocumentoService,
        private route: ActivatedRoute,
        private toastr: ToastrService,
        public tecnicoService: TecnicoService,
        public router: Router
    ) {
        this.cropperSettings = new CropperSettings();
        this.cropperSettings.noFileInput = true;
        this.cropperSettings.canvasWidth = 200;
        this.cropperSettings.canvasHeight = 200;
        this.cropperSettings.croppedWidth = 200;
        this.cropperSettings.croppedHeight = 200;
        this.data = { image: '' };
    }

    ngOnInit() {
        this.idAdministrador = this.route.snapshot.paramMap.get('id');
        this.tecnicoService.getAllTech({ token: localStorage.getItem('token'), user: 'root', id: this.idAdministrador }).then((response) => {
            if (response['status']) {
                this.tech = response['data'];
            }
        })

        this.documentoService.getFirmaJefe({ token: localStorage.getItem('token'), user: 'root', id: this.idAdministrador }).then((response) => {
            if (response['status']) {
                if (response['firma'] == null) {
                    this.bloqueTexto = true;
                    this.existFirmaJefe = false;
                    this.image = false;
                } else {
                    this.data.image = response['firma']['firma'];
                    this.auxFirma = response['firma']['firma'];
                    this.bloqueTexto = false;
                    this.existFirmaJefe = true;
                    this.image = true;
                }
            }
        })
    }

    showFirmaJefe() {
        this.divFirmaJefe = true;
    }

    hideFirmaJefe() {
        this.divFirmaJefe = false;
        this.btnAdd = false;
        this.btnCrop = false;
        this.dvCrop = false;

        if (!this.existFirmaJefe) {
            this.image = false;
            this.bloqueTexto = true;
        } else {
            this.bloqueTexto = false;
            this.data.image = this.auxFirma;
        }
    }

    updateFirma(e) {
        var file: File = e.target.files[0];
        if (e.target.files.length > 0) {
            this.btnCrop = true;
            this.btnAdd = true;
            this.bloqueTexto = false;
            this.dvCrop = true;
            this.image = true;
            var image: any = new Image();
            var myReader: FileReader = new FileReader();
            var that = this;
            myReader.onloadend = (loadEvent: any) => {
                image.src = loadEvent.target.result;
                that.cropper.setImage(image);
            };
            myReader.readAsDataURL(file);
        }
    }

    hideCrop() {
        this.btnCrop = false;
        this.btnAdd = false;
        this.dvCrop = false;

        if (!this.existFirmaJefe) {
            this.image = false;
            this.bloqueTexto = true;
        } else {
            this.bloqueTexto = false;
            this.data.image = this.auxFirma;
        }
    }

    aceptarImagen() {
        this.documentoService.updateFirmaJefe({ token: localStorage.getItem('token'), user: 'admin', image: this.data.image }).then((response) => {
            if (response['status']) {
                this.dvCrop = false;
                this.auxFirma = this.data.image
                this.btnCrop = false;
                this.btnAdd = false;
                this.existFirmaJefe = true;
                this.toastr.success('', 'La firma del jefe técnico fue actualizada!', {
                    closeButton: true,
                    positionClass: 'toast-bottom-right',
                    timeOut: 6000,
                    extendedTimeOut: 3000
                });
            } else {
                this.toastr.error('', 'Ups! ocurrió un error', {
                    closeButton: true,
                    positionClass: 'toast-bottom-right',
                    timeOut: 6000,
                    extendedTimeOut: 3000
                });
            }
        });
    }
}
