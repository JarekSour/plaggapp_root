import { Component, OnInit } from '@angular/core';
import { AdminService } from '../providers/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
    selector: 'app-show-administrador',
    templateUrl: './show-administrador.component.html',
    styleUrls: ['./show-administrador.component.css',
        '../../assets/css/theme-default/bootstrap.css',
        '../../assets/css/theme-default/materialadmin.css',
        '../../assets/css/theme-default/font-awesome.min.css',
        '../../assets/css/theme-default/material-design-iconic-font.min.css']
})
export class ShowAdministradorComponent implements OnInit {

    idAdministrador: any;

    json = {
        avatar: '', logo: '', rut: '', nombre: '', razon: '', resolucion: '', email: '', direccion: '', ciudad: '',
        fono: '', fax: '', web: '', r_representante: '', representante: '', habilitado: 1
    }
    licence = {
        nombre: '', fecha: '', max: '', dispo: ''
    }
    newlicence = { token: localStorage.getItem('token'), user: 'root', key: '', id: '' }
    dvError: boolean = false;
    modal: boolean;
    jsonPass = {
        token: localStorage.getItem('token'), user: 'root', id: '', password: '', repassword: ''
    }

    constructor(
        private toastr: ToastrService,
        public router: Router,
        private route: ActivatedRoute,
        public adminService: AdminService,
    ) { }

    ngOnInit() {
        this.idAdministrador = this.route.snapshot.paramMap.get('id');
        this.adminService.getAdministrador({ token: localStorage.getItem('token'), user: 'root', id: this.idAdministrador }).then((response) => {
            if (response['status']) {
                this.json.avatar = response['data']['avatar'];
                this.json.logo = response['data']['logo'];
                this.json.nombre = response['data']['nombre'];
                this.json.rut = response['data']['rut'];
                this.json.razon = response['data']['razon'];
                this.json.resolucion = response['data']['resolucion'];
                this.json.email = response['data']['email'];
                this.json.direccion = response['data']['direccion'];
                this.json.ciudad = response['data']['ciudad'];
                this.json.fono = response['data']['fono'];
                this.json.fax = response['data']['fax'];
                this.json.web = response['data']['web'];
                this.json.r_representante = response['data']['r_representante'];
                this.json.representante = response['data']['representante'];
                this.json.habilitado = response['data']['habilitado'];

                if (response['licence'] != null) {
                    this.licence.nombre = response['licence']['nombre'];
                    this.licence.fecha = response['licence']['caduca'];
                    this.licence.max = response['licence']['max_device'];
                }
                this.licence.dispo = response['dispo'];

            } else if (response['data'] == 'no_data') {
                this.router.navigate(['/home']);
            }
        })
    }

    updateAdmnistrador() {
        this.json['token'] = localStorage.getItem('token');
        this.json['user'] = 'root';
        this.json['id'] = this.idAdministrador;
        this.adminService.updateAdministrador(this.json).then((response) => {
            if (response['status']) {
                this.toastr.success('', 'El administrador fue actualizado!', {
                    closeButton: true,
                    positionClass: 'toast-bottom-right',
                    timeOut: 6000,
                    extendedTimeOut: 3000
                });
            }
        })
    }

    updateLogo(e) {
        var file: File = e.target.files[0];
        if (e.target.files.length > 0) {
            var image: any = new Image();
            var myReader: FileReader = new FileReader();
            var that = this;
            myReader.onloadend = (loadEvent: any) => {
                var file = loadEvent.target.result;
                this.json.logo = file;
                this.adminService.updateLogo({ logo: file, token: localStorage.getItem('token'), user: 'root', id: this.idAdministrador }).then((response) => {
                    if (response['status']) {
                        this.toastr.success('', 'El logo fue actualizado!', {
                            closeButton: true,
                            positionClass: 'toast-bottom-right',
                            timeOut: 6000,
                            extendedTimeOut: 3000
                        });
                    }
                })
            };
            myReader.readAsDataURL(file);
        }
    }

    insertLicence() {
        this.dvError = false;
        this.newlicence.id = this.idAdministrador;
        this.adminService.validateLicence(this.newlicence).then((response) => {
            if (response['status']) {
                this.newlicence.key = '';
                this.licence.nombre = response['plan'];
                this.licence.fecha = response['caduca'];
                this.licence.max = response['max'];
                this.toastr.success('', 'la licencia fue actualizada!', {
                    closeButton: true,
                    positionClass: 'toast-bottom-right',
                    timeOut: 6000,
                    extendedTimeOut: 3000
                });
            } else {
                this.dvError = true;
            }
        })
    }

    openModal() {
        this.modal = true;
    }

    dismissModal() {
        this.modal = false;
    }

    hideAdministrador() {
        this.modal = false;
        this.adminService.hideAdministrador({ token: localStorage.getItem('token'), user: 'root', id: this.idAdministrador }).then((response) => {
            if (response['status']) {
                this.toastr.success('', 'El administrador fue deshabilitado exitosamente!', {
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
        })
    }

    showAdministrador() {
        this.adminService.showAdministrador({ token: localStorage.getItem('token'), user: 'root', id: this.idAdministrador }).then((response) => {
            if (response['status']) {
                this.toastr.success('', 'El administrador fue habilitado exitosamente!', {
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

    updatePassAdmin() {
        this.jsonPass.id = this.idAdministrador;
        if (this.jsonPass.password != this.jsonPass.repassword) {
            this.toastr.error('', 'Las contraseñas no coinciden', {
                closeButton: true,
                positionClass: 'toast-bottom-right',
                timeOut: 6000,
                extendedTimeOut: 3000
            });
        } else {
            this.adminService.updatePass(this.jsonPass).then((response) => {
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
}
