import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()
export class AuthService {

    url = 'https://api.plagapp.cl';

    constructor(public http: Http) { }

    islogged() {
        if (localStorage.getItem('token'))
            return true;
        else
            return false;
    }

    isValidToken(){
        return true;
    }

    login(json) {
        return new Promise((resolve, reject) => {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');

            this.http.post(this.url + '/root/login', JSON.stringify(json), { headers: headers })
                .subscribe(res => {
                    resolve(res.json());
                }, (err) => {
                    reject(err);
                });
        });
    }

    closeSession() {
        window.localStorage.clear();
    }
}
