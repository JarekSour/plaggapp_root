import { Component, OnInit, ViewChild, TemplateRef, ChangeDetectionStrategy } from '@angular/core';
import { TecnicoService } from '../providers/tecnico.service';
import { ClienteService } from '../providers/cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours } from 'date-fns';
import { Subject } from 'rxjs/Subject';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, DAYS_OF_WEEK, CalendarDateFormatter, DateFormatterParams } from 'angular-calendar';
import { CustomDateFormatter } from '../agendamiento/custom-date-formatter.provider';
import { OrdenService } from '../providers/orden.service';

const colors: any = {
    black: {
        primary: 'rgb(102, 101, 101)',
        secondary: 'rgb(102, 101, 101)'
    }
};

@Component({
    selector: 'app-ordenes',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './ordenes.component.html',
    styleUrls: [
        './ordenes.component.css',
        '../../assets/css/theme-default/bootstrap.css',
        '../../assets/css/theme-default/materialadmin.css',
        '../../assets/css/theme-default/font-awesome.min.css',
        '../../assets/css/theme-default/material-design-iconic-font.min.css',
    ],
    providers: [
        {
            provide: CalendarDateFormatter,
            useClass: CustomDateFormatter
        }
    ]
})
export class OrdenesComponent implements OnInit {

    tecnico: boolean;
    cliente: boolean;
    tech: any;
    client: any;
    idAdministrador: any;

    constructor(
        private route: ActivatedRoute,
        public ordenService: OrdenService,
        public router: Router,
        public tecnicoService: TecnicoService,
        public clienteService: ClienteService
    ) {
        this.tecnico = false;
        this.cliente = false;
    }

    ngOnInit() {
        this.idAdministrador = this.route.snapshot.paramMap.get('id');
        this.tecnicoService.getAllTech({ token: localStorage.getItem('token'), user: 'root', id: this.idAdministrador }).then((response) => {
            if (response['status']) {
                this.tech = response['data'];
            }
        })
        this.clienteService.getAllClient({ token: localStorage.getItem('token'), user: 'root', id: this.idAdministrador }).then((response) => {
            if (response['status']) {
                this.client = response['data'];
            }
        })
    }

    eventProp(num) {
        switch (num) {
            case 1:
                this.tecnico = true;
                this.cliente = false;
                break;
            case 2:
                this.tecnico = false;
                this.cliente = true;
                break;
            default:
                break;
        }
    }

}
