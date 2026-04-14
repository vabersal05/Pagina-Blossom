import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin implements OnInit {

  productos: any[] = [];
  mostrarFormulario = false;
  editando = false;
  idEditando: number | null = null;

  formularioProducto = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.minLength(3)]),
    categoria: new FormControl('', Validators.required),
    marca: new FormControl('', Validators.required),
    precio: new FormControl(0, [Validators.required, Validators.min(0.01)]),
    stock: new FormControl(0, [Validators.required, Validators.min(0)]),
    imagen: new FormControl(''),
    descripcion: new FormControl('', [Validators.required, Validators.minLength(10)])
  });

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.obtenerProductos();
  }

  get campos() {
    return this.formularioProducto.controls;
  }

  obtenerProductos() {
    this.http.get<any[]>('http://localhost:3000/api/productos').subscribe({
      next: (res) => this.productos = res,
      error: () => alert('Error al obtener productos')
    });
  }

  seleccionarImagen(evento: any) {
    const archivo = evento.target.files[0];
    if (!archivo) return;

    const lector = new FileReader();
    lector.onload = (e: any) => {
      this.formularioProducto.patchValue({ imagen: e.target.result });
    };
    lector.readAsDataURL(archivo);
  }

  abrirFormulario() {
    this.editando = false;
    this.idEditando = null;
    this.formularioProducto.reset({ precio: 0, stock: 0 });
    this.mostrarFormulario = true;
  }

  guardarProducto() {
    this.formularioProducto.markAllAsTouched();
    if (this.formularioProducto.invalid) return;

    if (this.editando) {
      this.http.put(`http://localhost:3000/api/productos/${this.idEditando}`, this.formularioProducto.value).subscribe({
        next: () => {
          alert('Producto actualizado correctamente');
          this.mostrarFormulario = false;
          this.obtenerProductos();
        }
      });
    } else {
      this.http.post('http://localhost:3000/api/productos', this.formularioProducto.value).subscribe({
        next: () => {
          alert('Producto creado correctamente');
          this.mostrarFormulario = false;
          this.obtenerProductos();
        }
      });
    }
  }

  editarProducto(producto: any) {
    this.editando = true;
    this.idEditando = producto.id;
    this.formularioProducto.patchValue(producto);
    this.mostrarFormulario = true;
  }

  eliminarProducto(id: number) {
    if (confirm('¿Deseas eliminar este producto?')) {
      this.http.delete(`http://localhost:3000/api/productos/${id}`).subscribe({
        next: () => {
          alert('Producto eliminado correctamente');
          this.obtenerProductos();
        }
      });
    }
  }
}