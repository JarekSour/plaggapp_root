import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../providers/auth.service';
import { AdminService } from '../providers/admin.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: [
        './home.component.css',
        '../../assets/css/theme-default/bootstrap.css',
        '../../assets/css/theme-default/materialadmin.css',
        '../../assets/css/theme-default/font-awesome.min.css',
        '../../assets/css/theme-default/material-design-iconic-font.min.css']
})
export class HomeComponent implements OnInit {

    admins  = [];
    disable = [];

    constructor(
        public authService: AuthService,
        public adminService: AdminService
    ) { }

    ngOnInit() {
        this.authService.isValidToken()

        this.adminService.getAllAdministradores({ token: localStorage.getItem('token'), user: 'root' }).then((response) => {
            if(response['status'])
                for(let item of response['data'])
                    if(item['habilitado'] == 1)
                        this.admins.push(item);
                    else
                        this.disable.push(item);
        })


    }
}
