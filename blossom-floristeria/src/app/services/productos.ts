import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Producto {
  id: number;
  nombre: string;
  categoria: string;
  marca: string;
  precio: number;
  stock: number;
  imagen: string;
  descripcion: string;
  disponible: number;
}

@Injectable({
  providedIn: 'root',
})
export class Productos {
  private apiUrl = 'http://localhost:3000/api/productos';

  constructor(private http: HttpClient) {}
  
  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl);
  }
}
