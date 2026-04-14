import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-floreria',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './floreria.html',
  styleUrls: ['./floreria.css']
})
export class FloreriaComponent {

  @Input() curiosidades: any[] = [];
  @Input() cargando: boolean = false;

  mostrarNombres = false;

  @Output() toggle = new EventEmitter<boolean>();

  cambiarEstado() {
    this.mostrarNombres = !this.mostrarNombres;
    this.toggle.emit(this.mostrarNombres);
  }
}