import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class BkPartyRendererSearvice {

    constructor(
        private httpClient: HttpClient) { }

    // getBkPartyData(value): any {
    //     return this.httpClient.post(this.getBookingPartylUrl, value, this.getOptionsForJsonHttpClient());
    // }

    bkDataUrl = '/assets/autoComplete.json'

    getBkPartyData(value): any {
        return this.httpClient.get(this.bkDataUrl, value);
    }

    getOptionsForJsonHttpClient(): any {
        const cpHeaders = new HttpHeaders({
            'Content-Type': 'application/json',
        });
        const options = {
            headers: cpHeaders,
            observe: 'body',
            responseType: 'json'
        };
        return options;
    }
}
