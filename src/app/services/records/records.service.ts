import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { createRecord } from 'src/app/models/records.model';

@Injectable({
  providedIn: 'root'
})
export class RecordsService {
  baseUrl: string = "http://localhost:4000/api";

  constructor(
    private httpClient: HttpClient,
  ) { }

  public getUserRecords() {
    return this.httpClient.get<any>(this.baseUrl + '/records', { withCredentials: true })
      .pipe(map(res => {
        return res;
      }));
  }

  public createRecord(data:createRecord) {
    return this.httpClient.post<any>(this.baseUrl + '/record', data, { withCredentials: true })
      .pipe(map(res => {
        return res;
      }));
  }

  public getPublicRecords() {
    return this.httpClient.get<any>(this.baseUrl + '/records/other', { withCredentials: true })
      .pipe(map(res => {
        return res;
      }));
  }
}
