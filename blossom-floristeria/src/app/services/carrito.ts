import { Injectable, signal } from '@angular/core';
import { Producto } from './productos';

export interface ItemCarrito{
  producto: Producto;
  cantidad: number;
}

@Injectable({
  providedIn: 'root',
})
export class CarritoService {
  abierto = signal(false);
  
  abrir() {
    this.abierto.set(true);
  }

  cerrar() {
    this.abierto.set(false);
  }

  toggle() {
    this.abierto.set(!this.abierto());
  }

  carrito = signal<ItemCarrito[]>(this.cargarCarrito());
  
  constructor() {}

  private guardarCarrito(){
    localStorage.setItem('carrito', JSON.stringify(this.carrito()));
  }

  private cargarCarrito(){
    const data = localStorage.getItem('carrito');
    return data ? JSON.parse(data) : [];
  }

  agregar(producto: Producto){
    const items = this.carrito();
    const index = items.findIndex(item => item.producto?.id === producto.id);
    if(index !== -1){
      items[index].cantidad++;
    } else {
      items.push({ producto, cantidad: 1 });
    }

    this.carrito.set([...items]);
    this.guardarCarrito();
  }

  aumentar(item: ItemCarrito){
    item.cantidad++;
    this.carrito.set([...this.carrito()]);
    this.guardarCarrito();
  }

  disminuir(item: ItemCarrito){
    if(item.cantidad > 1){
      item.cantidad--;
    } else {
      this.eliminar(item);
    }
    this.carrito.set([...this.carrito()]);
    this.guardarCarrito();
  }

  eliminar(item: ItemCarrito){
    const nuevo = this.carrito().filter(i => i.producto?.id !== item.producto?.id);
    this.carrito.set(nuevo);
    this.guardarCarrito();
  }

  total(){
    return this.carrito().reduce((acc, i) => acc + i.producto.precio * i.cantidad, 0);
  }

  cantidadTotal(){
    return this.carrito().reduce((acc, i) => acc + i.cantidad, 0);
  }
}

