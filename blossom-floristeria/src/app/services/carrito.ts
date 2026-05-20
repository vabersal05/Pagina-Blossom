import { Injectable, signal } from '@angular/core';
import { Producto } from './productos';
import { HttpClient } from '@angular/common/http';
import { Auth } from './auth';
import { environment } from '../../enviroments/environment';

export interface ItemCarrito {
  producto: Producto;
  cantidad: number;
}

@Injectable({
  providedIn: 'root',
})
export class CarritoService {

  abierto = signal(false);

  carrito = signal<ItemCarrito[]>([]);

  constructor(
    private http: HttpClient,
    private authService: Auth
  ) {}

  abrir() {
    this.abierto.set(true);
  }

  cerrar() {
    this.abierto.set(false);
  }

  toggle() {
    this.abierto.set(!this.abierto());
  }

  // OBTENER ID DEL CLIENTE
  private getClienteId(): number {
    return this.authService.getUser()?.id;
  }

  // CARGAR CARRITO DESDE MYSQL
  cargarCarritoDB() {

    const clienteId = this.getClienteId();

    if (!clienteId) return;

    this.http.get<ItemCarrito[]>(
      `${environment.apiUrl}/carrito/${clienteId}`
    ).subscribe({

      next: (data) => {
        this.carrito.set(data);
      },

      error: () => {
        console.error('Error al cargar carrito');
      }

    });

  }

  // AGREGAR PRODUCTO
  agregar(producto: Producto) {

    if (producto.stock === 0) {
      console.warn('Producto sin stock');
      return;
    }

    const clienteId = this.getClienteId();

    this.http.post(
      `${environment.apiUrl}/carrito`,
      {
        cliente_id: clienteId,
        producto_id: producto.id,
        cantidad: 1
      }
    ).subscribe({

      next: () => {
        this.cargarCarritoDB();
      },

      error: () => {
        console.error('Error al agregar producto');
      }

    });

  }

  // AUMENTAR CANTIDAD
  aumentar(item: ItemCarrito) {
    if (item.cantidad >= item.producto.stock) {
      console.warn('Stock máximo alcanzado');
      return;
    }

    this.http.put(
      `${environment.apiUrl}/carrito`,
      {
        cliente_id: this.getClienteId(),
        producto_id: item.producto.id,
        cantidad: item.cantidad + 1
      }
    ).subscribe({

      next: () => {
        this.cargarCarritoDB();
      },

      error: () => {
        console.error('Error al aumentar cantidad');
      }

    });
  }

  // DISMINUIR CANTIDAD
  disminuir(item: ItemCarrito) {

    // SI LLEGA A 1 → ELIMINAMOS
    if (item.cantidad <= 1) {
      this.eliminar(item);
      return;
    }

    this.http.put(
      `${environment.apiUrl}/carrito`,
      {
        cliente_id: this.getClienteId(),
        producto_id: item.producto.id,
        cantidad: item.cantidad - 1
      }
    ).subscribe({

      next: () => {
        this.cargarCarritoDB();
      },

      error: () => {
        console.error('Error al disminuir cantidad');
      }

    });
  }

  // ELIMINAR PRODUCTO
  eliminar(item: ItemCarrito) {

    this.http.delete(
      `${environment.apiUrl}/carrito`,
      {
        body: {
          cliente_id: this.getClienteId(),
          producto_id: item.producto.id
        }
      }
    ).subscribe({

      next: () => {
        this.cargarCarritoDB();
      }

    });

  }

  // TOTAL
  total() {
    return this.carrito().reduce(
      (acc, i) => acc + i.producto.precio * i.cantidad,
      0
    );
  }

  // CANTIDAD TOTAL
  cantidadTotal() {
    return this.carrito().reduce(
      (acc, i) => acc + i.cantidad,
      0
    );
  }

}