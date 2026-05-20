import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../enviroments/environment';

@Injectable({
  providedIn: 'root',
})
export class ContactoService {
  constructor(private http: HttpClient) {}

  agregarMensaje(mensaje: any) {
    return this.http.post(`${environment.apiUrl}/mensajes`, mensaje);
  }

  obtenerMensajes() {
    return this.http.get<any[]>(`${environment.apiUrl}/mensajes`);
  } 

}
