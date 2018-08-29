import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { CalendarModule } from 'angular-calendar';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ImageCropperModule } from 'ng2-img-cropper/index';
import { DpDatePickerModule } from 'ng2-date-picker';
import { ToastrModule } from 'ngx-toastr';
import { NgxPaginationModule } from 'ngx-pagination';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { AgmCoreModule } from '@agm/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MyDateRangePickerModule } from 'mydaterangepicker';

import { AuthService } from './providers/auth.service';
import { AdminService } from './providers/admin.service';
import { TecnicoService } from './providers/tecnico.service';
import { ClienteService } from './providers/cliente.service';
import { OrdenService } from './providers/orden.service';
import { ParametroService } from './providers/parametro.service';
import { ExcelService } from './providers/excel.service';
import { PuntoService } from './providers/punto.service';
import { LicenceService } from './providers/licence.service';
import { DocumentoService } from './providers/documento.service';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AgendamientoComponent } from './agendamiento/agendamiento.component';
import { EquipoComponent } from './equipo/equipo.component';
import { ClientesComponent } from './clientes/clientes.component';
import { OrdenesComponent } from './ordenes/ordenes.component';
import { InformesComponent } from './informes/informes.component';
import { ShowTechComponent } from './show-tech/show-tech.component';
import { ShowClientComponent } from './show-client/show-client.component';
import { ListOrdenByComponent } from './list-orden-by/list-orden-by.component';
import { ShowOrdenComponent } from './show-orden/show-orden.component';
import { ShowPuntoComponent } from './show-punto/show-punto.component';
import { MapaComponent } from './mapa/mapa.component';
import { DocumentoComponent } from './documento/documento.component';
import { HeaderComponent } from './header/header.component';
import { NewAdminComponent } from './new-admin/new-admin.component';
import { ShowAdministradorComponent } from './show-administrador/show-administrador.component';
import { LicenceComponent } from './licence/licence.component';
import { ParametrosComponent } from './parametros/parametros.component';
import { NewOrdenComponent } from './new-orden/new-orden.component';
import { NewTechComponent } from './new-tech/new-tech.component';
import { NewClientComponent } from './new-client/new-client.component';


const appRoutes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent, },
    { path: 'home', component: HomeComponent },
    { path: 'new-admin', component: NewAdminComponent },
    { path: 'administrador/:id', component: ShowAdministradorComponent },
    { path: 'licence', component: LicenceComponent },
    { path: 'agendamiento/:id', component: AgendamientoComponent },
    { path: 'equipo/:id', component: EquipoComponent },
    { path: 'clientes/:id', component: ClientesComponent },
    { path: 'ordenes/:id', component: OrdenesComponent },
    // { path: 'informes', component: InformesComponent },
    { path: 'new-client/:idadmin', component: NewClientComponent },
    { path: 'new-tech/:idadmin', component: NewTechComponent },
    { path: 'new-orden/:idadmin', component: NewOrdenComponent },
    { path: 'equipo/:idadmin/tecnico/:id', component: ShowTechComponent },
    { path: 'clientes/:idadmin/cliente/:id', component: ShowClientComponent },
    { path: 'orden/:idadmin/:tipo/:id', component: ListOrdenByComponent },
    { path: 'detalle/:idadmin/:tipo/:id', component: ShowOrdenComponent },
    { path: 'punto/:idadmin/:tipo/:id', component: ShowPuntoComponent },
    { path: 'mapa/:idadmin/:tipo/:id', component: MapaComponent },
    { path: 'documento/:idadmin', component: DocumentoComponent },
    { path: 'parametros/:id', component: ParametrosComponent },
]

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        HomeComponent,
        AgendamientoComponent,
        EquipoComponent,
        ClientesComponent,
        OrdenesComponent,
        InformesComponent,
        ShowTechComponent,
        ShowClientComponent,
        ListOrdenByComponent,
        ShowOrdenComponent,
        ShowPuntoComponent,
        MapaComponent,
        DocumentoComponent,
        HeaderComponent,
        NewAdminComponent,
        ShowAdministradorComponent,
        LicenceComponent,
        ParametrosComponent,
        NewOrdenComponent,
        NewTechComponent,
        NewClientComponent
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(appRoutes),
        BrowserAnimationsModule,
        ChartsModule,
        CalendarModule.forRoot(),
        FormsModule,
        HttpModule,
        ImageCropperModule,
        DpDatePickerModule,
        ToastrModule.forRoot(),
        NgxPaginationModule,
        DropzoneModule.forRoot(),
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyAaYwbinhqL4l3uhdIjpFLZ4-mDQfwBN4M'
        }),
        NgbModule.forRoot(),
        MyDateRangePickerModule
    ],
    providers: [AuthService, AdminService, TecnicoService, ClienteService, OrdenService, ParametroService, ExcelService, PuntoService, LicenceService, DocumentoService],
    bootstrap: [AppComponent],
})
export class AppModule { }
