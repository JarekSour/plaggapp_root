import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ClienteService } from '../providers/cliente.service';
import { ImageCropperComponent, CropperSettings } from 'ng2-img-cropper';
import { ToastrService } from 'ngx-toastr';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { DocumentoService } from '../providers/documento.service';

@Component({
    selector: 'app-show-client',
    templateUrl: './show-client.component.html',
    styleUrls: [
        './show-client.component.css',
        '../../assets/css/theme-default/bootstrap.css',
        '../../assets/css/theme-default/materialadmin.css',
        '../../assets/css/theme-default/font-awesome.min.css',
        '../../assets/css/theme-default/material-design-iconic-font.min.css'
    ]
})
export class ShowClientComponent implements OnInit {
    @ViewChild('cropper', undefined) cropper: ImageCropperComponent;
    @ViewChild('fileInput') fileInput;

    config: DropzoneConfigInterface = {
        url: 'https://api.plagapp.cl/documento/cliente/upload',
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
        id: '', rut: '', nombre_empresa: '', razon: '', giro: '', correo_empresa: '', telefono_empresa: '', direccion_empresa: '', comuna_empresa: '', geolocalizacion: '',
        rut_cargo: '', nombre_cargo: '', paterno_cargo: '', materno_cargo: '', correo_cargo: '', telefono_cargo: '', direccion_cargo: '', cargo_cargo: '',
        password: '', repassword: '', habilitado: 1
    }
    idClient: any;
    idAdministrador: any;
    documentos = [];
    cropperSettings: CropperSettings;
    isChangeAvatar: boolean;
    inputAvatar: any;
    auxAvatar: any;
    ifLoading: boolean;
    modal: boolean;

    constructor(
        public documentoService: DocumentoService,
        private toastr: ToastrService,
        public clientService: ClienteService,
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
        this.idAdministrador = this.route.snapshot.paramMap.get('idadmin');
        this.idClient = this.route.snapshot.paramMap.get('id');
        this.config.params['id_cliente'] = this.idClient;
        this.clientService.getClientById({ token: localStorage.getItem('token'), user: 'root', id: this.idClient }).then((response) => {
            if (response['status'] == true) {
                this.auxAvatar = response['data']['avatar'] != null ? 'https://api.plagapp.cl/cliente/avatar/get?image=' + response['data']['avatar'] : 'assets/img/avatar.png';
                this.data.image = response['data']['avatar'] != null ? 'https://api.plagapp.cl/cliente/avatar/get?image=' + response['data']['avatar'] : 'assets/img/avatar.png';
                this.json.rut = response['data']['rut_empresa'];
                this.json.nombre_empresa = response['data']['nombre_empresa'];
                this.json.razon = response['data']['razon'];
                this.json.giro = response['data']['giro'];
                this.json.correo_empresa = response['data']['correo_empresa'];
                this.json.telefono_empresa = response['data']['telefono_empresa'];
                this.json.direccion_empresa = response['data']['direccion_empresa'];
                this.json.comuna_empresa = response['data']['comuna_empresa'];
                this.json.geolocalizacion = response['data']['geolocalizacion'];
                this.json.rut_cargo = response['data']['rut_persona'];
                this.json.nombre_cargo = response['data']['nombre'];
                this.json.paterno_cargo = response['data']['apellido_paterno'];
                this.json.materno_cargo = response['data']['apellido_materno'];
                this.json.correo_cargo = response['data']['correo_persona'];
                this.json.telefono_cargo = response['data']['telefono_persona'];
                this.json.direccion_cargo = response['data']['direccion_persona'];
                this.json.cargo_cargo = response['data']['cargo'];
                this.json.habilitado = response['data']['habilitado'];
            }
        })

        this.documentoService.getClientDocs({ token: localStorage.getItem('token'), user: 'root', id: this.idClient }).then((response) => {
            if (response['status'] == true) {
                this.documentos = response['data'];
            }
        })
    }

    updateClient() {
        this.json.id = this.idClient;
        this.ifLoading = true;
        this.clientService.updateClient(this.json).then((response) => {
            if (response['status'] == true) {
                this.ifLoading = false;
                this.toastr.success('', 'El cliente fue actualizado!', {
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

    updatePassClient() {
        this.json.id = this.idClient;
        if (this.json.password != this.json.repassword) {
            this.toastr.error('', 'Las contraseñas no coinciden', {
                closeButton: true,
                positionClass: 'toast-bottom-right',
                timeOut: 6000,
                extendedTimeOut: 3000
            });
        } else {
            this.clientService.updatePass(this.json).then((response) => {
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
        this.clientService.updateAvatar(file, this.idClient).then((resp) => {
            this.ifLoading = false;
            this.toastr.success('', 'El avatar del cliente fue actualizado!', {
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

    hideClient() {
        this.clientService.hideClient({ token: localStorage.getItem('token'), user: 'root', id: this.idClient }).then((response) => {
            if (response['status']) {
                this.toastr.success('', 'El cliente fue deshabilitado exitosamente!', {
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

    showClient() {
        this.clientService.showClient({ token: localStorage.getItem('token'), user: 'root', id: this.idClient }).then((response) => {
            if (response['status']) {
                this.toastr.success('', 'El cliente fue habilitado exitosamente!', {
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
        this.documentoService.deleteClientDoc({ token: localStorage.getItem('token'), user: 'root', id: id, id_cliente: this.idClient }).then((response) => {
            if (response['status'] == true) {
                this.documentos = this.documentos.filter(item => item.id !== id);
            }
        })
    }
}
