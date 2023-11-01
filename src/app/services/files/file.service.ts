import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  baseUrl: string = environment.baseUrl;

  constructor(
    private httpClient: HttpClient,
  ) { }

  public uploadFile(data:any) {
    return this.httpClient.post<any>(this.baseUrl + '/api/upload', data, { withCredentials: true })
      .pipe(map(res => {
        return res;
      }));
  }

  public getCaseFiles(data:any) {
    return this.httpClient.get<any>(this.baseUrl + `/api/files/${data}`)
      .pipe(map(res => {
        return res;
      }));
  }
}
