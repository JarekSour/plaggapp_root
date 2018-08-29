import { Component, OnInit } from '@angular/core';
import { AuthService } from '../providers/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: [
        './login.component.css',
        '../../assets/css/theme-default/bootstrap.css',
        '../../assets/css/theme-default/materialadmin.css',
        '../../assets/css/theme-default/font-awesome.min.css',
        '../../assets/css/theme-default/material-design-iconic-font.min.css'
    ]
})
export class LoginComponent implements OnInit {

    loginData = { email: '', pass: '' };
    error: any;

    constructor(
        public authService: AuthService,
        public router: Router,
    ) { }

    ngOnInit() {
        if (this.authService.islogged())
            this.router.navigate(['/home']);
    }

    doLogin() {
        this.authService.login(this.loginData).then((response) => {
            if (response['status'] == true) {
                localStorage.setItem('token', response['token']);
                this.router.navigate(['/home']);
            } else {
                this.error = 'Email o contraseña incorrecta'
            }
        })
    }



}
