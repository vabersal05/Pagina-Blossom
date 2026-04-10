import { Component, Input } from '@angular/core';
import { Producto, Productos } from '../../services/productos';

@Component({
  selector: 'app-producto-detalle',
  imports: [],
  templateUrl: './producto-detalle.html',
  styleUrl: './producto-detalle.css',
})
export class ProductoDetalle {
  @Input() producto!: Producto;
}
