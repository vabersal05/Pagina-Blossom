import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin',
  imports: [FormsModule, HttpClientModule, CommonModule],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin implements OnInit {

  productos: any[] = [];
  mostrarFormulario = false;
  editando = false;

  productoForm = {
    id: null,
    nombre: '',
    categoria: '',
    marca: '',
    precio: 0,
    stock: 0,
    imagen: '',
    descripcion: ''
  };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.obtenerProductos();
  }

  // OBTENER TODOS LOS PRODUCTOS
  obtenerProductos() {
    this.http.get<any[]>('http://localhost:3000/api/productos').subscribe({
      next: (res) => this.productos = res,
      error: () => alert('Error al obtener productos')
    });
  }
  seleccionarImagen(event: any) {
    const archivo = event.target.files[0];
    if (!archivo) return;

    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.productoForm.imagen = e.target.result;
    };
    reader.readAsDataURL(archivo);
  }
  // ABRIR FORMULARIO PARA CREAR
  abrirFormulario() {
    this.editando = false;
    this.productoForm = { id: null, nombre: '', categoria: '', marca: '', precio: 0, stock: 0, imagen: '', descripcion: '' };
    this.mostrarFormulario = true;
  }

  // GUARDAR PRODUCTO (CREAR O EDITAR)
  guardarProducto() {
    if (this.editando) {
      this.http.put(`http://localhost:3000/api/productos/${this.productoForm.id}`, this.productoForm).subscribe({
        next: () => {
          alert('Producto actualizado');
          this.mostrarFormulario = false;
          this.obtenerProductos();
        }
      });
    } else {
      this.http.post('http://localhost:3000/api/productos', this.productoForm).subscribe({
        next: () => {
          alert('Producto creado');
          this.mostrarFormulario = false;
          this.obtenerProductos();
        }
      });
    }
  }

  // EDITAR PRODUCTO
  editarProducto(producto: any) {
    this.editando = true;
    this.productoForm = { ...producto };
    this.mostrarFormulario = true;
  }

  // ELIMINAR PRODUCTO
  eliminarProducto(id: number) {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      this.http.delete(`http://localhost:3000/api/productos/${id}`).subscribe({
        next: () => {
          alert('Producto eliminado');
          this.obtenerProductos();
        }
      });
    }
  }
}