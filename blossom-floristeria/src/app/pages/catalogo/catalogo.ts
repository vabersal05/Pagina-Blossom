import { Component, OnInit } from '@angular/core';
import { Producto, Productos } from '../../services/productos';
import { ProductoDetalle } from "../producto-detalle/producto-detalle";
import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { Auth } from '../../services/auth';
import { CarritoService } from '../../services/carrito';

@Component({
  selector: 'app-catalogo', 
  standalone: true,
  imports: [ProductoDetalle, NgFor, NgIf],
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.css',
})
export class Catalogo implements OnInit {
  productos: Producto[] = [];
  productoSeleccionado: Producto | null = null;
  
  constructor(private productosService: Productos, private cdr: ChangeDetectorRef, public authService: Auth, public carritoService: CarritoService) {}
  
  ngOnInit(): void {
    this.productosService.getProductos().subscribe(data => {
      this.productos = data;
      this.cdr.detectChanges();
    });
  }

  seleccionarProducto(producto: Producto){
    this.productoSeleccionado = producto;
  }

  cerrarDetalle(){
    this.productoSeleccionado = null;
  }
}
