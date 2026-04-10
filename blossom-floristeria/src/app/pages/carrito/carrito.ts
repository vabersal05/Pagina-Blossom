import { Component } from '@angular/core';
import { CarritoService } from '../../services/carrito';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-carrito',
  imports: [NgFor],
  templateUrl: './carrito.html',
  styleUrl: './carrito.css',
})
export class Carrito {
  constructor(public carritoService: CarritoService) {}
}
