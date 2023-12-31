import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { createRecord, documentation, updateRecord, visibility } from 'src/app/models/records.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecordsService {
  baseUrl: string = environment.baseUrl;

  constructor(
    private httpClient: HttpClient,
  ) { }

  public getUserRecords() {
    return this.httpClient.get<any>(this.baseUrl + '/api/records', { withCredentials: true })
      .pipe(map(res => {
        return res;
      }));
  }

  public createRecord(data:createRecord) {
    return this.httpClient.post<any>(this.baseUrl + '/api/record', data, { withCredentials: true })
      .pipe(map(res => {
        return res;
      }));
  }

  public updateRecord(data:updateRecord) {
    return this.httpClient.put<any>(this.baseUrl + '/api/record', data, { withCredentials: true })
      .pipe(map(res => {
        return res;
      }));
  }

  public deleteRecord(data:any) {
    return this.httpClient.delete<any>(this.baseUrl + '/api/record/delete?id=' + data, { withCredentials: true })
      .pipe(map(res => {
        return res;
      }));
  }

  public getPublicRecords() {
    return this.httpClient.get<any>(this.baseUrl + '/api/records/other', { withCredentials: true })
      .pipe(map(res => {
        return res;
      }));
  }

  public changeVisibility(data:visibility) {
    return this.httpClient.post<any>(this.baseUrl + '/api/record/visibility', data, { withCredentials: true })
      .pipe(map(res => {
        return res;
      }));
  }

  public updateDocumentation(data:documentation) {
    return this.httpClient.post<any>(this.baseUrl + '/api/record/documentation', data, { withCredentials: true })
      .pipe(map(res => {
        return res;
      }));
  }
}