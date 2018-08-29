import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()
export class ClienteService {

    url = 'https://api.plagapp.cl';

    constructor(public http: Http) { }

    getAllClient(json) {
        return new Promise((resolve, reject) => {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');

            this.http.post(this.url + '/cliente/list', JSON.stringify(json), { headers: headers })
                .subscribe(res => {
                    resolve(res.json());
                }, (err) => {
                    reject(err);
                });
        });
    }

    getClientById(json) {
        return new Promise((resolve, reject) => {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');

            this.http.post(this.url + '/cliente/get-by-id', JSON.stringify(json), { headers: headers })
                .subscribe(res => {
                    resolve(res.json());
                }, (err) => {
                    reject(err);
                });
        });
    }

    updateAvatar(file, id) {
        return new Promise((resolve, reject) => {
            const formData = new FormData();
            formData.append("image", file);
            formData.append('id', id);
            formData.append('token', localStorage.getItem('token'));
            formData.append('user', 'root');

            this.http.post(this.url + "/cliente/avatar/update", formData)
                .subscribe(res => {
                    resolve(res.json());
                }, (err) => {
                    reject(err);
                });
        });
    }

    updateClient(json) {
        return new Promise((resolve, reject) => {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');

            this.http.post(this.url + '/cliente/update', JSON.stringify(json), { headers: headers })
                .subscribe(res => {
                    resolve(res.json());
                }, (err) => {
                    reject(err);
                });
        });
    }

    updatePass(json) {
        return new Promise((resolve, reject) => {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');

            this.http.post(this.url + '/cliente/pass/update', JSON.stringify(json), { headers: headers })
                .subscribe(res => {
                    resolve(res.json());
                }, (err) => {
                    reject(err);
                });
        });
    }

    hideClient(json) {
        return new Promise((resolve, reject) => {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');

            this.http.post(this.url + '/cliente/hide', JSON.stringify(json), { headers: headers })
                .subscribe(res => {
                    resolve(res.json());
                }, (err) => {
                    reject(err);
                });
        });
    }

    showClient(json) {
        return new Promise((resolve, reject) => {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');

            this.http.post(this.url + '/cliente/show', JSON.stringify(json), { headers: headers })
                .subscribe(res => {
                    resolve(res.json());
                }, (err) => {
                    reject(err);
                });
        });
    }

    newClient(json) {
        return new Promise((resolve, reject) => {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');

            this.http.post(this.url + '/cliente/new', JSON.stringify(json), { headers: headers })
                .subscribe(res => {
                    resolve(res.json());
                }, (err) => {
                    reject(err);
                });
        });
    }
































    // listDocs(json) {
    //     return new Promise((resolve, reject) => {
    //         let headers = new Headers();
    //         headers.append('Content-Type', 'application/json');

    //         this.http.post('http://api.plagapp.cl/administracion/cliente/file/list', JSON.stringify(json), { headers: headers })
    //             .subscribe(res => {
    //                 resolve(res.json());
    //             }, (err) => {
    //                 reject(err);
    //             });
    //     });
    // }

    // deleteDocs(json) {
    //     return new Promise((resolve, reject) => {
    //         let headers = new Headers();
    //         headers.append('Content-Type', 'application/json');

    //         this.http.post('http://api.plagapp.cl/administracion/cliente/file/delete', JSON.stringify(json), { headers: headers })
    //             .subscribe(res => {
    //                 resolve(res.json());
    //             }, (err) => {
    //                 reject(err);
    //             });
    //     });
    // }

}
