import {Inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TotpService {
  path = 'api/totp';

  constructor(private http: HttpClient,
              @Inject('apiEndpoint') private apiEndpoint: string) {
  }

  establishCommunication(): Observable<any> {
    return this.http.get<any>(`${this.apiEndpoint}/totp`);
  }

  sendTotp(totp: String): Observable<any> {
    return this.http.get<any>(`${this.apiEndpoint}/verify-totp/${totp}`);
  }
}
