import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ContactoService {
  mensajes: any[] = this.cargarMensajes();

  agregarMensaje(mensaje: any) {
    this.mensajes.push(mensaje);
    this.guardarMensajes();
  }

  obtenerMensajes() {
    return this.mensajes;
  }

  private guardarMensajes() {
    localStorage.setItem('mensajes', JSON.stringify(this.mensajes));
  }

  private cargarMensajes() {
    const data = localStorage.getItem('mensajes');
    return data ? JSON.parse(data) : [];
  }
}
