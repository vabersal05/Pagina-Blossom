import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactoService } from '../../services/contacto.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-mensajes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mensajes.html',
  styleUrls: ['./mensajes.css'],
})
export class MensajesComponent implements OnInit {
  mensajes: any[] = [];

  constructor(private contactoService: ContactoService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.cargarMensajes();
  }

  cargarMensajes(){
    this.contactoService.obtenerMensajes().subscribe({
      next: (data) => {
        this.mensajes = data;
        this.cdr.detectChanges();
        console.log('Mensajes recibidos:', this.mensajes);
      },
      error: () => {
        console.error('Error al obtener mensajes');
      }
    });
}
}

