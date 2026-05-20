import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { environment } from '../../../enviroments/environment';
import Swal from 'sweetalert2';

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
    precio: new FormControl(null, [Validators.required, Validators.min(0.01)]),
    stock: new FormControl(null, [Validators.required, Validators.min(0)]),
    imagen: new FormControl(''),
    descripcion: new FormControl('', [Validators.required, Validators.minLength(10)])
  });

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.obtenerProductos();
  }

  get campos() {
    return this.formularioProducto.controls;
  }

  obtenerProductos() {
    this.http.get<any[]>(`${environment.apiUrl}/productos`).subscribe({
    next: (res) => {
      this.productos = res;
      this.cdr.detectChanges();
    },
    error: () => {
      Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error al obtener productos',
            confirmButtonColor: '#d93d83',
          });
    }
  });
  }

  seleccionarImagen(evento: any) {
    const archivo = evento.target.files[0];
    if (!archivo) return;
    this.formularioProducto.patchValue({ imagen: archivo.name });
  }

  abrirFormulario() {
    this.editando = false;
    this.idEditando = null;
    this.formularioProducto.reset({ });
    this.mostrarFormulario = true;
  }

  guardarProducto() {
    this.formularioProducto.markAllAsTouched();
    if (this.formularioProducto.invalid) return;

    if (this.editando) {
      this.http.put(`${environment.apiUrl}/productos/${this.idEditando}`, this.formularioProducto.value).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Producto actualizado',
                text: 'El producto fue actualizado correctamente!',
                confirmButtonColor: '#d93d83',
          });
          this.mostrarFormulario = false;
          this.obtenerProductos();
        }
      });
    } else {
      this.http.post(`${environment.apiUrl}/productos`, this.formularioProducto.value).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Producto creado',
            text: 'El producto fue creado correctamente!',
            confirmButtonColor: '#d93d83',
          });
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
      this.http.delete(`${environment.apiUrl}/productos/${id}`).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Producto eliminado',
            text: 'El producto fue eliminado correctamente!',
            confirmButtonColor: '#d93d83',
          });
          this.obtenerProductos();
        }
      });
    }
  }
}