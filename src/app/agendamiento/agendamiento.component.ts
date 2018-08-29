import { Component, OnInit, ViewChild, TemplateRef, ChangeDetectionStrategy } from '@angular/core';
import { OrdenService } from '../providers/orden.service';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours } from 'date-fns';
import { Subject } from 'rxjs/Subject';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, DAYS_OF_WEEK, CalendarDateFormatter, DateFormatterParams } from 'angular-calendar';
import { CustomDateFormatter } from './custom-date-formatter.provider';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../providers/auth.service';
import { ToastrService } from 'ngx-toastr';

const colors: any = {
    black: {
        primary: 'rgb(102, 101, 101)',
        secondary: 'rgb(102, 101, 101)'
    }
};

@Component({
    selector: 'app-agendamiento',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './agendamiento.component.html',
    styleUrls: [
        './agendamiento.component.css',
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
export class AgendamientoComponent implements OnInit {

    @ViewChild('modalContent') modalContent: TemplateRef<any>;

    view: string = 'month';
    viewDate: Date = new Date();
    modalData: {
        action: string;
        event: CalendarEvent;
    };

    refresh: Subject<any> = new Subject();
    events: CalendarEvent[] = [];
    activeDayIsOpen: boolean = true;
    locale: string = 'es';
    weekStartsOn: number = DAYS_OF_WEEK.MONDAY;
    weekendDays: number[] = [DAYS_OF_WEEK.SATURDAY, DAYS_OF_WEEK.SUNDAY];

    idAdministrador: any;

    modal: boolean;
    agendamientoSelected: any;

    constructor(
        private toastr: ToastrService,
        private route: ActivatedRoute,
        public ordenService: OrdenService,
        public authService: AuthService,
        public router: Router
    ) { }

    ngOnInit() {
        this.idAdministrador = this.route.snapshot.paramMap.get('id');

        this.ordenService.getAgendamiento({ token: localStorage.getItem('token'), user: 'admin', id: this.idAdministrador }).then((response) => {
            if (response['status']) {
                for (let item of response['data'])
                    this.events.push({ start: addDays(new Date(item['fecha']), 1), end: addDays(new Date(item['fecha']), 1), title: item['nombre_empresa'] + ' - ' + item['nombre'] + ' ' + item['apellido_paterno'] + ' ' + (item['apellido_materno'] ? item['apellido_materno'] : '') + ' - ' + item['servicio'], color: colors.black, meta: { id: item['id'] } })
                this.refresh.next();
            } else if (response['data'] == 'expired') {
                this.authService.closeSession();
                this.router.navigate(['/login']);
            }
        })
    }

    dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
        if (isSameMonth(date, this.viewDate)) {
            if (
                (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
                events.length === 0
            ) {
                this.activeDayIsOpen = false;
            } else {
                this.activeDayIsOpen = true;
                this.viewDate = date;
            }
        }
    }

    handleEvent(event: CalendarEvent): void {
        this.agendamientoSelected = event.meta.id;
        this.modal = true;
    }

    deleteAgendamiento() {
        this.modal = false;
        this.events = this.events.filter(x => x.meta.id !== this.agendamientoSelected);
        this.ordenService.deleteOrden({ token: localStorage.getItem('token'), user: 'admin', id: this.idAdministrador, id_orden: this.agendamientoSelected }).then((response) => {
            this.toastr.success('', 'El agendamiento fue eliminado exitosamente', {
                closeButton: true,
                positionClass: 'toast-bottom-right',
                timeOut: 4000,
                extendedTimeOut: 3000
            });
        })
    }

    dismissModal() {
        this.modal = false;
    }

}
