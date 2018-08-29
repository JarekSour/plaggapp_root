import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()
export class TecnicoService {

    url = 'https://api.plagapp.cl';

    constructor(public http: Http) { }

    newTech(json) {
        return new Promise((resolve, reject) => {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');

            this.http.post(this.url + '/tecnico/new', JSON.stringify(json), { headers: headers })
                .subscribe(res => {
                    resolve(res.json());
                }, (err) => {
                    reject(err);
                });
        });
    }

    getAllTech(json) {
        return new Promise((resolve, reject) => {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');

            this.http.post(this.url + '/tecnico/list', JSON.stringify(json), { headers: headers })
                .subscribe(res => {
                    resolve(res.json());
                }, (err) => {
                    reject(err);
                });
        });
    }

    getTechById(json) {
        return new Promise((resolve, reject) => {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');

            this.http.post(this.url + '/tecnico/get-by-id', JSON.stringify(json), { headers: headers })
                .subscribe(res => {
                    resolve(res.json());
                }, (err) => {
                    reject(err);
                });
        });
    }

    updateTech(json) {
        return new Promise((resolve, reject) => {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');

            this.http.post(this.url + '/tecnico/update', JSON.stringify(json), { headers: headers })
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

            this.http.post(this.url + '/tecnico/pass/update', JSON.stringify(json), { headers: headers })
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

            this.http.post(this.url + "/tecnico/avatar/update", formData)
                .subscribe(res => {
                    resolve(res.json());
                }, (err) => {
                    reject(err);
                });
        });
    }

    renewKeygen(json) {
        return new Promise((resolve, reject) => {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');

            this.http.post(this.url + '/tecnico/renew-keygen', JSON.stringify(json), { headers: headers })
                .subscribe(res => {
                    resolve(res.json());
                }, (err) => {
                    reject(err);
                });
        });
    }

    getFirmaJefe(json) {
        return new Promise((resolve, reject) => {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');

            this.http.post(this.url + '/documento/firma/get', JSON.stringify(json), { headers: headers })
                .subscribe(res => {
                    resolve(res.json());
                }, (err) => {
                    reject(err);
                });
        });
    }

    showTech(json) {
        return new Promise((resolve, reject) => {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');

            this.http.post(this.url + '/tecnico/show', JSON.stringify(json), { headers: headers })
                .subscribe(res => {
                    resolve(res.json());
                }, (err) => {
                    reject(err);
                });
        });
    }

    hideTech(json) {
        return new Promise((resolve, reject) => {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');

            this.http.post(this.url + '/tecnico/hide', JSON.stringify(json), { headers: headers })
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

    //         this.http.post('http://api.plagapp.cl/administracion/tecnico/file/list', JSON.stringify(json), { headers: headers })
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

    //         this.http.post('http://api.plagapp.cl/administracion/tecnico/file/delete', JSON.stringify(json), { headers: headers })
    //             .subscribe(res => {
    //                 resolve(res.json());
    //             }, (err) => {
    //                 reject(err);
    //             });
    //     });
    // }

    // updateFirmaJefe(file, token) {
    //     return new Promise((resolve, reject) => {
    //         const formData = new FormData();
    //         formData.append("image", file);
    //         formData.append('token', token);

    //         this.http.post("http://api.plagapp.cl/administracion/tecnico/addFirmaJefe", formData)
    //             .subscribe(res => {
    //                 resolve(res.json());
    //             }, (err) => {
    //                 reject(err);
    //             });
    //     });
    // }



}
