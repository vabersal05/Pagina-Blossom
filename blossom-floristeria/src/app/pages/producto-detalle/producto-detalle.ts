import { Component, Input } from '@angular/core';
import { Producto, Productos } from '../../services/productos';
import { RouterModule } from '@angular/router';
import { NgClass } from '@angular/common';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-producto-detalle',
  imports: [RouterModule, NgClass, CurrencyPipe],
  templateUrl: './producto-detalle.html',
  styleUrl: './producto-detalle.css',
})
export class ProductoDetalle {
  @Input() producto!: Producto;
}
