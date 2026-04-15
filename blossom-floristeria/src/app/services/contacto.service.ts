import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ContactoService {
  constructor(private http: HttpClient) {}

  agregarMensaje(mensaje: any) {
    return this.http.post('http://localhost:3000/api/mensajes', mensaje);
  }

  obtenerMensajes() {
    return this.http.get<any[]>('http://localhost:3000/api/mensajes');
  } 

}
