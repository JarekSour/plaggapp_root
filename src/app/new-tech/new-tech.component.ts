import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TecnicoService } from '../providers/tecnico.service';
import { ImageCropperComponent, CropperSettings } from 'ng2-img-cropper';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-new-tech',
    templateUrl: './new-tech.component.html',
    styleUrls: ['./new-tech.component.css',
        '../../assets/css/theme-default/bootstrap.css',
        '../../assets/css/theme-default/materialadmin.css',
        '../../assets/css/theme-default/font-awesome.min.css',
        '../../assets/css/theme-default/material-design-iconic-font.min.css']
})
export class NewTechComponent implements OnInit {

    @ViewChild('cropper', undefined) cropper: ImageCropperComponent;
    @ViewChild('fileInput') fileInput;
    data: any;
    json = {
        token: localStorage.getItem('token'), user: 'root', id: '',
        rut: '', nombre: '', paterno: '', materno: '', correo: '', telefono: '', emergencia: '',
        direccion: '', profesion: '', automovil: ''
    }

    cropperSettings: CropperSettings;
    isChangeAvatar: boolean;
    inputAvatar: any;
    auxAvatar: any;
    ifLoading: boolean;
    idAdministrador: any;

    constructor(
        private route: ActivatedRoute,
        private toastr: ToastrService,
        public techService: TecnicoService,
        public router: Router
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
        this.idAdministrador = this.route.snapshot.paramMap.get('idadmin');
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

    newTech() {
        if (this.data.image == 'assets/img/avatar.png') {
            this.toastr.error('', 'Debes agregar una imagen', {
                closeButton: true,
                positionClass: 'toast-bottom-right',
                timeOut: 6000,
                extendedTimeOut: 3000
            });
        } else {
            this.ifLoading = true;
            this.json.id = this.idAdministrador;
            this.techService.newTech(this.json).then((response) => {
                if (response['status'] == true) {
                    var file = this.dataURLtoFile(this.data.image, 'avatar.png');
                    this.techService.updateAvatar(file, response['id']).then((resp) => {
                        this.ifLoading = false;
                        this.toastr.success('', 'El técnico fue añadido!', {
                            closeButton: true,
                            positionClass: 'toast-bottom-right',
                            timeOut: 6000,
                            extendedTimeOut: 3000
                        });
                        this.router.navigate(['/equipo']);
                    });
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
                    this.toastr.error('', 'Ups!, ocurrió un error', {
                        closeButton: true,
                        positionClass: 'toast-bottom-right',
                        timeOut: 6000,
                        extendedTimeOut: 3000
                    });
                }
            })
        }
    }

    dataURLtoFile(dataurl, filename) {
        var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
    }

}
