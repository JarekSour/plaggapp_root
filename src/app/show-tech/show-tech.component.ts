import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from '../providers/auth.service';
import { TecnicoService } from '../providers/tecnico.service';
import { ImageCropperComponent, CropperSettings } from 'ng2-img-cropper';
import { ToastrService } from 'ngx-toastr';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { DocumentoService } from '../providers/documento.service';

@Component({
    selector: 'app-show-tech',
    templateUrl: './show-tech.component.html',
    styleUrls: [
        './show-tech.component.css',
        '../../assets/css/theme-default/bootstrap.css',
        '../../assets/css/theme-default/materialadmin.css',
        '../../assets/css/theme-default/font-awesome.min.css',
        '../../assets/css/theme-default/material-design-iconic-font.min.css'
    ]
})
export class ShowTechComponent implements OnInit {
    @ViewChild('cropper', undefined) cropper: ImageCropperComponent;
    @ViewChild('fileInput') fileInput;

    config: DropzoneConfigInterface = {
        url: 'https://api.plagapp.cl/documento/tecnico/upload',
        maxFilesize: 8,
        method: 'POST',
        params: {
            token: localStorage.getItem('token'),
            user: 'root'
        }
    };

    data: any;
    json = {
        token: localStorage.getItem('token'), user: 'root',
        id: '', rut: '', nombre: '', paterno: '', materno: '', correo: '', telefono: '', emergencia: '',
        direccion: '', profesion: '', automovil: '', password: '', repassword: '', keygen: '', habilitado: 1
    }
    idTech: any;
    idAdministrador: any;
    documentos = [];
    cropperSettings: CropperSettings;
    isChangeAvatar: boolean;
    inputAvatar: any;
    auxAvatar: any;
    ifLoading: boolean;
    modal: boolean;

    constructor(
        private toastr: ToastrService,
        public documentoService: DocumentoService,
        public techService: TecnicoService,
        public authService: AuthService,
        private router: Router,
        private route: ActivatedRoute
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
        this.idTech = this.route.snapshot.paramMap.get('id');
        this.idAdministrador = this.route.snapshot.paramMap.get('idadmin');
        this.config.params['id_tecnico'] = this.idTech;
        this.techService.getTechById({ token: localStorage.getItem('token'), user: 'root', id: this.idTech }).then((response) => {
            if (response['status'] == true) {
                this.data.image = response['data']['avatar'] != null ? 'https://api.plagapp.cl/cliente/avatar/get?image=' + response['data']['avatar'] : 'assets/img/avatar.png';
                this.json.rut = response['data']['rut'];
                this.json.nombre = response['data']['nombre'];
                this.json.paterno = response['data']['apellido_paterno'];
                this.json.materno = response['data']['apellido_materno'];
                this.json.correo = response['data']['correo'];
                this.json.telefono = response['data']['telefono'];
                this.json.emergencia = response['data']['telefono_emergencia'];
                this.json.direccion = response['data']['direccion'];
                this.json.profesion = response['data']['profesion'];
                this.json.automovil = response['data']['automovil'];
                this.json.keygen = response['data']['keygen'];
                this.json.habilitado = response['data']['habilitado'];
            }
        })

        this.documentoService.getTechDocs({ token: localStorage.getItem('token'), id: this.idTech, user: 'root' }).then((response) => {
            if (response['status'] == true) {
                this.documentos = response['data'];
            } else if (response['data'] == 'expired') {
                this.authService.closeSession();
                this.router.navigate(['/login']);
            }
        })
    }

    updateTech() {
        this.json.id = this.idTech;
        this.ifLoading = true;
        this.techService.updateTech(this.json).then((response) => {
            if (response['status'] == true) {
                this.ifLoading = false;
                this.toastr.success('', 'El técnico fue actualizado!', {
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

    updatePassTech() {
        this.json.id = this.idTech;
        if (this.json.password != this.json.repassword) {
            this.toastr.error('', 'Las contraseñas no coinciden', {
                closeButton: true,
                positionClass: 'toast-bottom-right',
                timeOut: 6000,
                extendedTimeOut: 3000
            });
        } else {
            this.techService.updatePass(this.json).then((response) => {
                if (response['status'] == true) {
                    this.toastr.success('', 'La contraseña fue actualizada!', {
                        closeButton: true,
                        positionClass: 'toast-bottom-right',
                        timeOut: 6000,
                        extendedTimeOut: 3000
                    });
                } else {
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
        var file = this.dataURLtoFile(this.data.image, 'avatar.png');
        this.techService.updateAvatar(file, this.idTech).then((resp) => {
            this.ifLoading = false;
            this.toastr.success('', 'El avatar del técnico fue actualizado!', {
                closeButton: true,
                positionClass: 'toast-bottom-right',
                timeOut: 6000,
                extendedTimeOut: 3000
            });
        });
    }

    dataURLtoFile(dataurl, filename) {
        var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
    }

    hideCrop() {
        this.inputAvatar = null;
        this.isChangeAvatar = false;
        this.data.image = this.auxAvatar;
    }

    openModal() {
        this.modal = true;
    }

    dismissModal() {
        this.modal = false;
    }

    onUploadSuccess(e) {
        this.documentos.push({ id: e[1]["id"], nombre: e[1]["name"], url: e[1]["path"] });
    }

    onUploadError(e) {
        console.log(e)
    }

    downloadDoc(url) {
        var newWindow = window.open('https://api.plagapp.cl/storage/' + url);
    }

    deleteDoc(id) {
        this.documentoService.deleteTechDoc({ token: localStorage.getItem('token'), user: 'root', id: id, id_tecnico: this.idTech }).then((response) => {
            if (response['status'] == true) {
                this.documentos = this.documentos.filter(item => item.id !== id);
            } else if (response['data'] == 'expired') {
                this.authService.closeSession();
                this.router.navigate(['/login']);
            }
        })
    }

    renewKeygen() {
        this.techService.renewKeygen({ token: localStorage.getItem('token'), user: 'root', id_tecnico: this.idTech }).then((response) => {
            if (response['status']) {
                this.json.keygen = response['key'];
            }
        })
    }

    hideTech() {
        this.techService.hideTech({ token: localStorage.getItem('token'), user: 'root', id: this.idTech }).then((response) => {
            if (response['status']) {
                this.toastr.success('', 'El técnico fue deshabilitado exitosamente!', {
                    closeButton: true,
                    positionClass: 'toast-bottom-right',
                    timeOut: 6000,
                    extendedTimeOut: 3000
                });
                this.json.habilitado = 0;
            } else {
                this.toastr.error('', 'Ups! ocurrio un error', {
                    closeButton: true,
                    positionClass: 'toast-bottom-right',
                    timeOut: 6000,
                    extendedTimeOut: 3000
                });
            }
            this.modal = false;
        })
    }

    showTech() {
        this.techService.showTech({ token: localStorage.getItem('token'), user: 'root', id: this.idTech }).then((response) => {
            if (response['status']) {
                this.toastr.success('', 'El técnico fue habilitado exitosamente!', {
                    closeButton: true,
                    positionClass: 'toast-bottom-right',
                    timeOut: 6000,
                    extendedTimeOut: 3000
                });
                this.json.habilitado = 1;
            } else {
                this.toastr.error('', 'Ups! ocurrio un error', {
                    closeButton: true,
                    positionClass: 'toast-bottom-right',
                    timeOut: 6000,
                    extendedTimeOut: 3000
                });
            }
            this.modal = false;
        })
    }
}


