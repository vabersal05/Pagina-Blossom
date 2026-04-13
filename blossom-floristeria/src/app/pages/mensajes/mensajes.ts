import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactoService } from '../../services/contacto.service';

@Component({
  selector: 'app-mensajes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mensajes.html',
  styleUrls: ['./mensajes.css'],
})
export class MensajesComponent implements OnInit {
  mensajes: any[] = [];

  constructor(private contactoService: ContactoService) {}

  ngOnInit() {
    console.log('🔥 MensajesComponent cargado');

    this.mensajes = this.contactoService.obtenerMensajes();

    console.log('📦 Mensajes recibidos:', this.mensajes);
  }
}
