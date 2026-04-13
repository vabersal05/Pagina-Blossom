/*import { ContactoService } from '../../services/contacto.service';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [FormsModule, CommonModule], // necesario para usar ngModel
  templateUrl: './contacto.html',
  styleUrl: './contacto.css',
})
export class Contacto {
  // variables para guardar lo que escribe el usuario
  nombre: string = '';
  correo: string = '';
  mensaje: string = '';

  enviado: boolean = false; // para mostrar mensaje de éxito

  enviarFormulario() {
    console.log('click detectado');
    // validar que no estén vacíos
    if (this.nombre && this.correo && this.mensaje) {
      const nuevoMensaje = {
        nombre: this.nombre,
        correo: this.correo,
        mensaje: this.mensaje,
      };

      this.contactoService.agregarMensaje(nuevoMensaje);

      this.enviado = true; // mostrar mensaje

      // mostrar en consola (simula envío)
      console.log('Mensaje enviado:', {
        nombre: this.nombre,
        correo: this.correo,
        mensaje: this.mensaje,
      });

      // limpiar campos después de enviar
      this.nombre = '';
      this.correo = '';
      this.mensaje = '';
    }
  }

  constructor(private contactoService: ContactoService) {}
}

__

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ContactoService } from '../../services/contacto.service';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contacto.html',
})
export class ContactoComponent {
  nombre = '';
  correo = '';
  mensaje = '';

  constructor(private contactoService: ContactoService) {}

  enviar() {
    const nuevoMensaje = {
      nombre: this.nombre,
      correo: this.correo,
      mensaje: this.mensaje,
    };

    this.contactoService.agregarMensaje(nuevoMensaje);

    console.log('📨 Enviado:', nuevoMensaje);

    this.nombre = '';
    this.correo = '';
    this.mensaje = '';
  }
}*/
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ContactoService } from '../../services/contacto.service';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contacto.html',
  styleUrl: './contacto.css',
})
export class ContactoComponent {
  nombre = '';
  correo = '';
  mensaje = '';
  enviado = false;

  constructor(private contactoService: ContactoService) {}

  enviar() {
    if (this.nombre && this.correo && this.mensaje) {
      const nuevoMensaje = {
        nombre: this.nombre,
        correo: this.correo,
        mensaje: this.mensaje,
      };

      this.contactoService.agregarMensaje(nuevoMensaje);

      this.enviado = true;

      console.log('📨 Mensaje enviado:', nuevoMensaje);

      this.nombre = '';
      this.correo = '';
      this.mensaje = '';
    }
  }
}
