import { Component, OnInit } from '@angular/core';
import { Producto, Productos } from '../../services/productos';
import { ProductoDetalle } from "../producto-detalle/producto-detalle";
import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { Auth } from '../../services/auth';
import { CarritoService } from '../../services/carrito';
import { Router, ActivatedRoute } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-catalogo', 
  standalone: true,
  imports: [ProductoDetalle, NgFor, NgIf, NgClass],
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.css',
})
export class Catalogo implements OnInit {
  productos: Producto[] = [];
  productoSeleccionado: Producto | null = null;
  
  constructor(
    private productosService: Productos, 
    private cdr: ChangeDetectorRef,
    public authService: Auth, 
    public carritoService: CarritoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  
  ngOnInit(): void {
    this.productosService.getProductos().subscribe(data => {
      this.productos = data;

      this.route.paramMap.subscribe(params => {
        const id = params.get('id');

        if (id) {
          const producto = this.productos.find(p => p.id == +id);
          if (producto) {
            this.productoSeleccionado = producto;
          }
        }
      });

      this.cdr.detectChanges();
    });
  }
 
  seleccionarProducto(producto: Producto){
    this.productoSeleccionado = producto;
    this.router.navigate(['/productos', producto.id]);
  }

  cerrarDetalle(){
    this.productoSeleccionado = null;

    // regresar a catálogo
    this.router.navigate(['/catalogo']);
  }
}
