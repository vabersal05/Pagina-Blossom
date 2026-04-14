import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FloresCuriososService {

  private apiKey = 'sk-jv9e69deab773906816428'; 
  private apiUrl = `https://perenual.com/api/species-list?key=${this.apiKey}&page=1`;

  constructor(private http: HttpClient) {}

  getCuriosidades(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}