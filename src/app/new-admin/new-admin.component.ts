import { Component, OnInit, ViewChild } from '@angular/core';
import { ImageCropperComponent, CropperSettings } from 'ng2-img-cropper';
import { AdminService } from '../providers/admin.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
    selector: 'app-new-admin',
    templateUrl: './new-admin.component.html',
    styleUrls: ['./new-admin.component.css',
        '../../assets/css/theme-default/bootstrap.css',
        '../../assets/css/theme-default/materialadmin.css',
        '../../assets/css/theme-default/font-awesome.min.css',
        '../../assets/css/theme-default/material-design-iconic-font.min.css']
})
export class NewAdminComponent implements OnInit {

    @ViewChild('cropper', undefined) cropper: ImageCropperComponent;
    @ViewChild('fileInput') fileInput;
    data: any;
    json = {
        token: localStorage.getItem('token'), user: 'root',
        logo: '', rut: '', nombre: '', razon: '', resolucion: '', email: '', direccion: '', ciudad: '',
        fono: '', fax: '', web: '', r_representante: '', representante: ''
    }

    cropperSettings: CropperSettings;
    isChangeAvatar: boolean;
    inputAvatar: any;
    auxAvatar: any;
    ifLoading: boolean;

    constructor(
        public router: Router,
        private toastr: ToastrService,
        public adminService: AdminService
    ) {
        this.cropperSettings = new CropperSettings();
        this.cropperSettings.noFileInput = true;
        this.cropperSettings.canvasWidth = 300;
        this.cropperSettings.canvasHeight = 300;
        this.cropperSettings.croppedWidth = 300;
        this.cropperSettings.croppedHeight = 300;
        this.data = { image: 'assets/img/avatar.png' };
    }

    ngOnInit() {

    }

    newAdmin() {
        if (this.data.image == 'assets/img/avatar.png') {
            this.toastr.error('', 'Debes agregar una imagen', {
                closeButton: true,
                positionClass: 'toast-bottom-right',
                timeOut: 6000,
                extendedTimeOut: 3000
            });
        } else {
            this.ifLoading = true;
            this.json.logo = this.data.image;
            this.adminService.newAdministrador(this.json).then((response) => {
                if (response['status'] == true) {
                    this.ifLoading = false;
                    this.toastr.success('', 'El administrador fue añadido!', {
                        closeButton: true,
                        positionClass: 'toast-bottom-right',
                        timeOut: 6000,
                        extendedTimeOut: 3000
                    });
                    this.router.navigate(['/home']);
                } else if (response["error"] == 'rut_use') {
                    this.ifLoading = false;
                    this.toastr.error('', 'El rut ingresado se encuentra en uso', {
                        closeButton: true,
                        positionClass: 'toast-bottom-right',
                        timeOut: 6000,
                        extendedTimeOut: 3000
                    });
                } else {
                    this.ifLoading = false;
                    this.toastr.error('', 'Ups!, ocurrio un error', {
                        closeButton: true,
                        positionClass: 'toast-bottom-right',
                        timeOut: 6000,
                        extendedTimeOut: 3000
                    });
                }
            })
        }
    }

    updateAvatar(e) {
        var file: File = e.target.files[0];
        if (e.target.files.length > 0) {
            this.isChangeAvatar = true;
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

    aceptarImagen() {
        this.isChangeAvatar = false;
    }

    hideCrop() {
        this.inputAvatar = null;
        this.isChangeAvatar = false;
        this.data.image = 'assets/img/avatar.png';
    }

}
