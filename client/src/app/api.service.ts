import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}
  getCode(): Observable<string> {
    return this.http
      .get<{ text: string }>(`${environment.backendUrl}/api/generate-code`)
      .pipe(map((obj) => obj.text));
  }
}
