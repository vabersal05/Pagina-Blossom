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
  asunto = '';
  mensaje = '';
  enviado = false;

  constructor(private contactoService: ContactoService) {}

  enviar(form: any) {
    if (this.nombre && this.correo && this.mensaje) {
      const nuevoMensaje = {
        nombre: this.nombre,
        correo: this.correo,
        asunto: this.asunto,
        mensaje: this.mensaje,
        fecha: new Date(), //date
      };

      this.contactoService.agregarMensaje(nuevoMensaje).subscribe({
        next: () => {
          alert('Mensaje enviado correctamente');
          this.enviado = true;
          form.reset();

          // Limpiar campos después de enviar
          this.nombre = '';
          this.correo = '';
          this.asunto = '';
          this.mensaje = '';
          //console.log('SI JALA');
        },
        error: () => {
          alert('Error al enviar mensaje');
        },
      });

      console.log('Mensaje enviado:', nuevoMensaje);
    }
  }
}
