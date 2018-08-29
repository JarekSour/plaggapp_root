import { Component, OnInit } from '@angular/core';
import 'assets/js/libs/jquery/jquery-migrate-1.2.1.min.js';
import 'assets/js/libs/bootstrap/bootstrap.min.js';
import 'assets/js/libs/spin.js/spin.min.js';
import 'assets/js/libs/autosize/jquery.autosize.min.js';
import 'assets/js/core/source/App.js';
import 'assets/js/core/source/AppNavigation.js';
import 'assets/js/core/source/AppOffcanvas.js';
import 'assets/js/core/source/AppCard.js';
import 'assets/js/core/source/AppForm.js';
import 'assets/js/core/source/AppNavSearch.js';
import 'assets/js/core/source/AppVendor.js';
import { AuthService } from '../providers/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css',
        '../../assets/css/theme-default/bootstrap.css',
        '../../assets/css/theme-default/materialadmin.css',
        '../../assets/css/theme-default/font-awesome.min.css',
        '../../assets/css/theme-default/material-design-iconic-font.min.css']
})
export class HeaderComponent implements OnInit {

    constructor(
        public authService: AuthService,
        public router: Router
    ) { }

    ngOnInit() {
    }

    closeSession() {
        this.authService.closeSession();
        this.router.navigate(['/login']);
    }

}
