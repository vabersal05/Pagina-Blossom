import { Component, Input } from '@angular/core';
import { Producto, Productos } from '../../services/productos';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-producto-detalle',
  imports: [RouterModule],
  templateUrl: './producto-detalle.html',
  styleUrl: './producto-detalle.css',
})
export class ProductoDetalle {
  @Input() producto!: Producto;
}
