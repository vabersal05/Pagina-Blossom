import { Component } from '@angular/core';
import { ContactoService } from '../services/contacto.service';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.html',
  styleUrls: ['./contacto.css'],
})
export class ContactoComponent {
  nombre = '';
  correo = '';
  asunto = '';
  mensaje = '';

  constructor(public contactoService: ContactoService) {}

  enviar() {
    const nuevoMensaje = {
      nombre: this.nombre,
      correo: this.correo,
      asunto: this.asunto,
      mensaje: this.mensaje,
      fecha: new Date(),
    };

    this.contactoService.agregarMensaje(nuevoMensaje);

    this.nombre = '';
    this.correo = '';
    this.asunto = '';
    this.mensaje = '';
  }
}
