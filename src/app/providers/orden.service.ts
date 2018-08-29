import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()
export class OrdenService {

    url = 'https://api.plagapp.cl';

    constructor(public http: Http) { }

    newOrden(json) {
        return new Promise((resolve, reject) => {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');

            this.http.post(this.url + '/orden/new', JSON.stringify(json), { headers: headers })
                .subscribe(res => {
                    resolve(res.json());
                }, (err) => {
                    reject(err);
                });
        });
    }

    getOrderByTech(json) {
        return new Promise((resolve, reject) => {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');

            this.http.post(this.url + '/orden/list-by-tech', JSON.stringify(json), { headers: headers })
                .subscribe(res => {
                    resolve(res.json());
                }, (err) => {
                    reject(err);
                });
        });
    }

    getOrderByClien(json) {
        return new Promise((resolve, reject) => {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');

            this.http.post(this.url + '/orden/list-by-client', JSON.stringify(json), { headers: headers })
                .subscribe(res => {
                    resolve(res.json());
                }, (err) => {
                    reject(err);
                });
        });
    }

    getInfoOrden(json) {
        return new Promise((resolve, reject) => {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');

            this.http.post(this.url + '/orden/detail', JSON.stringify(json), { headers: headers })
                .subscribe(res => {
                    resolve(res.json());
                }, (err) => {
                    reject(err);
                });
        });
    }

    getAgendamiento(json) {
        return new Promise((resolve, reject) => {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');

            this.http.post(this.url + '/orden/agendamiento', JSON.stringify(json), { headers: headers })
                .subscribe(res => {
                    resolve(res.json());
                }, (err) => {
                    reject(err);
                });
        });
    }

    deleteOrden(json){
        return new Promise((resolve, reject) => {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');

            this.http.post(this.url + '/orden/delete', JSON.stringify(json), { headers: headers })
                .subscribe(res => {
                    resolve(res.json());
                }, (err) => {
                    reject(err);
                });
        });
    }







    // getAllAgendamientoFinish(json) {
    //     return new Promise((resolve, reject) => {
    //         let headers = new Headers();
    //         headers.append('Content-Type', 'application/json');

    //         this.http.post('https://api.plagapp.cl/administracion/orden/getFinish', JSON.stringify(json), { headers: headers })
    //             .subscribe(res => {
    //                 resolve(res.json());
    //             }, (err) => {
    //                 reject(err);
    //             });
    //     });
    // }






    // uploadImagePunto(file) {
    //     return new Promise((resolve, reject) => {
    //         let headers = new Headers();
    //         headers.append('authorization', 'Client-ID de02d3457db74cd');

    //         let formData = new FormData();
    //         formData.append("image", file.split(',')[1]);

    //         this.http.post("https://api.imgur.com/3/image", formData, { headers: headers })
    //             .subscribe(res => {
    //                 resolve(res.json());
    //             }, (err) => {
    //                 reject(err);
    //             });
    //     });
    // }

    // getdataClientPuntos(json) {
    //     return new Promise((resolve, reject) => {
    //         let headers = new Headers();
    //         headers.append('Content-Type', 'application/json');

    //         this.http.post('https://api.plagapp.cl/administracion/punto/mapa', JSON.stringify(json), { headers: headers })
    //             .subscribe(res => {
    //                 resolve(res.json());
    //             }, (err) => {
    //                 reject(err);
    //             });
    //     });
    // }

}
